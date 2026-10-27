# Studio24 by Shreya – Haute Interior Architecture

A modern, production-grade, responsive serverless web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Lucide React**. Designed for high-performance deployment on **Vercel**, this atelier website represents the architectural monograph of **Studio24 by Shreya**, the premier luxury interior architecture firm located in Gomti Nagar, Lucknow.

---

## 🏛️ Brand & Architectural Identity

- **Studio:** Studio24 by Shreya
- **Location:** 5th Floor, Summit Building, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh – 226010
- **Direct Line:** +91 93 2424 1800
- **Email:** interior@studio24byshreya.com
- **Aesthetic Direction:** *Nocturne Atelier* — Velvet obsidian noir canvas (`#09090b` / `#121215`), hairline architectural guides, delicate warm gold patina accents (`#A6A182`), high-contrast typography, and subtle ambient falling light streaks.

---

## ⚡ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack, Serverless Ready)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with centralized design tokens
- **Typography:** [Google Fonts](https://fonts.google.com/) via `next/font/google` (`Montserrat` & `Alex Brush`)
- **Icons:** [Lucide React](https://lucide.dev/) (consistent professional icon library; zero emojis or Unicode substitutions)
- **Deployment Platform:** [Vercel](https://vercel.com/) (Serverless Functions & Edge Network)

---

## 📂 Project Structure

```text
studio24-new/
├── app/
│   ├── admin/
│   │   ├── blog/page.tsx             # ZwantumBlog console & 46-article management
│   │   ├── dashboard/page.tsx        # KPI overview & service distribution metrics
│   │   ├── inquiries/page.tsx        # Section-wise inquiry table with CSV export & filters
│   │   ├── login/page.tsx            # Protected authentication for allowed admins
│   │   ├── layout.tsx                # Admin shell with sidebar & navigation
│   │   └── page.tsx                  # Auto-redirect to dashboard
│   ├── api/
│   │   ├── admin/
│   │   │   ├── auth/login/route.ts   # Session creation endpoint
│   │   │   ├── auth/logout/route.ts  # Session deletion endpoint
│   │   │   ├── blog/route.ts         # Admin blog articles & schema check
│   │   │   └── inquiries/route.ts    # Section-wise inquiry CRUD
│   │   └── consultation/route.ts     # Lead submission + email + Supabase insertion
│   ├── blog/
│   │   ├── [slug]/page.tsx           # Editorial dispatch reader with JSON-LD schema
│   │   ├── rss.xml/route.ts          # RSS 2.0 syndication feed
│   │   ├── sitemap.xml/route.ts      # XML sitemap for SEO
│   │   └── page.tsx                  # Public blog directory with category filters
│   ├── globals.css                   # Core design tokens, light drop animations & scrollbar utilities
│   ├── layout.tsx                    # Root layout with fonts, SEO & OpenGraph metadata
│   └── page.tsx                      # Serverless landing page orchestrating all sections
├── components/
│   ├── AboutSection.tsx          # Founder spotlight (Shreya Gupta), stats & layered imagery
│   ├── ArchitecturalBackgroundLines.tsx # Continuous ambient falling light streaks
│   ├── BlogSection.tsx           # Monograph & journal entries with architectural insights
│   ├── ConsultationSection.tsx   # Contact coordinates, Google Map embed & interactive form
│   ├── FaqSection.tsx            # Accessible accordion with smooth expand/collapse & WhatsApp prompt
│   ├── Footer.tsx                # Architectural noir grid footer with vertical wordmark
│   ├── HeroSection.tsx           # Cinematic hero showcase with dark vignette overlays & CTAs
│   ├── LegalModal.tsx            # Accessible modal dialog for Terms, Conditions & Privacy Policy
│   ├── Navbar.tsx                # Fixed glassmorphic navigation header with mobile drawer
│   ├── OverviewSection.tsx       # Gomti Nagar interior design leadership overview & call CTA
│   ├── PortfolioSection.tsx      # Continuous infinite carousel with magnification & touch swipe
│   ├── ProcessSection.tsx        # 4-step turnkey protocol timeline with connecting bar
│   ├── ServicesSection.tsx       # Bespoke services with SVG wave clipping masks & hover reveals
│   ├── TestimonialsSection.tsx   # Verified patron reviews from Lucknow homeowners
│   ├── WhatWeDesignSection.tsx   # 12 space categories grid with Lucide icons
│   └── WhyUsSection.tsx          # 6 pillars of excellence with mobile card stacking
├── public/
│   ├── Studio24_Logo.webp        # Official brand logo
│   ├── home-09-slider-01-dark.webp # Hero background image
│   └── ...                       # Showcase photography assets
├── next.config.js                # Next.js remote image domains & optimization config
├── tailwind.config.js            # Custom design tokens, color scales & typography mapping
├── tsconfig.json                 # Strict TypeScript configuration
└── package.json                  # Scripts & project dependencies
```

---

## 🚀 Key Features

### 1. Architectural Design & Motion
- **Continuous Ambient Falling Light Drops:** Hand-crafted CSS keyframe animation simulating delicate light streaks descending along subtle vertical grid lines.
- **Wavy Top Architectural Masks:** Bespoke SVG clip paths for service cards (`clip-path: url(#service-wave-top)`) with smooth hover-activated detail expansion.
- **Infinite Featured Projects Carousel:** Seamless loop with center slide active scale (`scale-[1.03]`), dimmer transitions, touch swipe on mobile, auto-play with pause-on-hover, and 1-indexed counter (`01 / 06`).
- **Stacked Pillars on Mobile:** Sticky card cascade on smaller screens transitioning into a 3-column box grid on desktop.

### 2. Production-Grade Serverless API (`/api/consultation`)
- Dedicated serverless `POST` handler at `app/api/consultation/route.ts`.
- **Validation & Sanitization:** Enforces name length (2–100 chars), regex phone number validation, and strips potential XSS/HTML injection strings.
- **Rate Limiting:** Built-in IP-based rate limiter (max 5 requests per window) to protect against form abuse and spam.
- **Proper HTTP Status Codes:** Returns `200 OK` with JSON receipt, `400 Bad Request` with descriptive feedback on validation failure, or `429 Too Many Requests`.

### 3. Accessible UI & Full UX States
- **Form States:** Real-time client validation, loading state with spinner (`Loader2`), error notifications, and a verified success receipt with option to reset.
- **Zero Dead Links:** Every navigation item anchors smoothly to real page landmarks; legal links (`TERMS`, `CONDITION`, `POLICY`) open an interactive, accessible modal dialog.
- **Keyboard & Touch Accessibility:** Semantic HTML (`header`, `nav`, `main`, `section`, `article`, `footer`, `aside`, `address`), visible focus outlines, `aria-expanded` accordion states, and outside-click/Escape key handlers.

### 4. Admin Portal & Section-Wise Inquiries (`/admin`)
- **Protected Access (`/admin/login`):** Encrypted, HTTP-only session cookie authentication restricted to whitelist emails (`ADMIN_ALLOWED_EMAILS`).
- **Dashboard Overview (`/admin/dashboard`):** Real-time lead KPIs (Total Inquiries, New Leads, In Progress, Resolved) and service section volume distribution chart.
- **Section-Wise Inquiry Management (`/admin/inquiries`):**
  - **Tabs by Service Category:** *All Sections*, *Full Turnkey Residential*, *Modular Kitchen & Wardrobes*, *Commercial Office Atelier*, *Complete Home Renovation*, *Design & 3D Consultation Only*.
  - **Status Transitions:** Instant inline update to `New`, `In Progress`, or `Resolved` matching database check constraints.
  - **Real-Time Search & Filters:** Search by client name, phone number, Lucknow sector/city, or project notes.
  - **Quick Actions:** Direct Call (`tel:`) and WhatsApp click-to-chat links, detail modal view, and lead deletion.
  - **CSV Export:** 1-click export of filtered leads with timestamps.

### 5. Architectural Blog & ZwantumBlog Engine (`/blog` & `/admin/blog`)
- **Dual-Mode Resilient Architecture:** Powered by `@zwantum/blog` (v1.2.0) with seamless fallback to existing Supabase `posts` (46 published articles).
- **Public Perspectives Library (`/blog`):**
  - Featured architectural dispatch hero card with reading time and category badges.
  - Dynamic category filtering (`Interior`, `Home`, `Commercial`, `Architect`) and search.
  - Responsive 3-column article cards with metadata and hover transitions.
- **Article Reader (`/blog/[slug]`):**
  - Typographic article layout with author card, breadcrumbs, social share triggers, and consultation CTA.
  - Automatic JSON-LD Schema (`BlogPosting`) for Google SEO and rich snippets.
- **Syndication Feeds:**
  - RSS 2.0 Feed: `/blog/rss.xml`
  - XML Sitemap: `/blog/sitemap.xml`
- **ZwantumBlog Management Console (`/admin/blog`):**
  - Articles directory listing with preview modal and live links.
  - Embedded `<BlogAdmin client={blogClient} />` for Tiptap rich editing, media library, and SEO settings.
  - Database Migration status with copy-ready `database/apply_all.sql` for Supabase SQL Editor.

---

## 🛠️ Getting Started Locally

### Prerequisites
- **Node.js:** v18.17+ (v20+ recommended)
- **Package Manager:** `npm` (or `pnpm` / `yarn`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd studio24-new
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Start production server:**
   ```bash
   npm start
   ```

---

## ☁️ Deploying to Vercel

This repository is optimized for zero-configuration deployment on **Vercel**:

1. Push your repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to the [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
3. Import this repository.
4. Vercel automatically detects **Next.js**:
   - **Framework Preset:** `Next.js`
   - **Build Command:** `next build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
5. Click **"Deploy"**. The site and serverless API route `/api/consultation` will be provisioned instantly.

---

## 🎨 Design System Tokens

| Token | Value | Role |
| :--- | :--- | :--- |
| `surface-noir` | `#000000` | Deep black backgrounds & footer |
| `surface` | `#09090b` | Primary obsidian base canvas |
| `surface-charcoal` | `#121215` | Section partitions & cards |
| `primary` | `#ffffff` | High-contrast white typography & primary CTAs |
| `patina` / `gold-patina` | `#A6A182` | Delicate warm metallic architectural accent |
| `border-champagne-subtle` | `rgba(255, 255, 255, 0.12)` | Hairline drafting borders |
| `whatsapp-brand` | `#25D366` | Concierge quick connect badge |

---

## 📋 Compliance & Quality Assurance

This codebase strictly adheres to the engineering, design, and security specifications in [WEBSITE_DEVELOPMENT_RULES.md](WEBSITE_DEVELOPMENT_RULES.md):
- [x] No fake, invented, or misleading data added.
- [x] No arbitrary vibe-coded or superficial components.
- [x] Strictly approved brand colors and typography used throughout.
- [x] 100% Lucide icon library usage (no emojis or Unicode interface symbols).
- [x] Mobile, tablet, and desktop responsive layout.
- [x] Server-side validation and secure serverless API execution.

---

## 📄 License & Credits

© Studio24 by Shreya. All rights reserved.
