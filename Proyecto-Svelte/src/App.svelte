<script lang="ts">
  import Wether from "./lib/Wether.svelte";
  import Title from "./lib/Title.svelte";
  import { regiones, regionSeleccionada, pronostico, title, cargando, key } from "./store";
  import type { RegionType } from "./index";


  // Reactividad nativa y declarativa
  // La declaración `$:` ejecuta el bloque automáticamente cuando `regionSeleccionada` cambia.
  // No hay necesidad de useEffect ni de suscripciones manuales como en React.

  $: regionSeleccionada.subscribe((region) => {
    if (region) {
      obtenerClima(region);
      //Cargar el nombre de la region en el titulo, separando cada palabra en un array
      title.set([...region.nombre.split(" ")]);
      key.update(k => k + 1);
    }
  });
  
  //Hacer uso del api
  async function obtenerClima(region: RegionType) {
    cargando.set(true);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${region.lat}&longitude=${region.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
    const res = await fetch(url);
    const data = await res.json();

    const dias = ["Hoy", "Mañana", "Pasado Mañana"];
    pronostico.set(
      dias.map((dia, i) => ({
        dia,
        clima: interpretarClima(data.daily.weathercode[i]),
        probabilidad: data.daily.precipitation_probability_max[i],
        tempMax: data.daily.temperature_2m_max[i],
        tempMin: data.daily.temperature_2m_min[i],
      }))
    );

    cargando.set(false);
  }

  //Interpretar el clima
  function interpretarClima(code: number): string {
    if ([0].includes(code)) return "Soleado";
    if ([1, 2].includes(code)) return "Parcialmente Nublado";
    if ([3].includes(code)) return "Nublado";
    if ([45, 48].includes(code)) return "Neblina";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "Lluvioso";
    if ([71, 73, 75, 85, 86].includes(code)) return "Nevado";
    return "Desconocido";
  }
</script>

<div class="flex flex-col items-center justify-center max-w-full gap-10 mb-5">
  {#key $key}
    <Title title={$title} />
  {/key}

  <!-- Binding bidireccional -->
  <!-- `bind:value` permite que el valor seleccionado se sincronice automáticamente con el store `regionSeleccionada`.
  <select bind:value={$regionSeleccionada}> -->
  
  <select
    class="border-2 border-gray-300 rounded-md p-2 w-[500px] bg-[#242424]"
    bind:value={$regionSeleccionada}
  >
    {#each regiones as region}
      <option value={region}>{region.nombre}</option>
    {/each}
  </select>
</div>

<!--
  Demostracion del uso de un store
  `$pronostico` accede directamente al valor actual del store `pronostico`, gracias a la reactividad nativa de Svelte.

  Si se pasara `pronostico` (sin $), estaríamos pasando el objeto `Writable`, no su contenido.

  Esto es parte del sistema de reactividad declarativa de Svelte, donde el símbolo `$` se usa para leer automáticamente el valor
  actual de un store sin necesidad de suscribirse manualmente.
-->

<Wether pronostico={$pronostico} />