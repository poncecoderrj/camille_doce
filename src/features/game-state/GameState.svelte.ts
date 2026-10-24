import type { DialogueNode, Choice } from '../dialogue/narrative.schema';
import { audioManager } from '../audio/audio-manager';
import type { ProtagonistProfile } from '../personality/personality.schema';

export interface HistoryEntry {
  nodeId: string;
  speaker: string;
  speakerName?: string;
  text: string;
  location: string;
  timeOfDay: string;
  chosenOptionText?: string;
  snapshot: {
    affinity: Record<string, number>;
    flags: Record<string, boolean | number | string>;
    coins: number;
    currentOutfit: 'uniforme_lotus' | 'look_rock' | 'look_romantico' | 'look_casual_street' | 'look_academico_chic';
    unlockedMemories: string[];
    interlocutorId: string | null;
  };
}

export interface DiaryEntry {
  id: string;
  date: string;
  ageText: string;
  title: string;
  content: string;
}

export class GameState {
  // Modo de Exibição do Jogo (Menu Inicial vs. Palco Principal)
  gameMode = $state<'menu' | 'playing'>('menu');
  hasStartedGame = $state<boolean>(false);

  // Modo de Tema Visual: 'auto' (inteligente por cenário/dia/noite), 'light', 'dark'
  themeMode = $state<'auto' | 'light' | 'dark'>('auto');
  theme = $state<'dark' | 'light'>('dark');

  // Sistema de Áudio (BGM e SFX)
  musicEnabled = $state<boolean>(true);
  musicVolume = $state<number>(65); // 0 a 100
  sfxEnabled = $state<boolean>(true);
  sfxVolume = $state<number>(80);   // 0 a 100

  // Estado Narrativo Principal
  currentNodeId = $state<string>('node_00_despertador');
  activeChapterId = $state<string>('cap_00_prologo');
  currentLocation = $state<string>('Quarto da Protagonista');
  timeOfDay = $state<'manha' | 'tarde' | 'entardecer' | 'noite'>('manha');
  
  // Animação Facial em Tempo Real (Lip-Sync e Fala)
  isSpeaking = $state<boolean>(false);
  
  // Afinidade / Luvômetro (-100 a +100)
  affinity = $state<Record<string, number>>({
    dante: 0,
    lucas: 0,
    theo: 0,
    rafael: 0,
    beatriz: 0
  });

  // Interlocutor Ativo em Cena (Dante, Lucas, Theo, etc. no canto direito)
  currentInterlocutorId = $state<string | null>(null);

  // Flags Dinâmicas do Mundo e Escolhas (Efeito Borboleta)
  flags = $state<Record<string, boolean | number | string>>({
    capitulo_00_terminado: false,
    alarme_desligado: false
  });

  // Memórias Afetivas Coletadas (18 no total)
  unlockedMemories = $state<string[]>([]);

  // Moedas (◈ Obtidas por exploração e capítulos, 0 dinheiro real)
  coins = $state<number>(50);

  // Histórico de Falas (Rollback com Snapshot Completo)
  history = $state<HistoryEntry[]>([]);

  // ================= SISTEMA DO SMARTPHONE COMPLETO =================
  isPhoneRaised = $state<boolean>(false);
  phoneActiveScreen = $state<
    'home' | 'whatsapp' | 'chat_room' | 'contacts' | 'lotusgram' | 'agenda' | 'diario' | 'email' | 'settings'
  >('home');
  activeChatTarget = $state<string>('nina');
  phoneWallpaper = $state<'cherry_sunset' | 'midnight_stars' | 'golden_lotus' | 'minimalist'>('cherry_sunset');
  unreadNotification = $state<string | null>(null);

