<script lang="ts">
  import { Sparkles } from 'lucide-svelte';
  import { gameState } from '../game-state/GameState.svelte';

  interface Props {
    text: string;
    speakerName: string;
    accentColor?: string;
    onAdvance?: () => void;
  }

  let {
    text = '',
    speakerName = '',
    accentColor = '#e11d48',
    onAdvance
  }: Props = $props();

  let isLight = $derived(gameState.theme === 'light');
</script>

<!-- BALÃO DE FALA DO PERSONAGEM EM CENA (ESTILO AMOR DOCE / MY CANDY LOVE) -->
<div 
  role="button"
  tabindex="0"
  onclick={onAdvance}
  onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') onAdvance?.(); }}
  class="absolute top-16 sm:top-20 left-4 sm:left-12 max-w-xs sm:max-w-md md:max-w-lg z-25 pointer-events-auto cursor-pointer animate-in fade-in zoom-in-95 duration-300"
>
  <!-- CORPO DO BALÃO DE FALA -->
  <div 
    class="relative p-4 sm:p-5.5 rounded-3xl border shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] {isLight ? 'bg-white/95 border-stone-200/80 text-stone-900' : 'bg-[#0f111a]/95 border-white/12 text-zinc-100'}"
    style="box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);"
  >
    <!-- CRACHÁ DO FALANTE INTEGRADO NO TOPO DO BALÃO -->
    <div class="absolute -top-3 left-6">
      <div 
        class="px-3 py-0.5 rounded-full border shadow-md flex items-center gap-1.5 backdrop-blur-md text-[11px] font-cinzel font-bold tracking-wider uppercase {isLight ? 'bg-white border-stone-300 text-stone-800' : 'bg-black/90 border-white/20 text-zinc-100'}"
      >
        <span class="w-2 h-2 rounded-full shadow-sm animate-pulse" style="background: {accentColor};"></span>
        <span>{speakerName}</span>
      </div>
    </div>

    <!-- TEXTO DA FALA DO PERSONAGEM (FONTE ELEGANTE E LEITURA CONFORTÁVEL) -->
    <div class="mt-1 text-xs sm:text-sm md:text-[15px] leading-relaxed font-serif-romance font-medium">
      {text}
      {#if gameState.isSpeaking}
        <span class="inline-block w-1.5 h-4 bg-amber-500 ml-1 animate-pulse align-middle"></span>
      {/if}
    </div>

    <!-- INDICADOR DISCRETO PARA AVANÇAR -->
    <div class="mt-2 flex justify-end">
      <span class="text-[9px] font-sans-ui opacity-50 flex items-center gap-1 italic">
        Clique para avançar ▶
      </span>
    </div>

    <!-- CAUDA / PONTEIRO DO BALÃO DE FALA (APONTANDO PARA O PERSONAGEM À DIREITA) -->
    <div 
      class="absolute -right-3 top-8 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[14px] {isLight ? 'border-l-white/95' : 'border-l-[#0f111a]/95'}"
    ></div>
  </div>
</div>
