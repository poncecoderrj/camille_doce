<script lang="ts">
  import { gameState } from '../game-state/GameState.svelte';
  import { resolveEnvironmentLighting } from './environment-lighting';
  import type { TimeOfDay } from './environment-lighting';

  interface Props {
    location: string;
    timeOfDay?: TimeOfDay | string;
    isLight?: boolean;
  }

  let { location, timeOfDay = 'manha', isLight = false }: Props = $props();

  // Mapeamento de cada sala para sua ilustração artística real
  const backgroundImages: Record<string, string> = {
    'Quarto da Protagonista': '/assets/backgrounds/quarto_protagonista.png',
    'Portões de Entrada': '/assets/backgrounds/portao_escola.png',
    'Sala do Grêmio': '/assets/backgrounds/sala_gremio.png',
    'Pátio Central': '/assets/backgrounds/patio_central.png'
  };

  let activeImg = $derived(backgroundImages[location] || '/assets/backgrounds/portao_escola.png');

  // Resolução da iluminação ambiente dinâmica em tempo real
  let lighting = $derived(
    resolveEnvironmentLighting(
      location, 
      timeOfDay as TimeOfDay, 
      gameState.isFlashlightOn, 
      gameState.themeMode
    )
  );
</script>

<div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
  
  <!-- IMAGEM ARTÍSTICA DA PINTURA VISUAL NOVEL COM FILTRO DINÂMICO DE LUZ E CONTRASTE -->
  <img 
    src={activeImg} 
    alt={location}
    class="w-full h-full object-cover object-center transition-all duration-700 transform scale-105 animate-slow-drift"
    style="filter: {lighting.sceneryFilter};"
    loading="eager"
  />

  <!-- CAMADA DE ILUMINAÇÃO ATMOSFÉRICA DINÂMICA (ALVORADA, SOL PLENO, ENTARDECER OU PENUMBRA) -->
  <div 
    class="absolute inset-0 transition-all duration-700 pointer-events-none {lighting.lightingOverlayClass}"
    style={lighting.lightingOverlayStyle}
  ></div>

  <!-- SE FOR LOCAL ESCURO/QUARTO COM CORTINAS: FRESTAS DE LUZ DOURADA SUTIS -->
  {#if lighting.isDarkEnvironment && !gameState.isFlashlightOn}
    <div 
      class="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen transition-opacity duration-700"
      style="background: linear-gradient(125deg, rgba(254, 240, 138, 0.35) 0%, transparent 40%, rgba(254, 215, 170, 0.2) 60%, transparent 100%);"
    ></div>
  {/if}

  <!-- FEIXE DE LUZ DA LANTERNA DO CELULAR (QUANDO ATIVADA NO CELULAR) -->
  {#if gameState.isFlashlightOn}
    <div 
      class="absolute inset-0 pointer-events-none z-10 transition-opacity duration-500 animate-pulse"
      style="background: radial-gradient(circle at 65% 55%, rgba(255, 252, 235, 0.45) 0%, rgba(255, 245, 205, 0.2) 35%, rgba(0, 0, 0, 0.5) 85%); mix-blend-mode: screen;"
    ></div>
  {/if}

  <!-- VINHETA CINEMATOGRÁFICA ADAPTATIVA NAS BORDAS PARA DESTAQUE DO PERSONAGEM E TEXTO -->
  <div 
    class="absolute inset-0 pointer-events-none transition-opacity duration-700"
    style="background: radial-gradient(circle, transparent 40%, rgba(0, 0, 0, {lighting.vignetteOpacity}) 100%);"
  ></div>

</div>

<style>
  @keyframes slowDrift {
    0%, 100% {
      transform: scale(1.04) translate(0, 0);
    }
    50% {
      transform: scale(1.07) translate(-0.5%, -0.5%);
    }
  }

  .animate-slow-drift {
    animation: slowDrift 22s ease-in-out infinite;
  }
</style>
