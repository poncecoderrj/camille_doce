<script lang="ts">
  import type { EquippedOutfit } from './wardrobe.schema';

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

  // DETERMINAÇÃO DO ARQUÉTIPO ANATÔMICO REAL DESENHADO (AMOR DOCE ARCHETYPES)
  let activeArchetype = $derived.by(() => {
    const mass = outfit.body_build ?? 0;
    const muscle = outfit.muscle_tone ?? 20;

    // Se o jogador configurou compleição encorpada / plus size:
    if (mass >= 22) {
      return 'curvy_plussize';
    }
    // Se o jogador configurou compleição magra / delicada:
    if (mass <= -22) {
      return 'delicada_magra';
    }
    // Se o jogador configurou alta definição muscular:
    if (muscle >= 70) {
      return 'atletica_musculosa';
    }
    // Caso padrão: proporção equilibrada
    return 'padrao';
  });

  // Detecta o visual dominante da protagonista (Look x Arquétipo Anatômico Real)
  let activeArtPath = $derived.by(() => {
    // 1. Estilo Rock / Rebelde (Afinidade com Dante)
    const isRock = 
      outfit.top === 'camiseta_rock_banda' || 
      outfit.jacket === 'jaqueta_couro_perfecto' || 
      outfit.bottom === 'saia_xadrez_grunge' ||
      outfit.shoes === 'coturno_rock_militar';

    if (isRock && activeArchetype === 'padrao') {
      return '/assets/characters/iris/base/look_rock.png';
    }

    // 2. Estilo Romântico & Poético (Afinidade com Theo)
    const isRomantico = 
      outfit.top === 'sueter_trico_creme' || 
      outfit.jacket === 'cardiga_nobre_marfim' || 
      outfit.bottom === 'saia_midi_plissada' ||
      outfit.hat === 'boina_feltro_ocre' ||
      outfit.dress === 'vestido_floral_primavera' ||
      outfit.necklace === 'cachecol_volumoso_mostarda';

    if (isRomantico && activeArchetype === 'padrao') {
      return '/assets/characters/iris/base/look_romantico.png';
    }

    // 3. Arquétipos Anatômicos Desenhados com Traços Reais de Gordura / Curvas / Músculos
    if (activeArchetype === 'curvy_plussize') {
      return '/assets/characters/iris/base/corpo_curvy_plussize.png';
    }
    if (activeArchetype === 'delicada_magra') {
      return '/assets/characters/iris/base/corpo_delicada_magra.png';
    }
    if (activeArchetype === 'atletica_musculosa') {
      return '/assets/characters/iris/base/corpo_atletica_musculosa.png';
    }

    // 4. Padrão: Uniforme Oficial da Academia Lótus
    return '/assets/characters/iris/base/uniforme_lotus.png';
  });

  // CÂMERA DINÂMICA INTELIGENTE (SMART AUTO-ZOOM CONTEXTUAL)
  let cameraTransform = $derived.by(() => {
    switch (zoomMode) {
      case 'cabelo_rosto':
        // Zoom cinematográfico no rosto, franja, corte e olhos
        return 'scale(2.1) translateY(24%)';
      case 'torso':
        // Zoom focado no tronco, jaqueta, blusa e acessórios
        return 'scale(1.42) translateY(10%)';
      case 'pernas_pes':
        // Zoom focado na saia, meia e calçados
        return 'scale(1.42) translateY(-14%)';
      case 'corpo_inteiro':
      default:
        // Enquadramento de passarela da cabeça aos pés sobre o chão
        return 'scale(1.0) translateY(0)';
    }
  });

  // ================= MOTOR DE MORFOLOGIA THE SIMS 2D =================
  // 1. Altura (Normalizada em 1.65m): 1.50m até 1.82m
  let heightRatio = $derived(((outfit.height ?? 1.65) / 1.65));

  // 2. Micro-ajuste Contínuo de Massa Corporal dentro do Arquétipo
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

  // 3. Curvatura da Silhueta: -30 (reta) a +30 (ampulheta)
  let curveRatio = $derived(1 + ((outfit.curve_ratio ?? 0) / 500));

  // Escalas finais combinadas
  let scaleX = $derived((microMassRatio * curveRatio).toFixed(3));
  let scaleY = $derived(heightRatio.toFixed(3));

  // 4. Definição Muscular (contraste sutil para realçar sombras anatômicas a 60FPS)
  let muscleContrast = $derived((100 + ((outfit.muscle_tone ?? 20) - 20) * 0.15).toFixed(1));

  // Largura dinâmica da sombra de piso proporcional ao biotipo
  let shadowWidth = $derived.by(() => {
    let baseShadow = 200;
    if (activeArchetype === 'curvy_plussize') baseShadow = 235;
    else if (activeArchetype === 'delicada_magra') baseShadow = 175;
    else if (activeArchetype === 'atletica_musculosa') baseShadow = 210;
    return Math.max(140, Math.min(290, baseShadow + (outfit.body_build ?? 0) * 0.5));
  });

  // Sistema de Tintura de Cabelo
  let hasCustomHairColor = $derived(Boolean(outfit.hair_color && outfit.hair_color !== '#4a2c11'));
  let isLightHair = $derived.by(() => {
    if (!outfit.hair_color) return false;
    const lightTones = ['#d97706', '#ec4899', '#e2e8f0', '#c99346', '#fcd34d', '#ffffff'];
    return lightTones.some(tone => outfit.hair_color?.toLowerCase().startsWith(tone.toLowerCase()));
  });
</script>

