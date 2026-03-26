/**
 * 🔊 GAME AUDIO — Zeitgesteuerte Ambient-Sounds + Volume Controls
 * 
 * Problem gelöst: Browser Autoplay Policy → Audio startet erst nach User-Klick
 * 
 * Features:
 * - Vogelgezwitscher 06:00-10:00 (birds_morning.mp3)
 * - Lautstärkeregler (Slider)
 * - Mute-Button (🔊/🔇)
 * - Fade-In/Fade-Out sanft
 * - Startet erst nach erstem Klick (Browser Policy)
 * - Konzert-Playlist (Endlosschleife 18:05 bis 02:30)
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '../../stores/gameStore';

interface AmbientTrack {
    id: string;
    src: string;
    startMin: number;
    endMin: number;
    baseVolume: number;
    loop: boolean;
    label: string;
}

const AMBIENT_TRACKS: AmbientTrack[] = [
    { id: 'birds', src: '/audio/birds_morning.mp3', startMin: 5 * 60, endMin: 10 * 60, baseVolume: 0.4, loop: true, label: '🐦 Vögel' },
    { id: 'crowd', src: '/audio/crowd_murmur.mp3', startMin: 8 * 60, endMin: 15 * 60, baseVolume: 0.3, loop: true, label: '👥 Crowd-Murmeln' },
    { id: 'applause', src: '/audio/applause.mp3', startMin: 9 * 60, endMin: 10 * 60, baseVolume: 0.25, loop: true, label: '👏 Applaus' },
    { id: 'soundcheck', src: '/audio/soundcheck_.mp3', startMin: 8 * 60 + 10, endMin: 9 * 60 + 10, baseVolume: 0.35, loop: false, label: '🔊 Soundcheck' },
    // CHUNK 3 / Vormittag:
    { id: 'chanting', src: '/audio/chanting.mp3', startMin: 10 * 60 + 20, endMin: 11 * 60, baseVolume: 0.4, loop: true, label: '🗣️ Sprechchöre' },
    { id: 'protest_music', src: '/audio/protest_music.mp3', startMin: 10 * 60 + 30, endMin: 11 * 60, baseVolume: 0.35, loop: true, label: '🎵 Protest-Musik' },
    { id: 'speech_hoffmann', src: '/audio/speech_hoffmann.mp3', startMin: 11 * 60 + 2, endMin: 11 * 60 + 7, baseVolume: 0.6, loop: false, label: '🎤 Rede Dr. Hoffmann' },
    { id: 'speech_weber', src: '/audio/speech_weber.mp3', startMin: 11 * 60 + 30, endMin: 12 * 60, baseVolume: 0.65, loop: false, label: '🎤 Rede Weber (Aggressiv)' },
    // CHUNK 4 / Mittag (Eskalation):
    { id: 'police_ultimatum', src: '/audio/police_ultimatum.mp3', startMin: 12 * 60 + 2, endMin: 12 * 60 + 3, baseVolume: 0.8, loop: false, label: '🚨 Polizei-Ultimatum' },
    { id: 'crowd_riot', src: '/audio/crowd_riot.mp3', startMin: 12 * 60 + 4, endMin: 14 * 60, baseVolume: 0.5, loop: true, label: '🤬 Wütende Menge' },
    { id: 'shield_beats', src: '/audio/shield_beats.mp3', startMin: 12 * 60 + 30, endMin: 13 * 60, baseVolume: 0.6, loop: true, label: '🛡️ Schild-Beats (Riot)' },
];

const CONCERT_PLAYLIST = [
    '/audio/(Intro) Hör mir zu. Lass die Welt drauße.mp3',
    '/audio/Nachtschicht.mp3',
    '/audio/Wie Benzin.mp3'
];

// Global audio state
let globalMasterVolume = 0.5;
let globalMuted = false;
let audioUnlocked = false;
const activeAudios = new Map<string, HTMLAudioElement>();
const failedAudioIds = new Set<string>();

export const GameAudio = () => {
    const inGameTime = useGameStore((state: any) => state.gameState.inGameTime);
    const isPlaying = useGameStore((state: any) => state.gameState.isPlaying);
    const masterVolume = useGameStore((state: any) => state.gameState.masterVolume);
    const muted = useGameStore((state: any) => state.gameState.muted);
    const [unlocked, setUnlocked] = useState(false);
    const fadeTimers = useRef<Map<string, number>>(new Map());

    // Konzert Playlist State
    const concertAudioRef = useRef<HTMLAudioElement | null>(null);
    const concertIndexRef = useRef<number>(0);

    const [h, m] = inGameTime.split(':').map(Number);
    const inGameMinutes = h * 60 + m;

    // Unlock audio on first click anywhere in the document
    const unlockAudio = useCallback(() => {
        if (audioUnlocked) return;
        audioUnlocked = true;
        setUnlocked(true);
        // Create and play a silent audio to unlock the context
        const silent = new Audio();
        silent.volume = 0;
        silent.play().catch(() => {});
        console.log('🔊 Audio unlocked by user interaction');
    }, []);

    // Add click listener to unlock audio
    useEffect(() => {
        document.addEventListener('click', unlockAudio, { once: false });
        document.addEventListener('keydown', unlockAudio, { once: false });
        return () => {
            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('keydown', unlockAudio);
        };
    }, [unlockAudio]);

    // Volume change handler
    useEffect(() => {
        globalMasterVolume = masterVolume;
        globalMuted = muted;
        
        // Standard Tracks Volume Update
        activeAudios.forEach((audio, id) => {
            const track = AMBIENT_TRACKS.find(t => t.id === id);
            if (track) {
                audio.volume = muted ? 0 : track.baseVolume * masterVolume;
            }
        });

        // Concert Volume Update
        if (concertAudioRef.current) {
            concertAudioRef.current.volume = muted ? 0 : 0.8 * masterVolume;
        }
    }, [masterVolume, muted]);

    // 🎸 KONZERT PLAYLIST HANDLER (18:05 bis 02:30 Uhr)
    useEffect(() => {
        if (!isPlaying || !audioUnlocked) return;

        // Zeitfenster: 18:00 (1080) bis Mitternacht (1440) ODER 00:00 (0) bis 02:30 (150)
        const isConcertTime = inGameMinutes >= 18 * 60 || inGameMinutes < 2 * 60 + 30;

        if (isConcertTime && !concertAudioRef.current) {
            // Konzert starten
            console.log('🎸 Konzert startet!');
            const playNextConcertSong = () => {
                const src = CONCERT_PLAYLIST[concertIndexRef.current];
                const audio = new Audio(src);
                
                audio.volume = globalMuted ? 0 : 0.8 * globalMasterVolume;
                
                audio.onended = () => {
                    // Nächster Song im Array
                    concertIndexRef.current = (concertIndexRef.current + 1) % CONCERT_PLAYLIST.length;
                    // Rekursiver Call, solange Konzert-Zeit ist, wird UseEffect nicht abgebaut
                    playNextConcertSong();
                };

                audio.play().catch(err => console.warn('🔇 Konzert Audio geblockt:', err));
                concertAudioRef.current = audio;
            };

            playNextConcertSong();
        } else if (!isConcertTime && concertAudioRef.current) {
            // Konzert beenden
            console.log('🎸 Konzert beendet (Sperrstunde erreicht/Tag resettet).');
            // Fade Out
            const audio = concertAudioRef.current;
            const fadeOut = setInterval(() => {
                audio.volume = Math.max(0, audio.volume - 0.05);
                if (audio.volume <= 0.01) {
                    audio.pause();
                    audio.currentTime = 0;
                    concertAudioRef.current = null;
                    clearInterval(fadeOut);
                }
            }, 50);
        }
    }, [inGameMinutes, isPlaying, unlocked]);

    // Time-based (Standard) audio control
    useEffect(() => {
        if (!isPlaying || !audioUnlocked) return;

        AMBIENT_TRACKS.forEach((track) => {
            const isActive = inGameMinutes >= track.startMin && inGameMinutes < track.endMin;
            const existing = activeAudios.get(track.id);

            if (isActive && !existing && !failedAudioIds.has(track.id)) {
                // START — create new audio and play
                const audio = new Audio(track.src);
                audio.loop = track.loop;
                audio.volume = 0; // Start at 0 for fade-in
                activeAudios.set(track.id, audio);
                
                audio.play().then(() => {
                    console.log(`🔊 Playing: ${track.label}`);
                    // Fade in
                    const targetVol = globalMuted ? 0 : track.baseVolume * globalMasterVolume;
                    let vol = 0;
                    const oldTimer = fadeTimers.current.get(track.id);
                    if (oldTimer) clearInterval(oldTimer);
                    
                    const fadeIn = window.setInterval(() => {
                        vol = Math.min(targetVol, vol + 0.005);
                        audio.volume = vol;
                        if (vol >= targetVol) {
                            clearInterval(fadeIn);
                            fadeTimers.current.delete(track.id);
                        }
                    }, 30);
                    fadeTimers.current.set(track.id, fadeIn);
                }).catch((err) => {
                    console.warn(`🔇 Audio blocked: ${track.label}`, err);
                    failedAudioIds.add(track.id);
                    activeAudios.delete(track.id);
                });

            } else if (!isActive && existing) {
                // STOP — fade out and remove
                const oldTimer = fadeTimers.current.get(track.id);
                if (oldTimer) clearInterval(oldTimer);
                
                const fadeOut = window.setInterval(() => {
                    existing.volume = Math.max(0, existing.volume - 0.005);
                    if (existing.volume <= 0.001) {
                        existing.pause();
                        existing.currentTime = 0;
                        activeAudios.delete(track.id);
                        clearInterval(fadeOut);
                        fadeTimers.current.delete(track.id);
                        console.log(`🔇 Stopped: ${track.label}`);
                    }
                }, 30);
                fadeTimers.current.set(track.id, fadeOut);
            }
        });
    }, [inGameMinutes, isPlaying, unlocked]);

    // Cleanup
    useEffect(() => {
        return () => {
            activeAudios.forEach((a) => { a.pause(); a.currentTime = 0; });
            activeAudios.clear();
            if (concertAudioRef.current) {
                concertAudioRef.current.pause();
                concertAudioRef.current.currentTime = 0;
            }
            fadeTimers.current.forEach((id) => clearInterval(id));
        };
    }, []);

    // ═══ RENDER: No UI anymore, handled in HUD ═══
    return null;
};
