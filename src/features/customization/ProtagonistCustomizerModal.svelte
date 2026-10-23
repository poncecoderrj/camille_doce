<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { 
    Shirt, 
    Sparkles, 
    Scissors, 
    Palette, 
    Backpack, 
    Glasses, 
    Check, 
    RotateCcw, 
    X, 
    Heart, 
    Smile,
    Flame
  } from 'lucide-svelte';
  import { gameState } from '../game-state/GameState.svelte';
  import ProtagonistActor from './ProtagonistActor.svelte';
  import type { 
    ProtagonistCustomization, 
    OutfitId, 
    BodyArchetype, 
    HairStyle, 
    BackpackType 
  } from './customization.schema';
  import { 
    OUTFIT_OPTIONS, 
    BODY_ARCHETYPES, 
    HAIR_STYLES, 
    HAIR_COLORS, 
    BACKPACK_OPTIONS, 
    BOY_REACTIONS 
  } from './customization.catalog';

  type ActiveTab = 'look' | 'corpo' | 'penteado' | 'cores' | 'mochila';

  let activeTab = $state<ActiveTab>('look');
  let boyReactionTarget = $state<'dante' | 'lucas' | 'theo'>('dante');

  // Estado local editável (cópia de trabalho antes de salvar)
  let draftCustomization = $state<ProtagonistCustomization>({
    outfit_id: (gameState.equippedOutfit?.outfit_id as OutfitId) || 'uniforme_lotus',
    body_archetype: (gameState.equippedOutfit?.body_archetype as BodyArchetype) || 'padrao',
    hair_color: gameState.equippedOutfit?.hair_color || '#4a2c11',
    hair_style: (gameState.equippedOutfit?.hair_style as HairStyle) || 'ondulado_longo',
    backpack: (gameState.equippedOutfit?.backpack as BackpackType) || 'mochila_lotus',
    glasses: gameState.equippedOutfit?.glasses ?? false,
    blush: gameState.equippedOutfit?.blush ?? true,
    expression: gameState.equippedOutfit?.expression || 'feliz'
  });

  // Câmera dinâmica com Auto-Zoom sincronizada com a aba ativa
  let cameraFocus = $derived.by(() => {
    switch (activeTab) {
      case 'look':
        return 'torso' as const;
      case 'corpo':
        return 'corpo_inteiro' as const;
      case 'penteado':
      case 'cores':
        return 'cabelo_rosto' as const;
      case 'mochila':
        return 'torso' as const;
      default:
        return 'corpo_inteiro' as const;
    }
  });

  // Reação dinâmica do pretendente selecionado
  let activeReactionText = $derived.by(() => {
    const reactions = BOY_REACTIONS[draftCustomization.outfit_id] || BOY_REACTIONS.uniforme_lotus;
    return reactions[boyReactionTarget];
  });

  const boyProfiles = {
    dante: { name: 'Dante', role: 'Guitarrista Rebelde', color: '#e11d48', badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
    lucas: { name: 'Lucas', role: 'Presidente do Grêmio', color: '#2563eb', badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
    theo: { name: 'Theo', role: 'Artista Poético', color: '#059669', badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' }
  };

  function selectOutfit(id: OutfitId) {
    draftCustomization.outfit_id = id;
    // Auto-direcionar reação para o pretendente que ama o look
    const opt = OUTFIT_OPTIONS.find(o => o.id === id);
    if (opt) {
      boyReactionTarget = opt.affinityTarget;
    }
  }

  function selectBody(id: BodyArchetype) {
    draftCustomization.body_archetype = id;
  }

  function selectHairStyle(id: HairStyle) {
    draftCustomization.hair_style = id;
  }

  function selectHairColor(hex: string) {
    draftCustomization.hair_color = hex;
  }

  function selectBackpack(id: BackpackType) {
    draftCustomization.backpack = id;
    const opt = BACKPACK_OPTIONS.find(b => b.id === id);
    if (opt && opt.affinityTarget !== 'todos') {
      boyReactionTarget = opt.affinityTarget;
    }
  }

  function setExpression(expr: string) {
    draftCustomization.expression = expr;
  }

  function handleReset() {
    draftCustomization = {
      outfit_id: 'uniforme_lotus',
      body_archetype: 'padrao',
      hair_color: '#4a2c11',
      hair_style: 'ondulado_longo',
      backpack: 'mochila_lotus',
      glasses: false,
      blush: true,
      expression: 'feliz'
    };
  }

  function handleSaveAndContinue() {
    // 1. Salvar no estado permanente
    gameState.equippedOutfit = { ...draftCustomization };
    gameState.flags.customizou_primeiro_dia = true;

    // 2. Conceder bônus de afinidade baseado no look escolhido
    const chosenOutfit = OUTFIT_OPTIONS.find(o => o.id === draftCustomization.outfit_id);
    if (chosenOutfit) {
      gameState.modifyAffinity(chosenOutfit.affinityTarget, chosenOutfit.affinityBonus);
    }

    // 3. Fechar modal
    gameState.closeWardrobe();
  }

  const expressionsList = [
    { id: 'feliz', label: 'Feliz', icon: '✨' },
    { id: 'sorriso', label: 'Sorriso', icon: '😊' },
    { id: 'neutro', label: 'Neutro', icon: '😐' },
    { id: 'corado', label: 'Corada', icon: '🌸' },
    { id: 'timido', label: 'Tímida', icon: '🫣' },
    { id: 'smirk', label: 'Confiante', icon: '😏' },
    { id: 'surpreso', label: 'Surpresa', icon: '😲' }
  ];
</script>

<!-- MODAL OVERLAY COMPLETO DE PERSONALIZAÇÃO -->
<div 
  class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md select-none overflow-hidden"
  transition:fade={{ duration: 250 }}
>
  <!-- CONTAINER DO PROVADOR / CLOSET LUXUOSO -->
  <div 
    class="relative w-full max-w-6xl h-[94vh] max-h-[880px] bg-[#0c0d12]/95 border border-amber-500/25 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-zinc-100"
    transition:fly={{ y: 20, duration: 300 }}
  >
    <!-- CABEÇALHO SUPERIOR DO CLOSET -->
    <header class="h-14 sm:h-16 px-4 sm:px-6 border-b border-white/10 flex items-center justify-between bg-[#11131c]/80 backdrop-blur-md shrink-0">
      <div class="flex items-center gap-3">
        <div class="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
          <Shirt class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-sm sm:text-base font-cinzel font-bold text-white flex items-center gap-2">
            Personalização da Heroína
            <span class="text-[10px] font-sans px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold uppercase tracking-wider">
              Íris
            </span>
          </h2>
          <p class="text-xs text-zinc-400 font-sans-ui hidden sm:block">
            Defina o visual oficial, biotipo corporal e acessórios para os 10 anos de história
          </p>
        </div>
      </div>

      <!-- BOTÃO FECHAR SUPERIOR -->
      <button 
        onclick={() => gameState.closeWardrobe()}
        title="Fechar Closet"
        class="p-2 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all active:scale-95"
      >
        <X class="w-5 h-5" />
      </button>
    </header>

    <!-- CORPO PRINCIPAL COM DIVISÃO DUPLA (PALCO DO ATOR À ESQUERDA + PAINEL DE ABAS À DIREITA) -->
    <div class="flex-1 flex flex-col lg:flex-row overflow-hidden">
      
      <!-- LADO ESQUERDO: PALCO CENTRAL DO ATOR 2D COM EFEITO DE CÂMERA -->
      <div class="relative w-full lg:w-[46%] h-64 sm:h-80 lg:h-full bg-radial from-[#1e1c28]/60 via-[#101017] to-[#090a0f] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col items-center justify-end p-4 overflow-hidden shrink-0">
        
        <!-- HOLOFOTE DECORATIVO DE FUNDO -->
        <div class="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-amber-400/10 to-transparent pointer-events-none blur-2xl"></div>

        <!-- INDICADOR VISUAL DO FOCO DE CÂMERA ATIVO -->
        <div class="absolute top-3 left-3 z-30 px-3 py-1 rounded-full bg-black/50 border border-white/10 backdrop-blur-md text-[11px] font-sans text-zinc-300 flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>
            {cameraFocus === 'cabelo_rosto' ? 'Foco Facial & Cabelo' : cameraFocus === 'torso' ? 'Foco Vestuário' : 'Visão Completa'}
          </span>
        </div>

        <!-- SELETOR RÁPIDO DE EXPRESSÃO FACIAL NO PALCO -->
        <div class="absolute top-3 right-3 z-30 flex items-center gap-1 bg-black/60 border border-white/10 rounded-2xl p-1 backdrop-blur-md">
          {#each expressionsList as expr}
            <button
              onclick={() => setExpression(expr.id)}
              title={expr.label}
              class="w-7 h-7 rounded-xl flex items-center justify-center text-xs transition-all {draftCustomization.expression === expr.id ? 'bg-amber-500 text-stone-950 font-bold scale-110 shadow-md' : 'text-zinc-400 hover:text-white hover:bg-white/10'}"
            >
              {expr.icon}
            </button>
          {/each}
        </div>

        <!-- COMPONENTE PRINCIPAL DO ATOR DA HEROÍNA -->
        <div class="relative w-full h-[95%] flex items-end justify-center pointer-events-none">
          <ProtagonistActor 
            customization={draftCustomization}
            {cameraFocus}
            scale={1.05}
          />
        </div>

        <!-- CAIXA DE REAÇÃO DINÂMICA DOS RAPAZES (DANTE, LUCAS, THEO) -->
        <div class="w-full max-w-md z-30 mt-2 bg-[#141622]/90 border border-white/10 rounded-2xl p-3 backdrop-blur-xl shadow-lg">
          <div class="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
            <span class="text-[10px] uppercase font-cinzel font-bold text-zinc-400 tracking-wider">
              Reação dos Rapazes
            </span>
            <!-- Seletor de Pretendente -->
            <div class="flex items-center gap-1">
              {#each (['dante', 'lucas', 'theo'] as const) as boy}
                <button
                  onclick={() => boyReactionTarget = boy}
                  class="px-2 py-0.5 rounded-lg text-[10px] font-cinzel font-semibold transition-all {boyReactionTarget === boy ? boyProfiles[boy].badgeClass + ' border' : 'text-zinc-500 hover:text-zinc-300'}"
                >
                  {boyProfiles[boy].name}
                </button>
              {/each}
            </div>
          </div>

          <div class="flex items-start gap-2.5">
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

      <!-- LADO DIREITO: NAVEGAÇÃO POR ABAS E CARDS DE PERSONALIZAÇÃO -->
      <div class="flex-1 flex flex-col overflow-hidden bg-[#0e1017]">
        
        <!-- BARRA DE NAVEGAÇÃO DAS 5 ABAS -->
        <nav class="flex items-center border-b border-white/10 bg-[#12141d] overflow-x-auto custom-scrollbar shrink-0 px-2 sm:px-4 py-2 gap-1 sm:gap-2">
          
          <button 
            onclick={() => activeTab = 'look'}
            class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-cinzel font-semibold transition-all shrink-0 {activeTab === 'look' ? 'bg-amber-500 text-stone-950 shadow-md font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}"
          >
            <Shirt class="w-4 h-4" />
            <span>1. Looks & Trajes</span>
          </button>

          <button 
            onclick={() => activeTab = 'corpo'}
            class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-cinzel font-semibold transition-all shrink-0 {activeTab === 'corpo' ? 'bg-amber-500 text-stone-950 shadow-md font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}"
          >
            <Sparkles class="w-4 h-4" />
            <span>2. Corpos (5)</span>
          </button>

          <button 
            onclick={() => activeTab = 'penteado'}
            class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-cinzel font-semibold transition-all shrink-0 {activeTab === 'penteado' ? 'bg-amber-500 text-stone-950 shadow-md font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}"
          >
            <Scissors class="w-4 h-4" />
            <span>3. Penteados</span>
          </button>

          <button 
            onclick={() => activeTab = 'cores'}
            class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-cinzel font-semibold transition-all shrink-0 {activeTab === 'cores' ? 'bg-amber-500 text-stone-950 shadow-md font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}"
          >
            <Palette class="w-4 h-4" />
            <span>4. Cores & Rosto</span>
          </button>

          <button 
            onclick={() => activeTab = 'mochila'}
            class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-cinzel font-semibold transition-all shrink-0 {activeTab === 'mochila' ? 'bg-amber-500 text-stone-950 shadow-md font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}"
          >
            <Backpack class="w-4 h-4" />
            <span>5. Mochilas</span>
          </button>

        </nav>

        <!-- CONTEÚDO SCROLLÁVEL DA ABA ATIVA -->
        <div class="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          
          <!-- ================= ABA 1: LOOKS & TRAJES OFICIAIS ================= -->
          {#if activeTab === 'look'}
            <div class="space-y-4" in:fade={{ duration: 200 }}>
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-cinzel font-bold text-white">Trajes Oficiais sem Sobreposição</h3>
                  <p class="text-xs text-zinc-400 font-sans-ui">
                    Ilustrações completas de estúdio desenhadas individualmente para o biotipo escolhido.
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-3.5">
                {#each OUTFIT_OPTIONS as outfit}
                  {@const isSelected = draftCustomization.outfit_id === outfit.id}
                  {@const boy = boyProfiles[outfit.affinityTarget]}
                  <button
                    onclick={() => selectOutfit(outfit.id)}
                    class="w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 {isSelected ? 'bg-amber-500/10 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'bg-[#141620] border-white/8 hover:border-white/20 hover:bg-[#1a1d2b]'}"
                  >
                    <!-- Miniatura do Traje -->
                    <div class="w-16 h-24 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0 relative flex items-end justify-center">
                      <img 
                        src={outfit.previewImage} 
                        alt={outfit.name} 
                        class="h-full object-contain object-bottom"
                      />
                    </div>

                    <!-- Dados e Bônus -->
                    <div class="flex-1">
                      <div class="flex items-center justify-between gap-2">
                        <div class="flex items-center gap-2">
                          <h4 class="text-sm font-cinzel font-bold {isSelected ? 'text-amber-400' : 'text-white'}">
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

                      <div class="mt-2.5 flex items-center gap-2 text-[11px] font-sans">
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

          <!-- ================= ABA 2: OS 5 TIPOS DE CORPO ANATÔMICOS ================= -->
          {:else if activeTab === 'corpo'}
            <div class="space-y-4" in:fade={{ duration: 200 }}>
              <div>
                <h3 class="text-sm font-cinzel font-bold text-white">5 Biotipos Anatômicos Exclusivos</h3>
                <p class="text-xs text-zinc-400 font-sans-ui">
                  Cada biotipo foi desenhado com anatomia e peso específicos, preservando fidelidade estética shoujo.
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {#each BODY_ARCHETYPES as body}
                  {@const isSelected = draftCustomization.body_archetype === body.id}
                  <button
                    onclick={() => selectBody(body.id)}
                    class="text-left p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between {isSelected ? 'bg-amber-500/10 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'bg-[#141620] border-white/8 hover:border-white/20 hover:bg-[#1a1d2b]'}"
                  >
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-white/10 text-amber-300 border border-white/10">
                          {body.badge}
                        </span>
                        {#if isSelected}
                          <span class="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center">
                            <Check class="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        {/if}
                      </div>

                      <h4 class="text-sm font-cinzel font-bold {isSelected ? 'text-amber-400' : 'text-white'}">
                        {body.name}
                      </h4>
                      <p class="text-xs text-zinc-300 font-sans-ui mt-1 leading-relaxed">
                        {body.description}
                      </p>
                    </div>

                    <div class="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
                      <span>Altura Projetada</span>
                      <span class="font-bold text-white">{body.heightLabel}</span>
                    </div>
                  </button>
                {/each}
              </div>
            </div>

          <!-- ================= ABA 3: PENTEADOS / TIPOS DE CABELO ================= -->
          {:else if activeTab === 'penteado'}
            <div class="space-y-4" in:fade={{ duration: 200 }}>
              <div>
                <h3 class="text-sm font-cinzel font-bold text-white">Penteados e Estilo de Cabelo</h3>
                <p class="text-xs text-zinc-400 font-sans-ui">
                  Escolha o corte que melhor expressa a personalidade da protagonista no colégio.
                </p>
              </div>

              <div class="grid grid-cols-1 gap-3.5">
                {#each HAIR_STYLES as hair}
                  {@const isSelected = draftCustomization.hair_style === hair.id}
                  <button
                    onclick={() => selectHairStyle(hair.id)}
                    class="text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between {isSelected ? 'bg-amber-500/10 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'bg-[#141620] border-white/8 hover:border-white/20 hover:bg-[#1a1d2b]'}"
                  >
                    <div>
                      <div class="flex items-center gap-2 mb-1">
                        <h4 class="text-sm font-cinzel font-bold {isSelected ? 'text-amber-400' : 'text-white'}">
                          {hair.name}
                        </h4>
                        <span class="text-[10px] font-sans px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
                          {hair.badge}
                        </span>
                      </div>
                      <p class="text-xs text-zinc-300 font-sans-ui">
                        {hair.description}
                      </p>
                    </div>

                    {#if isSelected}
                      <span class="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 ml-3">
                        <Check class="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    {/if}
                  </button>
                {/each}
              </div>
            </div>

          <!-- ================= ABA 4: CORES DO CABELO & ACESSÓRIOS FACIAIS ================= -->
          {:else if activeTab === 'cores'}
            <div class="space-y-6" in:fade={{ duration: 200 }}>
              
              <!-- SEÇÃO: 10 CORES EM TEMPO REAL -->
              <div>
                <h3 class="text-sm font-cinzel font-bold text-white mb-1">Coloração Capilar em Tempo Real</h3>
                <p class="text-xs text-zinc-400 font-sans-ui mb-3">
                  Tintura dinâmica com preservação de mechas e brilho natural.
                </p>

                <div class="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {#each HAIR_COLORS as colorOpt}
                    {@const isSelected = draftCustomization.hair_color === colorOpt.color}
                    <button
                      onclick={() => selectHairColor(colorOpt.color)}
                      class="p-2.5 rounded-xl border flex flex-col items-center gap-2 transition-all {isSelected ? 'bg-amber-500/15 border-amber-500 scale-105' : 'bg-[#141620] border-white/10 hover:border-white/25'}"
                    >
                      <div 
                        class="w-8 h-8 rounded-full border-2 shadow-inner relative flex items-center justify-center"
                        style="background: {colorOpt.color}; border-color: {colorOpt.highlight};"
                      >
                        {#if isSelected}
                          <Check class="w-4 h-4 text-white stroke-[3] drop-shadow-md" />
                        {/if}
                      </div>
                      <span class="text-[10px] font-cinzel font-bold text-zinc-200 text-center">
                        {colorOpt.name}
                      </span>
                    </button>
                  {/each}
                </div>
              </div>

              <!-- SEÇÃO: ACESSÓRIOS FACIAIS (ÓCULOS & BLUSH) -->
              <div class="pt-4 border-t border-white/10 space-y-3">
                <h3 class="text-sm font-cinzel font-bold text-white">Acessórios Faciais</h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  <!-- TOGGLE ÓCULOS REDONDOS DOURADOS -->
                  <button
                    onclick={() => draftCustomization.glasses = !draftCustomization.glasses}
                    class="p-3.5 rounded-xl border flex items-center justify-between transition-all {draftCustomization.glasses ? 'bg-amber-500/15 border-amber-500' : 'bg-[#141620] border-white/10 hover:border-white/20'}"
                  >
                    <div class="flex items-center gap-3">
                      <div class="p-2 rounded-lg bg-amber-500/20 text-amber-300">
                        <Glasses class="w-5 h-5" />
                      </div>
                      <div class="text-left">
                        <h4 class="text-xs font-cinzel font-bold text-white">Óculos Redondos Dourados</h4>
                        <p class="text-[11px] text-zinc-400">Armação clássica de leitura</p>
                      </div>
                    </div>
                    <div class="w-5 h-5 rounded-md border flex items-center justify-center {draftCustomization.glasses ? 'bg-amber-500 border-amber-500 text-stone-950' : 'border-white/20'}">
                      {#if draftCustomization.glasses}
                        <Check class="w-3.5 h-3.5 stroke-[3]" />
                      {/if}
                    </div>
                  </button>

                  <!-- TOGGLE BLUSH SUAVE -->
                  <button
                    onclick={() => draftCustomization.blush = !draftCustomization.blush}
                    class="p-3.5 rounded-xl border flex items-center justify-between transition-all {draftCustomization.blush ? 'bg-rose-500/15 border-rose-500' : 'bg-[#141620] border-white/10 hover:border-white/20'}"
                  >
                    <div class="flex items-center gap-3">
                      <div class="p-2 rounded-lg bg-rose-500/20 text-rose-300">
                        <Smile class="w-5 h-5" />
                      </div>
                      <div class="text-left">
                        <h4 class="text-xs font-cinzel font-bold text-white">Blush Romântico</h4>
                        <p class="text-[11px] text-zinc-400">Rosado suave nas bochechas</p>
                      </div>
                    </div>
                    <div class="w-5 h-5 rounded-md border flex items-center justify-center {draftCustomization.blush ? 'bg-rose-500 border-rose-500 text-white' : 'border-white/20'}">
                      {#if draftCustomization.blush}
                        <Check class="w-3.5 h-3.5 stroke-[3]" />
                      {/if}
                    </div>
                  </button>

                </div>
              </div>

            </div>

          <!-- ================= ABA 5: MOCHILAS & BOLSAS ================= -->
          {:else if activeTab === 'mochila'}
            <div class="space-y-4" in:fade={{ duration: 200 }}>
              <div>
                <h3 class="text-sm font-cinzel font-bold text-white">Mochilas & Bolsas Colegiais</h3>
                <p class="text-xs text-zinc-400 font-sans-ui">
                  Acessório carregado nos ombros que reflete o perfil e hábitos da protagonista.
                </p>
              </div>

              <div class="grid grid-cols-1 gap-3.5">
                {#each BACKPACK_OPTIONS as bag}
                  {@const isSelected = draftCustomization.backpack === bag.id}
                  <button
                    onclick={() => selectBackpack(bag.id)}
                    class="text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between {isSelected ? 'bg-amber-500/10 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'bg-[#141620] border-white/8 hover:border-white/20 hover:bg-[#1a1d2b]'}"
                  >
                    <div class="flex items-center gap-3.5">
                      <span class="text-2xl p-2 rounded-xl bg-white/5 border border-white/10">{bag.icon}</span>
                      <div>
                        <h4 class="text-sm font-cinzel font-bold {isSelected ? 'text-amber-400' : 'text-white'}">
                          {bag.name}
                        </h4>
                        <p class="text-xs text-zinc-300 font-sans-ui mt-0.5">
                          {bag.description}
                        </p>
                      </div>
                    </div>

                    {#if isSelected}
                      <span class="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 ml-3">
                        <Check class="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    {/if}
                  </button>
                {/each}
              </div>
            </div>
          {/if}

        </div>

        <!-- RODAPÉ COM AÇÕES: RESTAURAR + CONFIRMAR & CONTINUAR -->
        <footer class="h-16 px-4 sm:px-6 border-t border-white/10 bg-[#11131c] flex items-center justify-between shrink-0">
          <button 
            onclick={handleReset}
            class="px-3.5 py-2 rounded-xl border border-white/10 hover:border-white/20 text-xs font-sans text-zinc-400 hover:text-white flex items-center gap-1.5 transition-all"
          >
            <RotateCcw class="w-3.5 h-3.5" />
            <span>Restaurar Padrão</span>
          </button>

          <button 
            onclick={handleSaveAndContinue}
            class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-cinzel font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
          >
            <Check class="w-4 h-4 stroke-[2.5]" />
            <span>Salvar e Continuar a História</span>
          </button>
        </footer>

      </div>

    </div>

  </div>
</div>
