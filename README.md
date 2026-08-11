# Bookstore

A full-stack bookstore management system: a single Spring Boot REST API backend with a
single React SPA frontend, serving both the storefront (browse/purchase books) and the
admin console (manage books, authors, categories, publishers) behind one login with
role-based routing.

This replaces the original two separate Thymeleaf/Maven apps (`bookstore-manager` and
`bookstore-user`) that had to be run and viewed side by side.

## Stack

| Layer    | Tech |
|----------|------|
| Backend  | Java 21, Spring Boot 3.4, Gradle, PostgreSQL, Liquibase, Spring Security (JWT + BCrypt) |
| Frontend | React 19, TypeScript, Tailwind CSS v4, Vite, pnpm, React Router, TanStack Query, Zustand, react-hook-form + zod |

See [backend/README.md](backend/README.md) and [frontend/README.md](frontend/README.md)
for project-specific details.

## Project layout

```
backend/    Spring Boot REST API (Gradle, Java 21)
frontend/   React + TypeScript SPA (pnpm, Vite)
```

## Prerequisites

- JDK 21
- Node.js 20+ and pnpm
- PostgreSQL running locally, with an empty `bookstore` database created:
  ```sql
  CREATE DATABASE bookstore;
  ```

## Running locally

**1. Backend** (http://localhost:8080)

```bash
cd backend
./gradlew bootRun
```

On first boot, Liquibase creates the schema and seeds an admin account:

- Username: `admin`
- Password: `admin`

**2. Frontend** (http://localhost:5173)

```bash
cd frontend
pnpm install
pnpm dev
```

The Vite dev server proxies `/api` requests to the backend on port 8080, so no CORS
configuration is needed in development.

Open http://localhost:5173, sign in as `admin`/`admin` for the admin console, or
register a new account for the storefront.

## Configuration

The backend reads datasource, JWT, and CORS settings from environment variables (see
[backend/README.md](backend/README.md) for the full list and defaults).
