/**
 * 🔊 AUDIO MANAGER — 24H MASTER PLAN
 * 
 * Web Audio API Sound-System für alle Sounds aus dem Master Plan:
 * - 06:00: Vogelgezwitscher, vereinzelte Autos
 * - 10:20: Sprechchöre "Freiheit! Freiheit!"
 * - 12:00: Polizei-Megafon-Ansage
 * - 12:30: Schild-Beats BOOM BOOM BOOM
 * - 13:00: Wasserwerfer-Rauschen
 * - 19:00: "ACAB!" Skandieren
 * - 19:30: Bengalo-Knistern
 * - 21:00: Schüsse, Explosionen
 * - Durchgehend: Sirenen, Crowd-Murmeln, Tension-Musik
 * 
 * Implementiert als Sine/Noise Web Audio Generatoren (kein externes Audio nötig).
 */

class AudioManager {
    private ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private activeNodes: Map<string, { osc?: OscillatorNode; gain: GainNode }> = new Map();
    private isInitialized = false;

    /** Initialize AudioContext on first user interaction */
    init() {
        if (this.isInitialized) return;
        try {
            this.ctx = new AudioContext();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.15; // Master volume
            this.masterGain.connect(this.ctx.destination);
            this.isInitialized = true;
        } catch (e) {
            console.warn('Audio nicht verfügbar:', e);
        }
    }

    /** Ensure context is running */
    private resume() {
        if (this.ctx?.state === 'suspended') this.ctx.resume();
    }

    // ═══════════════════════════════════════
    // ═══ SOUND GENERATORS                ═══
    // ═══════════════════════════════════════

    /** Sirene: auf/ab schwingende Sinuswelle */
    playSiren(duration = 5) {
        if (!this.ctx || !this.masterGain) return;
        this.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 600;
        gain.gain.value = 0.08;
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        // Siren sweep: 600Hz ↔ 900Hz
        const now = this.ctx.currentTime;
        for (let i = 0; i < duration * 2; i++) {
            osc.frequency.setValueAtTime(600, now + i * 0.5);
            osc.frequency.linearRampToValueAtTime(900, now + i * 0.5 + 0.25);
            osc.frequency.linearRampToValueAtTime(600, now + i * 0.5 + 0.5);
        }
        
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0, now + duration);
        osc.start(now);
        osc.stop(now + duration);
    }

    /** Schüsse: kurze White-Noise Bursts */
    playGunshot() {
        if (!this.ctx || !this.masterGain) return;
        this.resume();
        const bufferSize = this.ctx.sampleRate * 0.05; // 50ms
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1));
        }
        
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        const gain = this.ctx.createGain();
        gain.gain.value = 0.2;
        source.connect(gain);
        gain.connect(this.masterGain);
        source.start();
    }

    /** Explosion: tiefe Noise-Welle mit langem Decay */
    playExplosion() {
        if (!this.ctx || !this.masterGain) return;
        this.resume();
        const bufferSize = this.ctx.sampleRate * 0.8; // 800ms
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
        }
        
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 200;
        const gain = this.ctx.createGain();
        gain.gain.value = 0.3;
        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        source.start();
    }

    /** Crowd-Murmeln: tiefes rosa Rauschen */
    startCrowdMurmur() {
        if (!this.ctx || !this.masterGain || this.activeNodes.has('crowd')) return;
        this.resume();
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
            b6 = white * 0.115926;
        }
        
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        const gain = this.ctx.createGain();
        gain.gain.value = 0.04;
        source.connect(gain);
        gain.connect(this.masterGain);
        source.start();
        this.activeNodes.set('crowd', { gain });
    }

    /** Schild-Beats: rhythmisches tiefes Klopfen (BOOM BOOM BOOM) */
    playShieldBeats(count = 6) {
        if (!this.ctx || !this.masterGain) return;
        this.resume();
        const now = this.ctx.currentTime;
        
        for (let i = 0; i < count; i++) {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = 80; // Tiefer Boom
            gain.gain.setValueAtTime(0.3, now + i * 0.4);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.4 + 0.2);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + i * 0.4);
            osc.stop(now + i * 0.4 + 0.3);
        }
    }

    /** Bengalo-Knistern: hochfrequentes Rauschen */
    playBengaloSizzle(duration = 3) {
        if (!this.ctx || !this.masterGain) return;
        this.resume();
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.1 * (1 + Math.sin(i / 200) * 0.5);
        }
        
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 3000;
        const gain = this.ctx.createGain();
        gain.gain.value = 0.06;
        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        source.start();
    }

    /** Chanting: rhythmischer Ton (Sprechchöre) */
    playChanting(duration = 5) {
        if (!this.ctx || !this.masterGain) return;
        this.resume();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.value = 200;
        
        // Rhythmic pulsing: "FREI-HEIT! FREI-HEIT!"
        for (let i = 0; i < duration * 2; i++) {
            gain.gain.setValueAtTime(0.06, now + i * 0.5);
            gain.gain.linearRampToValueAtTime(0.01, now + i * 0.5 + 0.2);
            gain.gain.linearRampToValueAtTime(0, now + i * 0.5 + 0.4);
        }
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + duration);
    }

    /** Set master volume */
    setVolume(vol: number) {
        if (this.masterGain) this.masterGain.gain.value = Math.max(0, Math.min(1, vol));
    }

    /** Stop all active sounds */
    stopAll() {
        this.activeNodes.forEach((node) => {
            node.gain.gain.linearRampToValueAtTime(0, (this.ctx?.currentTime || 0) + 0.5);
        });
        this.activeNodes.clear();
    }
}

/** Singleton Audio Manager */
export const audioManager = new AudioManager();
