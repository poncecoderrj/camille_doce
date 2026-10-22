<script lang="ts">
  interface Props {
    location: string;
    timeOfDay?: 'manha' | 'tarde' | 'entardecer' | 'noite';
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
</script>

<div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
  
  <!-- IMAGEM ARTÍSTICA REAL DE PINTURA ANIME / VISUAL NOVEL -->
  <img 
    src={activeImg} 
    alt={location}
    class="w-full h-full object-cover object-center transition-all duration-700 transform scale-105 animate-slow-drift"
    loading="eager"
  />

  <!-- FILTRO DE ILUMINAÇÃO DINÂMICA DE ACORDO COM O TEMA -->
  {#if isLight}
    <!-- Modo Claro: Raios dourados matinais suaves e contraste aveludado -->
    <div class="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-amber-100/20 mix-blend-soft-light transition-all duration-700"></div>
    <div class="absolute inset-0 bg-amber-500/5 mix-blend-color transition-all duration-700"></div>
  {:else}
    <!-- Modo Escuro: Atmosfera noturna com filtro luar azul-grafite e vinheta cinematográfica -->
    <div class="absolute inset-0 bg-gradient-to-t from-[#08090d]/90 via-[#0e1017]/40 to-[#08090d]/60 transition-all duration-700"></div>
    <div class="absolute inset-0 bg-[#0f172a]/30 mix-blend-multiply transition-all duration-700"></div>
  {/if}

  <!-- VINHETA CINEMATOGRÁFICA NAS BORDAS PARA DESTAQUE DO PERSONAGEM E TEXTO -->
  <div class="absolute inset-0 bg-radial from-transparent via-transparent to-black/50 pointer-events-none"></div>

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
