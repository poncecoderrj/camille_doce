<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { 
    Heart, 
    Flame, 
    Sparkles, 
    Moon, 
    Brain, 
    Palette, 
    BookOpen, 
    Eye, 
    Sun, 
    Zap, 
    ShieldCheck, 
    Feather, 
    Trophy, 
    Compass, 
    Target, 
    Leaf, 
    Crown, 
    Music, 
    Check, 
    X, 
    Shirt, 
    Star, 
    User,
    Info,
    AlertCircle,
    Play,
    ChevronRight,
    ChevronLeft,
    Plus
  } from 'lucide-svelte';
  import { gameState } from '../game-state/GameState.svelte';
  import { audioManager } from '../audio/audio-manager';
  import ProtagonistActor from '../customization/ProtagonistActor.svelte';
  import type { OutfitId } from '../customization/customization.schema';
  import { OUTFIT_OPTIONS, BOY_REACTIONS } from '../customization/customization.catalog';
  import { ZODIAC_SIGNS, PERSONALITY_TRAITS, ASPIRATIONS } from './personality.catalog';
  import type { ZodiacId, TraitCategory } from './personality.schema';

  interface Props {
    onClose: () => void;
    mode?: 'creation' | 'edit';
  }

  let { onClose, mode = 'edit' }: Props = $props();

  // Sistema Progressivo em 4 Etapas:
  // 1: Nome & Signo
  // 2: Personalidade (The Sims - 5 Traços: Lista à esquerda, Explicação à direita)
  // 3: Inspiração de Vida (Sonho de 10 Anos)
  // 4: Look Oficial (5 Opções Iniciais)
  let currentStep = $state<number>(1);

  // Estado local editável
  let draftName = $state<string>(gameState.protagonistProfile?.name || 'Íris');
  let draftZodiac = $state<ZodiacId>(gameState.protagonistProfile.zodiac);
  let draftTraits = $state<string[]>([...gameState.protagonistProfile.traits]);
  let draftAspiration = $state<string>(gameState.protagonistProfile.aspiration);
  let draftOutfit = $state<OutfitId>(gameState.currentOutfit);

  // Traço atualmente inspecionado na coluna da direita da Etapa 2
  let focusedTraitId = $state<string>(
    gameState.protagonistProfile.traits[0] || PERSONALITY_TRAITS[0].id
  );

  let traitCategoryFilter = $state<'Todas' | TraitCategory>('Todas');
  let traitLimitWarning = $state<string | null>(null);

  // Mapeador de Ícones Seguros
  const iconMap: Record<string, any> = {
    Heart,
    Flame,
    Sparkles,
    Moon,
    Brain,
    Palette,
    BookOpen,
    Eye,
    Sun,
    Zap,
    ShieldCheck,
    Feather,
    Trophy,
    Compass,
    Target,
    Leaf,
    Crown,
    Music
  };

  // Signo ativo selecionado para exibição de sinastria
  let activeZodiacDetails = $derived(
    ZODIAC_SIGNS.find(z => z.id === draftZodiac) || ZODIAC_SIGNS[6]
  );

  // Aspiração ativa selecionada
  let activeAspirationDetails = $derived(
    ASPIRATIONS.find(a => a.id === draftAspiration) || ASPIRATIONS[0]
  );

  // Traço focado na coluna de explicação
  let focusedTraitDetails = $derived(
    PERSONALITY_TRAITS.find(t => t.id === focusedTraitId) || PERSONALITY_TRAITS[0]
  );

  let FocusedTraitIcon = $derived(
    iconMap[focusedTraitDetails.icon] || Sparkles
  );

  let isFocusedSelected = $derived(
    draftTraits.includes(focusedTraitDetails.id)
  );

  // Traços filtrados pela categoria selecionada
  let filteredTraits = $derived.by(() => {
    if (traitCategoryFilter === 'Todas') return PERSONALITY_TRAITS;
    return PERSONALITY_TRAITS.filter(t => t.category === traitCategoryFilter);
  });

  // Look ativo selecionado
  let activeOutfitDetails = $derived(
    OUTFIT_OPTIONS.find(o => o.id === draftOutfit) || OUTFIT_OPTIONS[0]
  );

  const boyAccents = {
    dante: { name: 'Dante', color: '#e11d48' },
    lucas: { name: 'Lucas', color: '#2563eb' },
    theo: { name: 'Theo', color: '#059669' },
    geral: { name: 'Amigos & Campus', color: '#d97706' }
  };

  function selectZodiac(id: ZodiacId) {
    draftZodiac = id;
    audioManager.playClick();
  }

  function focusTrait(id: string) {
    focusedTraitId = id;
    audioManager.playClick();
  }

  function toggleTrait(id: string) {
    traitLimitWarning = null;
    focusedTraitId = id;
    const idx = draftTraits.indexOf(id);
    if (idx >= 0) {
      if (draftTraits.length > 1) {
        draftTraits = draftTraits.filter(t => t !== id);
        audioManager.playClick();
      } else {
        traitLimitWarning = 'A personagem precisa ter ao menos 1 traço ativo!';
      }
    } else {
      if (draftTraits.length < 5) {
        draftTraits = [...draftTraits, id];
        audioManager.playClick();
      } else {
        traitLimitWarning = 'Limite de 5 traços atingido! Desmarque um para selecionar outro.';
      }
    }
  }

  function selectAspiration(id: string) {
    draftAspiration = id;
    audioManager.playClick();
  }

  function selectOutfit(id: OutfitId) {
    draftOutfit = id;
    audioManager.playClick();
  }

  function goToStep(step: number) {
    // Validação para avançar
    if (step > 2 && draftTraits.length < 5) {
      traitLimitWarning = 'Por favor, selecione os 5 traços de personalidade antes de avançar!';
      currentStep = 2;
      return;
    }
    currentStep = step;
    audioManager.playClick();
  }

  function nextStep() {
    if (currentStep === 1) {
      currentStep = 2;
      audioManager.playClick();
    } else if (currentStep === 2) {
      if (draftTraits.length < 5) {
        traitLimitWarning = 'Selecione exatamente 5 traços de personalidade para avançar!';
        audioManager.playClick();
        return;
      }
      currentStep = 3;
      audioManager.playClick();
    } else if (currentStep === 3) {
      currentStep = 4;
      audioManager.playClick();
    } else if (currentStep === 4) {
      handleSaveProfile();
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      currentStep--;
      audioManager.playClick();
    } else {
      onClose();
    }
  }

  function handleSaveProfile() {
    const finalName = draftName.trim() || 'Íris';
    if (draftTraits.length < 5) {
      traitLimitWarning = 'Por favor, selecione 5 traços de personalidade para definir a personagem!';
      currentStep = 2;
      audioManager.playClick();
      return;
    }

    gameState.protagonistProfile.name = finalName;
    gameState.setZodiac(draftZodiac);
    gameState.setAspiration(draftAspiration);
    gameState.protagonistProfile.traits = [...draftTraits];
    gameState.setOutfit(draftOutfit);

    if (mode === 'creation') {
      gameState.startNewGame();
      onClose();
    } else {
      audioManager.playChoice();
      onClose();
    }
  }

  const stepTitles = [
    { num: 1, label: 'Nome & Signo' },
    { num: 2, label: 'Personalidade (5 Traços)' },
    { num: 3, label: 'Inspiração de Vida' },
    { num: 4, label: 'Look Oficial' }
  ];
