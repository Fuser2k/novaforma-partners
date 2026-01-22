# 🚀 Strapi to Next.js Migration Plan
**Project: Zorgforma**  
**Date: January 20, 2026**  
**Objective: Migrate from Strapi CMS to Next.js with Custom Admin Panel**

---

## 📋 Executive Summary

This document outlines a comprehensive migration strategy to rebuild the Zorgforma project using Next.js with a custom admin panel, replacing the current Strapi backend while maintaining identical visual design and functionality.

### Current Architecture
- **Frontend:** Next.js 16.1.1 (App Router)
- **Backend:** Strapi 5.33.2
- **Database:** PostgreSQL
- **Deployment:** Hetzner VPS (Dockerized)

### Target Architecture
- **Full Stack:** Next.js 16.1.1 (App Router + API Routes)
- **Database:** PostgreSQL (retained)
- **Admin Panel:** Custom-built React admin interface
- **Deployment:** Same infrastructure (Hetzner VPS)

---

## 🎯 Migration Goals

### Must Have
✅ **Zero visual changes** - Exact same UI/UX for end users  
✅ **Custom admin panel** - Full-featured CMS replacement  
✅ **Data preservation** - All existing content migrated  
✅ **SEO maintenance** - Keep all URLs and metadata  
✅ **Feature parity** - All Strapi features replicated  

### Should Have
⭐ **Improved performance** - Faster load times  
⭐ **Better developer experience** - Simplified codebase  
⭐ **Enhanced security** - Custom authentication  
⭐ **Cost reduction** - Single codebase deployment  

---

## 📊 Current Content Model Analysis

### Strapi Content Types

