<script lang="ts">
  import { Heart } from 'lucide-svelte';
  import { gameState } from '../game-state/GameState.svelte';

  interface Props {
    characterId?: string | null;
  }

  let { characterId = null }: Props = $props();

  const characterColors: Record<string, {
    name: string;
    primary: string;
    gradient: string;
    glow: string;
  }> = {
    dante: {
      name: 'Dante',
      primary: '#e11d48',
      gradient: 'linear-gradient(to top, #be123c, #f43f5e, #fda4af)',
      glow: 'rgba(244, 63, 94, 0.45)'
    },
    lucas: {
      name: 'Lucas',
      primary: '#2563eb',
      gradient: 'linear-gradient(to top, #1d4ed8, #3b82f6, #93c5fd)',
      glow: 'rgba(59, 130, 246, 0.45)'
    },
    theo: {
      name: 'Theo',
      primary: '#059669',
      gradient: 'linear-gradient(to top, #047857, #10b981, #6ee7b7)',
      glow: 'rgba(16, 185, 129, 0.45)'
    }
  };

  let activeColor = $derived(
    characterId && characterColors[characterId] 
      ? characterColors[characterId] 
      : characterColors.dante
  );

  let affinity = $derived.by(() => {
    if (!characterId) return 0;
    const val = gameState.affinity[characterId as keyof typeof gameState.affinity];
    return typeof val === 'number' ? Math.max(0, Math.min(100, val)) : 0;
  });

  let isLight = $derived(gameState.theme === 'light');
</script>

{#if characterId && characterColors[characterId]}
  <!-- LUVÔMETRO VERTICAL (ESTILO AMOR DOCE / MY CANDY LOVE) -->
  <aside 
    aria-label="Luvômetro de afinidade"
    class="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-25 flex flex-col items-center select-none pointer-events-auto"
  >
    <!-- CÁPSULA DO TERMÔMETRO -->
    <div 
      class="relative w-7 sm:w-8.5 h-48 sm:h-64 rounded-full border-2 backdrop-blur-xl p-1 flex flex-col justify-end overflow-hidden shadow-2xl transition-all duration-500 {isLight ? 'bg-white/70 border-stone-300' : 'bg-black/60 border-white/15'}"
      style="box-shadow: 0 10px 30px {activeColor.glow};"
    >
      <!-- MARCADORES DE GRAU SUAVES -->
      <div class="absolute inset-y-4 right-1.5 flex flex-col justify-between pointer-events-none opacity-30 z-10">
        <span class="w-1.5 h-[1.5px] bg-white rounded-full"></span>
        <span class="w-1 h-[1px] bg-white rounded-full"></span>
        <span class="w-1.5 h-[1.5px] bg-white rounded-full"></span>
        <span class="w-1 h-[1px] bg-white rounded-full"></span>
        <span class="w-1.5 h-[1.5px] bg-white rounded-full"></span>
      </div>

      <!-- LÍQUIDO DO LUVÔMETRO (PREENCHIMENTO COM CORAÇÕES E GRADIENTE) -->
      <div 
        class="w-full rounded-full transition-all duration-700 ease-out relative overflow-hidden flex flex-col items-center justify-start"
        style="height: {Math.max(8, affinity)}%; background: {activeColor.gradient};"
      >
        <!-- EFEITO ONDA NO TOPO DO LÍQUIDO -->
        <div class="w-full h-2 bg-white/40 rounded-full blur-[0.5px] shrink-0"></div>

        <!-- PEQUENOS CORAÇÕES FLUTUANTES DENTRO DO LÍQUIDO -->
        <div class="absolute inset-0 flex flex-col items-center justify-around opacity-45 pointer-events-none">
          <Heart class="w-2.5 h-2.5 fill-white text-white animate-pulse" />
          {#if affinity > 40}
            <Heart class="w-2 h-2 fill-white text-white" />
          {/if}
        </div>
      </div>
    </div>

    <!-- MEDALHÃO DO CORAÇÃO COM A PORCENTAGEM (BASE DO TERMÔMETRO) -->
    <div 
      class="-mt-4 relative z-30 p-2 sm:p-2.5 rounded-full border-2 shadow-2xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 {isLight ? 'bg-white border-stone-300 text-stone-900' : 'bg-[#12131a] border-white/20 text-white'}"
      style="box-shadow: 0 4px 18px {activeColor.glow};"
      title="Afinidade com {activeColor.name}: {affinity}%"
    >
      <Heart 
        class="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 animate-pulse"
        style="color: {activeColor.primary}; fill: {activeColor.primary};"
      />
      <span class="text-[9px] sm:text-[10px] font-cinzel font-extrabold tracking-tighter mt-0.5" style="color: {activeColor.primary};">
        {affinity}%
      </span>
    </div>
  </aside>
{/if}
