# 🎨 Cloudflare AI Image Generation API — FLUX.1 Schnell

A lightweight AI image generation API powered by **Cloudflare Workers AI** and **FLUX.1 Schnell**.

Deploy your own text-to-image API on Cloudflare Workers in a few minutes, protect it with an API key, and use it from cURL, JavaScript, Python, or the included browser frontend.

> This repository is an updated implementation inspired by `saurav-z/free-image-generation-api`, with a newer image model, improved error handling, CORS support, and an updated frontend demo.

---

## ✨ Features

* 🎨 Text-to-image generation using **FLUX.1 Schnell**
* ⚡ Runs on Cloudflare Workers
* 🔐 Bearer API key authentication
* 🌐 CORS support for browser applications
* 🖥️ Included HTML frontend
* 📥 Generated images are returned directly as JPEG
* 🛠️ Improved JSON error messages
* 🎚️ Configurable generation steps from 1 to 8
* 🆓 Compatible with the Cloudflare Workers AI free allocation

> Cloudflare pricing and free usage limits can change. Check the current Workers AI pricing before relying on a specific daily request count.

---

## 🤖 Model

This version uses:

```text
@cf/black-forest-labs/flux-1-schnell
```

FLUX.1 Schnell is a text-to-image model available through Cloudflare Workers AI.

The generated image is returned by Workers AI as Base64 and converted by the Worker into a normal JPEG response.

---

## 📁 Repository Structure

```text
.
├── README.md
├── worker.js
└── frontend_demo.html
```

---

# 🚀 Setup

## 1. Create a Cloudflare Account

Create or sign in to your Cloudflare account.

---

## 2. Create a Worker

From the Cloudflare dashboard:

1. Open **Workers & Pages**
2. Create a new Worker
3. Give it a name, for example:

```text
cloudflare-image-api
```

4. Deploy the initial Worker.

Your URL will look similar to:

```text
https://your-worker.your-subdomain.workers.dev
```

---

## 3. Replace the Worker Code

Open the Worker code editor.

Delete the default code and replace it with the contents of:

```text
worker.js
```

Then click **Save and Deploy**.

---

## 4. Create an API Secret

Open your Worker settings and add a new **Secret**.

Name:

```text
API_KEY
```

Value:

```text
your-long-random-secret-key
```

Use a strong random key.

Do **not** commit your real API key to GitHub.

The Worker reads this secret using:

```text
env.API_KEY
```

---

## 5. Add the Workers AI Binding

Your Worker needs a Workers AI binding.

In the Worker settings, add a **Workers AI** binding with the variable name:

```text
AI
```

The name must match exactly because the Worker uses:

```text
env.AI
```

Save and deploy the Worker again.

---

# 🧪 Test the API

## Windows CMD

```cmd
curl.exe -X POST "https://YOUR-WORKER.workers.dev" ^
-H "Authorization: Bearer YOUR_API_KEY" ^
-H "Content-Type: application/json" ^
--data-raw "{\"prompt\":\"A futuristic robot standing in a neon city\",\"steps\":4}" ^
--output image.jpg
```

If successful, `image.jpg` will contain the generated image.

---

## Linux / macOS

```bash
curl -X POST "https://YOUR-WORKER.workers.dev" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"A futuristic robot standing in a neon city","steps":4}' \
  --output image.jpg
```

---

# 📡 API

## Endpoint

```text
POST /
```

## Headers

