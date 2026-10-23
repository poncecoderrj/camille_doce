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
  }

  let { speaker, speakerName = '', expression = 'neutro', timeOfDay = 'manha' }: Props = $props();

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
    return characterProfiles[speaker] || characterProfiles.narrador;
  });
  let isLight = $derived(gameState.theme === 'light');
  let isProtagonist = $derived(speaker === 'protagonista' || speaker === 'iris');
</script>

{#if speaker !== 'narrador'}
  <!-- PALCO PRINCIPAL DE ATOR DE VISUAL NOVEL (SPRITE ÚNICO, ZERO SOBREPOSIÇÃO) -->
  <div class="relative flex flex-col items-center justify-end select-none pointer-events-none transition-all duration-700">
    <div class="relative w-72 sm:w-80 md:w-96 lg:w-[410px] h-[50vh] sm:h-[58vh] md:h-[66vh] max-h-[600px] flex flex-col items-center justify-end">
      
      <!-- RENDERIZAÇÃO DO ATOR CORRESPONDENTE (SPRITE ÚNICO) -->
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

      <!-- Cartão de Identificação do Personagem na Cena -->
      <div 
        class="absolute -bottom-2 z-30 px-5 py-2 rounded-2xl backdrop-blur-xl border shadow-xl flex flex-col items-center gap-0.5 transition-all duration-300 {isLight ? 'bg-[#ebe4d5]/95 border-[#c5b79f] text-[#2c241e]' : 'bg-[#0d0e14]/90 border-white/8 text-[#ededef]'}"
      >
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full" style="background: {profile.accentColor};"></span>
          <h2 class="text-sm font-cinzel font-bold tracking-wider">{profile.name}</h2>
        </div>
        {#if profile.title}
          <p class="text-[10px] font-sans-ui tracking-wide {isLight ? 'text-stone-500' : 'text-zinc-400'} font-medium">
            {profile.title}
          </p>
        {/if}
      </div>

    </div>
  </div>
{/if}
