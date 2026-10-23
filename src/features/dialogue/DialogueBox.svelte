<script lang="ts">
  import type { DialogueNode, Choice } from './narrative.schema';
  import { gameState } from '../game-state/GameState.svelte';
  import { audioManager } from '../audio/audio-manager';
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
    if (isTyping) {
      if (typingTimer) clearInterval(typingTimer);
      displayedText = processedText;
      isTyping = false;
    }
  }

  // Cores de destaque nobres e aveludadas dos personagens (Sem tons berrantes)
  const speakerAccents: Record<string, { bg: string; text: string; border: string }> = {
    dante: { bg: 'bg-[#3b0808]/90', text: 'text-rose-200', border: 'border-rose-900/60' },
    lucas: { bg: 'bg-[#0b172a]/90', text: 'text-blue-200', border: 'border-blue-900/60' },
    theo: { bg: 'bg-[#032418]/90', text: 'text-emerald-200', border: 'border-emerald-900/60' },
    protagonista: { bg: 'bg-[#3b2308]/90', text: 'text-amber-200', border: 'border-amber-700/60' },
    iris: { bg: 'bg-[#3b2308]/90', text: 'text-amber-200', border: 'border-amber-700/60' },
    narrador: { bg: 'bg-[#1c1917]/90', text: 'text-amber-100', border: 'border-stone-700/60' }
  };

  let speakerAccent = $derived(speakerAccents[node.speaker] || speakerAccents.narrador);
</script>

