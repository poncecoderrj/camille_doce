<script lang="ts">
  import { gameState } from '../game-state/GameState.svelte';
  import type { EquippedOutfit } from './wardrobe.schema';
  import { 
    WARDROBE_CATALOG, 
    OUTFIT_PRESETS, 
    SKIN_TONES, 
    EYE_COLORS, 
    HAIR_COLORS,
    BODY_PRESETS,
    HAIR_STYLES
  } from './wardrobe.catalog';
  import AnimeProtagonistDisplay, { type ProtagonistZoomMode } from './AnimeProtagonistDisplay.svelte';
  import { 
    Sparkles, 
    X, 
    RotateCcw, 
    ZoomIn, 
    ZoomOut, 
    Check, 
    Heart, 
    Smile, 
    Glasses, 
    SlidersHorizontal,
    ShoppingBag,
    Eye,
    User,
    Ruler,
    Activity,
    Palette
  } from 'lucide-svelte';

  interface Props {
    onClose: () => void;
  }

  let { onClose }: Props = $props();

  // Cópia local de rascunho para experimentar antes de confirmar
  let previewOutfit = $state<EquippedOutfit>({ ...gameState.equippedOutfit });

  // Controles de Câmera & Smart Auto-Zoom
  let zoomMode = $state<ProtagonistZoomMode>('corpo_inteiro');
  let activeTab = $state<'presets' | 'corpo' | 'rosto' | 'superior' | 'inferior' | 'vestido' | 'casaco' | 'calcado' | 'acessorios'>('presets');
  let selectedStyleFilter = $state<string>('todos');

  // Categorias de Abas
  const tabs = [
    { id: 'presets', label: 'Looks Prontos', icon: Sparkles },
    { id: 'corpo', label: 'Corpo & Físico', icon: User },
    { id: 'rosto', label: 'Cabelo & Rosto', icon: Smile },
    { id: 'superior', label: 'Partes de Cima', icon: ShoppingBag },
    { id: 'inferior', label: 'Partes de Baixo', icon: SlidersHorizontal },
    { id: 'vestido', label: 'Vestidos', icon: Heart },
    { id: 'casaco', label: 'Casacos', icon: SlidersHorizontal },
    { id: 'calcado', label: 'Sapatos & Meias', icon: SlidersHorizontal },
    { id: 'acessorios', label: 'Acessórios', icon: Glasses }
  ];

  // Alternador de Abas com Smart Auto-Zoom Contextual da Câmera
  function selectTab(tabId: typeof activeTab) {
    activeTab = tabId;
    if (tabId === 'rosto') {
      zoomMode = 'cabelo_rosto'; // Zoom no rosto e cabelo
    } else if (tabId === 'corpo') {
      zoomMode = 'corpo_inteiro'; // Afasta para ver altura e físico completo
    } else if (tabId === 'superior' || tabId === 'casaco') {
      zoomMode = 'torso'; // Zoom no tronco e jaqueta
    } else if (tabId === 'inferior' || tabId === 'calcado') {
      zoomMode = 'pernas_pes'; // Pan para pernas, saia e calçados
    } else {
      zoomMode = 'corpo_inteiro';
    }
  }

  // Itens filtrados para a aba ativa
  let currentItems = $derived(
    WARDROBE_CATALOG.filter(item => {
      let matchesCategory = false;
      if (activeTab === 'superior') matchesCategory = item.category === 'superior';
      else if (activeTab === 'inferior') matchesCategory = item.category === 'inferior';
      else if (activeTab === 'vestido') matchesCategory = item.category === 'vestido';
      else if (activeTab === 'casaco') matchesCategory = item.category === 'casaco';
      else if (activeTab === 'calcado') matchesCategory = item.category === 'calcado' || item.category === 'meia';
      else if (activeTab === 'acessorios') matchesCategory = ['chapeu', 'oculos', 'colar', 'bolsa'].includes(item.category);
      else if (activeTab === 'rosto') matchesCategory = item.category === 'cabelo_frente';

      if (!matchesCategory) return false;
      if (selectedStyleFilter === 'todos') return true;
      return item.tags.some(t => t.toLowerCase() === selectedStyleFilter.toLowerCase());
    })
  );

  // Cálculo Dinâmico de Afinidade & Estilo Dominante
  let styleScores = $derived.by(() => {
    let dante = 0;
    let lucas = 0;
    let theo = 0;

    // Vasculhar itens equipados
    const activeIds = [
      previewOutfit.top,
      previewOutfit.bottom,
      previewOutfit.dress,
      previewOutfit.jacket,
      previewOutfit.shoes,
      previewOutfit.socks,
      previewOutfit.hat,
      previewOutfit.glasses,
      previewOutfit.necklace,
      previewOutfit.bag,
      previewOutfit.hair_front
    ].filter(Boolean);

    for (const id of activeIds) {
      const item = WARDROBE_CATALOG.find(i => i.id === id);
      if (item) {
        if (item.affinityTarget === 'dante') dante += item.affinityBonus;
        else if (item.affinityTarget === 'lucas') lucas += item.affinityBonus;
        else if (item.affinityTarget === 'theo') theo += item.affinityBonus;
        else if (item.affinityTarget === 'todos') {
          dante += 2;
          lucas += 2;
          theo += 2;
        }
      }
    }

    let dominant: 'dante' | 'lucas' | 'theo' | 'equilibrado' = 'equilibrado';
    if (dante > lucas && dante > theo) dominant = 'dante';
    else if (lucas > dante && lucas > theo) dominant = 'lucas';
    else if (theo > dante && theo > lucas) dominant = 'theo';

    return { dante, lucas, theo, dominant };
  });

  // Reações Estimadas dos Rapazes
  let reactions = $derived.by(() => {
    const { dominant } = styleScores;
    let danteComment = 'Roupa estilosa. Tem atitude.';
    let lucasComment = 'Apresentação refinada e de acordo com a Lótus.';
    let theoComment = 'Cores poéticas... combinam com seu olhar.';

    if (dominant === 'dante') {
      danteComment = 'Uau... Essa jaqueta e esse visual têm tudo a ver com o som da banda.';
      lucasComment = 'Um pouco informal demais para a escola, mas tem personalidade.';
      theoComment = 'Um contraste marcante e cheio de energia.';
    } else if (dominant === 'lucas') {
      lucasComment = 'Impecável. Postura e elegância dignas da presidência estudantil.';
      danteComment = 'Meio certinha demais, parece pronta pra dar aula... mas ficou bem.';
      theoComment = 'Uma harmonia simétrica e muito clássica.';
    } else if (dominant === 'theo') {
      theoComment = 'Incrível... parece saída de uma pintura impressionista em aquarela.';
      danteComment = 'Parece confortável e meio vintage. Gostei.';
      lucasComment = 'Visual acolhedor e de muito bom gosto.';
    }

    return { danteComment, lucasComment, theoComment };
  });

  // Ações de Equipar Peças com Exclusividade de Slot e Prevenção de Conflitos
  function equipItem(item: (typeof WARDROBE_CATALOG)[0]) {
    if (item.category === 'superior') {
      // Se estava de vestido, desequipa o vestido para não sobrepor
      previewOutfit.dress = undefined;
      previewOutfit.top = item.id;
      // Garante que não fique sem saia/calça
      if (!previewOutfit.bottom) {
        previewOutfit.bottom = 'saia_pregueada_azul';
      }
    } else if (item.category === 'inferior') {
      // Se estava de vestido, desequipa o vestido
      previewOutfit.dress = undefined;
      previewOutfit.bottom = item.id;
      // Garante que não fique sem blusa
      if (!previewOutfit.top) {
        previewOutfit.top = 'camisa_uniforme_lotus';
      }
    } else if (item.category === 'vestido') {
      // Vestido é peça única de corpo inteiro: limpa top e bottom para evitar clipping
      previewOutfit.dress = item.id;
      previewOutfit.top = undefined;
      previewOutfit.bottom = undefined;
    } else if (item.category === 'casaco') {
      previewOutfit.jacket = previewOutfit.jacket === item.id ? undefined : item.id;
    } else if (item.category === 'calcado') {
      previewOutfit.shoes = item.id;
    } else if (item.category === 'meia') {
      previewOutfit.socks = previewOutfit.socks === item.id ? undefined : item.id;
    } else if (item.category === 'chapeu') {
      previewOutfit.hat = previewOutfit.hat === item.id ? undefined : item.id;
    } else if (item.category === 'oculos') {
      previewOutfit.glasses = previewOutfit.glasses === item.id ? undefined : item.id;
    } else if (item.category === 'colar') {
      previewOutfit.necklace = previewOutfit.necklace === item.id ? undefined : item.id;
    } else if (item.category === 'bolsa') {
      previewOutfit.bag = previewOutfit.bag === item.id ? undefined : item.id;
    } else if (item.category === 'cabelo_frente') {
      previewOutfit.hair_front = item.id;
    }
  }

  function isEquipped(id: string): boolean {
    return Object.values(previewOutfit).includes(id);
  }

  function applyPreset(preset: (typeof OUTFIT_PRESETS)[0]) {
    // Limpa camadas externas anteriores antes de aplicar o preset completo
    previewOutfit.top = undefined;
    previewOutfit.bottom = undefined;
    previewOutfit.dress = undefined;
    previewOutfit.jacket = undefined;
    previewOutfit.hat = undefined;
    previewOutfit.glasses = undefined;
    previewOutfit.necklace = undefined;
    previewOutfit.bag = undefined;
    previewOutfit.shoes = undefined;
    previewOutfit.socks = undefined;

    previewOutfit = {
      ...previewOutfit,
      ...preset.pieces
    };
  }

  function stripAll() {
    previewOutfit.top = undefined;
    previewOutfit.bottom = undefined;
    previewOutfit.dress = undefined;
    previewOutfit.jacket = undefined;
    previewOutfit.shoes = undefined;
    previewOutfit.socks = undefined;
    previewOutfit.hat = undefined;
    previewOutfit.glasses = undefined;
    previewOutfit.necklace = undefined;
    previewOutfit.bag = undefined;
  }

  function resetToSaved() {
    previewOutfit = { ...gameState.equippedOutfit };
  }

  function confirmOutfit() {
    gameState.equippedOutfit = { ...previewOutfit };
    gameState.flags.customizou_primeiro_dia = true;
    gameState.closeWardrobe();
    onClose();

    // Se estiver no nó do prólogo matinal (guarda-roupa), avança automaticamente para a próxima cena
    if (gameState.currentNodeId === 'node_00_guarda_roupa') {
      gameState.currentNodeId = 'node_00_mochila';
    }
  }
