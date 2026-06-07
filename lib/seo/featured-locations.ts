import { BUSINESS_NAME } from "./business";

export type FeaturedLocationContent = {
  h1: string;
  h2: string;
  seoBodyParagraphs: string[];
  seoBodyCta: string;
};

export const FEATURED_LOCATION_SLUGS = [
  "building-inspections-christchurch",
  "building-inspections-rolleston",
  "building-inspections-rangiora",
  "building-inspections-kaiapoi",
  "building-inspections-lincoln",
  "building-inspections-prebbleton",
  "building-inspections-west-melton",
  "building-inspections-pegasus",
  "building-inspections-woodend",
  "building-inspections-halswell",
  "building-inspections-hornby",
  "building-inspections-riccarton",
  "building-inspections-papanui",
  "building-inspections-burnside",
  "building-inspections-fendalton",
  "building-inspections-merivale",
  "building-inspections-new-brighton",
  "building-inspections-sumner",
  "building-inspections-lyttelton",
  "building-inspections-templeton",
] as const;

export function defaultLocationH1(name: string): string {
  return `${name} Building Inspections | ${BUSINESS_NAME}`;
}

export function defaultLocationH2(name: string): string {
  return `Professional building inspections in ${name}`;
}

export function featuredSeoBodyText(content: FeaturedLocationContent): string {
  return [...content.seoBodyParagraphs, content.seoBodyCta].join(" ");
}

