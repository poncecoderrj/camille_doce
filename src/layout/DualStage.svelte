<script lang="ts">
  import { gameState } from '../features/game-state/GameState.svelte';
  import CharacterSprite from '../features/stage/CharacterSprite.svelte';
  import DialogueBox from '../features/dialogue/DialogueBox.svelte';
  import PhoneShell from '../features/smartphone/PhoneShell.svelte';
  import SceneryBackground from '../features/stage/SceneryBackground.svelte';
  import CampusMapModal from '../features/campus-map/CampusMapModal.svelte';
  import cap00Data from '../../content/arcs/arco_1_adolescencia/cap_00_prologo.json';
  import type { DialogueNode, Choice } from '../features/dialogue/narrative.schema';
  import { Smartphone, RotateCcw, Sparkles, Sun, Moon, Map } from 'lucide-svelte';

  const nodes = cap00Data.nodes as unknown as Record<string, DialogueNode>;
  let currentNode = $derived(nodes[gameState.currentNodeId] || nodes['node_01_portao']);

  let isLight = $derived(gameState.theme === 'light');
  let isMapOpen = $state(false);

  function handleSelectChoice(choice: Choice) {
    gameState.applyChoice(choice, currentNode);
  }

  function restartChapter() {
    gameState.currentNodeId = 'node_00_despertador';
    gameState.currentLocation = 'Quarto da Protagonista';
    gameState.history = [];
  }

  // Atalhos de teclado no Desktop (Estilo GTA V)
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowUp' || e.key === 'p' || e.key === 'P') {
      gameState.togglePhone();
    } else if (e.key === 'm' || e.key === 'M') {
      isMapOpen = !isMapOpen;
    } else if (e.key === 'Escape') {
      if (isMapOpen) isMapOpen = false;
      else if (gameState.isPhoneRaised) gameState.isPhoneRaised = false;
    }
  }

  // Paletas Atmosféricas Confortáveis (Sem Roxos Agressivos e Sem Branco Ofuscante)
  // Modo Claro: Papel pergaminho aconchegante, linho e tons quentes de biblioteca clássica
  const lightBackgrounds: Record<string, string> = {
    'Portões de Entrada': 'radial-gradient(ellipse at 50% 10%, #eae3d2 0%, #ded4bf 55%, #cfc3ab 100%)',
    'Sala do Grêmio': 'radial-gradient(ellipse at 50% 10%, #e2e6dc 0%, #d4dad0 55%, #c4cbc0 100%)',
    'Pátio Central': 'radial-gradient(ellipse at 50% 10%, #e7dfd3 0%, #dbcfbf 55%, #ccbfae 100%)'
  };

  // Modo Escuro: Grafite aveludado, carvão fosco e meia-noite suave (Zero saturação roxa)
  const darkBackgrounds: Record<string, string> = {
    'Portões de Entrada': 'radial-gradient(ellipse at 50% 10%, #151720 0%, #0e1017 55%, #08090d 100%)',
    'Sala do Grêmio': 'radial-gradient(ellipse at 50% 10%, #11161f 0%, #0c0f16 55%, #07080d 100%)',
    'Pátio Central': 'radial-gradient(ellipse at 50% 10%, #16151b 0%, #0f0e13 55%, #08080b 100%)'
  };

  let activeBg = $derived(
    isLight 
      ? (lightBackgrounds[currentNode.location] || lightBackgrounds['Portões de Entrada'])
      : (darkBackgrounds[currentNode.location] || darkBackgrounds['Portões de Entrada'])
  );
</script>

<svelte:window onkeydown={handleKeyDown} />

<!-- CONTAINER PRINCIPAL ADAPTATIVO DUAL-MODE -->
<div 
  class="relative w-screen h-screen overflow-hidden flex flex-col justify-between select-none transition-colors duration-700 {isLight ? 'text-stone-800' : 'text-zinc-100'}"
  style="background: {activeBg}; padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom);"
