<script lang="ts">
  import { gameState } from '../game-state/GameState.svelte';
  import { 
    MessageSquare, 
    Users, 
    Camera, 
    Calendar, 
    BookOpen, 
    Mail, 
    Settings, 
    Wifi, 
    Battery, 
    ChevronLeft, 
    Heart, 
    Sparkles, 
    Send, 
    Phone, 
    Flashlight, 
    Radio, 
    Cloud, 
    Check, 
    CheckCheck, 
    Play, 
    Pause, 
    Plus,
    X,
    Sun,
    Moon,
    Smartphone
  } from 'lucide-svelte';

  interface Props {
    onClose?: () => void;
  }

  let { onClose }: Props = $props();

  // Papéis de parede disponíveis
  const wallpapers: Record<string, { name: string; bg: string }> = {
    cherry_sunset: {
      name: 'Cerejeiras ao Entardecer',
      bg: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 40%, #fda4af 100%)'
    },
    midnight_stars: {
      name: 'Noite Estrelada',
      bg: 'linear-gradient(135deg, #09090b 0%, #1e1b4b 60%, #312e81 100%)'
    },
    golden_lotus: {
      name: 'Lótus Dourada',
      bg: 'linear-gradient(135deg, #78350f 0%, #b45309 50%, #d97706 100%)'
    },
    minimalist: {
      name: 'Titânio Escuro',
      bg: 'linear-gradient(180deg, #18181b 0%, #09090b 100%)'
    }
  };

  let activeWallpaper = $derived(wallpapers[gameState.phoneWallpaper] || wallpapers.cherry_sunset);
  let isWhatsAppScreen = $derived(gameState.phoneActiveScreen === 'chat_room' || gameState.phoneActiveScreen === 'whatsapp');

  // Lista de Contatos dos Garotos e Amigos
  const contacts = [
    {
      id: 'dante',
      name: 'Dante',
      role: 'Guitarrista Rebelde',
      status: 'Se não for urgente, nem manda mensagem.',
      onlineStatus: 'Online',
      color: 'bg-rose-600',
      phone: '+55 (11) 98721-0421',
      avatarText: 'D'
    },
    {
      id: 'lucas',
      name: 'Lucas',
      role: 'Presidente do Grêmio',
      status: 'Atendimento do Conselho: 08h às 17h.',
      onlineStatus: 'Visto por último 07:51',
      color: 'bg-blue-600',
      phone: '+55 (11) 99142-3001',
      avatarText: 'L'
    },
    {
      id: 'theo',
      name: 'Theo',
      role: 'Artista Melancólico',
      status: 'Pintando no ateliê. O silêncio é a melhor resposta.',
      onlineStatus: 'Visto por último 07:30',
      color: 'bg-emerald-600',
      phone: '+55 (11) 97554-1889',
      avatarText: 'T'
    },
    {
      id: 'nina',
      name: 'Nina',
      role: 'Melhor Amiga',
      status: 'Me liga se for babado do novo ano!',
      onlineStatus: 'Online',
      color: 'bg-pink-600',
      phone: '+55 (11) 96214-5582',
      avatarText: 'N'
    },
    {
      id: 'caio',
      name: 'Caio',
      role: 'Baterista da Banda',
      status: 'Batendo baqueta até quebrar 🥁',
      onlineStatus: 'Online',
      color: 'bg-orange-600',
      phone: '+55 (11) 98112-9934',
      avatarText: 'C'
    },
    {
      id: 'melissa',
      name: 'Melissa Prado',
      role: 'Vice-Presidente do Grêmio',
      status: 'Assuntos oficiais via protocolo.',
      onlineStatus: 'Visto por último 13:40',
      color: 'bg-sky-600',
      phone: '+55 (11) 97321-4402',
      avatarText: 'M'
    },
    {
      id: 'ravi',
      name: 'Ravi',
      role: 'Monitor de Botânica',
      status: 'Respire fundo. A terra ensina tudo 🌿',
      onlineStatus: 'Online',
      color: 'bg-teal-600',
      phone: '+55 (11) 96450-8812',
      avatarText: 'R'
    },
    {
      id: 'mara',
      name: 'Sra. Mara',
      role: 'Biblioteca Histórica',
      status: 'O silêncio é o templo das palavras.',
      onlineStatus: 'Visto às 18:00',
      color: 'bg-violet-600',
      phone: '+55 (11) 95530-1010',
      avatarText: 'M'
    }
  ];

  // Contagem dinâmica de notificações não lidas no WhatsApp
  let unreadZapCount = $derived.by(() => {
    return Object.keys(gameState.whatsappPendingReplies).length + (gameState.unreadNotification ? 1 : 0);
  });

  // LótusGram Posts e Stories
  const stories = [
    { name: 'Dante', avatar: 'D', color: 'from-rose-500 to-amber-500', unread: true },
    { name: 'Lucas', avatar: 'L', color: 'from-blue-500 to-indigo-600', unread: false },
    { name: 'Theo', avatar: 'T', color: 'from-emerald-400 to-teal-600', unread: true },
    { name: 'Nina', avatar: 'N', color: 'from-purple-500 to-pink-500', unread: true }
  ];

  const feedPosts = [
    {
      author: 'Caio (3º B)',
      handle: '@caio_lotus',
      time: 'Há 15 min',
      text: 'Alguém avisa pro Dante que a bateria dele tá tremendo as paredes da cantina toda 🎸😂',
      likes: 24,
      comments: 6
    },
    {
      author: 'Lucas S.',
      handle: '@lucas_gremio',
      time: 'Há 40 min',
      text: 'Atenção aos alunos transferidos: o plantão de autenticação de fichas encerra hoje pontualmente às 16h.',
      likes: 58,
      comments: 3
    }
  ];

  // E-mails Escolares Oficiais
  const emails = [
    {
      from: 'Diretoria Academia Lótus',
      subject: 'Boas-vindas ao semestre letivo e termo de conduta',
      time: '06:30',
      preview: 'Prezada aluna, informamos que o uso de uniformes completos é obrigatório...'
    },
    {
      from: 'Conselho Estudantil (Lucas)',
      subject: 'Confirmação de recebimento da ficha de transferência',
      time: '07:52',
      preview: 'Seus documentos foram arquivados sob o protocolo #4092. Armário liberado.'
    }
  ];

  // Calendário de Eventos da Escola
  const calendarEvents = [
    { date: 'Hoje, 22 Out', title: 'Primeiro Dia de Aulas & Entrega de Fichas', type: 'urgent' },
    { date: '28 Out', title: 'Queda de Luz / Ensaio no Auditório', type: 'school' },
    { date: '05 Nov', title: 'Festival de Primavera & Encontro Especial', type: 'event' },
    { date: '14 Nov', title: 'Aniversário do Dante 🎸', type: 'birthday' }
  ];

  // Estado para nova anotação do Diário
  let newDiaryTitle = $state('');
  let newDiaryContent = $state('');
  let isWritingDiary = $state(false);

  function handleSaveDiary() {
    if (newDiaryTitle && newDiaryContent) {
      gameState.addDiaryNote(newDiaryTitle, newDiaryContent);
      newDiaryTitle = '';
      newDiaryContent = '';
      isWritingDiary = false;
    }
  }

  // Simulação de reprodução de áudio do WhatsApp
  let isPlayingAudio = $state(false);
  function toggleAudioPlay() {
    isPlayingAudio = !isPlayingAudio;
  }

  // Notificação toast de backup
  let backupFeedback = $state(false);
  function triggerBackupWithFeedback() {
    gameState.triggerCloudBackup();
    backupFeedback = true;
    setTimeout(() => backupFeedback = false, 2500);
  }

  // Auto-scroll do WhatsApp para nova mensagem e divisor não lido
  let chatScrollContainer = $state<HTMLDivElement | null>(null);

  $effect(() => {
    if (gameState.phoneActiveScreen === 'chat_room' && chatScrollContainer) {
      const _target = gameState.activeChatTarget;
      const _msgs = gameState.whatsappChats[_target];
      const _replies = gameState.whatsappPendingReplies[_target];
      const _typing = gameState.whatsappTyping[_target];
      setTimeout(() => {
        if (chatScrollContainer) {
          const unreadElement = chatScrollContainer.querySelector('.unread-separator');
          if (unreadElement) {
            unreadElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            chatScrollContainer.scrollTop = chatScrollContainer.scrollHeight;
          }
        }
      }, 60);
    }
  });
