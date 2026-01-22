# ✅ Strapi to Next.js Migration - Implementation Checklist

This document provides a step-by-step actionable checklist for the migration process.

---

## 🎯 Pre-Migration Preparation

### Week 0: Planning & Setup

- [ ] **Review and approve migration plan** with all stakeholders
- [ ] **Create backups** of current production database
- [ ] **Export current Strapi data** as JSON backup
- [ ] **Document current admin workflows** (screenshots/video)
- [ ] **Set up project management board** (Trello/Jira/Linear)
- [ ] **Create development branch** `git checkout -b migration/custom-admin`
- [ ] **Set up staging environment** (separate Hetzner instance if needed)

---

## 📦 Phase 1: Foundation (Week 1)

### Database Setup

- [ ] Install Prisma
  ```bash
  npm install prisma @prisma/client
  npm install -D tsx
  ```
- [ ] Initialize Prisma
  ```bash
  npx prisma init
  ```
- [ ] Create complete schema in `prisma/schema.prisma`
- [ ] Configure DATABASE_URL in `.env.local`
- [ ] Run initial migration
  ```bash
  npx prisma migrate dev --name initial_setup
  ```
- [ ] Generate Prisma Client
  ```bash
  npx prisma generate
  ```

### Authentication Foundation

- [ ] Install auth dependencies
  ```bash
  npm install bcryptjs jose
  npm install -D @types/bcryptjs
  ```
- [ ] Create `src/lib/auth.ts` with JWT utilities
- [ ] Create `src/lib/db.ts` with Prisma client singleton
- [ ] Create `src/middleware.ts` for route protection
- [ ] Create password hashing utilities

### Environment Configuration

- [ ] Add new environment variables to `.env.local`
  ```env
  DATABASE_URL="postgresql://..."
  JWT_SECRET="..."
  JWT_EXPIRES_IN="7d"
  UPLOAD_DIR="./public/uploads"
  ```
- [ ] Update `.env.example` with new variables
- [ ] Update `.gitignore` for uploads directory

---

## 🔧 Phase 2: Backend API (Week 2)

### Core API Routes

#### Authentication Routes

- [ ] Create `src/app/api/admin/auth/login/route.ts`
  - Email/password validation
  - JWT token generation
  - Session creation
- [ ] Create `src/app/api/admin/auth/logout/route.ts`
  - Session invalidation
- [ ] Create `src/app/api/admin/auth/me/route.ts`
  - Get current user from token
- [ ] Test auth flow with Postman/Thunder Client

#### Public API Routes

- [ ] Create `src/app/api/public/articles/route.ts` (GET list)
- [ ] Create `src/app/api/public/articles/[slug]/route.ts` (GET single)
- [ ] Create `src/app/api/public/global-settings/route.ts` (GET)
- [ ] Create `src/app/api/public/steps/route.ts` (GET)
- [ ] Create `src/app/api/public/audiences/route.ts` (GET)
- [ ] Create `src/app/api/public/legal-pages/[slug]/route.ts` (GET)
- [ ] Create `src/app/api/public/contact/route.ts` (POST message)

#### Admin API Routes (Protected)

- [ ] Create `src/app/api/admin/articles/route.ts` (GET, POST)
- [ ] Create `src/app/api/admin/articles/[id]/route.ts` (GET, PUT, DELETE)
- [ ] Create `src/app/api/admin/messages/route.ts` (GET)
- [ ] Create `src/app/api/admin/messages/[id]/route.ts` (GET, PUT, DELETE)
- [ ] Create `src/app/api/admin/legal-pages/route.ts` (GET, POST)
- [ ] Create `src/app/api/admin/legal-pages/[id]/route.ts` (GET, PUT, DELETE)
- [ ] Create `src/app/api/admin/settings/route.ts` (GET, PUT)
- [ ] Create `src/app/api/admin/steps/route.ts` (GET, POST, PUT)
- [ ] Create `src/app/api/admin/audiences/route.ts` (GET, POST, PUT)

### File Upload System

- [ ] Create `src/app/api/admin/media/upload/route.ts`
- [ ] Install image processing library
  ```bash
  npm install sharp
  ```
