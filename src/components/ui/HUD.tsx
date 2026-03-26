import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { EVENT_TIMELINE, NPC_COLORS } from '../../systems/eventScheduler';
import { NPCType } from '../../types/enums';

const StatusBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '800', color: '#ffcc00', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
            <span>{label}</span>
        </div>
        <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ height: '100%', width: `${value}%`, background: color, boxShadow: `0 0 10px ${color}` }} />
        </div>
    </div>
);

export const HUD = () => {
    const inGameTime = useGameStore(state => state.gameState.inGameTime);
    const isTimePaused = useGameStore(state => state.gameState.isTimePaused);
    const tensionLevel = useGameStore(state => state.gameState.tensionLevel);
    const timeSpeed = useGameStore(state => state.gameState.timeSpeed);
    const currentPhaseLabel = useGameStore(state => state.gameState.currentPhaseLabel);
    const npcCount = useGameStore(state => state.npcs.length);
    const npcs = useGameStore(state => state.npcs);
    const playerPosition = useGameStore(state => state.playerPosition);
    const selectedSquad = useGameStore(state => state.selectedSquad);
    const squadTarget = useGameStore(state => state.squadTarget);
    const lowPowerMode = useGameStore(state => state.lowPowerMode);
    const ui = useGameStore(state => state.ui);
    const polyStats = useGameStore(state => state.polyStats);
    const masterVolume = useGameStore(state => state.gameState.masterVolume);
    const muted = useGameStore(state => state.gameState.muted);
    const advanceHour = useGameStore(state => state.advanceHour);
    const rewindHour = useGameStore(state => state.rewindHour);
    const advanceMinute = useGameStore(state => state.advanceMinute);
    const rewindMinute = useGameStore(state => state.rewindMinute);
    const toggleTimePause = useGameStore(state => state.toggleTimePause);
    const setTimeSpeed = useGameStore(state => state.setTimeSpeed);
    const setMasterVolume = useGameStore(state => state.setMasterVolume);
    const setMuted = useGameStore(state => state.setMuted);
    const toggleMinimap = useGameStore(state => state.toggleMinimap);
    const toggleTacticsMenu = useGameStore(state => state.toggleTacticsMenu);
    const selectSquad = useGameStore(state => state.selectSquad);
    const openDialog = useGameStore(state => state.openDialog);
    const closeDialog = useGameStore(state => state.closeDialog);
    const chooseDialogOption = useGameStore(state => state.chooseDialogOption);
    const setTension = useGameStore(state => state.setTension);
    const adjustReputation = useGameStore(state => state.adjustReputation);
    const setMoralScore = useGameStore(state => state.setMoralScore);

    // Timeline Scroll Ref
    const timelineRef = useRef<HTMLDivElement>(null);
    const activeEventRef = useRef<HTMLDivElement>(null);
    const minimapRef = useRef<HTMLCanvasElement>(null);

    // FPS Counter
    const [fps, setFps] = useState(60);
    const frameCount = useRef(0);
    const lastTime = useRef(performance.now());

    useEffect(() => {
        let raf: number;
        const loop = () => {
            frameCount.current++;
            const now = performance.now();
            if (now - lastTime.current >= 1000) {
                setFps(frameCount.current);
                frameCount.current = 0;
                lastTime.current = now;
            }
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, []);

    const krause = npcs.find(n => n.type === NPCType.KRAUSE) ?? null;
    const distToKrause = krause ? Math.hypot(krause.position[0] - playerPosition[0], krause.position[2] - playerPosition[2]) : Infinity;
    const canTalkToKrause = !!krause && distToKrause < 3.2;
    const moodSummary = (() => {
        const map: Record<string, number> = {};
        for (const n of npcs) {
            map[n.mood] = (map[n.mood] ?? 0) + 1;
        }
        const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 3);
        return sorted.map(([k, v]) => `${k}:${v}`).join(' · ');
    })();
    const behaviorSummary = (() => {
        const map: Record<string, number> = {};
        for (const n of npcs) {
            map[n.behavior] = (map[n.behavior] ?? 0) + 1;
        }
        const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 3);
        return sorted.map(([k, v]) => `${k}:${v}`).join(' · ');
    })();
    const moodBars = (() => {
        const map: Record<string, number> = {};
        for (const n of npcs) map[n.mood] = (map[n.mood] ?? 0) + 1;
        const total = npcs.length || 1;
        return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([k, v]) => ({ k, p: Math.round((v / total) * 100) }));
    })();
    const behBars = (() => {
        const map: Record<string, number> = {};
        for (const n of npcs) map[n.behavior] = (map[n.behavior] ?? 0) + 1;
        const total = npcs.length || 1;
        return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([k, v]) => ({ k, p: Math.round((v / total) * 100) }));
    })();
    const formationSummary = (() => {
        const keys = ['SHIELD_WALL', 'SURROUND', 'GUARD', 'PATROL'] as const;
        const map: Record<string, number> = {};
        for (const k of keys) map[k] = 0;
        for (const n of npcs) {
            if (map[n.behavior] !== undefined) map[n.behavior] += 1;
        }
        return keys.map(k => ({ k, v: map[k] })).filter(x => x.v > 0);
    })();

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'm' || e.key === 'M') toggleMinimap();
            if (e.key === 'c' || e.key === 'C') toggleTacticsMenu();
            if (e.key === 'Escape') {
                if (ui.showDialog) closeDialog();
            }
            if (e.key === 'e' || e.key === 'E') {
                if (!ui.showDialog && canTalkToKrause) openDialog();
            }

            if (/^[1-9]$/.test(e.key)) {
                selectSquad(Number(e.key));
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [toggleMinimap, toggleTacticsMenu, ui.showDialog, closeDialog, canTalkToKrause, openDialog, selectSquad]);

    useEffect(() => {
        if (!ui.showMinimap) return;
        const canvas = minimapRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const size = canvas.width;
        const half = size / 2;
        const worldRadius = 85;

        const draw = () => {
            ctx.clearRect(0, 0, size, size);
            ctx.fillStyle = 'rgba(0,0,0,0.55)';
            ctx.fillRect(0, 0, size, size);

            ctx.strokeStyle = 'rgba(0,204,255,0.25)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.rect(4, 4, size - 8, size - 8);
            ctx.stroke();

            const toMap = (x: number, z: number) => {
                const mx = half + (x / worldRadius) * (half - 10);
                const mz = half + (z / worldRadius) * (half - 10);
                return { mx, mz };
            };

        const police = npcs.filter(n => n.type === NPCType.POLICE);
        const riot = npcs.filter(n => n.type === NPCType.RIOT_POLICE);
        const sek = npcs.filter(n => n.type === NPCType.SEK);
        const squads: typeof npcs[] = [];
        const chunkInto = (arr: typeof npcs, chunkCount: number) => {
            const chunkSize = Math.max(1, Math.ceil(arr.length / chunkCount));
            for (let i = 0; i < arr.length; i += chunkSize) squads.push(arr.slice(i, i + chunkSize));
        };
        chunkInto(police, 3);
        chunkInto(riot, 3);
        chunkInto(sek, 3);
        const squadMembers = squads[(selectedSquad - 1) || 0] || [];

            const maxDots = 450;
            const step = Math.max(1, Math.floor(npcs.length / maxDots));
            for (let i = 0; i < npcs.length; i += step) {
                const n = npcs[i];
                const { mx, mz } = toMap(n.position[0], n.position[2]);
            const col = NPC_COLORS[n.type] ?? '#888';
            ctx.strokeStyle = col;
            ctx.fillStyle = col;
            if (n.type === NPCType.RIOT_POLICE) {
                ctx.beginPath();
                ctx.arc(mx, mz, 1.5, 0, Math.PI * 2);
                ctx.fill();
            } else if (n.type === NPCType.SEK) {
                ctx.beginPath();
                ctx.moveTo(mx, mz - 2);
                ctx.lineTo(mx - 2, mz + 2);
                ctx.lineTo(mx + 2, mz + 2);
                ctx.closePath();
                ctx.fill();
            } else if (n.type === NPCType.POLICE) {
                ctx.fillRect(mx - 2, mz - 2, 4, 4);
            } else {
                ctx.fillRect(mx - 1, mz - 1, 2, 2);
            }
            }

        for (const n of squadMembers) {
            const { mx, mz } = toMap(n.position[0], n.position[2]);
            ctx.strokeStyle = '#ffcc00';
            ctx.lineWidth = 1;
            ctx.strokeRect(mx - 2, mz - 2, 4, 4);
        }

            const p = toMap(playerPosition[0], playerPosition[2]);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(p.mx - 2, p.mz - 2, 4, 4);

            if (squadTarget) {
                const t = toMap(squadTarget[0], squadTarget[2]);
                ctx.strokeStyle = 'rgba(255,204,0,0.85)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(t.mx, t.mz, 6, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = '#ffcc00';
                ctx.font = '10px monospace';
                ctx.fillText(String(selectedSquad), t.mx + 8, t.mz - 8);
            }
        };

        draw();
        const interval = window.setInterval(draw, 200);
        return () => window.clearInterval(interval);
    }, [ui.showMinimap, npcs, playerPosition, squadTarget, selectedSquad]);

    const fwdSpeeds = [1, 2, 3, 4, 5, 10, 20];
    const revSpeeds = [-1, -2, -3, -4, -5, -10, -20];
    const isReverse = timeSpeed < 0;
    const absSpeed = Math.abs(timeSpeed);

    // Zeit-Farbe laut Master Plan: Modifiziert von User "Uhr soll immer gelb/nicht weiß sein"
    const [h, m] = inGameTime.split(':').map(Number);
    const timeColor = (h >= 8 && h < 17) ? '#ffcc00' : (h >= 6 && h < 8 || h >= 17 && h < 20) ? '#ffcc00' : '#6688ff';
    const timeShadow = (h >= 8 && h < 17) ? 'rgba(255,204,0,0.4)' : (h >= 6 && h < 8 || h >= 17 && h < 20) ? 'rgba(255,204,0,0.4)' : 'rgba(102,136,255,0.4)';

    // Auto-Scroll to current event
    useEffect(() => {
        if (activeEventRef.current && timelineRef.current) {
            activeEventRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [h, m]);

    return (
        <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, fontFamily: '"Outfit", sans-serif' }}>
            {/* Hotkeys hint + squad indicator */}
            <div style={{ position: 'absolute', top: '12px', left: '12px', padding: '8px 10px', background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', color: '#ddd', fontSize: '12px', fontFamily: 'monospace', pointerEvents: 'none' }}>
                <div>Zero-Home-PC: {lowPowerMode ? 'ON' : 'OFF'}</div>
                <div>Squad: {selectedSquad} (1–9) · Minimap: M · Taktik: C</div>
                {canTalkToKrause && !ui.showDialog && <div style={{ color: '#ffcc00' }}>E: Martin Krause</div>}
            </div>

            {/* Left Panel */}
            <div style={{ pointerEvents: 'auto', position: 'absolute', top: '40px', left: '40px', width: '380px', padding: '24px', background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                <StatusBar label="Physische Verfassung" value={85} color="#ff4444" />
                <StatusBar label="Schutzweste" value={100} color="#ffcc00" />
                <StatusBar label="Ausdauer" value={60} color="#00ccff" />
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '24px 0', boxShadow: '0 1px 2px rgba(0,0,0,0.5)' }} />
                <StatusBar label="Karma / Ansehen" value={45} color="#ffaa00" />
                <StatusBar label="Lage-Spannung" value={tensionLevel} color="#888" />
                <StatusBar label="Volks-Moral" value={40} color="#ffff00" />
                <StatusBar label="Eskalationsstufe" value={Math.floor(tensionLevel / 5)} color="#ffcc00" />
                <div style={{ color: '#88ddff', fontFamily: 'monospace', fontSize: '12px', marginTop: '10px' }}>
                    Tris≈{polyStats.totalTriangles.toLocaleString()} · Instanzen {polyStats.visibleInstances}
                </div>
                <div style={{ marginTop: '8px' }}>
                    <div style={{ color: '#00ccff', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Moods</div>
                    <div style={{ display: 'grid', gap: '6px' }}>
                        {moodBars.map((b, i) => (
                            <div key={`mb-${i}`} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 40px', alignItems: 'center' }}>
                                <span style={{ color: '#ccc', fontFamily: 'monospace', fontSize: '12px' }}>{b.k}</span>
                                <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: `${b.p}%`, height: '100%', background: '#00ccff' }} />
                                </div>
                                <span style={{ color: '#88ddff', fontFamily: 'monospace', fontSize: '12px', textAlign: 'right' }}>{b.p}%</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ marginTop: '8px' }}>
                    <div style={{ color: '#ffaa00', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Behaviors</div>
                    <div style={{ display: 'grid', gap: '6px' }}>
                        {behBars.map((b, i) => (
                            <div key={`bb-${i}`} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 40px', alignItems: 'center' }}>
                                <span style={{ color: '#ccc', fontFamily: 'monospace', fontSize: '12px' }}>{b.k}</span>
                                <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: `${b.p}%`, height: '100%', background: '#ffaa00' }} />
                                </div>
                                <span style={{ color: '#ffcc00', fontFamily: 'monospace', fontSize: '12px', textAlign: 'right' }}>{b.p}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Minimap */}
            {ui.showMinimap && (
                <div style={{ pointerEvents: 'auto', position: 'absolute', left: '40px', bottom: '160px', width: '220px', padding: '12px', background: 'rgba(10,10,10,0.7)', border: '1px solid rgba(0,204,255,0.15)', borderRadius: '14px', backdropFilter: 'blur(8px)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ color: '#00ccff', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '12px' }}>Minimap</div>
                        <div style={{ color: '#888', fontFamily: 'monospace', fontSize: '11px' }}>M</div>
                    </div>
                    <canvas ref={minimapRef} width={196} height={196} style={{ width: '196px', height: '196px', borderRadius: '10px', display: 'block' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '10px', height: '10px', background: NPC_COLORS[NPCType.POLICE], display: 'inline-block', borderRadius: '2px' }} />
                            <span style={{ color: '#ccc', fontSize: '11px' }}>Police</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '10px', height: '10px', background: NPC_COLORS[NPCType.RIOT_POLICE], display: 'inline-block', borderRadius: '2px' }} />
                            <span style={{ color: '#ccc', fontSize: '11px' }}>Riot</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '10px', height: '10px', background: NPC_COLORS[NPCType.SEK], display: 'inline-block', borderRadius: '2px' }} />
                            <span style={{ color: '#ccc', fontSize: '11px' }}>SEK</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '10px', height: '10px', background: NPC_COLORS[NPCType.DEMONSTRATOR], display: 'inline-block', borderRadius: '2px' }} />
                            <span style={{ color: '#ccc', fontSize: '11px' }}>Demo</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Top Center Badge + Phase Label */}
            <div style={{ position: 'absolute', top: '40px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                <div style={{ padding: '8px 24px', background: 'rgba(10,10,10,0.9)', border: '2px solid #00ccff', borderRadius: '20px', boxShadow: '0 0 20px rgba(0,204,255,0.3)', marginBottom: '8px' }}>
                    <span style={{ color: '#ffcc00', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        Phase <span style={{ color: '#00ccff' }}>14</span> OPERATIV
                    </span>
                </div>
                {/* Current Event Phase Label from 24H System */}
                <div style={{ 
                    padding: '6px 16px', 
                    background: 'rgba(10,10,10,0.85)', 
                    borderRadius: '12px', 
                    border: `1px solid ${tensionLevel > 70 ? 'rgba(255,68,68,0.4)' : tensionLevel > 40 ? 'rgba(255,170,0,0.3)' : 'rgba(0,204,255,0.2)'}`,
                    display: 'inline-block'
                }}>
                    <span style={{ 
                        color: tensionLevel > 70 ? '#ff6666' : tensionLevel > 40 ? '#ffaa00' : '#88ddff', 
                        fontSize: '12px', 
                        fontWeight: '600',
                        letterSpacing: '0.5px'
                    }}>
                        {currentPhaseLabel}
                    </span>
                </div>
            </div>

            {/* Combined Right Panel (Missions + FPS + Current Event) */}
            <div style={{ 
                position: 'absolute', top: '20px', right: '20px', width: '380px', padding: '24px', 
                background: 'transparent', // Auf User-Wunsch: "mach den schwarzen rand wieder durchsichtig"
                border: 'none', 
                color: '#fff', 
                pointerEvents: 'auto',
                textShadow: '0 1px 4px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.6)'
            }}>
                {/* Header with FPS */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0, color: '#00ccff', fontSize: '18px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '800' }}>Streifen-Protokoll</h3>
                    <div style={{ 
                        padding: '4px 8px',
                        background: 'rgba(0,0,0,0.4)',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: fps > 50 ? '#00ff88' : fps > 30 ? '#ffaa00' : '#ff4444',
                        border: `1px solid ${fps > 50 ? 'rgba(0,255,136,0.2)' : fps > 30 ? 'rgba(255,170,0,0.2)' : 'rgba(255,68,68,0.2)'}`,
                        textShadow: 'none'
                    }}>
                        {fps} FPS
                    </div>
                </div>
                <div style={{ color: '#88ddff', fontFamily: 'monospace', fontSize: '12px', marginBottom: '10px' }}>
                    Mood: {moodSummary || '—'} · Behav: {behaviorSummary || '—'}
                </div>
                {/* Squad quick info */}
                <div style={{ color: '#ffcc00', fontFamily: 'monospace', fontSize: '12px', marginBottom: '10px' }}>
                    {(() => {
                        const police = npcs.filter(n => n.type === NPCType.POLICE);
                        const riot = npcs.filter(n => n.type === NPCType.RIOT_POLICE);
                        const sek = npcs.filter(n => n.type === NPCType.SEK);
                        const squads: typeof npcs[] = [];
                        const chunkInto = (arr: typeof npcs, chunkCount: number) => {
                            const chunkSize = Math.max(1, Math.ceil(arr.length / chunkCount));
                            for (let i = 0; i < arr.length; i += chunkSize) squads.push(arr.slice(i, i + chunkSize));
                        };
                        chunkInto(police, 3);
                        chunkInto(riot, 3);
                        chunkInto(sek, 3);
                        const idx = (selectedSquad - 1) || 0;
                        const members = squads[idx] || [];
                        return `Squad ${selectedSquad}: ${members.length} Mitglieder`;
                    })()}
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {formationSummary.map((f, i) => (
                        <span key={`form-${i}`} style={{ background: 'rgba(255,204,0,0.12)', border: '1px solid rgba(255,204,0,0.25)', borderRadius: '8px', padding: '4px 8px', color: '#ffcc00', fontFamily: 'monospace', fontSize: '12px' }}>
                            {f.k}:{f.v}
                        </span>
                    ))}
                </div>

                {/* Missions */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', fontSize: '13px', lineHeight: '1.6' }}>
                    <li style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <span style={{ color: '#00ff88', marginTop: '1px' }}>●</span>
                        <span style={{ color: '#00ff88' }}>Beobachtungsposten Nordseite erreichen (0/1)</span>
                    </li>
                    <li style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'flex-start', opacity: 0.8 }}>
                        <span style={{ color: '#ffcc00', marginTop: '1px' }}>●</span>
                        <span style={{ color: '#ffcc00' }}>Martin Krause identifizieren die Menge filmen (0/1)</span>
                    </li>
                    <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', opacity: 0.8 }}>
                        <span style={{ color: '#ffcc00', marginTop: '1px' }}>●</span>
                        <span style={{ color: '#ffcc00' }}>Situation deeskalieren oder Randalierer zerstreuen (0/5)</span>
                    </li>
                </ul>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.2)', marginBottom: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.5)' }} />

                {/* Timeline (Was passiert gerade) */}
                <div>
                    <h4 style={{ margin: '0 0 16px 0', color: '#00ccff', fontSize: '18px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '800' }}>
                        Einsatz-Timeline
                    </h4>
                    
                    <div 
                        ref={timelineRef}
                        style={{
                            maxHeight: '260px',
                            overflowY: 'auto',
                            paddingRight: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        }}
                    >
                        {EVENT_TIMELINE
                            // Filtere pure interne Events ohne Beschreibungen oder Duplikate aus
                            .filter((ev, index, self) => ev.description && index === self.findIndex((t) => t.time === ev.time && t.action === ev.action && t.npcType === ev.npcType))
                            .filter((ev) => {
                                // Vorab filtern, um Array-Manipulation übersichtlicher zu machen
                                const [evH, evM] = ev.time.split(':').map(Number);
                                const evTotal = evH * 60 + evM;
                                const curTotal = h * 60 + m;
                                const isPast = evTotal < curTotal - 15; // 15 Min Kulanz
                                return !isPast; // Vergangene komplett ignorieren
                            })
                            // User Wunsch: Das aktive Ereignis soll IMMER ganz oben (als oberstes) stehen.
                            .sort((a, b) => {
                                const [aH, aM] = a.time.split(':').map(Number);
                                const [bH, bM] = b.time.split(':').map(Number);
                                const aTotal = aH * 60 + aM;
                                const bTotal = bH * 60 + bM;
                                const curTotal = h * 60 + m;
                                
                                const aCurrent = aTotal <= curTotal && aTotal >= curTotal - 15;
                                const bCurrent = bTotal <= curTotal && bTotal >= curTotal - 15;

                                if (aCurrent && !bCurrent) return -1; // a (aktuell) nach oben
                                if (!aCurrent && bCurrent) return 1;  // b (aktuell) nach oben
                                if (aCurrent && bCurrent) return bTotal - aTotal; // BEIDE aktuell -> neuesten Start-Zeitpunkt ganz nach oben packen! (damit fortlaufend das Neueste oberstes ist)
                                return aTotal - bTotal; // Sonst chronologisch
                            })
                            .map((ev, index) => {
                            const [evH, evM] = ev.time.split(':').map(Number);
                            const evTotal = evH * 60 + evM;
                            const curTotal = h * 60 + m;
                            
                            const isCurrent = evTotal <= curTotal && evTotal >= curTotal - 15; 
                            
                            // User Wunsch: Nicht aktiv = Gelb (#ffcc00), Aktiv = Grün (#00ff88)
                            const textColor = isCurrent ? '#00ff88' : '#ffcc00';
                            const titleColor = isCurrent ? '#00ff88' : '#ffcc00';
                            const descColor = isCurrent ? '#fff' : '#ffcc00';
                            const bgHighlight = isCurrent ? 'rgba(0,255,136,0.15)' : 'rgba(0,0,0,0.3)';
                            const borderCol = isCurrent ? '#00ff88' : '#cc9900';
                            
                            return (
                                <div 
                                    key={`timeline-${ev.time}-${index}`}
                                    style={{
                                        display: 'flex',
                                        gap: '12px',
                                        fontSize: '14px', // Vergrößert wie Streifen-Protokoll
                                        fontFamily: 'monospace',
                                        padding: '10px 12px',
                                        background: bgHighlight,
                                        borderRadius: '6px',
                                        borderLeft: `3px solid ${borderCol}`,
                                        opacity: 1
                                    }}
                                >
                                    <div style={{ fontWeight: 'bold', color: titleColor, minWidth: '45px' }}>{ev.time}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ color: textColor }}>{ev.action} {ev.npcType} {ev.count > 0 ? `(${ev.count}x)` : ''}</div>
                                        <div style={{ color: descColor, marginTop: '4px', fontSize: '13px', fontStyle: 'italic', fontFamily: '"Outfit", sans-serif' }}>
                                            {ev.description.replace(/^.{5} — /, '')}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div style={{ 
                pointerEvents: 'none', // click through leiste
                position: 'absolute', 
                bottom: '40px', 
                left: '50%', 
                transform: 'translateX(-50%)', 
                padding: '0', 
                background: 'transparent', 
                display: 'flex',
                alignItems: 'center',
                gap: '16px', 
            }}>
                {/* Reverse Speed */}
                <div style={{ display: 'flex', gap: '2px' }}>
                    {revSpeeds.reverse().map(s => (
                        <button 
                            key={s} 
                            onClick={() => setTimeSpeed(s)} 
                            style={{ 
                                ...btnStyle,
                                background: timeSpeed === s ? 'rgba(255,68,68,0.3)' : 'rgba(255,255,255,0.03)',
                                borderColor: timeSpeed === s ? '#ff4444' : 'rgba(255,255,255,0.08)',
                                color: timeSpeed === s ? '#ff6666' : timeColor,
                                fontWeight: timeSpeed === s ? 'bold' : 'normal',
                                boxShadow: timeSpeed === s ? '0 0 6px rgba(255,68,68,0.4)' : 'none'
                            }}
                        >
                            ◀{Math.abs(s)}x
                        </button>
                    ))}
                </div>

                <div style={{ height: '36px', width: '2px', background: 'rgba(255,255,255,0.15)' }} />

                {/* Hour and Minute buttons + Pause */}
                <button onClick={rewindHour} style={{...btnStyle, color: timeColor}} title="1 Stunde zurück">-1H</button>
                <button onClick={rewindMinute} style={{...btnStyle, color: timeColor}} title="1 Minute zurück">-1M</button>
                <button 
                    onClick={toggleTimePause} 
                    style={{ 
                        ...btnStyle, 
                        minWidth: '60px',
                        borderColor: isTimePaused ? '#2e7d32' : '#c62828',
                        color: isTimePaused ? '#4caf50' : '#ff5252'
                    }}
                >
                    {isTimePaused ? '▶' : '⏸'}
                </button>
                <button onClick={advanceMinute} style={{...btnStyle, color: timeColor}} title="1 Minute vor">+1M</button>
                <button onClick={advanceHour} style={{...btnStyle, color: timeColor}} title="1 Stunde vor">+1H</button>

                <div style={{ height: '36px', width: '2px', background: 'rgba(255,255,255,0.15)' }} />

                {/* Forward Speed */}
                <div style={{ display: 'flex', gap: '2px' }}>
                    {fwdSpeeds.map(s => (
                        <button 
                            key={s} 
                            onClick={() => setTimeSpeed(s)} 
                            style={{ 
                                ...btnStyle,
                                background: timeSpeed === s ? 'rgba(0,204,255,0.3)' : 'rgba(255,255,255,0.03)',
                                borderColor: timeSpeed === s ? '#00ccff' : 'rgba(255,255,255,0.08)',
                                color: timeSpeed === s ? '#00ccff' : timeColor,
                                fontWeight: timeSpeed === s ? 'bold' : 'normal',
                                boxShadow: timeSpeed === s ? '0 0 6px rgba(0,204,255,0.4)' : 'none'
                            }}
                        >
                            {s}x▶
                        </button>
                    ))}
                </div>

                <div style={{ height: '36px', width: '2px', background: 'rgba(255,255,255,0.15)' }} />

                {/* Time + Datum + Direction */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                    <span style={{ 
                        color: isReverse ? '#ff6666' : timeColor,
                        fontSize: '28px', // verdoppelt
                        fontWeight: 'bold', 
                        fontFamily: 'monospace',
                        textShadow: `0 0 12px ${isReverse ? 'rgba(255,68,68,0.4)' : timeShadow}`
                    }}>
                        {isReverse ? '◀ ' : ''}{inGameTime}{!isReverse ? ' ▶' : ''}
                    </span>
                    <span style={{ color: '#666', fontSize: '14px', fontFamily: 'monospace', letterSpacing: '1px' }}>
                        Mi, 17. März 2021
                    </span>
                </div>
                <span style={{ color: isReverse ? '#ff4444' : '#00ccff', fontWeight: 'bold', fontSize: '20px' }}>
                    {absSpeed}x
                </span>

                <div style={{ height: '36px', width: '2px', background: 'rgba(255,255,255,0.15)' }} />

                {/* Eskalation + NPC Count */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', pointerEvents: 'auto', background: 'rgba(10,10,10,0.6)', padding: '10px 20px', borderRadius: '12px', backdropFilter: 'blur(5px)' }}>
                    <span style={{ 
                        color: tensionLevel > 70 ? '#ff4444' : tensionLevel > 40 ? '#ffaa00' : '#00ccff',
                        fontWeight: 'bold', fontSize: '20px', fontFamily: 'monospace'
                    }}>
                        ⚡{tensionLevel}%
                    </span>
                    <span style={{ color: '#00ccff', fontWeight: 'bold', fontSize: '22px' }}>👥{npcCount}</span>
                    <span style={{ color: '#ffcc00', fontWeight: 'bold', fontSize: '18px', fontFamily: 'monospace' }}>🛡️{selectedSquad}</span>
                </div>

                <div style={{ height: '36px', width: '2px', background: 'rgba(255,255,255,0.15)' }} />

                {/* Volume / Audio Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'auto', background: 'rgba(10,10,10,0.6)', padding: '10px 16px', borderRadius: '12px', backdropFilter: 'blur(5px)', border: '2px solid rgba(255,255,255,0.08)' }}>
                    <button 
                        onClick={() => setMuted(!muted)}
                        style={{
                            background: 'none', border: 'none', color: muted ? '#ff4444' : '#00ff88',
                            fontSize: '24px', cursor: 'pointer', padding: '0', lineHeight: 1
                        }}
                    >
                        {muted ? '🔇' : '🔊'}
                    </button>
                    <input
                        type="range" min="0" max="100" value={muted ? 0 : Math.round(masterVolume * 100)}
                        onChange={(e) => {
                            const val = parseInt(e.target.value) / 100;
                            setMasterVolume(val);
                            if (val > 0 && muted) setMuted(false);
                        }}
                        style={{
                            width: '100px', height: '6px', appearance: 'none',
                            background: `linear-gradient(to right, #00ccff ${masterVolume * 100}%, rgba(255,255,255,0.15) ${masterVolume * 100}%)`,
                            borderRadius: '3px', outline: 'none', cursor: 'pointer', accentColor: '#00ccff'
                        }}
                    />
                    <span style={{ color: '#888', fontSize: '18px', fontFamily: 'monospace', minWidth: '40px', fontWeight: 'bold' }}>
                        {muted ? ' 0%' : `${Math.round(masterVolume * 100)}%`}
                    </span>
                </div>
            </div>

            {/* Taktik-Menü */}
            {ui.showTacticsMenu && (
                <div style={{ pointerEvents: 'auto', position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '520px', maxWidth: '92vw', background: 'rgba(10,10,10,0.92)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', padding: '18px 18px 14px 18px', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <div style={{ color: '#00ccff', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase' }}>Taktik-Menü</div>
                            <div style={{ color: '#666', fontFamily: 'monospace' }}>C</div>
                        </div>
                        <div style={{ color: '#ddd', fontSize: '13px', marginBottom: '12px' }}>Wähle eine Anweisung. Auswirkungen sind sofort sichtbar (Reputation/Moral/Tension).</div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                            <button onClick={() => { setTension(Math.max(0, tensionLevel - 10)); adjustReputation(5); setMoralScore(Math.min(100, 50 + 5)); toggleTacticsMenu(); }} style={menuBtnStyle}>A — Deeskalation / Abstand halten</button>
                            <button onClick={() => { setTension(Math.min(100, tensionLevel + 5)); adjustReputation(-2); toggleTacticsMenu(); }} style={menuBtnStyle}>B — Präsenz zeigen / Linie halten</button>
                            <button onClick={() => { setTension(Math.min(100, tensionLevel + 15)); adjustReputation(-10); setMoralScore(Math.max(0, 50 - 8)); toggleTacticsMenu(); }} style={menuBtnStyle}>C — Hartes Vorgehen / Durchsetzen</button>
                            <button onClick={() => { setTension(Math.max(0, tensionLevel - 5)); adjustReputation(2); toggleTacticsMenu(); }} style={menuBtnStyle}>D — Kommunikation / Sprecher anfordern</button>
                        </div>

                        <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={toggleTacticsMenu} style={{ ...btnStyle, minWidth: '110px' }}>Schließen</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Dialog-System: Martin Krause */}
            {ui.showDialog && (
                <div style={{ pointerEvents: 'auto', position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '560px', maxWidth: '92vw', background: 'rgba(10,10,10,0.92)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', padding: '18px', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <div style={{ color: '#ffcc00', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase' }}>Dialog</div>
                            <div style={{ color: '#666', fontFamily: 'monospace' }}>ESC</div>
                        </div>

                        {ui.dialogStep === 0 && (
                            <>
                                <div style={{ color: '#fff', fontSize: '15px', lineHeight: 1.5, marginBottom: '14px' }}>
                                    Martin Krause: “Was willst du hier erreichen?”
                                </div>
                                <div style={{ display: 'grid', gap: '10px' }}>
                                    <button onClick={() => { adjustReputation(6); setMoralScore(60); setTension(Math.max(0, tensionLevel - 5)); chooseDialogOption(1); }} style={menuBtnStyle}>1 — Deeskalieren und schützen</button>
                                    <button onClick={() => { adjustReputation(-5); setMoralScore(45); setTension(Math.min(100, tensionLevel + 5)); chooseDialogOption(2); }} style={menuBtnStyle}>2 — Ordnung durchsetzen</button>
                                    <button onClick={() => { adjustReputation(2); setMoralScore(55); chooseDialogOption(3); }} style={menuBtnStyle}>3 — Nur beobachten und dokumentieren</button>
                                    <button onClick={() => { adjustReputation(-10); setMoralScore(35); setTension(Math.min(100, tensionLevel + 10)); chooseDialogOption(4); }} style={menuBtnStyle}>4 — “Mir egal.”</button>
                                    <button onClick={() => { closeDialog(); }} style={menuBtnStyle}>5 — Gespräch beenden</button>
                                </div>
                            </>
                        )}

                        {ui.dialogStep !== 0 && (
                            <>
                                <div style={{ color: '#fff', fontSize: '15px', lineHeight: 1.5, marginBottom: '14px' }}>
                                    Martin Krause: “Alles klar. Ich werde das so festhalten.”
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                    <button onClick={closeDialog} style={{ ...btnStyle, minWidth: '130px' }}>Beenden</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const btnStyle: React.CSSProperties = {
    background: 'rgba(10,10,10,0.6)',
    border: '2px solid rgba(255,255,255,0.08)',
    color: '#888',
    padding: '6px 12px', // verdoppelt
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px', // verdoppelt
    fontWeight: 'bold',
    transition: 'all 0.15s ease',
    outline: 'none',
    minWidth: '45px', // verdoppelt
    pointerEvents: 'auto',
    backdropFilter: 'blur(5px)',
};

const menuBtnStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: '#ffffff',
    padding: '12px 12px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 700,
    textAlign: 'left',
};
