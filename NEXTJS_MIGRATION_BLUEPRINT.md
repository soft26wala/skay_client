# SKAY PRODUCTS — Next.js App Router & TypeScript Migration Blueprint

## 1. Feasibility & Architectural Evaluation

### Current State
- **Core Framework**: React 19 + Vite 7 + Tailwind CSS v3.4 + Redux Toolkit
- **Mobile Integration**: Capacitor 8.3 (`@capacitor/android`, `@capacitor/ios`, `@capacitor/core`) configured to read from `dist` (`"webDir": "dist"`)
- **Backend**: Node.js / Express REST API (`http://localhost:4000/api/v1`) with cookie session authentication and Razorpay / COD / Stripe payments
- **Status**: Vite build compiles in **~5.5 seconds** to `dist/`, fully functional and verified with ESLint (`0 errors, 0 warnings`).

### Key Considerations for Next.js App Router Migration
1. **Capacitor Mobile Deployment Dependency**:
   - The native Android (`android/`) and iOS (`ios/`) mobile projects require a static web bundle output (`dist/`).
   - If migrated to Next.js with full Server-Side Rendering (SSR), the output is a dynamic Node.js server (`.next/`), which cannot run directly offline in Capacitor without static HTML export (`output: 'export'`).
   - Running Next.js with `output: 'export'` disables dynamic SSR, Route Handlers that set cookies, and Server Actions, effectively rendering it a static site generator like Vite.
2. **Recommendation**:
   - Keep the verified, high-speed Vite build for active development and Capacitor mobile compilation.
   - For web deployment (e.g., Vercel / VPS), use the Next.js App Router structure below, mapping Client Components to existing Redux slices and Server Components for SEO metadata.

---

## 2. Next.js App Router Architecture Mapping

```
app/
├── layout.tsx                   # Root Server Layout with Cormorant Garamond, SEO metadata, JSON-LD
├── page.tsx                     # Server Component Homepage (Static prerender)
├── not-found.tsx                # Luxury 404 Not Found Page
├── robots.ts                    # Dynamic robots.txt generation
├── sitemap.ts                   # Dynamic sitemap.xml with canonical URLs
├── products/
│   ├── page.tsx                 # Product catalog (SSR with searchParams filtering)
│   └── [id]/
│       ├── page.tsx             # Dynamic product detail (generateMetadata for SEO, OpenGraph)
│       └── loading.tsx          # Luxury skeleton loader
├── cart/
│   └── page.tsx                 # Client Component luxury shopping bag
├── payment/
│   └── page.tsx                 # Client Component checkout with inline authentication
├── orders/
│   └── page.tsx                 # Client Component order tracking & dossier
└── (info)/
    ├── about/page.tsx           # Server Component brand story
    ├── contact/page.tsx         # Client Component concierge desk
    ├── faq/page.tsx             # Server Component FAQ with Schema.org FAQPage markup
    ├── privacy-policy/page.tsx  # Server Component privacy policy
    ├── returns-policy/page.tsx  # Server Component returns policy
    ├── security/page.tsx        # Server Component security standards
    └── terms/page.tsx           # Server Component terms of service
```

---

## 3. Server Components vs Client Components

| Route / Feature | Component Type | Justification |
| :--- | :--- | :--- |
| **Root Layout & Metadata** | Server Component | SEO tags, OpenGraph, Twitter cards, Google Font injection |
| **Homepage Hero & Story** | Server Component | Static HTML pre-rendered for instant First Contentful Paint |
| **Product Detail Metadata** | Server Component (`generateMetadata`) | Dynamic social share previews, title, and schema per SKU |
| **Cart & Bag Drawer** | Client Component (`'use client'`) | LocalStorage synchronization, Redux state management |
| **Inline Checkout Auth** | Client Component (`'use client'`) | Form state, password toggles, async thunk dispatching |
| **Interactive Filters** | Client Component (`'use client'`) | Dynamic price sliders, rating selections, search filtering |
| **Razorpay / Stripe SDKs** | Client Component (`'use client'`) | Relies on browser `window.Razorpay` and Stripe Elements |

---

## 4. TypeScript Contracts (`src/types/index.ts`)

All components and Redux slices are typed according to `src/types/index.ts`:
- `Product`: Formulations, pricing, ratings, image assets, rituals
- `User`: Client profile, authentication credentials, permissions
- `CartItem`: Persistent bag entities
- `Order`: Milestones, tracking references, order items
- `ShippingDetails`: Concierge delivery addresses

---

## 5. Deployment Commands & Verification

### Vite & Capacitor Production Build
```bash
# Run ESLint quality check
npm run lint

# Build production bundle for web and Capacitor
npm run build

# Sync web assets to native mobile platforms
npx cap sync
```

### Environment Setup (`.env.local`)
```env
VITE_API_URL=http://localhost:4000/api/v1
# For Next.js:
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```