  // WhatsApp Dinâmico (Começa zerado e mensagens chegam conforme a narrativa avança)
  whatsappChats = $state<
    Record<
      string,
      Array<{
        from: 'them' | 'me';
        text?: string;
        isAudio?: boolean;
        audioDuration?: string;
        time: string;
        unread?: boolean;
      }>
    >
  >({});
  whatsappPendingReplies = $state<Record<string, Array<{ id: string; text: string; toneTag: string; affinityBoy?: string; affinityDelta?: number; reactionReply?: string }>>>({});
  whatsappTyping = $state<Record<string, boolean>>({});
  customChatReplies = $state<
    Record<
      string,
      Array<{
        from: 'them' | 'me';
        text?: string;
        isAudio?: boolean;
        audioDuration?: string;
        time: string;
        unread?: boolean;
      }>
    >
  >({});

  // Recursos de Hardware do Celular para Enredos
  isFlashlightOn = $state<boolean>(false);
  isHotspotOn = $state<boolean>(false);
  
  // LótusCloud & Backup
  isCloudBackupActive = $state<boolean>(true);
  lastBackupTimestamp = $state<string>('Hoje, 07:40');

  // Diário Pessoal (Notas escritas pelo jogador ao longo de 10 anos)
  playerDiaryNotes = $state<DiaryEntry[]>([
    {
      id: 'nota_01',
      date: '22 de Outubro',
      ageText: '15 anos • Primeiro Dia',
      title: 'Chegada na Lótus',
      content: 'Acordei com o coração acelerado. Um colégio gigante, portões pesados e pessoas que parecem segurar o mundo nas mãos. Espero não me perder...'
    }
  ]);

  // Visual Oficial da Protagonista (Look / Roupa Única - sem camadas duplicadas)
  currentOutfit = $state<'uniforme_lotus' | 'look_rock' | 'look_romantico' | 'look_casual_street' | 'look_academico_chic'>('uniforme_lotus');
  isWardrobeOpen = $state<boolean>(false);

  // Perfil de Personalidade (Signo, 3 a 5 Traços The Sims e Aspiração de 10 Anos)
  protagonistProfile = $state<ProtagonistProfile>({
    name: '',
    zodiac: 'libra',
    traits: [],
    aspiration: 'romancista'
  });

  setZodiac(zodiac: any) {
    this.protagonistProfile.zodiac = zodiac;
  }

  setAspiration(aspiration: string) {
    this.protagonistProfile.aspiration = aspiration;
  }

  toggleTrait(traitId: string): boolean {
    const idx = this.protagonistProfile.traits.indexOf(traitId);
    if (idx >= 0) {
      this.protagonistProfile.traits.splice(idx, 1);
      return true;
    } else {
      if (this.protagonistProfile.traits.length < 5) {
        this.protagonistProfile.traits.push(traitId);
        return true;
      }
      return false;
    }
  }

  hasTrait(traitId: string): boolean {
    return this.protagonistProfile.traits.includes(traitId);
  }

  setOutfit(outfitId: 'uniforme_lotus' | 'look_rock' | 'look_romantico' | 'look_casual_street' | 'look_academico_chic') {
    this.currentOutfit = outfitId;
  }

  get equippedOutfit() {
    return { outfit_id: this.currentOutfit };
  }
  set equippedOutfit(val: any) {
    if (val && val.outfit_id) {
      this.currentOutfit = val.outfit_id;
    }
  }

  // Configurações
  textSpeed = $state<number>(35);
  isDyslexiaFont = $state<boolean>(false);
  fontSize = $state<'normal' | 'grande' | 'extra'>('normal');
  isMuted = $state<boolean>(false);

  // Ações do Celular
  togglePhone() {
    this.isPhoneRaised = !this.isPhoneRaised;
    if (this.isPhoneRaised) {
      // Se houver contato com respostas pendentes ou mensagens não lidas, abre diretamente no chat dele!
      const pendingContacts = Object.keys(this.whatsappPendingReplies);
      if (pendingContacts.length > 0) {
        this.activeChatTarget = pendingContacts[0];
        this.phoneActiveScreen = 'chat_room';
      } else {
        const unreadContact = Object.keys(this.whatsappChats).find(cid => 
          this.whatsappChats[cid].some(m => m.unread)
        );
        if (unreadContact) {
          this.activeChatTarget = unreadContact;
          this.phoneActiveScreen = 'chat_room';
        }
      }
      if (this.unreadNotification) {
        this.unreadNotification = null;
      }
    }
  }

