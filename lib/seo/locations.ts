import {
  defaultLocationH1,
  defaultLocationH2,
  excerptSeoBody,
  FEATURED_LOCATION_CONTENT,
  isFeaturedLocationSlug,
} from "./featured-locations";
import { LOCATION_POSTCODES } from "./location-postcodes";

export const LOCATION_SLUG_PREFIX = "building-inspections-";

export type LocationRegion = "christchurch" | "greater-canterbury";

export type Location = {
  slug: string;
  name: string;
  region: LocationRegion;
  postcodes: string[];
  h1: string;
  h2: string;
  featured?: boolean;
  intro: string;
  trustContext: string;
  seoBodyParagraphs?: string[];
  seoBodyCta?: string;
  nearbySlugs: string[];
};

function slug(name: string): string {
  return `${LOCATION_SLUG_PREFIX}${name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")}`;
}

const LOCATION_ENTRIES: Omit<Location, "postcodes" | "h1" | "h2">[] = [
  {
    slug: slug("christchurch"),
    name: "Christchurch",
    region: "christchurch",
    intro:
      "From the central city to outer suburbs, Christchurch properties span earthquake repairs, character villas, and modern infill. We provide builder-led inspections across the city so you understand condition before you buy, sell, or settle.",
    trustContext:
      "Christchurch buyers need inspectors who read repair history, cladding risk, and roof condition with real building experience — not generic checklists. Mainland delivers drone roof surveys, moisture testing, thermal imaging, and Spectora reports from a licensed builder with 25+ years on site.",
    nearbySlugs: [
      slug("christchurch-cbd"),
      slug("riccarton"),
      slug("hornby"),
      slug("halswell"),
      slug("papanui"),
      slug("merivale"),
    ],
  },
  {
    slug: slug("christchurch-cbd"),
    name: "Christchurch CBD",
    region: "christchurch",
    intro:
      "From compact city apartments to renovated townhouses and commercial-adjacent dwellings, Christchurch CBD properties often combine multiple building eras in a single footprint. We inspect with the detail your purchase or sale deserves — before you commit in a fast-moving central market.",
    trustContext:
      "CBD buyers and vendors need clarity on weathertightness, earthquake repair history, and body corporate maintenance. Our qualified builder brings 25+ years of hands-on experience to every central-city inspection, backed by drone roof access, moisture testing, thermal imaging, and a structured Spectora digital report.",
    nearbySlugs: [
      slug("addington"),
      slug("riccarton"),
      slug("st-albans"),
      slug("linwood"),
    ],
  },
  {
    slug: slug("riccarton"),
    name: "Riccarton",
    region: "christchurch",
    intro:
      "Riccarton blends established villas, mid-century homes, and infill townhouses near the university and Westfield. That mix means hidden maintenance patterns vary street by street — exactly where a thorough, builder-led inspection pays off.",
    trustContext:
      "Whether you are purchasing near Riccarton Road or preparing a pre-sale inspection closer to Ilam, we document roof condition, subfloor moisture, cladding risks, and interior defects with the precision serious buyers expect. Every Riccarton report is delivered through Spectora with clear photographs and prioritised findings.",
    nearbySlugs: [
      slug("christchurch"),
      slug("christchurch-cbd"),
      slug("ilam"),
      slug("bryndwr"),
    ],
  },
  {
    slug: slug("hornby"),
    name: "Hornby",
    region: "christchurch",
    intro:
      "Hornby and its surrounding streets include strong 1980s–2000s housing stock, newer infill, and properties near industrial edges where drainage and exterior durability matter. We help buyers and vendors understand condition without guesswork.",
    trustContext:
      "Our Hornby inspections combine traditional builder assessment with modern tools — moisture metres, thermal imaging for hidden damp, and drone roof surveys where safe access is limited. You receive a premium Spectora report and direct communication from a licensed builder with 25+ years on site.",
    nearbySlugs: [
      slug("halswell"),
      slug("templeton"),
      slug("sockburn"),
      slug("rolleston"),
    ],
  },
  {
    slug: slug("papanui"),
    name: "Papanui",
    region: "christchurch",
    intro:
      "Papanui sits in a well-established pocket of north Christchurch where bungalows, post-war homes, and renovated properties sit side by side. We tailor each inspection to the era and construction type of the home you are buying or selling.",
    trustContext:
      "North Christchurch buyers value independent, builder-qualified assessments — not tick-box reports. We inspect roofs, wet areas, subfloors, and exterior cladding thoroughly, then deliver a digital Spectora report you can share with your lawyer, lender, or agent with confidence.",
    nearbySlugs: [
      slug("st-albans"),
      slug("bishopdale"),
      slug("shirley"),
      slug("bryndwr"),
    ],
  },
  {
    slug: slug("merivale"),
    name: "Merivale",
    region: "christchurch",
    intro:
      "Merivale properties often feature character architecture, high-spec renovations, and mature landscaping that can mask exterior or drainage issues. Our inspections are calibrated for premium homes where detail and discretion matter.",
    trustContext:
      "We understand what Merivale purchasers expect: thorough documentation, clear prioritisation, and a professional report that reflects the standard of the property. Thermal imaging, moisture testing, drone roof checks, and 25+ years of builder experience come standard — not as upsells.",
    nearbySlugs: [
      slug("fendalton"),
      slug("st-albans"),
      slug("christchurch"),
      slug("papanui"),
    ],
  },
  {
    slug: slug("fendalton"),
    name: "Fendalton",
    region: "christchurch",
    intro:
      "Leafy Fendalton streets are known for substantial family homes, older timber framing, and ongoing renovation work. We assess both original fabric and recent alterations so you know what is sound and what needs attention.",
    trustContext:
      "Fendalton buyers routinely commission pre-purchase inspections before auction or deadline sale. Mainland delivers independent builder-led assessments with Spectora reporting, drone roof imagery where appropriate, and plain-language summaries that support confident negotiation.",
    nearbySlugs: [
      slug("merivale"),
      slug("ilam"),
      slug("burnside"),
      slug("papanui"),
    ],
  },
  {
    slug: slug("ilam"),
    name: "Ilam",
    region: "christchurch",
    intro:
      "Ilam combines university-adjacent rentals, family homes, and infill development. Properties here range from tidy 1960s brick to modern townhouses — each with different risk profiles worth documenting properly.",
    trustContext:
      "Landlords, first-home buyers, and owner-occupiers in Ilam rely on inspections that go beyond surface presentation. We check moisture-prone areas, roof lines, drainage, and interior wear, then produce a Spectora report designed for fast decision-making.",
    nearbySlugs: [
      slug("riccarton"),
      slug("bryndwr"),
      slug("fendalton"),
      slug("burnside"),
    ],
  },
  {
    slug: slug("avonhead"),
    name: "Avonhead",
    region: "christchurch",
    intro:
      "Avonhead’s 1970s–1990s subdivisions are popular with families, but uniform streetscapes can hide varying maintenance histories. We inspect the details that standard open homes do not reveal.",
    trustContext:
      "Our Avonhead service covers pre-purchase, pre-sale, and targeted moisture investigations. A licensed builder with 25+ years of experience leads every inspection, supported by thermal imaging and drone roof surveys, with findings delivered in a premium Spectora digital report.",
    nearbySlugs: [
      slug("riccarton"),
      slug("burnside"),
      slug("hornby"),
      slug("sockburn"),
    ],
  },
  {
    slug: slug("burnside"),
    name: "Burnside",
    region: "christchurch",
    intro:
      "Burnside is a sought-after school-zone suburb with a strong mix of renovated homes and original stock. We help buyers understand how prior upgrades were executed and what remains on the maintenance horizon.",
    trustContext:
      "Burnside purchasers expect clarity on structural observations, roof condition, and moisture risk. Mainland combines builder expertise with modern inspection technology and insured, professional service — including online booking and Spectora report delivery.",
    nearbySlugs: [
      slug("fendalton"),
      slug("papanui"),
      slug("bishopdale"),
      slug("avonhead"),
    ],
  },
  {
    slug: slug("st-albans"),
    name: "St Albans",
    region: "christchurch",
    intro:
      "St Albans character villas and cottages are full of charm — and often full of layered repairs, extensions, and earthquake remediation. We read those layers with a builder’s eye so nothing critical is missed.",
    trustContext:
      "St Albans is one of Christchurch’s most inspection-intensive suburbs for good reason. We document earthquake repair quality, roof and cladding condition, subfloor ventilation, and interior defects, delivering a Spectora report suitable for due diligence and negotiation.",
    nearbySlugs: [
      slug("merivale"),
      slug("papanui"),
      slug("christchurch-cbd"),
      slug("bishopdale"),
    ],
  },
  {
    slug: slug("cashmere"),
    name: "Cashmere",
    region: "christchurch",
    intro:
      "Cashmere’s hillside sections bring views, retaining walls, and drainage considerations that flat-land templates miss. We inspect with attention to slope stability cues, exterior exposure, and subfloor conditions.",
    trustContext:
      "Hillside homes in Cashmere benefit from drone roof inspection and thorough exterior assessment. Our qualified builder inspects with 25+ years of Canterbury experience, producing Spectora reports that prioritise structural observations and moisture risk clearly.",
    nearbySlugs: [
      slug("hoon-hay"),
      slug("spreydon"),
      slug("beckenham"),
      slug("halswell"),
    ],
  },
  {
    slug: slug("halswell"),
    name: "Halswell",
    region: "christchurch",
    intro:
      "Halswell spans established streets and newer development toward the Selwyn border. Buyers here need confidence in both older weatherboard stock and contemporary builds with different defect profiles.",
    trustContext:
      "We serve Halswell with full pre-purchase and pre-sale inspections, moisture testing, thermal imaging, and drone roof checks. Reports are prepared in Spectora and supported by a modern online booking system — professional, punctual, and independent.",
    nearbySlugs: [
      slug("hornby"),
      slug("templeton"),
      slug("rolleston"),
      slug("prebbleton"),
    ],
  },
  {
    slug: slug("wigram"),
    name: "Wigram",
    region: "christchurch",
    intro:
      "Wigram combines airbase-era housing with contemporary subdivisions and townhouses. Construction eras sit close together, making a builder-qualified inspection essential for informed purchasing.",
    trustContext:
      "Wigram buyers and vendors choose Mainland for thorough, technology-supported inspections and clear communication. Every report is prepared by a licensed builder with 25+ years of experience and delivered as a detailed Spectora digital document.",
    nearbySlugs: [
      slug("hornby"),
      slug("sockburn"),
      slug("halswell"),
      slug("addington"),
    ],
  },
  {
    slug: slug("addington"),
    name: "Addington",
    region: "christchurch",
    intro:
      "Addington’s inner-south location means a blend of worker cottages, renovated villas, and higher-density living near the stadium precinct. Proximity to amenity is excellent — but building condition still needs independent verification.",
    trustContext:
      "Addington inspections focus on weathertightness, moisture in older foundations, roof integrity, and the quality of recent renovations. We deliver premium Spectora reports with photographic evidence and builder-led commentary you can act on before settlement.",
    nearbySlugs: [
      slug("sydenham"),
      slug("christchurch-cbd"),
      slug("riccarton"),
      slug("spreydon"),
    ],
  },
  {
    slug: slug("sydenham"),
    name: "Sydenham",
    region: "christchurch",
    intro:
      "Sydenham’s character housing and light-industrial edges create a distinct inspection landscape. Older cottages and duplexes often carry maintenance histories that deserve careful documentation.",
    trustContext:
      "We help Sydenham buyers and vendors move with confidence through pre-purchase and pre-sale inspections led by a qualified builder. Moisture testing, thermal imaging, and drone roof surveys are integrated where they add value — not sold as unnecessary extras.",
    nearbySlugs: [
      slug("addington"),
      slug("spreydon"),
      slug("beckenham"),
      slug("woolston"),
    ],
  },
  {
    slug: slug("spreydon"),
    name: "Spreydon",
    region: "christchurch",
    intro:
      "Spreydon climbs toward the Port Hills with varied housing from post-war bungalows to hillside retrofits. Slope, drainage, and roof access can differ significantly even within the same street.",
    trustContext:
      "Mainland’s Spreydon inspections are designed for buyers who want substance over checklist reporting. A licensed builder with 25+ years of experience assesses interior, exterior, and structural observations, supported by Spectora delivery and optional drone roof imagery.",
    nearbySlugs: [
      slug("sydenham"),
      slug("cashmere"),
      slug("beckenham"),
      slug("hoon-hay"),
    ],
  },
  {
    slug: slug("beckenham"),
    name: "Beckenham",
    region: "christchurch",
    intro:
      "Beckenham’s bungalow-era streets are popular with families and investors alike. Consistent street appeal can mask roof, subfloor, and moisture issues that only a thorough inspection surfaces.",
    trustContext:
      "We inspect Beckenham properties with the same premium standard applied across Canterbury — builder-led, insured, technology-supported, and reported through Spectora. Ideal for pre-purchase due diligence and vendors preparing for market.",
    nearbySlugs: [
      slug("spreydon"),
      slug("cashmere"),
      slug("sydenham"),
      slug("opawa"),
    ],
  },
  {
    slug: slug("woolston"),
    name: "Woolston",
    region: "christchurch",
    intro:
      "Woolston sits near the Heathcote River with a mix of older housing, light industry, and revitalised pockets. Environmental moisture and exterior wear deserve particular attention here.",
    trustContext:
      "Our Woolston inspections emphasise moisture-prone areas, subfloor ventilation, roof condition, and cladding performance. Thermal imaging and moisture metres support the builder’s visual assessment, with findings compiled in a clear Spectora report.",
    nearbySlugs: [
      slug("sydenham"),
      slug("linwood"),
      slug("ferrymead"),
      slug("opawa"),
    ],
  },
  {
    slug: slug("ferrymead"),
    name: "Ferrymead",
    region: "christchurch",
    intro:
      "Ferrymead combines coastal influence, estuary proximity, and a range of housing from mid-century to modern. Salt air, wind exposure, and drainage are common themes we assess on site.",
    trustContext:
      "Ferrymead buyers benefit from drone roof inspection and detailed exterior review. Mainland’s qualified builder brings decades of Canterbury experience to every appointment, with Spectora reporting and straightforward online booking.",
    nearbySlugs: [
      slug("sumner"),
      slug("redcliffs"),
      slug("woolston"),
      slug("linwood"),
    ],
  },
  {
    slug: slug("sumner"),
    name: "Sumner",
    region: "christchurch",
    intro:
      "Sumner’s coastal setting makes exterior durability, roof fixings, and moisture management especially important. From beachside bungalows to elevated architectural homes, we inspect with coastal conditions in mind.",
    trustContext:
      "Sumner properties command premium prices — and premium inspections should match. We combine builder expertise, drone roof surveys, thermal imaging, and Spectora digital reports so coastal exposure and structural observations are documented properly.",
    nearbySlugs: [
      slug("redcliffs"),
      slug("ferrymead"),
      slug("lyttelton"),
      slug("woolston"),
    ],
  },
  {
    slug: slug("redcliffs"),
    name: "Redcliffs",
    region: "christchurch",
    intro:
      "Redcliffs hillside and coastal homes face unique exposure to wind, salt, and slope-related drainage. Standard inspection templates rarely capture the nuance these properties need.",
    trustContext:
      "We specialise in thorough, builder-led assessments for Redcliffs homes — including drone roof inspection where access is difficult. Every report is prepared by a licensed builder with 25+ years of experience and delivered through Spectora.",
    nearbySlugs: [
      slug("sumner"),
      slug("ferrymead"),
      slug("lyttelton"),
      slug("woolston"),
    ],
  },
  {
    slug: slug("new-brighton"),
    name: "New Brighton",
    region: "christchurch",
    intro:
      "New Brighton’s coastal rebuilds and older housing stock sit in an environment where exterior cladding, fixings, and ground moisture need careful review. We inspect with local conditions front of mind.",
    trustContext:
      "East Christchurch buyers in New Brighton choose Mainland for independent, builder-qualified inspections with modern technology and premium reporting. Moisture testing, thermal imaging, and Spectora delivery are standard inclusions.",
    nearbySlugs: [
      slug("shirley"),
      slug("linwood"),
      slug("woolston"),
      slug("pegasus"),
    ],
  },
  {
    slug: slug("shirley"),
    name: "Shirley",
    region: "christchurch",
    intro:
      "Shirley offers accessible family housing with a high proportion of 1960s–1980s builds. Uniform appearances can hide varying levels of maintenance — making independent inspection a smart step.",
    trustContext:
      "Our Shirley inspections document roof and gutter condition, subfloor moisture, interior defects, and exterior cladding risks. You work directly with a qualified builder and receive a Spectora report structured for lawyers, lenders, and trades.",
    nearbySlugs: [
      slug("new-brighton"),
      slug("bishopdale"),
      slug("papanui"),
      slug("kaiapoi"),
    ],
  },
  {
    slug: slug("linwood"),
    name: "Linwood",
    region: "christchurch",
    intro:
      "Linwood’s central-east position means a practical mix of housing types and price points. We deliver clear, builder-led inspections that help buyers and vendors understand true property condition.",
    trustContext:
      "Linwood purchasers need fast, reliable due diligence. Mainland provides insured, professional inspections with moisture testing, thermal imaging, drone roof access where appropriate, and Spectora reports — bookable online in minutes.",
    nearbySlugs: [
      slug("woolston"),
      slug("christchurch-cbd"),
      slug("addington"),
      slug("shirley"),
    ],
  },
  {
    slug: slug("opawa"),
    name: "Opawa",
    region: "christchurch",
    intro:
      "Opawa’s riverside character homes and leafy streets are highly desirable — and often come with age-related maintenance items that deserve expert assessment before purchase.",
    trustContext:
      "We inspect Opawa properties with attention to foundations, roof lines, wet areas, and earthquake-era repairs. A licensed builder with 25+ years of experience leads every visit, with findings delivered in a premium Spectora digital report.",
    nearbySlugs: [
      slug("beckenham"),
      slug("st-martins"),
      slug("woolston"),
      slug("cashmere"),
    ],
  },
  {
    slug: slug("st-martins"),
    name: "St Martins",
    region: "christchurch",
    intro:
      "St Martins is an established family suburb where well-presented homes can still conceal roof, gutter, and subfloor issues. We provide the depth of inspection serious purchasers expect.",
    trustContext:
      "St Martins buyers and vendors trust Mainland for independent builder assessments, modern inspection tools, and Spectora reporting. Pre-purchase, pre-sale, and targeted moisture inspections are available with online booking.",
    nearbySlugs: [
      slug("opawa"),
      slug("beckenham"),
      slug("cashmere"),
      slug("hoon-hay"),
    ],
  },
  {
    slug: slug("bishopdale"),
    name: "Bishopdale",
    region: "christchurch",
    intro:
      "Bishopdale’s north-west streets feature popular 1970s–1990s homes and steady infill. We help buyers compare properties on substance — not just presentation.",
    trustContext:
      "Bishopdale inspections include roof and exterior review, moisture-prone area testing, thermal imaging where useful, and a detailed Spectora report. Every inspection is carried out by a qualified builder with 25+ years of on-site experience.",
    nearbySlugs: [
      slug("papanui"),
      slug("burnside"),
      slug("bryndwr"),
      slug("shirley"),
    ],
  },
  {
    slug: slug("hoon-hay"),
    name: "Hoon Hay",
    region: "christchurch",
    intro:
      "Hoon Hay spans flat sections and gentle slopes toward the hills, with housing stock from multiple decades. Drainage, retaining, and roof condition are common focus areas during our inspections.",
    trustContext:
      "Mainland serves Hoon Hay with premium pre-purchase and pre-sale inspections, drone roof surveys, moisture testing, and Spectora digital reports. Clear communication and punctual appointments are part of every booking.",
    nearbySlugs: [
      slug("cashmere"),
      slug("spreydon"),
      slug("halswell"),
      slug("st-martins"),
    ],
  },
  {
    slug: slug("sockburn"),
    name: "Sockburn",
    region: "christchurch",
    intro:
      "Sockburn’s flat terrain and mixed housing near commercial zones mean drainage, exterior durability, and subfloor moisture are frequent inspection priorities. We document what matters for settlement decisions.",
    trustContext:
      "Sockburn buyers choose Mainland for builder-qualified inspections that combine traditional expertise with thermal imaging, moisture metres, and drone roof checks. Reports are delivered through Spectora with clear prioritisation of defects.",
    nearbySlugs: [
      slug("hornby"),
      slug("wigram"),
      slug("addington"),
      slug("riccarton"),
    ],
  },
  {
    slug: slug("bryndwr"),
    name: "Bryndwr",
    region: "christchurch",
    intro:
      "Bryndwr sits between central amenities and the university corridor, with a blend of owner-occupied homes and rental stock. Construction type and maintenance history can vary sharply between neighbours.",
    trustContext:
      "We provide Bryndwr with the same premium inspection standard used across Christchurch — licensed builder-led, insured, technology-supported, and reported via Spectora. Ideal for pre-purchase due diligence and pre-sale preparation.",
    nearbySlugs: [
      slug("riccarton"),
      slug("ilam"),
      slug("papanui"),
      slug("merivale"),
    ],
  },
  {
    slug: slug("rolleston"),
    name: "Rolleston",
    region: "greater-canterbury",
    intro:
      "Rolleston is one of Selwyn’s fastest-growing centres, where new builds sit alongside established 1990s–2000s homes. New construction defects and older maintenance needs require different inspection lenses — we apply both.",
    trustContext:
      "Selwyn purchasers in Rolleston rely on Mainland for staging inspections, pre-purchase reports, and thorough builder-led assessments. Drone roof inspection, moisture testing, thermal imaging, and Spectora reporting come together in a premium service designed for growing communities.",
    nearbySlugs: [
      slug("prebbleton"),
      slug("lincoln"),
      slug("templeton"),
      slug("hornby"),
    ],
  },
  {
    slug: slug("lincoln"),
    name: "Lincoln",
    region: "greater-canterbury",
    intro:
      "Lincoln combines a university town atmosphere with Selwyn residential growth. Properties range from mature lifestyle sections to modern townhouses — each warranting a tailored, builder-qualified inspection.",
    trustContext:
      "We inspect Lincoln homes with attention to drainage on larger sections, roof condition on both older and new stock, and moisture in wet areas. A licensed builder with 25+ years of experience prepares every Spectora report.",
    nearbySlugs: [
      slug("rolleston"),
      slug("prebbleton"),
      slug("leeston"),
      slug("halswell"),
    ],
  },
  {
    slug: slug("prebbleton"),
    name: "Prebbleton",
    region: "greater-canterbury",
    intro:
      "Prebbleton bridges Christchurch’s southern fringe and Selwyn’s residential expansion. Buyers here often weigh newer builds against established homes — our inspections clarify condition either way.",
    trustContext:
      "Prebbleton clients choose Mainland for independent, high-detail inspections with modern technology and premium Spectora reports. Online booking, clear communication, and builder-led site assessments set us apart from one-person operators.",
    nearbySlugs: [
      slug("rolleston"),
      slug("lincoln"),
      slug("templeton"),
      slug("halswell"),
    ],
  },
  {
    slug: slug("west-melton"),
    name: "West Melton",
    region: "greater-canterbury",
    intro:
      "West Melton’s rural-residential lifestyle blocks and newer subdivisions introduce considerations around outbuildings, drainage across larger sites, and wind exposure. We inspect with those factors in scope.",
    trustContext:
      "West Melton properties benefit from thorough exterior and roof assessment, including drone inspection where access is challenging. Mainland delivers builder-qualified Spectora reports backed by 25+ years of Canterbury building experience.",
    nearbySlugs: [
      slug("rolleston"),
      slug("templeton"),
      slug("prebbleton"),
      slug("hornby"),
    ],
  },
  {
    slug: slug("rangiora"),
    name: "Rangiora",
    region: "greater-canterbury",
    intro:
      "Rangiora is the commercial heart of Waimakariri District, with housing from heritage cottages to contemporary subdivisions. We help buyers and vendors across the town make informed decisions before settlement.",
    trustContext:
      "Rangiora inspections are led by a qualified builder with deep Canterbury experience — not a generalist inspector. Moisture testing, thermal imaging, drone roof surveys, and Spectora digital reports provide the depth North Canterbury purchasers expect.",
    nearbySlugs: [
      slug("kaiapoi"),
      slug("woodend"),
      slug("oxford"),
      slug("amberley"),
    ],
  },
  {
    slug: slug("kaiapoi"),
    name: "Kaiapoi",
    region: "greater-canterbury",
    intro:
      "Kaiapoi’s river-town character and post-quake rebuilds mean building age and repair quality can vary significantly across short distances. Independent inspection is essential for confident purchasing.",
    trustContext:
      "We serve Kaiapoi with premium pre-purchase and pre-sale building inspections, documenting roof, cladding, moisture, and structural observations through Spectora. Every appointment is carried out by a licensed builder with 25+ years of experience.",
    nearbySlugs: [
      slug("rangiora"),
      slug("woodend"),
      slug("pegasus"),
      slug("oxford"),
    ],
  },
  {
    slug: slug("woodend"),
    name: "Woodend",
    region: "greater-canterbury",
    intro:
      "Woodend and its coastal fringe combine Waimakariri living with exposure to wind and moisture. We assess exterior durability and roof condition with those environmental factors in mind.",
    trustContext:
      "Woodend buyers trust Mainland for thorough, technology-supported inspections and premium Spectora reporting. Drone roof checks and moisture testing integrate seamlessly into our builder-led process.",
    nearbySlugs: [
      slug("kaiapoi"),
      slug("pegasus"),
      slug("rangiora"),
      slug("new-brighton"),
    ],
  },
  {
    slug: slug("pegasus"),
    name: "Pegasus",
    region: "greater-canterbury",
    intro:
      "Pegasus is a planned coastal community where newer construction dominates. Even new homes benefit from independent staging and pre-purchase inspections to catch defects before they are buried in finishes.",
    trustContext:
      "We inspect Pegasus properties with a new-build-aware builder’s eye — drainage, cladding, roof flashings, and interior quality checks. Spectora reports, drone roof imagery, and online booking make the process straightforward for busy purchasers.",
    nearbySlugs: [
      slug("woodend"),
      slug("kaiapoi"),
      slug("rangiora"),
      slug("new-brighton"),
    ],
  },
  {
    slug: slug("amberley"),
    name: "Amberley",
    region: "greater-canterbury",
    intro:
      "Amberley serves Hurunui with a mix of town housing and lifestyle properties toward the coast. Larger sections and varied building types call for experienced, builder-led assessment.",
    trustContext:
      "North Canterbury clients in Amberley choose Mainland for insured, professional inspections with 25+ years of builder experience. Moisture testing, thermal imaging, drone roof surveys, and Spectora reports support confident property decisions.",
    nearbySlugs: [
      slug("rangiora"),
      slug("oxford"),
      slug("kaiapoi"),
      slug("woodend"),
    ],
  },
  {
    slug: slug("leeston"),
    name: "Leeston",
    region: "greater-canterbury",
    intro:
      "Leeston anchors the Ellesmere district with rural-residential properties, town housing, and lifestyle blocks. Inspection scope often extends beyond the main dwelling to sheds and site drainage.",
    trustContext:
      "We tailor Leeston inspections to the property type — from town bungalows to larger lifestyle sections. A qualified builder documents findings in Spectora with clear photographs and prioritised maintenance guidance.",
    nearbySlugs: [
      slug("lincoln"),
      slug("rolleston"),
      slug("prebbleton"),
      slug("darfield"),
    ],
  },
  {
    slug: slug("darfield"),
    name: "Darfield",
    region: "greater-canterbury",
    intro:
      "Darfield is a rural service town where housing ranges from classic villas to modern family homes on generous sections. We inspect with attention to site drainage and outbuilding condition where relevant.",
    trustContext:
      "Darfield purchasers rely on Mainland for independent builder assessments, not generic checklists. Drone roof inspection, moisture testing, and Spectora digital reports are available with straightforward online booking.",
    nearbySlugs: [
      slug("west-melton"),
      slug("rolleston"),
      slug("leeston"),
      slug("oxford"),
    ],
  },
  {
    slug: slug("oxford"),
    name: "Oxford",
    region: "greater-canterbury",
    intro:
      "Oxford sits beneath the foothills with a character all its own — older homes, lifestyle properties, and newer infill. Slope, drainage, and roof access can be more complex than flat Christchurch suburbs.",
    trustContext:
      "Our Oxford inspections combine builder expertise with drone roof surveys and moisture testing where conditions warrant. Every report is prepared by a licensed builder with 25+ years of experience and delivered through Spectora.",
    nearbySlugs: [
      slug("rangiora"),
      slug("kaiapoi"),
      slug("amberley"),
      slug("woodend"),
    ],
  },
  {
    slug: slug("akaroa"),
    name: "Akaroa",
    region: "greater-canterbury",
    intro:
      "Akaroa’s harbour setting and heritage architecture make it unlike mainland Christchurch stock. Coastal exposure, hillside sections, and unique building forms need an experienced builder’s assessment.",
    trustContext:
      "Banks Peninsula buyers in Akaroa choose Mainland for thorough, premium inspections with Spectora reporting and drone roof capability. We travel to peninsula appointments with the same professional standard as Christchurch suburbs.",
    nearbySlugs: [
      slug("lyttelton"),
      slug("sumner"),
      slug("redcliffs"),
      slug("christchurch-cbd"),
    ],
  },
  {
    slug: slug("lyttelton"),
    name: "Lyttelton",
    region: "greater-canterbury",
    intro:
      "Lyttelton’s port-hill harbour town combines steep sites, coastal weather, and a mix of renovated cottages and contemporary builds. Standard flat-land inspections do not translate directly here.",
    trustContext:
      "Lyttelton properties demand careful roof, cladding, and drainage assessment. Mainland provides builder-qualified inspections with thermal imaging, moisture testing, drone roof surveys, and detailed Spectora reports — insured and independently prepared.",
    nearbySlugs: [
      slug("redcliffs"),
      slug("sumner"),
      slug("christchurch"),
      slug("akaroa"),
    ],
  },
  {
    slug: slug("templeton"),
    name: "Templeton",
    region: "christchurch",
    intro:
      "Templeton’s rural-residential fringe mixes lifestyle sections, newer builds, and established family homes toward the airport corridor. House inspection reports here cover dwellings, drainage, and site conditions.",
    trustContext:
      "Templeton house inspection reports are prepared by experienced builders with deep Canterbury knowledge. Mainland delivers moisture testing, thermal imaging, drone roof checks, and Spectora reports with straightforward online booking.",
    nearbySlugs: [
      slug("hornby"),
      slug("halswell"),
      slug("rolleston"),
      slug("prebbleton"),
      slug("west-melton"),
    ],
  },
];