- [ ] Create upload handler with validation
- [ ] Create thumbnail generation
- [ ] Create `src/app/api/admin/media/route.ts` (list media)
- [ ] Create `src/app/api/admin/media/[id]/route.ts` (delete)

### Validation

- [ ] Create Zod schemas in `src/lib/validation.ts`
  - Article schema
  - Message schema
  - Settings schema
  - Admin user schema
- [ ] Add validation to all POST/PUT endpoints

---

## 🗄️ Phase 3: Data Migration (Week 2-3)

### Export from Strapi

- [ ] Create `scripts/export-strapi-data.ts`
- [ ] Export Articles
  - Include images
  - Include metadata
- [ ] Export Global Settings
- [ ] Export Legal Pages
- [ ] Export Messages
- [ ] Save as JSON files in `data/exports/`

### Import to PostgreSQL

- [ ] Create `scripts/import-to-postgres.ts`
- [ ] Import Articles
  - Transform content blocks format
  - Download and save images locally
  - Create database records
- [ ] Import Global Settings
- [ ] Import Legal Pages
- [ ] Import Messages
- [ ] Create initial Steps data
- [ ] Create initial Audiences data
- [ ] Create initial Services data

### Data Verification

- [ ] Create `scripts/verify-migration.ts`
- [ ] Count records (old vs new)
- [ ] Spot-check critical articles
- [ ] Verify all images accessible
- [ ] Check SEO metadata preserved

---

## 🎨 Phase 4: Admin Panel UI (Week 3-5)

### Admin Layout & Navigation

- [ ] Create `src/app/admin/layout.tsx`
- [ ] Create `src/components/admin/Sidebar.tsx`
- [ ] Create `src/components/admin/Header.tsx`
- [ ] Create navigation structure
- [ ] Add responsive mobile menu
- [ ] Add user menu dropdown

### Authentication Pages

- [ ] Create `src/app/admin/login/page.tsx`
  - Email/password form
  - Error handling
  - Remember me option
  - Form validation
- [ ] Create `src/app/admin/logout/page.tsx`
- [ ] Add protected route middleware
- [ ] Test login flow

### Dashboard

- [ ] Create `src/app/admin/dashboard/page.tsx`
- [ ] Add stats cards
  - Total articles
  - Unread messages
  - Published/draft ratio
- [ ] Add recent activity feed
- [ ] Add quick action buttons

### Article Management

- [ ] Install editor dependencies
  ```bash
  npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image
  npm install react-hook-form @hookform/resolvers
  ```
- [ ] Create `src/components/admin/RichTextEditor.tsx`
- [ ] Create `src/app/admin/articles/page.tsx` (list view)
  - Search functionality
  - Filter by category
  - Sort by date
  - Pagination
- [ ] Create `src/app/admin/articles/new/page.tsx`
  - Title, summary, category fields
  - Rich text editor
  - Image upload
  - SEO fields
  - Draft/publish toggle
  - Slug auto-generation
- [ ] Create `src/app/admin/articles/[id]/edit/page.tsx`
  - Pre-fill form with existing data
  - Update functionality
  - Delete confirmation
- [ ] Add form validation
- [ ] Add save states (saving, saved, error)

### Message Management

- [ ] Create `src/app/admin/messages/page.tsx` (inbox)
  - List view with filters
  - Unread indicator
  - Sort by date
  - Search functionality
  - Bulk actions (mark read, archive)
- [ ] Create `src/app/admin/messages/[id]/page.tsx` (view)
  - Full message details
  - Mark read/unread
  - Add notes field
  - Archive/delete
  - Email sender button

### Legal Pages Management

- [ ] Create `src/app/admin/legal-pages/page.tsx` (list)
- [ ] Create `src/app/admin/legal-pages/[slug]/edit/page.tsx`
  - Rich text editor
  - Update functionality

### Settings Management

- [ ] Create `src/app/admin/settings/page.tsx`
  - Global settings form
  - Social media URLs
  - Contact information
  - Save functionality

### Steps Management

- [ ] Create `src/app/admin/steps/page.tsx`
  - List view with reordering
  - Inline editing
  - Add/delete steps

### Audiences Management

- [ ] Create `src/app/admin/audiences/page.tsx`
  - CRUD interface
  - Reordering

### Media Library

