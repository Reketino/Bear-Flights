import ReactCountryFlag from "react-country-flag";
import { countryToISO } from "@/utils/countrytoIso";

type OriginFlagProps = {
  country?: string | null;
};

export default function OriginFlag({ country }: OriginFlagProps) {
  const iso = countryToISO(country);

  if (!iso) return null;

  return (
    <ReactCountryFlag
      svg
      countryCode={iso}
      className="rounded-sm shadow-sm"
      style={{
        width: "1.5em",
        height: "1.5em",
      }}
    />
  );
}
