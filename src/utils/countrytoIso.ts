import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

countries.registerLocale(en);

export function countryToISO(country?: string | null): string | null {
  if (!country) return null;

  const iso = countries.getAlpha2Code(country.trim(), "en");
  return iso ?? null;
}
