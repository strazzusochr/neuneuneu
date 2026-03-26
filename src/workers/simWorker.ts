/**
 * 🚀 INFINITE ENGINE - V3.0 — 24H MASTER PLAN VOLLSTÄNDIG
 * Off-thread simulation mit ALLEN Behavior-Presets aus dem Master Plan.
 *
 * BEHAVIORS:
 *   IDLE          — stehen, leichtes Schwanken
 *   WANDER        — Zivilisten langsam zufällig
 *   JOG           — Jogger schnell entlang Route
 *   PATROL        — Polizei-Patrouille
 *   GATHER        — Demonstranten sammeln sich
 *   CHANT         — Sprechchöre, Rhythmus-Schwanken
 *   HOLD_SIGN     — Schild hochhalten
 *   FLEE          — Panik-Flucht vom Zentrum weg
 *   ATTACK        — Aggressiv auf Feind zubewegen
 *   FOLLOW        — Anführer folgen (Extremisten-Marsch)
 *   SHIELD_WALL   — Polizei Linie halten
 *   SURROUND      — SEK Kreis-Formation
 *   THROW         — Objekte werfen (Flaschen, Steine)
 *   COMBAT        — Nahkampf (Schlagstock vs Eisenstange)
 *   CLEANUP       — Aufräumen (Feuerwehr, Sanitäter)
 *   GUARD         — Checkpoint bewachen (Nacht)
 *   RETREAT       — Geordneter Rückzug
 */

interface WorkerNPC {
    id: number;
    type: string;
    behavior: string;
    x: number;
    z: number;
    rotY: number;
    speed: number;
    targetX?: number;
    targetZ?: number;
    behaviorTimer: number;
    homeX: number;
    homeZ: number;
    swayPhase: number;
    /** Animation flag: 0=idle, 1=walking, 2=combat, 3=fallen */
    animState: number;
    hp: number;
    knockbackX: number;
    knockbackZ: number;
    lastHitTime: number;
}

let npcs: WorkerNPC[] = [];
let isRunning = false;
let lastTick = performance.now();
const FLOATS_PER_NPC = 12;
let outputBuffer: Float32Array;
let maxInstances = 500;
let currentTension = 10;
let inGameTimeMinutes = 360; // Start at 06:00

const getSpeed = (type: string, behavior: string): number => {
    if (behavior === 'IDLE' || behavior === 'GUARD') return 0.2;
    switch (behavior) {
        case 'JOG':         return 3.0;
        case 'FLEE':        return 5.5;   // Panik = schnell!
        case 'RETREAT':     return 3.5;
        case 'ATTACK':      return 3.8;
        case 'COMBAT':      return 1.5;   // Nahkampf = langsamer
        case 'FOLLOW':      return 2.5;   // Marsch
        case 'PATROL':      return 1.2;
        case 'WANDER':      return 0.8;
        case 'GATHER':      return 1.0;
        case 'HOLD_SIGN':   return 0.3;
        case 'CHANT':       return 0.4;
        case 'SHIELD_WALL': return 0.6;   // Formation: langsam
        case 'SURROUND':    return 1.5;   // Umzingelung: mittel
        case 'THROW':       return 0.8;   // Werfen: stehen bleiben
        case 'CLEANUP':     return 0.6;   // Aufräumen
        default: break;
    }
    let base = 1.4;
    switch (type) {
        case 'RIOT_POLICE': case 'SEK': base = 2.4; break;
        case 'EXTREMIST': base = 2.2; break;
        case 'POLICE': base = 1.8; break;
        case 'MEDIC': case 'FIREFIGHTER': base = 1.2; break;
        default: base = 1.5; break;
    }
    return base * (1 + (currentTension / 100) * 0.3);
};

