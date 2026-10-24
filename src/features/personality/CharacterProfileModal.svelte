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
  import { OUTFIT_OPTIONS } from '../customization/customization.catalog';
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
  let draftName = $state<string>(gameState.protagonistProfile?.name || '');
  let draftZodiac = $state<ZodiacId>(gameState.protagonistProfile.zodiac);
  let draftTraits = $state<string[]>([...gameState.protagonistProfile.traits]);
  let draftAspiration = $state<string>(gameState.protagonistProfile.aspiration);
  let draftOutfit = $state<OutfitId>(gameState.currentOutfit);

  // Validação de Nome Obrigatório
  let nameWarning = $state<string | null>(null);
  let isNameInputShaking = $state<boolean>(false);
  let nameInputRef: HTMLInputElement | null = $state(null);
  const PRESET_NAMES = ['Íris', 'Aurora', 'Maya', 'Luna', 'Clara', 'Elena', 'Lívia'];

  // Traço atualmente inspecionado na coluna da direita da Etapa 2
  let focusedTraitId = $state<string>(
    gameState.protagonistProfile.traits[0] || PERSONALITY_TRAITS[0].id
  );

  let traitCategoryFilter = $state<'Todas' | TraitCategory>('Todas');
  let traitLimitWarning = $state<string | null>(null);
  let isTraitShaking = $state<boolean>(false);

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
    iconMap[focusedTraitDetails.iconName] || Sparkles
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
      draftTraits = draftTraits.filter(t => t !== id);
      audioManager.playClick();
    } else {
      if (draftTraits.length < 5) {
        draftTraits = [...draftTraits, id];
        audioManager.playClick();
      } else {
        traitLimitWarning = 'Limite máximo de 5 traços atingido! Desmarque um para selecionar outro.';
        audioManager.playNotification();
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

  function validateName(): boolean {
    const trimmed = draftName.trim();
    if (!trimmed) {
      nameWarning = 'Por favor, digite seu nome ou escolha uma das opções sugeridas abaixo para continuar!';
      isNameInputShaking = true;
      setTimeout(() => { isNameInputShaking = false; }, 500);
      audioManager.playNotification();
      nameInputRef?.focus();
      return false;
    }
    if (trimmed.length < 2) {
      nameWarning = 'O nome da personagem deve ter no mínimo 2 caracteres!';
      isNameInputShaking = true;
      setTimeout(() => { isNameInputShaking = false; }, 500);
      audioManager.playNotification();
      nameInputRef?.focus();
      return false;
    }
    nameWarning = null;
    return true;
  }

  function selectPresetName(name: string) {
    draftName = name;
    nameWarning = null;
    audioManager.playClick();
  }

  function goToStep(step: number) {
    // Validação obrigatória: impede avançar sem nome definido
    if (step > 1 && !validateName()) {
      currentStep = 1;
      return;
    }
    // Validação para avançar além da Etapa 2 (mínimo de 3 traços obrigatórios)
    if (step > 2 && draftTraits.length < 3) {
      traitLimitWarning = `Por favor, selecione pelo menos 3 traços de personalidade (você escolheu ${draftTraits.length}/3) antes de avançar!`;
      isTraitShaking = true;
      setTimeout(() => { isTraitShaking = false; }, 500);
      audioManager.playNotification();
      currentStep = 2;
      return;
    }
    currentStep = step;
    audioManager.playClick();
  }

  function nextStep() {
    if (currentStep === 1) {
      if (!validateName()) return;
      currentStep = 2;
      audioManager.playClick();
    } else if (currentStep === 2) {
      if (draftTraits.length < 3) {
        traitLimitWarning = `Selecione pelo menos 3 traços de personalidade para avançar (você escolheu ${draftTraits.length}/3)!`;
        isTraitShaking = true;
        setTimeout(() => { isTraitShaking = false; }, 500);
        audioManager.playNotification();
        return;
      }
      traitLimitWarning = null;
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
    if (!validateName()) {
      currentStep = 1;
      return;
    }

    const finalName = draftName.trim();
    if (draftTraits.length < 3) {
      traitLimitWarning = `Por favor, selecione pelo menos 3 traços de personalidade para definir a personagem (você escolheu ${draftTraits.length}/3)!`;
      isTraitShaking = true;
      setTimeout(() => { isTraitShaking = false; }, 500);
      currentStep = 2;
      audioManager.playNotification();
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
    { num: 2, label: 'Personalidade (3 a 5 Traços)' },
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
          
          <!-- SEÇÃO DO NOME DA PERSONAGEM (OBRIGATÓRIO: DIGITAR OU ESCOLHER PRÉ-DEFINIDO) -->
          <div class="p-4 sm:p-5 rounded-3xl bg-[#141624] border transition-all duration-300 flex flex-col gap-4 shadow-lg {nameWarning ? 'border-rose-500/70 shadow-rose-950/40 ring-1 ring-rose-500/30' : 'border-amber-500/20'}">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <label for="char-name-input-step1" class="text-xs sm:text-sm font-cinzel font-bold flex items-center gap-2 {nameWarning ? 'text-rose-300' : 'text-amber-400'}">
                <User class="w-4 h-4" />
                <span>Como você quer se chamar na Academia Lótus?</span>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-sans font-semibold {nameWarning ? 'bg-rose-500/30 text-rose-200 border border-rose-500/50' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}">
                  Obrigatório
                </span>
              </label>

              {#if draftName.trim().length >= 2}
                <span class="text-xs font-sans text-emerald-400 flex items-center gap-1 font-semibold">
                  <Check class="w-3.5 h-3.5" /> Nome definido: "{draftName.trim()}"
                </span>
              {:else}
                <span class="text-[11px] font-sans text-amber-300/70 italic">
                  Escolha um pré-definido ou digite o seu
                </span>
              {/if}
            </div>

            <!-- Campo de Texto com Animação de Shake caso tente avançar vazio -->
            <div class="relative w-full max-w-lg {isNameInputShaking ? 'animate-shake' : ''}">
              <div class="relative flex items-center">
                <input 
                  id="char-name-input-step1"
                  bind:this={nameInputRef}
                  type="text"
                  bind:value={draftName}
                  oninput={() => { if (draftName.trim().length >= 2) nameWarning = null; }}
                  maxlength="20"
                  placeholder="Escreva seu nome aqui..."
                  class="w-full pl-4 pr-10 py-3 rounded-2xl bg-black/60 font-cinzel text-sm sm:text-base text-white transition-all duration-200 focus:outline-none {nameWarning ? 'border-2 border-rose-500 ring-4 ring-rose-500/30 bg-rose-950/20 text-rose-100 placeholder-rose-300/50' : 'border border-amber-500/40 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/40'}"
                />
                {#if draftName}
                  <button
                    type="button"
                    onclick={() => { draftName = ''; nameWarning = null; nameInputRef?.focus(); }}
                    class="absolute right-3 p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Limpar nome"
                  >
                    <X class="w-4 h-4" />
                  </button>
                {/if}
              </div>
            </div>

            <!-- Alerta Visual Chamativo Apontando a Obrigação de Definir Nome -->
            {#if nameWarning}
              <div 
                class="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/70 text-rose-200 text-xs font-sans-ui flex items-start sm:items-center gap-3 shadow-lg shadow-rose-950/60"
                in:fade={{ duration: 150 }}
              >
                <AlertCircle class="w-5 h-5 text-rose-400 shrink-0 mt-0.5 sm:mt-0 animate-bounce" />
                <div class="flex-1">
                  <p class="font-bold text-rose-300 text-xs sm:text-sm">{nameWarning}</p>
                  <p class="text-[11px] text-rose-200/90 mt-0.5">
                    Digite um nome no campo acima ou clique em uma das sugestões abaixo para continuar:
                  </p>
                </div>
              </div>
            {/if}

            <!-- Sugestões Rápidas de Nome Pré-definidas -->
            <div class="flex flex-col gap-2 pt-1">
              <span class="text-[11px] text-zinc-400 font-sans flex items-center gap-1.5">
                <Sparkles class="w-3.5 h-3.5 text-amber-400" />
                <span>Nomes Pré-definidos Sugeridos:</span>
              </span>
              <div class="flex items-center gap-2 flex-wrap">
                {#each PRESET_NAMES as suggestion}
                  {@const isSelected = draftName === suggestion}
                  <button
                    type="button"
                    onclick={() => selectPresetName(suggestion)}
                    class="px-3.5 py-1.5 rounded-xl border text-xs font-cinzel transition-all active:scale-95 flex items-center gap-1.5 {isSelected ? 'bg-amber-500/30 border-amber-400 text-amber-200 font-bold shadow-md shadow-amber-500/20 ring-1 ring-amber-400/50' : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-white/20'}"
                  >
                    {#if isSelected}
                      <Check class="w-3 h-3 text-amber-400 stroke-[3]" />
                    {/if}
                    <span>{suggestion}</span>
                    {#if suggestion === 'Íris'}
                      <span class="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 ml-0.5">Canônico</span>
                    {/if}
                  </button>
                {/each}
              </div>
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
                  O signo rege a sua essência astral e expressa traços naturais de temperamento e sensibilidade na Academia Lótus.
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

            <!-- Painel da Essência Cósmica do Signo (Sem revelar afinidades ou spoilers) -->
            <div class="p-4 rounded-3xl bg-[#141624] border border-white/10 flex items-center gap-3.5 mt-2">
              <div class="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-2xl shrink-0">
                {activeZodiacDetails.symbol}
              </div>
              <div>
                <h4 class="text-xs font-cinzel font-bold text-amber-300">
                  Essência de {activeZodiacDetails.name}:
                </h4>
                <p class="text-[11px] text-zinc-300 font-sans-ui mt-0.5 leading-relaxed">
                  {activeZodiacDetails.essence}
                </p>
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
            
            <!-- Barra Superior: Contagem dos Traços & Filtros -->
            <div class="p-3.5 sm:p-4 border-b border-white/10 flex flex-col gap-2.5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-cinzel font-bold text-amber-300 flex items-center gap-1.5">
                  <Brain class="w-4 h-4 text-amber-400" />
                  <span>Escolha de 3 a 5 Traços ({draftTraits.length}/5):</span>
                </span>
                <span class="text-[11px] font-sans font-semibold {draftTraits.length >= 3 ? 'text-emerald-400' : 'text-amber-400'}">
                  {#if draftTraits.length === 0}
                    Mínimo 3 traços obrigatórios
                  {:else if draftTraits.length < 3}
                    Faltam {3 - draftTraits.length} para o mínimo
                  {:else if draftTraits.length === 5}
                    ✓ 5 Traços Máximos Definidos
                  {:else}
                    ✓ Mínimo atingido ({draftTraits.length}/5)
                  {/if}
                </span>
              </div>

              <!-- Barra de Progresso Visual de 5 Pontos -->
              <div class="grid grid-cols-5 gap-1.5 h-1.5 w-full bg-black/40 rounded-full p-0.5 border border-white/5">
                {#each Array(5) as _, i}
                  <div class="h-full rounded-full transition-all {i < draftTraits.length ? 'bg-gradient-to-r from-amber-500 to-amber-300 shadow-sm' : i < 3 ? 'bg-rose-500/25' : 'bg-white/10'}"></div>
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
                {@const IconComponent = iconMap[trait.iconName] || Sparkles}

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
                  Desbloqueia caminhos únicos de diálogo, percepções intuitivas e reações especiais durante sua convivência na Academia Lótus.
                </p>
              </div>

              {#if traitLimitWarning}
                <div class="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/60 text-rose-200 text-xs font-sans-ui flex items-center gap-2.5 shadow-lg shadow-rose-950/50" in:fade={{ duration: 150 }}>
                  <AlertCircle class="w-5 h-5 shrink-0 text-rose-400 animate-bounce" />
                  <div class="flex-1">
                    <p class="font-bold text-rose-300">{traitLimitWarning}</p>
                    {#if draftTraits.length < 3}
                      <p class="text-[11px] text-rose-200/80 mt-0.5">
                        Escolha mais {3 - draftTraits.length} {3 - draftTraits.length === 1 ? 'traço' : 'traços'} na lista à esquerda para poder avançar.
                      </p>
                    {/if}
                  </div>
                </div>
              {/if}

            </div>

            <!-- Resumo dos Traços Ativos Selecionados -->
            <div class="p-4 rounded-3xl bg-[#121420] border transition-all duration-300 {draftTraits.length < 3 ? 'border-amber-500/30' : 'border-emerald-500/30'} {isTraitShaking ? 'animate-shake' : ''} flex flex-col gap-2.5">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-cinzel font-bold text-zinc-400 uppercase tracking-wider">
                  Seus Traços de Personalidade ({draftTraits.length}/5 - mínimo 3):
                </span>
                {#if draftTraits.length >= 3}
                  <span class="text-xs text-emerald-400 font-sans font-semibold flex items-center gap-1">
                    <Check class="w-3.5 h-3.5" /> Mínimo atingido ({draftTraits.length}/5)
                  </span>
                {:else}
                  <span class="text-xs text-rose-400 font-sans font-semibold">
                    Faltam {3 - draftTraits.length} para liberar
                  </span>
                {/if}
              </div>
              <div class="flex items-center gap-2 flex-wrap">
                {#each draftTraits as traitId}
                  {@const trait = PERSONALITY_TRAITS.find(t => t.id === traitId)}
                  {@const TIcon = iconMap[trait?.iconName || ''] || Sparkles}
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

                <!-- Slots Vazios Pontilhados (Obrigatórios 1 a 3 vs Opcionais 4 e 5) -->
                {#each Array(Math.max(0, 5 - draftTraits.length)) as _, i}
                  {@const slotIndex = draftTraits.length + i + 1}
                  <div class="px-3 py-1.5 rounded-xl border border-dashed text-xs font-sans italic flex items-center gap-1.5 {slotIndex <= 3 ? 'border-rose-400/40 text-rose-300/80 bg-rose-950/20' : 'border-white/20 text-zinc-500'}">
                    <Plus class="w-3 h-3 opacity-40" />
                    <span>Slot {slotIndex} {slotIndex <= 3 ? '(Obrigatório)' : '(Opcional)'}</span>
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
              {@const IconComp = iconMap[aspiration.iconName] || Star}
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
                framing="full"
              />
            </div>

            <!-- Detalhes do Estilo Selecionado (Sem expor reações ou preferências de pretendentes) -->
            <div class="w-full mt-2 p-3 rounded-2xl bg-[#141624] border border-white/10 flex flex-col gap-1 text-xs text-zinc-300">
              <div class="flex items-center gap-2 text-[10px] font-cinzel font-bold text-amber-400 uppercase tracking-wider">
                <Sparkles class="w-3.5 h-3.5" />
                <span>Sensação do Visual:</span>
              </div>
              <p class="font-sans-ui text-[11px] leading-relaxed text-zinc-300">
                {activeOutfitDetails.description}
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
                Escolha o estilo que melhor expressa quem você é ao cruzar os portões da Academia Lótus.
              </p>
            </div>

            <!-- As 5 Opções de Looks -->
            <div class="flex flex-col gap-2.5">
              {#each OUTFIT_OPTIONS as outfit}
                {@const isSelected = draftOutfit === outfit.id}

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
                      <span class="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                        {outfit.styleTag}
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
        {#if draftName.trim()}
          <span class="font-bold text-white">{draftName.trim()}</span>
        {:else}
          <span class="text-rose-400 font-semibold italic flex items-center gap-1">
            <AlertCircle class="w-3.5 h-3.5" /> Nome pendente
          </span>
        {/if}
        <span>•</span>
        <span class="text-amber-300">{activeZodiacDetails?.symbol} {activeZodiacDetails?.name}</span>
        <span>•</span>
        <span class="{draftTraits.length >= 3 ? 'text-zinc-300' : 'text-amber-400 font-semibold'}">
          {draftTraits.length}/5 Traços {draftTraits.length < 3 ? '(mín. 3)' : ''}
        </span>
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