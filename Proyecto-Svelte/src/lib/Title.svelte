<script lang="ts">
    import type { TitleType } from "../index";

    export let title: TitleType = [];
  </script>
  
  <div class="lines animate">

    <!-- Stores + Reactividad declarativa
    // Este componente recibe un array reactivo como prop.
    // `#each` renderiza elementos dinámicamente de forma declarativa. -->
    <span class="font-bold text-1xl">🌦 Pronóstico del Clima de</span>


    {#each title as t, i}
      <div class="overflow">
        <span class="line" style="--i: {i}">{t}</span>
      </div>
    {/each}
  </div>
  
  <style>
    .lines {
      max-width: 800px;
      font-size: 3rem;
      font-weight: 900;
      text-align: center;
    }
  
    .overflow {
      display: inline-block;
      overflow: hidden;
      vertical-align: bottom;
    }
  
    .line {
      display: inline-block;
      margin: 0.2rem;
      transform: translateY(100px);
      opacity: 0;
    }
  
    .animate .line {
      animation: flyIn 0.6s ease-out forwards;
      animation-delay: calc(var(--i) * 300ms);
    }
  
    @keyframes flyIn {
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  </style>
  