#### 1. **Article** (Collection Type)
```json
{
  "title": "string",
  "summary": "text",
  "category": "string",
  "slug": "uid",
  "content": "blocks",
  "image": "media[]",
  "seoTitle": "string",
  "seoDescription": "text",
  "keywords": "string",
  "isFeatured": "boolean",
  "publishDate": "date",
  "publishedAt": "datetime",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

#### 2. **Global** (Collection Type - should be Single Type)
```json
{
  "facebookUrl": "string",
  "instagramUrl": "string",
  "twitterUrl": "string",
  "phone": "string",
  "email": "string",
  "address": "string"
}
```

#### 3. **Legal Page** (Collection Type)
```json
{
  "title": "string",
  "slug": "uid",
  "content": "blocks"
}
```

#### 4. **Message** (Collection Type - Contact Form Submissions)
```json
{
  "name": "string",
  "email": "email",
  "phone": "string",
  "sector": "enum",
  "region": "string",
  "message": "text",
  "termsAccepted": "boolean"
}
```

**Sector Options:**
- WLZ
- WMO
- Zvw
- GGZ
- Gehandicaptenzorg
- Jeugdzorg
- Andere

### Additional Data (Currently Mock/Hardcoded)

#### 5. **Steps** (Mock Data)
7-step model currently hardcoded in `strapi.ts`

#### 6. **Audiences** (Mock Data)
4 audience types currently hardcoded

#### 7. **Services** (Mock Data)
Service offerings

#### 8. **Landing Pages** (Mock Data)
Page-specific hero content

---

## 🏗️ New Database Schema (PostgreSQL)

### Database Design Principles
- **Use Prisma ORM** - Type-safe database access
- **UUID primary keys** - Better for distributed systems
- **Soft deletes** - Keep audit trail
- **Timestamps** - Track all changes
- **User tracking** - Who created/updated what

### Proposed Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// ADMIN & AUTH
// ============================================

model Admin {
  id            String    @id @default(uuid())
  email         String    @unique
  passwordHash  String
  firstName     String?
  lastName      String?
  role          AdminRole @default(EDITOR)
  isActive      Boolean   @default(true)
  lastLoginAt   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  createdArticles Article[] @relation("ArticleCreator")
  updatedArticles Article[] @relation("ArticleUpdater")
  sessions        Session[]
  
  @@index([email])
}

enum AdminRole {
  SUPER_ADMIN
  ADMIN
  EDITOR
  VIEWER
}

model Session {
  id        String   @id @default(uuid())
  adminId   String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
  
  admin     Admin    @relation(fields: [adminId], references: [id], onDelete: Cascade)
  
  @@index([token])
  @@index([adminId])
}

// ============================================
// CONTENT
// ============================================

model Article {
  id              String    @id @default(uuid())
  title           String
  summary         String    @db.Text
  category        String
  slug            String    @unique
  content         Json      // Rich text blocks
  seoTitle        String?
  seoDescription  String?   @db.Text
  keywords        String?
  isFeatured      Boolean   @default(false)
  publishDate     DateTime?
  isDraft         Boolean   @default(true)
  publishedAt     DateTime?
  
  // Media
  images          ArticleImage[]
  
  // Audit
  createdById     String?
  updatedById     String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  deletedAt       DateTime?
  
  createdBy       Admin?    @relation("ArticleCreator", fields: [createdById], references: [id])
  updatedBy       Admin?    @relation("ArticleUpdater", fields: [updatedById], references: [id])
  
  @@index([slug])
  @@index([category])
  @@index([publishDate])
  @@index([isFeatured])
}

model ArticleImage {
  id         String   @id @default(uuid())
  articleId  String
  url        String
  alt        String?
  caption    String?
  order      Int      @default(0)
  createdAt  DateTime @default(now())
  
  article    Article  @relation(fields: [articleId], references: [id], onDelete: Cascade)
  
  @@index([articleId])
}

model LegalPage {
  id         String    @id @default(uuid())
  title      String
  slug       String    @unique
  content    Json      // Rich text blocks
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
  deletedAt  DateTime?
  
  @@index([slug])
}

model Message {
  id             String         @id @default(uuid())
  name           String
  email          String
  phone          String
  sector         MessageSector
  region         String?
  message        String         @db.Text
  termsAccepted  Boolean        @default(false)
  isRead         Boolean        @default(false)
  isArchived     Boolean        @default(false)
  notes          String?        @db.Text
  createdAt      DateTime       @default(now())
  updatedAt      DateTime       @updatedAt
  
  @@index([createdAt])
  @@index([isRead])
  @@index([sector])
}

enum MessageSector {
  WLZ
  WMO
  Zvw
  GGZ
  Gehandicaptenzorg
  Jeugdzorg
  Andere
}

model GlobalSettings {
  id              String   @id @default(uuid())
  // Social Media
  facebookUrl     String?
  instagramUrl    String?
  twitterUrl      String?
  linkedinUrl     String?
  
  // Contact
  phone           String?
  email           String?
  address         String?
  
  // Other settings
  siteName        String?
  siteDescription String?  @db.Text
  
  updatedAt       DateTime @updatedAt
}

model Step {
  id          String   @id @default(uuid())
  number      Int      @unique
  title       String
  summary     String   @db.Text
  description String?  @db.Text
  isActive    Boolean  @default(true)
  order       Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([number])
  @@index([order])
}

model Audience {
  id          String   @id @default(uuid())
  title       String
  description String   @db.Text
  benefits    String[] // Array of strings
  order       Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([order])
}

model Service {
  id          String   @id @default(uuid())
  title       String
  description String   @db.Text
  icon        String?  // Icon name or URL
  order       Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([order])
}

model LandingPage {
  id            String   @id @default(uuid())
  slug          String   @unique
  title         String?
  subtitle      String?  @db.Text
  heroVideoUrl  String?
  heroImageUrl  String?
  isActive      Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@index([slug])
}

// ============================================
// MEDIA MANAGEMENT
// ============================================

model Media {
  id          String      @id @default(uuid())
  filename    String
  originalName String
  mimeType    String
  size        Int         // bytes
  url         String
  thumbnailUrl String?
  alt         String?
  caption     String?
  folder      String?
  uploadedById String?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  deletedAt   DateTime?
  
  @@index([folder])
  @@index([mimeType])
  @@index([createdAt])
}

// ============================================
// AUDIT LOG
// ============================================

model AuditLog {
  id          String   @id @default(uuid())
  adminId     String?
  action      String   // CREATE, UPDATE, DELETE
  entity      String   // Article, Message, etc.
  entityId    String
  changes     Json?    // Before/after snapshot
  ipAddress   String?
  userAgent   String?
  createdAt   DateTime @default(now())
  
  @@index([adminId])
  @@index([entity, entityId])
  @@index([createdAt])
}
```

