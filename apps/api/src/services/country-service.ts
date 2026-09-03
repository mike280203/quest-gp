import { findCountries } from "../repositories/country-repository";

export async function listCountries() {
  const countries = await findCountries();

  return countries.map((country) => country.country);
}
