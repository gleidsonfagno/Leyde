Leyde Frontend Architecture

This folder contains the frontend architecture scaffold for the Leyde e-commerce project using Next.js 15, App Router, TypeScript and Tailwind CSS.

Key concepts implemented:
- App Router + Server Components (default)
- Feature-based organization: src/features/*
- Reusable UI primitives: src/components/ui
- Layout components: src/components/layout
- API layer: src/lib/api.ts (fetch helpers)
- Services: src/services/* for domain-specific API calls
- Hooks: src/hooks/* for client-only behaviors
- Providers / Context: src/providers/* (AuthProvider example)
- Types: src/types/* central type definitions
- Utils: src/utils/* utility helpers
- Env example: .env.local.example (NEXT_PUBLIC_API_URL)

Structure:
- src/app - App Router (layout, head), keep pages and routes out until implementing screens
- src/components - shared UI and layout
- src/features - feature-specific components and hooks
- src/services - API services that consume backend endpoints
- src/hooks - reusable client hooks
- src/lib - low-level API client
- src/providers - React Context providers
- src/types - TypeScript types
- src/styles - Tailwind entry (globals.css)
- public - static assets

Notes:
- All components are skeletons/placeholders — do not implement pages or business logic here yet.
- Prefer server components; use "use client" only when interactivity is required.
- When implementing API calls, prefer services calling lib/getJson and return typed DTOs.

Next steps when ready to implement UI:
1. Implement product listing page in app/(public)/products using server components and ProductQueryService.
2. Implement client interactions (cart, auth) using client components and AuthProvider.
3. Add integration tests and Storybook for UI components.