---

## 🔧 Technical Implementation Plan

### Phase 1: Foundation Setup (Week 1)

#### 1.1 Database Setup
- [ ] Install Prisma
- [ ] Create `prisma/schema.prisma` with full schema
- [ ] Set up database connection
- [ ] Run initial migration
- [ ] Create seed script for development data

#### 1.2 API Routes Architecture
```
src/app/api/
├── admin/
│   ├── auth/
│   │   ├── login/route.ts
│   │   ├── logout/route.ts
│   │   └── me/route.ts
│   ├── articles/
│   │   ├── route.ts (GET all, POST create)
│   │   └── [id]/route.ts (GET, PUT, DELETE)
│   ├── messages/
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   ├── legal-pages/
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   ├── settings/
│   │   └── route.ts
│   └── media/
│       ├── upload/route.ts
│       └── [id]/route.ts
└── public/
    ├── articles/route.ts
    ├── global-settings/route.ts
    ├── steps/route.ts
    └── landing-pages/[slug]/route.ts
```

#### 1.3 Authentication System
- [ ] Implement JWT-based auth
- [ ] Create middleware for protected routes
- [ ] Set up session management
- [ ] Password hashing with bcrypt

### Phase 2: Data Migration (Week 1-2)

#### 2.1 Export Strapi Data
```bash
# Create export script
scripts/export-strapi-data.ts
```

- [ ] Export all articles with images
- [ ] Export global settings
- [ ] Export legal pages
- [ ] Export messages (contact form submissions)

#### 2.2 Import to New Database
```bash
# Create import script
scripts/import-to-postgres.ts
```

- [ ] Transform Strapi format to new schema
- [ ] Handle media files migration
- [ ] Verify data integrity

### Phase 3: Backend API Development (Week 2-3)

#### 3.1 Core API Endpoints

**Articles API**
```typescript
// GET /api/public/articles
// GET /api/public/articles/[slug]
// POST /api/admin/articles (protected)
// PUT /api/admin/articles/[id] (protected)
// DELETE /api/admin/articles/[id] (protected)
```

**Messages API**
```typescript
// POST /api/public/contact (public form submission)
// GET /api/admin/messages (protected)
// PUT /api/admin/messages/[id] (protected - mark as read)
// DELETE /api/admin/messages/[id] (protected)
```

**Settings API**
```typescript
// GET /api/public/settings
// PUT /api/admin/settings (protected)
```

**Steps API**
```typescript
// GET /api/public/steps
// POST /api/admin/steps (protected)
// PUT /api/admin/steps/[id] (protected)
// DELETE /api/admin/steps/[id] (protected)
```

#### 3.2 File Upload System
- [ ] Set up file storage (local or S3-compatible)
- [ ] Image optimization (sharp library)
- [ ] Upload endpoint with validation
- [ ] Media library management

### Phase 4: Custom Admin Panel (Week 3-5)

#### 4.1 Admin Panel Architecture
```
src/app/admin/
├── layout.tsx (admin-specific layout)
├── login/page.tsx
├── dashboard/page.tsx
├── articles/
│   ├── page.tsx (list)
│   ├── new/page.tsx
│   └── [id]/edit/page.tsx
├── messages/
│   ├── page.tsx (list/inbox)
│   └── [id]/page.tsx (view)
├── legal-pages/
│   ├── page.tsx
│   └── [slug]/edit/page.tsx
├── steps/
│   └── page.tsx
├── audiences/
│   └── page.tsx
├── settings/
│   └── page.tsx
└── media/
    └── page.tsx
```

