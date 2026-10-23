<script lang="ts">
  import type { CharacterId, StandardExpression } from './character.types';
  import { CHARACTER_MANIFESTS } from './character-manifest';

  interface Props {
    characterId: CharacterId | string;
    expression?: StandardExpression | string;
    scale?: number;
    flipHorizontal?: boolean;
    customClass?: string;
  }

  let { 
    characterId, 
    expression = 'neutro', 
    scale = 1, 
    flipHorizontal = false, 
    customClass = '' 
  }: Props = $props();

  let manifest = $derived(CHARACTER_MANIFESTS[characterId] || null);

  // Seleciona a ilustração única e completa do personagem (Zero camadas sobrepostas)
  let spriteSrc = $derived.by(() => {
    if (!manifest) return '';
    return manifest.expressions[expression] || manifest.baseBody || '';
  });

  function handleImgError(e: Event) {
    const target = e.currentTarget as HTMLImageElement;
    if (target) target.style.display = 'none';
  }
</script>

{#if manifest && spriteSrc}
  <!-- ATOR DE VISUAL NOVEL 2D (SPRITE ÚNICO DE ALTA FIDELIDADE, ZERO SOBREPOSIÇÃO) -->
  <div 
    class="relative h-[50vh] sm:h-[58vh] md:h-[66vh] max-h-[600px] aspect-[768/1344] flex items-end justify-center select-none pointer-events-none vn-actor {customClass}"
    style="transform: scale({scale}) {flipHorizontal ? 'scaleX(-1)' : ''};"
  >
    <!-- SOMBRA SUAVE NO PISO (PROJEÇÃO DE CONTATO) -->
    <div class="absolute -bottom-2 w-48 sm:w-60 h-6 bg-black/40 rounded-full blur-md pointer-events-none z-0"></div>

    <!-- SPRITE ÚNICO INTEGRAL -->
    <img 
      src={spriteSrc} 
      alt="{manifest.name} ({expression})" 
      onerror={handleImgError}
      class="w-full h-full object-contain object-bottom pointer-events-none drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)] vn-breath-anim transition-all duration-300"
    />
  </div>
{/if}
