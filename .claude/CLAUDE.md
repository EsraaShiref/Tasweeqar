# CLAUDE.md — Tasweeqar (تسويقار) Project Instructions

> Place at `.claude/CLAUDE.md` in the repo root.
> Claude Code reads this automatically on every session.

---

## Project Overview

**Tasweeqar** — Arabic/English bilingual company profile for a Saudi construction/contracting firm.
Stack: Angular 21 · Standalone Components · SCSS · @ngx-translate · EmailJS · Angular Signals

**Goals for this session:**
1. Fix all consistency issues listed in this file
2. Enforce one pattern per concern across all components
3. Make the project production-ready
4. Keep the existing design and UX intact — no visual changes unless requested

---

## Project Structure

```
src/
├── app/
│   ├── app.ts / app.html / app.scss / app.routes.ts / app.config.ts
│   ├── core/
│   │   ├── animations/route-animations.ts
│   │   ├── data/projects.data.ts         ← static project data (9 projects)
│   │   └── services/
│   │       ├── theme.ts                  ← ThemeService  (signal: isDark)
│   │       ├── language.ts               ← LanguageService (signal: currentLang)
│   │       ├── seo.service.ts            ← SeoService
│   │       └── emailjs.service.ts        ← EmailService — UNUSED, needs fix
│   ├── features/
│   │   ├── home/          (home.ts / home.html / home.scss)
│   │   ├── about/         (about.ts / about.html / about.scss)
│   │   ├── services/      (services.ts / services.html / services.scss)
│   │   ├── projects/      (projects.ts / projects.html / projects.scss)
│   │   └── projects/project-detail/
│   └── shared/
│       ├── components/navbar/  (navbar.ts / navbar.html / navbar.scss)
│       ├── components/footer/  (footer.ts / footer.html / footer.scss)
│       └── directives/
│           ├── counter.directive.ts   ← CounterDirective — UNUSED
│           ├── reveal.directive.ts    ← RevealDirective
│           └── tilt.directive.ts      ← TiltDirective
├── environments/
│   ├── environments.ts       ← dev  (production: false, real emailjs keys)
│   └── environments.prod.ts  ← prod (production: true,  same keys — correct)
├── styles.scss               ← global design tokens + base styles
├── _mixins.scss              ← breakpoint mixins
└── index.html
```

---

## Design System

### Brand Colors (defined in `styles.scss` `:root`)

```
--color-primary:        #B8973A   Rich Gold — main accent
--color-primary-light:  #D4AF5A   Hover states
--color-primary-dark:   #8B6E1F   Pressed states
--color-primary-muted:  #F5EDD6   Card/section backgrounds
--color-navy:           #0D1B3E   Deep Navy
--color-navy-mid:       #162040
--color-navy-light:     #1E2D52
--color-bg:             #FAFAF8   Warm White (main bg)
--color-surface:        #FFFFFF
--color-text-primary:   #1A1A2E
--color-text-secondary: #5C5C7A
```

### Legacy tokens — DO NOT USE in any new or edited code
```
--navy: #1a2744   →  use --color-navy
--gold: #c9a84c   →  use --color-primary
--off:  #f7f5f0   →  use --color-surface-alt
```
Always use `--color-*` tokens. Never hardcode hex values in component SCSS.

### Fonts
```css
--font-ar: 'Tajawal', sans-serif;   /* Arabic text */
--font-en: 'Urbanist', sans-serif;  /* English text */
```

### Breakpoints (`_mixins.scss`)
```scss
@include respond-to('mobile')   // max-width: 767px
@include respond-to('tablet')   // 768px – 1024px
@include respond-to('laptop')   // 1025px – 1279px
@include respond-to('desktop')  // min-width: 1280px
```

### Dark Mode
Applied via `data-theme="dark"` on `<html>` by `ThemeService.apply()`.
All dark overrides live in `styles.scss` under `[data-theme='dark']`.
**Never** read `data-theme` from the DOM manually — use `ThemeService.isDark` signal.

---

## Services — How to Use Each One

### ThemeService (`core/services/theme.ts`)
```typescript
themeService = inject(ThemeService);
// Read:   themeService.isDark()    → boolean (signal)
// Toggle: themeService.toggle()
```

### LanguageService (`core/services/language.ts`)
```typescript
langService = inject(LanguageService);
// Read:   langService.currentLang()   → 'ar' | 'en' (signal)
// Toggle: langService.toggle()
// RTL:    langService.currentLang() === 'ar'
```

