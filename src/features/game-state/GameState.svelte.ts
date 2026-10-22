import type { DialogueNode, Choice } from '../dialogue/narrative.schema';
import type { EquippedOutfit } from '../wardrobe/wardrobe.schema';

export interface HistoryEntry {
  nodeId: string;
  speaker: string;
  speakerName?: string;
  text: string;
  location: string;
  timeOfDay: string;
  chosenOptionText?: string;
}

export interface DiaryEntry {
  id: string;
  date: string;
  ageText: string;
  title: string;
  content: string;
}

export class GameState {
  // Tema Visual do Jogo (Dark / Light)
  theme = $state<'dark' | 'light'>('dark');

  // Estado Narrativo Principal
  currentNodeId = $state<string>('node_00_despertador');
  activeChapterId = $state<string>('cap_00_prologo');
  currentLocation = $state<string>('Quarto da Protagonista');
  timeOfDay = $state<'manha' | 'tarde' | 'entardecer' | 'noite'>('manha');
  
  // Afinidade / Luvômetro (-100 a +100)
  affinity = $state<Record<string, number>>({
    dante: 0,
    lucas: 0,
    theo: 0,
    rafael: 0,
    beatriz: 0
  });

  // Flags Dinâmicas do Mundo e Escolhas (Efeito Borboleta)
  flags = $state<Record<string, boolean | number | string>>({
    capitulo_00_terminado: false
  });

  // Memórias Afetivas Coletadas (18 no total)
  unlockedMemories = $state<string[]>([]);

  // Moedas (◈ Obtidas por exploração e capítulos, 0 dinheiro real)
  coins = $state<number>(50);

  // Histórico de Falas (Rollback)
  history = $state<HistoryEntry[]>([]);

  // ================= SISTEMA DO SMARTPHONE COMPLETO =================
  isPhoneRaised = $state<boolean>(false);
  phoneActiveScreen = $state<
    'home' | 'whatsapp' | 'chat_room' | 'contacts' | 'lotusgram' | 'agenda' | 'diario' | 'email' | 'settings'
  >('home');
  activeChatTarget = $state<string>('dante');
  phoneWallpaper = $state<'cherry_sunset' | 'midnight_stars' | 'golden_lotus' | 'minimalist'>('cherry_sunset');
  unreadNotification = $state<string | null>('Nova mensagem de Dante');

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

  // Customização da Protagonista
  equippedOutfit = $state<EquippedOutfit>({
    skin_color: 'pele_clara',
    eye_color: 'olhos_castanhos',
    mouth_expression: 'boca_neutra',
    hair_front: 'cabelo_franja_onda_frente',
    hair_back: 'cabelo_longo_onda_tras',
    hair_color: '#4a2c11',
    blush: false,
    top: 'camisa_uniforme_lotus',
    bottom: 'saia_pregueada_azul',
    jacket: 'blazer_marinho',
    shoes: 'mocassim_marrom',
    socks: 'meia_3_4_branca'
  });

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

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
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
    this.history.push({
      nodeId: currentNode.id,
      speaker: currentNode.speaker,
      speakerName: currentNode.speaker_name,
      text: currentNode.text,
      location: currentNode.location,
      timeOfDay: currentNode.time_of_day,
      chosenOptionText: choice.text
    });

    if (choice.target_character && choice.affinity_delta !== 0) {
      this.modifyAffinity(choice.target_character, choice.affinity_delta);
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
}

export const gameState = new GameState();