#### 4.2 Admin UI Components Library

**Core Components**
- [ ] Sidebar Navigation
- [ ] Top Header (user menu, notifications)
- [ ] Data Table (sortable, filterable)
- [ ] Rich Text Editor (TipTap or similar)
- [ ] Form Components (inputs, selects, etc.)
- [ ] Modal/Dialog
- [ ] File Upload with Preview
- [ ] Image Gallery
- [ ] Toast Notifications
- [ ] Confirm Dialog

**Recommended Libraries**
```json
{
  "@tanstack/react-table": "^8.x",
  "@tiptap/react": "^2.x",
  "react-hook-form": "^7.x",
  "zod": "^3.x",
  "date-fns": "^3.x",
  "recharts": "^2.x" // for dashboard analytics
}
```

#### 4.3 Admin Features

**Dashboard**
- [ ] Total articles count
- [ ] Unread messages count
- [ ] Recent activity feed
- [ ] Quick actions

**Article Management**
- [ ] List view with search and filters
- [ ] Create/Edit with rich text editor
- [ ] Image upload and management
- [ ] SEO fields
- [ ] Draft/Publish workflow
- [ ] Featured articles toggle
- [ ] Category management

**Message Management**
- [ ] Inbox view
- [ ] Mark as read/unread
- [ ] Filter by sector
- [ ] Export to CSV
- [ ] Archive old messages
- [ ] Add internal notes

**Settings Management**
- [ ] Global settings form
- [ ] Social media links
- [ ] Contact information
- [ ] Site metadata

**User Management**
- [ ] Admin users CRUD
- [ ] Role management
- [ ] Password reset
- [ ] Activity logs

### Phase 5: Frontend Refactoring (Week 5-6)

#### 5.1 Update Data Fetching
- [ ] Replace Strapi client with new API calls
- [ ] Update `src/lib/strapi.ts` → `src/lib/api.ts`
- [ ] Replace all imports
- [ ] Update type definitions

#### 5.2 Server Components Optimization
```typescript
// Example: Update article fetching
// Before:
import { getArticles } from '@/lib/strapi'

// After:
import { getArticles } from '@/lib/api'
```

- [ ] Ensure all public pages use new API
- [ ] Test data fetching on all pages
- [ ] Verify caching strategies

### Phase 6: Testing & Quality Assurance (Week 6-7)

#### 6.1 Testing Checklist
- [ ] All pages load correctly
- [ ] Articles display properly
- [ ] Contact form submissions work
- [ ] Admin login/logout works
- [ ] Admin CRUD operations work
- [ ] File uploads work
- [ ] SEO metadata correct
- [ ] Mobile responsiveness
- [ ] Performance benchmarks
- [ ] Security audit

#### 6.2 Migration Validation
- [ ] Compare old vs new site side-by-side
- [ ] Verify all content migrated
- [ ] Check all URLs redirect correctly
- [ ] Test all forms
- [ ] Verify all images load

### Phase 7: Deployment (Week 7-8)

#### 7.1 Deployment Strategy
```
1. Deploy to staging environment
2. Run full migration script on production DB
3. Test staging thoroughly
4. Schedule maintenance window
5. Deploy to production
6. Monitor logs and errors
7. Keep Strapi as read-only backup for 30 days
```

#### 7.2 Deployment Configuration

**Docker Setup**
```dockerfile
# Dockerfile (Frontend + Backend in one)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["npm", "start"]
```

**Environment Variables**
```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Auth
JWT_SECRET="your-super-secret-key"
JWT_EXPIRES_IN="7d"

# File Upload
UPLOAD_DIR="/app/uploads"
MAX_FILE_SIZE="10485760" # 10MB

# Admin
ADMIN_EMAIL="admin@zorgforma.nl"
ADMIN_PASSWORD_DEFAULT="change-me-on-first-login"
```

