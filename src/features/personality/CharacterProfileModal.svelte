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
    AlertCircle
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
  }

  let { onClose }: Props = $props();

  type TabType = 'signo' | 'personalidade' | 'sonho' | 'look';
  let activeTab = $state<TabType>('personalidade');

  // Estado local editável
  let draftZodiac = $state<ZodiacId>(gameState.protagonistProfile.zodiac);
  let draftTraits = $state<string[]>([...gameState.protagonistProfile.traits]);
  let draftAspiration = $state<string>(gameState.protagonistProfile.aspiration);
  let draftOutfit = $state<OutfitId>(gameState.currentOutfit);

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

  // Traços filtrados pela categoria selecionada
  let filteredTraits = $derived.by(() => {
    if (traitCategoryFilter === 'Todas') return PERSONALITY_TRAITS;
    return PERSONALITY_TRAITS.filter(t => t.category === traitCategoryFilter);
  });

  function selectZodiac(id: ZodiacId) {
    draftZodiac = id;
    audioManager.playClick();
  }

  function toggleTrait(id: string) {
    traitLimitWarning = null;
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

  function handleSaveProfile() {
    audioManager.playChoice();
    gameState.setZodiac(draftZodiac);
    gameState.setAspiration(draftAspiration);
    gameState.protagonistProfile.traits = [...draftTraits];
    gameState.setOutfit(draftOutfit);
    onClose();
  }

  const boyAccents = {
    dante: { name: 'Dante', color: '#e11d48' },
    lucas: { name: 'Lucas', color: '#2563eb' },
    theo: { name: 'Theo', color: '#059669' }
  };
</script>

<!-- MODAL COMPLETO DE IDENTIDADE, SIGNO, PERSONALIDADE E ASPIRAÇÃO -->
<div 
  class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md select-none overflow-hidden"
  transition:fade={{ duration: 200 }}
>
  <div 
    class="relative w-full max-w-5xl h-[92vh] max-h-[820px] bg-[#0c0d13]/95 border border-amber-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-zinc-100"
    transition:fly={{ y: 20, duration: 250 }}
  >
    
    <!-- CABEÇALHO DO PERFIL -->
    <header class="h-14 sm:h-16 px-4 sm:px-6 border-b border-white/10 flex items-center justify-between bg-[#11131c]/90 shrink-0">
      <div class="flex items-center gap-3">
        <div class="p-2 rounded-xl bg-amber-500/15 border border-amber-500/25 text-amber-400">
          <User class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-sm sm:text-base font-cinzel font-bold text-white flex items-center gap-2">
            Identidade da Protagonista
            <span class="text-[10px] font-sans px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold uppercase tracking-wider">
              Íris
            </span>
          </h2>
          <p class="text-xs text-zinc-400 font-sans-ui hidden sm:block">
            Defina o Signo, 5 Traços de Caráter, Aspiração de Vida e Look Oficial
          </p>
        </div>
      </div>

      <button 
        onclick={onClose}
        title="Fechar"
        class="p-2 rounded-xl border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-all active:scale-95"
      >
        <X class="w-5 h-5" />
      </button>
    </header>

    <!-- NAVEGAÇÃO ENTRE AS 4 DIMENSÕES DE IDENTIDADE -->
    <nav class="flex items-center border-b border-white/10 bg-[#12141e] px-4 py-2 gap-2 overflow-x-auto custom-scrollbar shrink-0">
      
      <button 
        onclick={() => { activeTab = 'personalidade'; audioManager.playClick(); }}
        class="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-cinzel font-semibold transition-all shrink-0 {activeTab === 'personalidade' ? 'bg-amber-500 text-stone-950 font-bold shadow-md' : 'text-zinc-400 hover:text-white hover:bg-white/5'}"
      >
        <Heart class="w-4 h-4" />
        <span>1. Personalidade (The Sims)</span>
        <span class="ml-1 text-[10px] px-1.5 py-0.2 rounded-full {activeTab === 'personalidade' ? 'bg-black/20 text-stone-950' : 'bg-white/10 text-amber-300'} font-bold">
          {draftTraits.length}/5
        </span>
      </button>

      <button 
        onclick={() => { activeTab = 'signo'; audioManager.playClick(); }}
        class="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-cinzel font-semibold transition-all shrink-0 {activeTab === 'signo' ? 'bg-amber-500 text-stone-950 font-bold shadow-md' : 'text-zinc-400 hover:text-white hover:bg-white/5'}"
      >
        <Star class="w-4 h-4" />
        <span>2. Signo do Zodíaco</span>
      </button>

      <button 
        onclick={() => { activeTab = 'sonho'; audioManager.playClick(); }}
        class="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-cinzel font-semibold transition-all shrink-0 {activeTab === 'sonho' ? 'bg-amber-500 text-stone-950 font-bold shadow-md' : 'text-zinc-400 hover:text-white hover:bg-white/5'}"
      >
        <Target class="w-4 h-4" />
        <span>3. Aspiração de Vida</span>
      </button>

      <button 
        onclick={() => { activeTab = 'look'; audioManager.playClick(); }}
        class="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-cinzel font-semibold transition-all shrink-0 {activeTab === 'look' ? 'bg-amber-500 text-stone-950 font-bold shadow-md' : 'text-zinc-400 hover:text-white hover:bg-white/5'}"
      >
        <Shirt class="w-4 h-4" />
        <span>4. Look Oficial</span>
      </button>

    </nav>

    <!-- ÁREA DE CONTEÚDO SCROLLÁVEL DA ABA ATIVA -->
    <div class="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0e1017] custom-scrollbar">
      
      <!-- ================= ABA 1: PERSONALIDADE (5 TRAÇOS THE SIMS) ================= -->
      {#if activeTab === 'personalidade'}
        <div class="space-y-4" in:fade={{ duration: 150 }}>
          
          <!-- BARRA DE STATUS DOS 5 TRAÇOS -->
          <div class="bg-[#141622] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-cinzel font-bold text-white">Escolha 5 Traços de Personalidade</h3>
                <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-full {draftTraits.length === 5 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}">
                  {draftTraits.length} de 5 selecionados
                </span>
              </div>
              <p class="text-xs text-zinc-400 font-sans-ui mt-0.5">
                Os traços desbloqueiam diálogos exclusivos, reações espontâneas e afinidades com os rapazes.
              </p>
            </div>

            <!-- FILTRO DE CATEGORIAS -->
            <div class="flex items-center gap-1 overflow-x-auto custom-scrollbar shrink-0">
              {#each (['Todas', 'Emocional', 'Intelectual', 'Social', 'Estilo de Vida'] as const) as cat}
                <button
                  onclick={() => traitCategoryFilter = cat}
                  class="px-2.5 py-1 rounded-xl text-[11px] font-sans font-medium transition-all shrink-0 {traitCategoryFilter === cat ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-white/5 text-zinc-400 hover:text-white'}"
                >
                  {cat}
                </button>
              {/each}
            </div>
          </div>

          <!-- AVISO DE LIMITE OU REQUISITO -->
          {#if traitLimitWarning}
            <div class="px-4 py-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2" in:fade={{ duration: 150 }}>
              <AlertCircle class="w-4 h-4 shrink-0 text-amber-400" />
              <span>{traitLimitWarning}</span>
            </div>
          {/if}

          <!-- GRID DE CARDS DE PERSONALIDADE -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {#each filteredTraits as trait}
              {@const isSelected = draftTraits.includes(trait.id)}
              {@const IconComp = iconMap[trait.iconName] || Heart}
              <button
                onclick={() => toggleTrait(trait.id)}
                class="text-left p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between {isSelected ? 'bg-amber-500/15 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-[#141620] border-white/8 hover:border-white/20 hover:bg-[#181b28]'}"
              >
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <div class="p-2 rounded-xl {isSelected ? 'bg-amber-500 text-stone-950' : 'bg-white/5 text-amber-400 border border-white/10'}">
                      <IconComp class="w-4 h-4" />
                    </div>

                    <div class="flex items-center gap-1.5">
                      <span class="text-[9px] font-sans uppercase font-bold px-1.5 py-0.5 rounded-md bg-white/5 text-zinc-400">
                        {trait.category}
                      </span>
                      {#if isSelected}
                        <span class="w-4 h-4 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center">
                          <Check class="w-3 h-3 stroke-[3]" />
                        </span>
                      {/if}
                    </div>
                  </div>

                  <h4 class="text-xs sm:text-sm font-cinzel font-bold {isSelected ? 'text-amber-400' : 'text-white'}">
                    {trait.name}
                  </h4>
                  <p class="text-xs text-zinc-300 font-sans-ui mt-1 leading-snug">
                    {trait.description}
                  </p>
                </div>

                <div class="mt-3 pt-2 border-t border-white/5 text-[10px] text-amber-300/80 font-sans italic">
                  ✦ {trait.dialogueImpact}
                </div>
              </button>
            {/each}
          </div>

        </div>

      <!-- ================= ABA 2: SIGNO DO ZODÍACO & SINASTRIA ================= -->
      {:else if activeTab === 'signo'}
        <div class="space-y-4" in:fade={{ duration: 150 }}>
          
          <div>
            <h3 class="text-sm font-cinzel font-bold text-white">Signo Astrológico da Protagonista</h3>
            <p class="text-xs text-zinc-400 font-sans-ui">
              Define a essência elemental da personagem e modula a química inicial com os pretendentes.
            </p>
          </div>

          <!-- GRID DOS 12 SIGNOS -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {#each ZODIAC_SIGNS as sign}
              {@const isSelected = draftZodiac === sign.id}
              <button
                onclick={() => selectZodiac(sign.id)}
                class="p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between {isSelected ? 'bg-amber-500/15 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)] scale-105' : 'bg-[#141620] border-white/8 hover:border-white/20'}"
              >
                <span class="text-2xl mb-1">{sign.symbol}</span>
                <h4 class="text-xs font-cinzel font-bold {isSelected ? 'text-amber-400' : 'text-white'}">
                  {sign.name}
                </h4>
                <span class="text-[9px] font-sans font-semibold text-zinc-400 mt-0.5">
                  {sign.element}
                </span>
                <span class="text-[8px] font-sans text-zinc-500 mt-1">
                  {sign.dates}
                </span>
              </button>
            {/each}
          </div>

          <!-- PAINEL DE DETALHES E SINASTRIA COM OS PRETENDENTES -->
          {#if activeZodiacDetails}
            <div class="bg-[#141622] border border-amber-500/30 rounded-2xl p-4 sm:p-5 mt-4 space-y-3">
              <div class="flex items-center justify-between border-b border-white/10 pb-2">
                <div class="flex items-center gap-2">
                  <span class="text-2xl">{activeZodiacDetails.symbol}</span>
                  <div>
                    <h4 class="text-sm font-cinzel font-bold text-amber-400">
                      {activeZodiacDetails.name} • Elemento {activeZodiacDetails.element}
                    </h4>
                    <p class="text-[11px] text-zinc-400">{activeZodiacDetails.dates}</p>
                  </div>
                </div>
                <span class="text-xs font-sans italic text-zinc-300">
                  "{activeZodiacDetails.essence}"
                </span>
              </div>

              <!-- SINASTRIA AFETIVA COM OS 3 RAPAZES -->
              <div class="pt-1">
                <p class="text-[10px] uppercase font-cinzel font-bold text-zinc-400 tracking-wider mb-2">
                  Dinâmica Astrológica com os Pretendentes:
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div class="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span class="text-xs font-cinzel font-bold" style="color: {boyAccents.dante.color};">
                      Dante (Áries / Fogo)
                    </span>
                    <p class="text-[11px] text-zinc-300 font-sans-ui leading-relaxed">
                      {activeZodiacDetails.synastry.dante}
                    </p>
                  </div>

                  <div class="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span class="text-xs font-cinzel font-bold" style="color: {boyAccents.lucas.color};">
                      Lucas (Capricórnio / Terra)
                    </span>
                    <p class="text-[11px] text-zinc-300 font-sans-ui leading-relaxed">
                      {activeZodiacDetails.synastry.lucas}
                    </p>
                  </div>

                  <div class="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span class="text-xs font-cinzel font-bold" style="color: {boyAccents.theo.color};">
                      Theo (Peixes / Água)
                    </span>
                    <p class="text-[11px] text-zinc-300 font-sans-ui leading-relaxed">
                      {activeZodiacDetails.synastry.theo}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          {/if}

        </div>

      <!-- ================= ABA 3: ASPIRAÇÃO DE VIDA (O GRANDE SONHO) ================= -->
      {:else if activeTab === 'sonho'}
        <div class="space-y-4" in:fade={{ duration: 150 }}>
          
          <div>
            <h3 class="text-sm font-cinzel font-bold text-white">Aspiração de Vida da Personagem</h3>
            <p class="text-xs text-zinc-400 font-sans-ui">
              O grande sonho que guiará os 10 anos de escolhas e ambições de Íris na Academia Lótus.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {#each ASPIRATIONS as asp}
              {@const isSelected = draftAspiration === asp.id}
              {@const IconComp = iconMap[asp.iconName] || Target}
              <button
                onclick={() => selectAspiration(asp.id)}
                class="text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between {isSelected ? 'bg-amber-500/15 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.25)]' : 'bg-[#141620] border-white/8 hover:border-white/20 hover:bg-[#181b28]'}"
              >
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <div class="p-2.5 rounded-xl {isSelected ? 'bg-amber-500 text-stone-950' : 'bg-white/5 text-amber-400 border border-white/10'}">
                      <IconComp class="w-5 h-5" />
                    </div>

                    {#if isSelected}
                      <span class="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center">
                        <Check class="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    {/if}
                  </div>

                  <h4 class="text-sm font-cinzel font-bold {isSelected ? 'text-amber-400' : 'text-white'}">
                    {asp.title}
                  </h4>
                  <p class="text-[11px] text-amber-300 font-serif-romance italic mt-0.5">
                    "{asp.tagline}"
                  </p>
                  <p class="text-xs text-zinc-300 font-sans-ui mt-2 leading-relaxed">
                    {asp.description}
                  </p>
                </div>

                <div class="mt-4 pt-2.5 border-t border-white/5 space-y-1">
                  <span class="text-[10px] uppercase font-cinzel font-bold text-zinc-400">Meta dos 10 Anos:</span>
                  <p class="text-[11px] text-zinc-200 font-sans-ui">
                    {asp.decadeGoal}
                  </p>
                </div>
              </button>
            {/each}
          </div>

        </div>

      <!-- ================= ABA 4: LOOK OFICIAL ================= -->
      {:else if activeTab === 'look'}
        <div class="space-y-4" in:fade={{ duration: 150 }}>
          
          <div class="flex flex-col md:flex-row gap-6">
            
            <!-- Palco Visual Limpo -->
            <div class="w-full md:w-[42%] h-72 sm:h-80 md:h-[460px] bg-radial from-[#1e1c28]/60 via-[#101017] to-[#090a0f] border border-white/10 rounded-2xl flex items-end justify-center p-4 overflow-hidden relative shrink-0">
              <div class="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-amber-400/10 to-transparent pointer-events-none blur-xl"></div>
              <ProtagonistActor 
                outfitId={draftOutfit}
                scale={1}
              />
            </div>

            <!-- Seleção dos 3 Looks -->
            <div class="flex-1 space-y-3">
              <div>
                <h3 class="text-sm font-cinzel font-bold text-white">Look Oficial da Personagem</h3>
                <p class="text-xs text-zinc-400 font-sans-ui">
                  Ilustração completa cel-shaded sem fatiamentos ou sobreposições.
                </p>
              </div>

              {#each OUTFIT_OPTIONS as outfit}
                {@const isSelected = draftOutfit === outfit.id}
                {@const boy = boyAccents[outfit.affinityTarget]}
                <button
                  onclick={() => selectOutfit(outfit.id)}
                  class="w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-4 {isSelected ? 'bg-amber-500/15 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-[#141620] border-white/8 hover:border-white/20'}"
                >
                  <div class="w-14 h-20 rounded-xl overflow-hidden bg-black/50 border border-white/10 shrink-0 flex items-end justify-center">
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

                    <p class="text-xs text-zinc-300 font-sans-ui mt-1 leading-snug">
                      {outfit.description}
                    </p>

                    <div class="mt-2 text-[11px] font-sans font-semibold" style="color: {boy.color};">
                      ♥ +{outfit.affinityBonus} com {boy.name}
                    </div>
                  </div>
                </button>
              {/each}
            </div>

          </div>

        </div>
      {/if}

    </div>

    <!-- RODAPÉ FIXO COM RESUMO E BOTÃO DE CONFIRMAR -->
    <footer class="h-16 px-4 sm:px-6 border-t border-white/10 bg-[#11131c] flex items-center justify-between shrink-0">
      
      <!-- Resumo Rápido da Identidade Escolhida -->
      <div class="hidden sm:flex items-center gap-2 text-xs text-zinc-400 font-sans-ui">
        <span class="font-bold text-white">Íris</span>
        <span>•</span>
        <span class="text-amber-300">{activeZodiacDetails?.symbol} {activeZodiacDetails?.name}</span>
        <span>•</span>
        <span class="text-zinc-300">{draftTraits.length}/5 Traços</span>
        <span>•</span>
        <span class="text-amber-200">{activeAspirationDetails?.title.split('&')[0]}</span>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto justify-end">
        <button 
          onclick={onClose}
          class="px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 text-xs text-zinc-400 hover:text-white transition-all"
        >
          Cancelar
        </button>

        <button 
          onclick={handleSaveProfile}
          class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-cinzel font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
        >
          <Check class="w-4 h-4 stroke-[2.5]" />
          <span>Confirmar Identidade</span>
        </button>
      </div>

    </footer>

  </div>
</div>
