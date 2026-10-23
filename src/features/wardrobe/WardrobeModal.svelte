<script lang="ts">
  import { gameState } from '../game-state/GameState.svelte';
  import type { EquippedOutfit, OutfitId, BodyArchetype } from './wardrobe.schema';
  import { 
    OUTFIT_OPTIONS, 
    BODY_ARCHETYPES, 
    HAIR_COLORS, 
    ACCESSORIES 
  } from './wardrobe.catalog';
  import AnimeProtagonistDisplay, { type ProtagonistZoomMode } from './AnimeProtagonistDisplay.svelte';
  import { 
    Sparkles, 
    X, 
    RotateCcw, 
    Check, 
    Heart, 
    Smile, 
    Glasses, 
    User, 
    Ruler, 
    Activity, 
    Palette 
  } from 'lucide-svelte';

  interface Props {
    onClose: () => void;
  }

  let { onClose }: Props = $props();

  // Rascunho local para experimentar antes de salvar
  let previewOutfit = $state<EquippedOutfit>({ 
    ...gameState.equippedOutfit,
    outfit_id: gameState.equippedOutfit.outfit_id ?? 'uniforme_lotus',
    body_archetype: gameState.equippedOutfit.body_archetype ?? 'padrao',
    glasses: Boolean(gameState.equippedOutfit.glasses),
    blush: gameState.equippedOutfit.blush ?? true
  });

  // Controle de Câmera & Abas
  let zoomMode = $state<ProtagonistZoomMode>('corpo_inteiro');
  let activeTab = $state<'looks' | 'corpo' | 'cabelo' | 'acessorios'>('looks');

  const tabs = [
    { id: 'looks', label: 'Looks & Trajes', icon: Sparkles },
    { id: 'corpo', label: 'Físico & Biotipo', icon: User },
    { id: 'cabelo', label: 'Cabelo & Rosto', icon: Smile },
    { id: 'acessorios', label: 'Acessórios', icon: Glasses }
  ];

  function selectTab(tabId: typeof activeTab) {
    activeTab = tabId;
    if (tabId === 'cabelo') {
      zoomMode = 'cabelo_rosto';
    } else if (tabId === 'acessorios') {
      zoomMode = 'cabelo_rosto';
    } else if (tabId === 'corpo') {
      zoomMode = 'corpo_inteiro';
    } else {
      zoomMode = 'corpo_inteiro';
    }
  }

  // Pontuação e Reações Dinâmicas dos Garotos
  let boyReactions = $derived.by(() => {
    const outfit = previewOutfit.outfit_id;
    if (outfit === 'look_rock') {
      return {
        dominant: 'dante',
        danteScore: 12,
        lucasScore: 2,
        theoScore: 4,
        comment: 'Dante: "Uau... Essa jaqueta de couro e essa postura combinam direto com o som da banda. Ficou incrível."'
      };
    }
    if (outfit === 'look_romantico') {
      return {
        dominant: 'theo',
        danteScore: 4,
        lucasScore: 5,
        theoScore: 12,
        comment: 'Theo: "Cores suaves e tecido aconchegante... Parece uma pintura feita em aquarela. Combina muito com você."'
      };
    }
    return {
      dominant: 'lucas',
      danteScore: 3,
      lucasScore: 10,
      theoScore: 5,
      comment: 'Lucas: "Impecável. Uma apresentação refinada e perfeitamente alinhada aos padrões de prestígio da Lótus."'
    };
  });

  // Ações
  function setOutfit(id: OutfitId) {
    previewOutfit.outfit_id = id;
    previewOutfit.body_archetype = 'padrao'; // Ao trocar de look completo, volta ao porte padrão para aquele look
  }

  function setArchetype(arch: typeof BODY_ARCHETYPES[0]) {
    previewOutfit.body_archetype = arch.id;
    previewOutfit.height = arch.height;
    previewOutfit.body_build = arch.body_build;
    previewOutfit.muscle_tone = arch.muscle_tone;
  }

  function setHairColor(colorHex: string) {
    previewOutfit.hair_color = colorHex;
  }

  function resetToSaved() {
    previewOutfit = { 
      ...gameState.equippedOutfit,
      outfit_id: gameState.equippedOutfit.outfit_id ?? 'uniforme_lotus',
      body_archetype: gameState.equippedOutfit.body_archetype ?? 'padrao',
      glasses: Boolean(gameState.equippedOutfit.glasses),
      blush: gameState.equippedOutfit.blush ?? true
    };
  }

  function saveAndApply() {
    // Aplica no estado oficial do jogo
    gameState.equippedOutfit = {
      ...gameState.equippedOutfit,
      ...previewOutfit
    };

    // Concede bônus de afinidade baseado no look escolhido
    if (previewOutfit.outfit_id === 'look_rock') {
      gameState.affinity.dante = (gameState.affinity.dante || 0) + 3;
    } else if (previewOutfit.outfit_id === 'look_romantico') {
      gameState.affinity.theo = (gameState.affinity.theo || 0) + 3;
    } else {
      gameState.affinity.lucas = (gameState.affinity.lucas || 0) + 3;
    }

    onClose();
  }