```text
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

## Request

```json
{
  "prompt": "A cinematic futuristic farm at sunset",
  "steps": 4
}
```

### Parameters

| Parameter | Required | Description                           |
| --------- | -------- | ------------------------------------- |
| `prompt`  | Yes      | Text describing the image             |
| `steps`   | No       | Generation steps from 1–8. Default: 4 |

---

## Successful Response

```text
HTTP 200
Content-Type: image/jpeg
```

The response body contains the generated JPEG image.

---

## Error Example

```json
{
  "error": "Failed to generate image",
  "details": "Error message"
}
```

---

# 🌐 Browser Frontend

This repository also includes:

```text
frontend_demo.html
```

Open the file in your browser and enter:

* Worker URL
* API Key
* Prompt
* Number of steps

Then click **Generate Image**.

The API key is entered at runtime and is not hard-coded into the HTML file.

> The included frontend is intended primarily as a demo/testing interface. Never publish a private API key inside client-side JavaScript.

---

# 💻 JavaScript Example

```javascript
const response = await fetch(
  "https://YOUR-WORKER.workers.dev",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: "A futuristic greenhouse in the mountains",
      steps: 4
    })
  }
);

if (!response.ok) {
  throw new Error(await response.text());
}

const imageBlob = await response.blob();
const imageURL = URL.createObjectURL(imageBlob);

document.querySelector("img").src = imageURL;
```

---

# 🐍 Python Example

Install Requests:

```bash
pip install requests
```

Example:

```python
import requests

url = "https://YOUR-WORKER.workers.dev"

headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

payload = {
    "prompt": "A beautiful futuristic agricultural robot",
    "steps": 4
}

response = requests.post(
    url,
    headers=headers,
    json=payload,
    timeout=120
)

if response.ok:
    with open("generated-image.jpg", "wb") as file:
        file.write(response.content)

    print("Image generated successfully!")
else:
    print(response.status_code)
    print(response.text)
```

---

# 🔒 Security

### Never hard-code your API key

Do not write your secret directly inside `worker.js`:

```javascript
// ❌ DON'T DO THIS
const API_KEY = "my-secret-key";
```

Use a Cloudflare Worker Secret named:

```text
API_KEY
```

instead.

### Do not publish real keys

Never include your actual API key in:

* GitHub repositories
* Screenshots
* Frontend JavaScript
* README examples
* Public issues
* Public logs

If a key is accidentally exposed, rotate it immediately.

---

# 🌍 CORS

The included Worker supports CORS so that the API can be tested from browser applications and the included HTML frontend.

The default example allows all origins:

```text
Access-Control-Allow-Origin: *
```

For a production application, consider restricting this to your own website domain.

---

# ⚠️ Usage & Limits

Cloudflare Workers AI usage is subject to Cloudflare's current pricing, model availability, quotas, and rate limits.

Do not assume a fixed number of free image generations per day because image generation cost depends on the model and Cloudflare's current pricing system.

Check the latest Cloudflare Workers AI documentation for current limits.

---

# 🛠️ Troubleshooting

## HTTP 401

```text
Unauthorized
```

Check that:

* The `API_KEY` secret exists
* The Worker has been redeployed after changing the secret
* The request uses:

```text
Authorization: Bearer YOUR_API_KEY
```

---

## HTTP 500

Inspect the returned JSON response instead of saving it as an image.

Example:

```cmd
curl.exe -X POST "https://YOUR-WORKER.workers.dev" ^
-H "Authorization: Bearer YOUR_API_KEY" ^
-H "Content-Type: application/json" ^
--data-raw "{\"prompt\":\"A red apple\"}"
```

The `details` field normally contains the upstream Workers AI error.

---

## Browser CORS Error

Make sure you are using the updated `worker.js`.

It handles browser `OPTIONS` preflight requests and sends the required CORS headers.

---

# 🙏 Credits

Originally inspired by:

```text
saurav-z/free-image-generation-api
```

This version updates the image generation implementation to use Cloudflare's FLUX.1 Schnell model and adds improved authentication handling, error reporting, CORS support, configurable generation steps, and an updated frontend.

---

# 📄 License

MIT

If this project is based on or derived from another MIT-licensed project, retain the applicable original copyright and license notices.

---

## ⭐ Support

If this project helped you, consider starring the repository.

Contributions, improvements, bug reports, and pull requests are welcome.

<div align="center">

**⭐ Star this repo if it helped you! ⭐**

</div>
