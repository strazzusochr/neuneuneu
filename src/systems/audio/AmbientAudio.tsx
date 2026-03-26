import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../../stores/gameStore';

/**
 * 🔊 AMBIENT AUDIO SYSTEM — PROCEDURAL & LAYERED
 * Erzeugt Sound-Atmosphäre ohne externe Assets (Web Audio API):
 * - Vögel (Tag)
 * - Wind (Immer)
 * - Glocken (Vollstunde)
 * - Riot/City Noise (Tension-abhängig)
 */

export const AmbientAudio = () => {
    const inGameTime = useGameStore(state => state.gameState.inGameTime);
    const tensionLevel = useGameStore(state => state.gameState.tensionLevel);
    const masterVolume = useGameStore(state => state.gameState.masterVolume);
    const muted = useGameStore(state => state.gameState.muted);

    const audioCtx = useRef<AudioContext | null>(null);
    const masterGain = useRef<GainNode | null>(null);
    const windGain = useRef<GainNode | null>(null);
    const birdGain = useRef<GainNode | null>(null);
    const riotGain = useRef<GainNode | null>(null);

    const [h, m] = inGameTime.split(':').map(Number);
    const isDay = h >= 6 && h < 20;

    // 1. Initialize Audio Context
    useEffect(() => {
        const init = () => {
            if (audioCtx.current) return;
            audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            masterGain.current = audioCtx.current.createGain();
            masterGain.current.connect(audioCtx.current.destination);

            // WIND LAYER (Pink Noise)
            const bufferSize = 2 * audioCtx.current.sampleRate;
            const noiseBuffer = audioCtx.current.createBuffer(1, bufferSize, audioCtx.current.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            let b0, b1, b2, b3, b4, b5, b6;
            b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                output[i] *= 0.11; // (roughly) compensate for gain
                b6 = white * 0.115926;
            }
            const noise = audioCtx.current.createBufferSource();
            noise.buffer = noiseBuffer;
            noise.loop = true;
            windGain.current = audioCtx.current.createGain();
            windGain.current.gain.value = 0.05;
            noise.connect(windGain.current);
            windGain.current.connect(masterGain.current!);
            noise.start();

            // BIRD LAYER (High Pitch Blips)
            birdGain.current = audioCtx.current.createGain();
            birdGain.current.connect(masterGain.current!);
            birdGain.current.gain.value = 0;

            // RIOT LAYER (Low Rumble)
            riotGain.current = audioCtx.current.createGain();
            riotGain.current.connect(masterGain.current!);
            riotGain.current.gain.value = 0;
        };

        window.addEventListener('click', init);
        return () => window.removeEventListener('click', init);
    }, []);

    // 2. Update Master Volume & Mute
    useEffect(() => {
        if (!masterGain.current) return;
        masterGain.current.gain.setTargetAtTime(muted ? 0 : masterVolume, audioCtx.current!.currentTime, 0.1);
    }, [masterVolume, muted]);

    // 3. Dynamic Layer Update (Birds, Riot)
    useEffect(() => {
        if (!audioCtx.current || !birdGain.current || !riotGain.current) return;
        const now = audioCtx.current.currentTime;
        
        // Birds only at day, less during high tension
        const birdVol = isDay ? Math.max(0, 0.1 - (tensionLevel / 1000)) : 0;
        birdGain.current.gain.setTargetAtTime(birdVol, now, 1.0);

        // Riot noise increases with tension
        const riotVol = Math.max(0, (tensionLevel - 20) / 100) * 0.3;
        riotGain.current.gain.setTargetAtTime(riotVol, now, 1.5);
    }, [isDay, tensionLevel]);

    // 4. Church Bells (Hourly)
    useEffect(() => {
        if (m === 0 && audioCtx.current && masterGain.current) {
            const ctx = audioCtx.current;
            const playBell = (freq: number, delay: number) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
                gain.gain.setValueAtTime(0, ctx.currentTime + delay);
                gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + delay + 0.1);
                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 4);
                osc.connect(gain);
                gain.connect(masterGain.current!);
                osc.start(ctx.currentTime + delay);
                osc.stop(ctx.currentTime + delay + 4.5);
            };
            // Ding-Dong!
            playBell(220, 0);
            playBell(174.6, 1.5);
        }
    }, [h, m]);

    return null; // Component only for side effects
};
