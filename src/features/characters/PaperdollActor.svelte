<script lang="ts">
  import type { CharacterLayers } from './character-paperdoll.types';
  import { CHARACTER_MANIFESTS } from './character-manifest';
  import { CHARACTER_FACIAL_METRICS } from './character-paperdoll.types';
  import { gameState } from '../game-state/GameState.svelte';

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
  let metrics = $derived(CHARACTER_FACIAL_METRICS[characterId] || CHARACTER_FACIAL_METRICS.dante);

  // ================= MOTOR LIVE 2D: PISCADA NATURAL AUTÔNOMA =================
  let eyeBlinkProgress = $state<number>(0);
  let blinkTimer: any = null;

  function triggerBlinkCycle() {
    let start = performance.now();
    const durationClose = 65;
    const durationHold = 35;
    const durationOpen = 85;
    const total = durationClose + durationHold + durationOpen;

    const animate = (time: number) => {
      const elapsed = time - start;
      if (elapsed < durationClose) {
        eyeBlinkProgress = elapsed / durationClose;
        requestAnimationFrame(animate);
      } else if (elapsed < durationClose + durationHold) {
        eyeBlinkProgress = 1;
        requestAnimationFrame(animate);
      } else if (elapsed < total) {
        eyeBlinkProgress = 1 - ((elapsed - durationClose - durationHold) / durationOpen);
        requestAnimationFrame(animate);
      } else {
        eyeBlinkProgress = 0;
        scheduleNextBlink();
      }
    };
    requestAnimationFrame(animate);
  }

  function scheduleNextBlink() {
    const isDoubleBlink = Math.random() < 0.20;
    const delay = isDoubleBlink ? 200 : 3000 + Math.random() * 2800;
    blinkTimer = setTimeout(() => {
      triggerBlinkCycle();
    }, delay);
  }

  $effect(() => {
    scheduleNextBlink();
    return () => {
      if (blinkTimer) clearTimeout(blinkTimer);
    };
  });

  // ================= MOTOR LIVE 2D: LIP-SYNC DE FALA =================
  let mouthOpenAmount = $state<number>(0);
  let mouthTimer: any = null;

  $effect(() => {
    if (gameState.isSpeaking) {
      let step = 0;
      const phonemes = [0.8, 0.35, 1.0, 0.5, 0.1, 0.65, 0.2];
      mouthTimer = setInterval(() => {
        step++;
        mouthOpenAmount = phonemes[step % phonemes.length];
      }, 125);
    } else {
      if (mouthTimer) clearInterval(mouthTimer);
      mouthOpenAmount = 0;
    }

    return () => {
      if (mouthTimer) clearInterval(mouthTimer);
    };
  });

  // Resolver camadas ativas
  let resolvedLayers = $derived.by<CharacterLayers>(() => {
    if (!manifest) {
      return { body: '', ...overrideLayers };
    }

    // Outfit selecionado
    const activeOutfit = manifest.outfits[outfit] || manifest.outfits['default'] || {};

    // Expressão facial selecionada (se houver variação diferente da base)
    const faceTexture = manifest.expressions[expression] 
      || manifest.expressions['neutro'] 
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
      face: faceTexture !== manifest.baseBody ? faceTexture : undefined,
      blush: expression === 'timido' || expression === 'corado' || expression === 'blush',
      glasses: activeOutfit.glasses,
      hairFront: activeOutfit.hairFront,
      ...overrideLayers
    };
  });

  function handleImgError(e: Event) {
    // Esconde silenciosamente qualquer imagem que não exista sem deixar ícone de erro no DOM
    const target = e.currentTarget as HTMLImageElement;
    if (target) {
      target.style.display = 'none';
    }
  }
</script>

