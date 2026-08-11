# Bookstore Backend

Spring Boot REST API for the bookstore app: books, authors, categories, publishers,
users, purchases — with JWT-based auth and role-based access control (`ADMIN` /
`USER`).

## Stack

- Java 21, Spring Boot 3.4
- Gradle (wrapper included, pinned to Gradle 8.13)
- Spring Web, Spring Data JPA, Spring Security
- PostgreSQL + Liquibase (schema is entirely changelog-managed; Hibernate `ddl-auto` is
  set to `validate` and never mutates the schema)
- JWT auth (`io.jsonwebtoken:jjwt`) with BCrypt password hashing

## Running

Requires a PostgreSQL server with an empty `bookstore` database:

```sql
CREATE DATABASE bookstore;
```

```bash
./gradlew bootRun
```

The app starts on port `8080`. Liquibase runs automatically on boot and creates all
tables/sequences, then seeds a default admin account:

- Username: `admin`
- Password: `admin`

Change or remove this account once you have your own admin user, since the seed
changeset always creates it on a fresh database.

## Configuration

All settings are environment-variable overridable (see `src/main/resources/application.yml`):

| Variable | Default | Purpose |
|----------|---------|---------|
| `DB_HOST` | `localhost` | Postgres host |
| `DB_PORT` | `5432` | Postgres port |
| `DB_NAME` | `bookstore` | Database name |
| `DB_USERNAME` | `postgres` | Database user |
| `DB_PASSWORD` | `postgres` | Database password |
| `SERVER_PORT` | `8080` | HTTP port |
| `JWT_SECRET` | (dev default, base64) | HMAC signing key for JWTs — **override in any real deployment** |
| `JWT_EXPIRATION_MS` | `86400000` (24h) | JWT lifetime |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173` | Comma-separated allowed origins |

## API overview

All endpoints are under `/api`.

- `POST /api/auth/login`, `POST /api/auth/register` — public
- `GET /api/books`, `GET /api/books/{id}` — public (browsing)
- `GET /api/categories/{id}`, `GET /api/publishers/{id}` — public (details pages)
- `GET/PUT /api/users/me`, `PUT /api/users/me/password` — authenticated
- `POST /api/purchases`, `GET /api/purchases` — authenticated
- `/api/admin/**` — `ADMIN` role only (books/authors/categories/publishers CRUD,
  dashboard stats)

Auth is stateless JWT: send `Authorization: Bearer <token>` on subsequent requests
after login.

## Database schema changes

Add a new Liquibase changeset file under `src/main/resources/db/changelog/changes/`
and include it from `db.changelog-master.yaml`. Never edit an already-applied
changeset — Liquibase tracks applied changesets by id/author/file checksum.

## Tests

```bash
./gradlew test
```
