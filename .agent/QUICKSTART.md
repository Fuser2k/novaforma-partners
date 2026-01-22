# 🚀 Quick Start Guide - Development Setup

**Project:** Zorgforma Migration to Next.js  
**Date:** January 20, 2026  
**Status:** ✅ Ready to Start

---

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ Node.js 20.x or higher installed
- ✅ PostgreSQL 14+ running (existing database)
- ✅ Git access to the repository
- ✅ Code editor (VS Code recommended)
- ✅ Docker & Docker Compose (for deployment)

---

## 🔧 Initial Setup (Day 1)

### Step 1: Create Development Branch

```bash
cd c:\Users\user\Desktop\zorgforma
git checkout -b migration/mvp
```

### Step 2: Install New Dependencies

```bash
# Core dependencies
npm install prisma @prisma/client
npm install bcryptjs jose
npm install sharp
npm install zod

# Admin panel dependencies
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image
npm install @tiptap/extension-link @tiptap/extension-placeholder
npm install react-hook-form @hookform/resolvers
npm install date-fns

# Dev dependencies
npm install -D tsx @types/bcryptjs

# Save package.json
git add package.json package-lock.json
git commit -m "chore: add migration dependencies"
```

### Step 3: Initialize Prisma

```bash
# Initialize Prisma (creates prisma/ folder)
npx prisma init

# This creates:
# - prisma/schema.prisma
# - .env (with DATABASE_URL)
```

### Step 4: Configure Database Connection

Update `.env.local`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/zorgforma?schema=public"

# Auth
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Upload
UPLOAD_DIR="./public/uploads"
MAX_FILE_SIZE="10485760"

# Strapi (keep for now during migration)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_URL_INTERNAL=http://localhost:1337
STRAPI_TOKEN=your-strapi-token
```

**Generate a secure JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Create Project Structure

```bash
# Create directories
mkdir -p prisma/migrations
mkdir -p scripts
mkdir -p src/lib
mkdir -p src/app/api/admin
mkdir -p src/app/api/public
mkdir -p src/app/admin
mkdir -p src/components/admin
mkdir -p public/uploads
```

---

## 📄 Create Core Files

### 1. Prisma Schema

Create or replace `prisma/schema.prisma`:

**(Copy the complete schema from MVP_SCOPE.md)**

Key models:
- Admin (users with roles)
- Session
- Article (with ArticleImage)
- Message
- LegalPage
- GlobalSettings
- Step, Audience, Service
- LandingPage
- Media
- AuditLog

### 2. Database Client

Create `src/lib/db.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

### 3. Auth Utilities

Create `src/lib/auth.ts`:

```typescript
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-me'
);
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createToken(payload: { adminId: string; email: string; role: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { adminId: string; email: string; role: string };
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  
  if (!token) return null;
  
  return verifyToken(token);
}
```

### 4. Validation Schemas

Create `src/lib/validation.ts`:

```typescript
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  summary: z.string().min(1, 'Summary is required'),
  category: z.string().min(1, 'Category is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.any(), // JSON blocks
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  keywords: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isDraft: z.boolean().default(true),
  publishDate: z.string().optional(),
});

export const messageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Phone is required'),
  sector: z.enum(['WLZ', 'WMO', 'Zvw', 'GGZ', 'Gehandicaptenzorg', 'Jeugdzorg', 'Andere']),
  region: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  termsAccepted: z.boolean().refine(val => val === true, 'You must accept terms'),
});

export const globalSettingsSchema = z.object({
  facebookUrl: z.string().url().optional().or(z.literal('')),
  instagramUrl: z.string().url().optional().or(z.literal('')),
  twitterUrl: z.string().url().optional().or(z.literal('')),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  address: z.string().optional(),
});
```

---

## 🗄️ Database Setup

### Step 1: Create Schema

Copy the full Prisma schema from **MVP_SCOPE.md** into `prisma/schema.prisma`.

### Step 2: Run Migration

```bash
# Create and apply initial migration
npx prisma migrate dev --name initial_setup

# This will:
# - Create all tables
# - Generate Prisma Client
# - Apply to your database
```

### Step 3: Generate Prisma Client

```bash
npx prisma generate
```

### Step 4: Create Initial Admin User

Create `scripts/create-admin.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@zorgforma.nl';
  const password = 'ChangeMe123!'; // TODO: Change on first login
  
  const passwordHash = await hashPassword(password);
  
  const admin = await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash,
      firstName: 'Super',
      lastName: 'Admin',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });
  
  console.log('✅ Admin user created:');
  console.log('   Email:', email);
  console.log('   Password:', password);
  console.log('   Role:', admin.role);
  console.log('\n⚠️  CHANGE PASSWORD AFTER FIRST LOGIN!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run it:
```bash
npx tsx scripts/create-admin.ts
```

---

## 🧪 Test Database Connection

Create `scripts/test-db.ts`:

```typescript
import { prisma } from '../src/lib/db';