function resolveLocationFields(
  entry: Omit<Location, "postcodes" | "h1" | "h2">
): Pick<
  Location,
  | "h1"
  | "h2"
  | "featured"
  | "intro"
  | "trustContext"
  | "seoBodyParagraphs"
  | "seoBodyCta"
> {
  const featured = FEATURED_LOCATION_CONTENT[entry.slug];
  if (featured) {
    return {
      h1: featured.h1,
      h2: featured.h2,
      intro: excerptSeoBody(featured),
      trustContext: featured.seoBodyParagraphs[1] ?? "",
      seoBodyParagraphs: featured.seoBodyParagraphs,
      seoBodyCta: featured.seoBodyCta,
      featured: true,
    };
  }
  return {
    h1: defaultLocationH1(entry.name),
    h2: defaultLocationH2(entry.name),
    intro: entry.intro,
    trustContext: entry.trustContext,
  };
}

export const LOCATIONS: Location[] = LOCATION_ENTRIES.map((entry) => ({
  ...entry,
  ...resolveLocationFields(entry),
  postcodes: LOCATION_POSTCODES[entry.slug] ?? [],
}));

export function getFeaturedLocations(): Location[] {
  return LOCATIONS.filter((location) => location.featured);
}

export { isFeaturedLocationSlug };

export const REGION_LABELS: Record<LocationRegion, string> = {
  christchurch: "Christchurch",
  "greater-canterbury": "Greater Christchurch & Canterbury",
};