export function excerptSeoBody(
  content: FeaturedLocationContent,
  maxLen = 155,
): string {
  const full = featuredSeoBodyText(content).replace(/\s+/g, " ");
  if (full.length <= maxLen) return full;
  const trimmed = full.slice(0, maxLen);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace)}…`;
}

export const FEATURED_LOCATION_CONTENT: Record<
  string,
  FeaturedLocationContent
> = {
  "building-inspections-christchurch": {
    h1: "Christchurch Building Inspections | Mainland Building Inspections",
    h2: "Christchurch Building Inspections by Licensed Building Professionals",
    seoBodyParagraphs: [
      "Christchurch's housing stock is remarkably diverse — character villas sit alongside earthquake-repaired homes, renovated cottages, and brand-new subdivisions, often within the same neighbourhood. Buyers must assess repair quality, weathertightness, and the integrity of additions that may span multiple building eras. Residential pre-purchase building inspections give you an independent view of roof condition, cladding performance, subfloor moisture, and structural observations before you commit in a competitive market.",
      "Mainland Building Inspections is led by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, backed by professional indemnity insurance. We use drone roof inspections, thermal imaging technology, and moisture meter testing to surface defects a standard open home cannot reveal. Building inspections are completed in accordance with NZS 4306 principles, with detailed photographic reports delivered through the Spectora interactive reporting system and fast report turnaround.",
    ],
    seoBodyCta:
      "Make a confident purchase decision — book your Christchurch building inspection online today.",
  },
  "building-inspections-rolleston": {
    h1: "Rolleston Building Inspections | Mainland Building Inspections",
    h2: "Pre-Purchase Building Inspections in Rolleston",
    seoBodyParagraphs: [
      "Rolleston has become one of Selwyn's fastest-growing centres, where new subdivisions and recently completed homes sit beside established 1990s housing. Fresh construction can conceal workmanship defects, poor drainage detailing, and early settlement movement that only a trained eye identifies before warranties expire. Without independent assessment, buyers risk inheriting settlement and drainage problems that are costly to remedy after purchase. Residential pre-purchase building inspections help buyers distinguish between a well-finished new build and one carrying hidden defects beneath quality presentation.",
      "Every Rolleston inspection is carried out by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, supported by professional indemnity insurance. Our process includes drone roof inspections, thermal imaging technology, and moisture meter testing, with building inspections completed in accordance with NZS 4306 principles. You receive detailed photographic reports through the Spectora interactive reporting system, with fast report turnaround so settlement timelines stay on track.",
    ],
    seoBodyCta:
      "Secure peace of mind on your Selwyn purchase — book your Rolleston building inspection online today.",
  },
  "building-inspections-rangiora": {
    h1: "Rangiora Building Inspections | Mainland Building Inspections",
    h2: "Rangiora House Inspection Reports Within 24 Hours",
    seoBodyParagraphs: [
      "Rangiora and its surrounds combine established family homes, town housing, and lifestyle blocks with sheds, workshops, and rural property features such as water supply systems and supplementary buildings. These varied property types carry different risk profiles — from subfloor moisture in older cottages to drainage and outbuilding condition on larger sections. Residential pre-purchase building inspections help Waimakariri buyers understand the full scope of what they are acquiring, not just the main dwelling.",
      "Mainland Building Inspections provides assessments led by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, backed by professional indemnity insurance. We deploy drone roof inspections, thermal imaging technology, and moisture meter testing on site, with building inspections completed in accordance with NZS 4306 principles. Detailed photographic reports are delivered through the Spectora interactive reporting system, with fast report turnaround to support your due diligence.",
    ],
    seoBodyCta:
      "Know exactly what you are buying in Rangiora — book your Rangiora building inspection online today.",
  },
  "building-inspections-kaiapoi": {
    h1: "Kaiapoi Building Inspections | Mainland Building Inspections",
    h2: "Professional Building Inspections in Kaiapoi",
    seoBodyParagraphs: [
      "Kaiapoi's river-town setting brings a distinct set of building risks — flood history, land movement, earthquake repairs, and foundation performance vary significantly across short distances. Older housing and post-quake rebuilds can present very different moisture profiles, subfloor conditions, and repair quality that are not apparent during a brief viewing. Professional assessment is essential before you commit. Residential pre-purchase building inspections give buyers the independent evidence needed to assess whether a property's foundations, cladding, and wet areas are performing as they should.",
      "Mainland Building Inspections is conducted by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, backed by professional indemnity insurance. We use drone roof inspections, thermal imaging technology, and moisture meter testing to identify damp and structural concerns early. Building inspections are completed in accordance with NZS 4306 principles, with detailed photographic reports via the Spectora interactive reporting system and fast report turnaround.",
    ],
    seoBodyCta:
      "Protect your Kaiapoi purchase with professional due diligence — book your Kaiapoi building inspection online today.",
  },
  "building-inspections-lincoln": {
    h1: "Lincoln Building Inspections | Mainland Building Inspections",
    h2: "Lincoln Building Inspection Services for Home Buyers",
    seoBodyParagraphs: [
      "Lincoln's rapid population growth has brought executive homes, investment properties, and modern developments alongside the town's established residential streets. High demand can pressure buyers to move quickly, yet properties ranging from renovated villas to new townhouses carry very different maintenance and construction profiles. A professional inspection prevents costly surprises after settlement. Residential pre-purchase building inspections help home buyers and investors compare options on substance before auction, deadline, or private sale.",
      "Mainland Building Inspections delivers assessments by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, supported by professional indemnity insurance. Our inspections include drone roof inspections, thermal imaging technology, and moisture meter testing, with building inspections completed in accordance with NZS 4306 principles. You receive detailed photographic reports through the Spectora interactive reporting system, with fast report turnaround to keep your purchase on track.",
    ],
    seoBodyCta:
      "Invest with confidence in Lincoln's growing market — book your Lincoln building inspection online today.",
  },
  "building-inspections-prebbleton": {
    h1: "Prebbleton Building Inspections | Mainland Building Inspections",
    h2: "Trusted Pre-Purchase Building Reports in Prebbleton",
    seoBodyParagraphs: [
      "Prebbleton has emerged as a sought-after pocket for modern family homes in high-quality subdivisions, attracting buyers focused on long-term property investment. Newer builds and recently renovated properties can look flawless at open home, yet cladding junctions, roof flashings, and drainage detailing still warrant independent verification. Undetected defects can erode the value of an otherwise sound long-term investment. Residential pre-purchase building inspections ensure your Prebbleton purchase is assessed on construction quality, not presentation alone.",
      "Mainland Building Inspections is led by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, backed by professional indemnity insurance. We apply drone roof inspections, thermal imaging technology, and moisture meter testing during every assessment, with building inspections completed in accordance with NZS 4306 principles. Detailed photographic reports are delivered through the Spectora interactive reporting system, with fast report turnaround for busy purchasers.",
    ],
    seoBodyCta:
      "Safeguard your long-term investment in Prebbleton — book your Prebbleton building inspection online today.",
  },
  "building-inspections-west-melton": {
    h1: "West Melton Building Inspections | Mainland Building Inspections",
    h2: "West Melton Building Inspections and Property Reports",
    seoBodyParagraphs: [
      "West Melton lifestyle properties often feature large sections, septic systems, water tanks, sheds, and outbuildings that standard urban inspection templates overlook. Rural-residential homes face wind exposure, site drainage challenges, and varied construction across the main dwelling and ancillary structures. Buyers who skip due diligence on ancillary systems often face unexpected costs after moving in. Residential pre-purchase building inspections give buyers a clear picture of dwelling condition, site performance, and supplementary building integrity before committing to a lifestyle purchase.",
      "Mainland Building Inspections provides thorough assessments by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, backed by professional indemnity insurance. We use drone roof inspections, thermal imaging technology, and moisture meter testing across the property, with building inspections completed in accordance with NZS 4306 principles. Detailed photographic reports are delivered through the Spectora interactive reporting system, with fast report turnaround.",
    ],
    seoBodyCta:
      "Understand your West Melton property in full — book your West Melton building inspection online today.",
  },
  "building-inspections-pegasus": {
    h1: "Pegasus Building Inspections | Mainland Building Inspections",
    h2: "Pegasus Property Inspections by Experienced Builders",
    seoBodyParagraphs: [
      "Pegasus is a planned coastal community where modern homes face salt exposure, wind-driven rain, and weather conditions that test cladding durability and roof fixings from day one. Even recently completed builds benefit from independent assessment — flashings, drainage, and exterior detailing defects are far easier to address before settlement than after. Coastal weather exposure can shorten the life of under-specified materials if not identified early. Residential pre-purchase building inspections help Pegasus buyers verify that coastal construction standards have been met.",
      "Mainland Building Inspections is carried out by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, backed by professional indemnity insurance. We use drone roof inspections, thermal imaging technology, and moisture meter testing to assess weather-exposed building elements, with building inspections completed in accordance with NZS 4306 principles. Detailed photographic reports are delivered through the Spectora interactive reporting system, with fast report turnaround.",
    ],
    seoBodyCta:
      "Buy your Pegasus coastal home with confidence — book your Pegasus building inspection online today.",
  },
  "building-inspections-woodend": {
    h1: "Woodend Building Inspections | Mainland Building Inspections",
    h2: "Woodend Building Inspection Specialists",
    seoBodyParagraphs: [
      "Woodend and its coastal fringe attract holiday homes, lifestyle properties, and permanent residences where moisture management is an ongoing concern. Proximity to the coast brings wind exposure, salt air influence, and humidity patterns that accelerate exterior wear and roof deterioration. Properties used intermittently as holiday homes can develop hidden moisture problems between occupancies. Residential pre-purchase building inspections help buyers assess cladding performance, subfloor ventilation, and wet-area condition with these environmental factors in mind.",
      "Mainland Building Inspections delivers assessments by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, backed by professional indemnity insurance. We use drone roof inspections, thermal imaging technology, and moisture meter testing to document coastal building risks, with building inspections completed in accordance with NZS 4306 principles. Detailed photographic reports are delivered through the Spectora interactive reporting system, with fast report turnaround.",
    ],
    seoBodyCta:
      "Make an informed Woodend purchase — book your Woodend building inspection online today.",
  },
  "building-inspections-halswell": {
    h1: "Halswell Building Inspections | Mainland Building Inspections",
    h2: "Halswell Pre-Purchase House Inspections",
    seoBodyParagraphs: [
      "Halswell is experiencing rapid development, with new subdivisions, retaining walls, and modern housing joining established streets toward the Selwyn border. Fresh earthworks and recent construction introduce drainage risks, foundation settlement, and exterior detailing defects that are not always visible once landscaping is complete. Retaining walls and cut-and-fill sites in particular require careful assessment before purchase. Residential pre-purchase building inspections help buyers evaluate both new and resale properties with a builder's understanding of local development patterns.",
      "Mainland Building Inspections is led by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, backed by professional indemnity insurance. We use drone roof inspections, thermal imaging technology, and moisture meter testing on every assessment, with building inspections completed in accordance with NZS 4306 principles. Detailed photographic reports are delivered through the Spectora interactive reporting system, with fast report turnaround.",
    ],
    seoBodyCta:
      "Buy with confidence in Halswell's growing suburbs — book your Halswell building inspection online today.",
  },
  "building-inspections-hornby": {
    h1: "Hornby Building Inspections | Mainland Building Inspections",
    h2: "Hornby Building Inspection Reports You Can Trust",
    seoBodyParagraphs: [
      "Hornby's property market includes investment properties, rental homes, and mixed-age housing stock where renovation quality varies considerably between neighbouring dwellings. Landlords and owner-occupiers alike need clarity on roof life, moisture in older foundations, and the standard of recent alterations before purchasing or refinancing. High tenant turnover can accelerate wear that is not always disclosed in a sales campaign. Residential pre-purchase building inspections provide the independent documentation investors and families rely on for confident decision-making.",
      "Mainland Building Inspections is conducted by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, backed by professional indemnity insurance. We use drone roof inspections, thermal imaging technology, and moisture meter testing to assess properties thoroughly, with building inspections completed in accordance with NZS 4306 principles. Detailed photographic reports are delivered through the Spectora interactive reporting system, with fast report turnaround.",
    ],
    seoBodyCta:
      "Trust the condition of your Hornby property — book your Hornby building inspection online today.",
  },
  "building-inspections-riccarton": {
    h1: "Riccarton Building Inspections | Mainland Building Inspections",
    h2: "Riccarton Property Inspections for Buyers and Investors",
    seoBodyParagraphs: [
      "Riccarton is a high-activity suburb where rental properties, student accommodation, and older homes with additions and alterations create complex maintenance histories. High tenant turnover and incremental renovations can mask roof defects, subfloor moisture, and structural modifications that affect long-term value. Investor purchasers in particular need reliable documentation to forecast maintenance and capital expenditure accurately. Residential pre-purchase building inspections help buyers and investors document condition before committing near the university corridor and central amenities.",
      "Mainland Building Inspections is led by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, backed by professional indemnity insurance. We use drone roof inspections, thermal imaging technology, and moisture meter testing to identify hidden defects, with building inspections completed in accordance with NZS 4306 principles. Detailed photographic reports are delivered through the Spectora interactive reporting system, with fast report turnaround.",
    ],
    seoBodyCta:
      "Invest wisely in Riccarton — book your Riccarton building inspection online today.",
  },
  "building-inspections-papanui": {
    h1: "Papanui Building Inspections | Mainland Building Inspections",
    h2: "Papanui Building Inspections and Moisture Checks",
    seoBodyParagraphs: [
      "Papanui's established family homes — bungalows, post-war dwellings, and renovated properties — often carry extensions, alterations, and weather-tightness risks accumulated over decades. Ongoing maintenance demands are easy to underestimate when street appeal is strong, yet roof condition, cladding junctions, and bathroom moisture can carry significant repair costs. Layered renovations over time can conceal incompatible materials and detailing failures. Residential pre-purchase building inspections give north Christchurch buyers the detail needed to plan ahead.",
      "Mainland Building Inspections is conducted by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, backed by professional indemnity insurance. We use drone roof inspections, thermal imaging technology, and moisture meter testing as standard, with building inspections completed in accordance with NZS 4306 principles. Detailed photographic reports are delivered through the Spectora interactive reporting system, with fast report turnaround.",
    ],
    seoBodyCta:
      "Understand your Papanui home before you buy — book your Papanui building inspection online today.",
  },
  "building-inspections-burnside": {
    h1: "Burnside Building Inspections | Mainland Building Inspections",
    h2: "Burnside Building Reports by Licensed Building Practitioners",
    seoBodyParagraphs: [
      "Burnside's established homes attract strong school-zone demand, making pre-purchase due diligence essential in a competitive market. Renovations and structural alterations are common, yet the quality of prior building work is rarely disclosed at open home. School-zone competition can tempt buyers to waive due diligence — a decision that often proves expensive. Residential pre-purchase building inspections help buyers assess roof life, moisture risk, and the integrity of modifications before bidding on sought-after family properties.",
      "Mainland Building Inspections is led by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, backed by professional indemnity insurance. We use drone roof inspections, thermal imaging technology, and moisture meter testing on every assessment, with building inspections completed in accordance with NZS 4306 principles. Detailed photographic reports are delivered through the Spectora interactive reporting system, with fast report turnaround.",
    ],
    seoBodyCta:
      "Bid with confidence in Burnside — book your Burnside building inspection online today.",
  },
  "building-inspections-fendalton": {
    h1: "Fendalton Building Inspections | Mainland Building Inspections",
    h2: "Fendalton Home Inspection Services",
    seoBodyParagraphs: [
      "Fendalton is home to premium properties and high-value real estate where the cost of undetected defects can be substantial. Substantial family homes, timber-framed villas, and architecturally renovated dwellings require detailed inspections that assess both original fabric and recent high-spec alterations. At this price point, even moderate defects can represent a significant financial exposure for purchasers and their lenders. Residential pre-purchase building inspections protect significant investments by documenting condition with the rigour serious purchasers expect.",
      "Mainland Building Inspections is conducted by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, backed by professional indemnity insurance. We use drone roof inspections, thermal imaging technology, and moisture meter testing to deliver thorough assessments, with building inspections completed in accordance with NZS 4306 principles. Detailed photographic reports are delivered through the Spectora interactive reporting system, with fast report turnaround.",
    ],
    seoBodyCta:
      "Protect your Fendalton investment — book your Fendalton building inspection online today.",
  },
  "building-inspections-merivale": {
    h1: "Merivale Building Inspections | Mainland Building Inspections",
    h2: "Merivale Property Inspection Experts",
    seoBodyParagraphs: [
      "Merivale's luxury homes, modern renovations, and investment properties are presented to a high standard — yet premium finishes can conceal roof defects, moisture ingress, and maintenance items that carry premium repair costs. Buyers in this market need discretion, thoroughness, and clear prioritisation from an inspector who understands high presentation expectations. A detailed inspection before purchase protects both lifestyle value and capital invested in the property. Residential pre-purchase building inspections provide the independent assessment Merivale purchasers require.",
      "Mainland Building Inspections is led by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, backed by professional indemnity insurance. We use drone roof inspections, thermal imaging technology, and moisture meter testing on every premium assessment, with building inspections completed in accordance with NZS 4306 principles. Detailed photographic reports are delivered through the Spectora interactive reporting system, with fast report turnaround.",
    ],
    seoBodyCta:
      "Buy your Merivale property with complete confidence — book your Merivale building inspection online today.",
  },
  "building-inspections-new-brighton": {
    h1: "New Brighton Building Inspections | Mainland Building Inspections",
    h2: "New Brighton Building Inspections and Roof Assessments",
    seoBodyParagraphs: [
      "New Brighton's coastal exposure subjects homes to salt air corrosion, wind-driven rain, and moisture risks that accelerate cladding fatigue and roof deterioration. Post-quake rebuilds and older housing stock sit side by side, each with different exterior performance profiles that demand location-aware assessment. Roof fixings and cladding joints are often the first elements to show coastal fatigue. Residential pre-purchase building inspections help east Christchurch buyers evaluate cladding performance, roof durability, and wet-area condition before settlement.",
      "Mainland Building Inspections is conducted by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, backed by professional indemnity insurance. We use drone roof inspections, thermal imaging technology, and moisture meter testing to document coastal building risks, with building inspections completed in accordance with NZS 4306 principles. Detailed photographic reports are delivered through the Spectora interactive reporting system, with fast report turnaround.",
    ],
    seoBodyCta:
      "Buy confidently on the New Brighton coast — book your New Brighton building inspection online today.",
  },
  "building-inspections-sumner": {
    h1: "Sumner Building Inspections | Mainland Building Inspections",
    h2: "Sumner Coastal Property Inspections",
    seoBodyParagraphs: [
      "Sumner coastal homes — from beachside bungalows to hillside architectural dwellings — face retaining walls, slope drainage, and persistent weather exposure that flat-land inspections rarely address adequately. Salt air, wind, and elevation combine to test roof fixings, cladding systems, and foundation performance over time. Hillside drainage and retaining structures require particular attention during due diligence. Residential pre-purchase building inspections help buyers understand the true maintenance horizon of coastal and hillside Sumner properties.",
      "Mainland Building Inspections is led by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, backed by professional indemnity insurance. We use drone roof inspections, thermal imaging technology, and moisture meter testing to assess exposed building elements, with building inspections completed in accordance with NZS 4306 principles. Detailed photographic reports are delivered through the Spectora interactive reporting system, with fast report turnaround.",
    ],
    seoBodyCta:
      "Secure your Sumner coastal purchase — book your Sumner building inspection online today.",
  },
  "building-inspections-lyttelton": {
    h1: "Lyttelton Building Inspections | Mainland Building Inspections",
    h2: "Lyttelton Building Inspections for Homes and Investment Properties",
    seoBodyParagraphs: [
      "Lyttelton's hillside homes, retaining walls, and older character properties present slope stability, drainage, and maintenance challenges unlike mainland Christchurch suburbs. Steep sites, coastal weather, and limited roof access demand an inspector who reads port-hill conditions with practical building experience. Character cottages and renovated port-hill dwellings often carry layered maintenance histories that are not obvious at open home. Residential pre-purchase building inspections help home buyers and investment property purchasers assess risk before committing to this unique harbour town market.",
      "Mainland Building Inspections is conducted by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, backed by professional indemnity insurance. We use drone roof inspections, thermal imaging technology, and moisture meter testing on challenging sites, with building inspections completed in accordance with NZS 4306 principles. Detailed photographic reports are delivered through the Spectora interactive reporting system, with fast report turnaround.",
    ],
    seoBodyCta:
      "Buy your Lyttelton property with professional due diligence — book your Lyttelton building inspection online today.",
  },
  "building-inspections-templeton": {
    h1: "Templeton Building Inspections | Mainland Building Inspections",
    h2: "Templeton House Inspection Reports by Experienced Builders",
    seoBodyParagraphs: [
      "Templeton's semi-rural living brings lifestyle sections, newer subdivisions, outbuildings, and property maintenance demands that suburban templates do not cover. Homes toward the airport corridor mix established family housing with recent development, where site drainage, exterior exposure, and ancillary structures all influence long-term ownership costs. Outbuildings and boundary fencing often carry maintenance obligations that affect total ownership cost. Residential pre-purchase building inspections give buyers a complete picture of dwelling and site condition before purchase.",
      "Mainland Building Inspections is led by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, backed by professional indemnity insurance. We use drone roof inspections, thermal imaging technology, and moisture meter testing across the property, with building inspections completed in accordance with NZS 4306 principles. Detailed photographic reports are delivered through the Spectora interactive reporting system, with fast report turnaround.",
    ],
    seoBodyCta:
      "Understand your Templeton property fully — book your Templeton building inspection online today.",
  },
};

export function isFeaturedLocationSlug(slug: string): boolean {
  return (FEATURED_LOCATION_SLUGS as readonly string[]).includes(slug);
}
