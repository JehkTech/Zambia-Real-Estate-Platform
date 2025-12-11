# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This repository is a single-page real estate web application for the Zambian market, built with React, TypeScript, Vite, Tailwind CSS 4, and shadcn/radix-based UI components. It implements a marketing/marketplace-style UI with mocked data only—there is currently no backend integration or real API calls.

## Common Commands

All commands are intended to be run from the repository root.

- Install dependencies (required before anything else):
  - `npm install`
- Run the development server with hot reload:
  - `npm run dev`
  - Vite will print the local URL (typically `http://localhost:5173`).
- Build a production bundle:
  - `npm run build`

There are currently no npm scripts configured for linting, testing, or preview. If you add them (for example using ESLint, Vitest, or `vite preview`), update this file accordingly so future agents know the canonical commands.

## High-Level Architecture

### Entry points and application shell

- `index.html` is the Vite entry HTML file and mounts the React app into the `#root` DOM element.
- `src/main.tsx` bootstraps React using `createRoot` and renders `<App />`, importing global styles from `src/index.css`.
- `src/App.tsx` defines the top-level application shell:
  - Manages the current view via a `PageType` union type (`'home' | 'buy' | 'rent' | 'sell' | 'commercial' | 'boarding' | 'post-property' | 'account'`).
  - Holds the single piece of global navigation state: `currentPage` (`useState<PageType>`).
  - Renders the persistent layout: `<Header />`, the active page component, and `<Footer />`.
  - Acts as a very simple client-side router implemented as a `switch` statement over `currentPage`.

**Implications for changes:**
- To add or remove a top-level page, you must:
  - Extend the `PageType` union in `App.tsx`.
  - Update the `renderPage` switch in `App.tsx`.
  - Wire the new page into navigation where appropriate (e.g., `Header`, `Footer`, CTA buttons).

### Page components

Page-level components live in `src/pages/` and represent the major top-level views:

- `HomePage.tsx` composes the main landing layout by orchestrating section components: `HeroSection`, `FeaturesSection`, `PropertiesSection`, `TestimonialsSection`, and `CTASection`. It passes the `onNavigate` callback to sections that need to trigger navigation.
- `BuyPage.tsx`, `RentPage.tsx`, and `BoardingPage.tsx` implement category-specific browsing experiences for buying, renting, and student boarding respectively:
  - Each defines its own local mock data array for properties.
  - Each manages local UI state for filters, price ranges, view mode (grid/list), and sometimes filter panel visibility.
  - All of them reuse `PropertyCard` for listing items and shadcn UI primitives (e.g., `Card`, `Select`, `Slider`, `Badge`, `Button`).
- `SellPage.tsx` is a marketing-style page for property owners, with feature highlights, a how-it-works flow, and pricing tiers. Navigation to the posting flow uses `onNavigate('post-property')`.
- `CommercialPage.tsx` (truncated in tooling output but structurally similar) handles commercial property listings using the same pattern: local mock data, filters, and `PropertyCard` composition.
- `PostPropertyPage.tsx` (not shown above but imported in `App.tsx`) is the logical place for any future listing creation form or multi-step flow.
- `AccountPage.tsx` defines a complex account dashboard:
  - Uses shadcn Tabs (`profile`, `properties`, `favorites`, `verification`, `settings`, `billing`).
  - Contains inline mock `mockUser`, `mockProperties`, and mock billing data.
  - Manages small UI states like `activeTab` and `isEditing` for the profile section.

**Pattern:** pages are mostly self-contained, own their mock data, and expose a single prop `onNavigate: (page: PageType) => void` to allow navigation back to the home or other views.

### Layout and shared components

Layout and marketing sections live under `src/components/`:

- `Header.tsx` implements the top navigation bar:
  - Uses `currentPage: PageType` to highlight the active nav item.
  - Exposes navigation actions via the `onNavigate` callback (e.g., logo click -> `'home'`, nav items -> the relevant page, dropdown items for account and posting properties).
  - Contains both desktop and mobile navigation, with responsive breakpoints and a mobile hamburger menu (`isMenuOpen` state).
- `Footer.tsx` implements a rich multi-column footer:
  - Includes quick navigation buttons wired to `onNavigate` for common paths.
  - Displays contact information, support links, newsletter subscription UI, and social icons.
- Section components used in the home and other pages include:
  - `HeroSection.tsx` – primary hero with search card and call-to-action; internally uses a small state machine (`searchType`) and calls `onNavigate` to route to `rent`, `buy`, or `commercial` when the user searches.
  - `FeaturesSection.tsx`, `TestimonialsSection.tsx`, `CTASection.tsx`, and `PropertiesSection.tsx` – compose various sections of the landing page. `PropertiesSection` mirrors the filter/grid pattern found in category pages but uses a curated set of featured properties.
