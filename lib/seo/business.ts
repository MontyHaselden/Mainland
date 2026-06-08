export const BUSINESS_NAME = "Mainland Building Inspections";

export const BUSINESS_PHONE =
  process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "03 000 0000";

export const BUSINESS_EMAIL =
  process.env.NEXT_PUBLIC_BUSINESS_EMAIL ??
  "hello@mainlandbuildinginspections.co.nz";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://www.mainlandbuildinginspections.co.nz";

/** Square logo for favicon, schema.org, and Google */
export const BUSINESS_LOGO_PATH = "/logo/profile/mainland-mark-gmail-profile-512.png";

/** Service-area map centred on Christchurch & Canterbury */
export const SERVICE_AREA_MAP_EMBED =
  process.env.NEXT_PUBLIC_SERVICE_AREA_MAP_EMBED ??
  "https://maps.google.com/maps?q=Christchurch,+Canterbury,+New+Zealand&z=9&output=embed";

export const SAMPLE_REPORT_PATH = "/sample-report";

export const GOOGLE_BUSINESS_PROFILE_URL =
  "https://share.google/8xIwFcTFL6WTnrs9s";

export const GOOGLE_REVIEWS_URL =
  "https://share.google/PhiiX6nztAHe49HZM";

export const INSPECTION_FROM_PRICE = 499;

export const INSPECTION_SERVICES = [
  "Pre-purchase building inspections",
  "Pre-sale building inspections",
  "Roof inspections",
  "Moisture testing",
  "Thermal imaging",
  "Drone roof inspections",
  "New build staging inspections",
] as const;