### SeoService (`core/services/seo.service.ts`)
```typescript
// Must be called in ngOnInit of EVERY feature component
private seoService = inject(SeoService);
private langService = inject(LanguageService);

ngOnInit() {
  this.seoService.setPage(
    { title: 'عنوان الصفحة | تسويقار', description: 'وصف الصفحة بالعربي' },
    { title: 'Page Title | Tasweeqar',  description: 'Page description in English' },
    this.langService.currentLang() as 'ar' | 'en'
  );
}
```

### EmailService (`core/services/emailjs.service.ts`)
Currently broken — has hardcoded placeholder strings. After fixing, use it like this:
```typescript
private emailService = inject(EmailService);

// In submit handler:
this.emailService.sendContactEmail({
  name: this.form.name,
  email: this.form.email,
  message: this.form.message
}).then(() => { ... }).catch(() => { ... });
```

---

## Mandatory Patterns — Follow These Exactly

### 1. Dependency Injection — `inject()` only, no constructors
```typescript
// CORRECT
langService = inject(LanguageService);
themeService = inject(ThemeService);

// WRONG — app.ts still does this, must be fixed
constructor(private themeService: ThemeService) {}
```

### 2. Never import `CommonModule`
```typescript
// WRONG — currently in: home.ts, about.ts, services.ts, projects.ts,
//          project-detail.ts, contact.ts
imports: [CommonModule, ...]

// CORRECT — import only what the template actually uses
imports: [NgIf, NgFor, NgClass, NgStyle, AsyncPipe, ...]
```

### 3. `ChangeDetectionStrategy.OnPush` on every component
```typescript
// Only projects.ts has this — add to ALL other components
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  ...
})
```

### 4. Reveal animations — use `RevealDirective`, not manual observers
```typescript
// WRONG — home.ts does this
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// CORRECT
imports: [RevealDirective]
// Template: <div appReveal="slide-up" [delay]="200">...</div>
```

### 5. Count-up animation — use `CounterDirective`, not inline setInterval
```typescript
// WRONG — home.ts reimplements count-up manually with setInterval
// CounterDirective already exists and is correct

// CORRECT
imports: [CounterDirective]
// Template: <span [appCounter]="150" [duration]="2000"></span>
```

### 6. Theme state — read from service, never from DOM
```typescript
// WRONG — about.ts does this
this.isDark = document.documentElement.getAttribute('data-theme') === 'dark';

// CORRECT
themeService = inject(ThemeService);
// Template: @if (themeService.isDark()) { ... }
```

### 7. i18n — no hardcoded text strings in component `.ts` files
```typescript
// WRONG — services.ts processSteps array
{ titleAr: 'الاستشارة الأولية', titleEn: 'Initial Consultation' }

// CORRECT — use translation key, resolve in template
{ titleKey: 'services.process.step1.title', descKey: 'services.process.step1.desc' }
// Template: {{ step.titleKey | translate }}
```

### 8. Cleanup IntersectionObserver in ngOnDestroy
```typescript
// WRONG — about.ts and services.ts create observers but have no ngOnDestroy

// CORRECT
private observer!: IntersectionObserver;

ngOnDestroy(): void {
  this.observer?.disconnect();
}
// Add `implements OnDestroy` to the class declaration
```

---

## Issues to Fix (Prioritized)

### CRITICAL — blocks correct production behavior

**[1] Route animations not firing**
- `app.ts` calls `getRouteAnimationData()` which reads `route.snapshot.data['animation']`
- No route in `app.routes.ts` has a `data` property
- Fix: add `data: { animation: 'HomePage' }` (unique string per route) to every route

**[2] `SeoService` never called anywhere**
- Every page has no `<title>` or `<meta name="description">` set at runtime
- Fix: call `seoService.setPage(...)` in `ngOnInit` of every feature component

**[3] `emailjs.service.ts` has hardcoded placeholder credentials**
- `private SERVICE_ID = 'YOUR_SERVICE_ID'` — never reads from `environment`
- Fix: replace with `private SERVICE_ID = environment.emailjs.serviceId` etc.

**[4] `contact.ts` bypasses `EmailService` entirely**
- Imports emailjs directly and reads from `environment` itself
- `EmailService` is dead code as a result
- Fix: delete direct emailjs call in `contact.ts`, inject and use `EmailService`

### CONSISTENCY — same logic everywhere

**[5] `app.ts` mixes constructor injection with `inject()`**
- Has constructor for `ThemeService` + `LanguageService` but `inject()` for `ChildrenOutletContexts`
- Fix: convert all to `inject()`

**[6] `CommonModule` in every feature component**
- `home.ts`, `about.ts`, `services.ts`, `projects.ts`, `project-detail.ts`, `contact.ts`
- Fix: remove CommonModule, import individual directives

