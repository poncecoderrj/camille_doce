<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { Shirt, Check, X, Heart, Sparkles } from 'lucide-svelte';
  import { gameState } from '../game-state/GameState.svelte';
  import { audioManager } from '../audio/audio-manager';
  import ProtagonistActor from './ProtagonistActor.svelte';
  import type { OutfitId } from './customization.schema';
  import { OUTFIT_OPTIONS, BOY_REACTIONS } from './customization.catalog';

  interface Props {
    onClose?: () => void;
  }

  let { onClose }: Props = $props();

  let selectedOutfit = $state<OutfitId>(gameState.currentOutfit);
  let boyReactionTarget = $state<'dante' | 'lucas' | 'theo'>('lucas');

  const boyProfiles: Record<string, { name: string; role: string; color: string; badgeClass: string; }> = {
    dante: { name: 'Dante', role: 'Guitarrista Rebelde', color: '#e11d48', badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
    lucas: { name: 'Lucas', role: 'Presidente do Grêmio', color: '#2563eb', badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
    theo: { name: 'Theo', role: 'Artista Poético', color: '#059669', badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
    geral: { name: 'Todos', role: 'Equilibrado', color: '#f59e0b', badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30' }
  };

  let activeReactionText = $derived.by(() => {
    const reactions = BOY_REACTIONS[selectedOutfit] || BOY_REACTIONS.uniforme_lotus;
    return reactions[boyReactionTarget];
  });

  function selectOutfit(id: OutfitId) {
    selectedOutfit = id;
    audioManager.playClick();
    const opt = OUTFIT_OPTIONS.find(o => o.id === id);
    if (opt && opt.affinityTarget !== 'geral') {
      boyReactionTarget = opt.affinityTarget;
    }
  }

  function handleConfirm() {
    audioManager.playChoice();
    gameState.setOutfit(selectedOutfit);
    const opt = OUTFIT_OPTIONS.find(o => o.id === selectedOutfit);
    if (opt && opt.affinityTarget !== 'geral') {
      gameState.modifyAffinity(opt.affinityTarget, opt.affinityBonus);
    }
    handleClose();
  }

  function handleClose() {
    if (onClose) onClose();
    else gameState.closeWardrobe();
  }
</script>

<!-- MODAL EXCLUSIVO DA TELA INICIAL: ESCOLHA DE LOOK DA PERSONAGEM -->
<div 
  class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md select-none overflow-hidden"
  transition:fade={{ duration: 200 }}
>
  <div 
    class="relative w-full max-w-4xl h-[90vh] max-h-[720px] bg-[#0c0d12]/95 border border-amber-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-zinc-100"
    transition:fly={{ y: 20, duration: 250 }}
  >
    <!-- CABEÇALHO -->
    <header class="h-14 sm:h-16 px-5 sm:px-6 border-b border-white/10 flex items-center justify-between bg-[#11131c]/90 shrink-0">
      <div class="flex items-center gap-3">
        <div class="p-2 rounded-xl bg-amber-500/15 border border-amber-500/25 text-amber-400">
          <Shirt class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-sm sm:text-base font-cinzel font-bold text-white flex items-center gap-2">
            Visual da Protagonista
            <span class="text-[10px] font-sans px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold uppercase tracking-wider">
              Íris
            </span>
          </h2>
          <p class="text-xs text-zinc-400 font-sans-ui hidden sm:block">
            Escolha o look oficial que a personagem vestirá durante a história
          </p>
        </div>
      </div>

      <button 
        onclick={handleClose}
        title="Fechar"
        class="p-2 rounded-xl border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-all"
      >
        <X class="w-5 h-5" />
      </button>
    </header>

    <!-- CORPO: PALCO À ESQUERDA + SELEÇÃO DIRETA À DIREITA -->
    <div class="flex-1 flex flex-col md:flex-row overflow-hidden">
      
      <!-- PALCO COM O SPRITE ÚNICO E LIMPO -->
      <div class="relative w-full md:w-[45%] h-56 sm:h-72 md:h-full bg-radial from-[#1e1c28]/60 via-[#101017] to-[#090a0f] border-b md:border-b-0 md:border-r border-white/10 flex flex-col items-center justify-end p-4 overflow-hidden shrink-0">
        
        <!-- Holofote Suave -->
        <div class="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-amber-400/10 to-transparent pointer-events-none blur-2xl"></div>

        <!-- Componente Único da Personagem (Zero camadas sobrepostas) -->
        <div class="relative w-full h-[95%] flex items-end justify-center pointer-events-none">
          <ProtagonistActor 
            outfitId={selectedOutfit}
            scale={1.05}
            framing="full"
          />
        </div>

        <!-- Reação Dinâmica dos Pretendentes ao Look -->
        <div class="w-full max-w-sm z-30 mt-2 bg-[#141622]/90 border border-white/10 rounded-2xl p-3 backdrop-blur-xl shadow-lg">
          <div class="flex items-center justify-between border-b border-white/10 pb-1 mb-1.5">
            <span class="text-[10px] uppercase font-cinzel font-bold text-zinc-400 tracking-wider">
              Reação dos Rapazes
            </span>
            <div class="flex items-center gap-1">
              {#each (['dante', 'lucas', 'theo'] as const) as boy}
                <button
                  onclick={() => { boyReactionTarget = boy; audioManager.playClick(); }}
                  class="px-2 py-0.5 rounded-lg text-[10px] font-cinzel font-semibold transition-all {boyReactionTarget === boy ? boyProfiles[boy].badgeClass + ' border' : 'text-zinc-500 hover:text-zinc-300'}"
                >
                  {boyProfiles[boy].name}
                </button>
              {/each}
            </div>
          </div>

          <div class="flex items-start gap-2">
            <span class="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style="background: {boyProfiles[boyReactionTarget].color};"></span>
            <div>
              <p class="text-[11px] font-cinzel font-bold" style="color: {boyProfiles[boyReactionTarget].color};">
                {boyProfiles[boyReactionTarget].name}
                <span class="text-[9px] font-sans font-normal text-zinc-400 ml-1">({boyProfiles[boyReactionTarget].role})</span>
              </p>
              <p class="text-xs font-serif-romance italic text-zinc-200 mt-0.5 leading-snug">
                "{activeReactionText}"
              </p>
            </div>
          </div>
        </div>

      </div>

      <!-- PAINEL DE ESCOLHA DOS 3 LOOKS OFICIAIS -->
      <div class="flex-1 flex flex-col justify-between overflow-y-auto p-4 sm:p-6 bg-[#0e1017] custom-scrollbar">
        
        <div class="space-y-4">
          <div>
            <h3 class="text-sm font-cinzel font-bold text-white">Looks Disponíveis</h3>
            <p class="text-xs text-zinc-400 font-sans-ui">
              Cada visual possui uma ilustração cel-shaded completa e impacta a afinidade com os rapazes.
            </p>
          </div>

          <div class="space-y-3">
            {#each OUTFIT_OPTIONS as outfit}
              {@const isSelected = selectedOutfit === outfit.id}
              {@const boy = boyProfiles[outfit.affinityTarget]}
              <button
                onclick={() => selectOutfit(outfit.id)}
                class="w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 {isSelected ? 'bg-amber-500/15 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.25)]' : 'bg-[#141620] border-white/8 hover:border-white/20 hover:bg-[#191c2b]'}"
              >
                <!-- Miniatura do Look -->
                <div class="w-14 sm:w-16 h-20 sm:h-24 rounded-xl overflow-hidden bg-black/50 border border-white/10 shrink-0 relative flex items-end justify-center">
                  <img 
                    src={outfit.image} 
                    alt={outfit.name} 
                    class="h-full object-contain object-bottom"
                  />
                </div>

                <!-- Detalhes do Look -->
                <div class="flex-1">
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                      <h4 class="text-xs sm:text-sm font-cinzel font-bold {isSelected ? 'text-amber-400' : 'text-white'}">
                        {outfit.name}
                      </h4>
                      <span class="text-[10px] font-sans px-2 py-0.5 rounded-full border {boy.badgeClass}">
                        {outfit.styleTag}
                      </span>
                    </div>

                    {#if isSelected}
                      <span class="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shrink-0">
                        <Check class="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    {/if}
                  </div>

                  <p class="text-xs text-zinc-300 font-sans-ui mt-1 leading-relaxed">
                    {outfit.description}
                  </p>

                  <div class="mt-2 flex items-center gap-2 text-[11px] font-sans">
                    <span class="flex items-center gap-1 font-semibold" style="color: {boy.color};">
                      <Heart class="w-3 h-3 fill-current" />
                      +{outfit.affinityBonus} com {boy.name}
                    </span>
                  </div>
                </div>
              </button>
            {/each}
          </div>
        </div>

        <!-- RODAPÉ DE CONFIRMAÇÃO -->
        <footer class="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <button 
            onclick={handleClose}
            class="px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 text-xs text-zinc-400 hover:text-white transition-all"
          >
            Cancelar
          </button>

          <button 
            onclick={handleConfirm}
            class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-cinzel font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
          >
            <Check class="w-4 h-4 stroke-[2.5]" />
            <span>Confirmar Look</span>
          </button>
        </footer>

      </div>

    </div>

  </div>
</div>
