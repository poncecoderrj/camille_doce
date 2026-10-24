<script lang="ts">
  import type { DialogueNode, Choice } from './narrative.schema';
  import { gameState } from '../game-state/GameState.svelte';
  import { audioManager } from '../audio/audio-manager';
  import ProtagonistAvatarSphere from '../stage/ProtagonistAvatarSphere.svelte';
  import { Smartphone, History, RotateCcw, ChevronRight, Sparkles, Bell } from 'lucide-svelte';

  interface Props {
    node: DialogueNode;
    onSelectChoice: (choice: Choice) => void;
    onTogglePhone?: () => void;
    onOpenHistory?: () => void;
    onRollback?: () => void;
  }

  let { node, onSelectChoice, onTogglePhone, onOpenHistory, onRollback }: Props = $props();

  let displayedText = $state('');
  let isTyping = $state(false);
  let typingTimer: any = null;

  let isLight = $derived(gameState.theme === 'light');
  let canRollback = $derived(gameState.history.length > 0);
  let isAlarmBlocked = $derived(node.id === 'node_00_despertador' && !gameState.flags.alarme_desligado);
  let hasChoices = $derived(!isTyping && !isAlarmBlocked && node.choices.length > 0);
  let isProtagonistSpeaking = $derived(node.speaker === 'protagonista' || node.speaker === 'iris');

  // Sincroniza a fala em tempo real com o motor de animação labial (Lip-Sync)
  $effect(() => {
    gameState.isSpeaking = isTyping;
  });

  // Substituição dinâmica do nome da personagem caso personalizada pelo jogador
  let processedText = $derived.by(() => {
    const charName = gameState.protagonistProfile?.name?.trim() || 'Íris';
    if (!node.text) return '';
    return node.text.replace(/\bÍris\b/g, charName);
  });

  // Digitação suave progressiva
  $effect(() => {
    const fullText = processedText;
    displayedText = '';
    isTyping = true;
    let charIndex = 0;

    if (typingTimer) clearInterval(typingTimer);

    typingTimer = setInterval(() => {
      if (charIndex < fullText.length) {
        displayedText += fullText[charIndex];
        charIndex++;
      } else {
        isTyping = false;
        clearInterval(typingTimer);
      }
    }, 1000 / gameState.textSpeed);

    return () => {
      if (typingTimer) clearInterval(typingTimer);
    };
  });

  function completeTextOrAdvance() {
    if (gameState.isPhoneRaised) {
      gameState.isPhoneRaised = false;
    }
    if (isTyping) {
      if (typingTimer) clearInterval(typingTimer);
      displayedText = processedText;
      isTyping = false;
    }
  }

  // Cores de destaque dos personagens
  const speakerAccents: Record<string, { bg: string; text: string; border: string; dot: string }> = {
    dante: { bg: 'bg-[#3b0808]/90', text: 'text-rose-200', border: 'border-rose-900/60', dot: 'bg-rose-500' },
    lucas: { bg: 'bg-[#0b172a]/90', text: 'text-blue-200', border: 'border-blue-900/60', dot: 'bg-blue-500' },
    theo: { bg: 'bg-[#032418]/90', text: 'text-emerald-200', border: 'border-emerald-900/60', dot: 'bg-emerald-500' },
    protagonista: { bg: 'bg-[#3b1222]/90', text: 'text-rose-200', border: 'border-rose-500/60', dot: 'bg-rose-400' },
    iris: { bg: 'bg-[#3b1222]/90', text: 'text-rose-200', border: 'border-rose-500/60', dot: 'bg-rose-400' },
    narrador: { bg: 'bg-[#1c1917]/90', text: 'text-amber-100', border: 'border-stone-700/60', dot: 'bg-amber-400' },
    nina: { bg: 'bg-[#3b0f2e]/90', text: 'text-pink-200', border: 'border-pink-800/60', dot: 'bg-pink-400' },
    helena: { bg: 'bg-[#2a133d]/90', text: 'text-purple-200', border: 'border-purple-800/60', dot: 'bg-purple-400' },
    melissa: { bg: 'bg-[#0c223d]/90', text: 'text-sky-200', border: 'border-sky-800/60', dot: 'bg-sky-400' },
    caio: { bg: 'bg-[#3d200c]/90', text: 'text-orange-200', border: 'border-orange-800/60', dot: 'bg-orange-400' },
    ravi: { bg: 'bg-[#0e3328]/90', text: 'text-teal-200', border: 'border-teal-800/60', dot: 'bg-teal-400' },
    mara: { bg: 'bg-[#2d1b38]/90', text: 'text-violet-200', border: 'border-violet-800/60', dot: 'bg-violet-400' }
  };

  let speakerAccent = $derived(speakerAccents[node.speaker] || speakerAccents.narrador);

  const CHOICE_LETTERS = ['A', 'B', 'C', 'D', 'E'];
</script>