</script>

<!-- MODAL COMPLETO DE IDENTIDADE, SIGNO, PERSONALIDADE E ASPIRAÇÃO -->
<div 
  class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md select-none overflow-hidden"
  transition:fade={{ duration: 200 }}
>
  <div 
    class="relative w-full max-w-5xl h-[94vh] max-h-[840px] bg-[#0c0d14]/95 border border-amber-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-zinc-100"
    transition:fly={{ y: 20, duration: 250 }}
  >
    <!-- TOPO: TÍTULO E BREADCRUMB PROGRESSIVO DE ETAPAS -->
    <header class="px-5 py-3 border-b border-white/10 bg-[#121420] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
          <Sparkles class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-sm sm:text-base font-cinzel font-bold tracking-wider text-amber-300">
            {mode === 'creation' ? 'Criação da Personagem' : 'Perfil & Identidade da Personagem'}
          </h2>
          <p class="text-[11px] text-zinc-400 font-sans-ui">
            Etapa {currentStep} de 4: {stepTitles[currentStep - 1].label}
          </p>
        </div>
      </div>

      <!-- TRACKER PROGRESSIVO EM 4 ETAPAS -->
      <div class="flex items-center gap-1 sm:gap-2">
        {#each stepTitles as s}
          <button
            onclick={() => goToStep(s.num)}
            class="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-cinzel transition-all {currentStep === s.num ? 'bg-amber-500/20 border border-amber-400 text-amber-300 font-bold shadow-md' : currentStep > s.num ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-400' : 'bg-white/5 border border-white/5 text-zinc-500 hover:text-zinc-300'}"
          >
            <span class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] {currentStep === s.num ? 'bg-amber-400 text-stone-950 font-bold' : currentStep > s.num ? 'bg-emerald-500 text-stone-950 font-bold' : 'bg-white/10 text-zinc-400'}">
              {#if currentStep > s.num}
                ✓
              {:else}
                {s.num}
              {/if}
            </span>
            <span class="hidden md:inline">{s.label.split(' ')[0]}</span>
          </button>
          {#if s.num < 4}
            <span class="text-zinc-600 text-xs hidden sm:inline">›</span>
          {/if}
        {/each}
      </div>

      <!-- Botão Fechar Modal -->
      <button 
        onclick={onClose}
        class="absolute top-3.5 right-4 p-1.5 rounded-xl border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition-all"
        title="Fechar"
      >
        <X class="w-4 h-4" />
      </button>
    </header>

    <!-- CORPO DO MODAL (CONTEÚDO DA ETAPA ATIVA) -->
    <div class="flex-1 overflow-y-auto custom-scrollbar flex flex-col">

      <!-- ================================================================= -->
      <!-- ETAPA 1: NOME & SIGNO DO ZODÍACO -->
      <!-- ================================================================= -->
      {#if currentStep === 1}
        <div class="p-4 sm:p-6 md:p-8 flex flex-col gap-6" in:fade={{ duration: 200 }}>
          
          <!-- SEÇÃO DO NOME DA PERSONAGEM -->
          <div class="p-4 sm:p-5 rounded-3xl bg-[#141624] border border-amber-500/20 flex flex-col gap-3 shadow-lg">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <label for="char-name-input-step1" class="text-xs sm:text-sm font-cinzel font-bold text-amber-400 flex items-center gap-2">
                <User class="w-4 h-4" />
                <span>Como você quer se chamar na Academia Lótus?</span>
              </label>

              <!-- Sugestões Rápidas de Nome -->
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="text-[10px] text-zinc-400 font-sans">Sugestões:</span>
                {#each ['Íris', 'Maya', 'Aurora', 'Luna', 'Clara'] as suggestion}
                  <button
                    onclick={() => { draftName = suggestion; audioManager.playClick(); }}
                    class="px-2.5 py-0.5 rounded-lg border text-xs font-cinzel transition-all {draftName === suggestion ? 'bg-amber-500/25 border-amber-500 text-amber-300 font-bold' : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'}"
                  >
                    {suggestion}
                  </button>
                {/each}
              </div>
            </div>

            <div class="relative w-full max-w-md">
              <input 
                id="char-name-input-step1"
                type="text"
                bind:value={draftName}
                maxlength="20"
                placeholder="Digite o nome da personagem..."
                class="w-full px-4 py-2.5 rounded-2xl bg-black/60 border border-amber-500/40 focus:border-amber-400 text-white font-cinzel text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>
          </div>

          <!-- SEÇÃO DO SIGNO DO ZODÍACO -->
          <div class="flex flex-col gap-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h3 class="text-sm sm:text-base font-cinzel font-bold text-amber-300 flex items-center gap-2">
                  <Moon class="w-4 h-4" />
                  <span>Escolha o Signo do Zodíaco</span>
                </h3>
                <p class="text-xs text-zinc-400 font-sans-ui mt-0.5">
                  O signo rege a personalidade cósmica e determina afinidades imediatas com Dante, Lucas e Theo.
                </p>
              </div>

              <!-- Badge do Signo Ativo -->
              <div class="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-cinzel font-semibold flex items-center gap-1.5">
                <span>{activeZodiacDetails.symbol}</span>
                <span>{activeZodiacDetails.name}</span>
                <span class="opacity-40">•</span>
                <span>Elemento {activeZodiacDetails.element}</span>
              </div>
            </div>

            <!-- Grid 4x3 dos 12 Signos -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {#each ZODIAC_SIGNS as zodiac}
                {@const isSelected = draftZodiac === zodiac.id}
                <button
                  onclick={() => selectZodiac(zodiac.id)}
                  class="p-3 rounded-2xl border text-left transition-all duration-200 active:scale-[0.98] flex flex-col justify-between h-28 relative group {isSelected ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/15' : 'bg-black/40 hover:bg-white/5 border-white/10 hover:border-white/20'}"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-2xl drop-shadow">{zodiac.symbol}</span>
                    <span class="text-[9px] px-2 py-0.5 rounded-full border {isSelected ? 'bg-amber-500/30 border-amber-400 text-amber-200' : 'bg-white/5 border-white/10 text-zinc-400'}">
                      {zodiac.element}
                    </span>
                  </div>

                  <div>
                    <h4 class="text-xs font-cinzel font-bold {isSelected ? 'text-amber-300' : 'text-zinc-200'}">
                      {zodiac.name}
                    </h4>
                    <p class="text-[10px] text-zinc-400 font-sans leading-tight mt-0.5">
                      {zodiac.dates}
                    </p>
                  </div>

                  {#if isSelected}
                    <div class="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 animate-ping"></div>
                  {/if}
                </button>
              {/each}
            </div>

            <!-- Painel de Sinastria do Signo com os 3 Rapazes -->
            <div class="p-4 rounded-3xl bg-[#141624] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-xl">
                  {activeZodiacDetails.symbol}
                </div>
                <div>
                  <h4 class="text-xs font-cinzel font-bold text-amber-300">
                    Sinastria Amorosa de {activeZodiacDetails.name}:
                  </h4>
                  <p class="text-[11px] text-zinc-400 font-sans-ui mt-0.5">
                    {activeZodiacDetails.description}
                  </p>
                </div>
              </div>

              <!-- Medidores Rápidos de Afinidade dos Garotos -->
              <div class="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                {#each Object.entries(activeZodiacDetails.synastry) as [boyKey, score]}
                  {@const boy = boyAccents[boyKey as keyof typeof boyAccents]}
                  <div class="flex flex-col items-center px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-[10px] font-cinzel">
                    <span class="font-bold" style="color: {boy?.color};">{boy?.name}</span>
                    <span class="text-zinc-200 font-sans font-semibold mt-0.5">+{score} afinidade</span>
                  </div>
                {/each}
              </div>
            </div>

          </div>

        </div>

      <!-- ================================================================= -->
      <!-- ETAPA 2: PERSONALIDADE (THE SIMS - 5 TRAÇOS) -->
      <!-- LISTA DE ÍCONES À ESQUERDA | EXPLICAÇÃO DETALHADA À DIREITA -->
      <!-- ================================================================= -->
      {:else if currentStep === 2}
        <div class="flex-1 flex flex-col md:flex-row h-full overflow-hidden" in:fade={{ duration: 200 }}>
          
          <!-- COLUNA ESQUERDA: LISTA DE TRAÇOS COM ÍCONES -->
          <div class="w-full md:w-5/12 lg:w-4/9 border-b md:border-b-0 md:border-r border-white/10 flex flex-col bg-[#0e101a]/70 shrink-0">
            
            <!-- Barra Superior: Contagem dos 5 Traços & Filtros -->
            <div class="p-3.5 sm:p-4 border-b border-white/10 flex flex-col gap-2.5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-cinzel font-bold text-amber-300 flex items-center gap-1.5">
                  <Brain class="w-4 h-4 text-amber-400" />
                  <span>Escolha 5 Traços ({draftTraits.length}/5):</span>
                </span>
                <span class="text-[11px] font-sans font-semibold {draftTraits.length === 5 ? 'text-emerald-400' : 'text-amber-400'}">
                  {draftTraits.length === 5 ? '✓ 5 Traços Definidos' : `Faltam ${5 - draftTraits.length}`}
                </span>
              </div>

              <!-- Barra de Progresso Visual de 5 Pontos -->
              <div class="grid grid-cols-5 gap-1.5 h-1.5 w-full bg-black/40 rounded-full p-0.5 border border-white/5">
                {#each Array(5) as _, i}
                  <div class="h-full rounded-full transition-all {i < draftTraits.length ? 'bg-gradient-to-r from-amber-500 to-amber-300 shadow-sm' : 'bg-white/10'}"></div>
                {/each}
              </div>

              <!-- Filtro de Categorias -->
              <div class="flex items-center gap-1 overflow-x-auto custom-scrollbar pt-1">
                {#each ['Todas', 'Emocional', 'Intelectual', 'Social', 'Estilo de Vida'] as cat}
                  <button
                    onclick={() => traitCategoryFilter = cat as any}
                    class="px-2.5 py-1 rounded-xl text-[10px] font-cinzel transition-all shrink-0 {traitCategoryFilter === cat ? 'bg-amber-500/25 border border-amber-400 text-amber-300 font-bold' : 'bg-white/5 border border-white/5 text-zinc-400 hover:text-white'}"
                  >
                    {cat}
                  </button>
                {/each}
              </div>
            </div>

            <!-- Lista Rolável dos 16 Traços -->
            <div class="flex-1 overflow-y-auto p-3 flex flex-col gap-2 custom-scrollbar max-h-[46vh] md:max-h-none">
              {#each filteredTraits as trait}
                {@const isSelected = draftTraits.includes(trait.id)}
                {@const isFocused = focusedTraitId === trait.id}
                {@const IconComponent = iconMap[trait.icon] || Sparkles}

                <button
                  onclick={() => toggleTrait(trait.id)}
                  onmouseenter={() => focusTrait(trait.id)}
                  class="p-2.5 sm:p-3 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-3 group {isSelected ? 'bg-amber-500/15 border-amber-400/80 shadow-md' : isFocused ? 'bg-white/10 border-white/30' : 'bg-black/40 hover:bg-white/5 border-white/8'}"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm {isSelected ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-white/10 text-zinc-300 group-hover:text-amber-400'}">
                      <IconComponent class="w-4 h-4" />
                    </div>
                    <div>
                      <h4 class="text-xs font-cinzel font-bold {isSelected ? 'text-amber-300' : 'text-zinc-200'}">
                        {trait.name}
                      </h4>
                      <p class="text-[10px] text-zinc-400 font-sans">
                        {trait.category}
                      </p>
                    </div>
                  </div>

                  <!-- Botão de Check/Toggle Rápido -->
                  <div class="w-6 h-6 rounded-lg flex items-center justify-center border transition-all {isSelected ? 'bg-amber-500 border-amber-400 text-stone-950 shadow' : 'bg-white/5 border-white/10 text-zinc-500 group-hover:border-white/30'}">
                    {#if isSelected}
                      <Check class="w-3.5 h-3.5 stroke-[3]" />
                    {:else}
                      <Plus class="w-3.5 h-3.5 opacity-60" />
                    {/if}
                  </div>
                </button>
              {/each}
            </div>

          </div>

          <!-- COLUNA DIREITA: EXPLICAÇÃO DETALHADA & SEUS 5 TRAÇOS -->
          <div class="flex-1 p-5 sm:p-6 md:p-8 flex flex-col justify-between gap-5 bg-[#0a0b12]/80 overflow-y-auto custom-scrollbar">
            
            <div class="flex flex-col gap-4">
              
              <!-- Cabeçalho do Traço em Foco -->
              <div class="flex items-start justify-between gap-4 p-4 rounded-3xl bg-[#141624] border border-white/10 shadow-lg">
                <div class="flex items-center gap-3.5">
                  <div class="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-md">
                    <FocusedTraitIcon class="w-6 h-6" />
                  </div>
                  <div>
                    <span class="text-[10px] uppercase tracking-wider font-cinzel font-bold text-amber-400">
                      {focusedTraitDetails.category}
                    </span>
                    <h3 class="text-base sm:text-lg font-cinzel font-bold text-white">
                      {focusedTraitDetails.name}
                    </h3>
                  </div>
                </div>

                <!-- Botão de Ação: Selecionar ou Remover -->
                <button
                  onclick={() => toggleTrait(focusedTraitDetails.id)}
                  class="px-4 py-2 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md flex items-center gap-1.5 {isFocusedSelected ? 'bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 text-rose-300' : draftTraits.length < 5 ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold' : 'bg-white/5 border border-white/10 text-zinc-500 cursor-not-allowed'}"
                >
                  {#if isFocusedSelected}
                    <X class="w-3.5 h-3.5" />
                    <span>Remover Traço</span>
                  {:else}
                    <Plus class="w-3.5 h-3.5 stroke-[3]" />
                    <span>Adicionar ({draftTraits.length}/5)</span>
                  {/if}
                </button>
              </div>

              <!-- Descrição Psicológica Detalhada (Explicação) -->
              <div class="p-5 rounded-3xl bg-black/40 border border-white/8 flex flex-col gap-2.5">
                <h4 class="text-xs font-cinzel font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Info class="w-3.5 h-3.5" />
                  <span>Explicação & Perfil de Comportamento:</span>
                </h4>
                <p class="text-xs sm:text-sm text-zinc-200 font-serif-romance leading-relaxed">
                  {focusedTraitDetails.description}
                </p>
              </div>

              <!-- Impacto nas Interações e Diálogos -->
              <div class="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex flex-col gap-1.5">
                <span class="text-[10px] uppercase font-cinzel font-bold text-amber-400">
                  Impacto na História:
                </span>
                <p class="text-xs text-zinc-300 font-sans-ui">
                  Desbloqueia reações personalizadas de Dante, Lucas e Theo, e libera opções de resposta exclusivas durante momentos de conflito ou romance.
                </p>
              </div>

              {#if traitLimitWarning}
                <div class="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-sans-ui flex items-center gap-2" in:fade>
                  <AlertCircle class="w-4 h-4 shrink-0" />
                  <span>{traitLimitWarning}</span>
                </div>
              {/if}

            </div>

            <!-- Resumo dos 5 Traços Ativos Selecionados -->
            <div class="p-4 rounded-3xl bg-[#121420] border border-white/10 flex flex-col gap-2.5">
              <span class="text-[10px] font-cinzel font-bold text-zinc-400 uppercase tracking-wider">
                Seus 5 Traços de Personalidade Selecionados:
              </span>
              <div class="flex items-center gap-2 flex-wrap">
                {#each draftTraits as traitId}
                  {@const trait = PERSONALITY_TRAITS.find(t => t.id === traitId)}
                  {@const TIcon = iconMap[trait?.icon || ''] || Sparkles}
                  {#if trait}
                    <div class="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-200 text-xs font-cinzel font-semibold flex items-center gap-2 shadow-sm">
                      <TIcon class="w-3.5 h-3.5 text-amber-400" />
                      <span>{trait.name}</span>
                      <button 
                        onclick={() => toggleTrait(trait.id)}
                        class="hover:text-rose-400 ml-0.5 text-zinc-400"
                        title="Remover"
                      >
                        <X class="w-3 h-3" />
                      </button>
                    </div>
                  {/if}
                {/each}

                <!-- Slots Vazios Pontilhados -->
                {#each Array(Math.max(0, 5 - draftTraits.length)) as _, i}
                  <div class="px-3 py-1.5 rounded-xl border border-dashed border-white/20 text-zinc-500 text-xs font-sans italic flex items-center gap-1.5">
                    <Plus class="w-3 h-3 opacity-40" />
                    <span>Slot {draftTraits.length + i + 1} Vazio</span>
                  </div>
                {/each}
              </div>
            </div>

          </div>

        </div>

      <!-- ================================================================= -->
      <!-- ETAPA 3: INSPIRAÇÃO DE VIDA (SONHO DE 10 ANOS) -->
      <!-- ================================================================= -->
      {:else if currentStep === 3}
        <div class="p-4 sm:p-6 md:p-8 flex flex-col gap-6" in:fade={{ duration: 200 }}>
          
          <div>
            <h3 class="text-sm sm:text-base font-cinzel font-bold text-amber-300 flex items-center gap-2">
              <Star class="w-4 h-4" />
              <span>Qual é o seu Sonho para os Próximos 10 Anos?</span>
            </h3>
            <p class="text-xs text-zinc-400 font-sans-ui mt-0.5">
              A aspiração de vida define a motivação interna da sua personagem e desbloqueia diálogos com quem compartilha das suas ambições.
            </p>
          </div>

          <!-- Grid das 6 Aspirações de Vida -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {#each ASPIRATIONS as aspiration}
              {@const isSelected = draftAspiration === aspiration.id}
              {@const IconComp = iconMap[aspiration.icon] || Star}
              <button
                onclick={() => selectAspiration(aspiration.id)}
                class="p-4 sm:p-5 rounded-3xl border text-left transition-all duration-200 active:scale-[0.99] flex flex-col justify-between gap-3 relative group {isSelected ? 'bg-amber-500/20 border-amber-400 shadow-xl shadow-amber-500/15' : 'bg-black/40 hover:bg-white/5 border-white/10 hover:border-white/20'}"
              >
                <div class="flex items-start justify-between gap-2">
                  <div class="w-11 h-11 rounded-2xl flex items-center justify-center {isSelected ? 'bg-amber-500 text-stone-950 font-bold shadow-lg' : 'bg-white/10 text-zinc-300 group-hover:text-amber-400'}">
                    <IconComp class="w-5 h-5" />
                  </div>
                  {#if isSelected}
                    <span class="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center">
                      <Check class="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  {/if}
                </div>

                <div>
                  <h4 class="text-sm font-cinzel font-bold {isSelected ? 'text-amber-300' : 'text-white'}">
                    {aspiration.title}
                  </h4>
                  <p class="text-[11px] text-amber-400/90 font-sans-ui font-semibold italic mt-0.5">
                    "{aspiration.tagline}"
                  </p>
                  <p class="text-xs text-zinc-300 font-sans-ui leading-relaxed mt-2">
                    {aspiration.description}
                  </p>
                </div>

                <div class="pt-2 border-t border-white/10 text-[10px] text-zinc-400 font-cinzel">
                  Afinidade temática: <span class="text-amber-300 font-bold">{aspiration.targetAffinity}</span>
                </div>
              </button>
            {/each}
          </div>

        </div>

      <!-- ================================================================= -->
      <!-- ETAPA 4: LOOK OFICIAL (5 OPÇÕES COM PREVIEW AO VIVO) -->
      <!-- ================================================================= -->
      {:else if currentStep === 4}
        <div class="flex-1 flex flex-col md:flex-row h-full overflow-hidden" in:fade={{ duration: 200 }}>
          
          <!-- COLUNA ESQUERDA: PREVIEW AO VIVO DA PROTAGONISTA -->
          <div class="w-full md:w-5/12 lg:w-4/9 border-b md:border-b-0 md:border-r border-white/10 flex flex-col items-center justify-between p-4 sm:p-6 bg-[#090a10]/80 shrink-0">
            
            <div class="w-full flex items-center justify-between">
              <span class="text-xs font-cinzel font-bold text-amber-400 flex items-center gap-1.5">
                <Shirt class="w-4 h-4" />
                <span>Visual Escolhido:</span>
              </span>
              <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-cinzel font-bold uppercase">
                {activeOutfitDetails.styleTag}
              </span>
            </div>

            <!-- ILUSTRAÇÃO ÚNICA DA PERSONAGEM (SEM COSTURAS OU CAMADAS DUPLICADAS) -->
            <div class="relative w-full flex-1 flex items-end justify-center overflow-hidden min-h-[280px]">
              <ProtagonistActor 
                outfitId={draftOutfit}
                scale={1}
              />
            </div>

            <!-- Reações dos Garotos sobre o Look Selecionado -->
            <div class="w-full mt-2 p-3 rounded-2xl bg-[#141624] border border-white/10 flex flex-col gap-1.5 text-xs text-zinc-300">
              <div class="flex items-center gap-2 text-[10px] font-cinzel font-bold text-amber-400 uppercase tracking-wider">
                <Heart class="w-3.5 h-3.5" />
                <span>Reação dos Rapazes:</span>
              </div>
              <p class="font-serif-romance italic text-[11px] leading-relaxed text-zinc-200">
                "{BOY_REACTIONS[draftOutfit]?.dante || 'Um visual autêntico e marcante para seu primeiro dia.'}"
              </p>
            </div>

          </div>

          <!-- COLUNA DIREITA: AS 5 OPÇÕES DE LOOKS -->
          <div class="flex-1 p-4 sm:p-6 flex flex-col gap-3 overflow-y-auto custom-scrollbar bg-[#0d0e16]/80">
            
            <div>
              <h3 class="text-sm font-cinzel font-bold text-amber-300">
                Selecione seu Look Inicial (5 Opções Disponíveis):
              </h3>
              <p class="text-xs text-zinc-400 font-sans-ui mt-0.5">
                O visual influencia a primeira impressão no portão da Lótus e garante bônus de relacionamento.
              </p>
            </div>

            <!-- As 5 Opções de Looks -->
            <div class="flex flex-col gap-2.5">
              {#each OUTFIT_OPTIONS as outfit}
                {@const isSelected = draftOutfit === outfit.id}
                {@const boy = boyAccents[outfit.affinityTarget]}

                <button
                  onclick={() => selectOutfit(outfit.id)}
                  class="p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-200 active:scale-[0.99] flex items-center gap-3.5 group {isSelected ? 'bg-amber-500/15 border-amber-400 shadow-lg shadow-amber-500/10' : 'bg-black/40 hover:bg-white/5 border-white/10 hover:border-white/20'}"
                >
                  <!-- Miniatura do Look -->
                  <div class="w-14 h-16 rounded-xl bg-black/60 border border-white/10 overflow-hidden flex items-end justify-center shrink-0">
                    <img src={outfit.image} alt={outfit.name} class="h-full object-contain object-bottom" />
                  </div>

                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <h4 class="text-xs sm:text-sm font-cinzel font-bold {isSelected ? 'text-amber-400' : 'text-white'}">
                        {outfit.name}
                      </h4>
                      {#if isSelected}
                        <span class="w-4 h-4 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center">
                          <Check class="w-3 h-3 stroke-[3]" />
                        </span>
                      {/if}
                    </div>

                    <p class="text-[11px] text-zinc-300 font-sans-ui mt-1 leading-snug">
                      {outfit.description}
                    </p>

                    <div class="mt-1.5 flex items-center gap-2 text-[10px] font-sans font-semibold">
                      <span class="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                        {outfit.styleTag}
                      </span>
                      <span style="color: {boy?.color};">
                        ♥ +{outfit.affinityBonus} com {boy?.name}
                      </span>
                    </div>
                  </div>
                </button>
              {/each}
            </div>

          </div>

        </div>
      {/if}

    </div>

    <!-- RODAPÉ FIXO COM NAVEGAÇÃO PROGRESSIVA -->
    <footer class="h-16 px-4 sm:px-6 border-t border-white/10 bg-[#11131c] flex items-center justify-between shrink-0">
      
      <!-- Resumo Rápido da Identidade Escolhida -->
      <div class="hidden sm:flex items-center gap-2 text-xs text-zinc-400 font-sans-ui">
        <span class="font-bold text-white">{draftName.trim() || 'Íris'}</span>
        <span>•</span>
        <span class="text-amber-300">{activeZodiacDetails?.symbol} {activeZodiacDetails?.name}</span>
        <span>•</span>
        <span class="text-zinc-300">{draftTraits.length}/5 Traços</span>
        <span>•</span>
        <span class="text-amber-200">{activeAspirationDetails?.title.split('&')[0]}</span>
      </div>

      <!-- BOTÕES DE NAVEGAÇÃO ENTRE ETAPAS -->
      <div class="flex items-center gap-2.5 w-full sm:w-auto justify-end">
        
        <!-- Botão Voltar Etapa -->
        <button 
          onclick={prevStep}
          class="px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 text-xs text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
        >
          <ChevronLeft class="w-4 h-4" />
          <span>{currentStep === 1 ? (mode === 'creation' ? 'Voltar ao Menu' : 'Cancelar') : 'Voltar'}</span>
        </button>

        <!-- Botão Avançar / Concluir -->
        <button 
          onclick={nextStep}
          class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-cinzel font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/30 active:scale-95 transition-all group"
        >
          {#if currentStep < 4}
            <span>Avançar para Etapa {currentStep + 1}</span>
            <ChevronRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          {:else}
            {#if mode === 'creation'}
              <Play class="w-4 h-4 fill-stone-950 group-hover:scale-110 transition-transform" />
              <span>Iniciar Jogo & Entrar na Lótus</span>
            {:else}
              <Check class="w-4 h-4 stroke-[2.5]" />
              <span>Confirmar Identidade</span>
            {/if}
          {/if}
        </button>

      </div>

    </footer>

  </div>
</div>