async function main() {
  console.log('Testing database connection...');
  
  const adminCount = await prisma.admin.count();
  console.log('✅ Connected! Admin users:', adminCount);
  
  const tables = await prisma.$queryRaw`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    ORDER BY table_name;
  `;
  
  console.log('\n📊 Database tables:');
  console.log(tables);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run it:
```bash
npx tsx scripts/test-db.ts
```

---

## 📦 Update package.json Scripts

Add these to your `scripts` section in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    
    "db:migrate": "prisma migrate dev",
    "db:push": "prisma db push",
    "db:generate": "prisma generate",
    "db:studio": "prisma studio",
    "db:reset": "prisma migrate reset",
    
    "admin:create": "tsx scripts/create-admin.ts",
    "test:db": "tsx scripts/test-db.ts",
    
    "export:strapi": "tsx scripts/export-strapi.ts",
    "import:data": "tsx scripts/import-data.ts"
  }
}
```

---

## 🎨 Development Checklist

### Week 1 Tasks:

- [x] Install dependencies
- [x] Initialize Prisma
- [x] Create database schema
- [x] Run migrations
- [x] Create initial admin user
- [ ] Create first API route (test)
- [ ] Create admin login page (basic)
- [ ] Test authentication flow

---

## 🔍 Verification Steps

After setup, verify everything works:

```bash
# 1. Check Prisma is working
npm run db:generate

# 2. Check database connection
npm run test:db

# 3. Create admin user
npm run admin:create

# 4. Start development server
npm run dev

# 5. Open Prisma Studio (optional - DB GUI)
npm run db:studio
```

Visit:
- http://localhost:3000 - Public site (should work as before)
- http://localhost:5555 - Prisma Studio (database viewer)

---

## 📁 Project Structure (After Setup)

```
zorgforma/
├── prisma/
│   ├── schema.prisma          ✅ Created
│   └── migrations/
│       └── xxx_initial_setup/ ✅ Generated
├── scripts/
│   ├── create-admin.ts        ✅ Created
│   ├── test-db.ts            ✅ Created
│   ├── export-strapi.ts      ⏳ To create (Week 4)
│   └── import-data.ts        ⏳ To create (Week 4)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── admin/        ⏳ To create (Week 2-3)
│   │   │   └── public/       ⏳ To create (Week 2)
│   │   └── admin/            ⏳ To create (Week 5-7)
│   ├── components/
│   │   └── admin/            ⏳ To create (Week 5)
│   └── lib/
│       ├── db.ts             ✅ Created
│       ├── auth.ts           ✅ Created
│       ├── validation.ts     ✅ Created
│       └── api.ts            ⏳ To create (Week 8)
├── public/
│   └── uploads/              ✅ Created (empty)
├── .env.local                ✅ Updated
├── package.json              ✅ Updated
└── README.md                 📝 Update later
```

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module 'prisma'"
**Solution:**
```bash
npm install prisma @prisma/client
npx prisma generate
```

### Issue: "DATABASE_URL is not set"
**Solution:** Check `.env.local` has correct PostgreSQL connection string

### Issue: TypeScript errors with Prisma types
**Solution:**
```bash
npx prisma generate
# Restart TypeScript server in VS Code (Ctrl+Shift+P → "Restart TS Server")
```

### Issue: Migration fails
**Solution:**
```bash
# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Or, if you want to keep data
npx prisma db push --skip-generate
```

---

## 📞 Next Steps

After completing this setup:

1. ✅ Verify database connection works
2. ✅ Verify admin user created
3. ✅ Commit changes to git
4. 📖 Read **MVP_SCOPE.md** Phase 2
5. 🚀 Start building API routes

---

## 🔗 Useful Commands Reference

```bash
# Development
npm run dev                  # Start dev server
npm run db:studio           # Open Prisma Studio

# Database
npm run db:migrate          # Create & run migration
npm run db:push             # Push schema without migration
npm run db:generate         # Regenerate Prisma Client

# Utilities
npm run admin:create        # Create admin user
npm run test:db            # Test DB connection

# Git
git status                 # Check changes
git add .                  # Stage all changes
git commit -m "message"    # Commit changes
git push origin migration/mvp  # Push to remote
```

---

## 📚 Documentation Links

- [Prisma Docs](https://www.prisma.io/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [TipTap Editor](https://tiptap.dev)
- [Zod Validation](https://zod.dev)

---

**Last Updated:** January 20, 2026  
**Status:** ✅ Ready to Start Development  
**Next:** Follow Phase 1 in IMPLEMENTATION_CHECKLIST.md
