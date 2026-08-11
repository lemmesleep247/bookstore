# Bookstore Frontend

A single React SPA serving both the storefront (browse/purchase books) and the admin
console (manage books, authors, categories, publishers), with one login and
role-based routing.

## Stack

- React 19 + TypeScript, Vite
- pnpm
- Tailwind CSS v4
- React Router (role-gated routes)
- TanStack Query (server state / data fetching)
- Zustand (auth session + toast notifications)
- react-hook-form + zod (forms and validation)
- axios (HTTP client, with a JWT bearer interceptor)
- lucide-react (icons)

## Running

Requires the [backend](../backend) running on `http://localhost:8080`.

```bash
pnpm install
pnpm dev
```

Opens on `http://localhost:5173`. The dev server proxies `/api/*` to the backend
(see `vite.config.ts`), so no CORS setup is needed locally.

## Structure

```
src/
  api/          axios instance + one module per domain (books, auth, users, ...)
  types/        TypeScript types mirroring backend DTOs
  store/        zustand stores: authStore (session), toastStore (notifications)
  routes/       ProtectedRoute / AdminRoute / GuestRoute route guards
  components/
    ui/         shared primitives (Button, Input, Card, Pagination, ConfirmDialog, ...)
    layout/     StorefrontLayout, AdminLayout
  pages/
    auth/       login, register
    storefront/ browse, purchase, orders, category/publisher details
    account/    profile, edit details, change password
    admin/      dashboard + CRUD pages for books/authors/categories/publishers
```

## Auth model

The JWT returned by `/api/auth/login` (and its decoded role/user info) is held in
`authStore` (zustand, persisted to `localStorage`). `ProtectedRoute` requires any
authenticated user; `AdminRoute` additionally requires `role === "ADMIN"`; `GuestRoute`
redirects already-authenticated users away from `/login` and `/register`.

## Build

```bash
pnpm build   # tsc -b && vite build
```
