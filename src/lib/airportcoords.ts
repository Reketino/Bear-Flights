export type AirPortCoords = {
  lat: number;
  lon: number;
  country: string;
  name?: string;
};

export const AIRPORTS: Record<string, AirPortCoords> = {
  // SCANDINAVIA
  ENAL: {
    lat: 62.5625,
    lon: 6.119699954986572,
    country: "Norway",
    name: "Aalesund",
  },
  ENOV: {
    lat: 62.179652,
    lon: 6.072509,
    country: "Norway",
    name: "Orsta-Volda",
  },

  ENSD: {
    lat: 61.830029,
    lon: 6.105118,
    country: "Norway",
    name: "Sandane",
  },
  ENBR: {
    lat: 60.294009,
    lon: 5.220485,
    country: "Norway",
    name: "Bergen",
  },
  ENHD: {
    lat: 59.343927,
    lon: 5.211017,
    country: "Norway",
    name: "Haugesund",
  },
  ENGM: {
    lat: 60.197303,
    lon: 11.09708,
    country: "Norway",
    name: "Oslo",
  },
  ENVA: {
    lat: 63.457611,
    lon: 10.919623,
    country: "Norway",
    name: "Trondheim",
  },

  ESSA: {
    lat: 59.651901245117,
    lon: 17.918600082397,
    country: "Sweden",
    name: "Stockholm,",
  },

  EKCH: {
    lat: 55.617900848389,
    lon: 12.656000137329,
    country: "Denmark",
    name: "Copenhagen",
  },

  // EUROPE
  EGKK: {
    lat: 51.148102,
    lon: -0.190278,
    country: "United Kingdom",
    name: "London",
  },
  EGGW: {
    lat: 51.873663,
    lon: -0.374588,
    country: "United Kingdom",
    name: "London",
  },
  EGCC: {
    lat: 53.350981,
    lon: -2.280403,
    country: "United Kingdom",
    name: "Manchester",
  },
  EGGD: {
    lat: 51.382758,
    lon: -2.718607,
    country: "United Kingdom",
    name: "Bristol",
  },

  EINN: {
    lat: 52.701966,
    lon: -8.925054,
    country: "Ireland",
    name: "Limerick",
  },

  EFHK: {
    lat: 60.316442,
    lon: 24.9448,
    country: "Finland",
    name: "Helsingfors",
  },

  EVRA: {
    lat: 56.921328,
    lon: 23.970873,
    country: "Latvia",
    name: "Riga",
  },

  BIKF: {
    lat: 63.985099,
    lon: -22.633124,
    country: "Iceland",
    name: "Reykjavik",
  },

  GCFV: {
    lat: 28.448793,
    lon: -13.863925,
    country: "Spain",
    name: "Puerto del Rosario",
  },

  // UNITED STATES OF AMERICA
  KJFK: {
    lat: 40.63980103,
    lon: -73.77890015,
    country: "USA",
    name: "New York",
  },

  KDFW: {
    lat: 32.894291,
    lon: -97.038278,
    country: "USA",
    name: "Dallas",
  },

  // MIDDLE EAST
  OTHH: {
    lat: 25.273056,
    lon: 51.608056,
    country: "Qatar",
    name: "Doha",
  },
};
