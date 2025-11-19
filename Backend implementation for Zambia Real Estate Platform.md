
# Problem
The Zambia Real Estate Platform is currently a React + Vite frontend only. All property listings, account data, and flows like "Post Property" are driven by local mock data and UI state. There is no backend or persistent storage, so features like listing/searching real properties, posting new properties, or managing account data are not truly functional.
# Current Context
* Frontend stack: React 18 + Vite, TypeScript, Tailwind-based UI and Radix UI components.
* No existing backend code; `package.json` only contains frontend dependencies and `vite` scripts.
* Key pages/components:
    * `src/App.tsx`: top-level page switcher between `home`, `buy`, `rent`, `sell`, `commercial`, `boarding`, `post-property`, `account`.
    * `src/components/PropertyCard.tsx`: defines a canonical property shape used across listing pages.
    * `src/components/PropertiesSection.tsx`: home page featured properties, backed by a local `properties` array.
    * `src/pages/BuyPage.tsx`, `RentPage.tsx`, `CommercialPage.tsx`, `BoardingPage.tsx`: each uses its own hard-coded array of properties.
    * `src/pages/PostPropertyPage.tsx`: multi-step wizard with a final "Submit Listing" that only does `alert(...)` and navigates home.
    * `src/pages/AccountPage.tsx`: uses `mockUser` and `mockProperties` objects for profile, stats, properties, billing, etc.
* There is no routing library (navigation is stateful inside `App`), and there are no network calls (`fetch`/`axios`) yet.
# Goals
1. Introduce a simple backend API that serves property and account data and accepts new property listings.
2. Keep the backend lightweight and easy to run locally (no external DB server requirement), while leaving room to upgrade later.
3. Wire the key frontend pages to this backend so that core flows are actually backed by API calls instead of mock arrays.
4. Keep changes within a new `dev` branch only.
# Proposed Backend Architecture
* Stack: Node.js + Express, running in the same repository under a `server/` directory.
* Runtime: plain JavaScript using ES modules (compatible with `"type": "module"` in `package.json`).
* Data storage for now: in-memory arrays seeded from the existing mock data for properties and account. This keeps setup simple and avoids native DB builds on Windows. We will clearly mark a future upgrade path to a real database (SQLite/Postgres) as an improvement.
* API design (initial):
    * `GET /api/properties`
        * Query params: `type` (`buy`|`rent`|`boarding`|`commercial`), optional `featured=true`, and basic filters (to support future search).
        * Returns an array of normalized property objects compatible with `PropertyCard`'s expectations.
    * `GET /api/properties/:id`
        * Returns details for a single property.
    * `POST /api/properties`
        * Accepts a JSON body representing a new property created from the `PostPropertyPage` wizard.
        * Generates an `id`, normalizes fields, appends to the in-memory list, and returns the created property.
    * `GET /api/account`
        * Returns the `mockUser`-equivalent data currently hard-coded in `AccountPage.tsx` (profile, preferences, KYC status, stats, properties summary, billing history).
    * `PUT /api/account`
        * Accepts partial updates for basic profile fields (first name, last name, email, phone, location, bio, notification preferences).
    * (Optional for later) `GET /api/account/properties` to list the user’s own properties, and `GET/POST /api/favorites` for saved properties.
* Server concerns:
    * Use `cors` middleware to allow requests from the Vite dev origin and from the eventual production origin.
    * Use `express.json()` for JSON bodies.
    * Run on port `4000` by default to coexist with `vite dev` (port 5173).
# Proposed Frontend Changes
## 1. Shared types and API client helpers
* Create a small shared TypeScript type for `Property` that matches `PropertyCard` and the backend responses.
* Add a minimal API wrapper using `fetch`, e.g. utility functions in `src/api.ts`:
    * `fetchProperties({ type, featured })`
    * `createProperty(payload)`
    * `fetchAccount()` / `updateAccount(partial)`
