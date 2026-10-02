# AyuTRAC frontend

Next.js App Router frontend for the AyuTRAC Cloud CTMS demonstration. It operates against local mock data by default, while all future REST requests are isolated in `lib/api.js`.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local` when connecting to Express.

