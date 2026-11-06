# Modern Front-End Security Concepts

## 1. Project Overview

This project is a User Security Dashboard created for the Modern Front-End Security Concepts training assignment.

The original starter application contained security weaknesses. The goal of this assignment was to identify the vulnerabilities, understand the vulnerable implementation, apply appropriate fixes, and verify the protections while preserving the dashboard's functionality.

### Technologies

- HTML
- CSS
- Vanilla JavaScript
- Node.js
- Express

### Setup and Run

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm start
```

Open the dashboard:

http://localhost:3000

---

## 2. Vulnerabilities Identified

The following five security issues were identified in the starter application:

| No. | Vulnerability | Original vulnerable area |
|---|---|---|
| 1 | DOM-Based Cross-Site Scripting (DOM XSS) | `client/app.js` |
| 2 | Prototype Pollution | Settings handling in `client/app.js` and `server/server.js` |
| 3 | Missing Content Security Policy (CSP) | HTTP responses in `server/server.js` |
| 4 | Server-Side Rendering (SSR) Token Leakage | User data serialization and `/api/profile` in `server/server.js` |
| 5 | Clickjacking | Missing frame-protection response headers in `server/server.js` |

---

## 3. Vulnerable Implementation

### 3.1 DOM-Based Cross-Site Scripting

The original client-side code read a user-controlled value from the URL and inserted it into the page using `innerHTML`.

```js
const value = location.hash.substring(1);
document.querySelector("#result").innerHTML = value;
```

Because the browser interprets `innerHTML` as HTML, an attacker-controlled value could inject markup and potentially execute JavaScript.

### 3.2 Prototype Pollution

The original settings-handling implementation copied arbitrary properties from incoming settings into an ordinary JavaScript object.

Copying untrusted keys without an allowlist can create prototype pollution risks, particularly when special property names such as `__proto__` are accepted.

### 3.3 Missing Content Security Policy

The original application did not set a Content Security Policy response header. This meant the browser was not given an explicit policy restricting the sources of scripts, styles, images, and other resources.

### 3.4 SSR Token Leakage

The original server serialized the complete user object into the HTML response and returned the complete object from the profile API. The object included session and refresh tokens.

Exposing server-side credentials in HTML or API responses makes them accessible to client-side code and anyone inspecting the response.

### 3.5 Clickjacking

The original application did not include frame-protection headers. As a result, another website could attempt to embed the dashboard in an iframe and deceive users into interacting with the embedded page.

---

## 4. Security Fixes

### 4.1 DOM XSS Prevention

**File:** `client/app.js`

- Removed unsafe rendering of user-controlled content through `innerHTML`.
- Created the required DOM elements explicitly.
- Used `textContent` for text values.
- Used `replaceChildren()` to update the application content safely.

This ensures that user-provided values are treated as text rather than parsed as HTML.

### 4.2 Prototype Pollution Prevention

**Files:** `client/app.js`, `server/server.js`

- Replaced arbitrary client-side property copying with an explicit settings object.
- Added server-side validation for incoming settings.
- Allowed only the expected keys: `theme`, `language`, and `fontSize`.
- Validated values against the permitted options.
- Rejected unexpected keys and invalid settings with HTTP 400.

The server independently validates the request rather than relying only on client-side checks.

### 4.3 Content Security Policy

**File:** `server/server.js`

Added CSP middleware that generates a cryptographically random nonce for each request.

The nonce is applied to the required inline script and style elements. The policy includes:

- `default-src 'self'`
- `script-src 'self'` with a request-specific nonce
- `style-src 'self'` with a request-specific nonce
- `img-src 'self' data:`
- `object-src 'none'`
- `base-uri 'self'`
- `form-action 'self'`
- `frame-ancestors 'none'`

The `frame-ancestors 'none'` directive also provides clickjacking protection.

### 4.4 SSR Token Leakage Prevention

**Files:** `server/server.js`, `server/data.js`

- Created a separate `publicUser` object containing only `id`, `name`, `email`, and `role`.
- Used `publicUser` when serializing user information into the HTML response.
- Updated `/api/profile` to return `publicUser` instead of the complete server-side user object.

Session and refresh tokens are no longer included in these client-facing responses.

### 4.5 Clickjacking Prevention

**File:** `server/server.js`

Added two complementary response headers:

```http
Content-Security-Policy: frame-ancestors 'none'
X-Frame-Options: DENY
```

These headers prevent the application from being embedded in frames.

The supplied `test/iframe-test.html` page is used to attempt to embed the account page and verify that the browser blocks it.

---

## 5. Testing and Verification

The following checks can be used to verify the security fixes. Record the actual result of each check when running the tests.

### 5.1 DOM XSS

Open the normal dashboard:

```text
http://localhost:3000/?name=Janhavi
```

Expected: The welcome message displays the supplied name.

Test a malicious URL value:

```text
http://localhost:3000/?name=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E
```

Expected: The value is treated as text. No JavaScript alert or injected image should execute.

### 5.2 Prototype Pollution

Submit valid settings through the dashboard.

Expected: Valid settings are accepted.

Test an unexpected key:

```bash
curl -i -X POST http://localhost:3000/api/settings \
  -H "Content-Type: application/json" \
  -d '{"theme":"dark","language":"en","fontSize":"medium","isAdmin":true}'
