<script lang="ts">
  import { gameState } from '../features/game-state/GameState.svelte';
  import { audioManager } from '../features/audio/audio-manager';
  import CharacterSprite from '../features/stage/CharacterSprite.svelte';
  import LuvometroVertical from '../features/stage/LuvometroVertical.svelte';
  import StageSpeechBubble from '../features/stage/StageSpeechBubble.svelte';
  import DialogueBox from '../features/dialogue/DialogueBox.svelte';
  import PhoneShell from '../features/smartphone/PhoneShell.svelte';
  import SceneryBackground from '../features/stage/SceneryBackground.svelte';
  import CampusMapModal from '../features/campus-map/CampusMapModal.svelte';
  import { resolveEnvironmentLighting } from '../features/stage/environment-lighting';
  import type { TimeOfDay } from '../features/stage/environment-lighting';
  import { ALL_STORY_NODES, getStoryNode, getChapterForNode, CHAPTER_LIST } from '../features/dialogue/story-manifest';
  import type { DialogueNode, Choice } from '../features/dialogue/narrative.schema';
  import { 
    Smartphone, 
    RotateCcw, 
    Sparkles, 
    Sun, 
    Moon, 
    Map, 
    Volume2, 
    VolumeX, 
    Home, 
    Compass 
  } from 'lucide-svelte';

  let currentNode = $derived(getStoryNode(gameState.currentNodeId));

  let currentChapterTitle = $derived.by(() => {
    const chId = getChapterForNode(currentNode.id);
    const ch = CHAPTER_LIST.find(c => c.id === chId);
    return ch ? ch.title : 'Arco 1: Adolescência';
  });

  const knownBoyIds = ['dante', 'lucas', 'theo', 'nina', 'helena', 'melissa', 'caio', 'ravi', 'mara', 'rafael', 'beatriz'];

  // Detecta se há um interlocutor presente na cena (Dante, Lucas, Theo, etc.)
  let interlocutorId = $derived.by(() => {
    if (knownBoyIds.includes(currentNode.speaker)) {
      return currentNode.speaker;
    }
    const targetChoice = currentNode.choices.find(c => c.target_character && knownBoyIds.includes(c.target_character));
    if (targetChoice && targetChoice.target_character) {
      return targetChoice.target_character;
    }
    if (gameState.currentInterlocutorId && !currentNode.location.includes('Quarto') && !currentNode.id.includes('node_00')) {
      return gameState.currentInterlocutorId;
    }
    return null;
  });

  $effect(() => {
    if (knownBoyIds.includes(currentNode.speaker)) {
      gameState.currentInterlocutorId = currentNode.speaker;
    } else if (currentNode.location.includes('Quarto') || currentNode.id.includes('node_00')) {
      gameState.currentInterlocutorId = null;
    }
  });

  // Motor de Iluminação Ambiental Dinâmica (Dia/Noite e Luminosidade Específica do Cenário)
  let lighting = $derived(
    resolveEnvironmentLighting(
      currentNode.location,
      currentNode.time_of_day as TimeOfDay,
      gameState.isFlashlightOn,
      gameState.themeMode
    )
  );

  let isLight = $derived(lighting.isLightUI);
  let isMapOpen = $state(false);

  function handleSelectChoice(choice: Choice) {
    if (choice.id === 'c0_abrir_closet_interativo' || choice.id === 'c0_traje_classico') {
      gameState.setOutfit('uniforme_lotus');
    } else if (choice.id === 'c0_traje_rock') {
      gameState.setOutfit('look_rock');
    } else if (choice.id === 'c0_traje_vintage') {
      gameState.setOutfit('look_romantico');
    }
    gameState.applyChoice(choice, currentNode);
  }

  function restartChapter() {
    gameState.currentNodeId = 'node_00_despertador';
    gameState.currentLocation = 'Quarto da Protagonista';
    gameState.flags.alarme_desligado = false;
    gameState.flags.msg_nina_mochila_enviada = false;
    gameState.flags.msg_nina_portao_enviada = false;
    gameState.flags.msg_lucas_atrio_enviada = false;
    gameState.flags.msg_nina_aula_enviada = false;
    gameState.flags.msg_convite_noite_enviada = false;
    delete gameState.flags.zap_ignorado_nina;
    delete gameState.flags.ignorou_zap_nina;
    delete gameState.flags.deixou_no_vacuo_nina;
    delete gameState.flags.zap_ignorado_lucas;
    delete gameState.flags.ignorou_zap_lucas;
    delete gameState.flags.deixou_no_vacuo_lucas;
    gameState.currentInterlocutorId = null;
    gameState.history = [];
    gameState.unreadNotification = null;
    gameState.whatsappChats = {};
    gameState.whatsappPendingReplies = {};
    gameState.whatsappTyping = {};
    audioManager.playBell();
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

  let activeBg = $derived(lighting.bgGradient);
</script>

<svelte:window onkeydown={handleKeyDown} />

<!-- CONTAINER PRINCIPAL ADAPTATIVO DUAL-MODE -->
<div 
  class="relative w-screen h-screen overflow-hidden flex flex-col justify-between select-none transition-colors duration-700 {isLight ? 'text-stone-800' : 'text-zinc-100'}"
  style="background: {activeBg}; padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom);"
>
  <!-- PÉTALAS / PARTÍCULAS ATMOSFÉRICAS SUAVES -->
  <div class="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-40">
    <div class="particle w-2.5 h-3 rounded-full blur-[0.5px]" style="background: {lighting.particleColor}; left: 15%; top: 70%; animation-delay: 0s;"></div>
    <div class="particle w-2 h-2.5 rounded-full blur-[0.5px]" style="background: {lighting.particleColor}; left: 45%; top: 85%; animation-delay: 2.5s;"></div>
    <div class="particle w-2.5 h-2.5 rounded-full blur-[0.5px]" style="background: {lighting.particleColor}; left: 75%; top: 60%; animation-delay: 4.8s;"></div>
  </div>

  <!-- CABEÇALHO SUPERIOR ELEGANTE -->
  <header 
    class="w-full h-15 px-3 sm:px-8 flex items-center justify-between border-b backdrop-blur-xl z-30 transition-all {isLight ? 'bg-[#ece4d4]/90 border-[#cfc2ab] text-[#2c241e] shadow-sm' : 'bg-[#0b0c10]/85 border-white/6 text-zinc-200 shadow-xl'}"
  >
    <!-- Logo e Título do Jogo -->
    <div class="flex items-center gap-3">
      <!-- Botão Menu Principal -->
      <button 
        onclick={() => gameState.returnToMenu()}
        title="Voltar para a Tela Inicial / Menu Principal"
        class="p-2 rounded-xl border transition-all active:scale-95 text-xs flex items-center gap-1.5 {isLight ? 'bg-[#e0d6c4] hover:bg-[#d5c9b4] border-[#baa991] text-[#3d3126]' : 'bg-[#181a24] hover:bg-[#202330] border-white/8 text-zinc-300'}"
      >
        <Home class="w-4 h-4 text-amber-500" />
      </button>

      <div class="flex items-center gap-2.5">
        <span class="w-2.5 h-2.5 rounded-full {isLight ? 'bg-amber-700' : 'bg-amber-500'} shadow-sm"></span>
        <h1 class="text-sm sm:text-base font-cinzel font-extrabold tracking-widest uppercase {isLight ? 'text-[#2a221b]' : 'text-zinc-100'}">
          Entre Sinos
        </h1>
      </div>
      <span class="opacity-30 hidden sm:inline">•</span>
      <span class="text-xs font-serif-romance italic hidden sm:inline {isLight ? 'text-[#68594b]' : 'text-zinc-400'}">
        {currentChapterTitle}
      </span>
    </div>

    <!-- Indicador de Afinidade dos Rapazes & Alternador de Tema -->
    <div class="flex items-center gap-1.5 sm:gap-3">
      
      <!-- CARD DA PROTAGONISTA (ESTILO AMOR DOCE: AVATAR + NOME + ANO) -->
      <div class="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-md text-xs transition-all {isLight ? 'bg-[#e4dbca]/90 border-[#c5b8a0] text-[#332b23]' : 'bg-[#14161f]/80 border-white/8 text-zinc-200'}">
        <div class="w-5 h-5 rounded-full overflow-hidden border border-amber-500/50 bg-amber-500/20 flex items-center justify-center shrink-0">
          <span class="text-[10px]">🌸</span>
        </div>
        <span class="font-cinzel font-bold text-amber-500">{gameState.protagonistProfile?.name || 'Íris'}</span>
        <span class="opacity-25">•</span>
        <span class="text-[10px] font-sans-ui opacity-75">1º Ano</span>
      </div>

      <!-- Luvômetro Resumo no Topo -->
      <div class="hidden md:flex items-center gap-2 sm:gap-3 px-3 py-1.5 rounded-full border backdrop-blur-md text-xs font-cinzel font-bold {isLight ? 'bg-[#e4dbca]/90 border-[#c5b8a0] text-[#332b23]' : 'bg-[#14161f]/80 border-white/8 text-zinc-300'}">
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

      <!-- BOTÃO MÚSICA ON/OFF RÁPIDO -->
      <button 
        onclick={() => gameState.setMusicEnabled(!gameState.musicEnabled)}
        title={gameState.musicEnabled ? 'Desativar Música Ambiente' : 'Ativar Música Ambiente'}
        class="p-2 rounded-xl border transition-all active:scale-95 text-xs flex items-center justify-center {isLight ? 'bg-[#e0d6c4] hover:bg-[#d5c9b4] border-[#baa991] text-[#3d3126]' : 'bg-[#181a24] hover:bg-[#202330] border-white/8 text-zinc-300'}"
      >
        {#if gameState.musicEnabled}
          <Volume2 class="w-4 h-4 text-amber-500" />
        {:else}
          <VolumeX class="w-4 h-4 text-zinc-500" />
        {/if}
      </button>

      <!-- BOTÃO MAPA DO CAMPUS -->
      <button 
        onclick={() => isMapOpen = true}
        title="Abrir Mapa do Campus (M)"
        class="px-2.5 sm:px-3 py-1.5 rounded-xl border transition-all active:scale-95 text-xs flex items-center gap-1.5 font-cinzel font-semibold {isLight ? 'bg-[#e0d6c4] hover:bg-[#d5c9b4] border-[#baa991] text-[#3d3126]' : 'bg-[#181a24] hover:bg-[#202330] border-white/8 text-zinc-200'}"
      >
        <Map class="w-3.5 h-3.5 text-amber-500" />
        <span class="hidden sm:inline">Mapa</span>
      </button>

      <!-- BOTÃO DE TEMA: AUTO (CENÁRIO) / CLARO / ESCURO -->
      <button 
        onclick={() => gameState.toggleTheme()}
        title="Modo de Tema: {gameState.themeMode === 'auto' ? 'Automático por Cenário e Horário' : gameState.themeMode === 'light' ? 'Claro Fixo' : 'Escuro Fixo'}"
        class="p-2 rounded-xl border transition-all active:scale-95 text-xs flex items-center gap-1 font-medium {isLight ? 'bg-[#e0d6c4] hover:bg-[#d5c9b4] border-[#baa991] text-[#3d3126]' : 'bg-[#181a24] hover:bg-[#202330] border-white/8 text-amber-300'}"
      >
        {#if gameState.themeMode === 'auto'}
          <Compass class="w-4 h-4 text-amber-500" />
        {:else if gameState.themeMode === 'light'}
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
  <main class="flex-1 w-full max-w-6xl mx-auto flex flex-col justify-end items-center relative overflow-hidden px-2 sm:px-6 pb-2 sm:pb-3 z-20 rounded-3xl border {isLight ? 'border-[#cfbfab]' : 'border-white/8'} shadow-2xl">
    
    <!-- CENÁRIO ILUSTRADO DE FUNDO (QUARTO, PORTÕES, SALA DO GRÊMIO, PÁTIO) -->
    <SceneryBackground 
      location={currentNode.location} 
      timeOfDay={currentNode.time_of_day} 
      {isLight} 
    />

    <!-- INDICADOR DE LOCALIZAÇÃO E HORÁRIO NO CANTO SUPERIOR AO MEIO DA TELA (CONFORME PEDIDO) -->
    <div class="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
      <div 
        class="px-5 py-1.5 rounded-full border backdrop-blur-xl shadow-xl flex items-center gap-2.5 font-cinzel text-xs font-bold tracking-widest uppercase transition-all duration-500 {isLight ? 'bg-[#ece4d4]/90 border-[#cfbfab] text-[#332a21]' : 'bg-[#0d0e14]/85 border-white/10 text-zinc-200'}"
      >
        <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
        <span class="tracking-widest">{currentNode.location}</span>
        <span class="opacity-30">•</span>
        <span class="text-[10px] tracking-normal font-sans-ui font-semibold opacity-75">
          {currentNode.time_of_day === 'manha' ? 'Manhã' : currentNode.time_of_day === 'tarde' ? 'Tarde' : currentNode.time_of_day === 'entardecer' ? 'Entardecer' : 'Noite'}
        </span>
      </div>
    </div>

    <!-- ALERTA / INTERAÇÃO OBRIGATÓRIA DE TELEFONE (ALARME DO DESPERTADOR) -->
    {#if currentNode.id === 'node_00_despertador' && !gameState.flags.alarme_desligado}
      <div class="absolute top-16 left-1/2 -translate-x-1/2 z-35 pointer-events-auto w-11/12 max-w-md">
        <div class="alarm-vibrate p-3.5 rounded-2xl bg-black/90 backdrop-blur-xl border border-amber-500/40 shadow-2xl flex items-center justify-between gap-3 text-white">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Smartphone class="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p class="text-[10px] font-cinzel font-bold text-amber-400 uppercase tracking-wider">06:45 • Celular Tocando</p>
              <p class="text-xs font-sans-ui text-zinc-200 font-medium">Alarme: Primeiro Dia na Lótus</p>
            </div>
          </div>
          <button 
            onclick={() => gameState.dismissAlarm()}
            class="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-stone-950 font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all"
          >
            Desligar
          </button>
        </div>
      </div>
    {/if}

    <!-- NOTIFICAÇÃO FLUTUANTE DE WHATSAPP NO PALCO (CHEGA NO TOPO E AUTO-DESVANECE) -->
    {#if gameState.unreadNotification}
      <div class="absolute top-16 left-1/2 -translate-x-1/2 z-40 pointer-events-auto w-11/12 max-w-md transition-all duration-300 animate-in fade-in slide-in-from-top-4">
        <div class="p-3 rounded-2xl bg-[#0f111a]/95 backdrop-blur-xl border border-emerald-500/50 shadow-2xl flex items-center justify-between gap-3 text-white">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow">
              <Smartphone class="w-5 h-5" />
            </div>
            <div>
              <p class="text-[10px] font-sans text-emerald-400 font-semibold uppercase tracking-wider">WhatsApp • Nova Mensagem</p>
              <p class="text-xs font-sans-ui text-zinc-100 font-medium truncate max-w-[200px]">{gameState.unreadNotification}</p>
            </div>
          </div>
          <div class="flex items-center gap-1.5">
            <button 
              onclick={() => {
                gameState.isPhoneRaised = true;
                gameState.openPhoneApp('chat_room', gameState.activeChatTarget);
              }}
              class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-cinzel font-bold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all"
            >
              Ver
            </button>
            <button 
              onclick={() => gameState.dismissWhatsAppNotification()}
              class="p-1.5 rounded-xl border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-all text-xs"
              title="Ignorar notificação"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    {/if}

    <!-- EFEITO DE LANTERNA DO CELULAR (QUANDO ATIVADA NO CELULAR) -->
    {#if gameState.isFlashlightOn}
      <div 
        class="absolute inset-0 pointer-events-none z-15 transition-opacity duration-500 animate-pulse"
        style="background: radial-gradient(circle at 65% 55%, rgba(255, 252, 225, 0.35) 0%, rgba(255, 245, 195, 0.15) 40%, rgba(0, 0, 0, 0.35) 85%); mix-blend-mode: screen;"
      ></div>
    {/if}

    <!-- BALÃO DE FALA ESTILO AMOR DOCE QUANDO O INTERLOCUTOR ESTIVER FALANDO -->
    {#if interlocutorId && currentNode.speaker === interlocutorId && !gameState.isPhoneRaised}
      <StageSpeechBubble 
        text={currentNode.text}
        speakerName={currentNode.speaker_name || (interlocutorId === 'dante' ? 'Dante' : interlocutorId === 'lucas' ? 'Lucas' : interlocutorId === 'theo' ? 'Theo' : interlocutorId)}
        accentColor={interlocutorId === 'dante' ? '#e11d48' : interlocutorId === 'lucas' ? '#2563eb' : '#059669'}
      />
    {/if}

    <!-- LUVÔMETRO VERTICAL NA BORDA DIREITA (ESTILO AMOR DOCE) -->
    <LuvometroVertical characterId={interlocutorId} />

    <!-- CAMADA DOS PERSONAGENS (INTERLOCUTOR NO PALCO ESTILO AMOR DOCE) -->
    <div class="absolute inset-x-0 bottom-0 top-4 flex items-end justify-center sm:justify-end px-4 sm:px-12 md:px-16 pointer-events-none z-10 overflow-hidden">
      
      <!-- INTERLOCUTOR (DANTE, LUCAS, THEO NO PALCO PRINCIPAL) -->
      {#if interlocutorId}
        <div class="flex items-end justify-center sm:justify-end">
          <CharacterSprite 
            speaker={interlocutorId}
            speakerName={currentNode.speaker === interlocutorId ? currentNode.speaker_name : undefined}
            position="right"
            isActive={currentNode.speaker === interlocutorId || true}
            isSpeaking={currentNode.speaker === interlocutorId && gameState.isSpeaking}
            currentSpeaker={currentNode.speaker}
            expression={currentNode.speaker === interlocutorId ? currentNode.expression : 'neutral'}
            timeOfDay={currentNode.time_of_day}
          />
        </div>
      {/if}

    </div>

    <!-- CAIXA DE DIÁLOGO E ESCOLHAS (ESTÁVEL NA BASE DO PALCO, Z-INDEX 20) -->
    <div class="w-full z-20 pointer-events-auto">
      <DialogueBox 
        node={currentNode}
        onSelectChoice={handleSelectChoice}
        onTogglePhone={() => gameState.togglePhone()}
        onOpenHistory={() => {}}
        onRollback={() => gameState.rollbackPreviousNode()}
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