<!-- LAYOUT UI/UX INSPIRADO EM AMOR DOCE: ESFERA DA PROTAGONISTA À ESQUERDA + DIÁLOGOS/AÇÕES À DIREITA -->
<div class="relative w-full max-w-5xl mx-auto px-2 sm:px-4 pb-2 sm:pb-3 select-none flex items-end gap-2.5 sm:gap-4 md:gap-5">
  
  <!-- 1. ESFERA DA PERSONAGEM PRINCIPAL NO CANTO INFERIOR ESQUERDO -->
  <div class="shrink-0 mb-1 z-30">
    <ProtagonistAvatarSphere 
      expression={node.expression}
      isSpeaking={isProtagonistSpeaking && isTyping}
      isChoiceActive={hasChoices}
    />
  </div>

  <!-- 2. PAINEL DE DIÁLOGO E ESCOLHAS/AÇÕES À DIREITA -->
  <div class="flex-1 flex flex-col min-w-0 z-20">
    
    <!-- BARRA DE FERRAMENTAS SUPERIOR DISCRETA (VOLTAR + HISTÓRICO + CELULAR) -->
    <div class="flex items-center justify-end mb-1.5 px-1 gap-1.5">
      <!-- BOTÃO VOLTAR -->
      <button 
        onclick={onRollback}
        disabled={!canRollback}
        class="px-2.5 py-1 rounded-xl border backdrop-blur-md transition-all active:scale-95 text-[11px] flex items-center gap-1 font-medium {!canRollback ? 'opacity-30 cursor-not-allowed border-white/5 text-zinc-500' : isLight ? 'bg-[#e5dbc7]/90 hover:bg-[#dbd0ba] border-[#c4b59c] text-[#332a21]' : 'bg-[#12141c]/80 hover:bg-[#1a1d28] border-white/10 text-zinc-200'}"
        title={canRollback ? "Voltar para a escolha anterior" : "Nenhuma escolha anterior para voltar"}
      >
        <RotateCcw class="w-3 h-3 text-amber-500" />
        <span class="hidden sm:inline">Voltar</span>
      </button>

      <!-- HISTÓRICO DE DIÁLOGO -->
      <button 
        onclick={onOpenHistory}
        class="px-2.5 py-1 rounded-xl border backdrop-blur-md transition-all active:scale-95 text-[11px] flex items-center gap-1 font-medium {isLight ? 'bg-[#e5dbc7]/80 hover:bg-[#dbd0ba] border-[#c4b59c] text-[#332a21]' : 'bg-[#12141c]/80 hover:bg-[#1a1d28] border-white/6 text-zinc-300'}"
        title="Histórico de Diálogo"
      >
        <History class="w-3 h-3 opacity-70" />
        <span class="hidden sm:inline">Histórico</span>
      </button>

      <!-- BOTÃO CELULAR -->
      <button 
        onclick={onTogglePhone}
        class="relative px-2.5 py-1 rounded-xl border backdrop-blur-md transition-all active:scale-95 text-[11px] flex items-center gap-1 font-semibold shadow-sm {isLight ? 'bg-[#7c5b36] hover:bg-[#6c4e2e] text-[#faf6ee] border-[#9c7546]' : 'bg-[#181a24] hover:bg-[#202330] text-zinc-200 border-white/10'}"
        title="Pegar Celular (P ou ↑)"
      >
        <Smartphone class="w-3 h-3 text-amber-400" />
        <span class="font-medium">Celular</span>
        {#if gameState.unreadNotification}
          <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute -top-0.5 -right-0.5"></span>
        {/if}
      </button>
    </div>

    <!-- CAIXA PRINCIPAL DE DIÁLOGO E ESCOLHAS -->
    <div 
      role="button"
      tabindex="0"
      onclick={completeTextOrAdvance}
      onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') completeTextOrAdvance(); }}
      class="relative w-full rounded-2xl sm:rounded-3xl p-3 sm:p-4.5 transition-all duration-300 cursor-pointer min-h-[90px] sm:min-h-[110px] flex flex-col justify-between backdrop-blur-2xl border shadow-2xl {isLight ? 'bg-[#f4efe4]/95 hover:bg-[#f8f3e9] border-[#c9ba9f] text-[#2c231b]' : 'bg-[#0d0e14]/92 hover:bg-[#10121a] border-white/10 text-[#ececef]'}"
    >
      <!-- Crachá do Falante (Compacto e Elegante no Canto Superior Esquerdo da Caixa) -->
      <div class="absolute -top-3.5 left-4 sm:left-6 z-10">
        <div 
          class="px-3 py-0.5 rounded-full border shadow-md flex items-center gap-1.5 backdrop-blur-md {speakerAccent.bg} {speakerAccent.border}"
        >
          <span class="w-2 h-2 rounded-full {speakerAccent.dot} shadow-sm animate-pulse"></span>
          <span class="text-[10px] sm:text-[11px] font-cinzel font-bold tracking-widest uppercase {speakerAccent.text}">
            {isProtagonistSpeaking
              ? (gameState.protagonistProfile?.name || 'Íris') 
              : (node.speaker_name || (node.speaker === 'narrador' ? 'Narrador' : node.speaker))}
          </span>
        </div>
      </div>

      <!-- TEXTO DO DIÁLOGO / NARRAÇÃO -->
      <div class="mt-1 text-xs sm:text-sm md:text-[15px] leading-relaxed font-serif-romance tracking-normal {isLight ? 'text-[#2a221b] font-medium' : 'text-[#ececef]'}">
        {displayedText}
        {#if isTyping}
          <span class="inline-block w-1.5 h-4 bg-amber-500 ml-1 animate-pulse align-middle"></span>
        {/if}
      </div>

      <!-- AVISO DE INTERAÇÃO OBRIGATÓRIA (ALARME DO CELULAR) -->
      {#if isAlarmBlocked}
        <div class="mt-2.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-2 text-xs">
          <div class="flex items-center gap-2 text-amber-300">
            <Bell class="w-3.5 h-3.5 animate-bounce text-amber-400" />
            <span class="font-sans-ui font-medium text-[11px] sm:text-xs">O alarme do celular está tocando. Desligue-o para levantar!</span>
          </div>
          <button 
            onclick={(e) => {
              e.stopPropagation();
              gameState.dismissAlarm();
            }}
            class="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-cinzel font-bold text-[11px] uppercase tracking-wider shadow-sm transition-all active:scale-95"
          >
            Desligar
          </button>
        </div>
      {/if}

      <!-- LISTA DE ESCOLHAS NARRATIVAS (ESTILO AMOR DOCE COM LETRAS A, B, C) -->
      {#if hasChoices}
        <div class="mt-2.5 pt-2 border-t {isLight ? 'border-[#cfbfab]' : 'border-white/8'} flex flex-col gap-1.5">
          <div class="flex items-center justify-between mb-0.5">
            <p class="text-[10px] font-cinzel font-bold uppercase tracking-widest {isLight ? 'text-rose-900' : 'text-rose-300'} flex items-center gap-1.5">
              <Sparkles class="w-2.5 h-2.5 text-rose-400" />
              <span>Suas Ações & Respostas:</span>
            </p>
            <span class="text-[9px] {isLight ? 'text-[#7d6c59]' : 'text-zinc-500'} italic">
              Selecione sua resposta
            </span>
          </div>

          <div class="grid grid-cols-1 gap-1.5 max-h-[20vh] sm:max-h-[24vh] overflow-y-auto pr-1 custom-scrollbar">
            {#each node.choices as choice, idx}
              <button 
                onclick={(e) => {
                  e.stopPropagation();
                  audioManager.playChoice();
                  onSelectChoice(choice);
                }}
                class="group relative w-full text-left px-3.5 py-2 sm:py-2.5 rounded-xl border transition-all duration-200 active:scale-[0.99] flex items-center justify-between gap-2.5 {isLight ? 'bg-white/80 hover:bg-rose-50/90 border-rose-200/70 text-[#282019] shadow-sm hover:border-rose-400' : 'bg-[#151722]/85 hover:bg-[#201d2d]/90 border-white/8 text-zinc-100 hover:border-rose-400/40 shadow-sm'}"
              >
                <div class="flex items-center gap-2.5 min-w-0">
                  <!-- LETRA ESTILO AMOR DOCE: A., B., C. -->
                  <span class="font-cinzel font-extrabold text-xs sm:text-sm text-rose-500 shrink-0 group-hover:scale-110 transition-transform">
                    {CHOICE_LETTERS[idx] || (idx + 1)}.
                  </span>
                  
                  <!-- TEXTO DA OPÇÃO -->
                  <span class="text-xs sm:text-[13px] font-sans-ui font-medium leading-snug group-hover:translate-x-0.5 transition-transform truncate">
                    {choice.text}
                  </span>
                </div>

                <!-- BADGE DO TIPO DE ESCOLHA / TONE TAG -->
                {#if choice.tipo}
                  <div class="flex items-center gap-1 shrink-0">
                    <span class="text-[9px] font-cinzel font-bold px-2 py-0.5 rounded border {isLight ? 'bg-[#f4efe4] text-[#4d3d2e] border-[#c4b59c]' : 'bg-black/50 text-zinc-300 border-white/8'}">
                      {choice.tipo}
                    </span>
                    <ChevronRight class="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-rose-500" />
                  </div>
                {/if}
              </button>
            {/each}
          </div>
        </div>
      {/if}

    </div>

  </div>

</div>

<style>
  .custom-scrollbar::-webkit-scrollbar {
    width: 5px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(244, 63, 94, 0.4);
    border-radius: 9999px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(244, 63, 94, 0.7);
  }
</style>
