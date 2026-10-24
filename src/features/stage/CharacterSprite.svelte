<script lang="ts">
  import type { PersonagemId } from '../dialogue/narrative.schema';
  import { gameState } from '../game-state/GameState.svelte';
  import VisualNovelActor from '../characters/VisualNovelActor.svelte';
  import ProtagonistActor from '../customization/ProtagonistActor.svelte';

  interface Props {
    speaker: PersonagemId | string;
    speakerName?: string;
    expression?: string;
    timeOfDay?: 'manha' | 'tarde' | 'entardecer' | 'noite';
    position?: 'left' | 'right' | 'center';
    isActive?: boolean;
    isSpeaking?: boolean;
    currentSpeaker?: string;
  }

  let { 
    speaker, 
    speakerName = '', 
    expression = 'neutral', 
    timeOfDay = 'manha',
    position = 'center',
    isActive = true,
    isSpeaking = false,
    currentSpeaker = ''
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
    },
    nina: {
      name: 'Nina',
      title: 'Melhor Amiga • 1º Ano',
      accentColor: '#ec4899'
    },
    helena: {
      name: 'Profª Helena Vance',
      title: 'Diretora Geral da Lótus',
      accentColor: '#8b5cf6'
    },
    melissa: {
      name: 'Melissa Prado',
      title: 'Vice-Presidente do Grêmio • 3º Ano',
      accentColor: '#38bdf8'
    },
    caio: {
      name: 'Caio',
      title: 'Baterista da Banda • 3º Ano',
      accentColor: '#f97316'
    },
    ravi: {
      name: 'Ravi',
      title: 'Monitor de Botânica • 2º Ano',
      accentColor: '#10b981'
    },
    mara: {
      name: 'Sra. Mara',
      title: 'Curadora da Biblioteca Histórica',
      accentColor: '#a855f7'
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

  // Lógica de Exibição do Crachá Flutuante de Palco:
  // 1. NUNCA exibir crachá flutuante quando o Narrador estiver falando (elimina conflito do print)
  // 2. Se a protagonista estiver falando (ou for a vez dela), exibe o crachá
  // 3. Se for um interlocutor (Dante, Lucas, Theo), exibe quando estiver ativo ou falando
  let isCharacterSpeaker = $derived.by(() => {
    if (isProtagonist) {
      return currentSpeaker === 'protagonista' || currentSpeaker === 'iris';
    }
    return currentSpeaker === speaker;
  });

  let shouldShowBadge = $derived.by(() => {
    if (currentSpeaker === 'narrador') {
      return false;
    }
    if (isProtagonist) {
      return isCharacterSpeaker || isSpeaking;
    }
    return isActive;
  });

  // Controle de Tremor de Raiva (executa no máximo 2 a 3 ciclos e cessa, sem loop infinito)
  let isAngryPulse = $state(false);
  let angryTimer: ReturnType<typeof setTimeout> | null = null;

  $effect(() => {
    const expr = (expression || '').toLowerCase();
    const isAngry = expr === 'angry' || expr === 'raiva' || expr === 'irritado' || expr === 'furious';
    
    // Dispara a animação por 2 a 3 ciclos (~750ms) ao entrar na expressão de raiva ou mudar de fala
    if (isAngry) {
      isAngryPulse = true;
      if (angryTimer) clearTimeout(angryTimer);
      angryTimer = setTimeout(() => {
        isAngryPulse = false;
      }, 750);
    } else {
      isAngryPulse = false;
      if (angryTimer) clearTimeout(angryTimer);
    }

    return () => {
      if (angryTimer) clearTimeout(angryTimer);
    };
  });

  // Lógica de Movimento & Animação:
  // - Raiva: movimento lateralizado e vertical (vn-angry-shake, limitado a 2-3x)
  // - Surpresa: salto vertical (vn-surprise-bounce)
  // - Conversa ativa: movimento suave para cima e para baixo (vn-speaking-bob)
  // - Repouso: respiração sutil (vn-breath-anim)
  let motionAnimClass = $derived.by(() => {
    const expr = (expression || '').toLowerCase();
    if (isAngryPulse) {
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
    <!-- BUSTO / CORPO DO ATOR COM PROPORÇÃO AMPLA E CENTRALIZADA ESTILO AMOR DOCE -->
    <div 
      class="relative w-72 sm:w-84 md:w-96 lg:w-[420px] h-[66vh] sm:h-[76vh] md:h-[82vh] lg:h-[84vh] max-h-[820px] flex flex-col items-center justify-end {motionAnimClass}"
    >
      
      <!-- Crachá com Nome no Topo (Posicionado Diretamente Acima do Cabelo da Personagem) -->
      {#if shouldShowBadge}
        <div 
          class="absolute top-1 sm:top-2 z-30 px-3.5 py-1 rounded-full backdrop-blur-xl border shadow-xl flex items-center gap-2 transition-all duration-300 {isLight ? 'bg-[#ebe4d5]/95 border-[#c5b79f] text-[#2c241e]' : 'bg-[#0d0e14]/90 border-amber-500/40 text-[#ededef]'}"
        >
          <span class="w-2 h-2 rounded-full shadow-sm animate-pulse" style="background: {profile.accentColor};"></span>
          <h2 class="text-xs sm:text-sm font-cinzel font-bold tracking-wider">{profile.name}</h2>
          {#if profile.title}
            <span class="opacity-35 text-[10px]">•</span>
            <p class="text-[9px] sm:text-[10px] font-sans-ui tracking-wide {isLight ? 'text-stone-600' : 'text-zinc-300'} font-medium">
              {profile.title.split('•')[0].trim()}
            </p>
          {/if}
        </div>
      {/if}

      <!-- RENDERIZAÇÃO DO ATOR CORRESPONDENTE (SUPORTE A TODOS OS 12 PERSONAGENS EM CAMADAS) -->
      {#if isProtagonist}
        <ProtagonistActor 
          outfitId={gameState.currentOutfit}
          {expression}
          scale={1}
          framing="bust"
        />
      {:else if speaker !== 'narrador'}
        <VisualNovelActor 
          characterId={speaker}
          {expression}
          isSpeaking={isSpeaking}
          scale={1}
          framing="bust"
        />
      {/if}

    </div>
  </div>
{/if}
