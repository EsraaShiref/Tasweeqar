<div align="center">

<img src="public/images/logo.png" alt="Tasweeqar Logo" width="120" />

# تسويقار للمقاولات
### Tasweeqar Contracting Co.

**Bilingual company profile · Arabic & English · Angular 21 Standalone**

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=flat-square&logo=angular)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![SCSS](https://img.shields.io/badge/SCSS-Design_System-CC6699?style=flat-square&logo=sass)](https://sass-lang.com)
[![i18n](https://img.shields.io/badge/i18n-AR%20%7C%20EN-B8973A?style=flat-square)](https://github.com/ngx-translate/core)
[![License](https://img.shields.io/badge/License-Private-lightgrey?style=flat-square)]()

</div>

---

## 📋 Overview

A production-ready bilingual company profile website for **Tasweeqar Contracting Co.**, a Saudi construction and contracting firm. The site showcases the company's services, portfolio, team leadership, and contact information — in both **Arabic (RTL)** and **English (LTR)**.

Built with **Angular 21 standalone components**, no NgModules, full signal-based reactivity, and a custom SCSS design system aligned with the TRO brand identity.

---

## ✨ Features

- 🌐 **Full bilingual support** — Arabic (default, RTL) & English (LTR) via `@ngx-translate`
- 🌙 **Dark / Light mode** — persisted in `localStorage`, toggled globally
- ⚡ **Angular 21 Standalone** — no NgModules, `inject()` everywhere, `OnPush` on all components
- 🎨 **Custom SCSS Design System** — gold & navy brand tokens, CSS variables, responsive mixins
- 📱 **Fully responsive** — mobile-first with 4-tier breakpoint system
- 🔍 **SEO-ready** — `SeoService` sets `<title>` and meta tags per route and language
- 📧 **EmailJS contact form** — credentials via `environment.ts`, no backend needed
- 🗂️ **Project portfolio** — filterable by category, searchable, with detail pages
- 👤 **CEO message section** — bilingual, with photo, scroll-reveal animation
- 💬 **WhatsApp FAB** — direct link to company WhatsApp
- 🚀 **Lazy-loaded routes** — all feature pages load on demand
- 🎞️ **Route animations** — smooth page transitions via Angular Animations

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── animations/         # Route transition animations
│   │   ├── data/               # Static project data (projects.data.ts)
│   │   └── services/
│   │       ├── theme.ts        # ThemeService — dark/light mode (signal)
│   │       ├── language.ts     # LanguageService — AR/EN toggle (signal)
│   │       ├── seo.service.ts  # SeoService — title & meta per route
│   │       └── emailjs.service.ts  # EmailService — contact form
│   ├── features/
│   │   ├── home/               # Landing page
│   │   ├── about/              # About + CEO message + timeline
│   │   ├── services/           # Services grid + process steps
│   │   ├── projects/           # Portfolio with filter & search
│   │   │   └── project-detail/ # Individual project page
│   │   └── contact/            # Contact form
│   └── shared/
│       ├── components/
│       │   ├── navbar/         # Responsive navbar with lang & theme toggles
│       │   └── footer/         # Footer with social links
│       └── directives/
│           ├── counter.directive.ts   # Animated count-up on scroll
│           ├── reveal.directive.ts    # Scroll-reveal with animation types
│           └── tilt.directive.ts      # 3D tilt effect on hover
├── environments/
│   ├── environments.ts         # Dev config (EmailJS keys)
│   └── environments.prod.ts    # Production config
├── styles.scss                 # Global design tokens + base styles
├── _mixins.scss                # Responsive breakpoint mixins
└── index.html
public/
├── i18n/
│   ├── ar.json                 # Arabic translations (default)
│   └── en.json                 # English translations
└── images/                     # Project & brand images
```

---

## 🎨 Design System

### Brand Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#B8973A` | Rich Gold — main accent |
| `--color-primary-light` | `#D4AF5A` | Hover states |
| `--color-primary-dark` | `#8B6E1F` | Pressed states |
| `--color-navy` | `#0D1B3E` | Deep Navy — dark sections |
| `--color-bg` | `#FAFAF8` | Warm White — page background |

### Fonts
| Language | Font | Weight |
|----------|------|--------|
| Arabic | `Tajawal` | 300, 400, 500, 700, 800 |
| English | `Urbanist` | 300–800 |

### Breakpoints
```scss
@include respond-to('mobile')   // max-width: 767px
@include respond-to('tablet')   // 768px – 1024px
@include respond-to('laptop')   // 1025px – 1279px
@include respond-to('desktop')  // min-width: 1280px
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Angular CLI 21+

```bash
npm install -g @angular/cli
```

### Install & Run

```bash
# Clone the repository
git clone https://github.com/EsraaShiref/tasweeqar.git
cd tasweeqar

# Install dependencies
npm install

# Start development server
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

---

## 🔧 Configuration

### EmailJS (Contact Form)

Update `src/environments/environments.ts` with your EmailJS credentials:

```typescript
export const environment = {
  production: false,
  emailjs: {
    serviceId: 'your_service_id',
    templateId: 'your_template_id',
    publicKey: 'your_public_key',
  }
};
```

> Get your credentials at [emailjs.com](https://www.emailjs.com)

### Adding / Editing Translations

Translations live in `public/i18n/ar.json` and `public/i18n/en.json`.

After editing, always validate:

```bash
node -e "JSON.parse(require('fs').readFileSync('public/i18n/ar.json','utf8')); console.log('ar.json ✅')"
node -e "JSON.parse(require('fs').readFileSync('public/i18n/en.json','utf8')); console.log('en.json ✅')"
```

> ⚠️ A JSON syntax error silently breaks ALL translations site-wide.

### Adding Projects

Edit `src/app/core/data/projects.data.ts` and add a corresponding entry in both `ar.json` and `en.json` under `projects_page.items`:

```typescript
{ id: 'p10', key: 'p10', image: '/images/Projects/project10.jpg', categoryKey: 'contracting', status: 'done', featured: false }
```

---

## 🏗️ Build & Deploy

```bash
# Production build
ng build --configuration production

# Output is in /dist/tasweeqar/
```

### Deployment Checklist
- [ ] `environment.prod.ts` has correct EmailJS credentials
- [ ] All images in `public/images/` are optimized (WebP preferred)
- [ ] Hosting config redirects all routes to `index.html` (Angular SPA)
- [ ] `ng build --configuration production` → zero errors, zero warnings

### Hosting (Firebase / Vercel / Netlify)

For SPA routing, configure your host to serve `index.html` for all routes:

```
# Netlify (_redirects file)
/*  /index.html  200

# Vercel (vercel.json)
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

---

## 🧩 Key Architectural Decisions

| Concern | Pattern |
|---------|---------|
| Components | Standalone only — no NgModules |
| DI | `inject()` function — no constructor injection |
| State | Angular Signals (`signal()`, `computed()`) |
| Change Detection | `OnPush` on every component |
| HTTP calls | Via services only — never from components directly |
| i18n | `@ngx-translate` with lazy-loaded JSON |
| Styling | SCSS with CSS custom properties — no hardcoded values |
| Routing | `loadComponent()` lazy loading on all routes |
| Animations | `IntersectionObserver` via reusable directives |

---

## 📄 Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home` | Hero, stats, services preview, featured projects, CTA |
| `/about` | `About` | Company story, CEO message, why choose us, timeline |
| `/services` | `Services` | Services grid, process steps |
| `/projects` | `Projects` | Full portfolio with filter & search |
| `/projects/:id` | `ProjectDetail` | Individual project detail page |
| `/contact` | `Contact` | Contact form + company info |

---

## 🤝 Contributing

This is a private client project. For questions or change requests, contact the development team.

---

<div align="center">

Built with ❤️ for **Tasweeqar Contracting Co.**

</div>
