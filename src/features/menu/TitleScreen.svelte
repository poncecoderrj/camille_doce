<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { 
    Play, 
    RotateCcw, 
    Shirt, 
    Volume2, 
    VolumeX, 
    Bell, 
    Sparkles, 
    Sun, 
    Moon, 
    Compass, 
    Settings, 
    Check, 
    X,
    Heart,
    Sliders
  } from 'lucide-svelte';
  import { gameState } from '../game-state/GameState.svelte';
  import { audioManager } from '../audio/audio-manager';
  import ProtagonistCustomizerModal from '../customization/ProtagonistCustomizerModal.svelte';

  let isAudioSettingsOpen = $state(false);
  let isCreditsOpen = $state(false);

  function handleStartNewGame() {
    gameState.startNewGame();
  }

  function handleContinueGame() {
    gameState.continueGame();
  }

  function toggleMusic() {
    gameState.setMusicEnabled(!gameState.musicEnabled);
    audioManager.playClick();
  }

  function handleMusicVolumeChange(e: Event) {
    const val = Number((e.target as HTMLInputElement).value);
    gameState.setMusicVolume(val);
  }

  function toggleSfx() {
    gameState.setSfxEnabled(!gameState.sfxEnabled);
    audioManager.playClick();
  }

  function handleSfxVolumeChange(e: Event) {
    const val = Number((e.target as HTMLInputElement).value);
    gameState.setSfxVolume(val);
  }

  function testBellSfx() {
    audioManager.playBell();
  }

  function testNotificationSfx() {
    audioManager.playNotification();
  }

  function selectThemeMode(mode: 'auto' | 'light' | 'dark') {
    gameState.themeMode = mode;
    if (mode === 'light') gameState.theme = 'light';
    else if (mode === 'dark') gameState.theme = 'dark';
    audioManager.playClick();
  }
</script>

