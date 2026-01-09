export type AirPortCoords = {
  lat: number;
  lon: number;
  country: string;
  name?: string;
};

export const AirPort_COORDS: Record<string, AirPortCoords> = {
  ENAL: { 
    lat: 62.5625, 
    lon: 6.119699954986572,
    country: "Norway",
    name: "Aalesund",  
  },
  ENGM: { 
    lat: 60.121, 
    lon: 11.0502,
    country: "Norway",
    name: "Oslo", 
  }, 
  ESSA: { 
    lat: 59.651901245117, 
    lon: 17.918600082397,
    country: "Sweden",
    name: "Stockholm," 
  },  
  KJFK: { 
    lat: 40.63980103, 
    lon: -73.77890015,
    country: "USA",
    name: "New York", 
  }, 
  OTHH: { 
    lat: 25.273056, 
    lon: 51.608056,
    country: "Qatar",
    name: "Doha",

  }, 
  EKCH: { 
    lat: 55.617900848389, 
    lon: 12.656000137329,
    country: "Denmark",
    name: "Copenhagen",
  }, 
  EGKK: { 
    lat: 51.148102, 
    lon: -0.190278,
    country: "United Kingdom",
    name: "London", 
  }, 
};
