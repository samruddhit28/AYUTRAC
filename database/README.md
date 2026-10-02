# AyuTRAC database

The schema is PostgreSQL 14+ compatible and uses UUID identifiers, foreign keys, audit logs, and automatic `updated_at` timestamps.

```bash
createdb ayutrac
psql -d ayutrac -f schema.sql
psql -d ayutrac -f seed.sql
```

For a named local user, use `psql -U postgres -d ayutrac -f schema.sql`. Store connection credentials only in environment variables, never source files.

