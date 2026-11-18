# Azurea Six-Towers Resort & Owner Revenue OS

An enterprise hospitality booking engine, 6,000-unit condominium asset management portal, and real-time property revenue analytics platform designed for multi-tower beachfront developments.

## Core Platform Modules

- **Full-Bleed Resort Showcase & Gallery**: High-resolution photography carousel highlighting the beachfront lagoon wave pools, Paris Beach Club rotunda, and coastal promenade, paired with an instant six-tower unit selector.
- **Interactive 2D Sky-POV Masterplan & Unit Selector**: Spatial two-dimensional overhead site plan across all six beachfront towers (`T1` Santorini, `T2` St. Tropez, `T3` Maldives, `T4` Positano, `T5` Miami, `T6` Boracay) with floor selection (Floors 1–62), residence tier comparisons, and 12 selectable condominium units per floor.
- **Guest Reservation Tracker**: Live reservation lookup (`#AZR-*`), check-in stage progression (`Confirmed Reservation` → `VIP Pre-Arrival` → `Checked In & Keycard Active` → `Completed Stay`), and itemized folio transparency.
- **Condo Owner ID Revenue Portal**: Individual owner ledger (`#OWN-T1-804` and unit-linked owner accounts) with real-time 80/20 gross revenue split telemetry, maintenance reserve controls, and payout destination preferences.
- **VIP Concierge & Butler Dispatch**: Service ticket desk for yacht charters, daybed pod reservations, and suite provisioning synced directly to guest reservations.
- **6,000-Unit Master Analytics ERP**: Executive portfolio dashboard tracking gross booking volume, tower occupancy rankings, ownership inventory toggling, and multi-tower yield performance.

## Technology Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Engine**: Vite 8
- **Styling System**: Tailwind CSS v4 (`@tailwindcss/vite`) + PostCSS (`autoprefixer`)
- **Typography & Icons**: Cormorant Garamond, Plus Jakarta Sans, Lucide React

## Local Development & Verification

```bash
# Install dependencies (honors .npmrc legacy-peer-deps=true)
npm install

# Start development server on port 3000
npm run dev

# Run TypeScript type check
npm run lint

# Run unit tests for the 6,000-unit resort ledger engine
npx tsx --test src/utils/resortEngine.test.ts

# Create production bundle in dist/
npm run build
```

## Production Deployment (Vercel)

This repository is preconfigured for single-click or CLI Vercel deployment:

1. **Dependency Resolution**: `.npmrc` pins `legacy-peer-deps=true` for clean `npm install` execution.
2. **Build Settings**: Framework Preset `Vite`, Build Command `npm run build`, Output Directory `dist`.
3. **SPA Routing**: `vercel.json` routes all incoming client paths to `/index.html`.
4. **Static Media**: All property photography and `/favicon.svg` reside in `public/` and are served from root-absolute `/assets/...` paths.