</script>

<!-- MODAL PRINCIPAL DO PROVADOR (PADRÃO AMOR DOCE & TEARS OF THEMIS) -->
<div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
  
  <div class="relative w-full max-w-6xl h-[92vh] max-h-[860px] bg-[#12131a] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
    
    <!-- CABEÇALHO -->
    <header class="h-16 px-6 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Sparkles class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-base font-bold text-white tracking-wide">Provador & Personalização da Íris</h2>
          <p class="text-xs text-zinc-400">Escolha seu look, biotipo e estilo com visualização limpa em tempo real</p>
        </div>
      </div>

      <!-- BADGES DE AFINIDADE -->
      <div class="hidden md:flex items-center gap-2 text-xs font-semibold">
        <span class="px-2.5 py-1 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300">
          🎸 Dante +{boyReactions.danteScore}
        </span>
        <span class="px-2.5 py-1 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300">
          👔 Lucas +{boyReactions.lucasScore}
        </span>
        <span class="px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          🎨 Theo +{boyReactions.theoScore}
        </span>
      </div>

      <!-- FECHAR -->
      <button 
        onclick={onClose}
        class="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors"
        title="Fechar provador"
      >
        <X class="w-5 h-5" />
      </button>
    </header>

    <!-- CORPO PRINCIPAL (PALCO CENTRAL À ESQUERDA + CONTROLES À DIREITA) -->
    <div class="flex-1 flex flex-col md:flex-row overflow-hidden">
      
      <!-- ================= COLUNA ESQUERDA: PALCO DA PERSONAGEM ================= -->
      <div class="w-full md:w-[460px] lg:w-[500px] h-80 md:h-full flex flex-col items-center justify-between p-4 border-b md:border-b-0 md:border-r border-white/10 bg-radial from-[#1e202c] to-[#0c0d12] relative overflow-hidden shrink-0">
        
        <!-- HOLOFOTE DE ILUMINAÇÃO SUAVE -->
        <div class="absolute bottom-10 w-72 h-20 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <!-- BOTOEIRA SUPERIOR DE CÂMERA -->
        <div class="w-full flex items-center justify-between z-10">
          <div class="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-white/10 text-xs shadow-md">
            <button 
              onclick={() => zoomMode = 'cabelo_rosto'}
              class="px-2.5 py-1 rounded-lg transition-all {zoomMode === 'cabelo_rosto' ? 'bg-amber-500 text-stone-950 font-bold shadow' : 'text-zinc-400 hover:text-white'}"
            >
              👤 Rosto
            </button>
            <button 
              onclick={() => zoomMode = 'torso'}
              class="px-2.5 py-1 rounded-lg transition-all {zoomMode === 'torso' ? 'bg-amber-500 text-stone-950 font-bold shadow' : 'text-zinc-400 hover:text-white'}"
            >
              👗 Tronco
            </button>
            <button 
              onclick={() => zoomMode = 'corpo_inteiro'}
              class="px-2.5 py-1 rounded-lg transition-all {zoomMode === 'corpo_inteiro' ? 'bg-amber-500 text-stone-950 font-bold shadow' : 'text-zinc-400 hover:text-white'}"
            >
              🧍 Corpo Todo
            </button>
          </div>

          <button 
            onclick={resetToSaved}
            class="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw class="w-3.5 h-3.5" />
            <span>Restaurar</span>
          </button>
        </div>

        <!-- MANEQUIM CENTRALIZADO -->
        <div class="w-full flex-1 flex items-center justify-center my-1 overflow-hidden">
          <AnimeProtagonistDisplay outfit={previewOutfit} {zoomMode} />
        </div>

        <!-- REAÇÃO DO GAROTO EM TEMPO REAL -->
        <div class="w-full p-3 rounded-2xl bg-black/60 border border-white/10 text-xs text-zinc-200 italic shadow-lg z-10">
          <p>{boyReactions.comment}</p>
        </div>
      </div>

      <!-- ================= COLUNA DIREITA: CATÁLOGO DE CUSTOMIZAÇÃO ================= -->
      <div class="flex-1 flex flex-col overflow-hidden bg-[#101117]">
        
        <!-- ABAS DE NAVEGAÇÃO -->
        <div class="flex items-center gap-1.5 px-4 pt-3 pb-2 border-b border-white/10 bg-black/20 overflow-x-auto no-scrollbar">
          {#each tabs as tab}
            <button 
              onclick={() => selectTab(tab.id as any)}
              class="px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all {activeTab === tab.id ? 'bg-amber-500 text-stone-950 shadow-md font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}"
            >
              <tab.icon class="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          {/each}
        </div>

        <!-- CONTEÚDO DAS ABAS -->
        <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          <!-- 1. ABA: LOOKS & TRAJES COMPLETOS -->
          {#if activeTab === 'looks'}
            <div class="space-y-4">
              <p class="text-xs text-zinc-400">
                Trajes completos ilustrados em estilo anime oficial, sem sobreposições estranhas ou recortes bugados:
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {#each OUTFIT_OPTIONS as look}
                  <div 
                    class="p-4 rounded-2xl border transition-all flex flex-col justify-between {previewOutfit.outfit_id === look.id && previewOutfit.body_archetype === 'padrao' ? 'border-amber-500 bg-amber-500/10 shadow-lg' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'}"
                  >
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider {look.styleTag === 'Rock' ? 'bg-rose-500/20 text-rose-300' : look.styleTag === 'Clássico' ? 'bg-blue-500/20 text-blue-300' : 'bg-emerald-500/20 text-emerald-300'}">
                          {look.styleTag}
                        </span>
                        <span class="text-[11px] font-medium text-amber-400">
                          +{look.affinityBonus} Afinidade
                        </span>
                      </div>
                      <h3 class="text-sm font-bold text-white mb-1.5">{look.name}</h3>
                      <p class="text-xs text-zinc-300 line-clamp-3 leading-relaxed">{look.description}</p>
                    </div>

                    <button 
                      onclick={() => setOutfit(look.id)}
                      class="mt-4 w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all {previewOutfit.outfit_id === look.id && previewOutfit.body_archetype === 'padrao' ? 'bg-emerald-500 text-white shadow' : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md'}"
                    >
                      {#if previewOutfit.outfit_id === look.id && previewOutfit.body_archetype === 'padrao'}
                        <Check class="w-4 h-4" />
                        <span>Vestindo Agora</span>
                      {:else}
                        <span>Vestir Este Look</span>
                      {/if}
                    </button>
                  </div>
                {/each}
              </div>
            </div>

          <!-- 2. ABA: FÍSICO & BIOTIPO ANATÔMICO (THE SIMS 2D) -->
          {:else if activeTab === 'corpo'}
            <div class="space-y-6">
              <div>
                <h3 class="text-sm font-bold text-white flex items-center gap-2">
                  <User class="w-4 h-4 text-amber-400" />
                  <span>Biotipos Anatômicos Desenhados à Mão</span>
                </h3>
                <p class="text-xs text-zinc-400 mt-1">
                  Selecione variações corporais autênticas (traços de corpo cheinho, musculoso ou fino desenhados de verdade):
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {#each BODY_ARCHETYPES as arch}
                  <button 
                    onclick={() => setArchetype(arch)}
                    class="p-4 rounded-2xl border text-left transition-all {previewOutfit.body_archetype === arch.id ? 'border-amber-500 bg-amber-500/10 shadow-lg' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'}"
                  >
                    <div class="flex items-center justify-between mb-1.5">
                      <span class="text-sm font-bold text-white">{arch.name}</span>
                      <span class="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-white/10 text-amber-300 font-bold">
                        {arch.badge}
                      </span>
                    </div>
                    <p class="text-xs text-zinc-300 leading-relaxed">{arch.description}</p>
                  </button>
                {/each}
              </div>

              <!-- SLIDERS ADICIONAIS FINOS THE SIMS -->
              <div class="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h4 class="text-xs font-bold uppercase tracking-wider text-amber-400">Microajustes de Escala (The Sims)</h4>
                
                <div class="space-y-2">
                  <div class="flex justify-between text-xs text-zinc-300">
                    <span class="flex items-center gap-1.5"><Ruler class="w-3.5 h-3.5" /> Altura Corporal</span>
                    <span class="font-mono text-amber-400">{previewOutfit.height?.toFixed(2)}m</span>
                  </div>
                  <input 
                    type="range" 
                    min="1.50" 
                    max="1.80" 
                    step="0.01" 
                    bind:value={previewOutfit.height}
                    class="w-full accent-amber-500 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div class="space-y-2">
                  <div class="flex justify-between text-xs text-zinc-300">
                    <span class="flex items-center gap-1.5"><Activity class="w-3.5 h-3.5" /> Tonificação Muscular</span>
                    <span class="font-mono text-amber-400">{previewOutfit.muscle_tone}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    step="5" 
                    bind:value={previewOutfit.muscle_tone}
                    class="w-full accent-amber-500 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

          <!-- 3. ABA: CABELO & ROSTO -->
          {:else if activeTab === 'cabelo'}
            <div class="space-y-6">
              <div>
                <h3 class="text-sm font-bold text-white flex items-center gap-2">
                  <Palette class="w-4 h-4 text-amber-400" />
                  <span>Paleta Dinâmica de Cores de Cabelo (Tempo Real)</span>
                </h3>
                <p class="text-xs text-zinc-400 mt-1">
                  Clique para alterar instantaneamente a cor dos fios da protagonista com iluminação harmonizada:
                </p>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {#each HAIR_COLORS as hc}
                  <button 
                    onclick={() => setHairColor(hc.color)}
                    class="p-2.5 rounded-2xl border transition-all flex flex-col items-center gap-2 {previewOutfit.hair_color === hc.color ? 'border-amber-400 bg-amber-500/20 shadow-md scale-105' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'}"
                  >
                    <div 
                      class="w-8 h-8 rounded-full shadow-inner ring-2 {previewOutfit.hair_color === hc.color ? 'ring-amber-400' : 'ring-white/20'}"
                      style="background-color: {hc.color};"
                    ></div>
                    <span class="text-[11px] text-zinc-200 text-center font-medium leading-tight">{hc.name}</span>
                  </button>
                {/each}
              </div>

              <!-- RUBOR / BLUSH TOGGLE -->
              <div class="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-bold text-white flex items-center gap-2">
                    <span>🌸 Rubor Natural nas Bochechas</span>
                  </h4>
                  <p class="text-xs text-zinc-400">Ativa um toque rosado meigo no rosto para cenas emotivas</p>
                </div>
                <button 
                  onclick={() => previewOutfit.blush = !previewOutfit.blush}
                  class="px-4 py-1.5 rounded-xl text-xs font-bold transition-all {previewOutfit.blush ? 'bg-rose-500 text-white shadow' : 'bg-white/10 text-zinc-400'}"
                >
                  {previewOutfit.blush ? 'Ativado' : 'Desativado'}
                </button>
              </div>
            </div>

          <!-- 4. ABA: ACESSÓRIOS -->
          {:else if activeTab === 'acessorios'}
            <div class="space-y-6">
              <div>
                <h3 class="text-sm font-bold text-white flex items-center gap-2">
                  <Glasses class="w-4 h-4 text-amber-400" />
                  <span>Acessórios de Rosto & Cabeça</span>
                </h3>
                <p class="text-xs text-zinc-400 mt-1">
                  Sobreponha acessórios desenhados com posicionamento anatômico exato:
                </p>
              </div>

              <div class="p-4 rounded-2xl border transition-all flex items-center justify-between {previewOutfit.glasses ? 'border-amber-500 bg-amber-500/10' : 'border-white/10 bg-white/5'}">
                <div class="flex items-center gap-3">
                  <span class="text-2xl">👓</span>
                  <div>
                    <h4 class="text-sm font-bold text-white">Óculos Redondos de Grau</h4>
                    <p class="text-xs text-zinc-400">Armação clássica de latão dourado polido (Afinidade com Lucas)</p>
                  </div>
                </div>

                <button 
                  onclick={() => previewOutfit.glasses = !previewOutfit.glasses}
                  class="px-4 py-2 rounded-xl text-xs font-bold transition-all {previewOutfit.glasses ? 'bg-amber-500 text-stone-950 font-bold shadow' : 'bg-white/10 text-zinc-300 hover:bg-white/20'}"
                >
                  {previewOutfit.glasses ? 'Equipado' : 'Equipar'}
                </button>
              </div>
            </div>
          {/if}

        </div>

        <!-- RODAPÉ COM BOTÃO SALVAR E VESTIR -->
        <footer class="h-18 px-6 border-t border-white/10 bg-black/40 flex items-center justify-between shrink-0">
          <div class="text-xs text-zinc-400 hidden sm:block">
            <span>Look selecionado: </span>
            <strong class="text-white">
              {OUTFIT_OPTIONS.find(o => o.id === previewOutfit.outfit_id)?.name ?? 'Uniforme Lótus'}
            </strong>
          </div>

          <div class="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button 
              onclick={onClose}
              class="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button 
              onclick={saveAndApply}
              class="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-lg flex items-center gap-2 active:scale-95 transition-all"
            >
              <Check class="w-4 h-4" />
              <span>Salvar e Continuar a História</span>
            </button>
          </div>
        </footer>

      </div>
    </div>
  </div>
</div>
