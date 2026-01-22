# 🎯 MVP Scope Definition - Strapi to Next.js Migration

**Project:** Zorgforma Platform - Custom Admin Panel MVP  
**Date:** January 20, 2026  
**Status:** ✅ **APPROVED AND LOCKED**  
**Version:** 1.0 Final

---

## 📋 Confirmed Decisions

### A) Core Direction ✅
- ✅ **Remove Strapi completely**
- ✅ **Next.js full-stack** (App Router + API Routes)
- ✅ **Zero visual/UI changes** to public website
- ✅ **PostgreSQL + Prisma ORM**
- ✅ **Hetzner VPS + Docker deployment**

### B) Admin Panel Modules ✅
- ✅ **Articles** - Full CRUD
- ✅ **Messages** - Full CRUD (contact form inbox)
- ✅ **Legal Pages** - Full CRUD
- ✅ **Global Settings** - Update only
- ✅ **Steps** - Full CRUD (move from mock to DB)
- ✅ **Audiences** - Full CRUD (move from mock to DB)
- ✅ **Services** - Full CRUD (move from mock to DB)
- ✅ **Landing Pages** - Full CRUD (move from mock to DB)
- ✅ **Roles & Permissions** - 4 levels (SUPER_ADMIN, ADMIN, EDITOR, VIEWER)

### C) Contact Form Behavior ✅
- ✅ **Store in database**
- ✅ **Display in admin inbox**
- ❌ **NO email notifications** (Phase 1)
- ❌ **NO SMTP integration** (Phase 1)

### D) Media Storage ✅
- ✅ **Local disk storage** (`/public/uploads/`)
- ✅ **Regular backups** (via existing server backup strategy)
- ✅ **Portable design** (easy migration to R2/S3 later)

---

## 🎯 MVP Scope Breakdown

### Phase 1: Foundation & Database (Week 1)
**Goal:** Set up database schema and authentication

#### Deliverables:
- [x] Prisma setup and configuration
- [x] Complete database schema with all models:
  - Admin (users with 4 role levels)
  - Session (JWT session management)
  - Article (with ArticleImage relation)
  - LegalPage
  - Message
  - GlobalSettings (single record)
  - Step (7-step model)
  - Audience (target audiences)
  - Service (service offerings)
  - LandingPage (page-specific hero content)
  - Media (file metadata)
  - AuditLog (track all admin actions)
- [x] Database migration scripts
- [x] Seed script with initial data
- [x] Authentication utilities (JWT, bcrypt)
- [x] Create initial SUPER_ADMIN user script

**Effort:** 24 hours

---

### Phase 2: Backend API Development (Week 2-3)
**Goal:** Build all API endpoints for public and admin use

#### Public API Routes (Week 2)
- [x] `GET /api/public/articles` - List all published articles
- [x] `GET /api/public/articles/[slug]` - Get single article by slug
- [x] `GET /api/public/global-settings` - Get contact info and social links
- [x] `GET /api/public/steps` - Get 7-step model
- [x] `GET /api/public/audiences` - Get all audiences
- [x] `GET /api/public/services` - Get all services
- [x] `GET /api/public/legal-pages/[slug]` - Get legal page by slug
- [x] `GET /api/public/landing-pages/[slug]` - Get landing page data
- [x] `POST /api/public/contact` - Submit contact form (save to Messages)

**Effort:** 16 hours

#### Admin API Routes (Week 3)
**Authentication:**
- [x] `POST /api/admin/auth/login` - Admin login (email + password)
- [x] `POST /api/admin/auth/logout` - Admin logout
- [x] `GET /api/admin/auth/me` - Get current logged-in user

**Articles:**
- [x] `GET /api/admin/articles` - List all articles (with filters)
- [x] `POST /api/admin/articles` - Create new article
- [x] `GET /api/admin/articles/[id]` - Get single article
- [x] `PUT /api/admin/articles/[id]` - Update article
- [x] `DELETE /api/admin/articles/[id]` - Delete article

**Messages:**
- [x] `GET /api/admin/messages` - List all messages (inbox)
- [x] `GET /api/admin/messages/[id]` - Get single message
- [x] `PUT /api/admin/messages/[id]` - Update message (mark read, add notes)
- [x] `DELETE /api/admin/messages/[id]` - Delete message

