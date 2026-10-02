# AyuTRAC backend

Express REST API structured for PostgreSQL-backed CTMS operations. Authentication is intentionally mockable through `x-user-role` and `x-user-id` headers until SSO/MFA is integrated.

```bash
npm install
npm run dev
```

The API runs at http://localhost:4000 and exposes `GET /health`. Configure `DATABASE_URL` in `backend/.env` or the root environment file before using data endpoints.

