# Security Threat Model & Vulnerability Report
**Application:** Zorgforma Admin Panel
**Date:** January 21, 2026
**Reviewer:** Senior Security Engineer (AI Assist)

## 1. System Assets & Trust Boundaries
### Assets
-   **Admin Credentials**: Passwords (hashed), JWT Session Cookies.
-   **Content Data**: Articles, Pages, Messages (PII: Name, Email, Phone).
-   **File Storage**: `/public/uploads` (Images).
-   **Database**: SQLite/PostgreSQL containing all above.

### Trust Boundaries
-   **Public Internet ↔ Next.js Middleware**: First line of defense.
-   **Next.js API Handler ↔ Database**: Internal trusted link (via Prisma).
-   **Admin User ↔ Admin Panel**: Trusted but prone to session hijacking/XSS.
-   **Viewer/Editor ↔ Admin Panel**: Semi-trusted, risk of privilege escalation.

## 2. Threat Model (STRIDE Analysis)

| Threat | Description | Severity | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Spoofing** | Attacker impersonates admin via stolen token or brute force. | **Critical** | HttpOnly cookies, 7d expiry, Rate Limiting, Strong Passwords. |
| **Tampering** | Attacker modifies article content to inject XSS (Stored XSS). | **High** | Sanitize all Rich Text input/output. Content-Security-Policy. |
| **Repudiation** | Malicious admin deletes data; denies doing it. | **Medium** | Audit Logging (Immutable database logs). |
| **Information Disclosure** | IDOR: Viewing messages/settings of other contexts (if multi-tenant) or leaking PII. | **High** | RBAC checks on every route. minimal PII logging. |
| **Denial of Service** | Uploading massive files or spamming login. | **Medium** | Rate limiting, File size limits, Sharp image processing. |
| **Elevation of Privilege** | `VIEWER` promotes self to `ADMIN`. | **Critical** | Strict Role checks in API. |

## 3. Vulnerability Checklist & Findings

### 🔴 Critical / High
1.  **File Upload via Extension Only**: `route.ts` relies on `file.type`. Malicious user can upload `script.php.png` or an EXE renamed to PNG.
    *   *Fix*: Validate magic bytes or re-encode image via Sharp before saving.
2.  **Missing Rate Limiting**: Login endpoint has no protection against brute force.
    *   *Fix*: Implement IP-based and Account-based rate limiting.
3.  **No Audit Logging**: Critical actions (delete, usage) are not tracked.
    *   *Fix*: Create `SecurityLog` table.
4.  **JWT Secret Default**: Code uses fallback secret `fallback-secret-change-me` if env var missing.
    *   *Fix*: Enforce ENV var presence or fail startup.

### 🟡 Medium
1.  **XSS in Blog Rendering**: `dangerouslySetInnerHTML` is used for content.
    *   *Fix*: Ensure Tiptap output is sanitized before saving OR before rendering. Next.js does not sanitize HTML by default.
2.  **API Route Protection**: Middleware explicitly skips `/api/`. If a developer forgets `getSession()` in a new route, it's public.
    *   *Fix*: Enforce auth in a centralized wrapper or ensure middleware covers API too (difficult/risky for public APIs). Better: Code Review + Wrapper.

### 🟢 Low / Best Practice
1.  **Security Headers**: Not explicitly configured.
2.  **Password Policy**: current validation is minimal (`min(8)`).

## 4. Remediation Plan
1.  **Database Update**: Add `SecurityLog` and `LoginAttempt` models.
2.  **Auth Hardening**: Implement Rate Limiter & Change Password flow.
3.  **Upload Hardening**: Rewire `upload` route to validate image integrity.
4.  **XSS Prevention**: Add `isomorphic-dompurify`.
5.  **Headers**: Update `next.config.ts`.