</script>

<!-- MODAL COMPLETO DE GUARDA-ROUPA / PROVADOR COM MOTOR THE SIMS -->
<div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in select-none">
  <div class="w-full max-w-6xl h-[92vh] flex flex-col rounded-3xl border border-white/10 bg-[#12131a] text-zinc-100 shadow-2xl overflow-hidden">
    
    <!-- CABEÇALHO DO PROVADOR -->
    <header class="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
          <Sparkles class="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h2 class="text-base sm:text-lg font-cinzel font-bold tracking-wide text-zinc-100">
            Provador & Personalização de Personagem
          </h2>
          <p class="text-xs text-zinc-400">
            Customize corpo, altura, cabelo, roupas e veja a reação em tempo real
          </p>
        </div>
      </div>

      <!-- BADGE DE AFINIDADE DOMINANTE -->
      <div class="hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
        <span class="text-xs text-zinc-400">Afinidade de Estilo:</span>
        <div class="flex items-center gap-2.5 text-xs font-semibold">
          <span class="px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30">
            🎸 Dante +{styleScores.dante}
          </span>
          <span class="px-2 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
            👔 Lucas +{styleScores.lucas}
          </span>
          <span class="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            🎨 Theo +{styleScores.theo}
          </span>
        </div>
      </div>

      <!-- BOTÃO FECHAR -->
      <button 
        onclick={onClose}
        class="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors"
      >
        <X class="w-5 h-5" />
      </button>
    </header>

    <!-- ÁREA PRINCIPAL DIVIDIDA (MANEQUIM À ESQUERDA + GUARDA-ROUPA À DIREITA) -->
    <div class="flex-1 flex flex-col md:flex-row overflow-hidden">
      
      <!-- ================= COLUNA ESQUERDA: PALCO CENTRALIZADO DO MANEQUIM ================= -->
      <div class="w-full md:w-[460px] lg:w-[500px] h-80 md:h-full flex flex-col items-center justify-between p-4 border-b md:border-b-0 md:border-r border-white/10 bg-radial from-[#1e202b] to-[#0c0d12] relative overflow-hidden shrink-0">
        
        <!-- HOLOFOTE DE LUZ SUAVE NO CHÃO -->
        <div class="absolute bottom-12 w-72 h-20 bg-amber-400/12 rounded-full blur-2xl pointer-events-none"></div>

        <!-- CONTROLES SUPERIORES DA CÂMERA INTELIGENTE -->
        <div class="w-full flex items-center justify-between z-10">
          <!-- Botoeira de Foco da Câmera (Auto & Manual) -->
          <div class="flex items-center gap-1 p-1 rounded-xl bg-black/50 border border-white/10 text-xs shadow-md">
            <button 
              title="Focar no Cabelo e Rosto"
              onclick={() => zoomMode = 'cabelo_rosto'}
              class="px-2 py-1 rounded-lg flex items-center gap-1 transition-all {zoomMode === 'cabelo_rosto' ? 'bg-amber-500 text-stone-950 font-bold shadow' : 'text-zinc-400 hover:text-white'}"
            >
              <span>👤 Rosto</span>
            </button>
            <button 
              title="Focar no Tronco e Camisa/Casaco"
              onclick={() => zoomMode = 'torso'}
              class="px-2 py-1 rounded-lg flex items-center gap-1 transition-all {zoomMode === 'torso' ? 'bg-amber-500 text-stone-950 font-bold shadow' : 'text-zinc-400 hover:text-white'}"
            >
              <span>👗 Tronco</span>
            </button>
            <button 
              title="Focar nas Pernas e Calçados"
              onclick={() => zoomMode = 'pernas_pes'}
              class="px-2 py-1 rounded-lg flex items-center gap-1 transition-all {zoomMode === 'pernas_pes' ? 'bg-amber-500 text-stone-950 font-bold shadow' : 'text-zinc-400 hover:text-white'}"
            >
              <span>🦵 Pernas</span>
            </button>
            <button 
              title="Visão Geral de Corpo Inteiro"
              onclick={() => zoomMode = 'corpo_inteiro'}
              class="px-2 py-1 rounded-lg flex items-center gap-1 transition-all {zoomMode === 'corpo_inteiro' ? 'bg-amber-500 text-stone-950 font-bold shadow' : 'text-zinc-400 hover:text-white'}"
            >
              <span>🧍 Todo</span>
            </button>
          </div>

          <!-- Indicador Numérico de Altura & Massa em Tempo Real -->
          <div class="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-black/50 border border-white/10 text-[11px] font-mono text-zinc-300">
            <span>📏 {(previewOutfit.height ?? 1.65).toFixed(2)}m</span>
            <span class="text-zinc-600">|</span>
            <span>⚖️ {(previewOutfit.body_build ?? 0) > 0 ? `+${previewOutfit.body_build}` : (previewOutfit.body_build ?? 0)}</span>
          </div>

          <!-- Expressão do Rosto -->
          <div class="flex items-center gap-1 p-1 rounded-xl bg-black/50 border border-white/10 text-xs">
            <button 
              title="Sorriso Gentil"
              onclick={() => previewOutfit.mouth_expression = 'boca_sorriso'}
              class="p-1.5 rounded-lg {previewOutfit.mouth_expression === 'boca_sorriso' ? 'bg-amber-500/30 text-amber-300' : 'text-zinc-400'}"
            >
              😊
            </button>
            <button 
              title="Expressão Tímida"
              onclick={() => previewOutfit.mouth_expression = 'boca_timida'}
              class="p-1.5 rounded-lg {previewOutfit.mouth_expression === 'boca_timida' ? 'bg-amber-500/30 text-amber-300' : 'text-zinc-400'}"
            >
              🥺
            </button>
            <button 
              title="Alternar Blush"
              onclick={() => previewOutfit.blush = !previewOutfit.blush}
              class="p-1.5 rounded-lg {previewOutfit.blush ? 'bg-rose-500/30 text-rose-300' : 'text-zinc-400'}"
            >
              🌸
            </button>
          </div>
        </div>

        <!-- RENDERIZADOR ANIME CENTRALIZADO (ILUSTRAÇÃO REAL 2D COM MOTOR MORFOLÓGICO THE SIMS) -->
        <div class="flex-1 w-full max-h-[500px] flex items-center justify-center my-auto z-10 overflow-hidden">
          <AnimeProtagonistDisplay 
            outfit={previewOutfit} 
            {zoomMode}
          />
        </div>

        <!-- BARRA INFERIOR DE AÇÕES RÁPIDAS NO MANEQUIM -->
        <div class="w-full flex items-center justify-between z-10 pt-2 border-t border-white/5 text-xs text-zinc-400">
          <button 
            onclick={resetToSaved}
            class="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <RotateCcw class="w-3.5 h-3.5" />
            <span>Restaurar Salvo</span>
          </button>
          <button 
            onclick={stripAll}
            class="hover:text-rose-400 transition-colors"
          >
            Despir Peças Externas
          </button>
        </div>
      </div>

      <!-- ================= COLUNA DIREITA: CATÁLOGO, MORFOLOGIA E ROUPAS ================= -->
      <div class="flex-1 flex flex-col overflow-hidden bg-[#101117]">
        
        <!-- ABAS DE NAVEGAÇÃO COM SMART AUTO-ZOOM -->
        <div class="flex items-center gap-1 px-4 pt-3 pb-2 border-b border-white/10 overflow-x-auto no-scrollbar bg-black/20">
          {#each tabs as tab}
            <button 
              onclick={() => selectTab(tab.id as any)}
              class="px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all {activeTab === tab.id ? 'bg-amber-500 text-stone-950 shadow-md font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}"
            >
              <tab.icon class="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          {/each}
        </div>

        <!-- FILTROS DE ESTILO (ROCK, CLÁSSICO, ROMÂNTICO, TODOS) -->
        {#if activeTab !== 'rosto' && activeTab !== 'presets' && activeTab !== 'corpo'}
          <div class="px-5 py-2.5 flex items-center gap-2 border-b border-white/5 bg-black/10 text-xs">
            <span class="text-zinc-400">Filtrar Estilo:</span>
            {#each ['todos', 'Clássico', 'Rock', 'Romântico', 'Casual'] as filter}
              <button 
                onclick={() => selectedStyleFilter = filter}
                class="px-2.5 py-1 rounded-lg capitalize transition-colors {selectedStyleFilter === filter ? 'bg-white/20 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'}"
              >
                {filter}
              </button>
            {/each}
          </div>
        {/if}

        <!-- CONTEÚDO DAS ABAS (GRID DE ITENS / CONTROLES THE SIMS) -->
        <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          <!-- 1. ABA: LOOKS PRONTOS (PRESETS) -->
          {#if activeTab === 'presets'}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {#each OUTFIT_PRESETS as preset}
                <div class="p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-amber-500/40 hover:bg-white/10 transition-all flex flex-col justify-between group">
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider {preset.styleTag === 'Rock' ? 'bg-rose-500/20 text-rose-300' : preset.styleTag === 'Clássico' ? 'bg-blue-500/20 text-blue-300' : 'bg-emerald-500/20 text-emerald-300'}">
                        {preset.styleTag}
                      </span>
                      <span class="text-[11px] font-medium text-amber-400">
                        {#if preset.affinityTarget === 'dante'}🎸 Rota Dante
                        {:else if preset.affinityTarget === 'lucas'}👔 Rota Lucas
                        {:else}🎨 Rota Theo
                        {/if}
                      </span>
                    </div>
                    <h3 class="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                      {preset.name}
                    </h3>
                    <p class="text-xs text-zinc-300 mt-1 line-clamp-2">
                      {preset.description}
                    </p>
                  </div>

                  <button 
                    onclick={() => applyPreset(preset)}
                    class="mt-4 w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all"
                  >
                    <Check class="w-4 h-4" />
                    <span>Vestir Este Look</span>
                  </button>
                </div>
              {/each}
            </div>

          <!-- 2. ABA: CORPO & FÍSICO (MOTOR THE SIMS COMPLETO) -->
          {:else if activeTab === 'corpo'}
            <div class="space-y-6">
              
              <!-- CARD INFORMATIVO DO MOTOR THE SIMS -->
              <div class="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-bold text-white flex items-center gap-2">
                    <User class="w-4 h-4 text-amber-400" />
                    <span>Personalização de Físico & Morfologia (Estilo The Sims)</span>
                  </h3>
                  <p class="text-xs text-zinc-400 mt-0.5">
                    Modifique a compleição de massa, altura e tônus muscular com feedback visual a 60FPS
                  </p>
                </div>
                <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono">
                  <span>{(previewOutfit.height ?? 1.65).toFixed(2)}m</span>
                  <span>•</span>
                  <span>{(previewOutfit.body_build ?? 0) > 15 ? 'Curvy' : (previewOutfit.body_build ?? 0) < -15 ? 'Petit' : 'Equilibrada'}</span>
                </div>
              </div>

              <!-- PRESETS RÁPIDOS DE BIOTIPO (1 CLIQUE) -->
              <div>
                <h4 class="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <Sparkles class="w-3.5 h-3.5 text-amber-400" />
                  <span>Biotipos Rápidos Prontos</span>
                </h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {#each BODY_PRESETS as preset}
                    {@const isCurrent = Math.abs((previewOutfit.height ?? 1.65) - preset.height) < 0.02 && Math.abs((previewOutfit.body_build ?? 0) - preset.body_build) < 5}
                    <button 
                      onclick={() => {
                        previewOutfit.height = preset.height;
                        previewOutfit.body_build = preset.body_build;
                        previewOutfit.muscle_tone = preset.muscle_tone;
                        previewOutfit.curve_ratio = preset.curve_ratio;
                      }}
                      class="p-3 rounded-2xl border text-left flex flex-col justify-between transition-all {isCurrent ? 'border-amber-400 bg-amber-500/15 ring-1 ring-amber-400/30' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'}"
                    >
                      <div>
                        <div class="flex items-center justify-between mb-1">
                          <span class="text-xs font-bold text-white">{preset.name}</span>
                          <span class="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-semibold text-amber-300">
                            {preset.badge}
                          </span>
                        </div>
                        <p class="text-[11px] text-zinc-400 line-clamp-2">{preset.description}</p>
                      </div>
                      <div class="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-400">
                        <span>Massa: {preset.body_build > 0 ? `+${preset.body_build}` : preset.body_build}</span>
                        <span>Músculo: {preset.muscle_tone}%</span>
                      </div>
                    </button>
                  {/each}
                </div>
              </div>

              <!-- SLIDERS DE AJUSTE FINO (THE SIMS MORPHOLOGY ENGINE) -->
              <div class="space-y-5 p-5 rounded-2xl bg-white/5 border border-white/10">
                <h4 class="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
                  <SlidersHorizontal class="w-3.5 h-3.5 text-amber-400" />
                  <span>Ajustes Finos de Morfologia Corporal</span>
                </h4>

                <!-- 1. SLIDER DE ALTURA -->
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between text-xs">
                    <label for="height-slider" class="font-semibold text-zinc-200 flex items-center gap-1.5 cursor-pointer">
                      <Ruler class="w-3.5 h-3.5 text-amber-400" />
                      <span>Estatura / Altura</span>
                    </label>
                    <div class="flex items-center gap-2">
                      <span class="text-[11px] text-zinc-400">
                        {#if (previewOutfit.height ?? 1.65) < 1.58}
                          Estatura Baixa / Mignon (Dante +{((1.82 - (previewOutfit.height ?? 1.65)) * 100).toFixed(0)}cm)
                        {:else if (previewOutfit.height ?? 1.65) > 1.72}
                          Estatura Alta / Esbelta (Theo +{((1.76 - (previewOutfit.height ?? 1.65)) * 100).toFixed(0)}cm)
                        {:else}
                          Estatura Média Equilibrada (Lucas +{((1.80 - (previewOutfit.height ?? 1.65)) * 100).toFixed(0)}cm)
                        {/if}
                      </span>
                      <span class="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold font-mono">
                        {(previewOutfit.height ?? 1.65).toFixed(2)} m
                      </span>
                    </div>
                  </div>
                  <input 
                    id="height-slider"
                    type="range" 
                    min="1.50" 
                    max="1.82" 
                    step="0.01" 
                    bind:value={previewOutfit.height}
                    class="w-full accent-amber-500 h-2 bg-zinc-700 rounded-lg cursor-pointer"
                  />
                  <div class="flex justify-between text-[10px] text-zinc-400">
                    <span>1.50m (Baixa / Petit)</span>
                    <span>1.65m (Padrão)</span>
                    <span>1.82m (Alta / Imponente)</span>
                  </div>
                </div>

                <!-- 2. SLIDER DE COMPLEIÇÃO / MASSA CORPORAL -->
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between text-xs">
                    <label for="mass-slider" class="font-semibold text-zinc-200 flex items-center gap-1.5 cursor-pointer">
                      <Activity class="w-3.5 h-3.5 text-rose-400" />
                      <span>Compleição Física / Massa</span>
                    </label>
                    <div class="flex items-center gap-2">
                      <span class="text-[11px] text-zinc-400">
                        {#if (previewOutfit.body_build ?? 0) <= -20}
                          Magra / Delicada
                        {:else if (previewOutfit.body_build ?? 0) >= 20}
                          Encorpada / Curvy Plus
                        {:else}
                          Média / Equilibrada
                        {/if}
                      </span>
                      <span class="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-bold font-mono">
                        {(previewOutfit.body_build ?? 0) > 0 ? `+${previewOutfit.body_build}` : (previewOutfit.body_build ?? 0)}
                      </span>
                    </div>
                  </div>
                  <input 
                    id="mass-slider"
                    type="range" 
                    min="-50" 
                    max="50" 
                    step="1" 
                    bind:value={previewOutfit.body_build}
                    class="w-full accent-rose-500 h-2 bg-zinc-700 rounded-lg cursor-pointer"
                  />
                  <div class="flex justify-between text-[10px] text-zinc-400">
                    <span>-50 (Esguia / Magra)</span>
                    <span>0 (Natural)</span>
                    <span>+50 (Curvy / Plus Size)</span>
                  </div>
                </div>

                <!-- 3. SLIDER DE DEFINIÇÃO MUSCULAR -->
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between text-xs">
                    <label for="muscle-slider" class="font-semibold text-zinc-200 flex items-center gap-1.5 cursor-pointer">
                      <Sparkles class="w-3.5 h-3.5 text-blue-400" />
                      <span>Definição Muscular & Tonificação</span>
                    </label>
                    <div class="flex items-center gap-2">
                      <span class="text-[11px] text-zinc-400">
                        {#if (previewOutfit.muscle_tone ?? 20) <= 25}
                          Suave / Macia
                        {:else if (previewOutfit.muscle_tone ?? 20) >= 70}
                          Firme / Atlética
                        {:else}
                          Tonificada
                        {/if}
                      </span>
                      <span class="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-bold font-mono">
                        {previewOutfit.muscle_tone ?? 20}%
                      </span>
                    </div>
                  </div>
                  <input 
                    id="muscle-slider"
                    type="range" 
                    min="0" 
                    max="100" 
                    step="1" 
                    bind:value={previewOutfit.muscle_tone}
                    class="w-full accent-blue-500 h-2 bg-zinc-700 rounded-lg cursor-pointer"
                  />
                  <div class="flex justify-between text-[10px] text-zinc-400">
                    <span>0% (Suave)</span>
                    <span>50% (Tonificada)</span>
                    <span>100% (Atlética / Firme)</span>
                  </div>
                </div>

                <!-- 4. SLIDER DE CURVATURA DA SILHUETA -->
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between text-xs">
                    <label for="curve-slider" class="font-semibold text-zinc-200 flex items-center gap-1.5 cursor-pointer">
                      <SlidersHorizontal class="w-3.5 h-3.5 text-emerald-400" />
                      <span>Curvatura da Silhueta</span>
                    </label>
                    <div class="flex items-center gap-2">
                      <span class="text-[11px] text-zinc-400">
                        {#if (previewOutfit.curve_ratio ?? 0) <= -12}
                          Linha Reta / Tubular
                        {:else if (previewOutfit.curve_ratio ?? 0) >= 12}
                          Curvilínea / Ampulheta
                        {:else}
                          Harmônica
                        {/if}
                      </span>
                      <span class="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold font-mono">
                        {(previewOutfit.curve_ratio ?? 0) > 0 ? `+${previewOutfit.curve_ratio}` : (previewOutfit.curve_ratio ?? 0)}
                      </span>
                    </div>
                  </div>
                  <input 
                    id="curve-slider"
                    type="range" 
                    min="-30" 
                    max="30" 
                    step="1" 
                    bind:value={previewOutfit.curve_ratio}
                    class="w-full accent-emerald-500 h-2 bg-zinc-700 rounded-lg cursor-pointer"
                  />
                  <div class="flex justify-between text-[10px] text-zinc-400">
                    <span>-30 (Reta)</span>
                    <span>0 (Padrão)</span>
                    <span>+30 (Ampulheta Acentuada)</span>
                  </div>
                </div>
              </div>

            </div>

          <!-- 3. ABA: CABELO & ROSTO -->
          {:else if activeTab === 'rosto'}
            <div class="space-y-6">
              
              <!-- Penteados / Cortes de Cabelo (The Sims Style) -->
              <div>
                <h4 class="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Sparkles class="w-3.5 h-3.5 text-amber-400" />
                  <span>Estilos de Corte & Penteado</span>
                </h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {#each HAIR_STYLES as style}
                    {@const isCurrent = (previewOutfit.hair_style ?? 'longo_onda') === style.id}
                    <button 
                      onclick={() => previewOutfit.hair_style = style.id}
                      class="p-3 rounded-2xl border text-left flex flex-col justify-between transition-all {isCurrent ? 'border-amber-400 bg-amber-500/15 ring-1 ring-amber-400/30' : 'border-white/10 bg-white/5 hover:border-white/20'}"
                    >
                      <div>
                        <div class="flex items-center justify-between mb-1">
                          <span class="text-xs font-bold text-white">{style.name}</span>
                          <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-white/10 text-amber-300">{style.tag}</span>
                        </div>
                        <p class="text-[11px] text-zinc-400 line-clamp-2">{style.description}</p>
                      </div>
                      {#if isCurrent}
                        <div class="mt-2 text-right">
                          <span class="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400">
                            <Check class="w-3 h-3 stroke-[3]" /> Equipado
                          </span>
                        </div>
                      {/if}
                    </button>
                  {/each}
                </div>
              </div>

              <!-- Cor do Cabelo (Paleta 10 Cores Anime + Seletor Hexadecimal) -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                    <Palette class="w-3.5 h-3.5 text-amber-400" />
                    <span>Cor do Cabelo</span>
                  </h4>
                  <!-- Color Picker Customizado -->
                  <div class="flex items-center gap-2">
                    <label for="custom-hair-color" class="text-[11px] text-zinc-400 cursor-pointer">Cor Personalizada:</label>
                    <input 
                      id="custom-hair-color"
                      type="color" 
                      bind:value={previewOutfit.hair_color}
                      class="w-6 h-6 rounded-md border border-white/20 bg-transparent cursor-pointer"
                    />
                    <span class="text-[10px] font-mono text-zinc-400">{previewOutfit.hair_color}</span>
                  </div>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {#each HAIR_COLORS as hair}
                    <button 
                      onclick={() => previewOutfit.hair_color = hair.id}
                      class="p-2.5 rounded-xl border flex items-center gap-2.5 transition-all {previewOutfit.hair_color === hair.id ? 'border-amber-400 bg-amber-500/10' : 'border-white/10 hover:border-white/30'}"
                    >
                      <span class="w-4 h-4 rounded-full border border-black/30 shrink-0" style="background-color: {hair.color};"></span>
                      <span class="text-xs text-zinc-200 truncate">{hair.name}</span>
                    </button>
                  {/each}
                </div>
              </div>

              <!-- Tom de Pele -->
              <div>
                <h4 class="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Tom de Pele</h4>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {#each SKIN_TONES as skin}
                    <button 
                      onclick={() => previewOutfit.skin_color = skin.id}
                      class="p-2.5 rounded-xl border flex items-center gap-2.5 transition-all {previewOutfit.skin_color === skin.id ? 'border-amber-400 bg-amber-500/10' : 'border-white/10 hover:border-white/30'}"
                    >
                      <span class="w-5 h-5 rounded-full border border-black/30 shadow-sm shrink-0" style="background-color: {skin.fill};"></span>
                      <span class="text-xs text-zinc-200">{skin.name}</span>
                    </button>
                  {/each}
                </div>
              </div>

              <!-- Cor dos Olhos -->
              <div>
                <h4 class="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Cor dos Olhos</h4>
                <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {#each EYE_COLORS as eye}
                    <button 
                      onclick={() => previewOutfit.eye_color = eye.id}
                      class="p-2.5 rounded-xl border flex items-center gap-2.5 transition-all {previewOutfit.eye_color === eye.id ? 'border-amber-400 bg-amber-500/10' : 'border-white/10 hover:border-white/30'}"
                    >
                      <span class="w-4 h-4 rounded-full border border-black/30 shrink-0" style="background-color: {eye.color};"></span>
                      <span class="text-xs text-zinc-200">{eye.name}</span>
                    </button>
                  {/each}
                </div>
              </div>

            </div>

          <!-- 4. ABAS DE PEÇAS DE ROUPA (SUPERIOR, INFERIOR, VESTIDOS, CASACOS, ETC.) -->
          {:else}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {#each currentItems as item}
                {@const equipped = isEquipped(item.id)}
                <div class="p-3 rounded-2xl border transition-all flex flex-col justify-between {equipped ? 'border-amber-400 bg-amber-500/10 ring-1 ring-amber-400/30' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'}">
                  <div>
                    <div class="flex items-center justify-between mb-1.5">
                      <span class="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wide bg-white/10 text-zinc-300">
                        {item.tags[0]}
                      </span>
                      {#if item.affinityTarget && item.affinityTarget !== 'todos'}
                        <span class="text-[10px] font-semibold {item.affinityTarget === 'dante' ? 'text-rose-400' : item.affinityTarget === 'lucas' ? 'text-blue-400' : 'text-emerald-400'}">
                          +{item.affinityBonus} {item.affinityTarget.toUpperCase()}
                        </span>
                      {/if}
                    </div>

                    <h4 class="text-xs font-bold text-white">
                      {item.name}
                    </h4>
                    <p class="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <button 
                    onclick={() => equipItem(item)}
                    class="mt-3 w-full py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all {equipped ? 'bg-zinc-700 text-white hover:bg-rose-900/60 hover:text-rose-200' : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-stone-950'}"
                  >
                    {#if equipped}
                      <Check class="w-3.5 h-3.5" />
                      <span>Equipado</span>
                    {:else}
                      <span>Vestir Peça</span>
                    {/if}
                  </button>
                </div>
              {/each}
            </div>
          {/if}

        </div>

      </div>

    </div>

    <!-- RODAPÉ: REAÇÃO DOS RAPAZES & BOTÃO CONFIRMAR -->
    <footer class="p-4 border-t border-white/10 bg-black/60 flex flex-col sm:flex-row items-center justify-between gap-4">
      
      <!-- Reações Instantâneas dos 3 Romances -->
      <div class="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div class="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-[10px] font-bold text-rose-300 shrink-0">D</span>
          <p class="text-[11px] text-zinc-300 truncate" title={reactions.danteComment}>"{reactions.danteComment}"</p>
        </div>
        <div class="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-[10px] font-bold text-blue-300 shrink-0">L</span>
          <p class="text-[11px] text-zinc-300 truncate" title={reactions.lucasComment}>"{reactions.lucasComment}"</p>
        </div>
        <div class="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[10px] font-bold text-emerald-300 shrink-0">T</span>
          <p class="text-[11px] text-zinc-300 truncate" title={reactions.theoComment}>"{reactions.theoComment}"</p>
        </div>
      </div>

      <!-- BOTÃO DE CONFIRMAR VISUAL -->
      <button 
        onclick={confirmOutfit}
        class="w-full sm:w-auto px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-xl hover:shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
      >
        <Check class="w-4 h-4 stroke-[3]" />
        <span>Confirmar e Salvar Visual</span>
      </button>

    </footer>

  </div>
</div>
