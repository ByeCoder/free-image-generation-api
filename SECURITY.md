# Security Policy

## API Keys

Never commit Cloudflare API keys, Worker secrets, or other credentials to this repository.

The image API uses a Worker secret named:

```text
API_KEY
```

Production secrets should be configured through the Cloudflare dashboard or Wrangler.

For example:

```bash
npx wrangler secret put API_KEY
```

You will then be prompted to enter the secret securely.

## Exposed Credentials

If an API key is accidentally:

* committed to GitHub
* pasted into an issue
* shared in a screenshot
* included in frontend JavaScript
* published in logs

rotate the key immediately.

Deleting the key from the latest commit alone is not sufficient because it may remain in Git history.

## Frontend Security

The included HTML frontend is intended primarily for testing and development.

A private API key entered into a browser should not be embedded into a public website.

For production applications, consider implementing a proper backend authentication layer instead of distributing the Worker API key to users.

## Reporting Security Issues

If you discover a security issue, please avoid publishing sensitive exploit details or credentials in a public GitHub issue.

Provide enough information to reproduce and understand the problem without exposing secrets.
