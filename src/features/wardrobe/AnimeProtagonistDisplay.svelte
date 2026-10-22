<script lang="ts">
  import type { EquippedOutfit } from './wardrobe.schema';

  interface Props {
    outfit: EquippedOutfit;
    zoomMode?: 'corpo_inteiro' | 'busto';
    class?: string;
  }

  let { 
    outfit, 
    zoomMode = 'corpo_inteiro', 
    class: customClass = '' 
  }: Props = $props();

  // Detecta o visual dominante da protagonista para exibir a ilustração anime correta
  let activeArtPath = $derived.by(() => {
    // 1. Estilo Rock / Rebelde (Afinidade com Dante)
    const isRock = 
      outfit.top === 'camiseta_rock_banda' || 
      outfit.jacket === 'jaqueta_couro_perfecto' || 
      outfit.bottom === 'saia_xadrez_grunge' ||
      outfit.shoes === 'coturno_rock_militar';

    if (isRock) {
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

    if (isRomantico) {
      return '/assets/characters/iris/base/look_romantico.png';
    }

    // 3. Padrão: Uniforme Oficial da Academia Lótus (Afinidade com Lucas)
    return '/assets/characters/iris/base/uniforme_lotus.png';
  });

  let isCloseUp = $derived(zoomMode === 'busto');
</script>

<!-- EXIBIÇÃO ILUSTRADA ANIME DE ALTA RESOLUÇÃO DA PROTAGONISTA NO PROVADOR -->
<div class="relative w-full h-full flex items-center justify-center select-none pointer-events-none {customClass}">
  
  <!-- CONTÊINER COM ANIMAÇÃO DE CÂMERA (ZOOM DE BUSTO / CORPO INTEIRO) E RESPIRAÇÃO -->
  <div 
    class="relative w-80 sm:w-96 md:w-[420px] h-[520px] sm:h-[580px] md:h-[640px] flex items-end justify-center transition-all duration-500 origin-top"
    style="transform: {isCloseUp ? 'scale(1.45) translateY(12%)' : 'scale(1) translateY(0)'};"
  >
    <!-- SOMBRA NO PISO -->
    <div class="absolute -bottom-2 w-48 sm:w-60 h-6 bg-black/40 rounded-full blur-md pointer-events-none z-0"></div>

    <!-- ILUSTRAÇÃO ANIME DA PROTAGONISTA (100% TRANSPARENTE, SEM FUNDO, RECORTADA) -->
    <img 
      src={activeArtPath} 
      alt="Íris" 
      class="w-full h-full object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] vn-breath-anim z-10 transition-all duration-300"
    />

    <!-- OVERLAY: RUBOR / BLUSH REATIVO NAS BOCHECHAS -->
    {#if outfit.blush}
      <div 
        class="absolute inset-0 w-full h-full pointer-events-none z-20 transition-opacity duration-300 vn-breath-anim"
        style="background: radial-gradient(circle at 50% 23%, rgba(244, 63, 94, 0.28) 0%, rgba(244, 63, 94, 0.08) 10%, transparent 18%); mix-blend-mode: color-burn;"
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
