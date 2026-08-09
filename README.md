# Merxano CMS

The public website and an internal administration area for Merxano Consulting (`merxano.co.tz`). It is built with Next.js, Prisma, PostgreSQL, and NextAuth credentials login.

## Local setup

1. Copy `.env.example` to `.env.local` and add your PostgreSQL/Neon connection strings.
2. Run `npm install`.
3. Run `npm run db:generate` and `npm run db:push`.
4. Run `npm run db:seed` to load the Merxano starter content and the initial admin account.
5. Run `npm run dev`, then visit `http://localhost:3000`.

The initial seeded administrator is `admin@merxano.co.tz` with password `ChangeMe123!`. Change it as soon as the database is deployed.

## Production checklist

- Set `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, and `AUTH_SECRET` in your hosting environment.
- Use `npm run build` to verify the release and `npm run start` to run it.
- Update company contacts, payment details, courses, cohorts, testimonials, and the homepage in `/admin`.
- Connect your preferred transactional-email and media-storage providers before enabling email delivery and uploads. The current APIs fail safely until those services are configured.

## Useful commands

```bash
npm run dev
npm run build
npm run db:generate
npm run db:push
npm run db:seed
```