{#if manifest}
  <!-- ATOR PAPERDOLL 2D LIVE — 100% TRANSPARENTE COM CALIBRAÇÃO ANATÔMICA INDIVIDUAL -->
  <div 
    class="relative h-[50vh] sm:h-[58vh] md:h-[66vh] max-h-[600px] aspect-[768/1344] flex items-end justify-center select-none pointer-events-none paperdoll-actor {customClass}"
    style="transform: scale({scale}) {flipHorizontal ? 'scaleX(-1)' : ''};"
  >
    
    <!-- SOMBRA SUAVE NO PISO (PROJEÇÃO DE CONTATO) -->
    <div class="absolute -bottom-2 w-48 sm:w-60 h-6 bg-black/40 rounded-full blur-md pointer-events-none z-0"></div>

    <!-- Z: 05 — CABELO TRÁS -->
    {#if resolvedLayers.hairBack}
      <img 
        src={resolvedLayers.hairBack} 
        alt="" 
        onerror={handleImgError}
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-5"
      />
    {/if}

    <!-- Z: 10 — CORPO BASE ILUSTRADO (ANATOMIA COM RECORTE TRANSPARENTE) -->
    {#if resolvedLayers.body}
      <img 
        src={resolvedLayers.body} 
        alt={manifest.name} 
        onerror={handleImgError}
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-10 drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]"
      />
    {/if}

    <!-- Z: 20 — CALÇADOS -->
    {#if resolvedLayers.shoes}
      <img 
        src={resolvedLayers.shoes} 
        alt="" 
        onerror={handleImgError}
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-20"
      />
    {/if}

    <!-- Z: 30 — PEÇA INFERIOR (CALÇA / SAIA) -->
    {#if resolvedLayers.bottom && !resolvedLayers.dress}
      <img 
        src={resolvedLayers.bottom} 
        alt="" 
        onerror={handleImgError}
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-30"
      />
    {/if}

    <!-- Z: 40 — PEÇA SUPERIOR (CAMISA / CAMISETA) -->
    {#if resolvedLayers.top && !resolvedLayers.dress}
      <img 
        src={resolvedLayers.top} 
        alt="" 
        onerror={handleImgError}
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-40"
      />
    {/if}

    <!-- Z: 50 — VESTIDO (ONE-PIECE) -->
    {#if resolvedLayers.dress}
      <img 
        src={resolvedLayers.dress} 
        alt="" 
        onerror={handleImgError}
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-50"
      />
    {/if}

    <!-- Z: 60 — CASACO / BLAZER / JAQUETA -->
    {#if resolvedLayers.jacket}
      <img 
        src={resolvedLayers.jacket} 
        alt="" 
        onerror={handleImgError}
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-60"
      />
    {/if}

    <!-- Z: 70 — ACESSÓRIOS DE PESCOÇO / PEITO -->
    {#if resolvedLayers.necklace}
      <img 
        src={resolvedLayers.necklace} 
        alt="" 
        onerror={handleImgError}
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-70"
      />
    {/if}

    <!-- Z: 90 — EXPRESSÃO FACIAL (OLHOS, BOCA, SOBRANCELHA REATIVA) -->
    {#if resolvedLayers.face}
      <img 
        src={resolvedLayers.face} 
        alt="" 
        onerror={handleImgError}
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-90 transition-opacity duration-200"
      />
    {/if}

    <!-- Z: 93 — CAMADA LIVE 2D: PISCADA DE OLHOS CALIBRADA DO PERSONAGEM -->
    {#if eyeBlinkProgress > 0.02}
      <div class="absolute inset-0 w-full h-full pointer-events-none z-93">
        <!-- Pálpebra Olho Esquerdo -->
        <div 
          class="absolute overflow-hidden"
          style="
            left: {metrics.eyeLeftX - metrics.eyeWidth / 2}%; 
            top: {metrics.eyeY - metrics.eyeHeight / 2}%; 
            width: {metrics.eyeWidth}%; 
            height: {metrics.eyeHeight}%; 
            transform-origin: top center;
            transform: scaleY({eyeBlinkProgress});
          "
        >
          <div 
            class="w-full h-full rounded-b-full shadow-sm"
            style="background: {metrics.skinTone}; border-bottom: 2px solid #1a1512;"
          ></div>
        </div>

        <!-- Pálpebra Olho Direito -->
        <div 
          class="absolute overflow-hidden"
          style="
            left: {metrics.eyeRightX - metrics.eyeWidth / 2}%; 
            top: {metrics.eyeY - metrics.eyeHeight / 2}%; 
            width: {metrics.eyeWidth}%; 
            height: {metrics.eyeHeight}%; 
            transform-origin: top center;
            transform: scaleY({eyeBlinkProgress});
          "
        >
          <div 
            class="w-full h-full rounded-b-full shadow-sm"
            style="background: {metrics.skinTone}; border-bottom: 2px solid #1a1512;"
          ></div>
        </div>
      </div>
    {/if}

    <!-- Z: 94 — CAMADA LIVE 2D: LIP-SYNC LABIAL CALIBRADO DO PERSONAGEM -->
    {#if gameState.isSpeaking && mouthOpenAmount > 0.05}
      <div 
        class="absolute pointer-events-none z-94 flex items-center justify-center"
        style="
          left: {metrics.mouthX - metrics.mouthWidth / 2}%; 
          top: {metrics.mouthY}%; 
          width: {metrics.mouthWidth}%; 
          height: 1.8%;
        "
      >
        <div 
          class="rounded-full transition-transform duration-75 flex items-center justify-center overflow-hidden shadow-inner"
          style="
            width: 100%;
            height: {Math.max(2, mouthOpenAmount * 8)}px;
            background-color: #57161f;
            border: 1px solid #2e0b11;
          "
        >
          <div class="w-1.5 h-1 bg-rose-400 rounded-full mt-0.5 opacity-75"></div>
        </div>
      </div>
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
        onerror={handleImgError}
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-100"
      />
    {/if}

    <!-- Z: 110 — CABELO FRENTE (FRANJA E MECHAS SOBRE OS OMBROS) -->
    {#if resolvedLayers.hairFront}
      <img 
        src={resolvedLayers.hairFront} 
        alt="" 
        onerror={handleImgError}
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
