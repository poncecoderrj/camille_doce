<script lang="ts">
  import type { PersonagemId } from '../dialogue/narrative.schema';
  import { gameState } from '../game-state/GameState.svelte';

  interface Props {
    speaker: PersonagemId;
    speakerName?: string;
    expression?: string;
    timeOfDay?: 'manha' | 'tarde' | 'entardecer' | 'noite';
  }

  let { speaker, speakerName = '', expression = 'neutral', timeOfDay = 'manha' }: Props = $props();

  // Mapeamento dos sprites reais ilustrados dos garotos
  const characterSprites: Record<string, string> = {
    dante: '/assets/characters/dante.png',
    lucas: '/assets/characters/lucas.png',
    theo: '/assets/characters/theo.png'
  };

  const characterProfiles: Record<string, {
    name: string;
    title: string;
    accentColor: string;
  }> = {
    dante: {
      name: 'Dante',
      title: 'Guitarrista Rebelde • 3º Ano',
      accentColor: '#e11d48'
    },
    lucas: {
      name: 'Lucas',
      title: 'Presidente do Grêmio • 3º Ano',
      accentColor: '#2563eb'
    },
    theo: {
      name: 'Theo',
      title: 'Artista Melancólico • 2º Ano',
      accentColor: '#059669'
    },
    narrador: {
      name: 'Narrador',
      title: '',
      accentColor: '#d97706'
    }
  };

  let spriteUrl = $derived(characterSprites[speaker] || null);
  let profile = $derived(characterProfiles[speaker] || characterProfiles.narrador);
  let isLight = $derived(gameState.theme === 'light');
</script>

{#if speaker !== 'narrador' && spriteUrl}
  <div class="relative flex flex-col items-center justify-end select-none pointer-events-none transition-all duration-700">
    
    <!-- Container com Respiração Sutil (Animação de Câmera 60FPS) -->
    <div class="relative w-80 sm:w-96 md:w-[420px] h-[480px] sm:h-[540px] md:h-[600px] flex flex-col items-center justify-end animate-breathe">
      
      <!-- BUSTO ILUSTRADO REAL ESTILO VISUAL NOVEL / TEARS OF THEMIS / AMOR DOCE -->
      <img 
        src={spriteUrl} 
        alt={profile.name}
        class="w-full h-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] transition-all duration-500 rounded-3xl"
        style="-webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%); mask-image: linear-gradient(to bottom, black 85%, transparent 100%);"
      />

      <!-- Cartão Nobre de Identificação do Personagem -->
      <div 
        class="absolute -bottom-2 z-20 px-5 py-2 rounded-2xl backdrop-blur-xl border shadow-xl flex flex-col items-center gap-0.5 transition-all duration-300 {isLight ? 'bg-[#ebe4d5]/95 border-[#c5b79f] text-[#2c241e]' : 'bg-[#0d0e14]/90 border-white/8 text-[#ededef]'}"
      >
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full" style="background: {profile.accentColor};"></span>
          <h2 class="text-sm font-cinzel font-bold tracking-wider">{profile.name}</h2>
        </div>
        <p class="text-[10px] font-sans-ui tracking-wide {isLight ? 'text-stone-500' : 'text-zinc-400'} font-medium">
          {profile.title}
        </p>
      </div>

    </div>
  </div>
{/if}

<style>
  @keyframes breathe {
    0%, 100% {
      transform: translateY(0px) scale(1);
    }
    50% {
      transform: translateY(-4px) scale(1.006);
    }
  }

  .animate-breathe {
    animation: breathe 5s ease-in-out infinite;
  }
</style>
