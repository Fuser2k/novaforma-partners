# Security Acceptance Test Plan
**Date:** January 21, 2026
**Scope:** Admin Panel Hardening

## 1. Automated/Unit Tests (Concept)
- [ ] **Rate Limiting**:
    - Trigger 5 failed logins with same email.
    - 6th attempt should return 429 Too Many Requests.
    - Wait 15 mins (or mock time), 7th attempt should work/fail normally (not 429).
- [ ] **File Upload**:
    - Upload legitimate PNG -> 201 Created.
    - Upload Text file renamed to .png -> 400 Bad Request (Sharp validation failed).
    - Upload 10MB file -> 400 Bad Request (Size limit).
- [ ] **Change Password**:
    - Weak password -> 400 Bad Request.
    - Wrong current password -> 401 Unauthorized.
    - Success -> 200 OK + Session Cookie Invalidated (try using old cookie -> 401).

## 2. Manual Penetration Test Steps

### Authentication & Sessions
1.  **Brute Force**: Use Burp Suite or script to send 10 wrong passwords. Verify lockout.
2.  **Session Logout**: Click Logout. Click Back button. Refresh. Should be redirected to Login.
3.  **Password Change**: Change password. Open new tab with old session. Refresh. Should be logged out.

### File Upload (RCE Prevention)
1.  Create `phpinfo.php` or `alert.html`.
2.  Rename to `test.png`.
3.  Upload via Media Library.
4.  **Expected**: Error "Invalid or corrupt image file" (Sharp fails to process).
5.  **Bypass**: Try uploading valid GIF with PHP comment embedded.
6.  **Expected**: Sharp re-encoding (to WebP/GIF) should strip the comment/metadata.

### XSS & Injection
1.  **Rich Text**: Enter `<img src=x onerror=alert(1)>` in Article Content.
2.  **View**: Save and View Public Page. Alert should NOT pop (Next.js/React escapes or DOMPurify cleans).
3.  **Settings**: Enter `<script>alert('site')</script>` in Site Name. Save. Reload. Check alert.

### Authorization (IDOR/RBAC)
1.  Login as VIEWER (if available) or create generic admin.
2.  Try `DELETE /api/admin/users/1`.
3.  **Expected**: 403 Forbidden (Only Super Admin).

## 3. Acceptance Criteria Checklist (Production Ready)

- [ ] **Rate Limiting**: Verified active on Login.
- [ ] **Strong Passwords**: Enforced on Change Password screen.
- [ ] **Uploads**: Only valid images (processed by Sharp) allowed. No executables.
- [ ] **Audit Logs**: Events appearing in `SecurityEvent` / `AuditLog` tables.
- [ ] **Headers**: Security headers (HSTS, X-Frame-Options) configured in `next.config.ts`.

## 4. Code Review Confirmation
- [x] `src/lib/security.ts` implemented.
- [x] `upload/route.ts` hardened with Sharp.
- [x] `login/route.ts` rate limited.
- [x] `change-password/route.ts` implemented.
