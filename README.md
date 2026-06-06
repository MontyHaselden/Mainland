# Mainland Building Inspections

Production Next.js site with online booking (NZ calendar, morning/afternoon slots) and a staff dashboard.

## Stack

- **Next.js** (App Router) + TypeScript + Tailwind CSS
- **Neon** PostgreSQL + Drizzle ORM
- **Brevo** transactional email
- **Vercel** deployment

## Getting started

1. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

2. Create a [Neon](https://neon.tech) database (see **Neon setup** below) and set `DATABASE_URL` in `.env.local`.

3. Run migrations:

   ```bash
   npm run db:migrate
   ```

4. Set staff credentials (`STAFF_EMAIL`, `STAFF_PASSWORD`, `STAFF_SESSION_SECRET`), then seed the first staff account into the database:

   ```bash
   npm run staff:seed
   ```

5. Start the dev server:

   ```bash
   npm run dev
   ```

- Public site: [http://localhost:3000](http://localhost:3000)
- Book: `/book`
- Staff dashboard (save this URL, not linked publicly): `/staff/login` → `/staff`

## Neon setup

1. Sign in at [console.neon.tech](https://console.neon.tech) and create a project (e.g. `mainland-inspections`).
2. Open **Dashboard → Connection details**.
3. Copy the **pooled** connection string (`postgresql://...?sslmode=require`).
4. Paste it into `.env.local` as `DATABASE_URL`.
5. Apply migrations and seed your first staff login:

   ```bash
   npm run db:migrate
   npm run staff:seed
   ```

Staff accounts are stored in the `staff_users` table. Add more later with:

```bash
npm run staff:add -- colleague@example.com their-password "Their Name"
```

Hash a password without saving it (for `STAFF_PASSWORD_HASH` or manual use):

```bash
npm run staff:hash -- your-password-here
```

## Booking rules

- Timezone: **Pacific/Auckland**
- Days: **Monday–Saturday** (Sunday closed)
- Slots: **Morning** and **Afternoon** (one booking per slot)
- Calendar colours: green (2 free), orange (1 free), red (full)

## Deploy to Vercel

1. Import the repository in Vercel.
2. Add all variables from `.env.example` to the Vercel project.
3. Run `npm run db:migrate` and `npm run staff:seed` against production Neon (or run `drizzle/0000_init.sql` and `drizzle/0001_staff_users.sql` in the Neon SQL editor).
4. Deploy.

## Hero artwork

Active hero: `public/hero-base.jpg` (ArchViz suburban scene, v2).

Reference backups:
- `public/hero/reference/hero-base-v1.jpg` — first layered scene
- `public/hero/reference/hero-base-v2.jpg` — larger house + drone operator
- `public/hero-base-v1-reference.jpg` — duplicate of v1 at public root

Inspector animation anchors live in `lib/hero/scene-layers.ts`. Crop via `--hero-object-position-desktop` / `--hero-object-position-mobile` in `app/globals.css`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run db:migrate` | Apply SQL migrations |
| `npm run db:generate` | Generate migrations from schema |
| `npm run db:push` | Push schema (dev only) |
| `npm run staff:seed` | Save `STAFF_EMAIL` / `STAFF_PASSWORD` from `.env.local` into Neon |
| `npm run staff:add` | Add or update another staff account |
| `npm run staff:hash` | Print a bcrypt hash for a password |
