<script lang="ts">
  import { gameState } from '../game-state/GameState.svelte';
  import type { 
    EquippedOutfit, 
    OutfitId, 
    BodyArchetype, 
    HairStyle, 
    BackpackType 
  } from './wardrobe.schema';
  import { 
    OUTFIT_OPTIONS, 
    BODY_ARCHETYPES, 
    HAIR_STYLES, 
    BACKPACK_OPTIONS, 
    HAIR_COLORS 
  } from './wardrobe.catalog';
  import AnimeProtagonistDisplay, { type ProtagonistZoomMode } from './AnimeProtagonistDisplay.svelte';
  import { 
    Sparkles, 
    X, 
    RotateCcw, 
    Check, 
    User, 
    Smile, 
    Palette, 
    Backpack, 
    Glasses 
  } from 'lucide-svelte';

  interface Props {
    onClose: () => void;
  }

  let { onClose }: Props = $props();

  // Rascunho local para experimentar livremente antes de salvar
  let previewOutfit = $state<EquippedOutfit>({ 
    ...gameState.equippedOutfit,
    outfit_id: gameState.equippedOutfit.outfit_id ?? 'uniforme_lotus',
    body_archetype: gameState.equippedOutfit.body_archetype ?? 'padrao',
    hair_style: (gameState.equippedOutfit.hair_style as HairStyle) ?? 'ondulado_longo',
    backpack: (gameState.equippedOutfit.backpack as BackpackType) ?? 'mochila_lotus',
    hair_color: gameState.equippedOutfit.hair_color ?? '#4a2c11',
    glasses: Boolean(gameState.equippedOutfit.glasses),
    blush: gameState.equippedOutfit.blush ?? true
  });

  // Controle de Câmera & Abas
  let zoomMode = $state<ProtagonistZoomMode>('corpo_inteiro');
  let activeTab = $state<'looks' | 'corpos' | 'cabelos' | 'cores' | 'mochilas'>('looks');

  const tabs = [
    { id: 'looks', label: '1. Looks & Trajes', icon: Sparkles },
    { id: 'corpos', label: '2. Tipos de Corpo (5)', icon: User },
    { id: 'cabelos', label: '3. Penteados', icon: Smile },
    { id: 'cores', label: '4. Cores do Cabelo', icon: Palette },
    { id: 'mochilas', label: '5. Mochila & Bolsas', icon: Backpack }
  ];

  function selectTab(tabId: typeof activeTab) {
    activeTab = tabId;
    if (tabId === 'cabelos' || tabId === 'cores') {
      zoomMode = 'cabelo_rosto';
    } else if (tabId === 'mochilas') {
      zoomMode = 'torso';
    } else {
      zoomMode = 'corpo_inteiro';
    }
  }

  // Reações e Comentários Dinâmicos dos Garotos em Tempo Real
  let boyReactions = $derived.by(() => {
    let danteScore = 5;
    let lucasScore = 5;
    let theoScore = 5;

    // Look
    if (previewOutfit.outfit_id === 'look_rock') danteScore += 10;
    else if (previewOutfit.outfit_id === 'look_romantico') theoScore += 10;
    else lucasScore += 10;

    // Mochila
    if (previewOutfit.backpack === 'bolsa_rock') danteScore += 5;
    else if (previewOutfit.backpack === 'tote_romantica') theoScore += 5;
    else if (previewOutfit.backpack === 'mochila_lotus') lucasScore += 5;

    let comment = 'Lucas: "Apresentação exemplar e impecavelmente alinhada aos padrões da Lótus."';
    if (danteScore > lucasScore && danteScore > theoScore) {
      comment = 'Dante: "Uau... Esse estilo tem atitude de sobra. Dá pra ver que você não tá aqui pra brincadeira."';
    } else if (theoScore > lucasScore && theoScore > danteScore) {
      comment = 'Theo: "Tons poéticos e acolhedores... Parece uma pintura feita à mão. Ficou muito lindo em você."';
    }

    return { danteScore, lucasScore, theoScore, comment };
  });

  // Ações
  function setOutfit(id: OutfitId) {
    previewOutfit.outfit_id = id;
  }

  function setBodyArchetype(id: BodyArchetype) {
    previewOutfit.body_archetype = id;
  }

  function setHairStyle(id: HairStyle) {
    previewOutfit.hair_style = id;
  }

  function setHairColor(colorHex: string) {
    previewOutfit.hair_color = colorHex;
  }

  function setBackpack(id: BackpackType) {
    previewOutfit.backpack = id;
  }

  function resetToSaved() {
    previewOutfit = { 
      ...gameState.equippedOutfit,
      outfit_id: gameState.equippedOutfit.outfit_id ?? 'uniforme_lotus',
      body_archetype: gameState.equippedOutfit.body_archetype ?? 'padrao',
      hair_style: (gameState.equippedOutfit.hair_style as HairStyle) ?? 'ondulado_longo',
      backpack: (gameState.equippedOutfit.backpack as BackpackType) ?? 'mochila_lotus',
      hair_color: gameState.equippedOutfit.hair_color ?? '#4a2c11',
      glasses: Boolean(gameState.equippedOutfit.glasses),
      blush: gameState.equippedOutfit.blush ?? true
    };
  }

  function saveAndApply() {
    gameState.equippedOutfit = {
      ...gameState.equippedOutfit,
      ...previewOutfit
    };

    // Bônus narrativo de afinidade
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

<!-- MODAL PRINCIPAL DO PROVADOR RECONSTRUÍDO DO ZERO (SEM SOBREPOSIÇÃO) -->
<div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
  
  <div class="relative w-full max-w-6xl h-[92vh] max-h-[860px] bg-[#12131a] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
    
    <!-- CABEÇALHO -->
    <header class="h-16 px-6 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Sparkles class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-base font-bold text-white tracking-wide">Personalização Completa da Protagonista</h2>
          <p class="text-xs text-zinc-400">Escolha look, 5 biotipos de corpo, penteados, cores e mochila</p>
        </div>
      </div>

      <!-- BADGES DE AFINIDADE EM TEMPO REAL -->
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

      <!-- BOTÃO FECHAR -->
      <button 
        onclick={onClose}
        class="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors"
        title="Fechar"
      >
        <X class="w-5 h-5" />
      </button>
    </header>

    <!-- ÁREA PRINCIPAL (PALCO CENTRAL À ESQUERDA + CONTROLES À DIREITA) -->
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
              🧍 Todo
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

        <!-- COMENTÁRIO DINÂMICO DOS PAQUERAS -->
        <div class="w-full p-3 rounded-2xl bg-black/60 border border-white/10 text-xs text-zinc-200 italic shadow-lg z-10">
          <p>{boyReactions.comment}</p>
        </div>
      </div>

      <!-- ================= COLUNA DIREITA: AS 5 ETAPAS DE PERSONALIZAÇÃO ================= -->
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

        <!-- CONTEÚDO DAS 5 ABAS -->
        <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          <!-- 1. ABA: LOOKS & TRAJES -->
          {#if activeTab === 'looks'}
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-bold text-white">Trajes Oficiais Completos</h3>
                <p class="text-xs text-zinc-400 mt-0.5">
                  Escolha o look principal da personagem (ilustrado sem sobreposição de peças):
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {#each OUTFIT_OPTIONS as look}
                  <div 
                    class="p-4 rounded-2xl border transition-all flex flex-col justify-between {previewOutfit.outfit_id === look.id ? 'border-amber-500 bg-amber-500/10 shadow-lg' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'}"
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
                      <h4 class="text-sm font-bold text-white mb-1">{look.name}</h4>
                      <p class="text-xs text-zinc-300 line-clamp-3 leading-relaxed">{look.description}</p>
                    </div>

                    <button 
                      onclick={() => setOutfit(look.id)}
                      class="mt-4 w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all {previewOutfit.outfit_id === look.id ? 'bg-emerald-500 text-white shadow' : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md'}"
                    >
                      {#if previewOutfit.outfit_id === look.id}
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

          <!-- 2. ABA: OS 5 TIPOS DE CORPO -->
          {:else if activeTab === 'corpos'}
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-bold text-white">5 Biotipos Anatômicos da Personagem</h3>
                <p class="text-xs text-zinc-400 mt-0.5">
                  Escolha como a estrutura física da protagonista é desenhada:
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {#each BODY_ARCHETYPES as arch}
                  <button 
                    onclick={() => setBodyArchetype(arch.id)}
                    class="p-4 rounded-2xl border text-left transition-all {previewOutfit.body_archetype === arch.id ? 'border-amber-500 bg-amber-500/15 shadow-xl ring-1 ring-amber-500/50' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'}"
                  >
                    <div class="flex items-center justify-between mb-1.5">
                      <span class="text-sm font-bold text-white">{arch.name}</span>
                      <span class="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-white/10 text-amber-300 font-bold">
                        {arch.badge}
                      </span>
                    </div>
                    <p class="text-xs text-zinc-300 leading-relaxed">{arch.description}</p>
                    <div class="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-amber-400">
                      {#if previewOutfit.body_archetype === arch.id}
                        <Check class="w-3.5 h-3.5" />
                        <span>Biotipo Ativo</span>
                      {:else}
                        <span class="text-zinc-500">Clique para selecionar</span>
                      {/if}
                    </div>
                  </button>
                {/each}
              </div>
            </div>

          <!-- 3. ABA: PENTEADOS / TIPOS DE CABELO -->
          {:else if activeTab === 'cabelos'}
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-bold text-white">Estilos e Penteados de Cabelo</h3>
                <p class="text-xs text-zinc-400 mt-0.5">
                  Escolha o corte que expressa a atitude da sua personagem:
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {#each HAIR_STYLES as hs}
                  <button 
                    onclick={() => setHairStyle(hs.id)}
                    class="p-4 rounded-2xl border text-left transition-all {previewOutfit.hair_style === hs.id ? 'border-amber-500 bg-amber-500/15 shadow-lg' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'}"
                  >
                    <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/10 text-amber-300 mb-2 inline-block">
                      {hs.tag}
                    </span>
                    <h4 class="text-sm font-bold text-white mb-1">{hs.name}</h4>
                    <p class="text-xs text-zinc-300 leading-relaxed mb-3">{hs.description}</p>
                    <div class="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                      {#if previewOutfit.hair_style === hs.id}
                        <Check class="w-3.5 h-3.5" />
                        <span>Equipado</span>
                      {:else}
                        <span class="text-zinc-500">Selecionar</span>
                      {/if}
                    </div>
                  </button>
                {/each}
              </div>
            </div>

          <!-- 4. ABA: CORES DE CABELO & ROSTO -->
          {:else if activeTab === 'cores'}
            <div class="space-y-6">
              <div>
                <h3 class="text-sm font-bold text-white">Paleta Dinâmica de Cores de Cabelo (Tempo Real)</h3>
                <p class="text-xs text-zinc-400 mt-0.5">
                  Selecione qualquer tom para tingir suavemente os fios:
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

              <!-- ACESSÓRIOS DE ROSTO: BLUSH & ÓCULOS -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div class="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <h4 class="text-sm font-bold text-white">🌸 Rubor Natural</h4>
                    <p class="text-xs text-zinc-400">Blush rosado nas bochechas</p>
                  </div>
                  <button 
                    onclick={() => previewOutfit.blush = !previewOutfit.blush}
                    class="px-4 py-1.5 rounded-xl text-xs font-bold transition-all {previewOutfit.blush ? 'bg-rose-500 text-white shadow' : 'bg-white/10 text-zinc-400'}"
                  >
                    {previewOutfit.blush ? 'Ativado' : 'Desativado'}
                  </button>
                </div>

                <div class="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <h4 class="text-sm font-bold text-white">👓 Óculos Redondos</h4>
                    <p class="text-xs text-zinc-400">Armação clássica dourada</p>
                  </div>
                  <button 
                    onclick={() => previewOutfit.glasses = !previewOutfit.glasses}
                    class="px-4 py-1.5 rounded-xl text-xs font-bold transition-all {previewOutfit.glasses ? 'bg-amber-500 text-stone-950 font-bold shadow' : 'bg-white/10 text-zinc-400'}"
                  >
                    {previewOutfit.glasses ? 'Equipado' : 'Equipar'}
                  </button>
                </div>
              </div>
            </div>

          <!-- 5. ABA: MOCHILAS & BOLSAS -->
          {:else if activeTab === 'mochilas'}
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-bold text-white">Mochilas & Bolsas para a Escola</h3>
                <p class="text-xs text-zinc-400 mt-0.5">
                  Escolha o acessório que a protagonista carrega:
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {#each BACKPACK_OPTIONS as bp}
                  <button 
                    onclick={() => setBackpack(bp.id)}
                    class="p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 {previewOutfit.backpack === bp.id ? 'border-amber-500 bg-amber-500/15 shadow-lg' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'}"
                  >
                    <span class="text-3xl p-2 rounded-xl bg-white/5 border border-white/10 shrink-0">
                      {bp.icon}
                    </span>
                    <div class="flex-1">
                      <div class="flex items-center justify-between">
                        <h4 class="text-sm font-bold text-white">{bp.name}</h4>
                        {#if bp.affinityTarget === 'lucas'}
                          <span class="text-[10px] font-bold text-blue-300">👔 Lótus</span>
                        {:else if bp.affinityTarget === 'dante'}
                          <span class="text-[10px] font-bold text-rose-300">🎸 Rock</span>
                        {:else if bp.affinityTarget === 'theo'}
                          <span class="text-[10px] font-bold text-emerald-300">🎨 Poético</span>
                        {/if}
                      </div>
                      <p class="text-xs text-zinc-300 mt-1 leading-relaxed">{bp.description}</p>
                      <div class="mt-2 text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                        {#if previewOutfit.backpack === bp.id}
                          <Check class="w-3.5 h-3.5" />
                          <span>Equipada</span>
                        {:else}
                          <span class="text-zinc-500">Selecionar</span>
                        {/if}
                      </div>
                    </div>
                  </button>
                {/each}
              </div>
            </div>
          {/if}

        </div>

        <!-- RODAPÉ FIXO COM SALVAR -->
        <footer class="h-18 px-6 border-t border-white/10 bg-black/40 flex items-center justify-between shrink-0">
          <div class="text-xs text-zinc-400 hidden sm:block">
            <span>Visual: </span>
            <strong class="text-white">
              {OUTFIT_OPTIONS.find(o => o.id === previewOutfit.outfit_id)?.name} • {BODY_ARCHETYPES.find(b => b.id === previewOutfit.body_archetype)?.name}
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