self.onmessage = (e: MessageEvent) => {
    const { type, payload } = e.data;
    if (type === 'INIT') {
        maxInstances = payload.maxInstances || 500;
        outputBuffer = new Float32Array(maxInstances * FLOATS_PER_NPC);
        npcs = (payload.npcs || []).map((n: any) => ({
            id: n.id,
            type: n.type,
            behavior: n.behavior || 'IDLE',
            x: n.position[0],
            z: n.position[2],
            rotY: n.rotation || 0,
            speed: getSpeed(n.type, n.behavior || 'IDLE'),
            behaviorTimer: Math.random() * 3,
            homeX: n.position[0],
            homeZ: n.position[2],
            swayPhase: Math.random() * Math.PI * 2,
            animState: 0,
            hp: 100,
            knockbackX: 0,
            knockbackZ: 0,
            lastHitTime: 0
        }));
        if (!isRunning) { isRunning = true; tick(); }
    }
    if (type === 'SET_TENSION') {
        currentTension = payload;
    }
    if (type === 'SYNC_NPCS') {
        const synced = payload as any[];
        const syncedMap = new Map(synced.map((r: any) => [r.id, r]));
        
        // Update existing
        npcs = npcs.filter(n => syncedMap.has(n.id)).map(n => {
            const raw = syncedMap.get(n.id)!;
            if (raw.behavior !== n.behavior && n.hp > 0) {
                n.behavior = raw.behavior;
                n.speed = getSpeed(n.type, n.behavior);
                n.targetX = undefined;
                n.targetZ = undefined;
                n.behaviorTimer = 0;
            }
            // Sync position if it's a hard reset (optional, usually simulation takes over)
            return n;
        });
        
        // Add new
        synced.forEach(raw => {
            if (!npcs.some(n => n.id === raw.id)) {
                npcs.push({
                    id: raw.id,
                    type: raw.type,
                    behavior: raw.behavior || 'IDLE',
                    x: raw.position[0],
                    z: raw.position[2],
                    rotY: raw.rotation || 0,
                    speed: getSpeed(raw.type, raw.behavior || 'IDLE'),
                    behaviorTimer: Math.random() * 3,
                    homeX: raw.position[0],
                    homeZ: raw.position[2],
                    swayPhase: Math.random() * Math.PI * 2,
                    animState: 0,
                    hp: 100,
                    knockbackX: 0,
                    knockbackZ: 0,
                    lastHitTime: 0
                });
            }
        });
    }
    if (type === 'UPDATE_TIME') {
        const [h, m] = payload.split(':').map(Number);
        inGameTimeMinutes = h * 60 + m;
    }
    if (type === 'MOVE_TO_TARGET') {
        const { ids, target } = payload;
        const targetIds = new Set(ids as number[]);
        npcs.forEach(npc => {
            if (targetIds.has(npc.id) && npc.hp > 0) {
                npc.targetX = target[0] + (Math.random() - 0.5) * 10;
                npc.targetZ = target[2] + (Math.random() - 0.5) * 10;
                npc.behavior = 'FOLLOW';
                npc.speed = getSpeed(npc.type, 'FOLLOW');
            }
        });
    }
};

/**
 * BRUTAL AI LOGIC — DAMAGE, KNOCKBACK, DEATH
 */