<div class="relative w-full max-w-4xl mx-auto px-3 sm:px-4 pb-4 select-none">
  
  <!-- BARRA DE FERRAMENTAS SUPERIOR (BOTÃO VOLTAR CONVERSA + CELULAR + HISTÓRICO) -->
  <div class="flex items-center justify-end mb-2.5 px-2 gap-2">
    
    <!-- BOTÃO VOLTAR CONVERSA / DESFAZER ESCOLHA ANTERIOR -->
    <button 
      onclick={onRollback}
      disabled={!canRollback}
      class="px-3.5 py-1.5 rounded-xl border backdrop-blur-md transition-all active:scale-95 text-xs flex items-center gap-1.5 font-medium {!canRollback ? 'opacity-35 cursor-not-allowed border-white/5 text-zinc-500' : isLight ? 'bg-[#e5dbc7]/90 hover:bg-[#dbd0ba] border-[#c4b59c] text-[#332a21]' : 'bg-[#12141c]/80 hover:bg-[#1a1d28] border-white/10 text-zinc-200'}"
      title={canRollback ? "Voltar para a escolha anterior" : "Nenhuma escolha anterior para voltar"}
    >
      <RotateCcw class="w-3.5 h-3.5 text-amber-500" />
      <span>Voltar</span>
    </button>

    <!-- HISTÓRICO DE DIÁLOGO -->
    <button 
      onclick={onOpenHistory}
      class="px-3 py-1.5 rounded-xl border backdrop-blur-md transition-all active:scale-95 text-xs flex items-center gap-1.5 font-medium {isLight ? 'bg-[#e5dbc7]/80 hover:bg-[#dbd0ba] border-[#c4b59c] text-[#332a21]' : 'bg-[#12141c]/80 hover:bg-[#1a1d28] border-white/6 text-zinc-300'}"
      title="Histórico de Diálogo"
    >
      <History class="w-3.5 h-3.5 opacity-70" />
      <span class="hidden sm:inline">Histórico</span>
    </button>

    <!-- BOTÃO CELULAR GTA V -->
    <button 
      onclick={onTogglePhone}
      class="relative px-3.5 py-1.5 rounded-xl border backdrop-blur-md transition-all active:scale-95 text-xs flex items-center gap-1.5 font-semibold shadow-md {isLight ? 'bg-[#7c5b36] hover:bg-[#6c4e2e] text-[#faf6ee] border-[#9c7546]' : 'bg-[#181a24] hover:bg-[#202330] text-zinc-200 border-white/10'}"
      title="Pegar Celular (P ou ↑)"
    >
      <Smartphone class="w-3.5 h-3.5 text-amber-400" />
      <span class="font-medium">Celular</span>
      {#if gameState.unreadNotification}
        <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute -top-0.5 -right-0.5"></span>
      {/if}
    </button>
  </div>

  <!-- CAIXA DE TEXTO PRINCIPAL (PERGAMINHO QUENTE NO LIGHT, OBSIDIANA GRAFITE NO DARK) -->
  <div 
    role="button"
    tabindex="0"
    onclick={completeTextOrAdvance}
    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') completeTextOrAdvance(); }}
    class="relative w-full rounded-3xl p-5 sm:p-7 transition-all duration-300 cursor-pointer min-h-[170px] flex flex-col justify-between backdrop-blur-2xl border shadow-2xl {isLight ? 'bg-[#f4efe4]/95 hover:bg-[#f8f3e9] border-[#c9ba9f] text-[#2c231b]' : 'bg-[#0d0e14]/90 hover:bg-[#10121a] border-white/8 text-[#ececef]'}"
  >
    <!-- Crachá do Personagem Falante -->
    <div class="absolute -top-4 left-6 sm:left-8">
      <div 
        class="px-5 py-1 rounded-full border shadow-lg flex items-center gap-2 backdrop-blur-md {speakerAccent.bg} {speakerAccent.border}"
      >
        <Sparkles class="w-3 h-3 text-amber-400" />
        <span class="text-xs font-cinzel font-bold tracking-widest uppercase {speakerAccent.text}">
          {(node.speaker === 'protagonista' || node.speaker === 'iris') 
            ? (gameState.protagonistProfile?.name || 'Íris') 
            : (node.speaker_name || (node.speaker === 'narrador' ? 'Narrador' : node.speaker))}
        </span>
      </div>
    </div>

    <!-- Texto com Efeito Digitação e Tipografia Romântica -->
    <div class="mt-2 text-base sm:text-lg leading-relaxed font-serif-romance tracking-normal {isLight ? 'text-[#2a221b] font-medium' : 'text-[#ececef]'}">
      {displayedText}
      {#if isTyping}
        <span class="inline-block w-1.5 h-5 bg-amber-500 ml-1 animate-pulse align-middle"></span>
      {/if}
    </div>

    <!-- AVISO DE INTERAÇÃO OBRIGATÓRIA DE TELEFONE (ALARME DO DESPERTADOR) -->
    {#if isAlarmBlocked}
      <div class="mt-5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-2.5 text-amber-300">
          <Bell class="w-4 h-4 animate-bounce text-amber-400" />
          <span class="font-sans-ui font-medium">O alarme do celular está tocando. Desligue-o para levantar!</span>
        </div>
        <button 
          onclick={(e) => {
            e.stopPropagation();
            gameState.dismissAlarm();
          }}
          class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-cinzel font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
        >
          Desligar Alarme
        </button>
      </div>
    {/if}

    <!-- LISTA DE ESCOLHAS NARRATIVAS (LIBERADAS APENAS SE O ALARME NÃO ESTIVER BLOQUEADO) -->
    {#if !isTyping && !isAlarmBlocked && node.choices.length > 0}
      <div class="mt-5 pt-4 border-t {isLight ? 'border-[#cfbfab]' : 'border-white/6'} flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <p class="text-[11px] font-cinzel font-bold uppercase tracking-widest {isLight ? 'text-[#6e5d4c]' : 'text-zinc-400'}">
            Sua Escolha:
          </p>
          <span class="text-[10px] {isLight ? 'text-[#7d6c59]' : 'text-zinc-500'} italic">Toda decisão tem consequências</span>
        </div>

        <div class="grid grid-cols-1 gap-2.5 max-h-[30vh] sm:max-h-[36vh] overflow-y-auto pr-1.5 custom-scrollbar">
          {#each node.choices as choice}
            <button 
              onclick={(e) => {
                e.stopPropagation();
                audioManager.playChoice();
                onSelectChoice(choice);
              }}
              class="group relative w-full text-left px-5 py-3.5 rounded-2xl border transition-all duration-200 active:scale-[0.99] flex items-center justify-between gap-3 {isLight ? 'bg-[#e9e0ce] hover:bg-[#ded2bd] border-[#c0af95] text-[#282019] shadow-sm hover:border-amber-700/40' : 'bg-[#13151f]/80 hover:bg-[#191c28] border-white/6 text-zinc-100 hover:border-amber-400/30 shadow-md'}"
            >
              <div class="flex items-center gap-3">
                <span class="w-1.5 h-1.5 rounded-full {isLight ? 'bg-[#826038] group-hover:bg-[#634825]' : 'bg-zinc-600 group-hover:bg-amber-400'} transition-colors"></span>
                <span class="text-sm sm:text-base font-sans-ui font-medium leading-snug group-hover:translate-x-0.5 transition-transform">
                  {choice.text}
                </span>
              </div>

              <!-- Badge do Tipo de Escolha -->
              {#if choice.tipo}
                <div class="flex items-center gap-1 shrink-0">
                  <span class="text-[10px] font-cinzel font-bold px-2.5 py-1 rounded-lg border {isLight ? 'bg-[#f4efe4] text-[#4d3d2e] border-[#c4b59c]' : 'bg-black/50 text-zinc-300 border-white/8'}">
                    {choice.tipo}
                  </span>
                  <ChevronRight class="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-amber-500" />
                </div>
              {/if}
            </button>
          {/each}
        </div>
      </div>
    {/if}

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
    background: rgba(217, 119, 6, 0.35);
    border-radius: 9999px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(217, 119, 6, 0.6);
  }
</style>