<script lang="ts">
  import type { OutfitId } from './customization.schema';
  import { resolveProtagonistLookImage } from './customization.catalog';

  interface Props {
    outfitId?: OutfitId | string;
    scale?: number;
    flipHorizontal?: boolean;
    customClass?: string;
  }

  let {
    outfitId = 'uniforme_lotus',
    scale = 1,
    flipHorizontal = false,
    customClass = ''
  }: Props = $props();

  // Uma única ilustração mestra integral por look (sem nenhuma sobreposição ou camadas duplicadas)
  let spriteSrc = $derived(resolveProtagonistLookImage(outfitId));

  function handleImgError(e: Event) {
    const target = e.currentTarget as HTMLImageElement;
    if (target) target.style.display = 'none';
  }
</script>

<!-- ATOR 2D DA PROTAGONISTA (SPRITE ÚNICO DE ALTA FIDELIDADE, ZERO SOBREPOSIÇÃO) -->
<div 
  class="relative h-[50vh] sm:h-[58vh] md:h-[66vh] max-h-[600px] aspect-[768/1344] flex items-end justify-center select-none pointer-events-none vn-actor {customClass}"
  style="transform: scale({scale}) {flipHorizontal ? 'scaleX(-1)' : ''};"
>
  <!-- SOMBRA SUAVE NO PISO (PROJEÇÃO DE CONTATO) -->
  <div class="absolute -bottom-2 w-48 sm:w-60 h-6 bg-black/40 rounded-full blur-md pointer-events-none z-0"></div>

  <!-- ILUSTRAÇÃO ÚNICA DA PERSONAGEM COM O TRAJE ESCOLHIDO -->
  <img 
    src={spriteSrc} 
    alt="Íris - Protagonista" 
    onerror={handleImgError}
    class="w-full h-full object-contain object-bottom pointer-events-none drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)] vn-breath-anim transition-all duration-300"
  />
</div>
