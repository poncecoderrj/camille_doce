<script lang="ts">
  import type { CharacterLayers } from './character-paperdoll.types';
  import { CHARACTER_MANIFESTS } from './character-manifest';

  interface Props {
    characterId: string;
    expression?: string;
    outfit?: string;
    overrideLayers?: Partial<CharacterLayers>;
    scale?: number;
    flipHorizontal?: boolean;
    class?: string;
  }

  let { 
    characterId, 
    expression = 'neutro', 
    outfit = 'default', 
    overrideLayers = {}, 
    scale = 1, 
    flipHorizontal = false, 
    class: customClass = '' 
  }: Props = $props();

  let manifest = $derived(CHARACTER_MANIFESTS[characterId] || null);

  // Resolver camadas ativas
  let resolvedLayers = $derived.by<CharacterLayers>(() => {
    if (!manifest) {
      return { body: '', ...overrideLayers };
    }

    // Outfit selecionado
    const activeOutfit = manifest.outfits[outfit] || manifest.outfits['default'] || {};

    // Expressão facial selecionada (fallback para neutro)
    const faceTexture = manifest.expressions[expression] 
      || manifest.expressions['neutro'] 
      || Object.values(manifest.expressions)[0] 
      || '';

    return {
      hairBack: activeOutfit.hairBack,
      body: manifest.baseBody,
      shoes: activeOutfit.shoes,
      bottom: activeOutfit.bottom,
      top: activeOutfit.top,
      dress: activeOutfit.dress,
      jacket: activeOutfit.jacket,
      necklace: activeOutfit.necklace,
      face: faceTexture,
      blush: expression === 'timido' || expression === 'corado' || expression === 'blush',
      glasses: activeOutfit.glasses,
      hairFront: activeOutfit.hairFront,
      ...overrideLayers
    };
  });
</script>

{#if manifest}
  <!-- ATOR PAPERDOLL 2D — 100% TRANSPARENTE, SEM CAIXA, COM MICROANIMAÇÃO A 60FPS -->
  <div 
    class="relative w-80 sm:w-96 md:w-[420px] h-[520px] sm:h-[580px] md:h-[640px] flex items-end justify-center select-none pointer-events-none paperdoll-actor {customClass}"
    style="transform: scale({scale}) {flipHorizontal ? 'scaleX(-1)' : ''};"
  >
    
    <!-- SOMBRA SUAVE NO PISO (PROJEÇÃO DE CONTATO) -->
    <div class="absolute -bottom-2 w-48 sm:w-60 h-6 bg-black/40 rounded-full blur-md pointer-events-none z-0"></div>

    <!-- Z: 05 — CABELO TRÁS -->
    {#if resolvedLayers.hairBack}
      <img 
        src={resolvedLayers.hairBack} 
        alt="" 
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-5"
      />
    {/if}

    <!-- Z: 10 — CORPO BASE ILUSTRADO (ANATOMIA COM RECORTE TRANSPARENTE) -->
    {#if resolvedLayers.body}
      <img 
        src={resolvedLayers.body} 
        alt={manifest.name} 
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-10 drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]"
      />
    {/if}

    <!-- Z: 20 — CALÇADOS -->
    {#if resolvedLayers.shoes}
      <img 
        src={resolvedLayers.shoes} 
        alt="" 
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-20"
      />
    {/if}

    <!-- Z: 30 — PEÇA INFERIOR (CALÇA / SAIA) -->
    {#if resolvedLayers.bottom && !resolvedLayers.dress}
      <img 
        src={resolvedLayers.bottom} 
        alt="" 
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-30"
      />
    {/if}

    <!-- Z: 40 — PEÇA SUPERIOR (CAMISA / CAMISETA) -->
    {#if resolvedLayers.top && !resolvedLayers.dress}
      <img 
        src={resolvedLayers.top} 
        alt="" 
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-40"
      />
    {/if}

    <!-- Z: 50 — VESTIDO (ONE-PIECE) -->
    {#if resolvedLayers.dress}
      <img 
        src={resolvedLayers.dress} 
        alt="" 
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-50"
      />
    {/if}

    <!-- Z: 60 — CASACO / BLAZER / JAQUETA -->
    {#if resolvedLayers.jacket}
      <img 
        src={resolvedLayers.jacket} 
        alt="" 
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-60"
      />
    {/if}

    <!-- Z: 70 — ACESSÓRIOS DE PESCOÇO / PEITO -->
    {#if resolvedLayers.necklace}
      <img 
        src={resolvedLayers.necklace} 
        alt="" 
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-70"
      />
    {/if}

    <!-- Z: 90 — EXPRESSÃO FACIAL (OLHOS, BOCA, SOBRANCELHA REATIVA) -->
    {#if resolvedLayers.face}
      <img 
        src={resolvedLayers.face} 
        alt="" 
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-90 transition-opacity duration-200"
      />
    {/if}

    <!-- Z: 92 — BLUSH / RUBOR REATIVO -->
    {#if resolvedLayers.blush}
      <div 
        class="absolute inset-0 w-full h-full pointer-events-none z-92 transition-opacity duration-300"
        style="background: radial-gradient(circle at 50% 22%, rgba(225, 29, 72, 0.28) 0%, rgba(225, 29, 72, 0.08) 12%, transparent 20%);"
      ></div>
    {/if}

    <!-- Z: 100 — ÓCULOS / ACESSÓRIOS DE ROSTO -->
    {#if resolvedLayers.glasses}
      <img 
        src={resolvedLayers.glasses} 
        alt="" 
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-100"
      />
    {/if}

    <!-- Z: 110 — CABELO FRENTE (FRANJA E MECHAS SOBRE OS OMBROS) -->
    {#if resolvedLayers.hairFront}
      <img 
        src={resolvedLayers.hairFront} 
        alt="" 
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-110"
      />
    {/if}

  </div>
{/if}

<style>
  /* MICROANIMAÇÃO SENOIDAL ORGÂNICA A 60FPS — O PERSONAGEM RESPIRA E TEM PRESENÇA FÍSICA */
  @keyframes vn-breath {
    0%, 100% {
      transform: translateY(0px) scaleY(1.000);
    }
    50% {
      transform: translateY(-3.5px) scaleY(1.007);
    }
  }

  @keyframes vn-presence-sway {
    0%, 100% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(0.2deg);
    }
  }

  .paperdoll-actor {
    animation: vn-breath 3.4s ease-in-out infinite, vn-presence-sway 6.8s ease-in-out infinite;
    transform-origin: bottom center;
    will-change: transform;
  }
</style>
