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
    currentOutfit: 'uniforme_lotus' | 'look_rock' | 'look_romantico';
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
  activeChatTarget = $state<string>('dante');
  phoneWallpaper = $state<'cherry_sunset' | 'midnight_stars' | 'golden_lotus' | 'minimalist'>('cherry_sunset');
  unreadNotification = $state<string | null>('Nova mensagem de Dante');

  // Respostas Interativas Enviadas pelo Jogador no WhatsApp
  customChatReplies = $state<Record<string, Array<{ from: 'them' | 'me'; text?: string; isAudio?: boolean; audioDuration?: string; time: string }>>>({});

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
  currentOutfit = $state<'uniforme_lotus' | 'look_rock' | 'look_romantico'>('uniforme_lotus');
  isWardrobeOpen = $state<boolean>(false);

  // Perfil de Personalidade (Signo, 5 Traços The Sims e Aspiração de 10 Anos)
  protagonistProfile = $state<ProtagonistProfile>({
    name: 'Íris',
    zodiac: 'libra',
    traits: [
      'romantica_incuravel',
      'curiosa_insaciavel',
      'intuitiva_astuta',
      'sarcastica_ironica',
      'criativa_sonhadora'
    ],
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
      if (this.protagonistProfile.traits.length > 1) {
        this.protagonistProfile.traits.splice(idx, 1);
        return true;
      }
      return false;
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

  setOutfit(outfitId: 'uniforme_lotus' | 'look_rock' | 'look_romantico') {
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
    if (this.isPhoneRaised && this.unreadNotification) {
      this.unreadNotification = null;
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

  // Interação obrigatória do celular: Desligar Alarme
  dismissAlarm() {
    this.flags.alarme_desligado = true;
    audioManager.playClick();
  }

  // Interação obrigatória do celular: Responder mensagem no WhatsApp
  sendChatMessage(contactId: string, text: string) {
    if (!this.customChatReplies[contactId]) {
      this.customChatReplies[contactId] = [];
    }
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    this.customChatReplies[contactId].push({
      from: 'me',
      text,
      time
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
        this.flags[key] = val;
      }
    }

    if (choice.unlock_memory_tag && !this.unlockedMemories.includes(choice.unlock_memory_tag)) {
      this.unlockedMemories.push(choice.unlock_memory_tag);
    }

    this.currentNodeId = choice.next_node_id;
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
