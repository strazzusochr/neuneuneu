import { create } from 'zustand';
import { NPCType, EmotionalState, NPCMood, NPCBehavior } from '../types/enums';
import { workerManager } from '../managers/WorkerManager';
import { EVENT_TIMELINE, TENSION_TIMELINE, PHASE_DESCRIPTIONS, NPC_COLORS, MAX_ACTIVE_NPCS, timeToMinutes } from '../systems/eventScheduler';
import { io } from 'socket.io-client';

const socket = io(window.location.origin, { autoConnect: false });
let suppressTimeEcho = false;
let lastTimeEmitValue: string | null = null;
let lastTimeEmitMs = 0;
const TIME_EMIT_MIN_MS = 250;

function maybeEmitTimeSync(time: string) {
    if (suppressTimeEcho) return;
    if (!socket.connected) return;
    const now = performance.now();
    if (lastTimeEmitValue === time && now - lastTimeEmitMs < 1000) return;
    if (now - lastTimeEmitMs < TIME_EMIT_MIN_MS) return;
    lastTimeEmitValue = time;
    lastTimeEmitMs = now;
    socket.emit('update-time', time);
}

type ServerWorldState = {
    inGameTime: string;
    tension?: number;
    stats?: {
        killed?: number;
        arrested?: number;
        injured?: number;
        damage?: number;
    };
};

export interface NPCData {
    id: number;
    type: NPCType;
    position: [number, number, number];
    rotation: number;
    outfitColor: string;
    emotionalState: EmotionalState;
    mood: NPCMood;
    behavior: NPCBehavior;
}

interface GameStore {
    npcs: NPCData[];
    firedEventKeys: string[];
    playerPosition: [number, number, number];
    lowPowerMode: boolean;
    selectedSquad: number;
    squadTarget: [number, number, number] | null;
    ui: {
        showMinimap: boolean;
        showTacticsMenu: boolean;
        showDialog: boolean;
        dialogStep: number;
    };
    polyStats: { totalTriangles: number; visibleInstances: number };
    gameState: { 
        isPlaying: boolean; 
        isTimePaused: boolean; 
        inGameTime: string; 
        tensionLevel: number;
        timeSpeed: number;
        currentPhaseLabel: string;
        // === CHUNK 11: Dynamisches System ===
        playerReputation: number;  // -100 (brutal) bis +100 (fair)
        moralScore: number;        // 0 (böse) bis 100 (gut)
        showStatistics: boolean;   // Statistik-Screen bei 00:00
        masterVolume: number;
        muted: boolean;
    };
    dayStats: {
        killed: number;
        arrested: number;
        injured: number;
        damage: number;  // Sachschaden in €
    };
    startGame: () => void;
    updateTime: (time: string) => void;
    advanceHour: () => void;
    rewindHour: () => void;
    advanceMinute: () => void;
    rewindMinute: () => void;
    toggleTimePause: () => void;
    setTension: (level: number) => void;
    evaluateEvents: (currentTime: string) => void;
    resetDayCycle: () => void;
    setTimeSpeed: (speed: number) => void;
    adjustReputation: (delta: number) => void;
    dismissStatistics: () => void;
    setMasterVolume: (vol: number) => void;
    setMuted: (muted: boolean) => void;
    initSocket: () => void;
    updatePlayerPosition: (pos: [number, number, number]) => void;
    setLowPowerMode: (enabled: boolean) => void;
    selectSquad: (squad: number) => void;
    issueSquadMove: (target: [number, number, number]) => void;
    toggleMinimap: () => void;
    toggleTacticsMenu: () => void;
    openDialog: () => void;
    closeDialog: () => void;
    chooseDialogOption: (option: number) => void;
    setMoralScore: (value: number) => void;
    setPolyStats: (stats: { totalTriangles: number; visibleInstances: number }) => void;
}

let nextNpcId = 1000;

/** Helper: create NPCs of a given type at a position with radius */
function createNpcs(
    type: NPCType, count: number, position: [number, number, number], radius: number,
    mood: NPCMood = NPCMood.PEACEFUL, behavior: NPCBehavior = NPCBehavior.IDLE
): NPCData[] {
    const color = NPC_COLORS[type] || '#888888';
    return Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * radius;
        const x = position[0] + Math.cos(angle) * r;
        const z = position[2] + Math.sin(angle) * r;
        nextNpcId++;
        return {
            id: nextNpcId,
            type,
            position: [x, 1.2, z] as [number, number, number],
            rotation: Math.random() * Math.PI * 2,
            outfitColor: color,
            emotionalState: mood === NPCMood.PEACEFUL ? EmotionalState.PEACEFUL : EmotionalState.NEUTRAL,
            mood,
            behavior
        };
    });
}

