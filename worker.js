const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle browser CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    // Simple health/info endpoint
    if (request.method === "GET" && url.pathname === "/") {
      return json(
        {
          name: "Cloudflare AI Image Generation API",
          status: "ok",
          model: "@cf/black-forest-labs/flux-1-schnell",
          usage: {
            method: "POST",
            body: {
              prompt: "A futuristic city at sunset",
              steps: 4,
            },
          },
        },
        200
      );
    }

    // Only POST / is allowed for generation
    if (request.method !== "POST" || url.pathname !== "/") {
      return json({ error: "Not found" }, 404);
    }

    // Make sure the API secret exists
    if (!env.API_KEY) {
      return json(
        {
          error: "Server configuration error",
          details: "API_KEY secret is not configured.",
        },
        500
      );
    }

    // Bearer API key authentication
    const authorization = request.headers.get("Authorization");

    if (authorization !== `Bearer ${env.API_KEY}`) {
      return json({ error: "Unauthorized" }, 401);
    }

    try {
      let body;

      try {
        body = await request.json();
      } catch {
        return json(
          {
            error: "Invalid JSON",
            details: "Request body must contain valid JSON.",
          },
          400
        );
      }

      // Validate prompt
      const prompt =
        typeof body.prompt === "string"
          ? body.prompt.trim()
          : "";

      if (!prompt) {
        return json(
          {
            error: "Prompt is required",
          },
          400
        );
      }

      if (prompt.length > 2048) {
        return json(
          {
            error: "Prompt is too long",
            details: "Maximum prompt length is 2048 characters.",
          },
          400
        );
      }

      // Validate steps
      let steps = Number(body.steps ?? 4);

      if (!Number.isInteger(steps) || steps < 1 || steps > 8) {
        return json(
          {
            error: "Invalid steps",
            details: "steps must be an integer between 1 and 8.",
          },
          400
        );
      }

      // Generate image with FLUX.1 Schnell
      const result = await env.AI.run(
        "@cf/black-forest-labs/flux-1-schnell",
        {
          prompt,
          steps,
        }
      );

      if (!result || typeof result.image !== "string") {
        throw new Error(
          "Workers AI did not return a valid Base64 image."
        );
      }

      // FLUX returns the image as Base64.
      // Convert it into normal JPEG bytes.
      const binaryString = atob(result.image);

      const imageBytes = Uint8Array.from(
        binaryString,
        (character) => character.charCodeAt(0)
      );

      return new Response(imageBytes, {
        status: 200,
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "image/jpeg",
          "Content-Disposition":
            'inline; filename="generated-image.jpg"',
          "Cache-Control": "no-store",
          "X-AI-Model":
            "@cf/black-forest-labs/flux-1-schnell",
        },
      });
    } catch (error) {
      console.error("Image generation error:", error);

      return json(
        {
          error: "Failed to generate image",
          details:
            error instanceof Error
              ? error.message
              : String(error),
        },
        500
      );
    }
  },
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "application/json; charset=UTF-8",
      "Cache-Control": "no-store",
    },
  });
}