function updateBehaviors(dt: number) {
    const demoCenter = { x: 0, z: 12 };
    const platzCenter = { x: 0, z: 0 };
    const now = performance.now();

    // 1. Environmental Effects (Water Cannon, Tear Gas)
    const waterCannonActive = inGameTimeMinutes >= 780 && inGameTimeMinutes < 810; // 13:00
    const tearGasActive = inGameTimeMinutes >= 810 && inGameTimeMinutes < 870;     // 13:30

    for (const npc of npcs) {
        if (npc.hp <= 0) {
            npc.animState = 3; // FALLEN
            npc.behavior = 'IDLE';
            continue;
        }

        // --- WATER CANNON ---
        if (waterCannonActive && npc.z < 50 && npc.z > 10 && Math.abs(npc.x) < 15) {
            // Push back
            npc.knockbackZ = -15; 
            npc.hp -= 5 * dt; // Slight damage
            npc.animState = 3; // Stumble/Fall
        }

        // --- TEAR GAS ---
        if (tearGasActive && npc.z > 10 && npc.z < 30 && Math.abs(npc.x) < 20) {
            npc.speed *= 0.4; // Slow down
            npc.hp -= 2 * dt; // Choking damage
            if (Math.random() < 0.01) npc.behavior = 'FLEE';
        }

        // --- KNOCKBACK DECAY ---
        npc.x += npc.knockbackX * dt;
        npc.z += npc.knockbackZ * dt;
        npc.knockbackX *= 0.9;
        npc.knockbackZ *= 0.9;

        npc.behaviorTimer -= dt;
        npc.swayPhase += dt * 1.5;
        npc.animState = 0; 

        // --- COMBAT LOGIC ---
        if (npc.behavior === 'COMBAT') {
            const step = Math.max(1, Math.floor(npcs.length / 10));
            for (let j = 0; j < npcs.length; j += step) {
                const other = npcs[j];
                if (other.id === npc.id || other.hp <= 0) continue;
                
                // Friendly fire check
                const isAggressor = npc.type === 'EXTREMIST' || npc.type === 'RIOTER' || npc.type === 'DEMONSTRATOR';
                const otherIsAggressor = other.type === 'EXTREMIST' || other.type === 'RIOTER' || other.type === 'DEMONSTRATOR';
                if (isAggressor === otherIsAggressor) continue;

                const dx = other.x - npc.x;
                const dz = other.z - npc.z;
                const distSq = dx * dx + dz * dz;

                if (distSq < 4) { // 2m range
                    npc.animState = 2; // attacking
                    if (now - npc.lastHitTime > 800) { // Attack speed
                        other.hp -= 15;
                        other.lastHitTime = now;
                        // Apply knockback to victim
                        const dist = Math.sqrt(distSq) || 1;
                        other.knockbackX = (dx / dist) * 10;
                        other.knockbackZ = (dz / dist) * 10;
                    }
                }
            }
        }

        if (npc.behaviorTimer <= 0 && !npc.targetX) {
            switch (npc.behavior) {
                case 'WANDER':
                    npc.targetX = npc.homeX + (Math.random() - 0.5) * 30;
                    npc.targetZ = npc.homeZ + (Math.random() - 0.5) * 30;
                    npc.behaviorTimer = 3 + Math.random() * 5;
                    break;
                case 'JOG':
                    npc.targetX = npc.homeX + (Math.random() - 0.5) * 60;
                    npc.targetZ = npc.homeZ + (Math.random() - 0.5) * 60;
                    npc.behaviorTimer = 2 + Math.random() * 3;
                    break;
                case 'PATROL':
                    npc.targetX = npc.homeX + (Math.random() - 0.5) * 20;
                    npc.targetZ = npc.homeZ + (Math.random() - 0.5) * 8;
                    npc.behaviorTimer = 4 + Math.random() * 4;
                    break;
                case 'GATHER':
                    npc.targetX = demoCenter.x + (Math.random() - 0.5) * 15;
                    npc.targetZ = demoCenter.z + (Math.random() - 0.5) * 10;
                    npc.behaviorTimer = 5 + Math.random() * 5;
                    break;
                case 'HOLD_SIGN':
                    npc.targetX = npc.x + Math.sin(npc.swayPhase) * 0.5;
                    npc.targetZ = npc.z + Math.cos(npc.swayPhase * 0.7) * 0.3;
                    npc.behaviorTimer = 2 + Math.random() * 3;
                    break;
                case 'CHANT':
                    npc.targetX = npc.x + Math.sin(npc.swayPhase * 2) * 0.8;
                    npc.targetZ = npc.z + Math.cos(npc.swayPhase * 1.5) * 0.5;
                    npc.behaviorTimer = 1.5 + Math.random() * 2;
                    break;
                case 'SHIELD_WALL':
                    if (currentTension > 60) {
                        npc.targetX = npc.x + (Math.random() - 0.5) * 2;
                        npc.targetZ = npc.z - 0.5; 
                    } else {
                        npc.targetX = npc.x + (Math.random() - 0.5) * 1;
                        npc.targetZ = npc.z + (Math.random() - 0.5) * 0.5;
                    }
                    npc.behaviorTimer = 3 + Math.random() * 3;
                    break;
                case 'SURROUND':
                    {
                        const angle = Math.atan2(npc.z - platzCenter.z, npc.x - platzCenter.x);
                        const currentDist = Math.sqrt((npc.x - platzCenter.x) ** 2 + (npc.z - platzCenter.z) ** 2);
                        const targetDist = Math.max(15, currentDist - 3);
                        npc.targetX = platzCenter.x + Math.cos(angle + (Math.random()-0.5)*0.3) * targetDist;
                        npc.targetZ = platzCenter.z + Math.sin(angle + (Math.random()-0.5)*0.3) * targetDist;
                        npc.behaviorTimer = 3 + Math.random() * 4;
                    }
                    break;
                case 'THROW':
                    npc.targetX = npc.x + (Math.random() - 0.5) * 3;
                    npc.targetZ = npc.z + (Math.random() - 1) * 2;
                    npc.behaviorTimer = 1 + Math.random() * 2;
                    npc.animState = 2;
                    break;
                case 'COMBAT':
                    {
                        const isCop = npc.type === 'POLICE' || npc.type === 'RIOT_POLICE' || npc.type === 'SEK';
                        const enemies = npcs.filter(other => {
                            if (other.id === npc.id || other.hp <= 0) return false;
                            const otherIsAggressor = other.type === 'EXTREMIST' || other.type === 'RIOTER' || other.type === 'DEMONSTRATOR';
                            return isCop ? otherIsAggressor : (other.type === 'POLICE' || other.type === 'RIOT_POLICE' || other.type === 'SEK');
                        });
                        if (enemies.length > 0) {
                            let closest = enemies[0];
                            let minDist = Infinity;
                            for (const e of enemies) {
                                const d = (e.x - npc.x) ** 2 + (e.z - npc.z) ** 2;
                                if (d < minDist) { minDist = d; closest = e; }
                            }
                            npc.targetX = closest.x + (Math.random() - 0.5) * 1.5;
                            npc.targetZ = closest.z + (Math.random() - 0.5) * 1.5;
                            npc.animState = 2;
                        } else {
                            npc.targetX = platzCenter.x + (Math.random() - 0.5) * 20;
                            npc.targetZ = platzCenter.z + (Math.random() - 0.5) * 20;
                        }
                        npc.behaviorTimer = 0.5 + Math.random() * 1.5;
                    }
                    break;
                case 'FLEE':
                    {
                        const dx = npc.x - platzCenter.x;
                        const dz = npc.z - platzCenter.z;
                        const dist = Math.sqrt(dx * dx + dz * dz) || 1;
                        npc.targetX = npc.x + (dx / dist) * 30 + (Math.random() - 0.5) * 15;
                        npc.targetZ = npc.z + (dz / dist) * 30 + (Math.random() - 0.5) * 15;
                        npc.behaviorTimer = 2 + Math.random() * 3;
                    }
                    break;
                case 'FOLLOW':
                    if (!npc.targetX) {
                        npc.targetX = platzCenter.x + (Math.random() - 0.5) * 12;
                        npc.targetZ = platzCenter.z + (Math.random() - 0.5) * 12;
                    }
                    npc.behaviorTimer = 3 + Math.random() * 3;
                    break;
                case 'ATTACK':
                    npc.targetX = platzCenter.x + (Math.random() - 0.5) * 10;
                    npc.targetZ = platzCenter.z + (Math.random() - 0.5) * 10;
                    npc.behaviorTimer = 1 + Math.random() * 2;
                    break;
                case 'CLEANUP':
                    npc.targetX = npc.homeX + (Math.random() - 0.5) * 15;
                    npc.targetZ = npc.homeZ + (Math.random() - 0.5) * 15;
                    npc.behaviorTimer = 3 + Math.random() * 5;
                    break;
                case 'GUARD':
                    npc.targetX = npc.homeX + (Math.random() - 0.5) * 3;
                    npc.targetZ = npc.homeZ + (Math.random() - 0.5) * 3;
                    npc.behaviorTimer = 5 + Math.random() * 5;
                    break;
                case 'RETREAT':
                    {
                        const rdx = npc.x - platzCenter.x;
                        const rdz = npc.z - platzCenter.z;
                        const rdist = Math.sqrt(rdx * rdx + rdz * rdz) || 1;
                        npc.targetX = npc.x + (rdx / rdist) * 15 + (Math.random() - 0.5) * 8;
                        npc.targetZ = npc.z + (rdz / rdist) * 15 + (Math.random() - 0.5) * 8;
                        npc.behaviorTimer = 3 + Math.random() * 3;
                    }
                    break;
                case 'IDLE':
                default:
                    // BÄCKER FRANZ SPECIAL: 06:00 - 18:00
                    if (npc.type === 'ORGANIZER' && npc.homeX === 53 && npc.homeZ === 36) {
                        const isCounter = Math.random() < 0.5;
                        npc.targetX = isCounter ? 53 : 55;
                        npc.targetZ = isCounter ? 36 : 38;
                        npc.behaviorTimer = 4 + Math.random() * 6;
                        break;
                    }
                    if (Math.random() < 0.02) {
                        npc.targetX = npc.x + (Math.random() - 0.5) * 4;
                        npc.targetZ = npc.z + (Math.random() - 0.5) * 4;
                    }
                    npc.behaviorTimer = 2 + Math.random() * 3;
                    break;
            }
        }

        // TENSION OVERRIDES
        if (currentTension > 60 && npc.type === 'DEMONSTRATOR' && npc.behavior !== 'COMBAT' && npc.behavior !== 'THROW' && !npc.targetX) {
            npc.targetX = demoCenter.x + (Math.random() - 0.5) * 25;
            npc.targetZ = demoCenter.z + (Math.random() - 0.5) * 15;
        }

        // CLUSTERING & AVOIDANCE
        let neighborCount = 0;
        let avgX = 0;
        let avgZ = 0;
        const step = Math.max(1, Math.floor(npcs.length / 5));
        for (let j = 0; j < npcs.length; j += step) {
            const other = npcs[j];
            if (other.id === npc.id || other.hp <= 0) continue;
            const dx = other.x - npc.x;
            const dz = other.z - npc.z;
            const distSq = dx * dx + dz * dz;
            if (distSq < 16) {
                neighborCount++;
                avgX += other.x;
                avgZ += other.z;
            }
        }

        let currentSpeed = npc.speed;
        if (neighborCount > 0) {
            currentSpeed *= 0.5;
            if (!npc.targetX) {
                npc.x += (avgX / neighborCount - npc.x) * 0.005;
                npc.z += (avgZ / neighborCount - npc.z) * 0.005;
            }
        }

        // APPLY MOVEMENT
        if (npc.targetX !== undefined && npc.targetZ !== undefined) {
            const dx = npc.targetX - npc.x;
            const dz = npc.targetZ - npc.z;
            const dist = Math.sqrt(dx * dx + dz * dz);
            
            if (dist > 1.0) {
                const moveDist = currentSpeed * dt;
                const nextX = npc.x + (dx/dist) * moveDist;
                const nextZ = npc.z + (dz/dist) * moveDist;

                const inStage = nextX > -17 && nextX < 17 && nextZ > -21 && nextZ < 6;
                const inBoundaries = nextX > -120 && nextX < 120 && nextZ > -120 && nextZ < 150;

                if (!inStage && inBoundaries) {
                    npc.x = nextX;
                    npc.z = nextZ;
                    npc.rotY = Math.atan2(dx, dz);
                    if (npc.animState !== 2) npc.animState = 1; 
                } else {
                    npc.targetX = undefined;
                }
            } else {
                npc.targetX = undefined;
            }
        }
    }
}

function tick() {
    if (!isRunning) return;
    const now = performance.now();
    const dt = Math.min(0.1, (now - lastTick) / 1000);
    lastTick = now;

    updateBehaviors(dt);

    for (let i = 0; i < npcs.length; i++) {
        const npc = npcs[i];
        const offset = i * FLOATS_PER_NPC;
        outputBuffer[offset] = npc.id;
        outputBuffer[offset + 2] = npc.x;
        outputBuffer[offset + 3] = npc.hp > 0 ? 1.25 : 0.3; // Fall down if dead
        outputBuffer[offset + 4] = npc.z;
        outputBuffer[offset + 5] = npc.rotY;
        outputBuffer[offset + 6] = npc.animState; // 0=idle, 1=walking, 2=combat, 3=fallen
        outputBuffer[offset + 7] = npc.hp;
    }

    const buffer = outputBuffer.buffer;
    (postMessage as any)({ type: 'FRAME', payload: buffer }, [buffer]);
    outputBuffer = new Float32Array(maxInstances * FLOATS_PER_NPC);
    setTimeout(tick, 30);
}

