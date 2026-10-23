<script lang="ts">
  import type { EquippedOutfit } from './wardrobe.schema';
  import { gameState } from '../game-state/GameState.svelte';
  import { SKIN_TONES } from './wardrobe.catalog';
  import { CHARACTER_FACIAL_METRICS } from '../characters/character-paperdoll.types';

  export type ProtagonistZoomMode = 'corpo_inteiro' | 'cabelo_rosto' | 'torso' | 'pernas_pes';

  interface Props {
    outfit: EquippedOutfit;
    zoomMode?: ProtagonistZoomMode;
    customClass?: string;
  }

  let { 
    outfit, 
    zoomMode = 'corpo_inteiro', 
    customClass = '' 
  }: Props = $props();

  const metrics = CHARACTER_FACIAL_METRICS.iris;

  // Tom de pele dinâmico para as pálpebras
  let skinToneFill = $derived.by(() => {
    const tone = SKIN_TONES.find(s => s.id === outfit.skin_color);
    return tone ? tone.fill : metrics.skinTone;
  });

  // ================= MOTOR LIVE 2D: PISCADA AUTÔNOMA NATURAL =================
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

        // Curva seno suave de fechamento e abertura
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
      const phonemes = [0.8, 0.3, 1.0, 0.45, 0.15, 0.65, 0.25];
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

  // ================= RESOLUÇÃO DA ARTE MESTRE (ZERO SOBREPOSIÇÃO) =================
  let masterIllustration = $derived.by(() => {
    // 1. Se um biotipo anatômico especial foi selecionado, ele tem prioridade visual
    if (outfit.body_archetype === 'curvy_plussize') {
      return '/assets/characters/iris/base/corpo_curvy_plussize.png';
    }
    if (outfit.body_archetype === 'delicada_magra') {
      return '/assets/characters/iris/base/corpo_delicada_magra.png';
    }
    if (outfit.body_archetype === 'atletica_musculosa') {
      return '/assets/characters/iris/base/corpo_atletica_musculosa.png';
    }

    // 2. Se for o padrão ou tiver look temático escolhido
    if (outfit.outfit_id === 'look_rock') {
      return '/assets/characters/iris/base/look_rock.png';
    }
    if (outfit.outfit_id === 'look_romantico') {
      return '/assets/characters/iris/base/look_romantico.png';
    }

    return '/assets/characters/iris/base/uniforme_lotus.png';
  });

  // CÂMERA DINÂMICA INTELIGENTE (SMART AUTO-ZOOM CONTEXTUAL)
  let cameraTransform = $derived.by(() => {
    switch (zoomMode) {
      case 'cabelo_rosto':
        return 'scale(2.1) translateY(24%)';
      case 'torso':
        return 'scale(1.42) translateY(10%)';
      case 'pernas_pes':
        return 'scale(1.42) translateY(-14%)';
      case 'corpo_inteiro':
      default:
        return 'scale(1.0) translateY(0)';
    }
  });

  // SLIDERS MORFOLÓGICOS THE SIMS (MICROAJUSTES FINOS SUAVES)
  let heightRatio = $derived(((outfit.height ?? 1.65) / 1.65));
  let microMassRatio = $derived(1 + ((outfit.body_build ?? 0) / 450));
  let scaleX = $derived(microMassRatio.toFixed(3));
  let scaleY = $derived(heightRatio.toFixed(3));
  let muscleContrast = $derived((100 + ((outfit.muscle_tone ?? 20) - 20) * 0.12).toFixed(1));

  let hasCustomHairColor = $derived(Boolean(outfit.hair_color && outfit.hair_color !== '#4a2c11'));
</script>