/** Helper: remove N npcs of a type from an array (returns new array) */
function removeNpcs(npcs: NPCData[], type: NPCType, count: number): NPCData[] {
    if (count === -1) {
        return npcs.filter(n => n.type !== type);
    }
    const targets = npcs.filter(n => n.type === type);
    const toRemoveIds = new Set(
        targets.sort(() => Math.random() - 0.5).slice(0, count).map(n => n.id)
    );
    return npcs.filter(n => !toRemoveIds.has(n.id));
}

export const useGameStore = create<GameStore>((set, get) => ({
    npcs: [],
    firedEventKeys: [],
    playerPosition: [0, 1.2, 10],
    lowPowerMode: true,
    selectedSquad: 1,
    squadTarget: null,
    ui: { showMinimap: false, showTacticsMenu: false, showDialog: false, dialogStep: 0 },
    polyStats: { totalTriangles: 0, visibleInstances: 0 },
    dayStats: { killed: 0, arrested: 0, injured: 0, damage: 0 },
    gameState: { 
        isPlaying: false, isTimePaused: false, inGameTime: '06:00', 
        tensionLevel: 10, timeSpeed: 1, 
        currentPhaseLabel: '🌅 Tagesbeginn — Stadt erwacht',
        playerReputation: 0, moralScore: 50, showStatistics: false,
        masterVolume: 0.5, muted: false
    },

    initSocket: () => {
        if (socket.connected) return;
        socket.connect();
        socket.on('init-state', (state: ServerWorldState) => {
            suppressTimeEcho = true;
            get().evaluateEvents(state.inGameTime);
            if (typeof state?.tension === 'number') get().setTension(state.tension);
            suppressTimeEcho = false;
        });
        socket.on('time-sync', (time: string) => {
            const gs = get().gameState;
            if (gs.isPlaying && !gs.isTimePaused) return;
            suppressTimeEcho = true;
            get().evaluateEvents(time);
            suppressTimeEcho = false;
        });
        socket.on('world_update', (state: ServerWorldState) => {
            if (!state?.inGameTime) return;
            const gs = get().gameState;
            if (gs.isPlaying && !gs.isTimePaused) return;
            suppressTimeEcho = true;
            get().evaluateEvents(state.inGameTime);
            if (typeof state?.tension === 'number') get().setTension(state.tension);
            suppressTimeEcho = false;
        });
    },

    updatePlayerPosition: (pos) => set({ playerPosition: pos }),

    setLowPowerMode: (enabled) => set({ lowPowerMode: enabled }),

    selectSquad: (squad) => set((state) => ({
        selectedSquad: Math.max(1, Math.min(9, squad)),
        ui: { ...state.ui, showTacticsMenu: false }
    })),

    issueSquadMove: (target) => {
        const { npcs, selectedSquad } = get();
        const police = npcs.filter(n => n.type === NPCType.POLICE);
        const riot = npcs.filter(n => n.type === NPCType.RIOT_POLICE);
        const sek = npcs.filter(n => n.type === NPCType.SEK);

        const squads: NPCData[][] = [];
        const chunkInto = (arr: NPCData[], chunkCount: number) => {
            const chunkSize = Math.max(1, Math.ceil(arr.length / chunkCount));
            for (let i = 0; i < arr.length; i += chunkSize) squads.push(arr.slice(i, i + chunkSize));
        };

        chunkInto(police, 3);
        chunkInto(riot, 3);
        chunkInto(sek, 3);

        const idx = selectedSquad - 1;
        const members = squads[idx] ?? [];
        const ids = members.map(n => n.id);
        if (ids.length > 0) {
            workerManager.moveNpcsToTarget(ids, target);
        }
        set({ squadTarget: target });
    },

    toggleMinimap: () => set((state) => ({
        ui: { ...state.ui, showMinimap: !state.ui.showMinimap }
    })),

    toggleTacticsMenu: () => set((state) => ({
        ui: { ...state.ui, showTacticsMenu: !state.ui.showTacticsMenu }
    })),

    openDialog: () => set((state) => ({
        ui: { ...state.ui, showDialog: true, dialogStep: 0, showTacticsMenu: false }
    })),

    closeDialog: () => set((state) => ({
        ui: { ...state.ui, showDialog: false, dialogStep: 0 }
    })),

    chooseDialogOption: (option) => set((state) => {
        const next = Math.max(0, Math.min(4, option));
        return { ui: { ...state.ui, dialogStep: next } };
    }),

    setMoralScore: (value) => set((state) => ({
        gameState: { ...state.gameState, moralScore: Math.max(0, Math.min(100, value)) }
    })),
    setPolyStats: (stats) => set({ polyStats: stats }),

    startGame: () => {
        nextNpcId = 1000;
        set({ 
            npcs: [],
            firedEventKeys: [],
            squadTarget: null,
            selectedSquad: 1,
            ui: { showMinimap: false, showTacticsMenu: false, showDialog: false, dialogStep: 0 },
            dayStats: { killed: 0, arrested: 0, injured: 0, damage: 0 },
            gameState: { 
                isPlaying: true, isTimePaused: false, inGameTime: '06:00', 
                tensionLevel: 10, timeSpeed: 1, 
                currentPhaseLabel: '🌅 Tagesbeginn — Stadt erwacht',
                playerReputation: 0, moralScore: 50, showStatistics: false,
                masterVolume: 0.5, muted: false
            }
        });
        setTimeout(() => get().evaluateEvents('06:00'), 200);
    },

    /**
     * ATOMIC evaluateEvents: ALL changes in ONE set() call.
     * No race conditions, no stale state.
     */
    evaluateEvents: (currentTime: string) => {
        set((state) => {
            const currentMinutes = timeToMinutes(currentTime);
            const firedSet = new Set(state.firedEventKeys);
            let npcs = [...state.npcs];
            const moveCommands: { ids: number[], target: [number, number, number] }[] = [];

            // Process all events up to current time
            EVENT_TIMELINE.forEach((event, index) => {
                const eventKey = `evt-${index}`;
                const eventMinutes = timeToMinutes(event.time);

                if (eventMinutes <= currentMinutes && !firedSet.has(eventKey)) {
                    firedSet.add(eventKey);

                    if (event.action === 'SPAWN' && event.position) {
                        const maxCanSpawn = Math.max(0, MAX_ACTIVE_NPCS - npcs.length);
                        const count = Math.min(event.count, maxCanSpawn);
                        if (count > 0) {
                            const newNpcs = createNpcs(event.npcType, count, event.position, event.radius || 5, event.mood, event.behavior);
                            npcs = [...npcs, ...newNpcs];
                        }
                    } else if (event.action === 'DESPAWN') {
                        npcs = removeNpcs(npcs, event.npcType, event.count);
                    } else if (event.action === 'MOVE' && event.position) {
                        const ids = npcs.filter(n => n.type === event.npcType).map(n => n.id);
                        moveCommands.push({ ids, target: event.position });
                    } else if (event.action === 'MOOD_CHANGE') {
                        // Update mood and behavior of all NPCs of this type
                        npcs = npcs.map(n => {
                            if (n.type === event.npcType) {
                                return {
                                    ...n,
                                    mood: event.targetMood || n.mood,
                                    behavior: event.targetBehavior || n.behavior
                                };
                            }
                            return n;
                        });
                    } else if (event.action === 'BEHAVIOR_CHANGE') {
                        npcs = npcs.map(n => {
                            if (n.type === event.npcType) {
                                return { ...n, behavior: event.targetBehavior || n.behavior };
                            }
                            return n;
                        });
                    }
                }
            });

            // Update tension
            let tensionLevel = state.gameState.tensionLevel;
            for (const t of TENSION_TIMELINE) {
                if (timeToMinutes(t.time) <= currentMinutes) {
                    tensionLevel = t.level;
                }
            }

            // Update phase label
            let currentPhaseLabel = state.gameState.currentPhaseLabel;
            for (const p of PHASE_DESCRIPTIONS) {
                if (timeToMinutes(p.time) <= currentMinutes) {
                    currentPhaseLabel = p.label;
                }
            }

            // Sync worker AFTER computing final NPC list
            workerManager.syncNpcs(npcs);
            workerManager.sendTimeSync(currentTime);
            moveCommands.forEach(cmd => workerManager.moveNpcsToTarget(cmd.ids, cmd.target));

            maybeEmitTimeSync(currentTime);

            return {
                npcs,
                firedEventKeys: Array.from(firedSet),
                gameState: { ...state.gameState, inGameTime: currentTime, tensionLevel, currentPhaseLabel }
            };
        });
    },

    updateTime: (time) => {
        const state = get();
        const currentMinutes = timeToMinutes(state.gameState.inGameTime);
        const nextMinutes = timeToMinutes(time);
        if (nextMinutes >= currentMinutes) {
            get().evaluateEvents(time);
            return;
        }
        set((s) => {
            nextNpcId = 1000;
            const targetMinutes = nextMinutes;
            const firedSet = new Set<string>();
            let npcs: NPCData[] = [];
            const moveCommands: { ids: number[], target: [number, number, number] }[] = [];

            EVENT_TIMELINE.forEach((event, index) => {
                const eventKey = `evt-${index}`;
                const eventMinutes = timeToMinutes(event.time);
                if (eventMinutes <= targetMinutes) {
                    firedSet.add(eventKey);
                    if (event.action === 'SPAWN' && event.position) {
                        const maxCanSpawn = Math.max(0, MAX_ACTIVE_NPCS - npcs.length);
                        const count = Math.min(event.count, maxCanSpawn);
                        if (count > 0) {
                            const newNpcs = createNpcs(event.npcType, count, event.position, event.radius || 5, event.mood, event.behavior);
                            npcs = [...npcs, ...newNpcs];
                        }
                    } else if (event.action === 'DESPAWN') {
                        npcs = removeNpcs(npcs, event.npcType, event.count);
                    } else if (event.action === 'MOVE' && event.position) {
                        const ids = npcs.filter(n => n.type === event.npcType).map(n => n.id);
                        moveCommands.push({ ids, target: event.position });
                    } else if (event.action === 'MOOD_CHANGE') {
                        npcs = npcs.map(n => {
                            if (n.type === event.npcType) {
                                return {
                                    ...n,
                                    mood: event.targetMood || n.mood,
                                    behavior: event.targetBehavior || n.behavior
                                };
                            }
                            return n;
                        });
                    } else if (event.action === 'BEHAVIOR_CHANGE') {
                        npcs = npcs.map(n => {
                            if (n.type === event.npcType) {
                                return { ...n, behavior: event.targetBehavior || n.behavior };
                            }
                            return n;
                        });
                    }
                }
            });

            let tensionLevel = s.gameState.tensionLevel;
            for (const t of TENSION_TIMELINE) {
                if (timeToMinutes(t.time) <= targetMinutes) {
                    tensionLevel = t.level;
                }
            }

            let currentPhaseLabel = s.gameState.currentPhaseLabel;
            for (const p of PHASE_DESCRIPTIONS) {
                if (timeToMinutes(p.time) <= targetMinutes) {
                    currentPhaseLabel = p.label;
                }
            }

            workerManager.syncNpcs(npcs);
            moveCommands.forEach(cmd => workerManager.moveNpcsToTarget(cmd.ids, cmd.target));
            maybeEmitTimeSync(time);

            return {
                npcs,
                firedEventKeys: Array.from(firedSet),
                gameState: { ...s.gameState, inGameTime: time, tensionLevel, currentPhaseLabel }
            };
        });
    },

    advanceHour: () => {
        const state = get();
        let [h, m] = state.gameState.inGameTime.split(':').map(Number);
        h = (h + 1) % 24;
        const newTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        get().evaluateEvents(newTime);
    },

    rewindHour: () => {
        const state = get();
        let [h, m] = state.gameState.inGameTime.split(':').map(Number);
        h = (h - 1 + 24) % 24;
        const newTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        get().updateTime(newTime);
    },

    advanceMinute: () => {
        const state = get();
        let [h, m] = state.gameState.inGameTime.split(':').map(Number);
        m += 1;
        if (m >= 60) {
            m -= 60;
            h = (h + 1) % 24;
        }
        const newTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        get().evaluateEvents(newTime);
    },

    rewindMinute: () => {
        const state = get();
        let [h, m] = state.gameState.inGameTime.split(':').map(Number);
        m -= 1;
        if (m < 0) {
            m += 60;
            h = (h - 1 + 24) % 24;
        }
        const newTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        get().updateTime(newTime);
    },

    toggleTimePause: () => set((state) => ({
        gameState: { ...state.gameState, isTimePaused: !state.gameState.isTimePaused }
    })),

    setTension: (level) => set((state) => {
        workerManager.sendTension(level);
        return { gameState: { ...state.gameState, tensionLevel: level } };
    }),

    resetDayCycle: () => {
        nextNpcId = 1000;
        set({
            npcs: [],
            firedEventKeys: [],
            dayStats: { killed: 0, arrested: 0, injured: 0, damage: 0 },
            gameState: { 
                isPlaying: true, isTimePaused: false, inGameTime: '00:00', 
                tensionLevel: 10, timeSpeed: get().gameState.timeSpeed, 
                currentPhaseLabel: '🌅 Tagesbeginn — Stadt erwacht',
                playerReputation: get().gameState.playerReputation,
                moralScore: get().gameState.moralScore,
                showStatistics: false,
                masterVolume: get().gameState.masterVolume,
                muted: get().gameState.muted
            }
        });
    },

    setTimeSpeed: (speed) => set((state) => ({
        gameState: { ...state.gameState, timeSpeed: speed }
    })),

    adjustReputation: (delta) => set((state) => ({
        gameState: { 
            ...state.gameState, 
            playerReputation: Math.max(-100, Math.min(100, state.gameState.playerReputation + delta))
        }
    })),

    dismissStatistics: () => set((state) => ({
        gameState: { ...state.gameState, showStatistics: false }
    })),

    setMasterVolume: (val) => set((state) => ({
        gameState: { ...state.gameState, masterVolume: val }
    })),

    setMuted: (muted) => set((state) => ({
        gameState: { ...state.gameState, muted }
    }))
}));
