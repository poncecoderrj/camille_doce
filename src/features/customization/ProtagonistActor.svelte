<script lang="ts">
  import type { ProtagonistCustomization } from './customization.schema';
  import { resolveProtagonistMasterIllustration, resolveBackpackAsset } from './customization.catalog';
  import { CHARACTER_FACIAL_METRICS } from '../characters/character.types';
  import { gameState } from '../game-state/GameState.svelte';

  interface Props {
    customization: ProtagonistCustomization;
    cameraFocus?: 'corpo_inteiro' | 'cabelo_rosto' | 'torso';
    scale?: number;
    flipHorizontal?: boolean;
    customClass?: string;
  }

  let {
    customization,
    cameraFocus = 'corpo_inteiro',
    scale = 1,
    flipHorizontal = false,
    customClass = ''
  }: Props = $props();

  const metrics = CHARACTER_FACIAL_METRICS.iris;

  // Resolução da ilustração mestra intacta (sem fatiamento de roupas)
  let masterIllustration = $derived(
    resolveProtagonistMasterIllustration(customization.body_archetype, customization.outfit_id)
  );

  // Resolução da bolsa/mochila sobreposta
  let backpackAsset = $derived(
    resolveBackpackAsset(customization.backpack)
  );

  // Resolução da expressão facial
  let faceTexture = $derived(
    `/assets/characters/iris/rostos/${customization.expression || 'neutro'}.png`
  );

  // ================= MOTOR LIVE 2D: PISCADA NATURAL AUTÔNOMA =================
  let eyeBlinkProgress = $state<number>(0);

  $effect(() => {
    let blinkTimeout: any = null;
    let animFrame: any = null;

    function triggerBlink() {
      const startTime = performance.now();
      const blinkDuration = 140; // ms
      const isDoubleBlink = Math.random() < 0.25;

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
      const blinkDuration = 115;
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
      const delay = 2600 + Math.random() * 2800;
      blinkTimeout = setTimeout(triggerBlink, delay);
    }

    scheduleNext();

    return () => {
      if (blinkTimeout) clearTimeout(blinkTimeout);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  });

  // ================= MOTOR LIVE 2D: LIP-SYNC DE FALA =================
  let mouthOpenAmount = $state<number>(0);

  $effect(() => {
    let mouthTimer: any = null;
    if (gameState.isSpeaking) {
      let step = 0;
      const phonemes = [0.85, 0.4, 0.95, 0.6, 0.15, 0.7, 0.2];
      mouthTimer = setInterval(() => {
        step++;
        mouthOpenAmount = phonemes[step % phonemes.length];
      }, 120);
    } else {
      if (mouthTimer) clearInterval(mouthTimer);
      mouthOpenAmount = 0;
    }

    return () => {
      if (mouthTimer) clearInterval(mouthTimer);
    };
  });

  // Transformação da câmera de acordo com o foco selecionado (Auto-Zoom)
  let cameraTransform = $derived.by(() => {
    if (cameraFocus === 'cabelo_rosto') {
      return 'scale(1.9) translateY(24%)';
    }
    if (cameraFocus === 'torso') {
      return 'scale(1.35) translateY(12%)';
    }
    return 'scale(1) translateY(0%)';
  });

  let cameraOrigin = $derived.by(() => {
    if (cameraFocus === 'cabelo_rosto') return '50% 35%';
    if (cameraFocus === 'torso') return '50% 55%';
    return '50% 90%';
  });

  function handleImgError(e: Event) {
    const target = e.currentTarget as HTMLImageElement;
    if (target) target.style.display = 'none';
  }
</script>

<!-- WRAPPER EXTERNO DE POSICIONAMENTO E ESCALA GLOBAL -->
<div 
  class="relative h-[50vh] sm:h-[58vh] md:h-[66vh] max-h-[600px] aspect-[768/1344] flex items-end justify-center select-none pointer-events-none vn-actor {customClass}"
  style="transform: scale({scale}) {flipHorizontal ? 'scaleX(-1)' : ''};"
>
  <!-- SOMBRA DE CONTATO NO PISO -->
  <div class="absolute -bottom-2 w-48 sm:w-60 h-6 bg-black/40 rounded-full blur-md pointer-events-none z-0"></div>

  <!-- CONTAINER DE CÂMERA DINÂMICA (AUTO-ZOOM SUAVE ENTRE CORPO, ROSTO E TORSO) -->
  <div 
    class="relative w-full h-full flex items-end justify-center transition-all duration-700 ease-out"
    style="transform: {cameraTransform}; transform-origin: {cameraOrigin};"
  >
    <!-- Z: 10 — ILUSTRAÇÃO MESTRA INTEGRAL (ALTA FIDELIDADE CEL-SHADED) -->
    <img 
      src={masterIllustration} 
      alt="Íris - Protagonista" 
      onerror={handleImgError}
      class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-10 drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)] vn-breath-anim"
    />

    <!-- Z: 20 — EXPRESSÃO FACIAL MODULAR -->
    {#if faceTexture}
      <img 
        src={faceTexture} 
        alt={customization.expression} 
        onerror={handleImgError}
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-20 transition-opacity duration-200 vn-breath-anim"
      />
    {/if}

    <!-- Z: 25 — CAMADA TINTURA REAL-TIME DA COR DO CABELO (CSS COLOR BLEND) -->
    {#if customization.hair_color && customization.hair_color !== '#4a2c11'}
      <div 
        class="absolute top-[14%] left-[28%] w-[44%] h-[32%] rounded-full pointer-events-none z-25 vn-breath-anim opacity-45 mix-blend-color blur-sm transition-colors duration-500"
        style="background: radial-gradient(ellipse at 50% 30%, {customization.hair_color} 0%, {customization.hair_color}aa 60%, transparent 100%);"
      ></div>
    {/if}

    <!-- Z: 30 — LIVE 2D: PISCADA NATURAL DOS OLHOS -->
    {#if eyeBlinkProgress > 0.02}
      <div 
        class="absolute pointer-events-none z-30 transition-transform duration-75 vn-breath-anim"
        style="
          top: {metrics.eyeY - 0.4}%;
          left: {metrics.eyeLeftX - metrics.eyeWidth / 2}%;
          width: {metrics.eyeWidth}%;
          height: {metrics.eyeHeight}%;
          background: {metrics.skinTone};
          border-radius: 9999px;
          transform: scaleY({eyeBlinkProgress * 1.15});
          transform-origin: center;
          box-shadow: 0 1px 2px rgba(60, 20, 10, 0.35);
        "
      >
        <div class="w-full h-[1.5px] bg-[#3d2417] rounded-full mt-[45%] opacity-85"></div>
      </div>

      <div 
        class="absolute pointer-events-none z-30 transition-transform duration-75 vn-breath-anim"
        style="
          top: {metrics.eyeY - 0.4}%;
          left: {metrics.eyeRightX - metrics.eyeWidth / 2}%;
          width: {metrics.eyeWidth}%;
          height: {metrics.eyeHeight}%;
          background: {metrics.skinTone};
          border-radius: 9999px;
          transform: scaleY({eyeBlinkProgress * 1.15});
          transform-origin: center;
          box-shadow: 0 1px 2px rgba(60, 20, 10, 0.35);
        "
      >
        <div class="w-full h-[1.5px] bg-[#3d2417] rounded-full mt-[45%] opacity-85"></div>
      </div>
    {/if}

    <!-- Z: 40 — LIVE 2D: LIP-SYNC DURANTE FALA -->
    {#if mouthOpenAmount > 0.05}
      <div 
        class="absolute pointer-events-none z-40 transition-transform duration-75 vn-breath-anim"
        style="
          top: {metrics.mouthY}%;
          left: {metrics.mouthX - metrics.mouthWidth / 2}%;
          width: {metrics.mouthWidth}%;
          height: {metrics.mouthWidth * 0.75}%;
          background: #7a2828;
          border-radius: 9999px;
          transform: scaleY({mouthOpenAmount}) scaleX(0.9);
          transform-origin: center;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.5);
        "
      >
        <!-- Dentes sutis superiores -->
        <div class="w-[70%] h-[30%] mx-auto bg-white/90 rounded-b-sm"></div>
      </div>
    {/if}

    <!-- Z: 50 — CAMADA DE BLUSH SUAVE NAS BOCHECHAS -->
    {#if customization.blush}
      <div 
        class="absolute pointer-events-none z-50 vn-breath-anim opacity-60 transition-opacity duration-300"
        style="
          top: 40.5%;
          left: 41.5%;
          width: 5.5%;
          height: 3%;
          background: radial-gradient(circle, rgba(244, 63, 94, 0.65) 0%, rgba(244, 63, 94, 0) 75%);
          border-radius: 50%;
          filter: blur(1.5px);
        "
      ></div>
      <div 
        class="absolute pointer-events-none z-50 vn-breath-anim opacity-60 transition-opacity duration-300"
        style="
          top: 40.5%;
          left: 53.5%;
          width: 5.5%;
          height: 3%;
          background: radial-gradient(circle, rgba(244, 63, 94, 0.65) 0%, rgba(244, 63, 94, 0) 75%);
          border-radius: 50%;
          filter: blur(1.5px);
        "
      ></div>
    {/if}

    <!-- Z: 60 — ÓCULOS REDONDOS DOURADOS -->
    {#if customization.glasses}
      <img 
        src="/assets/characters/iris/acessorios/oculos_redondos_dourados.png" 
        alt="Óculos Redondos Dourados" 
        onerror={handleImgError}
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-60 vn-breath-anim drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
      />
    {/if}

    <!-- Z: 70 — MOCHILA OU BOLSA ESCOLAR -->
    {#if backpackAsset}
      <img 
        src={backpackAsset} 
        alt="Mochila / Bolsa" 
        onerror={handleImgError}
        class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-70 vn-breath-anim drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
      />
    {/if}
  </div>
</div>
