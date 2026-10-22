<script lang="ts">
  import { gameState } from '../game-state/GameState.svelte';
  import { X, MapPin, Sparkles, Navigation } from 'lucide-svelte';

  interface Props {
    onClose: () => void;
  }

  let { onClose }: Props = $props();

  let isLight = $derived(gameState.theme === 'light');

  // As Salas e Locais da Academia Lótus e Residência
  const locations = [
    {
      id: 'Quarto da Protagonista',
      name: 'Quarto da Protagonista (Casa)',
      characterHere: 'Íris',
      characterRole: 'Seu Quarto',
      pinType: 'home',
      desc: 'Seu refúgio pessoal. Cama macia, escrivaninha de estudos, guarda-roupa e espelho de corpo inteiro.',
      available: true,
      x: '10%',
      y: '85%'
    },
    {
      id: 'Portões de Entrada',
      name: 'Portões de Entrada',
      characterHere: 'Dante',
      characterRole: 'Guitarrista',
      pinType: 'history', // ❗
      desc: 'Entrada principal com a torre do sino e cerejeiras. Dante está aqui com uma advertência.',
      available: true,
      x: '20%',
      y: '75%'
    },
    {
      id: 'Sala do Grêmio',
      name: 'Sala do Grêmio Estudantil',
      characterHere: 'Lucas',
      characterRole: 'Presidente',
      pinType: 'history', // ❗
      desc: 'Escritório central na ala oeste. Lucas está despachando documentos de matrícula.',
      available: true,
      x: '35%',
      y: '30%'
    },
    {
      id: 'Pátio Central',
      name: 'Pátio & Jardim das Fontes',
      characterHere: 'Theo',
      characterRole: 'Artista',
      pinType: 'side', // ◇
      desc: 'Área externa cercada por arcadas de pedra e bancos de madeira. Theo costuma desenhar aqui.',
      available: true,
      x: '70%',
      y: '55%'
    },
    {
      id: 'Biblioteca',
      name: 'Biblioteca da Sra. Mara',
      characterHere: 'Sra. Mara',
      characterRole: 'Bibliotecária',
      pinType: 'locked', // 🔒
      desc: 'Arquivos históricos da escola. (Liberada após validar a matrícula no Grêmio).',
      available: false,
      x: '80%',
      y: '25%'
    }
  ];

  function travelTo(locId: string) {
    gameState.currentLocation = locId;
    if (locId === 'Quarto da Protagonista') {
      gameState.currentNodeId = 'node_00_despertador';
    } else if (locId === 'Portões de Entrada') {
      gameState.currentNodeId = 'node_01_portao';
    } else if (locId === 'Sala do Grêmio') {
      gameState.currentNodeId = 'node_05_chegada_gremio';
    } else if (locId === 'Pátio Central') {
      gameState.currentNodeId = 'node_08_fim_prologo';
    }
    onClose();
  }
</script>

<!-- MODAL MAPA DA ESCOLA (TELA S03 DO BLUEPRINT) -->
<div 
  role="dialog"
  aria-modal="true"
  tabindex="-1"
  class="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none animate-fade-in"
  onclick={onClose}
  onkeydown={(e) => { if (e.key === 'Escape') onClose(); }}
