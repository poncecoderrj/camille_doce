<script lang="ts">
  import type { EquippedOutfit } from './wardrobe.schema';
  import { gameState } from '../game-state/GameState.svelte';
  import { SKIN_TONES } from './wardrobe.catalog';
  import { CHARACTER_FACIAL_METRICS } from '../characters/character-paperdoll.types';

  export type ProtagonistZoomMode = 'corpo_inteiro' | 'cabelo_rosto' | 'torso' | 'pernas_pes';

  interface Props {
    outfit: EquippedOutfit;
    zoomMode?: ProtagonistZoomMode;
    class?: string;
  }

  let { 
    outfit, 
    zoomMode = 'corpo_inteiro', 
    class: customClass = '' 
  }: Props = $props();

  const metrics = CHARACTER_FACIAL_METRICS.iris;

  // Tom de pele dinâmico para as pálpebras anatômicas
  let skinToneFill = $derived.by(() => {
    const tone = SKIN_TONES.find(s => s.id === outfit.skin_color);
    return tone ? tone.fill : '#fee5d5';
  });

  // ================= MOTOR LIVE 2D: PISCADA NATURAL AUTÔNOMA =================
  let eyeBlinkProgress = $state<number>(0); // 0 = aberto, 1 = totalmente fechado
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
    // 22% de chance de piscada dupla orgânica de anime
    const isDoubleBlink = Math.random() < 0.22;
    const delay = isDoubleBlink ? 180 : 2800 + Math.random() * 2600;
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

  // ================= MOTOR LIVE 2D: LIP-SYNC LABIAL EM TEMPO REAL =================
  let mouthOpenAmount = $state<number>(0); // 0 = fechado, 1 = aberto
  let mouthTimer: any = null;

  $effect(() => {
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

  // DETERMINAÇÃO DO ARQUÉTIPO ANATÔMICO REAL DESENHADO (AMOR DOCE ARCHETYPES)
  let activeArchetype = $derived.by(() => {
    const mass = outfit.body_build ?? 0;
    const muscle = outfit.muscle_tone ?? 20;

    if (mass >= 22) {
      return 'curvy_plussize';
    }
    if (mass <= -22) {
      return 'delicada_magra';
    }
    if (muscle >= 70) {
      return 'atletica_musculosa';
    }
    return 'padrao';
  });

  // ================= RESOLUÇÃO DAS CAMADAS PAPERDOLL MODULARES (AMOR DOCE 2D) =================
  let resolvedBody = $derived.by(() => {
    if (activeArchetype === 'curvy_plussize') {
      return '/assets/characters/iris/base/corpo_curvy_plussize.png';
    }
    if (activeArchetype === 'delicada_magra') {
      return '/assets/characters/iris/base/corpo_delicada_magra.png';
    }
    if (activeArchetype === 'atletica_musculosa') {
      return '/assets/characters/iris/base/corpo_atletica_musculosa.png';
    }
    return '/assets/characters/iris/base/corpo_manequim_padrao.png';
  });

  // Peça Superior (Top) Modular
  let resolvedTop = $derived.by(() => {
    if (outfit.top === 'camiseta_rock_banda') {
      return '/assets/characters/iris/roupas/superior/camiseta_rock_banda.png';
    }
    if (outfit.top === 'sueter_trico_creme') {
      return '/assets/characters/iris/roupas/superior/sueter_trico_creme.png';
    }
    if (outfit.top === 'camisa_uniforme_lotus') {
      return '/assets/characters/iris/roupas/superior/camisa_uniforme_lotus.png';
    }
    if (!outfit.dress && activeArchetype === 'padrao') {
      return '/assets/characters/iris/roupas/superior/camisa_uniforme_lotus.png';
    }
    return null;
  });

  // Peça Inferior (Bottom) Modular
  let resolvedBottom = $derived.by(() => {
    if (outfit.dress) return null;
    if (outfit.bottom === 'saia_xadrez_grunge') {
      return '/assets/characters/iris/roupas/inferior/saia_xadrez_grunge.png';
    }
    if (outfit.bottom === 'saia_midi_plissada') {
      return '/assets/characters/iris/roupas/inferior/saia_midi_plissada.png';
    }
    if (outfit.bottom === 'saia_pregueada_azul') {
      return '/assets/characters/iris/roupas/inferior/saia_uniforme_lotus.png';
    }
    if (activeArchetype === 'padrao') {
      return '/assets/characters/iris/roupas/inferior/saia_uniforme_lotus.png';
    }
    return null;
  });

  // Casaco / Terceira Peça (Jacket) Modular
  let resolvedJacket = $derived.by(() => {
    if (outfit.jacket === 'jaqueta_couro_perfecto') {
      return '/assets/characters/iris/roupas/casacos/jaqueta_couro_perfecto.png';
    }
    return null;
  });

  // Calçados & Meias (Shoes) Modulares
  let resolvedShoes = $derived.by(() => {
    if (outfit.shoes === 'coturno_rock_militar') {
      return '/assets/characters/iris/roupas/calcados/coturno_rock_militar.png';
    }
    if (outfit.shoes === 'sapatilhas_veludo_vinho' || outfit.shoes === 'sapatilha_romantica') {
      return '/assets/characters/iris/roupas/calcados/sapatilha_romantica.png';
    }
    if (outfit.shoes === 'mocassim_marrom_lotus' || activeArchetype === 'padrao') {
      return '/assets/characters/iris/roupas/calcados/sapatos_uniforme_lotus.png';
    }
    return null;
  });

  // Penteado (Hair) Modular
  let resolvedHair = $derived.by(() => {
    if (outfit.hair_front === 'cabelo_bob_chanel' || outfit.hair_style === 'bob_curto') {
      return '/assets/characters/iris/cabelos/cabelo_bob_chanel.png';
    }
    if (outfit.hair_front === 'cabelo_rabo_cavalo' || outfit.hair_style === 'rabo_cavalo') {
      return '/assets/characters/iris/cabelos/cabelo_rabo_cavalo.png';
    }
    return '/assets/characters/iris/cabelos/cabelo_ondulado_base.png';
  });

  // Acessório de Cabeça (Hat) Modular
  let resolvedHat = $derived.by(() => {
    if (outfit.hat === 'boina_feltro_ocre') {
      return '/assets/characters/iris/roupas/acessorios/boina_feltro_ocre.png';
    }
    return null;
  });

  // Óculos (Glasses) Modulares
  let resolvedGlasses = $derived.by(() => {
    if (outfit.glasses === 'oculos_redondos_dourados' || outfit.glasses === 'oculos_intelectuais') {
      return '/assets/characters/iris/roupas/acessorios/oculos_redondos_dourados.png';
    }
    return null;
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

  // ================= MOTOR DE MORFOLOGIA THE SIMS 2D =================
  let heightRatio = $derived(((outfit.height ?? 1.65) / 1.65));

  let microMassRatio = $derived.by(() => {
    const mass = outfit.body_build ?? 0;
    if (activeArchetype === 'curvy_plussize') {
      return 1 + ((mass - 35) / 380);
    }
    if (activeArchetype === 'delicada_magra') {
      return 1 + ((mass + 35) / 380);
    }
    if (activeArchetype === 'atletica_musculosa') {
      return 1 + (mass / 400);
    }
    return 1 + (mass / 260);
  });

  let curveRatio = $derived(1 + ((outfit.curve_ratio ?? 0) / 500));
  let scaleX = $derived((microMassRatio * curveRatio).toFixed(3));
  let scaleY = $derived(heightRatio.toFixed(3));
  let muscleContrast = $derived((100 + ((outfit.muscle_tone ?? 20) - 20) * 0.15).toFixed(1));

  let shadowWidth = $derived.by(() => {
    let baseShadow = 200;
    if (activeArchetype === 'curvy_plussize') baseShadow = 235;
    else if (activeArchetype === 'delicada_magra') baseShadow = 175;
    else if (activeArchetype === 'atletica_musculosa') baseShadow = 210;
    return Math.max(140, Math.min(290, baseShadow + (outfit.body_build ?? 0) * 0.5));
  });

  let hasCustomHairColor = $derived(Boolean(outfit.hair_color && outfit.hair_color !== '#4a2c11'));
  let isLightHair = $derived.by(() => {
    if (!outfit.hair_color) return false;
    const lightTones = ['#d97706', '#ec4899', '#e2e8f0', '#c99346', '#fcd34d', '#ffffff'];
    return lightTones.some(tone => outfit.hair_color?.toLowerCase().startsWith(tone.toLowerCase()));
  });
</script>

<!-- EXIBIÇÃO ILUSTRADA LIVE 2D DA PROTAGONISTA (COM PISCADA, LIP-SYNC E FÍSICA) -->
<div class="relative w-full h-full flex items-center justify-center select-none pointer-events-none {customClass}">
  
  <!-- CONTÊINER EXTERNO COM CÂMERA DE SMART AUTO-ZOOM SUAVE -->
  <div 
    class="relative w-80 sm:w-96 md:w-[440px] h-[520px] sm:h-[580px] md:h-[640px] flex items-end justify-center origin-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
    style="transform: {cameraTransform};"
  >
    <!-- CONTÊINER MORFOLÓGICO THE SIMS (ESCALA X/Y, DEFINIÇÃO MUSCULAR E ALTURA) -->
    <div 
      class="relative h-full aspect-[768/1344] max-w-full flex items-end justify-center transition-all duration-300 origin-bottom"
      style="
        transform: scale({scaleX}, {scaleY});
        filter: contrast({muscleContrast}%);
      "
    >
      <!-- SOMBRA NO PISO DINÂMICA COM O CORPO -->
      <div 
        class="absolute -bottom-2 h-6 bg-black/45 rounded-full blur-md pointer-events-none z-0 transition-all duration-300"
        style="width: {shadowWidth}px;"
      ></div>

      <!-- ================= CAMADA PAPERDOLL 2D MODULAR (PADRÃO AMOR DOCE) ================= -->
      
      <!-- Z: 10 — CORPO BASE / BIOTIPO ILUSTRADO ANIME -->
      <img 
        src={resolvedBody} 
        alt="Íris" 
        class="w-full h-full object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] vn-breath-anim z-10 transition-all duration-300"
      />

      <!-- Z: 20 — CALÇADOS & MEIAS MODULARES -->
      {#if resolvedShoes}
        <img 
          src={resolvedShoes} 
          alt="Calçados" 
          class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-20 vn-breath-anim transition-all duration-200"
        />
      {/if}

      <!-- Z: 30 — PARTE INFERIOR (SAIA / CALÇA) MODULAR -->
      {#if resolvedBottom}
        <img 
          src={resolvedBottom} 
          alt="Saia" 
          class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-30 vn-breath-anim transition-all duration-200"
        />
      {/if}

      <!-- Z: 40 — PARTE SUPERIOR (BLUSA / CAMISA / SUÉTER) MODULAR -->
      {#if resolvedTop}
        <img 
          src={resolvedTop} 
          alt="Blusa" 
          class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-40 vn-breath-anim transition-all duration-200"
        />
      {/if}

      <!-- Z: 50 — CASACO / JAQUETA DE COURO MODULAR -->
      {#if resolvedJacket}
        <img 
          src={resolvedJacket} 
          alt="Jaqueta" 
          class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-50 vn-breath-anim transition-all duration-200"
        />
      {/if}

      <!-- Z: 70 — ÓCULOS REDONDOS DOURADOS MODULARES -->
      {#if resolvedGlasses}
        <img 
          src={resolvedGlasses} 
          alt="Óculos" 
          class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-70 vn-breath-anim transition-all duration-200"
        />
      {/if}

      <!-- Z: 80 — CABELO COM MÁSCARA DINÂMICA DE COR THE SIMS -->
      {#if resolvedHair}
        <div class="absolute inset-0 w-full h-full pointer-events-none z-80 vn-breath-anim vn-hair-sway">
          <img 
            src={resolvedHair} 
            alt="Cabelo" 
            class="w-full h-full object-contain object-bottom"
          />
          {#if hasCustomHairColor}
            <div 
              class="absolute inset-0 w-full h-full mix-blend-color pointer-events-none transition-all duration-300"
              style="
                background-color: {outfit.hair_color};
                opacity: 0.88;
                mask-image: url({resolvedHair});
                -webkit-mask-image: url({resolvedHair});
                mask-size: contain;
                -webkit-mask-size: contain;
                mask-position: bottom;
                -webkit-mask-position: bottom;
                mask-repeat: no-repeat;
                -webkit-mask-repeat: no-repeat;
              "
            ></div>
          {/if}
        </div>
      {/if}

      <!-- Z: 90 — ACESSÓRIO DE CABEÇA (BOINA) MODULAR -->
      {#if resolvedHat}
        <img 
          src={resolvedHat} 
          alt="Boina" 
          class="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-90 vn-breath-anim vn-hair-sway transition-all duration-200"
        />
      {/if}

      <!-- OVERLAY: RUBOR / BLUSH REATIVO NAS BOCHECHAS -->
      {#if outfit.blush}
        <div 
          class="absolute inset-0 w-full h-full pointer-events-none z-75 transition-opacity duration-300 vn-breath-anim"
          style="background: radial-gradient(circle at 50% 23%, rgba(244, 63, 94, 0.30) 0%, rgba(244, 63, 94, 0.08) 10%, transparent 18%); mix-blend-mode: color-burn;"
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

      <!-- DETALHES VISUAIS DE PENTEADOS (COM FÍSICA SECUNDÁRIA) -->
      {#if outfit.hair_style === 'rabo_cavalo'}
        <div 
          class="absolute inset-0 w-full h-full pointer-events-none z-22 vn-breath-anim vn-hair-sway flex items-center justify-center"
          style="transform: translate(22%, -34%);"
        >
          <span class="w-4 h-4 rounded-full bg-rose-500 shadow-md ring-2 ring-white/50 animate-pulse"></span>
        </div>
      {:else if outfit.hair_style === 'coque_duplo'}
        <div 
          class="absolute inset-0 w-full h-full pointer-events-none z-22 vn-breath-anim vn-hair-sway flex items-center justify-center"
          style="transform: translate(-22%, -35%);"
        >
          <span class="w-5 h-5 rounded-full bg-amber-400/90 shadow-md ring-2 ring-amber-200"></span>
        </div>
        <div 
          class="absolute inset-0 w-full h-full pointer-events-none z-22 vn-breath-anim vn-hair-sway flex items-center justify-center"
          style="transform: translate(22%, -35%);"
        >
          <span class="w-5 h-5 rounded-full bg-amber-400/90 shadow-md ring-2 ring-amber-200"></span>
        </div>
      {:else if outfit.hair_style === 'bob_curto'}
        <div 
          class="absolute inset-0 w-full h-full pointer-events-none z-22 vn-breath-anim vn-hair-sway flex items-center justify-center"
          style="transform: translate(16%, -30%);"
        >
          <span class="px-2 py-0.5 rounded-full bg-white/95 text-[9px] font-bold text-stone-800 shadow-md border border-stone-200">✦</span>
        </div>
      {:else if outfit.hair_style === 'tranca_lateral'}
        <div 
          class="absolute inset-0 w-full h-full pointer-events-none z-22 vn-breath-anim vn-hair-sway flex items-center justify-center"
          style="transform: translate(18%, -24%);"
        >
          <span class="w-3.5 h-3.5 rounded-sm bg-pink-400 rotate-45 shadow-sm ring-1 ring-white/60"></span>
        </div>
      {:else if outfit.hair_style === 'repicado_rock'}
        <div 
          class="absolute inset-0 w-full h-full pointer-events-none z-22 vn-breath-anim vn-hair-sway flex items-center justify-center"
          style="transform: translate(-17%, -31%);"
        >
          <span class="text-xs text-zinc-100 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">⚔️</span>
        </div>
      {/if}

      <!-- OVERLAY: RUBOR / BLUSH REATIVO NAS BOCHECHAS -->
      {#if outfit.blush}
        <div 
          class="absolute inset-0 w-full h-full pointer-events-none z-20 transition-opacity duration-300 vn-breath-anim"
          style="background: radial-gradient(circle at 50% 23%, rgba(244, 63, 94, 0.30) 0%, rgba(244, 63, 94, 0.08) 10%, transparent 18%); mix-blend-mode: color-burn;"
        ></div>
      {/if}

      <!-- OVERLAY: ÓCULOS DE LEITURA METÁLICOS DOURADOS -->
      {#if outfit.glasses === 'oculos_redondos_dourados'}
        <div 
          class="absolute inset-0 w-full h-full pointer-events-none z-30 flex items-center justify-center vn-breath-anim"
          style="transform: translateY(-26.8%);"
        >
          <svg viewBox="0 0 100 40" class="w-24 h-10 drop-shadow-md">
            <circle cx="34" cy="20" r="14" stroke="#f59e0b" stroke-width="2.2" fill="rgba(255, 255, 255, 0.12)" />
            <circle cx="66" cy="20" r="14" stroke="#f59e0b" stroke-width="2.2" fill="rgba(255, 255, 255, 0.12)" />
            <path d="M 48 20 Q 50 16 52 20" stroke="#f59e0b" stroke-width="2.2" fill="none" />
            <line x1="20" y1="20" x2="6" y2="18" stroke="#f59e0b" stroke-width="2" />
            <line x1="80" y1="20" x2="94" y2="18" stroke="#f59e0b" stroke-width="2" />
          </svg>
        </div>
      {/if}

    </div>
  </div>
</div>

<style>
  /* MICROANIMAÇÃO SENOIDAL ORGÂNICA A 60FPS — RESPIRAÇÃO VIVA */
  @keyframes vn-breath-smooth {
    0%, 100% {
      transform: translateY(0px) scaleY(1.000);
    }
    50% {
      transform: translateY(-3.5px) scaleY(1.006);
    }
  }

  /* FÍSICA HARMÔNICA DE BALANÇO DE CABELO COM DEFASAGEM DE FASE */
  @keyframes vn-hair-sway-anim {
    0%, 100% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(0.8deg);
    }
    75% {
      transform: rotate(-0.8deg);
    }
  }

  .vn-breath-anim {
    animation: vn-breath-smooth 3.4s ease-in-out infinite;
    transform-origin: bottom center;
    will-change: transform;
  }

  .vn-hair-sway {
    animation: vn-hair-sway-anim 4.8s ease-in-out infinite;
    transform-origin: top center;
    will-change: transform;
  }
</style>