  openPhoneApp(
    app: 'whatsapp' | 'chat_room' | 'contacts' | 'lotusgram' | 'agenda' | 'diario' | 'email' | 'settings',
    target?: string
  ) {
    this.phoneActiveScreen = app;
    if (target) this.activeChatTarget = target;
  }

  pressPhoneHome() {
    if (this.phoneActiveScreen === 'chat_room') {
      this.phoneActiveScreen = 'whatsapp';
    } else {
      this.phoneActiveScreen = 'home';
    }
  }

  // Interação do celular: Desligar Alarme
  dismissAlarm() {
    this.flags.alarme_desligado = true;
    audioManager.playClick();
  }

  // Notificação: Ignorar / Fechar notificação de WhatsApp
  dismissWhatsAppNotification() {
    this.unreadNotification = null;
    audioManager.playClick();
  }

  // Receber Mensagem no WhatsApp (disparado pela narrativa conforme o jogo avança)
  receiveWhatsAppMessage(contactId: string, text: string, options?: {
    isAudio?: boolean;
    audioDuration?: string;
    preview?: string;
    time?: string;
    replies?: Array<{
      id: string;
      text: string;
      toneTag: string;
      affinityBoy?: string;
      affinityDelta?: number;
      reactionReply?: string;
    }>;
  }) {
    if (!this.whatsappChats[contactId]) {
      this.whatsappChats[contactId] = [];
    }
    const now = new Date();
    const time = options?.time || `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    this.whatsappChats[contactId].push({
      from: 'them',
      text,
      isAudio: options?.isAudio,
      audioDuration: options?.audioDuration,
      time,
      unread: true
    });
    if (options?.replies && options.replies.length > 0) {
      this.whatsappPendingReplies[contactId] = options.replies;
    }
    this.activeChatTarget = contactId;
    this.phoneActiveScreen = 'chat_room';
    this.unreadNotification = options?.preview || text;
    audioManager.playNotification();
    // Quando mandam mensagem, o celular aparece na tela já aberto na conversa
    this.isPhoneRaised = true;

    // Remove a notificação do topo suavemente após 4s
    setTimeout(() => {
      if (this.unreadNotification === (options?.preview || text)) {
        this.unreadNotification = null;
      }
    }, 4000);
  }

  // Responder no WhatsApp com Escolhas Narrativas e Afinidade
  sendWhatsAppReply(contactId: string, reply: {
    id: string;
    text: string;
    toneTag?: string;
    affinityBoy?: string;
    affinityDelta?: number;
    reactionReply?: string;
  }) {
    if (!this.whatsappChats[contactId]) {
      this.whatsappChats[contactId] = [];
    }

    // Marca as mensagens deste contato como lidas agora que o jogador interagiu/respondeu
    this.whatsappChats[contactId].forEach(m => { m.unread = false; });

    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    this.whatsappChats[contactId].push({
      from: 'me',
      text: reply.text,
      time,
      unread: false
    });

    if (reply.affinityBoy && reply.affinityDelta) {
      this.modifyAffinity(reply.affinityBoy, reply.affinityDelta);
    }

    delete this.whatsappPendingReplies[contactId];
    this.flags[`zap_respondido_${contactId}`] = true;

    // Resposta simulada subsequente do contato
    if (reply.reactionReply) {
      this.whatsappTyping[contactId] = true;
      setTimeout(() => {
        this.whatsappTyping[contactId] = false;
        const replyNow = new Date();
        const replyTime = `${String(replyNow.getHours()).padStart(2, '0')}:${String(replyNow.getMinutes()).padStart(2, '0')}`;
        this.whatsappChats[contactId]?.push({
          from: 'them',
          text: reply.reactionReply!,
          time: replyTime,
          unread: false
        });
        audioManager.playNotification();

        // Se o personagem não for falar mais nada e não houver mais opções a responder:
        // O jogador lê a resposta e o telefone é guardado automaticamente
        setTimeout(() => {
          const hasMore = (this.whatsappPendingReplies[contactId] || []).length > 0;
          if (!hasMore && this.isPhoneRaised && this.phoneActiveScreen === 'chat_room') {
            this.isPhoneRaised = false;
          }
        }, 2800);
      }, 1400);
    } else {
      // Se não houver reação adicional do NPC, guarda o telefone após breve leitura
      setTimeout(() => {
        const hasMore = (this.whatsappPendingReplies[contactId] || []).length > 0;
        if (!hasMore && this.isPhoneRaised && this.phoneActiveScreen === 'chat_room') {
          this.isPhoneRaised = false;
        }
      }, 1600);
    }

    if (this.unreadNotification) {
      this.unreadNotification = null;
    }
    audioManager.playChoice();
  }

  // Jogadora ignorou a mensagem no celular e preferiu continuar clicando nas ações da história
  ignoreWhatsAppMessage(contactId: string) {
    // 1. Fecha o celular se estiver levantado na tela
    this.isPhoneRaised = false;

    // 2. Remove as respostas pendentes deste contato
    delete this.whatsappPendingReplies[contactId];

    // 3. Marca mensagens anteriores do chat como lidas (dois traços azuis - o contato vê que ela visualizou)
    if (this.whatsappChats[contactId]) {
      this.whatsappChats[contactId].forEach(m => { m.unread = false; });
    }

    // 4. Dispara os gatilhos no estado do jogo (flags para o enredo e relacionamentos)
    this.flags[`zap_ignorado_${contactId}`] = true;
    this.flags[`ignorou_zap_${contactId}`] = true;
    this.flags[`deixou_no_vacuo_${contactId}`] = true;

    // 5. A NPC percebe o vácuo/visualização sem resposta e reage em tempo real no WhatsApp
    let reactionText = '';
    let previewTitle = '';

    if (contactId === 'nina') {
      previewTitle = 'Nina';
      if (this.currentNodeId.includes('portao') || this.currentNodeId.includes('node_01')) {
        reactionText = 'Visualizou e não me respondeu de novo? 🤡 Já vi que tá com a cabeça na lua aí nos portões... te acho lá dentro!';
      } else {
        reactionText = 'Ué, visualizou e me deixou no vácuo amiga? 🤡 Ficou sem bateria ou tá nervosa pro primeiro dia? Kkkk te vejo no colégio então!';
      }
    } else if (contactId === 'lucas') {
      previewTitle = 'Lucas';
      reactionText = 'Constato ciência da notificação sem manifestação formal de resposta. O Grêmio manterá os registros arquivados.';
    } else if (contactId === 'dante') {
      previewTitle = 'Dante';
      reactionText = 'Visualizou e nada. Beleza então 🎸';
    } else {
      previewTitle = 'WhatsApp';
      reactionText = 'Visualizou e não respondeu... enfim, depois a gente se fala.';
    }

    // Dispara a reação da NPC após breve delay para dar realismo à percepção do vácuo
    setTimeout(() => {
      this.whatsappTyping[contactId] = true;
      setTimeout(() => {
        this.whatsappTyping[contactId] = false;
        if (!this.whatsappChats[contactId]) {
          this.whatsappChats[contactId] = [];
        }
        const replyNow = new Date();
        const replyTime = `${String(replyNow.getHours()).padStart(2, '0')}:${String(replyNow.getMinutes()).padStart(2, '0')}`;
        this.whatsappChats[contactId].push({
          from: 'them',
          text: reactionText,
          time: replyTime,
          unread: true
        });

        // Notificação de alerta com efeito sonoro
        this.unreadNotification = `${previewTitle}: ${reactionText}`;
        audioManager.playNotification();

        setTimeout(() => {
          if (this.unreadNotification?.includes(reactionText)) {
            this.unreadNotification = null;
          }
        }, 4500);
      }, 1500);
    }, 900);
  }

  // Interação genérica legado mantida para compatibilidade
  sendChatMessage(contactId: string, text: string) {
    if (!this.whatsappChats[contactId]) {
      this.whatsappChats[contactId] = [];
    }
    this.whatsappChats[contactId].forEach(m => { m.unread = false; });
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    this.whatsappChats[contactId].push({
      from: 'me',
      text,
      time,
      unread: false
    });
    this.flags[`respondeu_zap_${contactId}`] = true;
    if (this.unreadNotification && this.unreadNotification.toLowerCase().includes(contactId)) {
      this.unreadNotification = null;
    }
    audioManager.playChoice();
  }

  // ================= TRANSIÇÕES DE ESTADO DO JOGO =================
  startNewGame() {
    this.currentNodeId = 'node_00_despertador';
    this.currentLocation = 'Quarto da Protagonista';
    this.timeOfDay = 'manha';
    this.history = [];
    this.affinity = { dante: 0, lucas: 0, theo: 0, rafael: 0, beatriz: 0 };
    this.flags = { capitulo_00_terminado: false, alarme_desligado: false };
    this.currentInterlocutorId = null;
    this.gameMode = 'playing';
    this.hasStartedGame = true;

    // O celular começa totalmente zerado (sem notificações prévias nem mensagens fantasmas)
    this.unreadNotification = null;
    this.whatsappChats = {};
    this.whatsappPendingReplies = {};
    this.whatsappTyping = {};
    this.customChatReplies = {};
    this.activeChatTarget = 'nina';

    audioManager.playBell();
    if (this.musicEnabled) {
      audioManager.startAmbientMusic();
    }
  }

  continueGame() {
    this.gameMode = 'playing';
    this.hasStartedGame = true;
    audioManager.playClick();
    if (this.musicEnabled) {
      audioManager.startAmbientMusic();
    }
  }

  returnToMenu() {
    this.gameMode = 'menu';
    audioManager.playClick();
  }

  // ================= CONTROLES DE ÁUDIO =================
  setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    audioManager.updateSettings({ musicEnabled: enabled });
  }

  setMusicVolume(vol: number) {
    this.musicVolume = vol;
    audioManager.updateSettings({ musicVolume: vol });
  }

  setSfxEnabled(enabled: boolean) {
    this.sfxEnabled = enabled;
    audioManager.updateSettings({ sfxEnabled: enabled });
  }

  setSfxVolume(vol: number) {
    this.sfxVolume = vol;
    audioManager.updateSettings({ sfxVolume: vol });
  }

  toggleTheme() {
    if (this.themeMode === 'auto') {
      this.themeMode = 'light';
      this.theme = 'light';
    } else if (this.themeMode === 'light') {
      this.themeMode = 'dark';
      this.theme = 'dark';
    } else {
      this.themeMode = 'auto';
    }
    audioManager.playClick();
  }

  toggleFlashlight() {
    this.isFlashlightOn = !this.isFlashlightOn;
  }

  toggleHotspot() {
    this.isHotspotOn = !this.isHotspotOn;
  }

  triggerCloudBackup() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    this.lastBackupTimestamp = `Hoje às ${hours}:${minutes}`;
    this.isCloudBackupActive = true;
  }

  addDiaryNote(title: string, content: string) {
    if (!title.trim() || !content.trim()) return;
    this.playerDiaryNotes.unshift({
      id: `nota_${Date.now()}`,
      date: '22 de Outubro',
      ageText: '15 anos • Adolescência',
      title,
      content
    });
  }

  // Ações do Guarda-Roupa / Provador
  openWardrobe() {
    this.isWardrobeOpen = true;
  }

  closeWardrobe() {
    this.isWardrobeOpen = false;
  }

  toggleWardrobe() {
    this.isWardrobeOpen = !this.isWardrobeOpen;
  }

  equipPiece(category: string, itemId?: string) {
    (this.equippedOutfit as any)[category] = itemId;
  }

  applyPreset(presetPieces: Record<string, any>) {
    this.equippedOutfit = {
      ...this.equippedOutfit,
      ...presetPieces
    };
  }

  // Modificadores de Afinidade
  modifyAffinity(charId: string, delta: number) {
    if (this.affinity[charId] !== undefined) {
      const current = this.affinity[charId];
      const next = Math.max(-100, Math.min(100, current + delta));
      this.affinity[charId] = next;
    }
  }

  getAffinityTier(score: number): { name: string; color: string; desc: string } {
    if (score <= -31) return { name: 'Hostil', color: '#ef4444', desc: 'Respostas curtas e ríspidas' };
    if (score <= -1) return { name: 'Distante', color: '#f97316', desc: 'Tratamento puramente formal' };
    if (score <= 29) return { name: 'Amizade', color: '#3b82f6', desc: 'Colegas com diálogo liberado' };
    if (score <= 59) return { name: 'Afeição', color: '#8b5cf6', desc: 'Provocações e proximidade sincera' };
    if (score <= 84) return { name: 'Paixão', color: '#ec4899', desc: 'Eventos exclusivos e atenção constante' };
    return { name: 'Confiança Plena', color: '#e11d48', desc: 'Caminho aberto para a confissão' };
  }

  applyChoice(choice: Choice, currentNode: DialogueNode) {
    // Se a jogadora continuar clicando nas ações da história sem responder o telefone:
    // 1. O celular é fechado automaticamente
    if (this.isPhoneRaised) {
      this.isPhoneRaised = false;
    }
    // 2. Considera que ela ignorou a mensagem pendente e dispara os gatilhos da NPC
    const pendingContacts = Object.keys(this.whatsappPendingReplies);
    if (pendingContacts.length > 0) {
      for (const contactId of pendingContacts) {
        this.ignoreWhatsAppMessage(contactId);
      }
    }

    // Salva o snapshot completo no histórico para permitir rollback perfeito
    this.history.push({
      nodeId: currentNode.id,
      speaker: currentNode.speaker,
      speakerName: currentNode.speaker_name,
      text: currentNode.text,
      location: currentNode.location,
      timeOfDay: currentNode.time_of_day,
      chosenOptionText: choice.text,
      snapshot: {
        affinity: { ...this.affinity },
        flags: { ...this.flags },
        coins: this.coins,
        currentOutfit: this.currentOutfit,
        unlockedMemories: [...this.unlockedMemories],
        interlocutorId: this.currentInterlocutorId
      }
    });

    if (choice.target_character && choice.affinity_delta !== 0) {
      this.modifyAffinity(choice.target_character, choice.affinity_delta);
      this.currentInterlocutorId = choice.target_character;
    }

    if (choice.set_flags) {
      for (const [key, val] of Object.entries(choice.set_flags)) {
        this.flags[key] = val as string | number | boolean;
      }
    }

    if (choice.unlock_memory_tag && !this.unlockedMemories.includes(choice.unlock_memory_tag)) {
      this.unlockedMemories.push(choice.unlock_memory_tag);
    }

    this.currentNodeId = choice.next_node_id;

    // Disparadores Naturais de Mensagens durante a Progressão Narrativa
    if (this.currentNodeId === 'node_00_mochila' && !this.flags.msg_nina_mochila_enviada) {
      this.flags.msg_nina_mochila_enviada = true;
      this.receiveWhatsAppMessage('nina', 'Amigaaa! Já tá de pé? Hoje é o nosso primeiro dia na Lótus! Não vai se atrasar hein 🎒', {
        preview: 'Nina: Amigaaa! Já tá de pé?',
        time: '07:05',
        replies: [
          {
            id: 'r_nina_1',
            text: 'Já tô de pé! Nem me fale, o coração tá saindo pela boca 😅',
            toneTag: 'Sincera',
            reactionReply: 'Kkkk normal! Relaxa que vamos arrasar juntas!'
          },
          {
            id: 'r_nina_2',
            text: 'Mais cinco minutinhos na cama não matam ninguém 🥱',
            toneTag: 'Descontraída',
            reactionReply: 'Acorda, dorminhoca! O sinal do colégio não espera!'
          },
          {
            id: 'r_nina_3',
            text: 'Tô saindo de casa agora. Te vejo na entrada da escola!',
            toneTag: 'Direta',
            reactionReply: 'Fechado! Me espera no portão das cerejeiras!'
          }
        ]
      });
    } else if (this.currentNodeId === 'node_01_portao' && !this.flags.msg_nina_portao_enviada) {
      this.flags.msg_nina_portao_enviada = true;
      const textNina = this.flags.zap_ignorado_nina
        ? 'Já que você me deixou no vácuo mais cedo no quarto, vê se não me ignora agora hein 😅! Tô vendo a torre de longe, me espera nas cerejeiras!'
        : 'Tô vendo a torre do relógio de longe! Você já chegou nos portões? Me espera perto das cerejeiras!';
      const previewNina = this.flags.zap_ignorado_nina
        ? 'Nina: Vê se não me ignora agora hein!'
        : 'Nina: Você já chegou nos portões?';

      this.receiveWhatsAppMessage('nina', textNina, {
        preview: previewNina,
        time: '07:42',
        replies: [
          {
            id: 'r_nina_portao_1',
            text: 'Acabei de passar pelos portões. O colégio é gigante e lindo!',
            toneTag: 'Empolgada',
            reactionReply: 'É surreal né? Já tô descendo do ônibus!'
          },
          {
            id: 'r_nina_portao_2',
            text: 'Tô aqui na entrada, respirando fundo antes de dar o primeiro passo...',
            toneTag: 'Cuidadosa',
            reactionReply: 'Respira e entra com tudo amiga!'
          }
        ]
      });
    } else if ((this.currentNodeId === 'node_05_atrio' || this.currentNodeId === 'node_06_encontro_lucas') && !this.flags.msg_lucas_atrio_enviada) {
      this.flags.msg_lucas_atrio_enviada = true;
      this.receiveWhatsAppMessage('lucas', 'Prezada aluna, o Grêmio Estudantil informa que sua guia de transferência provisória foi autenticada no sistema.', {
        preview: 'Lucas: Sua guia de transferência foi autenticada.',
        time: '07:50',
        replies: [
          {
            id: 'r_lucas_1',
            text: 'Muito obrigada pelo aviso, Lucas. Protocolo anotado.',
            toneTag: 'Educada & Formal',
            affinityBoy: 'lucas',
            affinityDelta: 5,
            reactionReply: 'Por nada. Qualquer dúvida sobre os armários, procure o conselho.'
          },
          {
            id: 'r_lucas_2',
            text: 'Obrigada! Vocês do grêmio são bem rápidos e pontuais.',
            toneTag: 'Gentil',
            affinityBoy: 'lucas',
            affinityDelta: 4,
            reactionReply: 'A eficiência é a marca da Academia Lótus.'
          }
        ]
      });
    } else if (this.currentNodeId === 'c1_node_04_helena_chegada' && !this.flags.msg_nina_aula_enviada) {
      this.flags.msg_nina_aula_enviada = true;
      this.receiveWhatsAppMessage('nina', 'Menina do céu... a Profª Helena é o cão chupando manga kkk! 😱 Esconde o celular!', {
        preview: 'Nina: A Profª Helena é o cão chupando manga!',
        time: '08:22',
        replies: [
          {
            id: 'r_nina_aula_1',
            text: 'Tô congelada aqui! Não manda nada senão ela confisca meu celular kkk!',
            toneTag: 'Cautelosa',
            reactionReply: 'Kkkk guardei! Presta atenção no sermão dela!'
          },
          {
            id: 'r_nina_aula_2',
            text: 'Achei ela imponente e elegante. Dá medo mas impõe respeito.',
            toneTag: 'Analítica',
            reactionReply: 'Pois é, ela bota ordem em tudo por aqui.'
          }
        ]
      });
    } else if (this.currentNodeId === 'c2_node_04_noite_quarto' && !this.flags.msg_convite_noite_enviada) {
      this.flags.msg_convite_noite_enviada = true;
      if (this.flags.clube_escolhido === 'musica' || this.flags.escolheu_carteira_dante) {
        this.receiveWhatsAppMessage('dante', 'Tô tirando a intro nova aqui no quarto. O Caio falou que você curtiu o som. Se quiser ouvir amanhã antes de todo mundo, desce aí no subsolo.', {
          preview: 'Dante: Tô tirando a intro nova aqui no quarto...',
          time: '21:30',
          replies: [
            {
              id: 'r_dante_noite_1',
              text: 'Com certeza! Adorei a pegada da música de vocês.',
              toneTag: 'Empolgada',
              affinityBoy: 'dante',
              affinityDelta: 6,
              reactionReply: 'Fechado então. Guarda segredo dos outros por enquanto 🎸'
            },
            {
              id: 'r_dante_noite_2',
              text: 'Se você não for fazer barulho demais pra me deixar surda, eu apareço!',
              toneTag: 'Provocadora',
              affinityBoy: 'dante',
              affinityDelta: 5,
              reactionReply: 'Hahaha engraçadinha. Vou preparar um acústico especial pra você então.'
            }
          ]
        });
      } else if (this.flags.clube_escolhido === 'gremio' || this.flags.escolheu_carteira_lucas) {
        this.receiveWhatsAppMessage('lucas', 'Boa noite. O Grêmio está concluindo a vistoria dos pavilhões do Festival. Gostaria de convidá-la formalmente para me acompanhar amanhã na inspeção.', {
          preview: 'Lucas: Gostaria de convidá-la formalmente...',
          time: '21:35',
          replies: [
            {
              id: 'r_lucas_noite_1',
              text: 'Será uma honra, Lucas. Conta comigo.',
              toneTag: 'Formal & Gentil',
              affinityBoy: 'lucas',
              affinityDelta: 6,
              reactionReply: 'Excelente. Sua presença tornará os trabalhos muito mais agradáveis.'
            },
            {
              id: 'r_lucas_noite_2',
              text: 'Espero que sobre um tempinho pra gente comer um doce no festival também!',
              toneTag: 'Espontânea',
              affinityBoy: 'lucas',
              affinityDelta: 5,
              reactionReply: 'Certamente. Posso agendar um intervalo para o pavilhão das lanternas.'
            }
          ]
        });
      } else {
        this.receiveWhatsAppMessage('theo', 'Oi... desculpe o horário. Guardei uma flor de lótus rara que desabrochou na estufa hoje... lembrei de você quando ela abriu. Se quiser ver amanhã...', {
          preview: 'Theo: Guardei uma flor de lótus rara...',
          time: '21:40',
          replies: [
            {
              id: 'r_theo_noite_1',
              text: 'Que gesto mais lindo, Theo! Guarde com carinho que amanhã vou correndo ver.',
              toneTag: 'Carinhosa',
              affinityBoy: 'theo',
              affinityDelta: 6,
              reactionReply: 'Vou colocar em água fresca agora mesmo... Tenha uma noite linda 🌸'
            },
            {
              id: 'r_theo_noite_2',
              text: 'Você sempre repara nas belezas mais delicadas. Muito obrigada pelo carinho.',
              toneTag: 'Sensível',
              affinityBoy: 'theo',
              affinityDelta: 5,
              reactionReply: 'Obrigado por enxergar o mundo comigo... Durma bem.'
            }
          ]
        });
      }
    }
  }

  // ================= SISTEMA DE VOLTAR / DESFAZER ESCOLHA (ROLLBACK) =================
  rollbackPreviousNode(): boolean {
    if (this.history.length === 0) return false;
    const lastEntry = this.history.pop();
    if (!lastEntry) return false;

    // Restaura o nó e o cenário anteriores
    this.currentNodeId = lastEntry.nodeId;
    this.currentLocation = lastEntry.location;
    this.timeOfDay = lastEntry.timeOfDay as any;

    // Restaura o estado anterior (afinidade, flags, moedas, etc)
    if (lastEntry.snapshot) {
      this.affinity = { ...lastEntry.snapshot.affinity };
      this.flags = { ...lastEntry.snapshot.flags };
      this.coins = lastEntry.snapshot.coins;
      this.currentOutfit = lastEntry.snapshot.currentOutfit;
      this.unlockedMemories = [...lastEntry.snapshot.unlockedMemories];
      this.currentInterlocutorId = lastEntry.snapshot.interlocutorId;
    }

    audioManager.playClick();
    return true;
  }
}

export const gameState = new GameState();
