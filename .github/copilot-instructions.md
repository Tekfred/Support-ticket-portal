# Copilot instructions for Support-ticket-portal

## Quick commands
- Install: npm install
- Dev server (hot reload): npm run dev
- Build (production): npm run build
- Preview build: npm run preview

Linting & formatting
- Run full lint pipeline: npm run lint
  - Runs oxlint and eslint via npm-run-all2 (see scripts: lint:oxlint, lint:eslint)
- Run ESLint on one file or path (single-file): npx eslint path/to/file.vue
- Run OXLint on one file: npx oxlint path/to/file-or-dir
- Format file(s) with Prettier (single file): npx prettier --write src/path/to/file

Testing
- No automated test scripts are included. Add a test framework if needed; no `npm test` script present.

Node
- Supported Node engines (package.json): Node ^20.19.0 or >=22.12.0

---
## High-level architecture (big picture)
- Vite + Vue 3 single-page application. Entry: src/main.js (mounts App.vue).
- Routing: src/router/index.js defines 4 main routes: /unassigned, /my-tickets, /booked-tickets, /analytics.
- Layout: App.vue uses MainLayout (src/components/Layout/MainLayout.vue). MainLayout composes Sidebar and AppNavbar and renders RouterView for page content.
- Views (pages): src/views/* contain page-level components for each route (UnassignedTicketsPage, MyWorkspacePage, BookedTicketsPage, DashboardAnalyticsPage).
- State management: Pinia used with composition-style stores in src/stores/:
  - ticketStore.js — core ticket CRUD and persistence
  - uiStore.js — UI toggles (sidebar)
  - themeStore.js — dark/light theme + persistence
- Local persistence: src/stores/Data.js provides load/save functions using localStorage keys `booking_support_tickets` and `booking_support_bookings`. INITIAL_TICKETS / INITIAL_BOOKINGS seed the app.
- Components: UI is component-driven with directories grouped by feature (UnassignedTickets, MyTickets, BookedTickets, Layout, Shared). Many components use composition API and props/events for parent-child communication.

---
## Key repository-specific conventions
- Path alias: "@/*" → ./src/* (see jsconfig.json). Use `@/` in imports for src files.
- Pinia stores use the composition-style defineStore returning refs and functions (e.g., useTicketStore). Persist changes by calling the store's persist()/save helper which delegates to Data.js.
- LocalStorage keys:
  - Tickets: `booking_support_tickets`
  - Bookings: `booking_support_bookings`
  Keep in mind updates to structures must remain JSON-serializable for backward compatibility.
- Ticket IDs: seeded IDs are like `APL-0001` and createTicket generates `APL-` + time-based suffix. Consumers may rely on this prefix/format.
- "My tickets" identification: demo agent email `ansahaudi86@gmail.com` is used in business logic to compute "my tickets" counts and accepted state. Replace or parameterize this when integrating real auth.
- Theme handling: themeStore immediately applies theme on startup and watches `isDark` to toggle `document.documentElement.classList` and localStorage.
- App-level booking state: App.vue holds bookings in local state and passes them to pages via RouterView props and events (updateBooking, createBooking). This is deliberate — bookings are not in Pinia stores in current scaffold.
- Linting: project uses both oxlint and ESLint. The `npm run lint` script runs both linters (lint:oxlint then lint:eslint). Keep plugin versions in package.json if adding rules.

---
## Files consulted / incorporated
- README.md (project setup + recommended devtools)
- package.json (scripts, dependencies, node engines)
- jsconfig.json (path alias)
- src/main.js, src/App.vue, src/router/index.js, src/stores/*, src/components/Layout/*

---
If you want, next steps can include:
- Adding a brief CONTRIBUTING.md or documenting the hardcoded agent email and localStorage schema.
- Adding a tests setup (Jest / Vitest + example single-file test) and `npm test` script.

(End of file)