- [ ] Create `src/app/admin/media/page.tsx`
  - Grid view of all media
  - Upload button
  - Preview modal
  - Copy URL button
  - Delete confirmation

### Admin UI Components

- [ ] Create `src/components/admin/DataTable.tsx`
  - Sortable columns
  - Pagination
  - Row selection
- [ ] Create `src/components/admin/Modal.tsx`
- [ ] Create `src/components/admin/Toast.tsx`
- [ ] Create `src/components/admin/ConfirmDialog.tsx`
- [ ] Create `src/components/admin/LoadingSpinner.tsx`
- [ ] Create `src/components/admin/FormField.tsx`
- [ ] Create `src/components/admin/ImageUpload.tsx`
- [ ] Create `src/components/admin/Badge.tsx`
- [ ] Create `src/components/admin/Button.tsx`

---

## 🔄 Phase 5: Frontend Refactoring (Week 5-6)

### Update Data Fetching

- [ ] Create new `src/lib/api.ts` (replaces `strapi.ts`)
- [ ] Update all imports
  ```typescript
  // Find and replace
  from '@/lib/strapi' → from '@/lib/api'
  ```
- [ ] Update `getArticles()` function
- [ ] Update `getArticleBySlug()` function
- [ ] Update `getGlobalSettings()` function
- [ ] Update `getLegalPageBySlug()` function
- [ ] Update `getSteps()` function
- [ ] Update `getAudiences()` function
- [ ] Update `submitMessage()` function

### Update All Pages

- [ ] Test `src/app/page.tsx` (homepage)
- [ ] Test `src/app/blog/page.tsx` (blog list)
- [ ] Test `src/app/blog/[slug]/page.tsx` (article detail)
- [ ] Test `src/app/contact/page.tsx` (contact form)
- [ ] Test `src/app/7-stappen-model/page.tsx`
- [ ] Test `src/app/voor-wie/page.tsx`
- [ ] Test `src/app/onze-diensten/page.tsx`
- [ ] Test `src/app/privacyverklaring/page.tsx`
- [ ] Test `src/app/algemene-voorwaarden/page.tsx`
- [ ] Test `src/app/cookiebeleid/page.tsx`
- [ ] Test `src/app/colofon/page.tsx`

### Remove Strapi Dependencies

- [ ] Remove `@strapi/*` packages from `package.json`
- [ ] Remove `backend/` directory reference in docs
- [ ] Update README.md
- [ ] Remove Strapi-specific environment variables
- [ ] Remove `backend-deploy.zip` (after verifying migration)

---

## 🧪 Phase 6: Testing (Week 6-7)

### Functional Testing

- [ ] Test admin login with correct credentials
- [ ] Test admin login with incorrect credentials
- [ ] Test session expiration
- [ ] Test password reset flow (if implemented)
- [ ] Test create new article
- [ ] Test edit existing article
- [ ] Test delete article (with confirmation)
- [ ] Test publish/unpublish article
- [ ] Test image upload in article
- [ ] Test contact form submission
- [ ] Test message visibility in admin
- [ ] Test mark message as read
- [ ] Test settings update
- [ ] Test media library upload
- [ ] Test media library delete

### Data Integrity Testing

- [ ] Verify all articles migrated correctly
- [ ] Verify all images accessible
- [ ] Verify all SEO metadata present
- [ ] Verify all legal pages present
- [ ] Verify all messages migrated
- [ ] Verify global settings correct

### Performance Testing

- [ ] Benchmark homepage load time
- [ ] Benchmark blog list page load time
- [ ] Benchmark article detail page load time
- [ ] Test with large result sets (100+ articles)
- [ ] Test image optimization working
- [ ] Check Next.js build size
- [ ] Test admin panel responsiveness

### Security Testing

- [ ] Test unauthorized access to admin routes
- [ ] Test SQL injection prevention
- [ ] Test XSS prevention in rich text
- [ ] Test file upload restrictions
- [ ] Test rate limiting on login
- [ ] Test CSRF protection
- [ ] Test JWT token expiration
- [ ] Review environment variable exposure

### Browser & Device Testing