- `PropertyCard.tsx` (not expanded here) is the shared card component used across listing-style views (home, buy, rent, boarding, commercial). Any changes to property display (badges, labels, layout) should be made here rather than in individual pages.
- `components/figma/ImageWithFallback.tsx` provides a wrapper around `<img>` or similar to handle image loading errors and provide fallback behavior; used by `HeroSection` and potentially other components that need robust image display.

### UI primitives (design system)

The design system lives under `src/components/ui/` and follows the shadcn/ui pattern built on Radix primitives and Tailwind:

- Files such as `button.tsx`, `card.tsx`, `input.tsx`, `select.tsx`, `dialog.tsx`, `tabs.tsx`, `badge.tsx`, `avatar.tsx`, `sheet.tsx`, `tooltip.tsx`, etc. define reusable UI primitives.
- These components are the primary building blocks used throughout pages and layout components. When building new UI, prefer these over ad-hoc HTML+className to ensure consistent styling, focus behavior, and accessibility.
- `ui/utils.ts` and `ui/use-mobile.ts` provide helpers (e.g., class name utilities, media-query-based behavior) that support the UI primitives.

Tailwind and themeing:

- `src/index.css` is a compiled Tailwind 4 stylesheet that includes Tailwind’s layers (`@layer base`, `@layer utilities`, etc.) and defines CSS custom properties for semantic colors (e.g., `--primary`, `--secondary`) and typography.
- Utility classes (e.g., `bg-gray-50`, `text-primary`, `max-w-7xl`) are used directly throughout JSX; there is no hand-written CSS in most components.
- `src/styles/globals.css` layers project-specific global styles and likely defines how Tailwind variables map to the brand colors described in `src/TECHNOLOGY_STACK.md` (primary `#52a447`, secondary `#007786`, white backgrounds).

When adjusting design tokens or global theming, do so in the Tailwind configuration and global CSS rather than scattering hard-coded colors. Many components (e.g., `Header`, `Footer`, `HeroSection`) already lean on `text-primary`, `bg-primary`, etc., which pick up the theme from CSS variables.

### Data and content model

The app currently uses static, front-end-only data:

- `src/constants/data.ts` exports data arrays for feature cards and testimonials. These are consumed by sections like `FeaturesSection` and `TestimonialsSection` to keep marketing copy and icon mapping centralized.
- Page components such as `BuyPage`, `RentPage`, `BoardingPage`, `CommercialPage`, and `AccountPage` define local arrays for properties, boarding houses, transactions, and user profile info. There is no shared property interface type yet; each page defines fields as needed.
- There is no API layer abstraction or HTTP client configured; any future backend integration (e.g., Supabase, as hinted in `TECHNOLOGY_STACK.md`) will require introducing a data-access layer (e.g., `src/lib/api/` or `src/services/`) and replacing these mock arrays.

**Guidance for future agents:**
- When introducing real APIs, avoid sprinkling `fetch` calls throughout page components. Instead, centralize data fetching and types and keep pages mostly as presentational containers.
- Consider extracting a shared `Property` type and related subtypes (e.g., `Owner`, `BoardingHouse`) into a `src/types/` module to reduce duplication across pages.

### Documentation and design notes

- `README.md` is very minimal and currently documents only:
  - The project name and its origin Figma design.
  - How to install and start the dev server (`npm i`, `npm run dev`).
- `src/TECHNOLOGY_STACK.md` describes the intended technology stack and architectural direction:
  - React 18 + TypeScript + Vite + Tailwind CSS.
  - Radix + shadcn/ui for accessible, composable UI primitives.
  - Lucide icons, React Hook Form, and Supabase as planned tooling.
  - Brand colors and future enhancements (PWA, internationalization, analytics, proper testing).
- `src/guidelines/Guidelines.md` is currently a commented template encouraging you to add project-specific AI/design guidelines. If you customize it with concrete rules (e.g., layout constraints, component usage guidelines), they will be valuable to reference when generating or editing UI.

## How to Safely Extend the Codebase

- **Navigation and new pages:** Extend `PageType` and the `renderPage` switch in `App.tsx`, then plug the new page into `Header`, `Footer`, and any CTAs that should route to it.
- **New UI components:** Prefer building on top of `src/components/ui/*` primitives for buttons, forms, cards, dialogs, etc. This ensures consistent styles and accessibility.
- **Property display:** If you need to add fields or change how properties are displayed (badges, pricing, labels), update `PropertyCard` and then adjust the mock data structures in the relevant pages to match.
- **Design consistency:** Keep brand colors and typography changes within the Tailwind theme/global CSS so that utility classes (e.g., `bg-primary`, `text-secondary`) remain the source of truth.

If you introduce testing, linting, or a backend API layer, update this WARP.md with the new commands and structural conventions so future agents can follow the established patterns.