>
  <div 
    role="presentation"
    class="relative w-full max-w-4xl h-[620px] rounded-[36px] overflow-hidden border shadow-2xl flex flex-col justify-between {isLight ? 'bg-[#ede5d6] border-[#cfbfab] text-[#2c221a]' : 'bg-[#0f1118] border-white/10 text-zinc-100'}"
    onclick={(e) => e.stopPropagation()}
  >
    <!-- CABEÇALHO DO MAPA -->
    <div class="px-6 py-4 border-b flex items-center justify-between {isLight ? 'border-[#cfbfab] bg-[#e4dac8]/80' : 'border-white/8 bg-black/40'}">
      <div class="flex items-center gap-3">
        <div class="p-2 rounded-xl {isLight ? 'bg-[#7c5b36] text-white' : 'bg-amber-500/20 text-amber-300'}">
          <Navigation class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-base font-cinzel font-bold tracking-wider">Mapa do Campus • Academia Lótus</h2>
          <p class="text-[11px] {isLight ? 'text-[#756453]' : 'text-zinc-400'} font-sans-ui">
            Selecione uma ala para se deslocar e ver os personagens presentes
          </p>
        </div>
      </div>

      <button 
        onclick={onClose}
        class="p-2 rounded-full border transition-all active:scale-95 {isLight ? 'bg-[#dfd3bf] hover:bg-[#d5c7b1] border-[#c2b098] text-[#3d3126]' : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300'}"
      >
        <X class="w-4 h-4" />
      </button>
    </div>

    <!-- ÁREA VISUAL DO MAPA COM PINS -->
    <div class="relative flex-1 w-full overflow-hidden p-6 flex flex-col justify-between">
      
      <!-- Ilustração Planta do Campus (Blueprint Vetorial) -->
      <svg 
        viewBox="0 0 800 400" 
        class="absolute inset-4 w-auto h-auto opacity-30 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="50" y="50" width="700" height="300" rx="20" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="6,6"/>
        <path d="M 150,350 L 150,100 L 400,100 L 400,350 Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <path d="M 400,350 L 400,100 L 650,100 L 650,350 Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="400" cy="225" r="45" fill="none" stroke="currentColor" stroke-width="1.5"/>
      </svg>

      <!-- LISTA DE CARDS DE LOCAIS CLICÁVEIS -->
      <div class="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-auto">
        {#each locations as loc}
          <button 
            disabled={!loc.available}
            onclick={() => travelTo(loc.id)}
            class="relative p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between gap-2.5 {loc.available ? 'hover:scale-[1.01] active:scale-[0.99] cursor-pointer' : 'opacity-50 cursor-not-allowed'} {isLight ? 'bg-[#f4eee3] hover:bg-[#faf6ee] border-[#cbbba2] shadow-sm' : 'bg-[#151824]/90 hover:bg-[#1c2030] border-white/8 shadow-md'}"
          >
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full {loc.available ? (loc.characterHere === 'Dante' ? 'bg-rose-500' : loc.characterHere === 'Lucas' ? 'bg-blue-500' : 'bg-emerald-500') : 'bg-zinc-500'}"></span>
                <h3 class="text-sm font-cinzel font-bold">{loc.name}</h3>
              </div>

              {#if loc.available}
                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold font-sans-ui {isLight ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}">
                  Visitar ➔
                </span>
              {:else}
                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold font-sans-ui bg-zinc-700/50 text-zinc-400">
                  Bloqueado 🔒
                </span>
              {/if}
            </div>

            <p class="text-xs font-sans-ui {isLight ? 'text-[#615243]' : 'text-zinc-300'} leading-relaxed">
              {loc.desc}
            </p>

            {#if loc.characterHere}
              <div class="pt-2 border-t {isLight ? 'border-[#e4dac9]' : 'border-white/6'} flex items-center justify-between text-[11px] font-semibold">
                <span class="flex items-center gap-1.5 {loc.characterHere === 'Dante' ? 'text-rose-500' : loc.characterHere === 'Lucas' ? 'text-blue-500' : 'text-emerald-500'}">
                  <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                  Presente: {loc.characterHere} ({loc.characterRole})
                </span>
                <span class="text-[10px] opacity-60">Toque para entrar</span>
              </div>
            {/if}
          </button>
        {/each}
      </div>

      <!-- RADAR INFORMATIVO NO RODAPÉ -->
      <div class="relative z-10 px-4 py-2.5 rounded-xl border flex items-center justify-between text-xs {isLight ? 'bg-[#e2d8c5] border-[#c0af95] text-[#4d3d2e]' : 'bg-[#12141d] border-white/6 text-zinc-300'}">
        <div class="flex items-center gap-2">
          <Sparkles class="w-4 h-4 text-amber-500" />
          <span class="font-medium">Radar Sensorial: Sons de guitarra ecoam dos portões; luz acesa na sala do conselho.</span>
        </div>
        <span class="text-[10px] opacity-75 font-mono">Consumo de PA: 0 (Livre)</span>
      </div>

    </div>

  </div>
</div>
