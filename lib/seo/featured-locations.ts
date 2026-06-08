export type FeaturedLocationContent = {
  h1: string;
  h2: string;
  introParagraph: string;
  metaDescription: string;
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

export function buildingInspectionsH1(name: string): string {
  return `Building Inspections ${name}`;
}

export function premiumSubheading(name: string): string {
  return `Premium pre-purchase and pre-sale building inspections in ${name}, backed by drone roof photography, moisture testing, thermal imaging observations and interactive digital reports.`;
}

export function standardIntroParagraph(
  name: string,
  widerArea: string,
): string {
  return `Mainland Building Inspections provides professional building inspections throughout ${name} and the wider ${widerArea} area. Whether you're buying, selling or investigating a property's condition, our inspections are designed to give you clear, practical insight before you commit.`;
}

export function defaultLocationH1(name: string): string {
  return buildingInspectionsH1(name);
}

export function defaultLocationH2(name: string): string {
  return premiumSubheading(name);
}

export function featuredSeoBodyText(content: FeaturedLocationContent): string {
  return [
    content.introParagraph,
    ...content.seoBodyParagraphs,
    content.seoBodyCta,
  ].join(" ");
}

function featured(
  name: string,
  widerArea: string,
  paragraphs: string[],
  metaHook: string,
): FeaturedLocationContent {
  return {
    h1: buildingInspectionsH1(name),
    h2: premiumSubheading(name),
    introParagraph: standardIntroParagraph(name, widerArea),
    metaDescription: `${metaHook} Licensed Building Practitioner with 25+ years experience. Drone roof, moisture testing, thermal imaging and Spectora reports in ${name}.`,
    seoBodyParagraphs: paragraphs,
    seoBodyCta: `Check availability and pricing for your ${name} building inspection — book online today.`,
  };
}

export const FEATURED_LOCATION_CONTENT: Record<
  string,
  FeaturedLocationContent
> = {
  "building-inspections-christchurch": featured(
    "Christchurch",
    "Christchurch",
    [
      "Christchurch's housing stock is remarkably diverse — character villas sit alongside earthquake-repaired homes, renovated cottages, and brand-new subdivisions, often within the same neighbourhood. Buyers must assess repair quality, weathertightness, and the integrity of additions that may span multiple building eras.",
      "Every Christchurch inspection is carried out by a Licensed Building Practitioner (LBP) with over 25 years of construction and building experience, supported by professional indemnity insurance. We use drone roof inspections, thermal imaging, and moisture meter testing, with detailed photographic reports delivered through the Spectora interactive reporting system.",
    ],
    "Pre-purchase and pre-sale building inspections across Christchurch.",
  ),
  "building-inspections-rolleston": featured(
    "Rolleston",
    "Selwyn",
    [
      "Rolleston has become one of Selwyn's fastest-growing centres, where new subdivisions and recently completed homes sit beside established 1990s housing. Fresh construction can conceal workmanship defects, poor drainage detailing, and early settlement movement that only a trained eye identifies before warranties expire.",
      "Every Rolleston inspection is carried out by a Licensed Building Practitioner (LBP) with over 25 years of experience. Our process includes drone roof inspections, thermal imaging, and moisture meter testing, with Spectora interactive reports and fast turnaround so settlement timelines stay on track.",
    ],
    "Builder-led pre-purchase inspections for Rolleston and Selwyn homes.",
  ),
  "building-inspections-rangiora": featured(
    "Rangiora",
    "Waimakariri",
    [
      "Rangiora and its surrounds combine established family homes, town housing, and lifestyle blocks with sheds, workshops, and rural property features. These varied property types carry different risk profiles — from subfloor moisture in older cottages to drainage and outbuilding condition on larger sections.",
      "Mainland Building Inspections provides assessments led by a Licensed Building Practitioner (LBP) with over 25 years of experience. We deploy drone roof inspections, thermal imaging, and moisture meter testing on site, with Spectora interactive reports and fast turnaround.",
    ],
    "Professional building inspections in Rangiora and North Canterbury.",
  ),
  "building-inspections-kaiapoi": featured(
    "Kaiapoi",
    "Waimakariri",
    [
      "Kaiapoi's river-town setting brings a distinct set of building risks — flood history, land movement, earthquake repairs, and foundation performance vary significantly across short distances. Older housing and post-quake rebuilds can present very different moisture profiles and subfloor conditions.",
      "Mainland Building Inspections is conducted by a Licensed Building Practitioner (LBP) with over 25 years of experience. We use drone roof inspections, thermal imaging, and moisture meter testing to identify damp and structural concerns early, with Spectora interactive reports.",
    ],
    "Independent building inspections for Kaiapoi buyers and vendors.",
  ),
  "building-inspections-lincoln": featured(
    "Lincoln",
    "Selwyn",
    [
      "Lincoln's rapid population growth has brought executive homes, investment properties, and modern developments alongside the town's established residential streets. High demand can pressure buyers to move quickly, yet properties ranging from renovated villas to new townhouses carry very different maintenance profiles.",
      "Mainland Building Inspections delivers assessments by a Licensed Building Practitioner (LBP) with over 25 years of experience. Our inspections include drone roof inspections, thermal imaging, and moisture meter testing, with Spectora interactive reports to keep your purchase on track.",
    ],
    "Pre-purchase building inspections in Lincoln and surrounding Selwyn.",
  ),
  "building-inspections-prebbleton": featured(
    "Prebbleton",
    "Selwyn",
    [
      "Prebbleton has emerged as a sought-after pocket for modern family homes in high-quality subdivisions, attracting buyers focused on long-term property investment. Newer builds and recently renovated properties can look flawless at open home, yet cladding junctions, roof flashings, and drainage detailing still warrant independent verification.",
      "Mainland Building Inspections is led by a Licensed Building Practitioner (LBP) with over 25 years of experience. We apply drone roof inspections, thermal imaging, and moisture meter testing during every assessment, with Spectora interactive reports and fast turnaround.",
    ],
    "Trusted pre-purchase inspections for Prebbleton homes.",
  ),
  "building-inspections-west-melton": featured(
    "West Melton",
    "Selwyn",
    [
      "West Melton lifestyle properties often feature large sections, septic systems, water tanks, sheds, and outbuildings that standard urban inspection templates overlook. Rural-residential homes face wind exposure, site drainage challenges, and varied construction across the main dwelling and ancillary structures.",
      "Mainland Building Inspections provides thorough assessments by a Licensed Building Practitioner (LBP) with over 25 years of experience. We use drone roof inspections, thermal imaging, and moisture meter testing across the property, with Spectora interactive reports.",
    ],
    "Lifestyle and rural-residential inspections in West Melton.",
  ),
  "building-inspections-pegasus": featured(
    "Pegasus",
    "Waimakariri",
    [
      "Pegasus is a planned coastal community where modern homes face salt exposure, wind-driven rain, and weather conditions that test cladding durability and roof fixings from day one. Even recently completed builds benefit from independent assessment — flashings, drainage, and exterior detailing defects are far easier to address before settlement.",
      "Mainland Building Inspections is carried out by a Licensed Building Practitioner (LBP) with over 25 years of experience. We use drone roof inspections, thermal imaging, and moisture meter testing to assess weather-exposed building elements, with Spectora interactive reports.",
    ],
    "Coastal property inspections in Pegasus and surrounds.",
  ),
  "building-inspections-woodend": featured(
    "Woodend",
    "Waimakariri",
    [
      "Woodend and its coastal fringe attract holiday homes, lifestyle properties, and permanent residences where moisture management is an ongoing concern. Proximity to the coast brings wind exposure, salt air influence, and humidity patterns that accelerate exterior wear and roof deterioration.",
      "Mainland Building Inspections delivers assessments by a Licensed Building Practitioner (LBP) with over 25 years of experience. We use drone roof inspections, thermal imaging, and moisture meter testing to document coastal building risks, with Spectora interactive reports.",
    ],
    "Building inspections for Woodend homes and coastal properties.",
  ),
  "building-inspections-halswell": featured(
    "Halswell",
    "Christchurch",
    [
      "Halswell is experiencing rapid development, with new subdivisions, retaining walls, and modern housing joining established streets toward the Selwyn border. Fresh earthworks and recent construction introduce drainage risks, foundation settlement, and exterior detailing defects that are not always visible once landscaping is complete.",
      "Mainland Building Inspections is led by a Licensed Building Practitioner (LBP) with over 25 years of experience. We use drone roof inspections, thermal imaging, and moisture meter testing on every assessment, with Spectora interactive reports and fast turnaround.",
    ],
    "Pre-purchase inspections in Halswell and south Christchurch.",
  ),
  "building-inspections-hornby": featured(
    "Hornby",
    "Christchurch",
    [
      "Hornby's property market includes investment properties, rental homes, and mixed-age housing stock where renovation quality varies considerably between neighbouring dwellings. Landlords and owner-occupiers alike need clarity on roof life, moisture in older foundations, and the standard of recent alterations before purchasing.",
      "Mainland Building Inspections is conducted by a Licensed Building Practitioner (LBP) with over 25 years of experience. We use drone roof inspections, thermal imaging, and moisture meter testing to assess properties thoroughly, with Spectora interactive reports.",
    ],
    "Reliable building inspection reports for Hornby properties.",
  ),
  "building-inspections-riccarton": featured(
    "Riccarton",
    "Christchurch",
    [
      "Riccarton is a high-activity suburb where rental properties, student accommodation, and older homes with additions and alterations create complex maintenance histories. High tenant turnover and incremental renovations can mask roof defects, subfloor moisture, and structural modifications that affect long-term value.",
      "Mainland Building Inspections is led by a Licensed Building Practitioner (LBP) with over 25 years of experience. We use drone roof inspections, thermal imaging, and moisture meter testing to identify hidden defects, with Spectora interactive reports and fast turnaround.",
    ],
    "Pre-purchase and pre-sale building inspections in Riccarton.",
  ),
  "building-inspections-papanui": featured(
    "Papanui",
    "Christchurch",
    [
      "Papanui's established family homes — bungalows, post-war dwellings, and renovated properties — often carry extensions, alterations, and weather-tightness risks accumulated over decades. Ongoing maintenance demands are easy to underestimate when street appeal is strong, yet roof condition, cladding junctions, and bathroom moisture can carry significant repair costs.",
      "Mainland Building Inspections is conducted by a Licensed Building Practitioner (LBP) with over 25 years of experience. We use drone roof inspections, thermal imaging, and moisture meter testing as standard, with Spectora interactive reports.",
    ],
    "North Christchurch building inspections in Papanui.",
  ),
  "building-inspections-burnside": featured(
    "Burnside",
    "Christchurch",
    [
      "Burnside's established homes attract strong school-zone demand, making pre-purchase due diligence essential in a competitive market. Renovations and structural alterations are common, yet the quality of prior building work is rarely disclosed at open home.",
      "Mainland Building Inspections is led by a Licensed Building Practitioner (LBP) with over 25 years of experience. We use drone roof inspections, thermal imaging, and moisture meter testing on every assessment, with Spectora interactive reports.",
    ],
    "School-zone property inspections in Burnside.",
  ),
  "building-inspections-fendalton": featured(
    "Fendalton",
    "Christchurch",
    [
      "Fendalton is home to premium properties and high-value real estate where the cost of undetected defects can be substantial. Substantial family homes, timber-framed villas, and architecturally renovated dwellings require detailed inspections that assess both original fabric and recent high-spec alterations.",
      "Mainland Building Inspections is conducted by a Licensed Building Practitioner (LBP) with over 25 years of experience. We use drone roof inspections, thermal imaging, and moisture meter testing to deliver thorough assessments, with Spectora interactive reports.",
    ],
    "Premium home inspections in Fendalton.",
  ),
  "building-inspections-merivale": featured(
    "Merivale",
    "Christchurch",
    [
      "Merivale's luxury homes, modern renovations, and investment properties are presented to a high standard — yet premium finishes can conceal roof defects, moisture ingress, and maintenance items that carry premium repair costs. Buyers in this market need discretion, thoroughness, and clear prioritisation.",
      "Mainland Building Inspections is led by a Licensed Building Practitioner (LBP) with over 25 years of experience. We use drone roof inspections, thermal imaging, and moisture meter testing on every premium assessment, with Spectora interactive reports.",
    ],
    "Luxury property inspections in Merivale.",
  ),
  "building-inspections-new-brighton": featured(
    "New Brighton",
    "Christchurch",
    [
      "New Brighton's coastal exposure subjects homes to salt air corrosion, wind-driven rain, and moisture risks that accelerate cladding fatigue and roof deterioration. Post-quake rebuilds and older housing stock sit side by side, each with different exterior performance profiles that demand location-aware assessment.",
      "Mainland Building Inspections is conducted by a Licensed Building Practitioner (LBP) with over 25 years of experience. We use drone roof inspections, thermal imaging, and moisture meter testing to document coastal building risks, with Spectora interactive reports.",
    ],
    "Coastal building inspections in New Brighton.",
  ),
  "building-inspections-sumner": featured(
    "Sumner",
    "Christchurch",
    [
      "Sumner coastal homes — from beachside bungalows to hillside architectural dwellings — face retaining walls, slope drainage, and persistent weather exposure that flat-land inspections rarely address adequately. Salt air, wind, and elevation combine to test roof fixings, cladding systems, and foundation performance over time.",
      "Mainland Building Inspections is led by a Licensed Building Practitioner (LBP) with over 25 years of experience. We use drone roof inspections, thermal imaging, and moisture meter testing to assess exposed building elements, with Spectora interactive reports.",
    ],
    "Coastal and hillside inspections in Sumner.",
  ),
  "building-inspections-lyttelton": featured(
    "Lyttelton",
    "Banks Peninsula",
    [
      "Lyttelton's hillside homes, retaining walls, and older character properties present slope stability, drainage, and maintenance challenges unlike mainland Christchurch suburbs. Steep sites, coastal weather, and limited roof access demand an inspector who reads port-hill conditions with practical building experience.",
      "Mainland Building Inspections is conducted by a Licensed Building Practitioner (LBP) with over 25 years of experience. We use drone roof inspections, thermal imaging, and moisture meter testing on challenging sites, with Spectora interactive reports.",
    ],
    "Port-hill building inspections in Lyttelton.",
  ),
  "building-inspections-templeton": featured(
    "Templeton",
    "Christchurch",
    [
      "Templeton's semi-rural living brings lifestyle sections, newer subdivisions, outbuildings, and property maintenance demands that suburban templates do not cover. Homes toward the airport corridor mix established family housing with recent development, where site drainage, exterior exposure, and ancillary structures all influence long-term ownership costs.",
      "Mainland Building Inspections is led by a Licensed Building Practitioner (LBP) with over 25 years of experience. We use drone roof inspections, thermal imaging, and moisture meter testing across the property, with Spectora interactive reports.",
    ],
    "Semi-rural building inspections in Templeton.",
  ),
};

export function isFeaturedLocationSlug(slug: string): boolean {
  return (FEATURED_LOCATION_SLUGS as readonly string[]).includes(slug);
}
