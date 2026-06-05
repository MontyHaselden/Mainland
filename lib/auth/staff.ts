import bcrypt from "bcryptjs";
import { createStaffSession, getStaffSession } from "./session";

export async function validateStaffCredentials(
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
