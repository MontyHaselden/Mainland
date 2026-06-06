import { formatLocationPostcodes } from "@/lib/seo/location-helpers";
import type { Location } from "@/lib/seo/locations";

type LocationPostcodesSeoProps = {
  location: Location;
};

export function LocationPostcodesSeo({ location }: LocationPostcodesSeoProps) {
  if (location.postcodes.length === 0) return null;

  const formatted = formatLocationPostcodes(location);

  return (
    <p>
      Building inspections in {location.name}, Canterbury — postcodes {formatted}.
      Pre-purchase inspections, roof inspections, moisture testing, thermal
      imaging, drone inspections, and Spectora digital reports.
    </p>
  );
}