<!-- EXIBIÇÃO ILUSTRADA ANIME DE ALTA RESOLUÇÃO DA PROTAGONISTA COM MORFOLOGIA DINÂMICA -->
<div class="relative w-full h-full flex items-center justify-center select-none pointer-events-none {customClass}">
  
  <!-- CONTÊINER EXTERNO COM CÂMERA DE SMART AUTO-ZOOM SUAVE -->
  <div 
    class="relative w-80 sm:w-96 md:w-[440px] h-[520px] sm:h-[580px] md:h-[640px] flex items-end justify-center origin-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
    style="transform: {cameraTransform};"
  >
    <!-- CONTÊINER MORFOLÓGICO THE SIMS (ESCALA X/Y, DEFINIÇÃO MUSCULAR E ALTURA) -->
    <div 
      class="relative w-full h-full flex items-end justify-center transition-all duration-300 origin-bottom"
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

      <!-- ILUSTRAÇÃO ANIME DA PROTAGONISTA (100% TRANSPARENTE, RECORTADA E CEL-SHADED) -->
      <img 
        src={activeArtPath} 
        alt="Íris" 
        class="w-full h-full object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] vn-breath-anim z-10 transition-all duration-300"
      />

      <!-- CAMADA DE TINTURA DINÂMICA DE CABELO (SISTEMA MULTICOLOR THE SIMS) -->
      {#if hasCustomHairColor}
        <!-- Tonalização de Cor Base -->
        <div 
          class="absolute inset-0 w-full h-full pointer-events-none z-15 vn-breath-anim transition-all duration-300"
          style="
            background: {outfit.hair_color};
            mix-blend-mode: color;
            opacity: 0.85;
            mask-image: radial-gradient(ellipse 52% 28% at 50% 16%, black 50%, rgba(0,0,0,0.3) 78%, transparent 95%);
            -webkit-mask-image: radial-gradient(ellipse 52% 28% at 50% 16%, black 50%, rgba(0,0,0,0.3) 78%, transparent 95%);
          "
        ></div>

        <!-- Brilho para cabelos claros (Loiro, Platinado, Rosa Pastel) -->
        {#if isLightHair}
          <div 
            class="absolute inset-0 w-full h-full pointer-events-none z-16 vn-breath-anim transition-all duration-300"
            style="
              background: {outfit.hair_color};
              mix-blend-mode: screen;
              opacity: 0.38;
              mask-image: radial-gradient(ellipse 46% 25% at 50% 15%, black 45%, transparent 85%);
              -webkit-mask-image: radial-gradient(ellipse 46% 25% at 50% 15%, black 45%, transparent 85%);
            "
          ></div>
        {/if}
      {/if}

      <!-- DETALHES VISUAIS DE PENTEADOS (THE SIMS HAIR CUSTOMIZATION) -->
      {#if outfit.hair_style === 'rabo_cavalo'}
        <!-- Elástico & Laço de Rabo de Cavalo Alto -->
        <div 
          class="absolute inset-0 w-full h-full pointer-events-none z-22 vn-breath-anim flex items-center justify-center"
          style="transform: translate(22%, -34%);"
        >
          <span class="w-4 h-4 rounded-full bg-rose-500 shadow-md ring-2 ring-white/50 animate-pulse"></span>
        </div>
      {:else if outfit.hair_style === 'coque_duplo'}
        <!-- Coques Duplos Espaciais (Odango) -->
        <div 
          class="absolute inset-0 w-full h-full pointer-events-none z-22 vn-breath-anim flex items-center justify-center"
          style="transform: translate(-22%, -35%);"
        >
          <span class="w-5 h-5 rounded-full bg-amber-400/90 shadow-md ring-2 ring-amber-200"></span>
        </div>
        <div 
          class="absolute inset-0 w-full h-full pointer-events-none z-22 vn-breath-anim flex items-center justify-center"
          style="transform: translate(22%, -35%);"
        >
          <span class="w-5 h-5 rounded-full bg-amber-400/90 shadow-md ring-2 ring-amber-200"></span>
        </div>
      {:else if outfit.hair_style === 'bob_curto'}
        <!-- Presilha Elegante Pérola Chanel -->
        <div 
          class="absolute inset-0 w-full h-full pointer-events-none z-22 vn-breath-anim flex items-center justify-center"
          style="transform: translate(16%, -30%);"
        >
          <span class="px-2 py-0.5 rounded-full bg-white/95 text-[9px] font-bold text-stone-800 shadow-md border border-stone-200">✦</span>
        </div>
      {:else if outfit.hair_style === 'tranca_lateral'}
        <!-- Laço Romântico de Trança Lateral -->
        <div 
          class="absolute inset-0 w-full h-full pointer-events-none z-22 vn-breath-anim flex items-center justify-center"
          style="transform: translate(18%, -24%);"
        >
          <span class="w-3.5 h-3.5 rounded-sm bg-pink-400 rotate-45 shadow-sm ring-1 ring-white/60"></span>
        </div>
      {:else if outfit.hair_style === 'repicado_rock'}
        <!-- Grampos Metálicos Rebeldes -->
        <div 
          class="absolute inset-0 w-full h-full pointer-events-none z-22 vn-breath-anim flex items-center justify-center"
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
  /* MICROANIMAÇÃO SENOIDAL ORGÂNICA A 60FPS */
  @keyframes vn-breath-smooth {
    0%, 100% {
      transform: translateY(0px) scaleY(1.000);
    }
    50% {
      transform: translateY(-3.5px) scaleY(1.006);
    }
  }

  .vn-breath-anim {
    animation: vn-breath-smooth 3.4s ease-in-out infinite;
    transform-origin: bottom center;
    will-change: transform;
  }
</style>
