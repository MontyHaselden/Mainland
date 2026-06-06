import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { staffUsers } from "@/lib/db/schema";
import { createStaffSession, getStaffSession } from "./session";

async function validateDatabaseStaff(
  email: string,
  password: string
): Promise<boolean> {
  if (!process.env.DATABASE_URL) {
    return false;
  }

  try {
    const db = getDb();
    const [user] = await db
      .select()
      .from(staffUsers)
      .where(eq(staffUsers.email, email.toLowerCase()))
      .limit(1);

    if (!user) {
      return false;
    }

    return bcrypt.compare(password, user.passwordHash);
  } catch {
    return false;
  }
}

async function validateEnvStaff(
  email: string,
  password: string
): Promise<boolean> {
  const staffEmail = process.env.STAFF_EMAIL;
  const staffPassword = process.env.STAFF_PASSWORD;
  const passwordHash = process.env.STAFF_PASSWORD_HASH;

  if (!staffEmail || email.toLowerCase() !== staffEmail.toLowerCase()) {
    return false;
  }

  if (passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  if (staffPassword) {
    return password === staffPassword;
  }

  return false;
}

export async function validateStaffCredentials(
  email: string,
  password: string
): Promise<boolean> {
  if (await validateDatabaseStaff(email, password)) {
    return true;
  }

  return validateEnvStaff(email, password);
}

export async function loginStaff(email: string, password: string) {
  const valid = await validateStaffCredentials(email, password);
  if (!valid) return null;
  return createStaffSession(email);
}

export async function requireStaffSession() {
  const session = await getStaffSession();
  if (!session) {
    return null;
  }
  return session;
}
