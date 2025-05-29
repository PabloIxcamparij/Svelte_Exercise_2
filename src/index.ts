interface RegionType {
    id: number;
    nombre: string;
    lat: number;
    lon: number;
  }
  
  interface DiaClimaType {
    dia: string;
    clima: string;
    probabilidad: number;
    tempMax: number;
    tempMin: number;
  }
  
  type TitleType = string[]; 

  export type { RegionType, DiaClimaType, TitleType };