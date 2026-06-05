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

2. Create a [Neon](https://neon.tech) database and set `DATABASE_URL`.

3. Run migrations:

   ```bash
   npm run db:migrate
   ```

4. Set staff credentials (`STAFF_EMAIL`, `STAFF_PASSWORD`, `STAFF_SESSION_SECRET`).

5. Start the dev server:

   ```bash
   npm run dev
   ```

- Public site: [http://localhost:3000](http://localhost:3000)
- Book: `/book`
- Staff dashboard (save this URL, not linked publicly): `/staff/login` → `/staff`

## Booking rules

- Timezone: **Pacific/Auckland**
- Days: **Monday–Saturday** (Sunday closed)
- Slots: **Morning** and **Afternoon** (one booking per slot)
- Calendar colours: green (2 free), orange (1 free), red (full)

## Deploy to Vercel

1. Import the repository in Vercel.
2. Add all variables from `.env.example` to the Vercel project.
3. Run `npm run db:migrate` against production Neon (or use Neon SQL editor with `drizzle/0000_init.sql`).
4. Deploy.

## Hero artwork

The home page hero uses a placeholder gradient. To add final drone artwork, set in `app/globals.css`:

```css
:root {
  --hero-image-url: url("/hero-desktop.jpg");
}
```

Mobile crop uses `--hero-object-position-mobile` (default `85% center`) to frame the right side of the property.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run db:migrate` | Apply SQL migrations |
| `npm run db:generate` | Generate migrations from schema |
| `npm run db:push` | Push schema (dev only) |
