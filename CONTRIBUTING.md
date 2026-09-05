# Contributing

Contributions are welcome!

If you find a bug, have an improvement idea, or want to add support for another Cloudflare Workers AI image model, feel free to open an issue or submit a pull request.

## Development

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/cloudflare-flux-image-api.git
cd cloudflare-flux-image-api
```

Install dependencies:

```bash
npm install
```

Create a local secrets file:

```text
.dev.vars
```

Add:

```text
API_KEY=your-local-development-key
```

Never commit `.dev.vars` or any real API key.

Start the local development server:

```bash
npm run dev
```

## Pull Requests

Please keep pull requests focused on one feature or bug fix whenever possible.

Before submitting:

* Make sure the Worker starts successfully.
* Do not include API keys or credentials.
* Test image generation.
* Test invalid API keys.
* Test invalid JSON requests.
* Test browser CORS behavior.
* Update the README if behavior changes.

## Bug Reports

When reporting a bug, please include:

* Cloudflare Worker error message
* HTTP status code
* Model being used
* Relevant request parameters
* Steps to reproduce

Do not include private API keys or other credentials.

## Security

If you accidentally expose an API key, rotate it immediately.

Please do not publish active credentials in issues, pull requests, logs, screenshots, or examples.

## License

By contributing, you agree that your contributions may be distributed under the project's MIT License.