---

## 📁 Project Structure (New)

```
zorgforma/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── public/
│   ├── uploads/           # User-uploaded files
│   └── ...
├── scripts/
│   ├── export-strapi.ts   # Data export script
│   ├── import-data.ts     # Data import script
│   └── create-admin.ts    # Create initial admin user
├── src/
│   ├── app/
│   │   ├── (public)/      # Public-facing pages
│   │   │   ├── page.tsx
│   │   │   ├── blog/
│   │   │   ├── contact/
│   │   │   └── ...
│   │   ├── admin/         # Admin panel
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   ├── articles/
│   │   │   ├── messages/
│   │   │   └── settings/
│   │   └── api/           # API routes
│   │       ├── admin/     # Protected admin APIs
│   │       └── public/    # Public APIs
│   ├── components/
│   │   ├── admin/         # Admin-specific components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── DataTable.tsx
│   │   │   ├── RichTextEditor.tsx
│   │   │   └── ...
│   │   └── ...            # Public components
│   ├── lib/
│   │   ├── api.ts         # API client (replaces strapi.ts)
│   │   ├── auth.ts        # Auth utilities
│   │   ├── db.ts          # Prisma client
│   │   ├── upload.ts      # File upload utilities
│   │   └── validation.ts  # Zod schemas
│   └── middleware.ts      # Auth middleware
├── .env.local
├── package.json
└── tsconfig.json
```

---

## ⚠️ Risks & Mitigation

### Risk 1: Data Loss During Migration
**Mitigation:**
- Create full database backup before migration
- Keep Strapi running in read-only mode for 30 days
- Verify all data with automated scripts
- Manual spot-checks of critical content

### Risk 2: Downtime During Deployment
**Mitigation:**
- Deploy during low-traffic hours
- Use blue-green deployment strategy
- Prepare rollback plan
- Monitor error logs in real-time

### Risk 3: Admin Panel Feature Gap
**Mitigation:**
- Document all Strapi features currently in use
- Build feature parity checklist
- Get stakeholder approval before development
- Plan for iterative improvements post-launch

### Risk 4: Authentication Issues
**Mitigation:**
- Thoroughly test auth system
- Implement password reset flow
- Have backup admin access method
- Session timeout handling

### Risk 5: Performance Degradation
**Mitigation:**
- Benchmark current performance
- Use Next.js caching strategies
- Optimize database queries
- Implement CDN for media files

---

## 💰 Cost-Benefit Analysis

### Current Setup Costs
- Separate backend deployment
- Additional Docker container resources
- Strapi licensing considerations
- Separate monitoring/logging

### New Setup Benefits
- ✅ Single codebase = easier maintenance
- ✅ No Strapi licensing constraints
- ✅ Better control over features
- ✅ Simplified deployment pipeline
- ✅ Reduced server resource usage
- ✅ Faster development cycles
- ✅ Custom admin UX tailored to needs

### Estimated Time Investment
- **Development:** 6-8 weeks (1 developer)
- **Testing:** 1-2 weeks
- **Migration:** 1 week
- **Total:** ~10 weeks

---

## 📅 Recommended Timeline

| Week | Phase | Deliverables |
|------|-------|--------------|
| 1 | Foundation | Database schema, Prisma setup, initial migrations |
| 2 | Backend API | Core API endpoints, auth system |
| 3-4 | Admin Panel | Basic admin UI, article/message management |
| 5 | Admin Features | Settings, media library, user management |
| 6 | Frontend Refactoring | Update all data fetching, remove Strapi dependencies |
| 7 | Testing | QA, performance testing, security audit |
| 8 | Staging Deployment | Deploy to staging, final testing |
| 9 | Production Migration | Data migration, production deployment |
| 10 | Monitoring | Post-launch support, bug fixes |

---

## ✅ Success Criteria