**[7] `ChangeDetectionStrategy.OnPush` missing from 5 components**
- `home.ts`, `about.ts`, `services.ts`, `contact.ts`, `project-detail.ts`

**[8] `about.ts` reads dark mode from DOM**
- `ngOnInit()` reads `data-theme` attribute instead of using `ThemeService.isDark` signal

**[9] `services.ts` — processSteps data has hardcoded Arabic/English strings**
- `titleAr`, `titleEn`, `descAr`, `descEn` fields — breaks i18n consistency
- Fix: replace with `titleKey`/`descKey` and add translations to i18n files

**[10] `CounterDirective` is unused**
- `home.ts` manually reimplements count-up with setInterval
- Fix: remove manual count-up, use `[appCounter]` directive in template

**[11] `RevealDirective` underused in home**
- `home.ts` manually sets up IntersectionObserver for reveal instead of using directive

**[12] Observer leaks in `about.ts` and `services.ts`**
- Both create `IntersectionObserver` in `AfterViewInit` but never disconnect
- Fix: add `ngOnDestroy` with `this.observer?.disconnect()`

### CLEANUP — code hygiene

**[13] `index.html` loads two redundant Google Font families**
- Loads Cairo + Inter, but design uses Tajawal + Urbanist (loaded in `styles.scss`)
- Fix: remove the `<link>` for Cairo + Inter from `index.html`

**[14] `index.html` loads Tabler Icons — appears unused**
- `@tabler/icons-webfont` CDN link present, but zero `ti-*` classes found in any template
- Verify and remove if unused

**[15] `console.log` / `console.error` in `emailjs.service.ts`**
- Remove both before production

**[16] `project-detail.ts` has hardcoded static fields**
- `area: '45,000 متر مربع'`, `year: '2024'`, `client: 'وزارة الإسكان'` hardcoded in component
- These should come from `projects.data.ts` or i18n keys

**[17] Legacy tokens in `styles.scss` (`--navy`, `--gold`, `--off`)**
- Verify no component SCSS uses them, then remove

---

## Files Requiring Changes

| File | Required Changes |
|------|-----------------|
| `app.ts` | Use `inject()` only — remove constructor |
| `app.routes.ts` | Add `data: { animation: 'X' }` to all 6 routes |
| `core/services/emailjs.service.ts` | Read from `environment`, remove console.log |
| `features/home/home.ts` | Remove CommonModule, add OnPush, use CounterDirective + RevealDirective, remove manual observers |
| `features/about/about.ts` | Remove CommonModule, add OnPush, use ThemeService signal, add ngOnDestroy |
| `features/services/services.ts` | Remove CommonModule, add OnPush, move processSteps to i18n keys, add ngOnDestroy |
| `features/projects/projects.ts` | Remove CommonModule |
| `features/projects/project-detail/project-detail.ts` | Remove CommonModule, add OnPush, move hardcoded data out |
| `features/contact/contact.ts` | Remove CommonModule, add OnPush, use EmailService |
| Every feature `.ts` | Add `seoService.setPage(...)` in ngOnInit |
| `index.html` | Remove Cairo/Inter font link, remove Tabler Icons CDN |

---

## Do NOT Do

- Do **not** change any SCSS or visual design — design is complete and correct
- Do **not** change route paths or URL structure
- Do **not** change `environments.ts` credentials — EmailJS keys are real and working
- Do **not** add NgModules anywhere — strictly standalone
- Do **not** remove `TranslateModule` from any component — i18n is required everywhere
- Do **not** change the `projects.data.ts` structure (id/key/image/categoryKey/status/featured)
- Do **not** install new npm packages without flagging it first

---

## How to Work

1. **Audit before changing** — list findings first, then fix batch by batch
2. **Fix one file per message** — explain what changed and why
3. **Prefer `.ts` fixes** — only change templates when the issue requires it
4. **Test mentally** — after each change, consider if `ng build --configuration production` would pass

---

## Production Readiness Checklist

- [ ] `ng build --configuration production` → zero errors, zero warnings
- [ ] All `console.log` removed from source files
- [ ] `SeoService.setPage()` called in `ngOnInit` of all 5 feature components
- [ ] Route `data.animation` set on all routes
- [ ] `emailjs.service.ts` reads credentials from `environment`
- [ ] `contact.ts` uses `EmailService`, not raw emailjs import
- [ ] `CommonModule` replaced with specific imports in all components
- [ ] `OnPush` change detection on all components
- [ ] All `IntersectionObserver` instances disconnected in `ngOnDestroy`
- [ ] Unused fonts/CDN links removed from `index.html`
- [ ] No hardcoded hex colors or text strings in `.ts` files
