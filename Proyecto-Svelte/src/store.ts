
// Stores para estado global reactivo

// `writable()` crea una unidad de estado global reactiva que puede compartirse en toda la app.
// Se usa para manejar selección de región, título, pronóstico, loading, etc.

import { writable, type Writable } from "svelte/store";
import type { RegionType, DiaClimaType, TitleType } from "./index";

export const regiones: RegionType[] = [
  { id: 1, nombre: "Buenos Aires", lat: -34.61, lon: -58.38 },
  { id: 2, nombre: "Madrid", lat: 40.41, lon: -3.7 },
  { id: 3, nombre: "Liberia (Costa Rica)", lat: 10.6333, lon: -85.4333 },
  { id: 4, nombre: "Tilarán (Costa Rica)", lat: 10.4667, lon: -84.9667 },
  { id: 5, nombre: "Momostenango (Guatemala)", lat: 15.0036, lon: -91.3633 },
];

export const regionSeleccionada: Writable<RegionType> = writable(regiones[0]);
export const pronostico: Writable<DiaClimaType[]> = writable([]);
export const title: Writable<TitleType> = writable([]);
export const cargando: Writable<boolean> = writable(false);
export const key: Writable<number> = writable(0);
