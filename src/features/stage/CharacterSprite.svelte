<script lang="ts">
  import type { PersonagemId } from '../dialogue/narrative.schema';
  import { gameState } from '../game-state/GameState.svelte';
  import VisualNovelActor from '../characters/VisualNovelActor.svelte';
  import ProtagonistActor from '../customization/ProtagonistActor.svelte';

  interface Props {
    speaker: PersonagemId;
    speakerName?: string;
    expression?: string;
    timeOfDay?: 'manha' | 'tarde' | 'entardecer' | 'noite';
    position?: 'left' | 'right' | 'center';
    isActive?: boolean;
    isSpeaking?: boolean;
  }

  let { 
    speaker, 
    speakerName = '', 
    expression = 'neutral', 
    timeOfDay = 'manha',
    position = 'center',
    isActive = true,
    isSpeaking = false
  }: Props = $props();

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
    protagonista: {
      name: 'Íris',
      title: 'Protagonista • 1º Ano',
      accentColor: '#d97706'
    },
    iris: {
      name: 'Íris',
      title: 'Protagonista • 1º Ano',
      accentColor: '#d97706'
    },
    narrador: {
      name: 'Narrador',
      title: '',
      accentColor: '#d97706'
    }
  };

  let profile = $derived.by(() => {
    if (speaker === 'protagonista' || speaker === 'iris') {
      return {
        name: gameState.protagonistProfile?.name || 'Íris',
        title: 'Protagonista • 1º Ano',
        accentColor: '#d97706'
      };
    }
    return characterProfiles[speaker] || {
      name: speakerName || speaker,
      title: '',
      accentColor: '#d97706'
    };
  });

  let isLight = $derived(gameState.theme === 'light');
  let isProtagonist = $derived(speaker === 'protagonista' || speaker === 'iris');

  // Lógica de Movimento & Animação Conforme Pedido pelo Usuário:
  // - Raiva: movimento lateralizado (vn-angry-shake)
  // - Surpresa: salto vertical (vn-surprise-bounce)
  // - Conversa ativa: movimento suave para cima e para baixo (vn-speaking-bob)
  // - Repouso: respiração sutil (vn-breath-anim)
  let motionAnimClass = $derived.by(() => {
    const expr = (expression || '').toLowerCase();
    if (expr === 'angry' || expr === 'raiva' || expr === 'irritado') {
      return 'vn-angry-shake';
    }
    if (expr === 'surprised' || expr === 'surpresa' || expr === 'chocado') {
      return 'vn-surprise-bounce';
    }
    if (isSpeaking) {
      return 'vn-speaking-bob';
    }
    return 'vn-breath-anim';
  });

  // Animação de entrada lateralizada
  let enterClass = $derived(
    position === 'left' ? 'vn-enter-left' : position === 'right' ? 'vn-enter-right' : ''
  );
</script>

{#if speaker !== 'narrador'}
  <!-- CONTÊINER DO ATOR COM TRANSIÇÃO, ENTRADA E ANIMAÇÃO DE MOVIMENTO -->
  <div 
    class="relative flex flex-col items-center justify-end select-none pointer-events-none transition-all duration-500 {enterClass} {isActive ? 'z-20 opacity-100 scale-100' : 'z-10 opacity-70 filter brightness-[0.75] contrast-[0.95] scale-[0.97]'}"
  >
    <!-- BUSTO / CORPO DO ATOR COM MOVIMENTO ESPECÍFICO APLICADO -->
    <div 
      class="relative w-64 sm:w-72 md:w-84 lg:w-[370px] h-[48vh] sm:h-[55vh] md:h-[62vh] max-h-[580px] flex flex-col items-center justify-end {motionAnimClass}"
    >
      
      <!-- RENDERIZAÇÃO DO ATOR CORRESPONDENTE (SPRITE ÚNICO, ZERO DUPLICIDADE) -->
      {#if isProtagonist}
        <ProtagonistActor 
          outfitId={gameState.currentOutfit}
          scale={1}
        />
      {:else if speaker === 'dante' || speaker === 'lucas' || speaker === 'theo'}
        <VisualNovelActor 
          characterId={speaker}
          {expression}
          scale={1}
        />
      {/if}

      <!-- Crachá Elegante do Personagem no Palco -->
      {#if isActive}
        <div 
          class="absolute -bottom-2 z-30 px-4 py-1.5 rounded-2xl backdrop-blur-xl border shadow-xl flex flex-col items-center gap-0.5 transition-all duration-300 {isLight ? 'bg-[#ebe4d5]/95 border-[#c5b79f] text-[#2c241e]' : 'bg-[#0d0e14]/90 border-white/10 text-[#ededef]'}"
        >
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full shadow-sm animate-pulse" style="background: {profile.accentColor};"></span>
            <h2 class="text-xs sm:text-sm font-cinzel font-bold tracking-wider">{profile.name}</h2>
          </div>
          {#if profile.title}
            <p class="text-[9px] sm:text-[10px] font-sans-ui tracking-wide {isLight ? 'text-stone-500' : 'text-zinc-400'} font-medium">
              {profile.title}
            </p>
          {/if}
        </div>
      {/if}

    </div>
  </div>
{/if}