<!-- PALCO DO ATOR PROTAGONISTA 2D (LIMPO, CEL-SHADED, SEM SOBREPOSIÇÃO DE TECIDO) -->
<div class="relative w-full h-full flex items-center justify-center select-none pointer-events-none {customClass}">
  
  <!-- CONTÊINER EXTERNO COM CÂMERA DE SMART AUTO-ZOOM SUAVE -->
  <div 
    class="relative w-80 sm:w-96 md:w-[440px] h-[520px] sm:h-[580px] md:h-[640px] flex items-end justify-center origin-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
    style="transform: {cameraTransform};"
  >
    <!-- CONTÊINER MORFOLÓGICO THE SIMS (ESCALA X/Y E CONTRASTE MUSCULAR) -->
    <div 
      class="relative h-full aspect-[768/1344] max-w-full flex items-end justify-center transition-all duration-300 origin-bottom"
      style="
        transform: scale({scaleX}, {scaleY});
        filter: contrast({muscleContrast}%);
      "
    >
      <!-- SOMBRA SUAVE NO PISO -->
      <div class="absolute -bottom-2 w-52 h-6 bg-black/45 rounded-full blur-md pointer-events-none z-0 transition-all duration-300"></div>

      <!-- ILUSTRAÇÃO ANIME MESTRE (100% LIMPA, SEM CORTES OU DUPLICAÇÃO) -->
      <img 
        src={masterIllustration} 
        alt="Íris" 
        class="w-full h-full object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] vn-breath-anim z-10 transition-all duration-300"
      />

      <!-- ================= ACESSÓRIO: ÓCULOS REDONDOS DOURADOS ================= -->
      {#if outfit.glasses}
        <img 
          src="/assets/characters/iris/acessorios/oculos_redondos_dourados.png" 
          alt="Óculos Redondos" 
          class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-70 vn-breath-anim transition-opacity duration-200"
        />
      {/if}

      <!-- ================= OVERLAY: RUBOR / BLUSH NATURAL ================= -->
      {#if outfit.blush}
        <div 
          class="absolute inset-0 w-full h-full pointer-events-none z-75 transition-opacity duration-300 vn-breath-anim"
          style="background: radial-gradient(circle at 50% 23%, rgba(244, 63, 94, 0.28) 0%, rgba(244, 63, 94, 0.08) 10%, transparent 18%); mix-blend-mode: color-burn;"
        ></div>
      {/if}

      <!-- ================= TINTURA DINÂMICA DE CABELO THE SIMS ================= -->
      {#if hasCustomHairColor}
        <div 
          class="absolute inset-0 w-full h-full pointer-events-none z-80 vn-breath-anim vn-hair-sway transition-all duration-300"
          style="
            background: {outfit.hair_color};
            mix-blend-mode: color;
            opacity: 0.85;
            mask-image: radial-gradient(ellipse 52% 28% at 50% 16%, black 50%, rgba(0,0,0,0.3) 78%, transparent 95%);
            -webkit-mask-image: radial-gradient(ellipse 52% 28% at 50% 16%, black 50%, rgba(0,0,0,0.3) 78%, transparent 95%);
          "
        ></div>
      {/if}

      <!-- ================= CAMADA LIVE 2D: PISCADA DE OLHOS NATURAL ================= -->
      {#if eyeBlinkProgress > 0.02}
        <div class="absolute inset-0 w-full h-full pointer-events-none z-93 vn-breath-anim">
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
              style="background: {skinToneFill}; border-bottom: 2px solid #231610;"
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
              style="background: {skinToneFill}; border-bottom: 2px solid #231610;"
            ></div>
          </div>
        </div>
      {/if}

      <!-- ================= CAMADA LIVE 2D: LIP-SYNC LABIAL DE FALA ================= -->
      {#if gameState.isSpeaking && mouthOpenAmount > 0.05}
        <div 
          class="absolute pointer-events-none z-94 vn-breath-anim flex items-center justify-center"
          style="
            left: {metrics.mouthX - metrics.mouthWidth / 2}%; 
            top: {metrics.mouthY}%; 
            width: {metrics.mouthWidth}%; 
            height: 1.8%;
          "
        >
          <!-- Boca Viva com Abertura Orgânica Sincronizada -->
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
  </div>
</div>