>
  <!-- PÉTALAS / PARTÍCULAS ATMOSFÉRICAS SUAVES -->
  <div class="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-40">
    <div class="particle w-2.5 h-3 bg-amber-200/30 rounded-full blur-[0.5px]" style="left: 15%; top: 70%; animation-delay: 0s;"></div>
    <div class="particle w-2 h-2.5 bg-amber-300/20 rounded-full blur-[0.5px]" style="left: 45%; top: 85%; animation-delay: 2.5s;"></div>
    <div class="particle w-2.5 h-2.5 bg-stone-300/25 rounded-full blur-[0.5px]" style="left: 75%; top: 60%; animation-delay: 4.8s;"></div>
  </div>

  <!-- CABEÇALHO SUPERIOR ELEGANTE -->
  <header 
    class="w-full h-15 px-4 sm:px-8 flex items-center justify-between border-b backdrop-blur-xl z-30 transition-all {isLight ? 'bg-[#ece4d4]/90 border-[#cfc2ab] text-[#2c241e] shadow-sm' : 'bg-[#0b0c10]/85 border-white/6 text-zinc-200 shadow-xl'}"
  >
    <!-- Logo e Título do Jogo -->
    <div class="flex items-center gap-3">
      <div class="flex items-center gap-2.5">
        <span class="w-2.5 h-2.5 rounded-full {isLight ? 'bg-amber-700' : 'bg-amber-500'} shadow-sm"></span>
        <h1 class="text-sm sm:text-base font-cinzel font-extrabold tracking-widest uppercase {isLight ? 'text-[#2a221b]' : 'text-zinc-100'}">
          Entre Sinos
        </h1>
      </div>
      <span class="opacity-30">•</span>
      <span class="text-xs font-serif-romance italic {isLight ? 'text-[#68594b]' : 'text-zinc-400'}">
        {cap00Data.title}
      </span>
    </div>

    <!-- Indicador de Afinidade dos Rapazes & Alternador de Tema -->
    <div class="flex items-center gap-2 sm:gap-4">
      
      <!-- Luvômetro Resumo no Topo -->
      <div class="flex items-center gap-2 sm:gap-3 px-3.5 py-1.5 rounded-full border backdrop-blur-md text-xs font-cinzel font-bold {isLight ? 'bg-[#e4dbca]/90 border-[#c5b8a0] text-[#332b23]' : 'bg-[#14161f]/80 border-white/8 text-zinc-300'}">
        <span class="text-rose-500 flex items-center gap-1">Dante {gameState.affinity.dante}</span>
        <span class="opacity-20">|</span>
        <span class="text-blue-500 flex items-center gap-1">Lucas {gameState.affinity.lucas}</span>
        <span class="opacity-20">|</span>
        <span class="text-emerald-500 flex items-center gap-1">Theo {gameState.affinity.theo}</span>
      </div>

      <!-- Moedas In-Game -->
      <div class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold {isLight ? 'bg-[#ded4c1] border-[#baa88e] text-[#4d3824]' : 'bg-amber-500/10 border-amber-500/20 text-amber-300'}">
        <Sparkles class="w-3.5 h-3.5" />
        <span>◈ {gameState.coins}</span>
      </div>

      <!-- BOTÃO MAPA DO CAMPUS -->
      <button 
        onclick={() => isMapOpen = true}
        title="Abrir Mapa do Campus (M)"
        class="px-3 py-1.5 rounded-xl border transition-all active:scale-95 text-xs flex items-center gap-1.5 font-cinzel font-semibold {isLight ? 'bg-[#e0d6c4] hover:bg-[#d5c9b4] border-[#baa991] text-[#3d3126]' : 'bg-[#181a24] hover:bg-[#202330] border-white/8 text-zinc-200'}"
      >
        <Map class="w-3.5 h-3.5 text-amber-500" />
        <span class="hidden sm:inline">Mapa</span>
      </button>

      <!-- BOTÃO DE TEMA: LIGHT / DARK -->
      <button 
        onclick={() => gameState.toggleTheme()}
        title="Alternar Tema Claro / Escuro"
        class="p-2 rounded-xl border transition-all active:scale-95 text-xs flex items-center gap-1.5 font-medium {isLight ? 'bg-[#e0d6c4] hover:bg-[#d5c9b4] border-[#baa991] text-[#3d3126]' : 'bg-[#181a24] hover:bg-[#202330] border-white/8 text-amber-300'}"
      >
        {#if isLight}
          <Sun class="w-4 h-4 text-amber-700" />
        {:else}
          <Moon class="w-4 h-4 text-zinc-300" />
        {/if}
      </button>

      <!-- Botão Reiniciar -->
      <button 
        onclick={restartChapter}
        title="Reiniciar Prólogo"
        class="p-2 rounded-xl border transition-all active:scale-95 text-xs {isLight ? 'bg-[#e0d6c4] hover:bg-[#d5c9b4] border-[#baa991] text-[#4a3d31]' : 'bg-[#181a24] hover:bg-[#202330] border-white/8 text-zinc-400 hover:text-white'}"
      >
        <RotateCcw class="w-3.5 h-3.5" />
      </button>
    </div>
  </header>

  <!-- PALCO PRINCIPAL DE JOGO (CENÁRIO ILUSTRADO + BUSTO + DIÁLOGO) -->
  <main class="flex-1 w-full max-w-6xl mx-auto flex flex-col justify-between items-center relative overflow-hidden px-2 sm:px-6 pb-2 sm:pb-4 z-20 rounded-3xl border {isLight ? 'border-[#cfbfab]' : 'border-white/8'} shadow-2xl">
    
    <!-- CENÁRIO ILUSTRADO DE FUNDO (QUARTO, PORTÕES, SALA DO GRÊMIO, PÁTIO) -->
    <SceneryBackground 
      location={currentNode.location} 
      timeOfDay={currentNode.time_of_day} 
      {isLight} 
    />

    <!-- EFEITO DE LANTERNA DO CELULAR (QUANDO ATIVADA NO CELULAR) -->
    {#if gameState.isFlashlightOn}
      <div 
        class="absolute inset-0 pointer-events-none z-15 transition-opacity duration-500 animate-pulse"
        style="background: radial-gradient(circle at 65% 55%, rgba(255, 252, 225, 0.35) 0%, rgba(255, 245, 195, 0.15) 40%, rgba(0, 0, 0, 0.35) 85%); mix-blend-mode: screen;"
      ></div>
    {/if}

    <!-- ÁREA VISUAL DO PERSONAGEM (SOBREPOSTO AO CENÁRIO) -->
    <div class="flex-1 w-full flex items-end justify-center pb-1 sm:pb-3 z-10">
      <CharacterSprite 
        speaker={currentNode.speaker}
        speakerName={currentNode.speaker_name}
        expression={currentNode.expression}
        timeOfDay={currentNode.time_of_day}
      />
    </div>

    <!-- CAIXA DE DIÁLOGO E ESCOLHAS -->
    <div class="w-full z-20">
      <DialogueBox 
        node={currentNode}
        onSelectChoice={handleSelectChoice}
        onTogglePhone={() => gameState.togglePhone()}
        onOpenHistory={() => {}}
      />
    </div>
  </main>

  <!-- ================= O SMARTPHONE ESTILO GTA V ================= -->
  <!-- 
    No GTA V: O celular sobe suavemente pelo canto inferior direito da tela ao apertar a tecla de seta para cima ou no botão.
  -->
  <div class="fixed bottom-0 right-4 sm:right-10 z-50 flex flex-col items-end pointer-events-none">
    
    <!-- CORPO DO CELULAR COM ANIMAÇÃO GTA V PUSH-UP -->
    {#if gameState.isPhoneRaised}
      <div class="pointer-events-auto gta-phone-enter mb-2">
        <PhoneShell onClose={() => gameState.isPhoneRaised = false} />
      </div>
    {/if}

    <!-- GATILHO DO CELULAR NO CANTO INFERIOR DIREITO (ESTILO GTA V) -->
    {#if !gameState.isPhoneRaised}
      <button 
        onclick={() => gameState.togglePhone()}
        class="pointer-events-auto mb-3 px-4 py-2.5 rounded-full border shadow-2xl backdrop-blur-xl flex items-center gap-2.5 font-sans-ui font-semibold text-xs transition-all duration-300 hover:-translate-y-1 active:scale-95 {isLight ? 'bg-[#7c5b36] hover:bg-[#6c4e2e] text-[#faf6ee] border-[#9c7546]' : 'bg-[#181a24] hover:bg-[#202330] text-zinc-200 border-white/10 hover:border-amber-400/30'}"
      >
        <Smartphone class="w-4 h-4 text-amber-400" />
        <span>Celular</span>
        <span class="hidden sm:inline text-[10px] opacity-60 font-normal">(Pressione ↑)</span>
        {#if gameState.unreadNotification}
          <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
        {/if}
      </button>
    {/if}
  </div>

  <!-- MODAL MAPA DO CAMPUS (TELA S03) -->
  {#if isMapOpen}
    <CampusMapModal onClose={() => isMapOpen = false} />
  {/if}

</div>
