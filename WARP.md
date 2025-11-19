# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common commands

### Install dependencies
- From the repository root, run `npm install` (or `npm i`) to install dependencies.

### Development server
- `npm run dev`
  - Starts the Vite development server on port `3001` (see `vite.config.ts`), and is configured to open a browser window automatically.

### Production build
- `npm run build`
  - Builds the React app using Vite.
  - Output is written to the `build/` directory (custom `outDir` in `vite.config.ts`).

### Linting, type-checking, and tests
- There are currently **no npm scripts** defined for linting, type-checking, or running tests in `package.json`.
- The technology stack document (`src/TECHNOLOGY_STACK.md`) mentions tools like ESLint, Prettier, and testing frameworks as future enhancements; if you introduce them, also add corresponding scripts (for example `lint`, `type-check`, `test`) and update this section with the exact commands (including how to run a single test).

## High-level architecture

### Overall structure
- This is a single-page React application built with Vite and TypeScript.
- Entry point: `src/main.tsx` uses `react-dom/client.createRoot` to render `<App />` into the DOM and imports `src/index.css` (compiled Tailwind CSS + theme tokens).
- Application shell and high-level routing are handled in `src/App.tsx`.
- The main source tree is organized as:
  - `src/App.tsx` – application shell and page router.
  - `src/pages/` – page-level components (e.g. `HomePage`, `BuyPage`, `RentPage`, `SellPage`, `CommercialPage`, `BoardingPage`, `PostPropertyPage`, `AccountPage`).
  - `src/components/` – reusable sections and UI building blocks.
  - `src/components/ui/` – design-system primitives (largely shadcn/ui-style components built on Radix UI + Tailwind).
  - `src/components/figma/` – Figma-derived or utility components such as `ImageWithFallback`.
  - `src/constants/` – static configuration and display data (e.g. feature cards, testimonials).
  - `src/styles/` – additional global styles (e.g. `styles/globals.css`).
  - `src/TECHNOLOGY_STACK.md` – documentation of the intended stack and tooling.

### Navigation model (no routing library)
- There is **no external routing library** (e.g. React Router). Navigation is implemented manually using React state in `src/App.tsx`:
  - `App` defines a `PageType` union type (`'home' | 'buy' | 'rent' | 'sell' | 'commercial' | 'boarding' | 'post-property' | 'account'`).
  - `App` holds `currentPage` in local state and switches on it to render the appropriate page component.
- Page components and navigation controls use a **callback-based navigation pattern**:
  - `App` passes `currentPage` and `onNavigate: (page: PageType) => void` to `Header`.
  - `Header` uses this to:
    - Highlight the active navigation item.
    - Navigate between sections (e.g. Buy/Rent/Boarding/Sell/Commercial, Account, Post Property) from both desktop and mobile menus.
  - `Footer` receives `onNavigate` and uses it for "Quick Links" (e.g. Buy, Rent, Post Property, Commercial) and for returning to `home`.
  - `HomePage` receives `onNavigate` and passes it down to components like `HeroSection` and `CTASection` so that call-to-action buttons and search flows can switch pages (e.g. from home to rent/buy/commercial or to post-property).
- When extending navigation:
  - Add new entries to the `PageType` union in `App.tsx`.
  - Update the `switch` statement in `App` to render the new page.
  - Thread `onNavigate` into any new components that need to initiate page changes instead of introducing a second navigation mechanism.

### Pages vs. sections vs. primitives
- **Pages (`src/pages/*.tsx`)**
  - Page components are responsible for composing higher-level sections into complete screens.
  - Example: `HomePage` composes `HeroSection`, `FeaturesSection`, `PropertiesSection`, `TestimonialsSection`, and `CTASection`, and passes `onNavigate` to the sections that actually trigger navigation.
- **Sections (`src/components/*.tsx` at the top level)**
  - Components like `HeroSection`, `FeaturesSection`, `PropertiesSection`, `TestimonialsSection`, `CTASection`, `Header`, and `Footer` implement semantically meaningful sections of the UI.
  - They typically:
    - Use local state for purely visual or UI control concerns (e.g. view toggles, filters).
    - Rely on props for navigation (`onNavigate`) and for data where applicable.
