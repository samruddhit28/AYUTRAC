# AyuTRAC

**Clinical Trials Management System for Ayurveda Research**  
Smart India Hackathon 2026 · Problem Statement SIH26046

AyuTRAC is a Cloud CTMS demonstration built around one operational question: **See what needs attention before it becomes a compliance or safety issue.**

## What is included

- Next.js clinical research dashboard with responsive navigation and realistic mock data
- Regulatory Clock, portfolio KPIs, Trial Digital Thread, safety review loop, and audit-aware actions
- Study, site, participant, monitoring, safety, regulatory, and reporting workspaces
- Express REST API architecture with mock RBAC headers, services, controllers, and error handling
- PostgreSQL schema with UUID primary keys, foreign keys, audit logs, and seed records
- FHIR R4 and CDISC service boundaries reserved for governed future integration

## Run locally

Copy the root environment template once and adjust values as needed:

```bash
copy .env.example .env
```

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000. The frontend runs without the API using local mock data.

In a second terminal:

```bash
cd backend
npm install
npm run dev
```

The API health check is available at http://localhost:4000/health.

## Database setup

```bash
createdb ayutrac
psql -d ayutrac -f database/schema.sql
psql -d ayutrac -f database/seed.sql
```

Set `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ayutrac` for the backend. The production deployment should supply managed credentials, TLS, SSO/MFA identity integration, and object storage encryption keys through a secret manager.