**Legal Pages:**
- [x] `GET /api/admin/legal-pages` - List all legal pages
- [x] `POST /api/admin/legal-pages` - Create legal page
- [x] `GET /api/admin/legal-pages/[id]` - Get single legal page
- [x] `PUT /api/admin/legal-pages/[id]` - Update legal page
- [x] `DELETE /api/admin/legal-pages/[id]` - Delete legal page

**Settings:**
- [x] `GET /api/admin/settings` - Get global settings
- [x] `PUT /api/admin/settings` - Update global settings

**Steps:**
- [x] `GET /api/admin/steps` - List all steps
- [x] `POST /api/admin/steps` - Create step
- [x] `PUT /api/admin/steps/[id]` - Update step
- [x] `DELETE /api/admin/steps/[id]` - Delete step

**Audiences:**
- [x] `GET /api/admin/audiences` - List all audiences
- [x] `POST /api/admin/audiences` - Create audience
- [x] `PUT /api/admin/audiences/[id]` - Update audience
- [x] `DELETE /api/admin/audiences/[id]` - Delete audience

**Services:**
- [x] `GET /api/admin/services` - List all services
- [x] `POST /api/admin/services` - Create service
- [x] `PUT /api/admin/services/[id]` - Update service
- [x] `DELETE /api/admin/services/[id]` - Delete service

**Landing Pages:**
- [x] `GET /api/admin/landing-pages` - List all landing pages
- [x] `POST /api/admin/landing-pages` - Create landing page
- [x] `PUT /api/admin/landing-pages/[id]` - Update landing page
- [x] `DELETE /api/admin/landing-pages/[id]` - Delete landing page

**Media:**
- [x] `POST /api/admin/media/upload` - Upload file(s)
- [x] `GET /api/admin/media` - List all media files
- [x] `DELETE /api/admin/media/[id]` - Delete media file

**Admin Users:**
- [x] `GET /api/admin/users` - List all admin users (SUPER_ADMIN only)
- [x] `POST /api/admin/users` - Create new admin user (SUPER_ADMIN only)
- [x] `PUT /api/admin/users/[id]` - Update admin user (SUPER_ADMIN only)
- [x] `DELETE /api/admin/users/[id]` - Delete admin user (SUPER_ADMIN only)

**Effort:** 40 hours

**Middleware & Security:**
- [x] Route protection middleware
- [x] Role-based access control (RBAC)
- [x] Input validation (Zod schemas)
- [x] Rate limiting on login
- [x] CSRF protection
- [x] File upload validation

**Effort:** 8 hours

---

### Phase 3: Data Migration (Week 4)
**Goal:** Export from Strapi and import to new database

#### Deliverables:
- [x] Export script for Strapi data
  - Articles (with images)
  - Global settings
  - Legal pages
  - Messages (contact form submissions)
- [x] Transform script (Strapi format → new schema)
- [x] Image download and storage script
- [x] Import script to PostgreSQL
- [x] Verification script (count records, check integrity)
- [x] Create initial Steps data (from hardcoded)
- [x] Create initial Audiences data (from hardcoded)
- [x] Create initial Services data (from hardcoded)
- [x] Create initial Landing Pages data (from hardcoded)

**Effort:** 16 hours

---

### Phase 4: Custom Admin Panel UI (Week 5-7)
**Goal:** Build the complete admin interface

#### Core Components (Week 5)
- [x] Admin layout with sidebar navigation
- [x] Header with user menu
- [x] Responsive mobile navigation
- [x] Rich Text Editor (TipTap) component
- [x] Data Table component (sortable, filterable)
- [x] Form components (inputs, select, textarea, checkbox)
- [x] Modal/Dialog component
- [x] Toast notification component
- [x] Confirm Dialog component
- [x] Image Upload component
- [x] Loading states
- [x] Error boundaries

**Effort:** 24 hours

#### Admin Pages (Week 6-7)

**Authentication:**
- [x] `/admin/login` - Login page
- [x] Protected route middleware

**Dashboard:**
- [x] `/admin/dashboard` - Overview with stats cards
  - Total articles
  - Unread messages
  - Draft articles count
  - Recent activity feed

**Article Management:**
- [x] `/admin/articles` - List view
  - Search by title
  - Filter by category
  - Sort by date
  - Pagination
  - Quick actions (edit, delete, publish/unpublish)
- [x] `/admin/articles/new` - Create new article
  - Title, summary, category
  - Rich text editor for content
  - Image upload (multiple)
  - SEO fields (title, description, keywords)
  - Slug (auto-generated from title)
  - Featured toggle
  - Publish date picker
  - Draft/Publish toggle
