/**
 * Pure Web Audio API Soundscape & Traditional Japanese Music Generator
 * Generates an organic, rich ambient sound layer:
 * - Traditional Japanese Koto (箏) acoustic plucks and gentle pitch-bends
 * - Meditative Shakuhachi (尺八) bamboo flute air swells & gentle vibrato
 * - Rice straw tatami rustle & soft shuffling footwork
 * - Deep meditative Kokyu breathing cycle (synchronized with slow-motion speed)
 * - Distant Kaniv ambient nature (Dnieper river wind, evening hill crickets)
 * - Harmonious traditional Japanese Zen melodies (Insen & Hirajoshi scales)
 * 
 * Automatically creates the desired atmosphere of peace, serenity, and harmony.
 */

export interface SoundLayerVolumes {
  master: number;         // 0.0 - 1.0
  tatami: number;         // 0.0 - 1.0
  breath: number;         // 0.0 - 1.0
  kanivNature: number;    // 0.0 - 1.0
  japaneseMusic: number;  // 0.0 - 1.0
}

class DojoSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private fadeGain: GainNode | null = null; // for smooth auto-play fade in / out
  
  // Layer gain nodes
  private tatamiGain: GainNode | null = null;
  private breathGainNode: GainNode | null = null;
  private kanivWindGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private musicGain: GainNode | null = null;

  // Active state
  private isMuted: boolean = false;
  private isPlayingVideo: boolean = false;
  private userVolume: number = 0.65;
  private currentSpeed: number = 1.0;

  // Oscillators & sources
  private windFilter: BiquadFilterNode | null = null;
  private breathFilter: BiquadFilterNode | null = null;
  private breathTimer: number | null = null;
  private tatamiTimer: number | null = null;
  private cricketsTimer: number | null = null;
  private ambientMusicTimer: number | null = null;

  // Layer volume preferences
  private layerLevels: SoundLayerVolumes = {
    master: 0.65,
    tatami: 0.70,
    breath: 0.75,
    kanivNature: 0.65,
    japaneseMusic: 0.85,
  };

  private listeners: Set<(muted: boolean, volume: number) => void> = new Set();

  public subscribe(fn: (muted: boolean, volume: number) => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isMuted, this.userVolume));
  }

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output node
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0.0001 : this.userVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Playback fade gate node (for smooth fade in/out on play/pause)
      this.fadeGain = this.ctx.createGain();
      this.fadeGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.fadeGain.connect(this.masterGain);

      // Setup Individual Audio Layers
      this.initJapaneseMusicLayer();
      this.initKanivNatureLayer();
      this.initBreathLayer();
      this.initTatamiLayer();
      this.initWoodenDojoDrone();
    } catch (err) {
      console.warn('Web Audio initialization deferred until user interaction:', err);
    }
  }

  /**
   * Layer: Traditional Japanese Music (Koto 箏 & Shakuhachi 尺八)
   * Deep, spacious, and meditative Zen harmonies (Insen & Hirajoshi modes)
   * with long resonant decays, breathy flute swells, and expansive temple acoustics.
   */
  private initJapaneseMusicLayer() {
    if (!this.ctx || !this.fadeGain) return;

    // Music master gain
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(this.layerLevels.japaneseMusic, this.ctx.currentTime);

    // Spacious Temple Reverb & Spatial Delay Network
    const spatialFilter = this.ctx.createBiquadFilter();
    spatialFilter.type = 'lowpass';
    spatialFilter.frequency.setValueAtTime(2200, this.ctx.currentTime);

    const delay1 = this.ctx.createDelay();
    delay1.delayTime.setValueAtTime(0.38, this.ctx.currentTime);
    const feedback1 = this.ctx.createGain();
    feedback1.gain.setValueAtTime(0.38, this.ctx.currentTime);

    const delay2 = this.ctx.createDelay();
    delay2.delayTime.setValueAtTime(0.62, this.ctx.currentTime);
    const feedback2 = this.ctx.createGain();
    feedback2.gain.setValueAtTime(0.28, this.ctx.currentTime);

    // Wire spatial reverb network
    this.musicGain.connect(this.fadeGain); // direct sound
    this.musicGain.connect(spatialFilter);
    spatialFilter.connect(delay1);
    delay1.connect(feedback1);
    feedback1.connect(delay1);
    delay1.connect(delay2);
    delay2.connect(feedback2);
    feedback2.connect(delay2);

    const reverbSend = this.ctx.createGain();
    reverbSend.gain.setValueAtTime(0.45, this.ctx.currentTime);
    delay1.connect(reverbSend);
    delay2.connect(reverbSend);
    reverbSend.connect(this.fadeGain);

    this.scheduleJapaneseAmbientMelody();
  }

  /**
   * Periodically plays deep, slow, meditative ambient Japanese Koto & Shakuhachi notes
   */
  private scheduleJapaneseAmbientMelody() {
    if (this.ambientMusicTimer) clearTimeout(this.ambientMusicTimer);
    // Unhurried, contemplative interval honoring 'Ma' (sacred silence)
    const interval = 8500 + Math.random() * 8000;

    this.ambientMusicTimer = window.setTimeout(() => {
      if (this.isPlayingVideo && !this.isMuted) {
        this.playMeditativeAmbientMotif();
      }
      this.scheduleJapaneseAmbientMelody();
    }, interval);
  }

  /**
   * Meditative Japanese Insen & Hirajoshi Frequencies (Deep, contemplative Zen scale):
   * D3, A3, D4, Eb4, G4, A4, C5, D5
   */
  private MEDITATIVE_SCALE_FREQS = [
    146.83, // D3 (Deep resonant bass)
    220.00, // A3
    293.66, // D4 (Heart fundamental)
    311.13, // Eb4 (Insen meditative mist)
    392.00, // G4 (Tranquil water)
    440.00, // A4
    523.25, // C5
    587.33, // D5
  ];

  /**
   * Plays a single deep, lingering meditative tone or breath swell
   */
  private playMeditativeAmbientMotif() {
    if (!this.ctx || !this.musicGain || this.isMuted) return;
    const isFlute = Math.random() > 0.45;
    if (isFlute) {
      // Long, breathy, spacious Shakuhachi flute swell
      const freqs = [220.00, 293.66, 311.13, 392.00];
      const note = freqs[Math.floor(Math.random() * freqs.length)];
      this.playShakuhachiNote(note, 4.8, 0.42);
    } else {
      // Deep, lingering resonant Koto pluck
      const freqs = [146.83, 220.00, 293.66, 392.00];
      const note = freqs[Math.floor(Math.random() * freqs.length)];
      this.playKotoPluck(note, 5.2, 0.5);
    }
  }

  /**
   * Synthesize a deep, resonant traditional Japanese Koto (箏) string:
   * Warm wooden soundboard body, rich low fundamentals, and lingering peaceful decay.
   */
  public playKotoPluck(frequency: number, duration: number = 4.8, velocity: number = 0.55) {
    this.init();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const outputNode = this.musicGain || this.masterGain;

    const pluckGain = this.ctx.createGain();
    pluckGain.connect(outputNode);

    const actualVol = velocity * this.layerLevels.japaneseMusic;
    pluckGain.gain.setValueAtTime(0.0001, now);
    pluckGain.gain.linearRampToValueAtTime(actualVol, now + 0.015);
    pluckGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Warm, deep harmonics of a traditional Paulownia wood Koto
    const harmonics = [
      { mult: 1.0, gain: 0.72, type: 'triangle' as OscillatorType },
      { mult: 2.0, gain: 0.30, type: 'sine' as OscillatorType },
      { mult: 3.01, gain: 0.14, type: 'sine' as OscillatorType },
      { mult: 4.02, gain: 0.05, type: 'sine' as OscillatorType },
    ];

    harmonics.forEach((h) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const hGain = this.ctx.createGain();

      osc.type = h.type;
      // Delicate meditative micro-vibrato on decay
      osc.frequency.setValueAtTime(frequency * h.mult * 1.006, now);
      osc.frequency.exponentialRampToValueAtTime(frequency * h.mult, now + 0.16);

      hGain.gain.setValueAtTime(h.gain, now);
      hGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * (1 / Math.sqrt(h.mult)));

      osc.connect(hGain);
      hGain.connect(pluckGain);

      osc.start(now);
      osc.stop(now + duration + 0.05);
    });

    setTimeout(() => pluckGain.disconnect(), (duration + 0.2) * 1000);
  }

  /**
   * Synthesize a deep, breathy, spacious Shakuhachi (尺八) bamboo flute:
   * Slow, graceful breath swell attack, hollow bamboo air noise, and tranquil Zen vibrato.
   */
  public playShakuhachiNote(frequency: number, duration: number = 4.8, velocity: number = 0.48) {
    this.init();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const outputNode = this.musicGain || this.masterGain;

    const fluteGain = this.ctx.createGain();
    fluteGain.connect(outputNode);

    const actualVol = velocity * this.layerLevels.japaneseMusic;
    const attackTime = 0.75; // slow, unhurried, meditative breath swell

    fluteGain.gain.setValueAtTime(0.0001, now);
    fluteGain.gain.linearRampToValueAtTime(actualVol, now + attackTime);
    fluteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Warm bamboo acoustic oscillator
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    // Gentle subtle Meri/Kari pitch bend (breath embouchure inflection)
    osc.frequency.setValueAtTime(frequency * 0.985, now);
    osc.frequency.exponentialRampToValueAtTime(frequency, now + 0.28);

    // Slow meditative Zen vibrato (~4.0 Hz, entering gently after breath settles)
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.frequency.setValueAtTime(4.0, now);
    vibratoGain.gain.setValueAtTime(0, now);
    vibratoGain.gain.linearRampToValueAtTime(frequency * 0.014, now + attackTime + 0.4);

    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);
    vibrato.start(now);
    vibrato.stop(now + duration + 0.1);

    // Hollow bamboo air breath noise
    const breathDuration = duration;
    const bufferSize = Math.floor(this.ctx.sampleRate * Math.min(breathDuration, 4.0));
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const nData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      nData[i] = Math.random() * 2 - 1;
    }
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(frequency * 1.6, now);
    noiseFilter.Q.setValueAtTime(4.2, now);

    const breathGain = this.ctx.createGain();
    breathGain.gain.setValueAtTime(0.0001, now);
    breathGain.gain.linearRampToValueAtTime(actualVol * 0.14, now + attackTime * 0.8);
    breathGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(breathGain);
    breathGain.connect(fluteGain);

    noiseSource.start(now);
    noiseSource.stop(now + duration + 0.05);

    osc.connect(fluteGain);
    osc.start(now);
    osc.stop(now + duration + 0.05);

    setTimeout(() => fluteGain.disconnect(), (duration + 0.2) * 1000);
  }

  /**
   * DEEP, SPATIAL, MEDITATIVE JAPANESE ZEN PHRASE (Японська мелодія спокою та глибокої гармонії)
   * Slow, spacious, contemplative Honkyoku melody featuring deep resonant Koto
   * and long breathy Shakuhachi tones honoring the sacred silence of the dojo.
   */
  public playJapaneseMelodyPhrase(onComplete?: () => void) {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Unhurried meditative Zen sequence with spacious reverberation:
    // 0.0s: Deep resonant Koto D3 (146.83 Hz) with rich fundamental sustain
    // 1.8s: Meditative Shakuhachi breath on D4 (293.66 Hz)
    // 4.2s: Soft Koto Eb4 (311.13 Hz) delicate contemplation
    // 6.6s: Spacious Shakuhachi swell on G4 (392.00 Hz)
    // 9.2s: Resolving deep Koto chord D3 + A3 + D4
    const phrase = [
      { freq: 146.83, delay: 0, inst: 'koto', dur: 5.2, vel: 0.65 },
      { freq: 293.66, delay: 1800, inst: 'shaku', dur: 4.5, vel: 0.55 },
      { freq: 311.13, delay: 4200, inst: 'koto', dur: 4.2, vel: 0.50 },
      { freq: 392.00, delay: 6500, inst: 'shaku', dur: 5.0, vel: 0.60 },
      { freq: 220.00, delay: 9200, inst: 'koto', dur: 5.5, vel: 0.55 },
      { freq: 146.83, delay: 9250, inst: 'koto', dur: 5.8, vel: 0.65 },
    ];

    phrase.forEach((n) => {
      window.setTimeout(() => {
        if (n.inst === 'koto') {
          this.playKotoPluck(n.freq, n.dur, n.vel);
        } else {
          this.playShakuhachiNote(n.freq, n.dur, n.vel);
        }
      }, n.delay);
    });

    if (onComplete) {
      setTimeout(onComplete, 12000);
    }
  }

  /**
   * Single harmonic meditative tone (used during keyframe milestones)
   */
  public playJapaneseNote(frequency: number = 293.66) {
    this.playKotoPluck(frequency, 4.2, 0.6);
    this.playShakuhachiNote(frequency, 4.5, 0.45);
  }

  /**
   * Backward-compatible alias for singing bowl triggers
   * Now gracefully renders a serene Japanese Koto & Shakuhachi harmony instead of a cold bell!
   */
  public playSingingBowl(fundamental: number = 293.66) {
    this.playJapaneseNote(fundamental);
  }

  /**
   * Layer: Distant Kaniv Nature & Dnieper River Wind
   */
  private initKanivNatureLayer() {
    if (!this.ctx || !this.fadeGain) return;

    const bufferSize = this.ctx.sampleRate * 3;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
    }

    const windSource = this.ctx.createBufferSource();
    windSource.buffer = noiseBuffer;
    windSource.loop = true;

    this.windFilter = this.ctx.createBiquadFilter();
    this.windFilter.type = 'lowpass';
    this.windFilter.frequency.setValueAtTime(260, this.ctx.currentTime);
    this.windFilter.Q.setValueAtTime(1.8, this.ctx.currentTime);

    this.kanivWindGain = this.ctx.createGain();
    this.kanivWindGain.gain.setValueAtTime(0.24 * this.layerLevels.kanivNature, this.ctx.currentTime);

    windSource.connect(this.windFilter);
    this.windFilter.connect(this.kanivWindGain);
    this.kanivWindGain.connect(this.fadeGain);
    windSource.start();

    this.modulateWind();
    this.scheduleKanivCrickets();
  }

  private modulateWind() {
    if (!this.ctx || !this.windFilter || !this.kanivWindGain) return;
    const now = this.ctx.currentTime;
    const nextFreq = 180 + Math.random() * 160;
    const nextGain = (0.18 + Math.random() * 0.12) * this.layerLevels.kanivNature;
    this.windFilter.frequency.setTargetAtTime(nextFreq, now, 2.5);
    this.kanivWindGain.gain.setTargetAtTime(nextGain, now, 2.5);

    setTimeout(() => {
      if (this.ctx) this.modulateWind();
    }, 4000);
  }

  private scheduleKanivCrickets() {
    if (this.cricketsTimer) clearTimeout(this.cricketsTimer);
    const delay = 4000 + Math.random() * 7000;

    this.cricketsTimer = window.setTimeout(() => {
      this.playKanivCricketChirp();
      this.scheduleKanivCrickets();
    }, delay);
  }

  private playKanivCricketChirp() {
    if (!this.ctx || !this.fadeGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    const chirpGain = this.ctx.createGain();
    chirpGain.gain.setValueAtTime(0.0001, now);
    chirpGain.gain.linearRampToValueAtTime(0.015 * this.layerLevels.kanivNature, now + 0.05);
    chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
    chirpGain.connect(this.fadeGain);

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(4500 + Math.random() * 400, now);
    osc.connect(chirpGain);

    osc.start(now);
    osc.stop(now + 0.5);

    setTimeout(() => chirpGain.disconnect(), 600);
  }

  /**
   * Layer: Deep Meditative Kokyu Breathing Cycle
   */
  private initBreathLayer() {
    if (!this.ctx || !this.fadeGain) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const breathSource = this.ctx.createBufferSource();
    breathSource.buffer = noiseBuffer;
    breathSource.loop = true;

    this.breathFilter = this.ctx.createBiquadFilter();
    this.breathFilter.type = 'bandpass';
    this.breathFilter.frequency.setValueAtTime(380, this.ctx.currentTime);
    this.breathFilter.Q.setValueAtTime(3.2, this.ctx.currentTime);

    this.breathGainNode = this.ctx.createGain();
    this.breathGainNode.gain.setValueAtTime(0.0001, this.ctx.currentTime);

    breathSource.connect(this.breathFilter);
    this.breathFilter.connect(this.breathGainNode);
    this.breathGainNode.connect(this.fadeGain);
    breathSource.start();

    this.loopBreathCycle();
  }

  private loopBreathCycle() {
    if (!this.ctx || !this.breathFilter || !this.breathGainNode) return;

    const baseCycle = 5.2 / Math.max(0.2, this.currentSpeed * 0.9);
    const inhaleDuration = baseCycle * 0.45;
    const exhaleDuration = baseCycle * 0.55;

    const now = this.ctx.currentTime;
    const maxBreathVol = 0.08 * this.layerLevels.breath;

    this.breathFilter.frequency.setTargetAtTime(540, now, inhaleDuration * 0.4);
    this.breathGainNode.gain.setTargetAtTime(maxBreathVol, now, inhaleDuration * 0.35);

    this.breathTimer = window.setTimeout(() => {
      if (!this.ctx || !this.breathFilter || !this.breathGainNode) return;
      const exNow = this.ctx.currentTime;
      this.breathFilter.frequency.setTargetAtTime(290, exNow, exhaleDuration * 0.5);
      this.breathGainNode.gain.setTargetAtTime(0.012, exNow, exhaleDuration * 0.4);

      this.breathTimer = window.setTimeout(() => {
        this.loopBreathCycle();
      }, exhaleDuration * 1000);
    }, inhaleDuration * 1000);
  }

  /**
   * Layer: Organic Tatami Rustle & Soft Shuffling Footwork
   */
  private initTatamiLayer() {
    if (!this.ctx || !this.fadeGain) return;

    this.tatamiGain = this.ctx.createGain();
    this.tatamiGain.gain.setValueAtTime(this.layerLevels.tatami, this.ctx.currentTime);
    this.tatamiGain.connect(this.fadeGain);

    this.scheduleAmbientTatamiShuffles();
  }

  private scheduleAmbientTatamiShuffles() {
    if (this.tatamiTimer) clearTimeout(this.tatamiTimer);
    const interval = 2400 + Math.random() * 3400;

    this.tatamiTimer = window.setTimeout(() => {
      if (this.isPlayingVideo && !this.isMuted) {
        this.playOrganicTatamiShuffle();
      }
      this.scheduleAmbientTatamiShuffles();
    }, interval);
  }

  public playOrganicTatamiShuffle(intensity: number = 0.5) {
    if (!this.ctx || !this.tatamiGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const duration = 0.22 + Math.random() * 0.16;

    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450 + Math.random() * 180, now);
    filter.frequency.exponentialRampToValueAtTime(140, now + duration);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.08 * intensity * this.layerLevels.tatami, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.tatamiGain);

    noise.start(now);
    noise.stop(now + duration + 0.02);

    setTimeout(() => gain.disconnect(), (duration + 0.1) * 1000);
  }

  /**
   * Layer: Cedar Wood Dojo Resonance (Warm Harmonic Drone)
   */
  private initWoodenDojoDrone() {
    if (!this.ctx || !this.fadeGain) return;

    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(108, this.ctx.currentTime);

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(216, this.ctx.currentTime);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, this.ctx.currentTime);

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.07, this.ctx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(this.droneGain);
    this.droneGain.connect(this.fadeGain);

    osc1.start();
    osc2.start();
  }

  /**
   * AUTO-ACTIVATION & SMOOTH FADING:
   * Call whenever the video play/pause status changes
   */
  public onPlayStateChange(isPlaying: boolean, speed?: number) {
    this.init();
    if (speed !== undefined) {
      this.currentSpeed = speed;
    }

    if (!this.ctx || !this.fadeGain) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlayingVideo = isPlaying;

    const now = this.ctx.currentTime;
    this.fadeGain.gain.cancelScheduledValues(now);

    if (isPlaying && !this.isMuted) {
      this.fadeGain.gain.setValueAtTime(Math.max(0.0001, this.fadeGain.gain.value), now);
      this.fadeGain.gain.linearRampToValueAtTime(1.0, now + 0.9);
      // Play a deep, resonant meditative Koto tone on video start
      this.playKotoPluck(293.66, 4.2, 0.55);
    } else {
      this.fadeGain.gain.setValueAtTime(this.fadeGain.gain.value, now);
      this.fadeGain.gain.linearRampToValueAtTime(0.0001, now + 1.1);
    }
  }

  public setMasterVolume(vol: number) {
    this.init();
    this.userVolume = Math.max(0, Math.min(1, vol));
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const target = this.isMuted ? 0.0001 : this.userVolume;
    this.masterGain.gain.setTargetAtTime(target, now, 0.08);
    this.notify();
  }

  public getMasterVolume(): number {
    return this.userVolume;
  }

  public setLayerVolume(layer: keyof SoundLayerVolumes, vol: number) {
    this.layerLevels[layer] = Math.max(0, Math.min(1, vol));
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    if (layer === 'tatami' && this.tatamiGain) {
      this.tatamiGain.gain.setTargetAtTime(this.layerLevels.tatami, now, 0.1);
    } else if (layer === 'kanivNature' && this.kanivWindGain) {
      this.kanivWindGain.gain.setTargetAtTime(0.24 * this.layerLevels.kanivNature, now, 0.1);
    } else if (layer === 'japaneseMusic' && this.musicGain) {
      this.musicGain.gain.setTargetAtTime(this.layerLevels.japaneseMusic, now, 0.1);
    }
  }

  public getLayerVolumes(): SoundLayerVolumes {
    return { ...this.layerLevels };
  }

  public updateSpeed(speed: number) {
    this.currentSpeed = speed;
    if (!this.ctx) return;

    if (this.windFilter) {
      const now = this.ctx.currentTime;
      const targetFreq = 160 + speed * 150;
      this.windFilter.frequency.setTargetAtTime(targetFreq, now, 0.3);
    }
  }

  /**
   * Start meditation session:
   * Smoothly fades in tranquil ambient soundscape and plays peaceful Japanese melody motif.
   */
  public startMeditationAudio() {
    this.init();
    if (!this.ctx || !this.fadeGain || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = false;
    const now = this.ctx.currentTime;
    this.masterGain.gain.setTargetAtTime(this.userVolume, now, 0.1);

    this.fadeGain.gain.cancelScheduledValues(now);
    this.fadeGain.gain.setValueAtTime(Math.max(0.0001, this.fadeGain.gain.value), now);
    this.fadeGain.gain.linearRampToValueAtTime(1.0, now + 2.2);

    // Initial peaceful Japanese melody phrase
    this.playJapaneseMelodyPhrase();
    this.notify();
  }

  /**
   * Complete meditation session:
   * Plays resolving peaceful Japanese Shakuhachi & Koto phrase and gradually fades out.
   */
  public endMeditationWithGradualFade(fadeDurationSeconds: number = 7.0) {
    if (!this.ctx || !this.fadeGain) return;

    const now = this.ctx.currentTime;
    // Play concluding serene Japanese notes
    this.playShakuhachiNote(440.0, 4.5, 0.6);
    setTimeout(() => {
      this.playKotoPluck(293.66, 4.0, 0.55);
    }, 800);

    this.fadeGain.gain.cancelScheduledValues(now);
    this.fadeGain.gain.setValueAtTime(this.fadeGain.gain.value, now);
    this.fadeGain.gain.linearRampToValueAtTime(0.0001, now + fadeDurationSeconds);
  }

  public stopMeditationAudio() {
    if (!this.ctx || !this.fadeGain) return;
    const now = this.ctx.currentTime;
    this.fadeGain.gain.cancelScheduledValues(now);
    this.fadeGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
  }

  public toggleMute(): boolean {
    this.init();
    if (!this.ctx || !this.masterGain) return this.isMuted;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    const now = this.ctx.currentTime;
    const target = this.isMuted ? 0.0001 : this.userVolume;
    this.masterGain.gain.setTargetAtTime(target, now, 0.1);

    if (!this.isMuted) {
      // Play deep resonant meditative Japanese Koto tone on unmute
      this.playKotoPluck(293.66, 4.5, 0.6);
      if (this.isPlayingVideo) {
        this.onPlayStateChange(true, this.currentSpeed);
      }
    }

    this.notify();
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Slow-motion dramatic air displacement whoosh
   */
  public playSlowMotionWhoosh(speedMultiplier: number = 0.5) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const duration = 1.2 / Math.max(speedMultiplier, 0.2);

    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(3.0, now);
    filter.frequency.setValueAtTime(150, now);
    filter.frequency.exponentialRampToValueAtTime(750, now + duration * 0.4);
    filter.frequency.exponentialRampToValueAtTime(120, now + duration);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.24, now + duration * 0.35);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noiseSource.start(now);
    noiseSource.stop(now + duration + 0.05);
  }

  public playTatamiStep() {
    this.playOrganicTatamiShuffle(0.8);
  }
}

export const soundEngine = new DojoSoundEngine();
