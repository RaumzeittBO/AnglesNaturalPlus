class SoundManager {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
  private ambientGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;

  public init() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
  }

  public toggle(): boolean {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isEnabled = !this.isEnabled;

    if (this.isEnabled) {
      this.startAmbient();
      this.playTone(520, 0.1, "triangle", 0.05);
    } else {
      this.stopAmbient();
    }

    return this.isEnabled;
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }

  private startAmbient() {
    if (!this.ctx || !this.isEnabled) return;
    try {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.015, this.ctx.currentTime + 3);
      this.ambientGain.connect(this.ctx.destination);

      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = "sine";
      this.osc1.frequency.setValueAtTime(174, this.ctx.currentTime);

      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = "sine";
      this.osc2.frequency.setValueAtTime(261.63, this.ctx.currentTime);

      this.osc1.connect(this.ambientGain);
      this.osc2.connect(this.ambientGain);

      this.osc1.start();
      this.osc2.start();
    } catch {}
  }

  private stopAmbient() {
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          this.osc1?.stop();
          this.osc2?.stop();
          this.osc1?.disconnect();
          this.osc2?.disconnect();
          this.ambientGain?.disconnect();
        }, 500);
      } catch {}
    }
  }

  public playSeedDrop() {
    if (!this.isEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }

  public playClick() {
    if (!this.isEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(620, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {}
  }

  public playTone(freq: number, duration: number = 0.2, type: OscillatorType = "sine", volume: number = 0.04) {
    if (!this.isEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {}
  }
}

export const soundFx = new SoundManager();