- [x] `/admin/articles/[id]/edit` - Edit existing article
  - All fields editable
  - Delete button with confirmation

**Message Management:**
- [x] `/admin/messages` - Inbox view
  - List with unread indicator
  - Filter by sector
  - Search by name/email
  - Sort by date
  - Mark as read/unread (bulk actions)
  - Archive messages
- [x] `/admin/messages/[id]` - View message detail
  - Full message content
  - Contact details
  - Notes field (admin-only)
  - Mark read/unread button
  - Delete button

**Legal Pages:**
- [x] `/admin/legal-pages` - List view
- [x] `/admin/legal-pages/[id]/edit` - Edit page
  - Title and slug
  - Rich text editor

**Settings:**
- [x] `/admin/settings` - Global settings form
  - Social media URLs (Facebook, Instagram, Twitter, LinkedIn)
  - Contact info (phone, email, address)
  - Save button

**Steps Management:**
- [x] `/admin/steps` - List with inline editing
  - Drag-and-drop reordering
  - Edit number, title, summary
  - Add/delete steps

**Audiences Management:**
- [x] `/admin/audiences` - CRUD interface
  - List view
  - Create/Edit form
  - Reorder audiences

**Services Management:**
- [x] `/admin/services` - CRUD interface
  - List view
  - Create/Edit form
  - Reorder services

**Landing Pages Management:**
- [x] `/admin/landing-pages` - CRUD interface
  - List view
  - Create/Edit form
  - Upload hero video/image

**Media Library:**
- [x] `/admin/media` - Media gallery
  - Grid view of all uploads
  - Upload button (multiple files)
  - Preview modal
  - Copy URL to clipboard
  - Delete with confirmation
  - Filter by type (images, videos, documents)

**Admin Users:** (SUPER_ADMIN only)
- [x] `/admin/users` - User management
  - List all admin users
  - Create new user
  - Edit user (change role, deactivate)
  - Delete user

**Effort:** 64 hours

---

### Phase 5: Frontend Refactoring (Week 8)
**Goal:** Update public site to use new API (zero visual changes)

#### Deliverables:
- [x] Create new `src/lib/api.ts` (replaces `strapi.ts`)
- [x] Update all data fetching functions:
  - `getArticles()`
  - `getArticleBySlug(slug)`
  - `getGlobalSettings()`
  - `getLegalPageBySlug(slug)`
  - `getLandingPageBySlug(slug)`
  - `getSteps()`
  - `getAudiences()`
  - `getServices()`
  - `submitMessage(data)`
- [x] Update all page imports (change from `@/lib/strapi` to `@/lib/api`)
- [x] Test all public pages:
  - Homepage
  - Blog list page
  - Blog detail page
  - Contact page
  - 7-stappen-model page
  - Voor-wie page
  - Onze-diensten page
  - All legal pages
- [x] Verify zero visual changes
- [x] Remove Strapi dependencies from `package.json`

**Effort:** 16 hours

---

### Phase 6: Testing & Quality Assurance (Week 9)
**Goal:** Comprehensive testing before deployment

#### Functional Testing:
- [x] Admin authentication flow
- [x] All CRUD operations for each module
- [x] File upload and deletion
- [x] Role-based permissions
- [x] Contact form submission
- [x] Public API endpoints
- [x] Search and filtering

#### Data Integrity Testing:
- [x] Verify all migrated content
- [x] Check image accessibility
- [x] Validate SEO metadata
- [x] Confirm no broken links

#### Performance Testing:
- [x] Page load benchmarks
- [x] API response times
- [x] Database query optimization
- [x] Image optimization

#### Security Testing:
- [x] Unauthorized access prevention
- [x] SQL injection tests (Prisma should prevent)
- [x] XSS prevention
- [x] File upload restrictions
- [x] CSRF protection
- [x] Rate limiting

#### Browser & Device Testing:
- [x] Desktop (Chrome, Firefox, Safari, Edge)
- [x] Mobile (iOS Safari, Android Chrome)
- [x] Tablet
- [x] Admin panel responsiveness

**Effort:** 24 hours

---

### Phase 7: Deployment (Week 10)
**Goal:** Deploy to production with zero downtime

#### Pre-Deployment:
- [x] Build production bundle
- [x] Test production build locally
- [x] Create deployment Docker configuration
- [x] Prepare environment variables
- [x] Database backup (full)
- [x] Final Strapi data export

