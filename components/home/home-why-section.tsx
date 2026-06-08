const FEATURES = [
  {
    title: "Drone Roof Inspections",
    body: "Aerial surveys document roof areas that are difficult to access from ground level.",
  },
  {
    title: "Thermal Imaging",
    body: "Infrared scanning highlights hidden moisture patterns and insulation gaps.",
  },
  {
    title: "Moisture Detection Equipment",
    body: "Moisture metres and targeted testing in bathrooms, kitchens, and subfloors.",
  },
  {
    title: "Interactive Digital Reports",
    body: "Spectora interactive reports you can share with your lawyer, lender, or agent.",
  },
  {
    title: "Detailed Photographic Reporting",
    body: "Annotated photographs document defects with clear prioritisation.",
  },
  {
    title: "Professional Indemnity Insurance",
    body: "Fully insured professional inspection service for your peace of mind.",
  },
  {
    title: "Fast Turnaround Times",
    body: "Detailed reports delivered digitally, typically within 24 hours of inspection.",
  },
];

export function HomeWhySection() {
  return (
    <section className="bg-background" aria-labelledby="home-why-heading">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Licensed Building Practitioner
            </p>
            <h2
              id="home-why-heading"
              className="font-display mt-3 text-3xl text-navy sm:text-4xl"
            >
              Why Choose Mainland Building Inspections?
            </h2>
            <p className="mt-5 text-lg text-muted">
              Mainland Building Inspections provides professional pre-purchase
              building inspections, pre-sale inspections, moisture investigations
              and property condition reports throughout Christchurch and
              Canterbury.
            </p>
            <p className="mt-4 text-muted">
              Led by an experienced Licensed Building Practitioner (LBP), we
              combine more than 25 years of practical construction experience with
              extensive knowledge of building compliance, property maintenance and
              residential construction.
            </p>
            <p className="mt-4 text-muted">
              We use modern inspection technology including:
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <h3 className="font-display text-lg text-navy">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
