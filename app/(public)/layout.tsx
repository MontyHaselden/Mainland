import { ServiceAreasLayoutGate } from "@/components/location/service-areas-layout-gate";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessSchema } from "@/lib/seo/schema";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <ServiceAreasLayoutGate />
      <SiteFooter />
    </>
  );
}