<!-- TELA INICIAL COMPLETA ESTILO VISUAL NOVEL PREMIUM -->
<div class="relative w-screen h-screen overflow-hidden select-none bg-[#0a0b10] flex flex-col items-center justify-between p-6 sm:p-10">
  
  <!-- IMAGEM ARTÍSTICA DE FUNDO COM SLOW DRIFT CINEMATOGRÁFICO -->
  <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
    <img 
      src="/assets/backgrounds/portao_escola.png" 
      alt="Portões da Academia Lótus"
      class="w-full h-full object-cover object-center transform scale-105 animate-slow-drift filter brightness-[0.45] contrast-[1.1] saturate-[1.1]"
    />
    <!-- Gradiente de Vinheta Aveludado -->
    <div class="absolute inset-0 bg-gradient-to-t from-[#08090e] via-[#090b12]/60 to-[#08090e]/80"></div>
    <div class="absolute inset-0 bg-radial from-transparent via-[#08090e]/30 to-[#08090e]/90"></div>
  </div>

  <!-- PÉTALAS / PARTÍCULAS ATMOSFÉRICAS DOURADAS -->
  <div class="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-50">
    <div class="particle w-3 h-3.5 bg-amber-300/30 rounded-full blur-[0.5px]" style="left: 10%; top: 75%; animation-delay: 0s;"></div>
    <div class="particle w-2 h-2.5 bg-rose-300/25 rounded-full blur-[0.5px]" style="left: 30%; top: 85%; animation-delay: 2.2s;"></div>
    <div class="particle w-2.5 h-3 bg-amber-200/35 rounded-full blur-[0.5px]" style="left: 65%; top: 60%; animation-delay: 4.1s;"></div>
    <div class="particle w-3 h-3 bg-amber-400/20 rounded-full blur-[0.5px]" style="left: 85%; top: 80%; animation-delay: 1.5s;"></div>
  </div>

  <!-- TOPO: STATUS RÁPIDO DE ÁUDIO & TEMA -->
  <header class="w-full max-w-5xl flex items-center justify-between z-20" in:fade={{ duration: 400 }}>
    <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-xs font-cinzel text-zinc-300">
      <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
      <span class="tracking-wider uppercase text-[10px]">Academia Lótus • 1º Ano</span>
    </div>

    <!-- BOTÕES RÁPIDOS DE CONTROLE SUPERIOR -->
    <div class="flex items-center gap-2">
      <!-- Mudo / Ativar Música Rápido -->
      <button 
        onclick={toggleMusic}
        title={gameState.musicEnabled ? 'Silenciar Música' : 'Tocar Música'}
        class="p-2.5 rounded-2xl border transition-all active:scale-95 {gameState.musicEnabled ? 'bg-amber-500/15 border-amber-500/30 text-amber-400' : 'bg-black/40 border-white/10 text-zinc-500'}"
      >
        {#if gameState.musicEnabled}
          <Volume2 class="w-4 h-4" />
        {:else}
          <VolumeX class="w-4 h-4" />
        {/if}
      </button>

      <!-- Abrir Configurações de Áudio & Tema -->
      <button 
        onclick={() => { isAudioSettingsOpen = true; audioManager.playClick(); }}
        title="Configurações de Áudio & Tema"
        class="px-3 py-2 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-sans font-medium backdrop-blur-md active:scale-95"
      >
        <Sliders class="w-4 h-4 text-amber-400" />
        <span class="hidden sm:inline">Áudio & Tema</span>
      </button>
    </div>
  </header>

  <!-- CENTRO: LOGOTIPO CINEMATOGRÁFICO DE 'ENTRE SINOS' -->
  <main class="flex-1 flex flex-col items-center justify-center text-center z-20 my-4" in:fly={{ y: -20, duration: 600 }}>
    
    <!-- Brasão Escolar Simbólico -->
    <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-transparent border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-xl mb-4 backdrop-blur-md">
      <Bell class="w-7 h-7 sm:w-8 sm:h-8 animate-bounce" style="animation-duration: 3s;" />
    </div>

    <!-- Título Principal com Tipografia Heroica -->
    <h1 class="text-3xl sm:text-5xl md:text-6xl font-cinzel font-black tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-500 drop-shadow-[0_4px_16px_rgba(245,158,11,0.35)]">
      Entre Sinos
    </h1>

    <div class="flex items-center gap-3 my-2 sm:my-3 opacity-75">
      <div class="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-amber-400"></div>
      <p class="text-xs sm:text-sm font-serif-romance italic text-amber-200 tracking-wider">
        Uma Década de Escolhas
      </p>
      <div class="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-amber-400"></div>
    </div>

    <p class="max-w-md text-xs sm:text-sm text-zinc-400 font-sans-ui px-4 leading-relaxed">
      Três pretendentes. Um colégio de prestígio. Dez anos de ambição, romances e segredos que ecoam a cada badalada do relógio.
    </p>

    <!-- MENU DE BOTÕES DE ENTRADA -->
    <div class="w-full max-w-sm mt-8 space-y-3 px-4">
      
      <!-- BOTÃO INICIAR NOVO JOGO -->
      <button 
        onclick={handleStartNewGame}
        class="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-cinzel font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_4px_24px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_32px_rgba(245,158,11,0.5)] transition-all duration-300 active:scale-95 group"
      >
        <Play class="w-4 h-4 fill-stone-950 group-hover:scale-110 transition-transform" />
        <span>Iniciar Jogo</span>
      </button>

      <!-- BOTÃO CONTINUAR (SE HOUVER JOGO EM ANDAMENTO) -->
      {#if gameState.hasStartedGame || gameState.history.length > 0}
        <button 
          onclick={handleContinueGame}
          class="w-full py-3 px-6 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-cinzel font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 backdrop-blur-md"
        >
          <RotateCcw class="w-4 h-4 text-amber-400" />
          <span>Continuar História</span>
        </button>
      {/if}

      <!-- BOTÃO ESTILO DA PERSONAGEM -->
      <button 
        onclick={() => { gameState.openWardrobe(); audioManager.playClick(); }}
        class="w-full py-3 px-6 rounded-2xl bg-[#141620]/90 hover:bg-[#1a1e2d] border border-amber-500/20 hover:border-amber-500/40 text-amber-200 font-cinzel font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 backdrop-blur-md"
      >
        <Shirt class="w-4 h-4 text-amber-400" />
        <span>Estilo da Personagem</span>
      </button>

    </div>

  </main>

  <!-- RODAPÉ: CRÉDITOS E INFORMAÇÕES DE AMBIENTE -->
  <footer class="w-full max-w-5xl flex items-center justify-between text-[11px] text-zinc-500 z-20" in:fade={{ duration: 400 }}>
    <button 
      onclick={() => { isCreditsOpen = true; audioManager.playClick(); }}
      class="hover:text-zinc-300 transition-colors"
    >
      Sobre & Personagens
    </button>
    <div class="flex items-center gap-1.5">
      <span>Entre Sinos v2.0 • Svelte 5 & Vite</span>
    </div>
  </footer>

  <!-- ================= MODAL DE CONFIGURAÇÃO DE ÁUDIO & TEMA ================= -->
  {#if isAudioSettingsOpen}
    <div 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      transition:fade={{ duration: 200 }}
    >
      <div 
        class="relative w-full max-w-lg bg-[#0e1017] border border-amber-500/30 rounded-3xl p-6 shadow-2xl text-zinc-100"
        transition:fly={{ y: 20, duration: 250 }}
      >
        <!-- Cabeçalho do Modal -->
        <div class="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
          <div class="flex items-center gap-2.5">
            <div class="p-2 rounded-xl bg-amber-500/15 border border-amber-500/25 text-amber-400">
              <Sliders class="w-5 h-5" />
            </div>
            <div>
              <h3 class="text-base font-cinzel font-bold text-white">Configurações de Áudio & Tema</h3>
              <p class="text-xs text-zinc-400 font-sans-ui">Ajuste a atmosfera acústica e a iluminação do jogo</p>
            </div>
          </div>
          <button 
            onclick={() => { isAudioSettingsOpen = false; audioManager.playClick(); }}
            class="p-2 rounded-xl border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-all"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <div class="space-y-6 max-h-[70vh] overflow-y-auto pr-1 custom-scrollbar">
          
          <!-- SEÇÃO 1: MÚSICA DO JOGO (BGM) -->
          <div class="bg-[#141620] border border-white/8 rounded-2xl p-4 space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <Volume2 class="w-4 h-4 text-amber-400" />
                <div>
                  <h4 class="text-xs font-cinzel font-bold text-white">Música Ambiente do Jogo</h4>
                  <p class="text-[11px] text-zinc-400 font-sans-ui">Trilha de piano e celesta estilo Visual Novel</p>
                </div>
              </div>
              <button 
                onclick={toggleMusic}
                class="px-3 py-1 rounded-xl text-xs font-cinzel font-bold transition-all {gameState.musicEnabled ? 'bg-amber-500 text-stone-950' : 'bg-white/10 text-zinc-400'}"
              >
                {gameState.musicEnabled ? 'Ativada' : 'Muda'}
              </button>
            </div>

            <!-- Slider de Volume da Música -->
            <div class="space-y-1.5 pt-1">
              <div class="flex justify-between text-[11px] text-zinc-400">
                <span>Volume da Música</span>
                <span class="font-bold text-amber-400">{gameState.musicVolume}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={gameState.musicVolume}
                oninput={handleMusicVolumeChange}
                disabled={!gameState.musicEnabled}
                class="w-full accent-amber-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg disabled:opacity-30"
              />
            </div>
          </div>

          <!-- SEÇÃO 2: EFEITOS SONOROS (SFX) -->
          <div class="bg-[#141620] border border-white/8 rounded-2xl p-4 space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <Bell class="w-4 h-4 text-amber-400" />
                <div>
                  <h4 class="text-xs font-cinzel font-bold text-white">Efeitos Sonoros (SFX)</h4>
                  <p class="text-[11px] text-zinc-400 font-sans-ui">Badaladas de sinos, cliques de diálogo e celular</p>
                </div>
              </div>
              <button 
                onclick={toggleSfx}
                class="px-3 py-1 rounded-xl text-xs font-cinzel font-bold transition-all {gameState.sfxEnabled ? 'bg-amber-500 text-stone-950' : 'bg-white/10 text-zinc-400'}"
              >
                {gameState.sfxEnabled ? 'Ativados' : 'Mudos'}
              </button>
            </div>

            <!-- Slider de Volume SFX -->
            <div class="space-y-1.5 pt-1">
              <div class="flex justify-between text-[11px] text-zinc-400">
                <span>Volume dos Efeitos</span>
                <span class="font-bold text-amber-400">{gameState.sfxVolume}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={gameState.sfxVolume}
                oninput={handleSfxVolumeChange}
                disabled={!gameState.sfxEnabled}
                class="w-full accent-amber-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg disabled:opacity-30"
              />
            </div>

            <!-- Botões de Teste de Som -->
            <div class="pt-2 flex items-center gap-2">
              <button 
                onclick={testBellSfx}
                class="flex-1 py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-cinzel font-semibold text-zinc-300 flex items-center justify-center gap-1.5 transition-all"
              >
                <Bell class="w-3.5 h-3.5 text-amber-400" />
                <span>Ouvir Sino Escolar</span>
              </button>

              <button 
                onclick={testNotificationSfx}
                class="flex-1 py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-cinzel font-semibold text-zinc-300 flex items-center justify-center gap-1.5 transition-all"
              >
                <Sparkles class="w-3.5 h-3.5 text-amber-400" />
                <span>Ouvir Celular</span>
              </button>
            </div>
          </div>

          <!-- SEÇÃO 3: TEMA VISUAL ADAPTATIVO (DIA, NOITE E LUMINOSIDADE DO CENÁRIO) -->
          <div class="bg-[#141620] border border-white/8 rounded-2xl p-4 space-y-3">
            <div>
              <h4 class="text-xs font-cinzel font-bold text-white flex items-center gap-2">
                <Compass class="w-4 h-4 text-amber-400" />
                Adaptação do Tema e Luminosidade
              </h4>
              <p class="text-[11px] text-zinc-400 font-sans-ui mt-0.5">
                Como a interface se adapta à hora do dia e à escuridão do ambiente
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              
              <!-- MODO AUTO INTELIGENTE -->
              <button 
                onclick={() => selectThemeMode('auto')}
                class="p-3 rounded-xl border text-left flex flex-col justify-between transition-all {gameState.themeMode === 'auto' ? 'bg-amber-500/15 border-amber-500 shadow-sm' : 'bg-black/30 border-white/10 hover:border-white/20'}"
              >
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs font-cinzel font-bold {gameState.themeMode === 'auto' ? 'text-amber-400' : 'text-white'}">
                    Automático
                  </span>
                  {#if gameState.themeMode === 'auto'}
                    <Check class="w-3.5 h-3.5 text-amber-400 stroke-[3]" />
                  {/if}
                </div>
                <p class="text-[10px] text-zinc-400 font-sans-ui">
                  Muda com o dia/noite e a luz do cenário atual.
                </p>
              </button>

              <!-- MODO CLARO FIXO -->
              <button 
                onclick={() => selectThemeMode('light')}
                class="p-3 rounded-xl border text-left flex flex-col justify-between transition-all {gameState.themeMode === 'light' ? 'bg-amber-500/15 border-amber-500 shadow-sm' : 'bg-black/30 border-white/10 hover:border-white/20'}"
              >
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs font-cinzel font-bold {gameState.themeMode === 'light' ? 'text-amber-400' : 'text-white'}">
                    Claro Fixo
                  </span>
                  {#if gameState.themeMode === 'light'}
                    <Check class="w-3.5 h-3.5 text-amber-400 stroke-[3]" />
                  {/if}
                </div>
                <p class="text-[10px] text-zinc-400 font-sans-ui">
                  Papel pergaminho clássico permanente.
                </p>
              </button>

              <!-- MODO ESCURO FIXO -->
              <button 
                onclick={() => selectThemeMode('dark')}
                class="p-3 rounded-xl border text-left flex flex-col justify-between transition-all {gameState.themeMode === 'dark' ? 'bg-amber-500/15 border-amber-500 shadow-sm' : 'bg-black/30 border-white/10 hover:border-white/20'}"
              >
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs font-cinzel font-bold {gameState.themeMode === 'dark' ? 'text-amber-400' : 'text-white'}">
                    Escuro Fixo
                  </span>
                  {#if gameState.themeMode === 'dark'}
                    <Check class="w-3.5 h-3.5 text-amber-400 stroke-[3]" />
                  {/if}
                </div>
                <p class="text-[10px] text-zinc-400 font-sans-ui">
                  Grafite e carvão suave permanente.
                </p>
              </button>

            </div>
          </div>

        </div>

        <div class="mt-6 pt-3 border-t border-white/10 flex justify-end">
          <button 
            onclick={() => { isAudioSettingsOpen = false; audioManager.playClick(); }}
            class="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-cinzel font-bold text-xs shadow-md transition-all active:scale-95"
          >
            Concluir
          </button>
        </div>

      </div>
    </div>
  {/if}

  <!-- ================= MODAL DE CRÉDITOS & PERSONAGENS ================= -->
  {#if isCreditsOpen}
    <div 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      transition:fade={{ duration: 200 }}
    >
      <div 
        class="relative w-full max-w-md bg-[#0e1017] border border-amber-500/30 rounded-3xl p-6 shadow-2xl text-zinc-100"
        transition:fly={{ y: 20, duration: 250 }}
      >
        <div class="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <h3 class="text-sm font-cinzel font-bold text-white flex items-center gap-2">
            <Heart class="w-4 h-4 text-rose-500" />
            Sobre Entre Sinos
          </h3>
          <button 
            onclick={() => isCreditsOpen = false}
            class="p-1.5 rounded-lg border border-white/10 text-zinc-400 hover:text-white"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <div class="space-y-3 text-xs text-zinc-300 font-sans-ui leading-relaxed">
          <p>
            <strong class="font-cinzel text-amber-400">Entre Sinos</strong> é uma Visual Novel interativa que abrange 10 anos na vida de uma jovem na Academia Lótus.
          </p>
          <div class="space-y-1.5 pt-2">
            <p><span class="text-rose-400 font-bold">• Dante:</span> Guitarrista rebelde do 3º ano, movido por guitarras e liberdade.</p>
            <p><span class="text-blue-400 font-bold">• Lucas:</span> Presidente metódico do grêmio, moldado por honra e disciplina familiar.</p>
            <p><span class="text-emerald-400 font-bold">• Theo:</span> Artista melancólico e observador, que enxerga poesia em cada detalhe.</p>
          </div>
        </div>

        <div class="mt-5 pt-3 border-t border-white/10 text-center">
          <button 
            onclick={() => isCreditsOpen = false}
            class="px-6 py-2 rounded-xl bg-white/10 text-white font-cinzel text-xs font-semibold"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- MODAL DE ESCOLHA DE LOOK DA PERSONAGEM (EXCLUSIVO DA TELA INICIAL) -->
  {#if gameState.isWardrobeOpen}
    <ProtagonistCustomizerModal onClose={() => gameState.closeWardrobe()} />
  {/if}

</div>
