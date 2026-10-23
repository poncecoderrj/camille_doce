/**
 * Gerenciador de Áudio com Web Audio API Procedural e Suporte a Arquivos de Áudio
 * Proporciona música ambiente procedural de piano/celesta (estilo Visual Novel)
 * sem dependência de arquivos externos pesados, além de efeitos sonoros táteis.
 */

export interface AudioSettings {
  musicEnabled: boolean;
  musicVolume: number; // 0 a 100
  sfxEnabled: boolean;
  sfxVolume: number;   // 0 a 100
}

class AudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;

  private isMusicPlaying = false;
  private musicTimer: any = null;
  private currentTrackNoteIndex = 0;

  // Configurações ativas
  private settings: AudioSettings = {
    musicEnabled: true,
    musicVolume: 65,
    sfxEnabled: true,
    sfxVolume: 80
  };

  constructor() {
    // Inicialização atrasada para obedecer políticas de autoplay do navegador
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 1.0;
        this.masterGain.connect(this.ctx.destination);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.value = this.settings.musicEnabled 
          ? (this.settings.musicVolume / 100) * 0.45 
          : 0;
        this.musicGain.connect(this.masterGain);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.value = this.settings.sfxEnabled 
          ? (this.settings.sfxVolume / 100) * 0.6 
          : 0;
        this.sfxGain.connect(this.masterGain);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Atualiza as configurações de áudio (volumes e estados)
   */
  public updateSettings(newSettings: Partial<AudioSettings>) {
    this.settings = { ...this.settings, ...newSettings };

    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    if (this.musicGain) {
      const targetMusic = this.settings.musicEnabled 
        ? (this.settings.musicVolume / 100) * 0.45 
        : 0;
      this.musicGain.gain.cancelScheduledValues(now);
      this.musicGain.gain.linearRampToValueAtTime(targetMusic, now + 0.15);
    }

    if (this.sfxGain) {
      const targetSfx = this.settings.sfxEnabled 
        ? (this.settings.sfxVolume / 100) * 0.6 
        : 0;
      this.sfxGain.gain.cancelScheduledValues(now);
      this.sfxGain.gain.linearRampToValueAtTime(targetSfx, now + 0.15);
    }

    if (this.settings.musicEnabled && !this.isMusicPlaying) {
      this.startAmbientMusic();
    } else if (!this.settings.musicEnabled && this.isMusicPlaying) {
      this.stopAmbientMusic();
    }
  }

  public getSettings(): AudioSettings {
    return { ...this.settings };
  }

  /**
   * Inicia a melodia ambiente relaxante de Visual Novel (Acordes de Piano/Celesta)
   */
  public startAmbientMusic() {
    this.initContext();
    if (!this.ctx || !this.musicGain || this.isMusicPlaying || !this.settings.musicEnabled) return;

    this.isMusicPlaying = true;

    // Progressão harmônica nostálgica de colégio: Cmaj7 -> Am9 -> Fmaj7 -> Gsus4
    const chords: number[][] = [
      // Cmaj7 (C4, E4, G4, B4)
      [261.63, 329.63, 392.00, 493.88],
      // Am9 (A3, C4, E4, B4)
      [220.00, 261.63, 329.63, 493.88],
      // Fmaj7 (F3, A3, C4, E4)
      [174.61, 220.00, 261.63, 329.63],
      // Gsus4 -> G (G3, C4, D4, G4)
      [196.00, 261.63, 293.66, 392.00]
    ];

    let chordIdx = 0;
    let arpeggioStep = 0;

    const tick = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.musicGain) return;

      const currentChord = chords[chordIdx];
      const freq = currentChord[arpeggioStep % currentChord.length];

      this.playPluckNote(freq, 2.8);

      arpeggioStep++;
      if (arpeggioStep >= 4) {
        arpeggioStep = 0;
        chordIdx = (chordIdx + 1) % chords.length;
      }

      // Intervalo entre notas do arpejo (calmo e espaçado)
      this.musicTimer = setTimeout(tick, 920);
    };

    tick();
  }

  public stopAmbientMusic() {
    this.isMusicPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  /**
   * Sintetizador de nota suave estilo celesta/caixa de música
   */
  private playPluckNote(freq: number, duration: number) {
    if (!this.ctx || !this.musicGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Filtro passa-baixa para timbre aveludado e orgânico
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    // Onda combinada senoidal com harmônico quente
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Envelope de amplitude ADSR suave
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.08); // Ataque suave
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration); // Decaimento longo

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  // ================= EFEITOS SONOROS (SFX) =================

  /**
   * Efeito Sonoro: Clique de botão / interface
   */
  public playClick() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || !this.settings.sfxEnabled) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(750, now);
    osc.frequency.exponentialRampToValueAtTime(350, now + 0.05);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Efeito Sonoro: Confirmação / Escolha Narrativa / Afeto
   */
  public playChoice() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || !this.settings.sfxEnabled) return;

    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const startTime = now + idx * 0.07;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.22, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.55);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(startTime);
      osc.stop(startTime + 0.55);
    });
  }

  /**
   * Efeito Sonoro: O Sino Escolar da Academia Lótus ("Entre Sinos")
   */
  public playBell() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || !this.settings.sfxEnabled) return;

    const bellNotes = [659.25, 523.25, 587.33, 392.00]; // E5, C5, D5, G4 (Westminster Quarters)
    const now = this.ctx.currentTime;

    bellNotes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();
      const startTime = now + idx * 0.45;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq, startTime);
      filter.Q.setValueAtTime(3.0, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(startTime);
      osc.stop(startTime + 1.6);
    });
  }

  /**
   * Efeito Sonoro: Notificação de Mensagem no Celular
   */
  public playNotification() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || !this.settings.sfxEnabled) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1320, now + 0.09);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.sfxGain);

    osc1.start(now);
    osc1.stop(now + 0.09);
    osc2.start(now + 0.09);
    osc2.stop(now + 0.35);
  }
}

export const audioManager = new AudioManager();
