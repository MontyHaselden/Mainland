import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const [, , emailArg, passwordArg, nameArg] = process.argv;
const email = emailArg?.trim().toLowerCase();
const password = passwordArg;
const name = nameArg?.trim() || null;
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("Missing DATABASE_URL. Add it to .env.local first.");
  process.exit(1);
}

if (!email || !password) {
  console.error("Usage: npm run staff:add -- <email> <password> [name]");
  process.exit(1);
}

if (password.length < 8) {
  console.error("Password must be at least 8 characters.");
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