```

Expected: HTTP 400 Bad Request.

Test a prototype-related key:

```bash
curl -i -X POST http://localhost:3000/api/settings \
  -H "Content-Type: application/json" \
  -d '{"theme":"dark","language":"en","fontSize":"medium","__proto__":{"polluted":true}}'
```

Expected: HTTP 400 Bad Request.

### 5.3 Content Security Policy

Inspect the homepage response headers:

```bash
curl -s -D - -o /dev/null http://localhost:3000/
```

Expected: The response includes a `Content-Security-Policy` header with the configured directives and a nonce.

Open the dashboard and account page to check that the required scripts, styles, and functionality continue to work.

### 5.4 SSR Token Leakage

Check the HTML response:

```bash
curl -s http://localhost:3000/ | grep -E "sessionToken|refreshToken|TRAINING-FAKE"
```

Expected: No output.

Check the profile API:

```bash
curl -s http://localhost:3000/api/profile
```

Expected: The response contains only `id`, `name`, `email`, and `role`. It must not contain session or refresh tokens.

### 5.5 Clickjacking

Inspect the account page response headers:

```bash
curl -s -D - -o /dev/null http://localhost:3000/account
```

Expected:

- CSP includes `frame-ancestors 'none'`.
- `X-Frame-Options` is `DENY`.

Open the supplied iframe test page:

```bash
open test/iframe-test.html
```

Expected: The account page is blocked from displaying inside the iframe.

---

## 6. Defense-in-Depth Approach

The application uses multiple complementary security measures rather than depending on a single control:

- **Safe DOM rendering:** User-controlled content is inserted as text, not interpreted as HTML.
- **Allowlisted settings:** Only expected keys and permitted values are accepted, with server-side validation.
- **Content Security Policy:** The browser receives explicit restrictions on resource loading and inline script/style execution.
- **Data minimization:** Only the public user fields required by the client are exposed.
- **Frame protection:** CSP `frame-ancestors` and `X-Frame-Options` provide complementary clickjacking protections.

These controls work together to reduce the impact of untrusted input, unsafe data handling, and browser-based attacks.

---

## 7. Git History

The original vulnerable starter project is preserved as the first commit. Each security fix is maintained in a separate commit to make the implementation and review history clear.

The feature branch is:

```text
modern-frontend-security
```

---

## 8. Project Structure

```text
modern-frontend-security/
├── client/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── server/
│   ├── data.js
│   └── server.js
├── test/
│   └── iframe-test.html
├── answers.txt
├── package.json
└── README.md
```