# NovaForma Partners (Frontend)

Professional healthcare consulting website for NovaForma Partners.
Built with Next.js 14+, TypeScript, TailwindCSS, and Framer Motion.

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   STRAPI_TOKEN=your-token
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `src/app`: Next.js App Router pages
- `src/components`:
  - `layout`: Global Header & Footer
  - `home`: Landing page sections (Hero, Problem, Steps...)
  - `ui`: Reusable UI components
- `src/lib/strapi.ts`: API integration layer (includes Mock Data mode)

## Integration with Strapi

The frontend is designed to work with a Strapi 5/v4 backend.
Data fetchers in `src/lib/strapi.ts` are typed and ready.
If `STRAPI_TOKEN` is not provided, the app falls back to **Mock Data** automatically.

## Deployment

This is a static/SSR friendly Next.js app.
Deploy to Vercel or any Node.js host.
Basic SEO metadata is configured in `layout.tsx` and individual pages.