* This centralizes URLs and error handling, making future changes easier.
## 2. Replace local mock arrays with API calls
* `src/components/PropertiesSection.tsx`:
    * Remove the hard-coded `properties` array.
    * Use `useEffect` + `useState` to call `fetchProperties({ featured: true })` on mount.
    * Render loading/small error states while data is being fetched.
* `src/pages/BuyPage.tsx`, `RentPage.tsx`, `CommercialPage.tsx`, `BoardingPage.tsx`:
    * Replace their individual mock arrays (`buyProperties`, `rentProperties`, etc.) with calls to `fetchProperties({ type: 'buy' | 'rent' | 'commercial' | 'boarding' })`.
    * Keep existing client-side filter UI, but have it filter the fetched data in-memory for now (no complex query API yet).
## 3. Wire "Post Property" flow to backend
* `src/pages/PostPropertyPage.tsx`:
    * Introduce internal form state that captures the important fields across steps (listing type, property type, key numbers, basic location, price, etc.). We do not need to persist every single checkbox to make the flow functional, but we should cover the core listing fields that map cleanly to the backend `Property` model.
    * On "Submit Listing": instead of `alert(...)` only, build a payload from the collected state and call `createProperty(payload)`.
    * On success, show a success toast/alert and then navigate to home (or to the relevant listing page).
## 4. Wire Account page to backend (minimal)
* `src/pages/AccountPage.tsx`:
    * Replace `mockUser` with data fetched from `GET /api/account` on mount.
    * Replace `mockProperties` in the "My Properties" tab with an API response, either embedded in `/api/account` or via a dedicated endpoint.
    * For now, the "Save Changes" button in the Profile tab:
        * Collects edited basic fields from the form.
        * Calls `PUT /api/account` and updates local state.
    * Some sections (KYC actions, billing history actions, 2FA) will remain mostly presentational, but they’ll now be backed by real account data rather than constants.
# Execution Plan
1. **Backend scaffolding**
    * Update `package.json` to add backend dependencies: `express`, `cors`, and a small id generator like `nanoid`.
    * Add scripts:
        * `"dev:server": "node server/index.js"`
        * (Optional) `"dev:all": "concurrently \"npm run dev\" \"npm run dev:server\""` if we introduce `concurrently`.
    * Create `server/index.js` with an Express app, CORS, JSON parsing, and route registration.
    * Create `server/data.js` containing in-memory arrays seeded from existing mock data (properties by category, account data).
    * Implement the routes listed in the backend architecture section.
2. **Frontend API utilities and types**
    * Add `src/types.ts` (or similar) for a shared `Property` interface and `Account` type matching backend responses.
    * Add `src/api.ts` with `fetchProperties`, `createProperty`, `fetchAccount`, and `updateAccount`.
3. **Integrate listings with backend**
    * Refactor `PropertiesSection`, `BuyPage`, `RentPage`, `CommercialPage`, and `BoardingPage` to use `fetchProperties` instead of local arrays.
    * Maintain existing filters/sorting as client-side operations on the fetched results.
4. **Integrate PostPropertyPage with backend**
    * Introduce a central `formState` in `PostPropertyPage` to capture the fields that map to backend `Property`.
    * On final submission, call `createProperty`, handle loading/error, and navigate after success.
5. **Integrate AccountPage with backend**
    * Fetch account data on mount and replace `mockUser`/`mockProperties` with real state.
    * Wire the "Save Changes" button to `updateAccount` for basic profile fields.
6. **Manual verification**
    * Run `npm run dev` and `npm run dev:server` together and verify:
        * Home page featured properties and category pages load from the backend.
        * Posting a new property creates it on the backend and it appears in the appropriate listing.
        * Account page loads from `/api/account` and profile edits are persisted in memory.
# Future Improvements (to discuss with user)
* Replace in-memory arrays with a real database (e.g. SQLite or Postgres) and a migration layer.
* Introduce authentication (basic email/password + JWT) and multi-user support.
* Implement real search/query parameters on `/api/properties` instead of only client-side filters.
* Add favorites/saved-properties endpoints and hook up the heart icons and Favorites tab.
* Add basic validation (e.g. with Zod) on backend request payloads and better error reporting to the frontend.
