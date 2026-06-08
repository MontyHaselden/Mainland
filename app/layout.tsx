import type { Metadata } from "next";
import { DM_Serif_Display, Source_Sans_3 } from "next/font/google";
import {
  BUSINESS_LOGO_PATH,
  BUSINESS_NAME,
  SITE_URL,
} from "@/lib/seo/business";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mainland Building Inspections",
    template: "%s | Mainland Building Inspections",
  },
  description:
    "Professional building and pre-purchase inspections across Canterbury and the South Island. Book morning or afternoon slots online.",
  icons: {
    icon: [{ url: BUSINESS_LOGO_PATH, sizes: "512x512", type: "image/png" }],
    apple: [{ url: BUSINESS_LOGO_PATH, sizes: "512x512", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_NZ",
    siteName: BUSINESS_NAME,
    images: [
      {
        url: BUSINESS_LOGO_PATH,
        width: 512,
        height: 512,
        alt: BUSINESS_NAME,
      },
    ],
  },
  twitter: {
    card: "summary",
    images: [BUSINESS_LOGO_PATH],
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-NZ"
      className={`${dmSerif.variable} ${sourceSans.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
