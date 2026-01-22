# 🌐 Phase 5: Public Frontend Integration

**Date:** January 21, 2026
**Status:** 🚀 In Progress

---

## 🎯 Objective
Connect the public-facing website pages to the new local SQLite database (via Prisma), replacing the old Strapi API calls.

## 📋 Tasks

### 1. Global Components (Header/Footer)
- 🔄 **Header**: Fetch `GlobalSettings` (Logo, Menu) from DB.
- 🔄 **Footer**: Fetch `GlobalSettings` (Social Links, Contact Info) from DB.

### 2. Homepage (`/`)
- 🔄 **Hero Section**: Fetch dynamic content if applicable.
- 🔄 **Services Section**: Fetch from `Service` model.
- 🔄 **7-Step Model**: Fetch from `Step` model.
- 🔄 **Audiences**: Fetch from `Audience` model.
- 🔄 **Latest Articles**: Fetch recent 3 articles from `Article` model.

### 3. Content Pages
- 🔄 **Blog Index** (`/artikelen`): List all published articles.
- 🔄 **Article Detail** (`/artikelen/[slug]`): Show full article content.
- 🔄 **Contact Page**: Ensure form submits to new `Message` API.
- 🔄 **Legal Pages**: Render content from `LegalPage` model.

---

## 🛠️ Implementation Strategy
- Use **Server Components** for direct DB access (`prisma.*`).
- Remove `src/lib/strapi.ts` legacy code.
- Ensure all images use the new local paths or external URLs correctly.