</script>

<!-- CHASSIS FÍSICO DO SMARTPHONE ESTILO GTA V (TITÂNIO PREMIUM) -->
<div 
  class="relative w-[345px] h-[675px] rounded-[52px] p-3.5 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 shadow-2xl border-4 border-zinc-600/60 flex flex-col justify-between overflow-hidden select-none"
  style="box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), inset 0 0 2px 2px rgba(255, 255, 255, 0.2);"
>
  <!-- BOTÕES LATERAIS FÍSICOS DO APARELHO -->
  <div class="absolute -left-1 top-24 w-1 h-8 bg-zinc-600 rounded-l"></div>
  <div class="absolute -left-1 top-36 w-1 h-12 bg-zinc-600 rounded-l"></div>
  <div class="absolute -right-1 top-28 w-1 h-14 bg-zinc-600 rounded-r"></div>

  <!-- TELA OLED RETINA -->
  <div 
    class="relative w-full h-full rounded-[40px] overflow-hidden flex flex-col justify-between border border-black/40 text-white font-sans-ui"
    style="background: {isWhatsAppScreen ? '#0b141a' : activeWallpaper.bg};"
  >
    <!-- OVERLAY ESCURO PARA LEGIBILIDADE (APENAS NA TELA INICIAL/OUTROS APPS) -->
    {#if !isWhatsAppScreen}
      <div class="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-none"></div>
    {/if}

    <!-- DYNAMIC ISLAND (PÍLULA DE SENSORES NO TOPO) -->
    <div class="relative z-30 pt-3 pb-1.5 px-6 flex items-center justify-between text-[11px] font-semibold transition-colors duration-200 {isWhatsAppScreen ? 'bg-[#1f2c34] text-zinc-100 border-b border-[#2a3942]/40' : 'text-zinc-100'}">
      <span>07:55</span>

      <!-- Dynamic Island Central -->
      <div class="w-24 h-5 bg-black rounded-full shadow-inner flex items-center justify-center gap-2 border border-zinc-800/80">
        <div class="w-2 h-2 rounded-full bg-zinc-900 border border-zinc-800"></div>
        <div class="w-1.5 h-1.5 rounded-full {gameState.isFlashlightOn ? 'bg-amber-400 animate-pulse' : 'bg-blue-900/50'}"></div>
      </div>

      <div class="flex items-center gap-1.5 text-zinc-200">
        {#if gameState.isHotspotOn}
          <span title="Roteador Wi-Fi Ativo">
            <Radio class="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          </span>
        {/if}
        <Wifi class="w-3.5 h-3.5" />
        <Battery class="w-4 h-4 text-emerald-400" />
      </div>
    </div>

    <!-- NOTIFICAÇÃO EXPANSÍVEL (BANNER DINÂMICO) -->
    {#if gameState.unreadNotification && gameState.phoneActiveScreen === 'home'}
      <div class="relative z-30 mx-3 mt-1 p-2.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/20 shadow-xl flex items-center justify-between animate-bounce">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white shadow">
            <MessageSquare class="w-3.5 h-3.5" />
          </div>
          <div>
            <p class="text-[9px] text-zinc-400 font-semibold uppercase tracking-wider">WhatsApp • Agora</p>
            <p class="text-xs text-zinc-100 font-medium truncate max-w-[190px]">{gameState.unreadNotification}</p>
          </div>
        </div>
        <button 
          onclick={() => gameState.openPhoneApp('chat_room', gameState.activeChatTarget || 'nina')}
          class="px-2 py-1 rounded-lg bg-emerald-600 text-[10px] font-bold text-white uppercase hover:bg-emerald-500"
        >
          Ver
        </button>
      </div>
    {/if}

    <!-- ================= CONTEÚDO DA TELA ================= -->
    <div class="relative z-20 flex-1 overflow-y-auto {isWhatsAppScreen ? 'p-0' : 'px-3.5 py-2.5'} custom-scrollbar flex flex-col justify-between {isWhatsAppScreen ? 'bg-[#0b141a]' : ''}">
      
      <!-- 1. TELA INICIAL (HOME GRID ESTILO GTA V / IOS) -->
      {#if gameState.phoneActiveScreen === 'home'}
        <div class="flex flex-col gap-5 pt-3">
          
          <!-- Relógio e Data Grande -->
          <div class="text-center text-white drop-shadow-md">
            <h1 class="text-4xl font-light tracking-tight">07:55</h1>
            <p class="text-[11px] font-medium text-zinc-200 mt-0.5 uppercase tracking-wider">Quinta-feira, 22 de Outubro</p>
          </div>

          <!-- Grade de Apps (8 Aplicativos Narrativos) -->
          <div class="grid grid-cols-4 gap-y-4 gap-x-2 px-1">
            
            <!-- 1. WhatsApp -->
            <button 
              onclick={() => gameState.openPhoneApp('whatsapp')}
              class="flex flex-col items-center gap-1 group active:scale-95 transition-all"
            >
              <div class="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <MessageSquare class="w-6 h-6 text-white" />
                {#if unreadZapCount > 0}
                  <span class="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[9px] font-bold flex items-center justify-center text-white border-2 border-zinc-900 shadow">
                    {unreadZapCount}
                  </span>
                {/if}
              </div>
              <span class="text-[10px] font-medium text-white drop-shadow">WhatsApp</span>
            </button>

            <!-- 2. Contatos -->
            <button 
              onclick={() => gameState.openPhoneApp('contacts')}
              class="flex flex-col items-center gap-1 group active:scale-95 transition-all"
            >
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Users class="w-6 h-6 text-white" />
              </div>
              <span class="text-[10px] font-medium text-white drop-shadow">Contatos</span>
            </button>

            <!-- 3. LótusGram (Instagram) -->
            <button 
              onclick={() => gameState.openPhoneApp('lotusgram')}
              class="flex flex-col items-center gap-1 group active:scale-95 transition-all"
            >
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Camera class="w-6 h-6 text-white" />
              </div>
              <span class="text-[10px] font-medium text-white drop-shadow">LótusGram</span>
            </button>

            <!-- 4. Agenda -->
            <button 
              onclick={() => gameState.openPhoneApp('agenda')}
              class="flex flex-col items-center gap-1 group active:scale-95 transition-all"
            >
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Calendar class="w-6 h-6 text-white" />
              </div>
              <span class="text-[10px] font-medium text-white drop-shadow">Agenda</span>
            </button>

            <!-- 5. Diário (10 Anos) -->
            <button 
              onclick={() => gameState.openPhoneApp('diario')}
              class="flex flex-col items-center gap-1 group active:scale-95 transition-all"
            >
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <BookOpen class="w-6 h-6 text-white" />
              </div>
              <span class="text-[10px] font-medium text-white drop-shadow">Diário</span>
            </button>

            <!-- 6. E-mail & Nuvem -->
            <button 
              onclick={() => gameState.openPhoneApp('email')}
              class="flex flex-col items-center gap-1 group active:scale-95 transition-all"
            >
              <div class="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Mail class="w-6 h-6 text-white" />
                <span class="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full text-[9px] font-bold flex items-center justify-center text-white border-2 border-zinc-900 shadow">
                  2
                </span>
              </div>
              <span class="text-[10px] font-medium text-white drop-shadow">E-mail</span>
            </button>

            <!-- 7. Lanterna (Hardware) -->
            <button 
              onclick={() => gameState.toggleFlashlight()}
              class="flex flex-col items-center gap-1 group active:scale-95 transition-all"
            >
              <div class="w-12 h-12 rounded-2xl {gameState.isFlashlightOn ? 'bg-amber-400 text-black shadow-amber-400/50' : 'bg-zinc-800/80 text-zinc-300'} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Flashlight class="w-6 h-6" />
              </div>
              <span class="text-[10px] font-medium text-white drop-shadow">Lanterna</span>
            </button>

            <!-- 8. Ajustes -->
            <button 
              onclick={() => gameState.openPhoneApp('settings')}
              class="flex flex-col items-center gap-1 group active:scale-95 transition-all"
            >
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-600 to-zinc-800 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Settings class="w-6 h-6 text-white" />
              </div>
              <span class="text-[10px] font-medium text-white drop-shadow">Ajustes</span>
            </button>

          </div>
        </div>

      <!-- 2. APP: WHATSAPP (MENSAGENS CHEGAM CONFORME O JOGO AVANÇA) -->
      {:else if gameState.phoneActiveScreen === 'whatsapp'}
        {@const activeContacts = contacts.filter(c => gameState.whatsappChats[c.id] && gameState.whatsappChats[c.id].length > 0)}
        <div class="flex flex-col h-full bg-[#0b141a]">
          <!-- Cabeçalho WhatsApp Verde Clássico Full-Bleed -->
          <div class="flex items-center justify-between px-4 py-3 bg-[#1f2c34] border-b border-[#2a3942] shrink-0 shadow-md">
            <h2 class="text-sm font-bold text-white tracking-wide">WhatsApp</h2>
            <span class="text-[11px] font-semibold text-[#00a884]">Conversas ({activeContacts.length})</span>
          </div>

          {#if activeContacts.length === 0}
            <!-- Estado Inicial Zerado Sem Mensagens -->
            <div class="flex-1 flex flex-col items-center justify-center p-6 text-center text-zinc-300 gap-3">
              <div class="w-14 h-14 rounded-3xl bg-[#1f2c34] border border-[#00a884]/40 flex items-center justify-center text-[#00a884] shadow-lg">
                <MessageSquare class="w-7 h-7" />
              </div>
              <div>
                <h3 class="text-xs font-bold text-white">Nenhuma conversa ativa</h3>
                <p class="text-[11px] text-[#8696a0] mt-1 max-w-[210px] leading-relaxed">
                  Suas mensagens com amigos e colegas da Academia Lótus chegarão aqui conforme a história avança.
                </p>
              </div>
            </div>
          {:else}
            <!-- Lista de Conversas Ativas que já Enviaram Mensagem -->
            <div class="flex flex-col overflow-y-auto custom-scrollbar flex-1 p-2 gap-1.5">
              {#each activeContacts as c}
                {@const msgs = gameState.whatsappChats[c.id] || []}
                {@const lastMsg = msgs[msgs.length - 1]}
                {@const hasPending = (gameState.whatsappPendingReplies[c.id] || []).length > 0}
                {@const hasUnread = msgs.some(m => m.unread)}
                {@const unreadCount = msgs.filter(m => m.unread).length || (hasPending ? 1 : 0)}
                <button 
                  onclick={() => gameState.openPhoneApp('chat_room', c.id)}
                  class="w-full p-3 rounded-2xl bg-[#1f2c34] hover:bg-[#2a3942] border {hasPending || hasUnread ? 'border-[#00a884]/70 shadow-sm shadow-[#00a884]/20 ring-1 ring-[#00a884]/50' : 'border-white/5'} backdrop-blur-md flex items-center justify-between text-left transition-all active:scale-[0.98]"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full {c.color} flex items-center justify-center font-bold text-white text-xs shadow-inner shrink-0">
                      {c.avatarText}
                    </div>
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5">
                        <h3 class="text-xs font-bold text-white">{c.name}</h3>
                        {#if hasPending || hasUnread}
                          <span class="w-2 h-2 rounded-full bg-[#00a884] animate-pulse"></span>
                        {/if}
                      </div>
                      <p class="text-[11px] text-[#8696a0] truncate max-w-[150px]">
                        {lastMsg?.text || (lastMsg?.isAudio ? '🎵 Mensagem de voz' : '...')}
                      </p>
                    </div>
                  </div>

                  <div class="flex flex-col items-end gap-1 shrink-0">
                    <span class="text-[10px] text-[#8696a0]">{lastMsg?.time || '07:45'}</span>
                    <div class="flex items-center gap-1 text-[10px] text-[#00a884]">
                      {#if lastMsg?.from === 'me'}
                        <CheckCheck class="w-3.5 h-3.5 text-[#53bdeb]" />
                      {:else if hasPending || hasUnread}
                        <span class="px-1.5 py-0.2 rounded-full bg-[#00a884] text-white text-[9px] font-bold">
                          {unreadCount}
                        </span>
                      {/if}
                    </div>
                  </div>
                </button>
              {/each}
            </div>
          {/if}
        </div>

      <!-- 3. APP: CHAT ROOM DO WHATSAPP (MENSAGENS + ESCOLHAS DE RESPOSTA + IGNORAR) -->
      {:else if gameState.phoneActiveScreen === 'chat_room'}
        {@const char = contacts.find(c => c.id === gameState.activeChatTarget) || contacts[0]}
        {@const msgs = gameState.whatsappChats[gameState.activeChatTarget] || []}
        {@const pendingReplies = gameState.whatsappPendingReplies[gameState.activeChatTarget] || []}

        <div class="flex flex-col justify-between h-full bg-[#0b141a]">
          <!-- Topo da Conversa WhatsApp Full-Bleed (Sem margens vermelhas) -->
          <div class="flex items-center justify-between px-3.5 py-2.5 bg-[#1f2c34] border-b border-[#2a3942] shrink-0 z-10 shadow-md">
            <div class="flex items-center gap-2.5">
              <button 
                onclick={() => gameState.phoneActiveScreen = 'whatsapp'} 
                class="p-1 -ml-1 text-[#00a884] hover:text-[#25d366] transition-colors flex items-center" 
                title="Voltar às conversas"
              >
                <ChevronLeft class="w-5 h-5" />
              </button>
              <div class="w-9 h-9 rounded-full {char.color} flex items-center justify-center text-sm font-bold text-white shadow-inner shrink-0">
                {char.avatarText}
              </div>
              <div class="flex flex-col">
                <h4 class="font-bold text-xs text-white leading-tight">{char.name}</h4>
                <p class="text-[10px] text-[#00a884] font-medium leading-tight">
                  {gameState.whatsappTyping[char.id] ? 'digitando...' : char.onlineStatus}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3 text-[#00a884]">
              <Phone class="w-4 h-4 cursor-pointer hover:text-[#25d366] transition-colors" />
            </div>
          </div>

          <!-- Balões de Mensagem -->
          <div 
            bind:this={chatScrollContainer}
            class="flex-1 flex flex-col gap-2.5 overflow-y-auto px-3.5 py-3 custom-scrollbar bg-[#0b141a]"
          >
            {#if msgs.length === 0}
              <div class="flex flex-col items-center justify-center h-full text-zinc-400 text-center gap-1.5 py-12">
                <p class="text-xs">Nenhuma mensagem com {char.name} ainda.</p>
                <p class="text-[10px] text-[#8696a0]">As conversas surgirão durante os diálogos da história.</p>
              </div>
            {:else}
              {#each msgs as msg, idx}
                <!-- Separador Visual de "Mensagens não lidas" (padrão WhatsApp Oficial) -->
                {#if msg.unread && (!msgs[idx - 1] || !msgs[idx - 1].unread)}
                  <div class="unread-separator flex items-center justify-center my-2 select-none animate-in fade-in">
                    <div class="h-[1px] bg-[#2a3942] flex-1"></div>
                    <div class="mx-2.5 px-3 py-0.5 rounded-full bg-[#182229] border border-[#00a884]/40 text-[#00a884] text-[10px] font-semibold tracking-wider uppercase shadow-sm flex items-center gap-1.5">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#00a884] animate-pulse"></span>
                      <span>Mensagens não lidas</span>
                    </div>
                    <div class="h-[1px] bg-[#2a3942] flex-1"></div>
                  </div>
                {/if}

                <div class="flex {msg.from === 'me' ? 'justify-end' : 'justify-start'}">
                  <div class="max-w-[85%] rounded-2xl px-3.5 py-2 text-xs shadow-md {msg.from === 'me' ? 'bg-[#005c4b] text-white rounded-br-none' : 'bg-[#202c33] text-[#e9edef] rounded-bl-none border border-white/5'}">
                    {#if msg.isAudio}
                      <!-- Áudio do WhatsApp com Play/Pause -->
                      <div class="flex items-center gap-2.5 py-0.5">
                        <button 
                          onclick={toggleAudioPlay}
                          class="w-7 h-7 rounded-full bg-[#00a884] hover:bg-[#25d366] text-white flex items-center justify-center transition-colors"
                        >
                          {#if isPlayingAudio}
                            <Pause class="w-3.5 h-3.5" />
                          {:else}
                            <Play class="w-3.5 h-3.5 ml-0.5" />
                          {/if}
                        </button>
                        <div class="flex-1 flex flex-col gap-1">
                          <div class="w-24 h-1.5 bg-zinc-600 rounded-full overflow-hidden">
                            <div class="h-full bg-[#00a884] {isPlayingAudio ? 'w-full animate-pulse' : 'w-1/3'}"></div>
                          </div>
                          <span class="text-[9px] text-zinc-300">{msg.audioDuration || '0:15'}</span>
                        </div>
                      </div>
                    {:else}
                      <p class="leading-relaxed font-sans-ui">{msg.text}</p>
                    {/if}
                    <div class="flex items-center justify-end gap-1 mt-1 opacity-70">
                      <span class="text-[8px] text-[#8696a0]">{msg.time}</span>
                      {#if msg.from === 'me'}
                        <CheckCheck class="w-3.5 h-3.5 text-[#53bdeb]" />
                      {/if}
                    </div>
                  </div>
                </div>
              {/each}
            {/if}

            <!-- Balão de Digitando do NPC -->
            {#if gameState.whatsappTyping[char.id]}
              <div class="flex justify-start animate-fade-in">
                <div class="rounded-2xl rounded-bl-none px-3.5 py-2.5 bg-[#202c33] text-[#00a884] flex items-center gap-1.5 shadow-md border border-white/5">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#00a884] animate-bounce"></span>
                  <span class="w-1.5 h-1.5 rounded-full bg-[#00a884] animate-bounce [animation-delay:0.2s]"></span>
                  <span class="w-1.5 h-1.5 rounded-full bg-[#00a884] animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            {/if}
          </div>

          <!-- BARRA INTERATIVA DE ESCOLHA DE RESPOSTAS (SUPER NÍTIDA, ALTO CONTRASTE E MODERNA) -->
          {#if pendingReplies.length > 0}
            <div class="p-3 bg-[#111b21] border-t border-[#222e35] flex flex-col gap-2 shrink-0 shadow-2xl">
              <div class="flex items-center justify-between px-0.5">
                <span class="text-[11px] font-bold text-[#00a884] uppercase tracking-wider flex items-center gap-1.5">
                  <Send class="w-3 h-3 text-[#00a884]" />
                  <span>Como responder {char.name}:</span>
                </span>
                <span class="text-[9px] text-[#8696a0]">Selecione uma resposta</span>
              </div>

              <div class="flex flex-col gap-2 max-h-44 overflow-y-auto custom-scrollbar pr-0.5">
                {#each pendingReplies as reply}
                  <button 
                    onclick={() => gameState.sendWhatsAppReply(gameState.activeChatTarget, reply)}
                    class="group relative text-left p-3 rounded-2xl bg-[#202c33] hover:bg-[#2a3942] border-2 border-[#00a884]/60 hover:border-[#00a884] text-white transition-all duration-200 active:scale-[0.98] shadow-md flex items-center justify-between gap-2.5"
                  >
                    <div class="flex flex-col gap-1 min-w-0 flex-1">
                      <!-- TONE TAG COM ALTO CONTRASTE E DESTAQUE -->
                      <div>
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#00a884]/20 border border-[#00a884]/60 text-[#25d366]">
                          [{reply.toneTag}]
                        </span>
                      </div>
                      <!-- TEXTO DA RESPOSTA CLARO, NÍTIDO E BRANCO -->
                      <p class="text-white text-[12px] sm:text-[13px] font-medium leading-snug tracking-normal">
                        {reply.text}
                      </p>
                    </div>

                    <!-- BOTÃO DE ENVIAR VERDE WHATSAPP VIBRANTE -->
                    <div class="w-8 h-8 rounded-full bg-[#00a884] group-hover:bg-[#25d366] text-white flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-110">
                      <Send class="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                    </div>
                  </button>
                {/each}
              </div>

              <!-- BOTÃO RESPONDER MAIS TARDE DISCRETO E LEGÍVEL -->
              <button 
                onclick={() => gameState.isPhoneRaised = false}
                class="w-full mt-0.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-[11px] font-semibold transition-all text-center"
                title="Fechar o telefone e responder mais tarde"
              >
                Responder mais tarde (Fechar celular)
              </button>
            </div>
          {:else}
            <!-- Experiência de Guardar Celular: Quando o NPC não for falar mais nada -->
            <div class="p-3 bg-[#111b21] border-t border-[#222e35] flex flex-col gap-2 shrink-0 shadow-lg">
              {#if gameState.whatsappTyping[char.id]}
                <div class="flex items-center gap-2 text-[#00a884] py-1">
                  <div class="flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#00a884] animate-bounce"></span>
                    <span class="w-1.5 h-1.5 rounded-full bg-[#00a884] animate-bounce [animation-delay:0.2s]"></span>
                    <span class="w-1.5 h-1.5 rounded-full bg-[#00a884] animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  <span class="text-xs font-semibold">{char.name} está digitando...</span>
                </div>
              {:else}
                <div class="w-full flex flex-col gap-2">
                  <div class="flex items-center justify-between text-[11px] text-[#8696a0]">
                    <span class="flex items-center gap-1.5">
                      <Check class="w-3.5 h-3.5 text-[#00a884]" />
                      <span class="text-zinc-300 font-medium">Conversa encerrada</span>
                    </span>
                    <span class="text-[10px] text-zinc-500 italic">Guardando telefone...</span>
                  </div>
                  <button 
                    onclick={() => gameState.isPhoneRaised = false}
                    class="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
                    title="Guardar o celular e continuar o jogo"
                  >
                    <Smartphone class="w-3.5 h-3.5 text-white" />
                    <span>Guardar Celular</span>
                  </button>
                </div>
              {/if}
            </div>
          {/if}
        </div>

            <!-- 4. APP: CONTATOS -->
      {:else if gameState.phoneActiveScreen === 'contacts'}
        <div class="flex flex-col gap-3">
          <div class="pb-2 border-b border-white/10">
            <h2 class="text-sm font-bold">Contatos Salvos</h2>
            <p class="text-[10px] text-zinc-300">Números de telefone da Academia Lótus</p>
          </div>

          <div class="flex flex-col gap-2.5">
            {#each contacts as c}
              {@const score = gameState.affinity[c.id] || 0}
              <div class="p-3 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md flex flex-col gap-2">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <div class="w-10 h-10 rounded-full {c.color} flex items-center justify-center font-bold text-white text-sm">
                      {c.avatarText}
                    </div>
                    <div>
                      <h3 class="text-xs font-bold text-white">{c.name}</h3>
                      <p class="text-[10px] text-amber-300 font-mono">{c.phone}</p>
                    </div>
                  </div>
                  <button 
                    onclick={() => gameState.openPhoneApp('chat_room', c.id)}
                    class="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                    title="Chamar no WhatsApp"
                  >
                    <MessageSquare class="w-4 h-4" />
                  </button>
                </div>
                <p class="text-[10px] text-zinc-300 italic bg-white/5 p-2 rounded-xl">"{c.status}"</p>
              </div>
            {/each}
          </div>
        </div>

      <!-- 5. APP: LÓTUSGRAM (INSTAGRAM) -->
      {:else if gameState.phoneActiveScreen === 'lotusgram'}
        <div class="flex flex-col gap-3">
          <!-- Cabeçalho LótusGram -->
          <div class="flex items-center justify-between pb-2 border-b border-white/10">
            <h2 class="text-sm font-bold font-serif-romance italic tracking-wider text-pink-300">LótusGram</h2>
            <span class="text-[10px] text-zinc-300">#VidaEscolar</span>
          </div>

          <!-- Fileira de Stories Circulares -->
          <div class="flex gap-2.5 overflow-x-auto pb-1 custom-scrollbar">
            {#each stories as s}
              <div class="flex flex-col items-center gap-1 shrink-0">
                <div class="p-0.5 rounded-full bg-gradient-to-tr {s.color} {s.unread ? 'ring-2 ring-pink-500' : 'opacity-70'}">
                  <div class="w-11 h-11 rounded-full bg-black flex items-center justify-center font-bold text-xs text-white">
                    {s.avatar}
                  </div>
                </div>
                <span class="text-[9px] text-zinc-300">{s.name}</span>
              </div>
            {/each}
          </div>

          <!-- Feed de Posts -->
          <div class="flex flex-col gap-3">
            {#each feedPosts as p}
              <div class="p-3 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md flex flex-col gap-1.5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-pink-300">{p.author}</span>
                  <span class="text-[9px] text-zinc-400">{p.time}</span>
                </div>
                <p class="text-[11px] text-zinc-100 leading-relaxed">{p.text}</p>
                <div class="flex items-center gap-4 pt-1 text-[10px] text-zinc-300 border-t border-white/10">
                  <span class="flex items-center gap-1 hover:text-rose-400 cursor-pointer">♥ {p.likes}</span>
                  <span class="flex items-center gap-1 hover:text-blue-400 cursor-pointer">💬 {p.comments}</span>
                </div>
              </div>
            {/each}
          </div>
        </div>

      <!-- 6. APP: AGENDA & CALENDÁRIO -->
      {:else if gameState.phoneActiveScreen === 'agenda'}
        <div class="flex flex-col gap-3">
          <div class="pb-2 border-b border-white/10 flex items-center justify-between">
            <h2 class="text-sm font-bold">Calendário Acadêmico</h2>
            <span class="text-[10px] text-amber-300 font-semibold">Semestre 1</span>
          </div>

          <!-- Calendário Visual dos Eventos -->
          <div class="flex flex-col gap-2">
            {#each calendarEvents as ev}
              <div class="p-3 rounded-2xl border backdrop-blur-md flex flex-col gap-1 {ev.type === 'birthday' ? 'bg-rose-950/40 border-rose-500/40' : ev.type === 'urgent' ? 'bg-amber-950/40 border-amber-500/40' : 'bg-black/60 border-white/10'}">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-amber-400">{ev.date}</span>
                  {#if ev.type === 'birthday'}
                    <span class="text-[9px] px-2 py-0.5 rounded-full bg-rose-600 text-white font-bold">Aniversário</span>
                  {/if}
                </div>
                <h4 class="text-xs font-bold text-white">{ev.title}</h4>
              </div>
            {/each}
          </div>
        </div>

      <!-- 7. APP: DIÁRIO PESSOAL (LINHA DO TEMPO DE 10 ANOS) -->
      {:else if gameState.phoneActiveScreen === 'diario'}
        <div class="flex flex-col gap-3">
          <div class="pb-2 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 class="text-sm font-bold">Diário Pessoal</h2>
              <p class="text-[10px] text-purple-300">Linha do tempo ao longo dos 10 anos</p>
            </div>
            <button 
              onclick={() => isWritingDiary = !isWritingDiary}
              class="px-2.5 py-1 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold flex items-center gap-1 shadow"
            >
              <Plus class="w-3 h-3" />
              <span>Escrever</span>
            </button>
          </div>

          <!-- Formulário para Escrever no Diário -->
          {#if isWritingDiary}
            <div class="p-3 rounded-2xl bg-purple-950/80 border border-purple-500/50 flex flex-col gap-2 animate-fade-in">
              <input 
                type="text" 
                bind:value={newDiaryTitle}
                placeholder="Título da reflexão..." 
                class="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-1.5 text-xs text-white placeholder-zinc-400 outline-none"
              />
              <textarea 
                bind:value={newDiaryContent}
                placeholder="O que você está sentindo hoje? Anos depois você poderá reler isso..."
                rows="3"
                class="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-xs text-white placeholder-zinc-400 outline-none resize-none"
              ></textarea>
              <div class="flex justify-end gap-2">
                <button onclick={() => isWritingDiary = false} class="px-2 py-1 text-[10px] text-zinc-300">Cancelar</button>
                <button onclick={handleSaveDiary} class="px-3 py-1 rounded-lg bg-purple-600 text-[10px] font-bold text-white">Salvar no Diário</button>
              </div>
            </div>
          {/if}

          <!-- Lista de Entradas do Diário Salvas -->
          <div class="flex flex-col gap-2.5">
            {#each gameState.playerDiaryNotes as note}
              <div class="p-3 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md flex flex-col gap-1.5">
                <div class="flex items-center justify-between">
                  <span class="text-[9px] font-bold uppercase tracking-wider text-purple-400">{note.ageText}</span>
                  <span class="text-[9px] text-zinc-400">{note.date}</span>
                </div>
                <h4 class="text-xs font-bold text-white">{note.title}</h4>
                <p class="text-[11px] text-zinc-200 leading-relaxed italic font-serif-romance">"{note.content}"</p>
              </div>
            {/each}
          </div>
        </div>

      <!-- 8. APP: E-MAIL & LÓTUSCLOUD (SISTEMA DE BACKUP) -->
      {:else if gameState.phoneActiveScreen === 'email'}
        <div class="flex flex-col gap-3">
          <div class="pb-2 border-b border-white/10 flex items-center justify-between">
            <h2 class="text-sm font-bold">Lótus Mail & Cloud</h2>
            <span class="text-[10px] text-sky-300">iris@lotus.edu</span>
          </div>

          <!-- Card do LótusCloud (Mecânica de Backup para o Enredo) -->
          <div class="p-3.5 rounded-2xl bg-sky-950/60 border border-sky-500/40 backdrop-blur-md flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Cloud class="w-4 h-4 text-sky-400" />
                <span class="text-xs font-bold text-white">LótusCloud Backup</span>
              </div>
              <span class="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center gap-1">
                <Check class="w-2.5 h-2.5" /> Sincronizado
              </span>
            </div>
            <p class="text-[10px] text-zinc-300">
              Salva seus contatos, fotos e diários. Se você perder ou trocar de aparelho, todos os dados são recuperados.
            </p>
            <div class="flex items-center justify-between pt-1 text-[9px] text-zinc-400">
              <span>Último backup: {gameState.lastBackupTimestamp}</span>
              <button 
                onclick={triggerBackupWithFeedback}
                class="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold transition-colors"
              >
                {backupFeedback ? 'Backup Feito!' : 'Fazer Backup'}
              </button>
            </div>
          </div>

          <!-- Lista de E-mails Recebidos -->
          <div class="flex flex-col gap-2">
            <p class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Caixa de Entrada (2)</p>
            {#each emails as em}
              <div class="p-3 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md flex flex-col gap-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-sky-300">{em.from}</span>
                  <span class="text-[9px] text-zinc-400">{em.time}</span>
                </div>
                <h4 class="text-[11px] font-semibold text-white">{em.subject}</h4>
                <p class="text-[10px] text-zinc-300 truncate">{em.preview}</p>
              </div>
            {/each}
          </div>
        </div>

      <!-- 9. APP: AJUSTES & RECURSOS DE HARDWARE -->
      {:else if gameState.phoneActiveScreen === 'settings'}
        <div class="flex flex-col gap-3">
          <div class="pb-2 border-b border-white/10">
            <h2 class="text-sm font-bold">Ajustes & Conectividade</h2>
          </div>

          <!-- Roteador Wi-Fi (Hotspot para enredos) -->
          <div class="p-3 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-between">
            <div>
              <h4 class="text-xs font-bold text-white flex items-center gap-1.5">
                <Radio class="w-3.5 h-3.5 text-emerald-400" />
                <span>Roteador Wi-Fi (Hotspot)</span>
              </h4>
              <p class="text-[10px] text-zinc-300 mt-0.5">Permite compartilhar internet com outros alunos</p>
            </div>
            <button 
              aria-label="Alternar Roteador Wi-Fi"
              onclick={() => gameState.toggleHotspot()}
              class="w-10 h-5 rounded-full p-0.5 transition-colors {gameState.isHotspotOn ? 'bg-emerald-500' : 'bg-zinc-700'}"
            >
              <div class="w-4 h-4 rounded-full bg-white transition-transform {gameState.isHotspotOn ? 'translate-x-5' : 'translate-x-0'}"></div>
            </button>
          </div>

          <!-- Troca de Papel de Parede -->
          <div>
            <p class="text-[11px] font-bold text-zinc-200 mb-2">Papel de Parede</p>
            <div class="grid grid-cols-2 gap-2">
              {#each Object.entries(wallpapers) as [key, val]}
                <button 
                  onclick={() => gameState.phoneWallpaper = key as any}
                  class="p-2 rounded-xl border text-[10px] font-semibold text-white flex flex-col items-center justify-center h-14 {gameState.phoneWallpaper === key ? 'border-amber-400 ring-2 ring-amber-400/50' : 'border-white/20'}"
                  style="background: {val.bg};"
                >
                  <span class="drop-shadow">{val.name}</span>
                </button>
              {/each}
            </div>
          </div>
        </div>
      {/if}

    </div>

    <!-- BARRA INFERIOR DE NAVEGAÇÃO FÍSICA (HOME BAR DO IPHONE) -->
    <div class="relative z-30 pb-3 pt-1 flex flex-col items-center justify-center transition-colors duration-200 {isWhatsAppScreen ? 'bg-[#111b21]' : ''}">
      <button 
        onclick={() => gameState.pressPhoneHome()} 
        title="Voltar à Tela Inicial de Aplicativos"
        class="w-32 h-1.5 bg-white/70 hover:bg-white active:scale-95 rounded-full transition-all cursor-pointer shadow"
      ></button>
    </div>

  </div>
</div>