### Technical
- ✅ All Strapi content types migrated successfully
- ✅ No broken links or missing images
- ✅ Admin panel has full CRUD for all content types
- ✅ Authentication system works flawlessly
- ✅ Performance is equal or better than current
- ✅ All tests passing

### Business
- ✅ Zero downtime migration
- ✅ Stakeholder approval on admin UI
- ✅ Team trained on new admin panel
- ✅ Documentation complete
- ✅ Backup/restore procedures in place

### User Experience
- ✅ Public site looks identical
- ✅ All forms work correctly
- ✅ Page load times maintained or improved
- ✅ SEO rankings maintained
- ✅ Mobile experience unchanged

---

## 🔄 Alternative Approaches Considered

### Option 1: Keep Strapi, Enhance Frontend
**Pros:** Less work, lower risk  
**Cons:** Doesn't meet goal of custom admin panel

### Option 2: Headless CMS (Sanity, Contentful)
**Pros:** Professional CMS features out-of-box  
**Cons:** Vendor lock-in, ongoing costs, still external dependency

### Option 3: Next.js + Payload CMS
**Pros:** Next.js-native CMS, open source  
**Cons:** Still a separate system to maintain

### ✅ Selected: Custom Next.js Admin Panel
**Reasoning:**
- Full control over features
- Single codebase
- No external dependencies
- Tailored to exact needs
- Long-term cost savings

---

## 🛠️ Development Resources Needed

### Team
- **1 Full-Stack Developer** (Next.js + PostgreSQL + React)
- **1 Designer** (for admin panel UI, part-time)
- **1 QA Tester** (during testing phase)
- **1 DevOps Engineer** (for deployment, part-time)

### Tools & Services
- PostgreSQL database (existing)
- Hetzner VPS (existing)
- Development/staging environment
- Version control (Git)
- Project management tool

---

## 📚 Next Steps

### Immediate Actions (This Week)
1. **Review & approve this plan**
2. **Set up project timeline in project management tool**
3. **Create development branch**
4. **Install Prisma and create initial schema**
5. **Back up current Strapi database**

### Decision Required From Stakeholders
- [ ] Approve migration timeline
- [ ] Approve admin panel design mockups
- [ ] Decide on maintenance window for production migration
- [ ] Confirm budget allocation
- [ ] Identify key stakeholders for admin panel training

---

## 📞 Questions & Clarifications Needed

1. **Media Storage:** Should we use local file storage or migrate to S3/R2?
2. **Email Notifications:** Are there email notifications from Strapi we need to replicate?
3. **Backup Strategy:** What's the desired backup frequency for the new system?
4. **Analytics:** Any analytics or tracking currently in Strapi admin?
5. **Webhooks:** Any webhooks or integrations with Strapi to migrate?
6. **Multi-language:** Plans for multi-language content in the future?

---

## 📖 Appendix

### A. Prisma Installation Commands
```bash
npm install prisma @prisma/client
npx prisma init
npx prisma migrate dev --name init
npx prisma generate
```

### B. Useful Scripts
```json
{
  "scripts": {
    "db:migrate": "prisma migrate dev",
    "db:push": "prisma db push",
    "db:seed": "tsx prisma/seed.ts",
    "db:reset": "prisma migrate reset",
    "admin:create": "tsx scripts/create-admin.ts",
    "export:strapi": "tsx scripts/export-strapi.ts",
    "import:data": "tsx scripts/import-data.ts"
  }
}
```

### C. Security Checklist
- [ ] Environment variables properly secured
- [ ] JWT secrets are strong and unique
- [ ] Rate limiting on API endpoints
- [ ] CSRF protection
- [ ] SQL injection prevention (Prisma handles this)
- [ ] File upload validation
- [ ] Password requirements enforced
- [ ] Session timeout configured
- [ ] HTTPS enforced in production
- [ ] Admin panel protected by auth middleware

---

**Document Version:** 1.0  
**Last Updated:** January 20, 2026  
**Author:** AI Assistant (Antigravity)  
**Status:** 🟡 Awaiting Approval
