<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import type { DiaClimaType } from "../index";

  export let pronostico: DiaClimaType[] = [];

  // Estado local para controlar cuántos días mostrar
  let diasVisibles = 1;

  // Reactividad nativa: `$:`
  // Cada vez que `pronostico` cambia, este bloque se ejecuta automáticamente.
  // Esto reinicia `diasVisibles` al valor inicial sin imperativos.
  $: if (pronostico) {
    diasVisibles = 1;
  }

  function colorFondo(clima: string) {
    if (clima === "Soleado") return "#ffe066";
    if (clima === "Lluvioso") return "#74c0fc";
    if (clima === "Nublado") return "#ced4da";
    if (clima === "Parcialmente Nublado") return "#d0ebff";
    if (clima === "Nevado") return "#f8f9fa";
    if (clima === "Neblina") return "#dee2e6";
    return "#ffffff";
  }

  function mostrarMas() {
    if (diasVisibles < pronostico.length) {
      diasVisibles += 1;
    }
  }

  
</script>

<div class="contenedor">
  {#each pronostico.slice(0, diasVisibles) as diaClima (diaClima.dia)}
    <div
      class="tarjeta"
      style="background-color: {colorFondo(diaClima.clima)}"
      in:fade={{ duration: 600 }}
      animate:flip
    >
      <h3>{diaClima.dia}</h3>
      <p><strong>{diaClima.clima}</strong></p>
      <p>{diaClima.tempMin}°C - {diaClima.tempMax}°C</p>
      <p>Probabilidad de lluvia: {diaClima.probabilidad}%</p>
    </div>
  {/each}

  {#if diasVisibles < pronostico.length}
    <button on:click={mostrarMas} class="btn"> Mostrar más </button>
  {/if}

    <!-- Transiciones y animaciones -->
    <!-- Se usan transiciones (`in:fade`) y animaciones (`animate:flip`) integradas sin librerías externas.
     // Esto mejora la experiencia visual con código mínimo. -->
</div>

<style>
  .contenedor {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .tarjeta {
    width: 600px;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: black;
    transition: transform 0.2s ease;
  }

  .tarjeta:hover {
    transform: scale(1.02);
  }

  .btn {
    padding: 0.5rem 1rem;
    background-color: #242424;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn:hover {
    background-color: #3a3a3a;
  }
</style>