#### Staging Deployment:
- [x] Deploy to staging environment
- [x] Run database migrations
- [x] Import production data
- [x] End-to-end testing on staging
- [x] Stakeholder approval

#### Production Deployment:
- [x] Schedule maintenance window (2-hour window)
- [x] Announce maintenance to users
- [x] Stop Strapi container
- [x] Run final data migration
- [x] Deploy Next.js application
- [x] Verify all systems operational
- [x] Remove maintenance mode
- [x] Monitor for 24 hours

#### Post-Deployment:
- [x] Keep Strapi in read-only mode (30-day backup)
- [x] Daily health checks for 1 week
- [x] Create admin user documentation
- [x] Hold training session with team

**Effort:** 24 hours

---

## 📊 MVP Feature Matrix

| Module | List | Create | Edit | Delete | Search | Filter | Upload | Notes |
|--------|------|--------|------|--------|--------|--------|--------|-------|
| **Articles** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Rich text, images, SEO |
| **Messages** | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | Inbox only, no email |
| **Legal Pages** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | Rich text editor |
| **Settings** | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | Single record |
| **Steps** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | Reorderable |
| **Audiences** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | Reorderable |
| **Services** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | Reorderable |
| **Landing Pages** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | Hero media |
| **Media** | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ✅ | Gallery view |
| **Admin Users** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | SUPER_ADMIN only |

**Legend:** ✅ Included | ❌ Not Included

---

## 🔐 Role-Based Access Control (RBAC)

### SUPER_ADMIN
**Full access to everything:**
- ✅ Manage all content
- ✅ Manage admin users
- ✅ Change system settings
- ✅ Delete any content

### ADMIN
**Full content management:**
- ✅ Manage all content (Articles, Messages, Legal Pages, etc.)
- ✅ Upload media
- ✅ Update settings
- ❌ Manage admin users

### EDITOR
**Create and edit content:**
- ✅ Create articles (as draft)
- ✅ Edit own articles
- ✅ View messages
- ✅ Upload media
- ❌ Delete articles
- ❌ Publish articles (only draft)
- ❌ Manage settings

### VIEWER
**Read-only access:**
- ✅ View all content
- ✅ View messages
- ❌ Create/edit/delete anything

---

## 🚫 Out of Scope (Phase 1)

The following features are **NOT included** in MVP:

### Email & Notifications
- ❌ Email notifications for new messages
- ❌ SMTP integration
- ❌ Email templates
- ❌ Admin email alerts

### Advanced Features
- ❌ Password reset flow (can use direct database update)
- ❌ Two-factor authentication (2FA)
- ❌ Activity dashboard with charts
- ❌ Export data to CSV/Excel
- ❌ Bulk operations (except mark as read)
- ❌ Content scheduling (publish later)
- ❌ Content versioning / revision history
- ❌ Comment moderation
- ❌ Multi-language admin panel

### Media Features
- ❌ Cloud storage (S3/R2) - using local disk only
- ❌ Advanced image editing
- ❌ CDN integration

### SEO Features
- ❌ Auto-generate sitemap (can add in Phase 2)
- ❌ SEO analysis/scoring
- ❌ Meta tag previews

**Note:** These can be added in Phase 2 based on priority.

---

## 📅 Timeline & Effort Estimate

### Time Breakdown by Phase

| Phase | Duration | Effort (hours) | Deliverable |
|-------|----------|----------------|-------------|
| **1. Foundation** | Week 1 | 24h | Database ready |
| **2. Backend API** | Week 2-3 | 64h | All APIs working |
| **3. Data Migration** | Week 4 | 16h | Data imported |
| **4. Admin Panel** | Week 5-7 | 88h | Full admin UI |
| **5. Frontend Refactor** | Week 8 | 16h | Public site updated |
| **6. Testing & QA** | Week 9 | 24h | Everything tested |
| **7. Deployment** | Week 10 | 24h | Live on production |
| **TOTAL** | **10 weeks** | **256 hours** | **Complete MVP** |

### Detailed Weekly Schedule

