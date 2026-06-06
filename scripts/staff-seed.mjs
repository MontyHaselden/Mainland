import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const databaseUrl = process.env.DATABASE_URL;
const email = process.env.STAFF_EMAIL?.trim().toLowerCase();
const password = process.env.STAFF_PASSWORD;
const name = process.env.STAFF_NAME?.trim() || null;

if (!databaseUrl) {
  console.error("Missing DATABASE_URL. Add it to .env.local first.");
  process.exit(1);
}

if (!email || !password) {
  console.error("Missing STAFF_EMAIL or STAFF_PASSWORD in .env.local.");
  process.exit(1);
}

if (password.length < 8) {
  console.error("STAFF_PASSWORD must be at least 8 characters.");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
const sql = neon(databaseUrl);

await sql`
  INSERT INTO staff_users (email, password_hash, name)
  VALUES (${email}, ${hash}, ${name})
  ON CONFLICT (email)
  DO UPDATE SET
    password_hash = EXCLUDED.password_hash,
    name = EXCLUDED.name
`;

console.log(`Staff account saved for ${email}`);
