import {
  BUSINESS_EMAIL,
  BUSINESS_LOGO_PATH,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  INSPECTION_SERVICES,
  SITE_URL,
} from "./business";
import { LOCATIONS, type Location } from "./locations";
import {
  formatLocationPostcodes,
  getLocationTitle,
  locationPath,
} from "./location-helpers";

function placeAddress(location: Location, postalCode?: string) {
  return {
    "@type": "PostalAddress" as const,
    addressLocality: location.name,
    ...(postalCode ? { postalCode } : {}),
    addressRegion: "Canterbury",
    addressCountry: "NZ",
  };
}

function locationPlaces(location: Location) {
  if (location.postcodes.length === 0) {
    return [
      {
        "@type": "Place" as const,
        name: location.name,
        address: placeAddress(location),
      },
    ];
  }

  return location.postcodes.map((postalCode) => ({
    "@type": "Place" as const,
    name: location.name,
    address: placeAddress(location, postalCode),
  }));
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BUSINESS_NAME,
    url: SITE_URL,
    publisher: {
      "@type": "Organization",
      name: BUSINESS_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}${BUSINESS_LOGO_PATH}`,
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: BUSINESS_NAME,
    url: SITE_URL,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    image: `${SITE_URL}${BUSINESS_LOGO_PATH}`,
    logo: `${SITE_URL}${BUSINESS_LOGO_PATH}`,
    description:
      "Premium building inspections across Christchurch and Canterbury. Drone roof inspections, moisture testing, thermal imaging, and Spectora digital reports by a licensed builder with 25+ years experience.",
    areaServed: LOCATIONS.flatMap((location) => locationPlaces(location)),
    serviceType: [...INSPECTION_SERVICES],
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "17:00",
      },
    ],
  };
}

export function locationPageSchema(location: Location) {
  const pageUrl = `${SITE_URL}${locationPath(location.slug)}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: getLocationTitle(location),
      description: location.intro,
      url: pageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: BUSINESS_NAME,
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: getLocationTitle(location),
      provider: {
        "@type": "HomeAndConstructionBusiness",
        name: BUSINESS_NAME,
        telephone: BUSINESS_PHONE,
        url: SITE_URL,
      },
      areaServed: locationPlaces(location),
      serviceType: "Building inspection",
      url: pageUrl,
    },
  ];
}

export function locationFaqSchema(location: Location) {
  const name = location.name;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Do you offer pre-purchase building inspections in ${name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Mainland Building Inspections provides comprehensive pre-purchase building inspections throughout ${name}, including roof assessment, moisture testing, thermal imaging where appropriate, and a detailed Spectora digital report.`,
        },
      },
      {
        "@type": "Question",
        name: "Can you inspect the roof with a drone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Where safe and appropriate, we use drone roof inspection to document areas that are difficult to access from ground level. This is included as part of our premium inspection service in ${name}.`,
        },
      },
      {
        "@type": "Question",
        name: "Do you check moisture-prone areas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Moisture testing is a core part of our inspections. We use moisture metres and thermal imaging to identify damp areas in bathrooms, kitchens, subfloors, and cladding systems.`,
        },
      },
      {
        "@type": "Question",
        name: "How quickly will I receive my report?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Reports are delivered digitally through Spectora, typically within 24 hours of the inspection. A verbal overview can be arranged on the day where required.",
        },
      },
      {
        "@type": "Question",
        name: "Can I book online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can book a morning or afternoon inspection slot online through our booking calendar. Confirmation is sent by email once your appointment is secured.",
        },
      },
      {
        "@type": "Question",
        name: "Do you service nearby suburbs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. We cover ${name} and surrounding suburbs and towns across Christchurch and Canterbury. Nearby areas are listed on this page, and you can view our full service area map online.`,
        },
      },
      ...(location.postcodes.length > 0
        ? [
            {
              "@type": "Question",
              name: `What postcodes do you cover in ${name}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `Mainland Building Inspections services ${name} and postcodes ${formatLocationPostcodes(location)} for pre-purchase building inspections, roof inspections, moisture testing, and Spectora digital reports.`,
              },
            },
          ]
        : []),
    ],
  };
}
