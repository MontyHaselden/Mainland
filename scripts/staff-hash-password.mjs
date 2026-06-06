import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password || password.length < 8) {
  console.error("Usage: npm run staff:hash -- <password>");
  console.error("Password must be at least 8 characters.");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
console.log("\nBcrypt hash (safe to store in the database or STAFF_PASSWORD_HASH):\n");
console.log(hash);
console.log("");