```
Week 1 (Jan 27 - Jan 31):
├─ Prisma setup + schema
├─ Database migrations
├─ Auth utilities
└─ Initial admin user

Week 2 (Feb 3 - Feb 7):
├─ Public API routes
└─ Contact form endpoint

Week 3 (Feb 10 - Feb 14):
├─ Admin auth API
├─ CRUD APIs (Articles, Messages, Legal Pages)
├─ Middleware + RBAC
└─ File upload API

Week 4 (Feb 17 - Feb 21):
├─ Export Strapi data
├─ Transform scripts
├─ Import to PostgreSQL
└─ Verification

Week 5 (Feb 24 - Feb 28):
├─ Admin layout & components
└─ Rich text editor integration

Week 6 (Mar 3 - Mar 7):
├─ Article management UI
├─ Message inbox UI
└─ Settings UI

Week 7 (Mar 10 - Mar 14):
├─ Steps/Audiences/Services UI
├─ Media library UI
└─ Admin users UI

Week 8 (Mar 17 - Mar 21):
├─ Create new API client
├─ Update all pages
└─ Remove Strapi dependencies

Week 9 (Mar 24 - Mar 28):
├─ Functional testing
├─ Performance testing
├─ Security testing
└─ Browser testing

Week 10 (Mar 31 - Apr 4):
├─ Staging deployment
├─ Stakeholder approval
├─ Production migration
└─ Post-launch monitoring
```

---

## 💰 Budget Estimate

### Development Cost

| Resource | Rate | Hours | Subtotal |
|----------|------|-------|----------|
| Full-Stack Developer | €100/hour | 256h | €25,600 |

### Additional Costs

| Item | Cost | Notes |
|------|------|-------|
| Staging environment | €20 | 1-month VPS |
| Contingency (10%) | €2,560 | Buffer for unknowns |
| **TOTAL MVP** | **€28,180** | |

**Rounded Total: €28,000**

---

## 📊 Risk Assessment (MVP)

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Scope creep** | Medium | High | Lock scope, phase 2 for additions |
| **Data migration issues** | Low | High | Extensive testing, verification scripts |
| **Performance problems** | Low | Medium | Benchmarking, optimization |
| **Admin UX confusion** | Medium | Low | Training, documentation |
| **Deployment issues** | Low | High | Staging test, rollback plan |

**Overall Risk: 🟡 LOW-MEDIUM** (well-mitigated)

---

## ✅ Success Criteria

The MVP will be considered successful when:

### Technical
- ✅ All 8 admin modules fully functional
- ✅ All public pages working (zero visual changes)
- ✅ All Strapi data migrated successfully
- ✅ API response times < 200ms
- ✅ Page load times ≤ current baseline
- ✅ Zero critical bugs

### Functional
- ✅ Content managers can create/edit articles
- ✅ Messages inbox shows all submissions
- ✅ All CRUD operations work smoothly
- ✅ Role-based access control enforced
- ✅ File uploads working correctly

### Business
- ✅ Zero downtime during migration
- ✅ Team trained on new admin panel
- ✅ Documentation complete
- ✅ Backup strategy in place

---

## 🔄 Phase 2 Candidates

**Features to consider after MVP:**
- Email notifications for new messages
- Password reset flow
- CSV export functionality
- Content scheduling
- Activity dashboard with analytics
- Cloud storage migration (R2/S3)
- Sitemap auto-generation
- Bulk operations
- Content versioning

**Priority to be determined** after MVP launch and user feedback.

---

## 🚀 Next Steps

### To Start Development:

1. **Create development branch**
   ```bash
   git checkout -b migration/mvp
   ```

2. **Install dependencies**
   ```bash
   npm install prisma @prisma/client bcryptjs jose
   npm install sharp @tiptap/react @tiptap/starter-kit
   npm install react-hook-form @hookform/resolvers zod
   npm install -D tsx
   ```

3. **Initialize Prisma**
   ```bash
   npx prisma init
   ```

4. **Follow Phase 1 in IMPLEMENTATION_CHECKLIST.md**

---

## 📞 Approval & Sign-off

**MVP Scope approved by:**

- [ ] **Technical Lead:** _______________ Date: _______
- [ ] **Project Manager:** _______________ Date: _______
- [ ] **Budget Approver:** _______________ Date: _______

**Approved to start:** ⬜ Yes  ⬜ No  ⬜ Revisions needed

---

**Document Version:** 1.0 Final  
**Last Updated:** January 20, 2026  
**Status:** ✅ **LOCKED AND READY**  
**Total Effort:** 256 hours  
**Total Cost:** €28,000  
**Timeline:** 10 weeks (Jan 27 → Apr 4, 2026)