- **UI primitives (`src/components/ui/*.tsx`)**
  - These components wrap Radix UI primitives and Tailwind styling into a cohesive design system layer.
  - Examples include `button`, `card`, `input`, `select`, `badge`, `slider`, `dropdown-menu`, `dialog`, etc.
  - When building new UI, prefer composing these primitives instead of recreating styles from scratch.

### Data and display logic
- Most data is **mock/static** and used for display only:
  - `src/constants/data.ts` defines static arrays like `featuresData` and `testimonialsData` which are consumed by `FeaturesSection` and `TestimonialsSection`.
  - `PropertiesSection` currently inlines its own mock `properties` array at the top of the file instead of using `constants`.
- There is no API client layer or external data fetching implemented yet.
  - The technology stack document describes planned integrations (e.g. Supabase, Cloudinary/S3), but these are not wired up in the code at this time.
- If you introduce real data fetching, consider:
  - Centralizing API-related code (clients, hooks) in a dedicated folder (e.g. `src/api/` or `src/services/`).
  - Gradually replacing inline mock data while preserving the present component interfaces.

### Styling and design system
- Tailwind CSS v4 is compiled into `src/index.css` (utility classes, theme tokens, base styles) and is used heavily via `className` on JSX elements.
- Brand and semantic colors:
  - Primary: `#52a447` (green) – used for primary CTAs and accents (e.g. `Header` logo, primary buttons, verification badges).
  - Secondary: `#007786` (teal) – used for supporting CTAs and accents (e.g. some buttons and data cards).
- Many components use these brand colors both via Tailwind tokens (e.g. `bg-primary`, `text-primary`) and inline styles for specific Figma-derived elements.
- `src/components/ui/*` encapsulates most shared interactive styling; updating these primitives will propagate visual changes across the app.

### Images and media
- `src/components/figma/ImageWithFallback.tsx` is the central abstraction for image rendering.
  - Components such as `HeroSection` and `PropertyCard` use `ImageWithFallback` for property and hero imagery.
  - The properties sections use placeholder URLs like `/api/placeholder/400/300` for demo purposes.
- When adding new imagery, prefer using `ImageWithFallback` so error and loading states remain consistent.

### Tooling and configuration
- **Vite configuration (`vite.config.ts`)**
  - Uses `@vitejs/plugin-react-swc` for fast React compilation.
  - Sets the dev server:
    - `server.port = 3001`
    - `server.open = true`
  - Sets the build output:
    - `build.target = 'esnext'`
    - `build.outDir = 'build'`
  - Defines a set of **versioned aliases** for dependencies. For example:
    - Import paths like `'lucide-react@0.487.0'`, `'react-hook-form@7.55.0'`, or `'@radix-ui/react-tooltip@1.1.8'` are aliased back to their actual package names.
    - This matches how some generated code (e.g. from design tooling) may import these packages; the aliases let the code use versioned specifiers without changing actual dependency names.
  - Defines `@` as an alias for `./src`, so you can use imports like `@/components/HeroSection` instead of relative paths.
- **Technology stack documentation (`src/TECHNOLOGY_STACK.md`)**
  - Describes the intended setup (React + TypeScript + Vite + Tailwind + Radix/shadcn + Lucide icons, etc.).
  - Also lists planned tools (ESLint, Prettier, testing frameworks, Supabase, cloud image storage) that are not yet reflected in `package.json`.
  - When you add or change tooling, keep this document aligned with actual dependencies and scripts.

### Guidelines for AI-assisted changes
- `src/guidelines/Guidelines.md` exists as a template for project-specific rules and design-system guidance but currently only contains commented examples and no active rules.
- If you introduce concrete guidelines (for example, layout constraints, typography rules, or component usage patterns), place them in this file so future AI-assisted edits can respect them.
