<script lang="ts">
  import type { OutfitId } from './customization.schema';
  import { resolveProtagonistLookImage } from './customization.catalog';

  interface Props {
    outfitId?: OutfitId | string;
    expression?: string;
    scale?: number;
    flipHorizontal?: boolean;
    customClass?: string;
    framing?: 'full' | 'bust';
  }

  let {
    outfitId = 'uniforme_lotus',
    expression = 'neutro',
    scale = 1,
    flipHorizontal = false,
    customClass = '',
    framing = 'bust'
  }: Props = $props();

  // Normalização semântica das expressões
  let cleanExpr = $derived.by(() => {
    const expr = (expression || 'neutro').toLowerCase().trim();
    if (['happy', 'smile', 'sorriso'].includes(expr)) return 'feliz';
    if (['angry', 'raiva', 'irritado'].includes(expr)) return 'irritado';
    if (['sad', 'sigh', 'melancolico'].includes(expr)) return 'melancolico';
    if (['surprised', 'surpresa'].includes(expr)) return 'surpreso';
    if (['blush', 'shy', 'timido'].includes(expr)) return 'timido';
    if (['corado'].includes(expr)) return 'corado';
    if (['smirk', 'tease'].includes(expr)) return 'smirk';
    if (['neutral', 'neutro'].includes(expr)) return 'neutro';
    return expr || 'neutro';
  });

  // Imagem do sprite da protagonista com suporte dinâmico a expressões e cache-buster
  let spriteSrc = $derived.by(() => {
    if (outfitId === 'uniforme_lotus') {
      return `/assets/characters/iris/rostos/${cleanExpr}.png?v=3`;
    }
    return `${resolveProtagonistLookImage(outfitId)}?v=3`;
  });

  function handleImgError(e: Event) {
    const target = e.currentTarget as HTMLImageElement;
    const fallback = `${resolveProtagonistLookImage(outfitId)}?v=3`;
    if (target && !target.src.includes(resolveProtagonistLookImage(outfitId))) {
      target.src = fallback;
    }
  }
</script>

{#if framing === 'full'}
  <!-- MODO CORPO INTEIRO (USADO NO CLOSET / CRIAÇÃO DE PERSONAGEM) -->
  <div 
    class="relative h-full max-h-[780px] aspect-[768/1344] flex items-end justify-center select-none pointer-events-none vn-actor {customClass}"
    style="transform: scale({scale}) {flipHorizontal ? 'scaleX(-1)' : ''};"
  >
    <!-- SOMBRA SUAVE NO PISO (PROJEÇÃO DE CONTATO) -->
    <div class="absolute -bottom-2 w-48 sm:w-60 h-6 bg-black/40 rounded-full blur-md pointer-events-none z-0"></div>

    <!-- ILUSTRAÇÃO INTEGRAL DA PERSONAGEM -->
    <img 
      src={spriteSrc} 
      alt="Íris - Protagonista" 
      onerror={handleImgError}
      class="w-full h-full object-contain object-bottom pointer-events-none drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)] vn-breath-anim transition-all duration-300"
    />
  </div>
{:else}
  <!-- MODO BUSTO VISUAL NOVEL (ESTILO AMOR DOCE: PERSONAGEM GRANDE, CARISMÁTICA E CENTRAL) -->
  <div 
    class="relative w-full h-full flex items-end justify-center select-none pointer-events-none vn-actor overflow-visible {customClass}"
  >
    <!-- SOMBRA SUAVE NO PISO -->
    <div class="absolute bottom-2 w-52 sm:w-64 h-7 bg-black/40 rounded-full blur-md pointer-events-none z-0"></div>

    <!-- ESCALONADOR DE BUSTO (ELIMINA O VAZIO DO TOPO E DESTACA O ROSTO/TORSO) -->
    <div 
      class="w-full h-full flex items-end justify-center pointer-events-none"
      style="transform: scale({1.38 * scale}) {flipHorizontal ? 'scaleX(-1)' : ''}; transform-origin: center bottom;"
    >
      <img 
        src={spriteSrc} 
        alt="Íris - Protagonista" 
        onerror={handleImgError}
        class="w-full h-full object-contain object-bottom pointer-events-none drop-shadow-[0_14px_32px_rgba(0,0,0,0.6)] vn-breath-anim transition-all duration-300"
      />
    </div>
  </div>
{/if}
