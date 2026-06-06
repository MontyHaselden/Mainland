export const BUSINESS_NAME = "Mainland Building Inspections";

export const BUSINESS_PHONE =
  process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "03 000 0000";

export const BUSINESS_EMAIL =
  process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "hello@mainlandinspections.co.nz";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mainlandinspections.co.nz";

/** Service-area map centred on Christchurch & Canterbury */
export const SERVICE_AREA_MAP_EMBED =
  process.env.NEXT_PUBLIC_SERVICE_AREA_MAP_EMBED ??
  "https://maps.google.com/maps?q=Christchurch,+Canterbury,+New+Zealand&z=9&output=embed";

export const SAMPLE_REPORT_PATH = "/sample-report";

export const INSPECTION_SERVICES = [
  "Pre-purchase building inspections",
  "Pre-sale building inspections",
  "Roof inspections",
  "Moisture testing",
  "Thermal imaging",
  "Drone roof inspections",
  "New build staging inspections",
] as const;