- [ ] Test on Chrome (desktop)
- [ ] Test on Firefox (desktop)
- [ ] Test on Safari (desktop)
- [ ] Test on Edge (desktop)
- [ ] Test on Safari (iPhone)
- [ ] Test on Chrome (Android)
- [ ] Test on tablet (iPad/Android)
- [ ] Test admin panel on mobile

### SEO Testing

- [ ] Verify all metadata tags present
- [ ] Test Open Graph tags
- [ ] Test Twitter Card tags
- [ ] Verify canonical URLs
- [ ] Test sitemap.xml generation
- [ ] Test robots.txt
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals

---

## 🚀 Phase 7: Staging Deployment (Week 7)

### Prepare Staging Environment

- [ ] Set up staging database (PostgreSQL)
- [ ] Configure staging environment variables
- [ ] Update Docker configuration
- [ ] Build production bundle
  ```bash
  npm run build
  ```
- [ ] Test production build locally
  ```bash
  npm run start
  ```

### Deploy to Staging

- [ ] Deploy to staging server
- [ ] Run database migrations on staging
- [ ] Import production data to staging
- [ ] Verify staging environment working
- [ ] Test all critical user flows
- [ ] Get stakeholder approval

### Create Admin User

- [ ] Create script `scripts/create-admin.ts`
- [ ] Run on staging to create initial admin
  ```bash
  npm run admin:create
  ```
- [ ] Test admin login on staging

---

## 📦 Phase 8: Production Migration (Week 8)

### Pre-Migration

- [ ] **Announce maintenance window** (email/social media)
- [ ] **Create full database backup**
- [ ] **Export all Strapi data** (final backup)
- [ ] **Prepare rollback plan**
- [ ] **Test rollback procedure**

### Migration Day

- [ ] **Put site in maintenance mode**
- [ ] **Stop Strapi container**
- [ ] **Run data migration script**
  ```bash
  npm run import:data
  ```
- [ ] **Run database migrations**
  ```bash
  npx prisma migrate deploy
  ```
- [ ] **Create production admin user**
  ```bash
  npm run admin:create
  ```
- [ ] **Deploy Next.js application**
- [ ] **Start production containers**
- [ ] **Verify deployment successful**
- [ ] **Test critical flows**
  - Homepage loads
  - Articles load
  - Contact form works
  - Admin login works
- [ ] **Remove maintenance mode**
- [ ] **Monitor error logs for 1 hour**

### Post-Migration

- [ ] Test all pages manually
- [ ] Check analytics tracking
- [ ] Verify email notifications working
- [ ] Monitor server resources
- [ ] Check error tracking (Sentry/etc)
- [ ] Keep Strapi in read-only mode (backup for 30 days)

---

## 📊 Phase 9: Monitoring & Optimization (Week 9-10)

### Monitoring Setup

- [ ] Set up error tracking (Sentry)
- [ ] Set up uptime monitoring
- [ ] Set up performance monitoring
- [ ] Configure alerts for critical errors
- [ ] Set up daily backup automation

### Documentation

- [ ] Create admin panel user guide
- [ ] Document API endpoints
- [ ] Create troubleshooting guide
- [ ] Update README.md
- [ ] Document backup/restore procedures
- [ ] Create runbook for common tasks

### Training

- [ ] Train team on new admin panel
- [ ] Create video tutorials
- [ ] Hold Q&A session

### Optimization

- [ ] Review slow queries
- [ ] Add database indexes if needed
- [ ] Optimize image delivery
- [ ] Review bundle size
- [ ] Add missing caching headers
- [ ] Implement Redis caching (if needed)

---

## 🎉 Migration Complete Checklist

- [ ] All content successfully migrated
- [ ] Admin panel fully functional
- [ ] No critical bugs reported
- [ ] Performance meets or exceeds baseline
- [ ] Team trained on new system
- [ ] Documentation complete
- [ ] Backups configured and tested
- [ ] Monitoring in place
- [ ] Strapi decommissioned (after 30-day safe period)
- [ ] Celebrate! 🎊

---

## 📝 Notes & Decisions Log

### Decision: [Date]
**Question:**  
**Decision:**  
**Rationale:**  

---

**Last Updated:** January 20, 2026  
**Status:** 🔴 Not Started

### Status Legend
- 🔴 Not Started
- 🟡 In Progress
- 🟢 Complete
- 🔵 Blocked
- ⚫ Cancelled
