import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LogoMark } from "@/components/brand/logo-mark";

export const metadata: Metadata = {
  title: "Brand assets",
  robots: { index: false, follow: false },
};

const PROFILE_ASSETS = [
  {
    file: "mainland-mark-google-business-profile-720.png",
    label: "Google Business Profile",
    size: "720 × 720",
    note: "Upload as your business logo or profile photo.",
  },
  {
    file: "mainland-mark-gmail-profile-512.png",
    label: "Gmail / Google account photo",
    size: "512 × 512",
    note: "Square profile image for Google and Workspace accounts.",
  },
  {
    file: "mainland-mark-email-avatar-256.png",
    label: "Email profile photo",
    size: "256 × 256",
    note: "Works well for Outlook, Apple Mail, and other providers.",
  },
  {
    file: "mainland-mark-email-signature-160.png",
    label: "Email signature",
    size: "160 × 160",
    note: "Small mark for inline signatures. See email-signature.html in the same folder.",
  },
] as const;

export default function BrandAssetsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface px-5 py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="text-sm font-medium text-muted hover:text-navy">
            ← Back to site
          </Link>
          <div className="mt-6 flex items-center gap-4">
            <LogoMark className="h-14 w-14" />
            <div>
              <h1 className="font-display text-3xl text-navy">Brand assets</h1>
              <p className="mt-1 text-sm text-muted">
                Logo files for Google, email profiles, and signatures.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-10 lg:px-8">
        <ul className="space-y-6">
          {PROFILE_ASSETS.map((asset) => (
            <li
              key={asset.file}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border bg-background">
                <Image
                  src={`/logo/profile/${asset.file}`}
                  alt={asset.label}
                  fill
                  className="object-contain p-2"
                  sizes="96px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-xl text-navy">{asset.label}</h2>
                <p className="text-sm text-muted">
                  {asset.size} PNG · {asset.note}
                </p>
                <a
                  href={`/logo/profile/${asset.file}`}
                  download
                  className="mt-3 inline-flex text-sm font-medium text-accent hover:text-navy"
                >
                  Download {asset.file}
                </a>
              </div>
            </li>
          ))}
        </ul>

        <section className="mt-10 rounded-2xl border border-border bg-surface p-5">
          <h2 className="font-display text-xl text-navy">Email signature</h2>
          <p className="mt-2 text-sm text-muted">
            Copy the HTML from{" "}
            <a
              href="/logo/profile/email-signature.html"
              className="text-accent hover:text-navy"
            >
              email-signature.html
            </a>{" "}
            into Gmail (Settings → Signature) or your email client. Update the
            site URL if you are testing locally.
          </p>
        </section>
      </main>
    </div>
  );
}
