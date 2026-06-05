import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url().optional(),
  BREVO_API_KEY: z.string().optional(),
  BREVO_SENDER_EMAIL: z.string().email().optional(),
  BREVO_SENDER_NAME: z.string().optional(),
  STAFF_EMAIL: z.string().email().optional(),
  STAFF_PASSWORD: z.string().min(8).optional(),
  STAFF_SESSION_SECRET: z.string().min(32).optional(),
  BUSINESS_NOTIFICATION_EMAIL: z.string().email().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_BUSINESS_PHONE: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export function getEnv(): Env {
  return envSchema.parse(process.env);
}

export function requireEnv<K extends keyof Env>(key: K): NonNullable<Env[K]> {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value as NonNullable<Env[K]>;
}
