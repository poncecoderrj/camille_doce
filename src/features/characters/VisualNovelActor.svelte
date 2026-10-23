<script lang="ts">
  import type { CharacterId, StandardExpression } from './character.types';
  import { CHARACTER_MANIFESTS } from './character-manifest';
  import { gameState } from '../game-state/GameState.svelte';

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
  let metrics = $derived(manifest?.metrics || CHARACTER_MANIFESTS.dante.metrics);

  // ================= MOTOR LIVE 2D: PISCADA NATURAL AUTÔNOMA =================
  let eyeBlinkProgress = $state<number>(0);

  $effect(() => {
    let blinkTimeout: any = null;
    let animFrame: any = null;

    function triggerBlink() {
      const startTime = performance.now();
      const blinkDuration = 145; // ms
      const isDoubleBlink = Math.random() < 0.22;

      function step(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / blinkDuration);

        eyeBlinkProgress = Math.sin(progress * Math.PI);

        if (progress < 1) {
          animFrame = requestAnimationFrame(step);
        } else {
          eyeBlinkProgress = 0;
          if (isDoubleBlink) {
            setTimeout(triggerSingleBlink, 70);
          } else {
            scheduleNext();
          }
        }
      }

      animFrame = requestAnimationFrame(step);
    }

    function triggerSingleBlink() {
      const startTime = performance.now();
      const blinkDuration = 120;
      function step(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / blinkDuration);
        eyeBlinkProgress = Math.sin(progress * Math.PI);
        if (progress < 1) {
          animFrame = requestAnimationFrame(step);
        } else {
          eyeBlinkProgress = 0;
          scheduleNext();
        }
      }
      animFrame = requestAnimationFrame(step);
    }

    function scheduleNext() {
      const delay = 2800 + Math.random() * 2600;
      blinkTimeout = setTimeout(triggerBlink, delay);
    }

    scheduleNext();

    return () => {
      if (blinkTimeout) clearTimeout(blinkTimeout);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  });

  // ================= MOTOR LIVE 2D: LIP-SYNC DURANTE A FALA =================
  let mouthOpenAmount = $state<number>(0);

  $effect(() => {
    let mouthTimer: any = null;
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

  // Expressão facial ativa
  let faceTexture = $derived.by(() => {
    if (!manifest) return '';
    return manifest.expressions[expression] || manifest.expressions['neutro'] || '';
  });

  function handleImgError(e: Event) {
    const target = e.currentTarget as HTMLImageElement;
    if (target) target.style.display = 'none';
  }
</script>

{#if manifest}
  <!-- ATOR DE VISUAL NOVEL 2D (ASPECT RATIO 768/1344 TRAVADO, 100% TRANSPARENTE) -->
  <div 
    class="relative h-[50vh] sm:h-[58vh] md:h-[66vh] max-h-[600px] aspect-[768/1344] flex items-end justify-center select-none pointer-events-none vn-actor {customClass}"
    style="transform: scale({scale}) {flipHorizontal ? 'scaleX(-1)' : ''};"
  >
    <!-- SOMBRA SUAVE NO PISO (PROJEÇÃO DE CONTATO) -->
    <div class="absolute -bottom-2 w-48 sm:w-60 h-6 bg-black/40 rounded-full blur-md pointer-events-none z-0"></div>

    <!-- Z: 10 — CORPO BASE ILUSTRADO CEL-SHADED -->
    <img 
      src={manifest.baseBody} 
      alt={manifest.name} 
      onerror={handleImgError}
      class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-10 drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)] vn-breath-anim"
    />

    <!-- Z: 20 — EXPRESSÃO FACIAL EMOCIONAL DINÂMICA -->
    {#if faceTexture && faceTexture !== manifest.baseBody}
      <img 
        src={faceTexture} 
        alt={expression} 
        onerror={handleImgError}
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-20 transition-opacity duration-200 vn-breath-anim"
      />
    {/if}

    <!-- Z: 30 — CAMADA LIVE 2D: PISCADA DE OLHOS CALIBRADA -->
    {#if eyeBlinkProgress > 0.02}
      <div class="absolute inset-0 w-full h-full pointer-events-none z-30 vn-breath-anim">
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

    <!-- Z: 40 — CAMADA LIVE 2D: LIP-SYNC LABIAL DURANTE A FALA -->
    {#if gameState.isSpeaking && mouthOpenAmount > 0.05}
      <div 
        class="absolute pointer-events-none z-40 vn-breath-anim flex items-center justify-center"
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
            height: {Math.max(2.5, mouthOpenAmount * 8.5)}px;
            background-color: #5c1822;
            border: 1px solid #330b12;
          "
        >
          <div class="w-1.5 h-1 bg-rose-400 rounded-full mt-1 opacity-80"></div>
        </div>
      </div>
    {/if}
  </div>
{/if}
