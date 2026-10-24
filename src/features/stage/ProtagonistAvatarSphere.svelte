<script lang="ts">
  import { gameState } from '../game-state/GameState.svelte';
  import { resolveProtagonistLookImage } from '../customization/customization.catalog';
  import { audioManager } from '../audio/audio-manager';
  import { Sparkles, Heart } from 'lucide-svelte';

  interface Props {
    expression?: string;
    isSpeaking?: boolean;
    isChoiceActive?: boolean;
    customClass?: string;
  }

  let {
    expression = 'neutro',
    isSpeaking = false,
    isChoiceActive = false,
    customClass = ''
  }: Props = $props();

  let spriteSrc = $derived(resolveProtagonistLookImage(gameState.currentOutfit));
  let isLight = $derived(gameState.theme === 'light');
  let charName = $derived(gameState.protagonistProfile?.name || 'Íris');

  // Controle de Tremor de Raiva da Protagonista (2 a 3x no máximo, sem loop infinito)
  let isAngryPulse = $state(false);
  let angryTimer: ReturnType<typeof setTimeout> | null = null;

  $effect(() => {
    const expr = (expression || '').toLowerCase();
    const isAngry = expr === 'angry' || expr === 'raiva' || expr === 'irritado' || expr === 'furious';
    if (isAngry) {
      isAngryPulse = true;
      if (angryTimer) clearTimeout(angryTimer);
      angryTimer = setTimeout(() => {
        isAngryPulse = false;
      }, 750);
    } else {
      isAngryPulse = false;
      if (angryTimer) clearTimeout(angryTimer);
    }
    return () => {
      if (angryTimer) clearTimeout(angryTimer);
    };
  });

  function handleAvatarClick() {
    audioManager.playClick();
  }
</script>

<!-- ESFERA DA PERSONAGEM PRINCIPAL (ESTILO AMOR DOCE / MY CANDY LOVE) -->
<div 
  class="relative shrink-0 flex flex-col items-center select-none {customClass}"
  role="presentation"
>
  <!-- ANEL EXTERNO ILUMINADO COM AURA SUAVE (PULSA DURANTE A FALA OU QUANDO HÁ ESCOLHA) -->
  <div 
    class="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full p-1 sm:p-1.5 transition-all duration-300 {isSpeaking ? 'ring-4 ring-rose-400/90 shadow-[0_0_30px_rgba(244,63,94,0.5)] scale-[1.02]' : isChoiceActive ? 'ring-3 ring-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.4)]' : 'ring-2 ring-rose-300/60 shadow-[0_8px_24px_rgba(0,0,0,0.45)]'}"
    style="background: {isLight ? 'linear-gradient(135deg, #fce7f3 0%, #ffe4e6 50%, #fbcfe8 100%)' : 'linear-gradient(135deg, #4c0519 0%, #1e111a 50%, #831843 100%)'};"
  >
    <!-- MOLDURA INTERNA ESFÉRICA -->
    <button
      type="button"
      onclick={handleAvatarClick}
      title="{charName} • Clique para interagir"
      class="relative w-full h-full rounded-full overflow-hidden border-2 sm:border-[2.5px] transition-transform active:scale-95 cursor-pointer block {isLight ? 'border-rose-300/80 bg-gradient-to-b from-white via-rose-50 to-pink-100' : 'border-rose-500/60 bg-gradient-to-b from-[#1b101c] via-[#241324] to-[#140a15]'}"
    >
      <!-- LUZ RADIAL / DEGRADÊ PROFUNDO DE ILUMINAÇÃO DE RETRATO -->
      <div class="absolute inset-0 bg-radial from-rose-300/20 via-transparent to-black/30 pointer-events-none z-10"></div>

      <!-- RETRATO DA PROTAGONISTA ENQUADRADO COM EXATIDÃO NO ROSTO E OMBROS -->
      <div 
        class="w-full h-full flex items-center justify-center pointer-events-none {isAngryPulse ? 'vn-angry-shake' : isSpeaking ? 'vn-speaking-bob' : 'vn-breath-anim'}"
      >
        <img 
          src={spriteSrc} 
          alt="{charName} - Protagonista"
          class="w-full h-full object-cover transition-all duration-300 pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
          style="object-position: center 38%; transform: scale(2.85); transform-origin: 50% 38%;"
        />
      </div>

      <!-- BRILHO DE DESTAQUE NO TOPO DA ESFERA (EFEITO VIDRO 3D) -->
      <div class="absolute top-1 left-2 right-2 h-4 sm:h-6 rounded-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none z-20 blur-[0.5px]"></div>
    </button>
  </div>

  <!-- BADGE DE NOME ELEGANTE ANCORADO NA BASE DA ESFERA -->
  <div 
    class="absolute -bottom-2 sm:-bottom-2.5 z-30 px-2.5 sm:px-3 py-0.5 rounded-full border shadow-lg backdrop-blur-md flex items-center gap-1.5 transition-all {isLight ? 'bg-white/95 border-rose-300 text-rose-950' : 'bg-black/90 border-rose-500/60 text-rose-100'}"
  >
    <span class="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-sm animate-pulse"></span>
    <span class="text-[9px] sm:text-[10px] font-cinzel font-extrabold tracking-wider uppercase">
      {charName}
    </span>
  </div>
</div>
