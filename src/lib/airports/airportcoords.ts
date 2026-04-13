export type AirPortCoords = {
  lat: number;
  lon: number;
  country: string;
  name?: string;
};

export const AIRPORTS: Record<string, AirPortCoords> = {
  // BULGARIA
  LBLS: {
    lat: 42.633488,
    lon: 23.646295,
    country: "Bulgaria",
    name: "Lesnovo",
  },

  // DENMARK
  EKBI: {
    lat: 55.740279,
    lon: 9.150559,
    country: "Denmark",
    name: "Billund",
  },
   EPGD: {
    lat: 54.376528,
    lon: 18.477127,
    country: "Poland",
    name: "Gdańsk",
  },

  EKCH: {
    lat: 55.617900848389,
    lon: 12.656000137329,
    country: "Denmark",
    name: "Copenhagen",
  },

  // ENGLAND
  EGNV: {
    lat: 54.51047,
    lon: -1.427104,
    country: "England",
    name: "Darlington",
  },

  // FINLAND
  EFTP: {
    lat: 61.414196,
    lon: 23.604377,
    country: "Finland",
    name: "Birkala",
  },

  EFHK: {
    lat: 60.316442,
    lon: 24.9448,
    country: "Finland",
    name: "Helsingfors",
  },

  EFMP: {
    lat: 68.6603012085,
    lon: 25.7028999329,
    country: "Finland",
    name: "Inari",
  },

  EFJP: {
    lat: 68.7114,
    lon: 25.7528,
    country: "Finland",
    name: "Jäkäläpää",
  },

  // ICELAND
  BIKF: {
    lat: 63.985099,
    lon: -22.633124,
    country: "Iceland",
    name: "Reykjavik",
  },

  // IRELAND
  EIDW: {
    lat: 53.426756,
    lon: -6.254579,
    country: "Ireland",
    name: "Dublin",
  },

  EINN: {
    lat: 52.701966,
    lon: -8.925054,
    country: "Ireland",
    name: "Limerick",
  },

  // ISRAEL
  LLBG: {
    lat: 32.006735,
    lon: 34.881193,
    country: "Israel",
    name: "Tel Aviv",
  },

  // JAPAN
  RJTT: {
    lat: 35.548064,
    lon: 139.777595,
    country: "Japan",
    name: "Tokyo",
  },

  // LATVIA
  EVRA: {
    lat: 56.921328,
    lon: 23.970873,
    country: "Latvia",
    name: "Riga",
  },

  // LITHUANIA
  EYVI: {
    lat: 54.637053,
    lon: 25.287853,
    country: "Lithuania",
    name: "Vilnius",
  },

  // MAPULACA
  MHLP: {
    lat: 14.034167289734,
    lon: -88.62833404541,
    country: "Mapulaca",
    name: "Honduras",
  },

  // NETHERLANDS
  EHAM: {
    lat: 52.304642,
    lon: 4.778401,
    country: "Netherlands",
    name: "Amsterdam",
  },

  EHEH: {
    lat: 51.453789,
    lon: 5.378562,
    country: "Netherlands",
    name: "Eindhoven",
  },

  // NORWAY
  ENBR: {
    lat: 60.294009,
    lon: 5.220485,
    country: "Norway",
    name: "Bergen",
  },

  ENBL: {
    lat: 61.392091,
    lon: 5.762737,
    country: "Norway",
    name: "Førde",
  },

  ENHD: {
    lat: 59.343927,
    lon: 5.211017,
    country: "Norway",
    name: "Haugesund",
  },

  ENCN: {
    lat: 58.203738,
    lon: 8.084568,
    country: "Norway",
    name: "Kristiansand",
  },

  ENML: {
    lat: 62.74471,
    lon: 7.261608,
    country: "Norway",
    name: "Molde",
  },

  ENOV: {
    lat: 62.179652,
    lon: 6.072509,
    country: "Norway",
    name: "Orsta-Volda",
  },

  ENGM: {
    lat: 60.197303,
    lon: 11.09708,
    country: "Norway",
    name: "Oslo",
  },

  ENSD: {
    lat: 61.830029,
    lon: 6.105118,
    country: "Norway",
    name: "Sandane",
  },

  ENTO: {
    lat: 59.183316,
    lon: 10.258658,
    country: "Norway",
    name: "Sandefjord",
  },

  ENSG: {
    lat: 61.156424,
    lon: 7.138488,
    country: "Norway",
    name: "Sogndal",
  },

  ENZV: {
    lat: 58.876797,
    lon: 5.637771,
    country: "Norway",
    name: "Stavanger",
  },

  ENSU: {
    lat: 62.656985,
    lon: 8.679868,
    country: "Norway",
    name: "Sunndal",
  },

  ENSR: {
    lat: 69.787113,
    lon: 20.95949,
    country: "Norway",
    name: "Sørkjosen",
  },

  ENTC: {
    lat: 69.682925,
    lon: 18.918375,
    country: "Norway",
    name: "Tromsø",
  },

  ENVA: {
    lat: 63.457611,
    lon: 10.919623,
    country: "Norway",
    name: "Trondheim",
  },

  ENBM: {
    lat: 60.638947,
    lon: 6.502822,
    country: "Norway",
    name: "Voss",
  },

  ENAL: {
    lat: 62.5625,
    lon: 6.119699954986572,
    country: "Norway",
    name: "Aalesund",
  },

  // POLAND
  EPCE: {
    lat: 54.4165,
    lon: 17.7657,
    country: "Poland",
    name: "Lebork",
  },

  // PRISTINA
  BKPR: {
    lat: 42.574073,
    lon: 21.035818,
    country: "Pristina",
    name: "Kosovo",
  },

  // QATAR
  OTHH: {
    lat: 25.273056,
    lon: 51.608056,
    country: "Qatar",
    name: "Doha",
  },

  // SPAIN
  LEAL: {
    lat: 38.28432,
    lon: -0.560521,
    country: "Spain",
    name: "Alicante",
  },

  LEBB: {
    lat: 43.301105,
    lon: -2.910609,
    country: "Spain",
    name: "Bilbao",
  },

  GCFV: {
    lat: 28.448793,
    lon: -13.863925,
    country: "Spain",
    name: "Puerto del Rosario",
  },

  // SWEDEN
  ESSA: {
    lat: 59.651901245117,
    lon: 17.918600082397,
    country: "Sweden",
    name: "Stockholm,",
  },

  // SWITZERLAND
  LSZH: {
    lat: 47.458153,
    lon: 8.547944,
    country: "Switzerland",
    name: "Zurich",
  },

  // TURKEY
  LTFM: {
    lat: 41.27948,
    lon: 28.727188,
    country: "Turkey",
    name: "Istanbul",
  },

  // UNITED KINGDOM
  EGGD: {
    lat: 51.382758,
    lon: -2.718607,
    country: "United Kingdom",
    name: "Bristol",
  },

  EGVN: {
    lat: 51.750717,
    lon: -1.579009,
    country: "United Kingdom",
    name: "Carterton",
  },

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

  // USA
  KCLT: {
    lat: 35.217143,
    lon: -80.938863,
    country: "USA",
    name: "Charlotte",
  },

  KDFW: {
    lat: 32.894291,
    lon: -97.038278,
    country: "USA",
    name: "Dallas",
  },

  KMIA: {
    lat: 25.786904,
    lon: -80.297804,
    country: "USA",
    name: "Miami",
  },

  KJFK: {
    lat: 40.63980103,
    lon: -73.77890015,
    country: "USA",
    name: "New York",
  },

  KRIC: {
    lat: 37.507186,
    lon: -77.327128,
    country: "USA",
    name: "Sandston",
  },
};
