# Changelog

All notable changes to this project will be documented in this file.

## 1.0.0 — 2026-09-05

### Added

* FLUX.1 Schnell image generation through Cloudflare Workers AI
* Bearer token authentication
* Cloudflare Workers AI binding support
* Browser CORS support
* OPTIONS preflight handling
* Configurable generation steps
* Input validation
* Improved JSON error responses
* Health/info endpoint
* Browser-based image generation demo
* JPEG download support
* Wrangler configuration
* Local development configuration

### Changed

* Replaced Stable Diffusion XL with FLUX.1 Schnell
* Updated image response handling for FLUX Base64 output
* Removed outdated fixed daily image-generation claims
* Improved frontend error handling

### Fixed

* Browser frontend requests blocked by missing CORS headers
* Error responses being mistaken for image files
* Unsupported model parameters such as `seed`
* Weak server-side request validation

## Credits

This project was inspired by and derived in part from:

`saurav-z/free-image-generation-api`

The original project is distributed under the MIT License.
