# 🏆 MASTERPLAN V4: JETBRAIN — CORONA CONTROL ULTIMATE (PRO-EDITION)

## VOLLSTÄNDIG RESET: CLOUD-ONLY • ZERO HOME-PC-LAST • NEUES DEPLOYMENT

## ⚠️ KRITISCHE HARDWARE-WARNUNG

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                    ⚠️ HOME-PC TEMPERATURE ALERT ⚠️                        ║
╠═══════════════════════════════════════════════════════════════════════════╣
║ AKTUELLER STATUS:                                                         ║
║ • CPU-Temperatur: 94°C (KRITISCH!)                                        ║
║ • GPU-Temperatur: 94°C (KRITISCH!)                                        ║
║                                                                           ║
║ KONSEQUENZ:                                                               ║
║ ❌ ABSOLUT KEINE LOKALE ENTWICKLUNG ERLAUBT                              ║
║ ❌ KEINE BUILD-PROZESSE AUF HOME-PC                                      ║
║ ❌ KEINE LOKALEN NPM-INSTALLS                                            ║
║ ❌ KEIN LOKALES RENDERING/TESTING                                        ║
║                                                                           ║
║ LÖSUNG:                                                                   ║
║ ✅ 100% CLOUD-BASIERTE ENTWICKLUNG                                       ║
║ ✅ CODEANYWHERE DEVELOPER PLATFORM                                       ║
║ ✅ REMOTE GPU/CPU ÜBER CLOUD                                             ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

Die 3 Haupt dateien ! 



JETBRAIN\_MASTERPLAN\_V3\_RESET.md   

Gedächtnis.md

JETBRAIN\_MASTERPLAN\_PROTOKOLL (1).html



wurde erstellt aus den orginal Prompts:



* ULTIMATE\_MASTER\_PROMPT\_FULL\_SOURCES.md
* Spiel\_KI\_Testprompt\_ULTIMATIV.md
* HYPER\_AAA\_GRAFIK\_PROMPT\_V1.md
* 24H\_HYPER\_DETAIL\_KOMPLETT.md
* 24\_STUNDEN\_LIVE\_EVENT\_SYSTEM (1).md















\---

## 1\. VISION \& KERNKONZEPT (MISSION STATEMENT)

**JetBRAIN** ist eine photorealistische 3D-Polizei-Simulation der nächsten Generation, die im Browser läuft. Sie kombiniert tiefgreifendes strategisches Crowd-Management mit einer emotional aufgeladenen Geschichte vor dem Hintergrund der Wiener Anti-Maßnahmen-Demonstrationen am 17. März 2021.

* **Genre:** Taktische Polizei-Simulation / RPG-Elemente / Echtzeit-Strategie.
* **Schauplatz:** Stephansplatz, Wien (Maßstabsgetreu 300m x 200m).
* **Protagonist:** Oberstleutnant Stefan Müller (37), Fokus auf Deeskalation.
* **Zeitrahmen:** Vollständig integriertes 24h-Echtzeit-Event-System (6:00 bis 6:00 Uhr). 24 Realminuten = 24 Spielstunden (1 Min = 1 Std).
* **Hardware-Philosophie:** **ZERO HOME-PC FOOTPRINT** — Keine CPU/GPU-Belastung am Home-PC (94°C-Limit erreicht!).
* **Grafik-Standard:** **HYPER-AAA** — 200.000+ Polygone pro NPC (LOD-0), PBR-Materials, 4K-8K Texturen.
* **Validierung:** **100% KI-gestützte Tests** — Jedes System muss beweisbar funktionieren.

\---

## 🚀 [AKTIV] V4 ARCHITEKTUR-STRATEGIE — PRO-EDITION (STAND: MÄRZ 2026)

> [!CAUTION]
> **!!! WICHTIG: LOCALHOST IST VERBOTEN — ABSOLUTE CLOUD-ONLY DIREKTIVE !!!**
> Jegliche Ausführung auf lokaler Hardware ist untersagt, um Überhitzung zu vermeiden. Das Projekt läuft ausschließlich auf der Cloud-Infrastruktur von Codeanywhere unter Nutzung der dortigen GPU/CPU-Ressourcen.

Dies ist die finale technische Spezifikation für JetBRAIN - Corona Control Ultimate.

### 1. Programmiersprachen (Priorität fest vorgegeben)
1.  **TypeScript**: Gesamte Frontend- und Game-Logik sowie Node.js Backend.
2.  **GLSL**: Shader, Rendering-Effekte (WebGL2 Basis).
3.  **Python 3.11+**: KI-Systeme, Modelle, Datenverarbeitung.

### 2. Technischer Verpflichtender Stack
*   **Frontend**: React (Latest Stable), React Three Fiber, Three.js (WebGL2), Zustand.
*   **3D-Rendering**: PBR-Workflow, GLTF/Draco, KTX2, Custom Shader (GLSL), Post-Processing (EffectComposer), mehrstufiges LOD-System.
*   **Backend**: Node.js (TS, LTS), WebSockets (Echtzeit-Fokus), Python **FastAPI** (für KI-Services).
*   **KI-System**: Python + **PyTorch**, serverseitige Inferenz, ONNX Runtime Optimierung.
*   **Daten**: **LanceDB** (Vektor-DB), PostgreSQL.
*   **Deployment**: Vercel (FE), Railway/Docker (BE), GPU-Instanzen (AI, z.B. HuggingFace).

### 3. Systemarchitektur & Datenfluss
*   **Frontend**: Rendering Engine + UI-Layer (React).
*   **Game-Logic Layer**: Zustand States + TS Logic.
*   **Backend API**: Node.js Orchestration.
*   **KI-Service**: Autonomes Python-Modul via FastAPI.
*   **Kommunikation**: Bidirektionale WebSockets für minimale Latenz.

### 4. Performance-Strategien
*   **LOD**: Mehrstufige Level-of-Detail Skalierung.
*   **Asset-Kompression**: Draco + KTX2 für schnelles Streaming.
*   **GPU-Auslastung**: Verlagerung komplexer Berechnungen in Shader.
*   **Netzwerk**: Intelligente Verteilung zwischen Client und Server.

---

## 2. TECHNIK-STACK & ARCHITEKTUR (LEGACY - ARCHIVIERT)

### 2.1 HARDWARE-PHILOSOPHIE: ZERO HOME-PC FOOTPRINT

**KRITISCH:** Wegen 94°C CPU/GPU-Temperatur am Home-PC ist **jegliche lokale Entwicklung verboten**.

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                    ZERO HOME-PC FOOTPRINT ARCHITEKTUR                     ║
╠═══════════════════════════════════════════════════════════════════════════╣
║ HOME-PC (NUR Browser)     │ CLOUD (CodeAnywhere + Remote GPU)           ║
╠═══════════════════════════╪══════════════════════════════════════════════╣
║ • Browser (Brave Nightly) │ • Development: CodeAnywhere Cloud IDE       ║
║ • Nur URL öffnen          │ • Git Repository: GitHub                    ║
║ • Keine Installs          │ • Build-Prozesse: Remote Node.js 20+        ║
║ • Keine npm/node          │ • Rendering: Cloud GPU (WebGPU/WebGL)       ║
║ • Keine Builds            │ • Testing: Cloud CPU                        ║
║                           │ • Deployment: GitHub → Production           ║
║ CPU-Last: <1% (nur Tab)   │ GPU-Last (Home): 0%                         ║
║ RAM-Last: <200MB          │ CPU-Last (Home): 0%                         ║
║ Temperatur: <50°C         │ Temperatur: <50°C (garantiert)              ║
╚═══════════════════════════╧══════════════════════════════════════════════╝
```

### 2.2 CORE TECHNOLOGY STACK (PIVOT V3.1 - AKTIV)

**Vite + WebGPU Modernization:**

* **Framework:** **Vite 4+** (Modern Web Build System)
* **UI-Bibliothek:** **React 19.0.0** (Latest Stable)
* **3D-Rendering:** **React Three Fiber (Canary)** + **Three.js 0.170.0+**
* **Grafik-Backend:** **WebGPURenderer** (Hardware-beschleunigt)
* **Laufzeit:** **Node.js 24.13.1+**
* **Erweiterungen:** Python (Automation), Java (Backend-Support)

**Archiviert (Legacy Phase 1.0):**
* Framework: React Native (via Expo) — *Abgeschlossen/Ersetzt*
* Navigation: Expo Router — *Abgeschlossen/Ersetzt*

### 2.3 CORE TECHNOLOGY STACK (PROPERTIES)

&#x20;   ```typescript
    WebGPU (Primär) → WebGL 2.0 (Fallback) → Canvas2D (Emergency)
    ```

### 2.3 CLOUD-INFRASTRUKTUR

#### 2.3.1 Development Platform (CodeAnywhere)

|Komponente|Details|URL|
|-|-|-|
|**Cloud IDE**|CodeAnywhere Developer Platform|`https://strazzusochr-pandemiesar-dqkjzls69o.app.codeanywhere.com/`|
|**Funktionen**|• Remote VS Code<br>• Node.js 20+ Runtime<br>• GPU-Zugriff (Cloud)<br>• Terminal-Zugriff<br>• Live-Preview|Aktiv|
|**Vorteile**|• Zero Home-PC-Last<br>• Keine Temperaturprobleme<br>• Volle Entwicklungsumgebung<br>• Integriertes Git|✅|

#### 2.3.2 Git Repository \& Version Control

|Platform|Funktion|Status|URL|
|-|-|-|-|
|**GitHub**|Primary Repository & Code Hosting|✅ AKTIV|`https://github.com/strazzusochr/CoronaProjektschonwieder.git`|

#### 2.3.3 Deployment-Strategie (Zu Definieren)

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                      CLOUD DEPLOYMENT PIPELINE (GEPLANT)                  ║
╠═══════════════════════════════════════════════════════════════════════════╣
║ CODEANYWHERE (Development)                                               ║
║ ↓ (Code bearbeiten in Cloud IDE)                                         ║
║ ↓ (Git Commit in CodeAnywhere Terminal)                                  ║
║ GITHUB (Primary Repository)                                              ║
║ ↓ (GitHub Actions - CI/CD) \[ZU KONFIGURIEREN]                           ║
║ ├─→ ESLint + TypeScript Validation                                       ║
║ ├─→ Vitest Unit Tests                                                    ║
║ ├─→ Build (Expo/Vite)                                                    ║
║ ↓ (On Success)                                                            ║
║ PRODUCTION HOSTING \[NOCH OFFEN - OPTIONEN:]                              ║
║ ├─→ Option A: Vercel (Static Hosting)                                    ║
║ ├─→ Option B: Netlify (JAMstack)                                         ║
║ ├─→ Option C: Railway (Node.js Backend)                                  ║
║ └─→ Option D: Render (Docker Container)                                  ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

**Status:** \[ ] Noch nicht implementiert — Deployment-Platform muss ausgewählt werden

### 2.4 GRAFIK-STANDARD: HYPER-AAA

**Definition:** "Hyper-AAA" bedeutet, dass die Grafik-Qualität vergleichbar mit AAA-Spielen wie The Last of Us Part II, Cyberpunk 2077 oder God of War ist — jedoch im Browser.

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                         HYPER-AAA SPEZIFIKATION                          ║
╠═══════════════════════════════════════════════════════════════════════════╣
║ NPC POLYGON-BUDGET (LOD-0):                                              ║
║ • Minimum: 200.000 Polygone                                              ║
║ • Gesicht: 45.000 Poly (Lippen-Loop, Augenlider, Nasenlöcher)           ║
║ • Hände: 24.000 Poly (Fingerknöchel, Fingernägel-Geometrie)             ║
║ • Kleidung: 3 Layer (21.000 Poly total)                                  ║
║ • Haar: 18.000 Poly (Strand-basiert oder Cap-Mesh)                       ║
║                                                                           ║
║ TEXTUREN (PBR-WORKFLOW):                                                 ║
║ • Base Color:          4096x4096 (NPC-Gesicht), 2048x2048 (Körper)      ║
║ • Normal Map:          4096x4096 (Tangent-Space)                         ║
║ • Metallic-Roughness:  2048x2048 (R=Metallic, G=Roughness)              ║
║ • Ambient Occlusion:   2048x2048                                         ║
║ • Emissive Map:        1024x1024 (LEDs, Leuchtstreifen)                 ║
║ • SSS Map (Haut):      2048x2048 (Subsurface Scattering)                ║
║                                                                           ║
║ GEBÄUDE (Hero-Assets):                                                   ║
║ • Stephansdom: 750.000 Polygone (LOD-0)                                  ║
║ • Barockhaus: 120.000 Polygone                                           ║
║ • Texturen: 8192x8192 (Stephansdom), 4096x4096 (Standard)               ║
║                                                                           ║
║ LOD-SYSTEM (5 Stufen):                                                   ║
║ • LOD-0: 0-8m    → 200.000+ Poly (Full Detail)                           ║
║ • LOD-1: 8-20m   → 80.000 Poly (High)                                    ║
║ • LOD-2: 20-50m  → 30.000 Poly (Medium)                                  ║
║ • LOD-3: 50-100m → 8.000 Poly (Low)                                      ║
║ • LOD-4: >100m   → Billboard-Imposter (500 Poly)                         ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

\---

## 3\. ASSET-PIPELINE \& GRAFIK-SPEZIFIKATION

### 3.1 NPC-Struktur (High-Detail-Modularität)

**Status:** \[ ] Noch nicht implementiert

* **Basis-Mesh:** 200.000 Polygone (Kopf, Augen, Hände, Kleidungslagen).
* **Attachments:** Polizei-Ausrüstung (Helme, Schilde, Holster) als separate High-Poly-Meshes (+10k-30k).
* **LOD-System:** 5 Stufen (LOD-0 bis LOD-4). Ab 50m Entfernung automatische Reduktion auf Low-Poly-Instanzen.
* **Shading:** PBR (Physically Based Rendering) mit 4K Texturen (Albedo, Normal, Roughness, AO, Metallic).

### 3.2 Umwelt \& Dom

**Status:** \[ ] Noch nicht implementiert

* **Stephansdom:** Vollständig begehbarer Vorplatz, gotische Fassade mit prozeduraler Stein-Detaillierung.
* **Beleuchtung:** Real-Time Dynamic Global Illumination (GI) simuliert Sonnenstand-Wanderung.

\---

## 4\. 24-STUNDEN-LIVE-EVENT-SYSTEM (HERZSTÜCK DER SIMULATION)

### 4.1 ZEIT-SYSTEM SPEZIFIKATION

**Status:** \[ ] Noch nicht implementiert

```typescript
// Zeit-Konversion (Hochpräzise)
interface GameTime {
  day: number;        // 1-365 (Kalendertag)
  hour: number;       // 0-23 (24h-Format)
  minute: number;     // 0-59
  second: number;     // 0-59
  realTimeMultiplier: number; // 60 = Standard (1 Sek = 1 Min)
}

// Zeit-Synchronisation (Client ↔ Server)
const TIME\_CONFIG = {
  standard: 60,      // 24 Minuten = 1 Spieltag
  accelerated\_1: 120,  // 12 Minuten = 1 Spieltag
  accelerated\_2: 240,  // 6 Minuten = 1 Spieltag
  realtime: 1,         // 24 Stunden = 1 Spieltag (Hardcore)
  pausable: true       // Pause im Menü möglich
};
```

**Echtzeit-Uhr UI:**

* **Position:** Rechts oben im HUD
* **Format:** `14:37` (Stunden:Minuten) + `Mittwoch, 17. März 2021`
* **Farbe:** Weiß (Tag) | Gelb (Dämmerung) | Blau (Nacht)
* **Update-Rate:** Alle 1 Sekunde (Echtzeit) = 1 Spielminute

### 4.2 VOLLSTÄNDIGE 24H-EVENT-TIMELINE

**Status:** \[ ] Events noch nicht implementiert

```
╔═══════════════════════════════════════════════════════════════════════════╗
║ ZEIT  │ EVENT                        │ ESKALATION │ AKTEURE               ║
╠═══════╪══════════════════════════════╪════════════╪═══════════════════════╣
║ 06:00 │ Stadt erwacht                │ 0%         │ 50 Zivilisten         ║
║ 08:00 │ Demo-Vorbereitung beginnt    │ 5%         │ 10 Demonstranten      ║
║ 08:45 │ Schilder werden verteilt     │ 10%        │ 50 Demonstranten      ║
║ 10:00 │ Massen-Zustrom               │ 15%        │ 150 Demonstranten     ║
║ 11:00 │ Hauptredner Rede             │ 15%        │ Redner + 150 Crowd    ║
║ 11:30 │ Aggressive Rhetorik          │ 25%        │ Aktivist + wütende Crowd ║
║ 12:00 │ POLIZEI-ULTIMATUM            │ 45%        │ Polizei-Chef + 200 Crowd ║
║ 12:04 │ ERSTE FLASCHENWÜRFE          │ 50%        │ Aggressive Demonstranten ║
║ 12:15 │ ERSTE GEWALT (Nahkampf)      │ 60%        │ 30 vs 30 (Demo vs Cops) ║
║ 12:30 │ HUNDERTSCHAFT RÜCKT AN       │ 70%        │ 100 Riot-Cops         ║
║ 13:00 │ WASSERWERFER-EINSATZ         │ 65%        │ Wasserwerfer-Crew     ║
║ 13:30 │ TRÄNENGAS-ANGRIFF            │ 50%        │ Polizei (Chemical-Unit) ║
║ 14:00 │ POLIZEI-VORSTOSS (Brutal)    │ 40%        │ Hundertschaft + 50 Demo ║
║ 15:00 │ Ruhe vor dem Sturm           │ 30%        │ Sanitäter, Aufräum-Teams ║
║ 18:00 │ Extremisten sammeln (Dämmerung) │ 50%    │ 50 Black-Bloc-NPCs    ║
║ 19:00 │ MOB-ANGRIFF (Eisenstangen)   │ 80%        │ 50 Extremisten vs 30 Cops ║
║ 19:30 │ BENGALO-INFERNO              │ 85%        │ Mob (Pyro-Unit)       ║
║ 20:00 │ BARRIKADEN \& AUTO-BRÄNDE     │ 90%        │ Mob (Barrikaden-Bau)  ║
║ 20:30 │ SEK-ANKUNFT (Spezialeinheit) │ 95%        │ 50 SEK-Elite          ║
║ 21:00 │ PEAK CHAOS (Schusswechsel)   │ 100%       │ 50 Extremisten vs 100 Cops ║
║ 21:30 │ Mob-Rückzug (Kanalisation)   │ 70%        │ Flüchtende Extremisten ║
║ 22:00 │ Aufräumen (Crime Scene)      │ 40%        │ Feuerwehr, Sanitäter  ║
║ 23:00 │ Nächtliche Ruhe              │ 20%        │ Patrols               ║
║ 00:00 │ Mitternacht (Day End)        │ 15%        │ Statistik-Screen      ║
║ 06:00 │ CYCLE RESTART (Neuer Tag)    │ 10%        │ Reset mit Nachwirkungen ║
╚═══════╧══════════════════════════════╧════════════╧═══════════════════════╝
```

### 4.3 EVENT-MANAGER ARCHITEKTUR

**Status:** \[ ] Noch nicht implementiert

```typescript
// eventScheduler.ts (Kern-System) - ZU IMPLEMENTIEREN
class EventScheduler {
  private events: ScheduledEvent\[] = \[];
  private currentTime: GameTime;
  private eskalationLevel: number = 0; // 0-100%

  // Alle 40+ Events registrieren
  private loadEventSchedule() {
    this.registerEvent({
      id: "morning\_demo\_prep",
      triggerTime: { hour: 8, minute: 0 },
      location: STEPHANSPLATZ\_CENTER,
      participants: this.spawnDemonstrators(10),
      execute: () => {
        // Bühne aufbauen (3 Organisator-NPCs)
        // Sound-System testen (Audio-Snippet)
        // Schilder spawnen (Mesh-Instanzen)
      }
    });

    // KRITISCHES EVENT: Polizei-Ultimatum
    this.registerEvent({
      id: "police\_ultimatum",
      triggerTime: { hour: 12, minute: 0 },
      location: STAGE\_CENTER,
      participants: \[POLICE\_CHIEF\_NPC],
      execute: () => {
        // Polizei-Chef betritt Bühne (Cinematic)
        // Megafon-Audio: "Demonstration für beendet erklärt!"
        // 15 Minuten Warnung
        // Crowd-Reaktion: EXPLOSION\_DER\_WUT (+35% Eskalation)
      }
    });

    // PEAK EVENT: Schusswechsel
    this.registerEvent({
      id: "peak\_shootout",
      triggerTime: { hour: 21, minute: 0 },
      location: STEPHANSPLATZ\_FULL,
      participants: \[...SEK\_UNITS, ...EXTREMIST\_GROUPS],
      execute: () => {
        // Erster Schuss (Extremist-Pistole)
        // SEK eröffnet Feuer (Sturmgewehr-Salven)
        // Blendgranaten (Screen-Flash)
        // Rauch-System (Dense Fog)
        // Audio-Hölle (Dauerschussfeuer)
        // Eskalation: 100%
      }
    });

    // ... (37+ weitere Events)
  }

  // Dynamische Event-Variation
  private checkEventConditions(event: ScheduledEvent): boolean {
    if (event.condition) {
      return event.condition(); // Z.B. "Nur wenn Moral < -50"
    }
    return true;
  }
}
```

### 4.4 CROWD-SIMULATIONS-KI (TENSION SYSTEM)

**Status:** \[ ] Noch nicht implementiert

**Globales Tension-Level (0-100%):**

```typescript
interface TensionSystem {
  global: number;        // 0-100% (Gesamte Stadt)
  local: Map<string, number>; // Pro-Zone (Stephansplatz, Gassen, etc.)

  factors: {
    policePresence: number;     // +5% pro 10 Polizisten
    violenceWitnessed: number;  // +10% pro Gewaltakt
    tearGasExposure: number;    // +15% wenn in Gas-Wolke
    leaderArrest: number;       // +25% wenn Demo-Anführer verhaftet
    waterCannonHit: number;     // +8% pro Treffer
    timeOfDay: number;          // +10% ab 18:00 (Dunkelheit)
  };

  calculateEskalation(): number {
    return Math.min(100,
      this.factors.policePresence +
      this.factors.violenceWitnessed +
      this.factors.tearGasExposure +
      this.factors.leaderArrest +
      this.factors.waterCannonHit +
      this.factors.timeOfDay
    );
  }
}
```

**NPC-Emotionaler Status:**

```typescript
type EmotionalState =
  | 'CALM'       // Ruhig (Tension < 20%)
  | 'TENSE'      // Angespannt (20-40%)
  | 'ANGRY'      // Wütend (40-60%)
  | 'AGGRESSIVE' // Aggressiv (60-80%)
  | 'RIOTING'    // Randalierend (80-100%)
  | 'PANICKED'   // Panisch (bei Tränengas/Gewalt)
  | 'FEARFUL';   // Ängstlich (bei SEK-Ankunft)

// NPC-Verhalten basierend auf Emotion
class NPCBehavior {
  updateBehavior(emotion: EmotionalState) {
    switch(emotion) {
      case 'CALM':
        this.animation = 'idle\_talk';
        this.attackProbability = 0;
        break;
      case 'ANGRY':
        this.animation = 'shout\_gesture';
        this.throwObjectProbability = 0.2; // 20% Chance pro Sekunde
        break;
      case 'RIOTING':
        this.animation = 'attack\_swing';
        this.attackProbability = 0.8; // 80% Chance
        this.targetPolice = true;
        break;
      // ... weitere Zustände
    }
  }
}
```

### 4.5 ENTSCHEIDUNGS-MATRIX (SPIELER-EINFLUSS)

**Status:** \[ ] Noch nicht implementiert

**Spieler hat folgende Eingriffsmöglichkeiten:**

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                      SPIELER-ENTSCHEIDUNGS-BAUM                           ║
╠═══════════════════════════════════════════════════════════════════════════╣
║ ZEITPUNKT: 12:00 (Ultimatum)                                             ║
║                                                                           ║
║ OPTION A: Ultimatum durchsetzen (Gewalt)                                 ║
║ → Hundertschaft sofort einsetzen                                         ║
║ → Wasserwerfer aktivieren                                                 ║
║ → Tränengas werfen                                                        ║
║ → KONSEQUENZ: Eskalation +50%, Mob erscheint garantiert um 19:00        ║
║                                                                           ║
║ OPTION B: Verhandeln (Taste E - Dialog)                                  ║
║ → Mit Demo-Anführer "Krause" sprechen                                    ║
║ → Dialog-Baum: 5 Verzweigungen                                           ║
║ → KONSEQUENZ (bei Erfolg): Demo friedlich beendet, kein Mob             ║
║ → KONSEQUENZ (bei Fehlschlag): Vertrauen verloren, Eskalation +30%      ║
║                                                                           ║
║ OPTION C: Passive Beobachtung                                            ║
║ → Nichts tun, Events laufen automatisch                                  ║
║ → KONSEQUENZ: Standard-Timeline (Schusswechsel um 21:00)                ║
║                                                                           ║
║ OPTION D: Rädelsführer verhaften (Frühzeitig)                            ║
║ → Krause vor 11:00 Uhr festnehmen                                        ║
║ → KONSEQUENZ: Demo führerlos, weniger organisiert (-20% Eskalation)     ║
║ → ABER: Reputation bei Demonstranten -50 (als Unterdrückung gewertet)   ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

**Taktik-Menü (Taste C):**

```typescript
interface TacticalCommand {
  target: 'squad' | 'unit' | 'all';
  command:
    | 'FORM\_LINE'         // Kettenlinie bilden
    | 'FORM\_WEDGE'        // Keilformation
    | 'KETTLE'            // Einkesseln (umzingeln)
    | 'ADVANCE'           // Vorrücken
    | 'RETREAT'           // Rückzug
    | 'HOLD\_POSITION'     // Position halten
    | 'DEPLOY\_WATER'      // Wasserwerfer aktivieren
    | 'DEPLOY\_GAS'        // Tränengas einsetzen
    | 'CALL\_BACKUP';      // Verstärkung anfordern (SEK/Riot-Police)
}
```

\---

## 5\. VALIDIERUNGS- \& TESTSTRATEGIE (100% QUALITY GATE)

### 5.1 TESTPRINZIP (UNIVERSELLER KI-TEST-PROMPT)

**Status:** \[ ] Noch nicht implementiert

**Grundsatz:** Alles, was **nicht zu 100% überprüfbar, reproduzierbar und belegbar** ist, gilt als **nicht korrekt implementiert**.

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                     VALIDIERUNGS-PIPELINE (4 STUFEN)                      ║
╠═══════════════════════════════════════════════════════════════════════════╣
║ STUFE 1: UNIT-TESTS (Vitest)                                             ║
║ • Jede Funktion isoliert testen                                           ║
║ • Rückgabewerte validieren                                                ║
║ • Fehlerbehandlung prüfen                                                 ║
║ • Grenzfälle abdecken                                                     ║
║ • Target: 100% Code Coverage                                              ║
║                                                                            ║
║ STUFE 2: INTEGRATIONSTESTS                                                ║
║ • Zusammenspiel von Systemen (AI ↔ Physik ↔ Grafik)                       ║
║ • Event-System vollständig durchlaufen (06:00-06:00)                      ║
║ • NPC-Spawning validieren (Polygon-Count-Checks)                          ║
║ • Performance-Metriken (FPS, Draw Calls, Memory)                          ║
║                                                                            ║
║ STUFE 3: KI-GESTÜTZTE TESTS (AIValidationAgent.ts)                       ║
║ • Autonomer Agent simuliert unerwartetes Spielerverhalten                 ║
║ • Stress-Tests: 500+ NPCs gleichzeitig                                    ║
║ • Extreme Eskalations-Szenarien                                           ║
║ • Reproduzierbarkeit: 10x Run pro Szenario                                ║
║                                                                            ║
║ STUFE 4: GRAFIK- \& ASSET-VALIDIERUNG                                     ║
║ • Jedes 3D-Modell auf Polygon-Count prüfen (scene.traverse())             ║
║ • Texturen auf Auflösung prüfen (4K/8K)                                   ║
║ • LOD-System Funktionalität (5 Stufen-Check)                              ║
║ • PBR-Material-Vollständigkeit (BaseColor, Normal, MR, AO, Emissive)     ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

### 5.2 POLYGON-VALIDIERUNG (BEWEISFÜHRUNG)

**Status:** \[ ] Noch nicht implementiert

**Jedes NPC-Modell muss folgende Checks bestehen:**

```typescript
// PolygonValidator.ts (Automatisierte Validierung) - ZU IMPLEMENTIEREN
class PolygonValidator {
  async validateNPC(npcType: NPCType): Promise<ValidationReport> {
    const model = await loadGLTF(`/assets/npcs/${npcType}/lod0.glb`);
    let totalPolygons = 0;

    // Zähle alle Vertices
    model.scene.traverse((object) => {
      if (object instanceof Mesh) {
        const geometry = object.geometry;
        const vertexCount = geometry.attributes.position.count;
        const faceCount = geometry.index
          ? geometry.index.count / 3
          : vertexCount / 3;
        totalPolygons += faceCount;
      }
    });

    // Validierung
    const MINIMUM\_POLY\_COUNT = 200\_000;
    const passed = totalPolygons >= MINIMUM\_POLY\_COUNT;

    return {
      npcType,
      polyCount: totalPolygons,
      target: MINIMUM\_POLY\_COUNT,
      passed,
      timestamp: new Date().toISOString()
    };
  }
}
```

### 5.3 PERFORMANCE-ABNAHME (MANDATORY TARGETS)

**Status:** \[ ] Noch nicht gemessen

|Szenario|Target FPS|GPU-Last|RAM-Last|Status|
|-|-|-|-|-|
|50 NPCs + Stephansdom (1080p Desktop)|≥60 FPS|<70%|<2GB|\[ ] Zu testen|
|200 NPCs + Peak Chaos (1080p Desktop)|≥30 FPS|<85%|<3GB|\[ ] Zu testen|
|20 NPCs + 5 Gebäude (Mobile Safari)|≥30 FPS|<60%|<1GB|\[ ] Zu testen|
|Drone-View + Hauptszene (Dual-Render)|≥45 FPS|<75%|<2.5GB|\[ ] Zu testen|

**Messung:** Automatisiertes Telemetrie-System (TelemetryHUD.tsx) — **Noch zu implementieren**

### 5.4 ABNAHME-KRITERIEN (CHECKLISTE)

**Ein Feature gilt nur als FERTIG, wenn:**

* \[ ] **100% Unit-Test-Coverage** (Vitest-Report)
* \[ ] **Integrations-Tests bestanden** (End-to-End-Szenarien)
* \[ ] **KI-Stress-Tests erfolgreich** (10x Run ohne Crash)
* \[ ] **Performance-Targets erreicht** (siehe Tabelle oben)
* \[ ] **Polygon-Validierung bestanden** (alle NPCs ≥200k)
* \[ ] **Dokumentation vorhanden** (`docs/SYSTEM\_NAME.md`)
* \[ ] **Code-Review abgeschlossen** (ESLint 0 Errors/Warnings)
* \[ ] **Beweisführung komplett** (Screenshots, Videos, Logs)

### 5.5 BEWEISDOKUMENTATION (MANDATORY)

**Status:** \[ ] Noch nicht erstellt

**Für jedes System muss existieren:**

```
docs/
├── VALIDIERUNGS\_BERICHT.md          (Gesamt-Abnahme)
├── POLYGON\_REPORT.md                 (NPC-Polygon-Zählung)
├── PERFORMANCE\_TELEMETRIE.md         (FPS-Logs über 24h-Zyklus)
├── EVENT\_SYSTEM\_LOG.md               (Alle 40+ Events mit Timestamps)
├── SCREENSHOT\_GALLERY/               (Beweisbilder)
│   ├── 06\_00\_Stadt\_erwacht.png
│   ├── 12\_00\_Ultimatum.png
│   ├── 21\_00\_Peak\_Chaos.png
│   └── ... (min. 20 Screenshots)
└── VIDEO\_BEWEISE/
    ├── 24h\_Timelapse.mp4            (24 Min Echtzeit)
    ├── Peak\_Chaos\_5min.mp4          (Highlight-Reel)
    └── Polygon\_Validation\_Test.mp4   (LOD-System in Aktion)
```

\---

## 6\. ROADMAP ZUR UMSETZUNG (PHASEN-PLAN)

### Phase 1: Cloud-Setup & Vite WebGPU Pivot

**Zeitrahmen:** Woche 1
**Status:** 🔄 AKTIV (Vite Konfiguration)

#### 1.1 Vite Project Setup (V3.1)

```bash
# In CodeAnywhere Terminal
npm create vite@latest ./ --template react-ts
npm install
npm install three @react-three/fiber@canary @react-three/drei@canary zustand
```

#### 1.2 WebGPU Configuration

Die `vite.config.ts` muss für WebGPU optimiert werden, um den `Three.js` WebGPURenderer zu unterstützen.

---

### Phase 1: Expo/React Native Setup (Legacy - ARCHIVIERT)

#### 1.1 CodeAnywhere Cloud IDE Setup

**Aufgaben:**

* \[ ] CodeAnywhere-Account verifizieren
* \[ ] Cloud-Workspace öffnen: `https://strazzusochr-pandemiesar-dqkjzls69o.app.codeanywhere.com/`
* \[ ] Terminal-Zugriff testen
* \[ ] Node.js Version prüfen (`node --version` sollte ≥20.0.0 sein)
* \[ ] npm/yarn installiert prüfen

#### 1.2 Git Repository Initialisierung

**Aufgaben:**

* \[ ] GitHub Repository klonen: `git clone https://github.com/strazzusochr/PandemieSARScov.git`
* \[ ] Projekt-Ordnerstruktur erstellen:

```bash
  mkdir -p src/{components,screens,3d,managers,systems,stores,workers,types,assets}
  mkdir -p docs/{PROMPT,SCREENSHOT\_GALLERY,VIDEO\_BEWEISE}
  mkdir -p public/assets/{npcs,buildings,vehicles,props}
  ```

* \[ ] `.gitignore` erstellen (node\_modules, .expo, dist, etc.)
* \[ ] Initial commit: `git add . \&\& git commit -m "Initial project structure"`
* \[ ] Push to GitHub: `git push origin main`

#### 1.3 Expo/React Native Setup

**Aufgaben:**

* \[ ] Expo CLI installieren (in CodeAnywhere Terminal):

```bash
  npm install -g expo-cli
  npx create-expo-app@latest PandemieSARScov --template blank-typescript
  cd PandemieSARScov
  ```

* \[ ] Dependencies installieren:

```bash
  npm install react@19.0.0 react-native expo-router
  npm install three @react-three/fiber @react-three/drei
  npm install zustand @types/three
  npm install -D typescript @types/react @types/react-native
  ```

* \[ ] `package.json` konfigurieren:

```json
  {
    "name": "jetbrain-pandemic-sarscov",
    "version": "0.1.0",
    "main": "expo-router/entry",
    "scripts": {
      "start": "expo start",
      "android": "expo start --android",
      "ios": "expo start --ios",
      "web": "expo start --web"
    }
  }
  ```

* \[ ] `tsconfig.json` (Strict Mode):

```json
  {
    "compilerOptions": {
      "strict": true,
      "noImplicitAny": true,
      "strictNullChecks": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "target": "ES2020",
      "module": "ESNext",
      "jsx": "react-native"
    }
  }
  ```

#### 1.4 Erste Test-Anwendung

**Aufgaben:**

* \[ ] Basis-App erstellen (`app/index.tsx`):

```typescript
  import { View, Text } from 'react-native';
  
  export default function Index() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>JetBRAIN - Pandemic SARS-CoV</Text>
        <Text>Cloud Development Test - CodeAnywhere</Text>
      </View>
    );
  }
  ```

* \[ ] App in CodeAnywhere starten: `npm start`
* \[ ] Web-Preview öffnen (sollte "Hello World" anzeigen)
* \[ ] **VERIFIZIERUNG:** Home-PC-Temperatur bleibt unter 50°C (nur Browser-Tab offen!)

**Deliverables:**

* \[ ] Funktionierendes Expo-Projekt in CodeAnywhere
* \[ ] Git-Repository auf GitHub synchronisiert
* \[ ] Erste erfolgreiche Web-Preview
* \[ ] Home-PC-Temperatur-Bestätigung (<50°C)

\---

### Phase 2: 3D-Grundlagen \& React Three Fiber Integration

**Zeitrahmen:** Woche 2-3
**Gewicht:** 20% des Gesamtprojekts
**Status:** \[ ] Nicht gestartet

#### 2.1 React Three Fiber Setup

**Aufgaben:**

* \[ ] R3F Canvas einrichten:

```typescript
  // src/screens/GameScreen.tsx
  import { Canvas } from '@react-three/fiber';
  import { OrbitControls } from '@react-three/drei';
  
  export default function GameScreen() {
    return (
      <Canvas camera={{ position: \[0, 5, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={\[10, 10, 10]} />
        <mesh>
          <boxGeometry args={\[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
        <OrbitControls />
      </Canvas>
    );
  }
  ```

* \[ ] Three.js Version pinnen auf 0.170.0 in `package.json`:

```json
  "dependencies": {
    "three": "0.170.0"
  }
  ```

* \[ ] Test: Rotierender Würfel im Browser sichtbar

#### 2.2 Erste NPC-Geometrie (Placeholder)

**Aufgaben:**

* \[ ] Prozedurale Basis-Mesh erstellen:

```typescript
  // src/3d/ProceduralHumanMesh.ts
  import \* as THREE from 'three';
  
  export class ProceduralHumanMesh {
    generatePlaceholder(): THREE.Mesh {
      // Einfacher Zylinder als Placeholder (später ersetzen durch 200k-Mesh)
      const geometry = new THREE.CylinderGeometry(0.3, 0.3, 1.8, 32);
      const material = new THREE.MeshStandardMaterial({ color: 0x0066cc });
      return new THREE.Mesh(geometry, material);
    }
  }
  ```

* \[ ] NPC in Szene platzieren:

```typescript
  import { ProceduralHumanMesh } from '../3d/ProceduralHumanMesh';
  
  function NPCComponent() {
    const meshGenerator = new ProceduralHumanMesh();
    const npc = meshGenerator.generatePlaceholder();
    
    return <primitive object={npc} position={\[0, 0.9, 0]} />;
  }
  ```

* \[ ] **ZIEL:** 10 NPCs gleichzeitig rendern (Performance-Test)

#### 2.3 Kamera-System \& Controls

**Aufgaben:**

* \[ ] Third-Person-Kamera implementieren:

```typescript
  // src/3d/CameraController.ts
  import { useThree, useFrame } from '@react-three/fiber';
  import \* as THREE from 'three';
  
  export function CameraController({ target }: { target: THREE.Vector3 }) {
    const { camera } = useThree();
    
    useFrame(() => {
      // Kamera folgt Ziel mit Offset
      const offset = new THREE.Vector3(0, 5, 10);
      camera.position.lerp(target.clone().add(offset), 0.1);
      camera.lookAt(target);
    });
    
    return null;
  }
  ```

* \[ ] Touch/Maus-Controls für Mobile/Desktop

**Deliverables:**

* \[ ] Funktionierende 3D-Szene mit R3F
* \[ ] 10 NPCs (Placeholder) rendern bei ≥30 FPS
* \[ ] Kamera-System implementiert
* \[ ] Home-PC-Last weiterhin bei 0% (alles in CodeAnywhere)

\---

### Phase 3: 24h-Event-System (Kern-Logik)

**Zeitrahmen:** Woche 4-5
**Gewicht:** 25% des Gesamtprojekts
**Status:** \[ ] Nicht gestartet

#### 3.1 Zeit-System Implementierung

**Aufgaben:**

* \[ ] Zustand-Store für Game-State:

```typescript
  // src/stores/gameStore.ts
  import create from 'zustand';
  
  interface GameState {
    time: {
      day: number;
      hour: number;
      minute: number;
      second: number;
    };
    eskalationLevel: number;
    npcs: NPC\[];
    advanceTime: () => void;
  }
  
  export const useGameStore = create<GameState>((set) => ({
    time: { day: 1, hour: 6, minute: 0, second: 0 },
    eskalationLevel: 0,
    npcs: \[],
    advanceTime: () => set((state) => {
      // 1 Sekunde Echtzeit = 1 Minute Spielzeit
      let { hour, minute } = state.time;
      minute += 1;
      if (minute >= 60) {
        minute = 0;
        hour += 1;
      }
      if (hour >= 24) hour = 0;
      return { time: { ...state.time, hour, minute } };
    })
  }));
  ```

* \[ ] Timer-Hook für automatisches Zeit-Update:

```typescript
  // src/hooks/useTimeCycle.ts
  import { useEffect } from 'react';
  import { useGameStore } from '../stores/gameStore';
  
  export function useTimeCycle() {
    const advanceTime = useGameStore((state) => state.advanceTime);
    
    useEffect(() => {
      const interval = setInterval(advanceTime, 1000); // Jede Sekunde
      return () => clearInterval(interval);
    }, \[]);
  }
  ```

* \[ ] HUD-Anzeige für Zeit:

```typescript
  // src/components/TimeDisplay.tsx
  import { Text, View } from 'react-native';
  import { useGameStore } from '../stores/gameStore';
  
  export function TimeDisplay() {
    const { hour, minute } = useGameStore((state) => state.time);
    
    return (
      <View style={{ position: 'absolute', top: 20, right: 20 }}>
        <Text style={{ fontSize: 24, color: 'white' }}>
          {hour.toString().padStart(2, '0')}:{minute.toString().padStart(2, '0')}
        </Text>
        <Text style={{ fontSize: 14, color: 'white' }}>
          Mittwoch, 17. März 2021
        </Text>
      </View>
    );
  }
  ```

#### 3.2 Event-Scheduler (40+ Events)

**Aufgaben:**

* \[ ] Event-Typen definieren:

```typescript
  // src/types/events.types.ts
  interface ScheduledEvent {
    id: string;
    triggerTime: { hour: number; minute: number };
    location: THREE.Vector3;
    participants: string\[]; // NPC-IDs
    execute: () => void;
    condition?: () => boolean;
  }
  ```

* \[ ] EventScheduler-Klasse:

```typescript
  // src/systems/eventScheduler.ts
  export class EventScheduler {
    private events: ScheduledEvent\[] = \[];
    
    registerEvent(event: ScheduledEvent) {
      this.events.push(event);
    }
    
    checkEvents(currentTime: { hour: number; minute: number }) {
      this.events.forEach(event => {
        if (event.triggerTime.hour === currentTime.hour \&\&
            event.triggerTime.minute === currentTime.minute) {
          if (!event.condition || event.condition()) {
            event.execute();
          }
        }
      });
    }
  }
  ```

* \[ ] Erste 5 Test-Events registrieren:

  * \[ ] 06:00 — Stadt erwacht (50 Zivilisten spawnen)
  * \[ ] 08:00 — Demo-Vorbereitung (10 Demonstranten)
  * \[ ] 12:00 — Polizei-Ultimatum (Sound abspielen)
  * \[ ] 21:00 — Peak Chaos (Eskalation auf 100%)
  * \[ ] 00:00 — Tag-Ende (Statistik-Screen)

#### 3.3 NPC-Spawn-System

**Aufgaben:**

* \[ ] NPC-Manager:

```typescript
  // src/managers/NPCManager.ts
  export class NPCManager {
    spawnNPC(type: NPCType, position: THREE.Vector3): NPC {
      const npc = {
        id: generateUUID(),
        type,
        position,
        emotionalState: 'CALM',
        behavior: 'IDLE'
      };
      useGameStore.getState().npcs.push(npc);
      return npc;
    }
    
    spawnGroup(type: NPCType, count: number, area: THREE.Box3): NPC\[] {
      const npcs: NPC\[] = \[];
      for (let i = 0; i < count; i++) {
        const randomPos = new THREE.Vector3(
          Math.random() \* area.max.x,
          0,
          Math.random() \* area.max.z
        );
        npcs.push(this.spawnNPC(type, randomPos));
      }
      return npcs;
    }
  }
  ```

**Deliverables:**

* \[ ] Zeit-System funktioniert (1 Sek = 1 Spielminute)
* \[ ] HUD zeigt korrekte Zeit an
* \[ ] Event-Scheduler läuft (erste 5 Events ausgelöst)
* \[ ] NPCs spawnen automatisch zu definierten Zeiten

\---

### Phase 4: Hyper-AAA Grafik-Upgrade

**Zeitrahmen:** Woche 6-8
**Gewicht:** 30% des Gesamtprojekts
**Status:** \[ ] Nicht gestartet

#### 4.1 High-Poly NPC-Meshes (200k Polygone)

**Aufgaben:**

* \[ ] Detaillierte Geometrie-Generierung:

```typescript
  // src/3d/ProceduralHumanMesh.ts (Erweitert)
  export class ProceduralHumanMesh {
    generateLOD0(): THREE.BufferGeometry {
      // Gesicht: 45.000 Polygone
      const face = this.generateFacialGeometry();
      
      // Hände: 24.000 Polygone (je 12k)
      const hands = this.generateHandGeometry();
      
      // Körper: 131.000 Polygone
      const body = this.generateBodyGeometry();
      
      // Merge all geometries
      const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(\[
        face, hands, body
      ]);
      
      return mergedGeometry; // Total: 200.000+ Polygone
    }
    
    private generateFacialGeometry(): THREE.BufferGeometry {
      // Sphere als Basis (32x32 Segmente = \~2k Faces)
      const sphereGeo = new THREE.SphereGeometry(0.12, 32, 32);
      
      // Subdivision (erhöht Poly-Count um Faktor 4)
      const subdividedGeo = this.subdivide(sphereGeo, 3); // 3 Iterationen = 2k \* 64 = \~45k
      
      return subdividedGeo;
    }
  }
  ```

* \[ ] Polygon-Counter implementieren:

```typescript
  function countPolygons(object: THREE.Object3D): number {
    let total = 0;
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const geometry = child.geometry;
        if (geometry.index) {
          total += geometry.index.count / 3;
        } else {
          total += geometry.attributes.position.count / 3;
        }
      }
    });
    return Math.floor(total);
  }
  ```

* \[ ] **VALIDIERUNG:** Jedes NPC-Modell mit `countPolygons()` prüfen — muss ≥200.000 sein

#### 4.2 PBR-Material-System

**Aufgaben:**

* \[ ] Material-Generator:

```typescript
  // src/3d/AAAMaterialSystem.ts
  import \* as THREE from 'three';
  
  export class AAAMaterialSystem {
    createNPCMaterial(config: MaterialConfig): THREE.MeshStandardMaterial {
      const textureLoader = new THREE.TextureLoader();
      
      return new THREE.MeshStandardMaterial({
        map: textureLoader.load(config.baseColorMap), // 4K
        normalMap: textureLoader.load(config.normalMap), // 4K
        roughnessMap: textureLoader.load(config.roughnessMap), // 2K
        metalnessMap: textureLoader.load(config.metalnessMap), // 2K
        aoMap: textureLoader.load(config.aoMap), // 2K
        
        // PBR-Properties
        roughness: 0.8,
        metalness: 0.1,
        
        // Haut-SSS (Subsurface Scattering)
        transmission: 0.1,
        thickness: 0.5
      });
    }
  }
  ```

* \[ ] Placeholder-Texturen generieren (prozedurale Canvas-Texturen bis echte Assets verfügbar):

```typescript
  function generatePlaceholderTexture(size: number, color: string): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, size, size);
    
    // Noise hinzufügen für Realismus
    for (let i = 0; i < size \* size; i++) {
      const x = Math.random() \* size;
      const y = Math.random() \* size;
      ctx.fillStyle = `rgba(0,0,0,${Math.random() \* 0.1})`;
      ctx.fillRect(x, y, 1, 1);
    }
    
    return new THREE.CanvasTexture(canvas);
  }
  ```

#### 4.3 LOD-System (5 Detailstufen)

**Aufgaben:**

* \[ ] LOD-Manager:

```typescript
  // src/3d/LODManager.ts
  export class LODManager {
    private lodLevels = \[
      { distance: 0,   polyCount: 200000, label: 'LOD-0' },
      { distance: 8,   polyCount: 80000,  label: 'LOD-1' },
      { distance: 20,  polyCount: 30000,  label: 'LOD-2' },
      { distance: 50,  polyCount: 8000,   label: 'LOD-3' },
      { distance: 100, polyCount: 500,    label: 'LOD-4' }
    ];
    
    createLODObject(meshes: THREE.Mesh\[]): THREE.LOD {
      const lod = new THREE.LOD();
      
      meshes.forEach((mesh, index) => {
        lod.addLevel(mesh, this.lodLevels\[index].distance);
      });
      
      return lod;
    }
  }
  ```

* \[ ] Alle 5 LOD-Stufen für einen Test-NPC generieren
* \[ ] Performance-Test: 100 NPCs mit LOD-System bei ≥30 FPS

#### 4.4 Stephansdom (Hero-Asset)

**Aufgaben:**

* \[ ] Basis-Geometrie (750k Polygone):

```typescript
  // src/3d/buildings/Stephansdom.ts
  export class StephansdomBuilder {
    generate(): THREE.Group {
      const group = new THREE.Group();
      
      // Hauptturm (Südturm)
      const tower = this.generateGothicTower(136.4); // 136.4m Höhe
      group.add(tower);
      
      // Dach (buntes Ziegelmuster)
      const roof = this.generateZigZagRoof();
      group.add(roof);
      
      // Fassade (gotische Details)
      const facade = this.generateGothicFacade();
      group.add(facade);
      
      return group; // Total: \~750.000 Polygone
    }
    
    private generateGothicTower(height: number): THREE.Mesh {
      // Basis: Oktogon mit 8 Seiten, viele Segmente für Details
      const geometry = new THREE.CylinderGeometry(
        5,    // Radius oben
        8,    // Radius unten
        height, 
        8,    // 8 Seiten (Oktogon)
        256   // 256 Höhen-Segmente für Details
      );
      
      // Material: Stein-Textur (prozedurale Placeholder)
      const material = new THREE.MeshStandardMaterial({
        color: 0x888888,
        roughness: 0.9,
        metalness: 0.0
      });
      
      return new THREE.Mesh(geometry, material);
    }
  }
  ```

* \[ ] **VALIDIERUNG:** `countPolygons(stephansdom)` muss ≥750.000 ergeben

**Deliverables:**

* \[ ] 16 NPC-Typen mit jeweils 200k+ Polygonen (LOD-0)
* \[ ] LOD-System funktioniert (5 Stufen)
* \[ ] PBR-Materials angewendet (auch wenn Texturen noch Placeholder)
* \[ ] Stephansdom-Modell mit 750k+ Polygonen
* \[ ] Polygon-Validierungs-Report erstellt

\---

### Phase 5: Gameplay \& UI-Polishing

**Zeitrahmen:** Woche 9-10
**Gewicht:** 20% des Gesamtprojekts
**Status:** \[ ] Nicht gestartet

#### 5.1 HUD-System

**Aufgaben:**

* \[ ] TelemetryHUD-Component:

```typescript
  // src/components/TelemetryHUD.tsx
  import { View, Text } from 'react-native';
  import { useGameStore } from '../stores/gameStore';
  import { usePerformanceMonitor } from '../hooks/usePerformanceMonitor';
  
  export function TelemetryHUD() {
    const { hour, minute } = useGameStore(state => state.time);
    const eskalation = useGameStore(state => state.eskalationLevel);
    const fps = usePerformanceMonitor();
    
    return (
      <View style={{ position: 'absolute', top: 20, left: 20, right: 20 }}>
        {/\* Zeit \*/}
        <Text style={{ fontSize: 24, color: 'white' }}>
          {hour.toString().padStart(2, '0')}:{minute.toString().padStart(2, '0')}
        </Text>
        
        {/\* Performance \*/}
        <Text style={{ fontSize: 14, color: 'white' }}>
          FPS: {fps.toFixed(1)}
        </Text>
        
        {/\* Eskalation \*/}
        <View style={{ height: 20, backgroundColor: '#333', marginTop: 10 }}>
          <View 
            style={{ 
              height: '100%', 
              width: `${eskalation}%`, 
              backgroundColor: eskalation > 80 ? 'red' : eskalation > 50 ? 'orange' : 'yellow' 
            }} 
          />
        </View>
        <Text style={{ fontSize: 12, color: 'white' }}>
          Tension: {eskalation}%
        </Text>
      </View>
    );
  }
  ```

* \[ ] Minimap (2D-Übersicht):

```typescript
  // src/components/MinimapCanvas.tsx
  import { Canvas, useFrame } from '@react-three/fiber';
  import { OrthographicCamera } from '@react-three/drei';
  
  export function MinimapCanvas({ npcs }: { npcs: NPC\[] }) {
    return (
      <Canvas 
        style={{ 
          position: 'absolute', 
          bottom: 20, 
          right: 20, 
          width: 200, 
          height: 200, 
          border: '2px solid white' 
        }}
      >
        <OrthographicCamera makeDefault position={\[0, 50, 0]} zoom={5} />
        
        {/\* NPCs als Punkte \*/}
        {npcs.map(npc => (
          <mesh key={npc.id} position={\[npc.position.x, 0, npc.position.z]}>
            <sphereGeometry args={\[0.5, 8, 8]} />
            <meshBasicMaterial color={npc.type === 'POLICE' ? 'blue' : 'red'} />
          </mesh>
        ))}
      </Canvas>
    );
  }
  ```

#### 5.2 Dialog-System

**Aufgaben:**

* \[ ] Dialog-Typen:

```typescript
  // src/types/dialog.types.ts
  interface DialogNode {
    id: string;
    speaker: string;
    text: string;
    choices: DialogChoice\[];
  }
  
  interface DialogChoice {
    text: string;
    nextNodeId: string | null;
    consequence?: {
      eskalation?: number;
      reputation?: Record<string, number>;
    };
  }
  ```

* \[ ] Dialog-Manager:

```typescript
  // src/managers/DialogManager.ts
  export class DialogManager {
    private dialogTree: Map<string, DialogNode> = new Map();
    
    loadDialog(tree: DialogNode\[]) {
      tree.forEach(node => this.dialogTree.set(node.id, node));
    }
    
    getNode(id: string): DialogNode | undefined {
      return this.dialogTree.get(id);
    }
    
    executeChoice(choice: DialogChoice) {
      if (choice.consequence) {
        // Eskalation anpassen
        if (choice.consequence.eskalation) {
          useGameStore.getState().eskalationLevel += choice.consequence.eskalation;
        }
        // Reputation anpassen
        if (choice.consequence.reputation) {
          Object.entries(choice.consequence.reputation).forEach((\[faction, change]) => {
            // Update reputation logic
          });
        }
      }
    }
  }
  ```

* \[ ] Dialog-UI-Component (Modal):

```typescript
  // src/components/DialogPanel.tsx
  import { View, Text, TouchableOpacity } from 'react-native';
  
  export function DialogPanel({ node, onChoiceSelect }: DialogPanelProps) {
    return (
      <View style={{ 
        position: 'absolute', 
        bottom: 50, 
        left: 50, 
        right: 50, 
        backgroundColor: 'rgba(0,0,0,0.8)', 
        padding: 20 
      }}>
        <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 10 }}>
          {node.speaker}
        </Text>
        <Text style={{ color: 'white', marginBottom: 20 }}>
          {node.text}
        </Text>
        
        {node.choices.map((choice, index) => (
          <TouchableOpacity 
            key={index}
            onPress={() => onChoiceSelect(choice)}
            style={{ 
              backgroundColor: '#444', 
              padding: 10, 
              marginBottom: 10, 
              borderRadius: 5 
            }}
          >
            <Text style={{ color: 'white' }}>{choice.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
  ```

#### 5.3 Taktik-Menü

**Aufgaben:**

* \[ ] Taktische Befehle definieren (siehe Abschnitt 4.5)
* \[ ] UI-Component mit Grid-Layout
* \[ ] Befehlsausführung (Polizei-Formationen)

#### 5.4 3D-Audio (Spatial Audio)

**Aufgaben:**

* \[ ] WebAudio-Engine (siehe Abschnitt 3.4 im Original)
* \[ ] Prozedurale Sounds: Sirenen, Schüsse, Crowd-Murmeln
* \[ ] Audio-Quellen an NPC-Positionen binden

**Deliverables:**

* \[ ] Vollständiges HUD (Zeit, Performance, Eskalation, Minimap)
* \[ ] Dialog-System mit ersten 5 Gesprächen
* \[ ] Taktik-Menü mit 8 Befehlen
* \[ ] Spatial Audio funktioniert (Sirenen folgen Polizeifahrzeugen)

\---

### Phase 6: Validierung \& Deployment

**Zeitrahmen:** Woche 11-12
**Gewicht:** 10% des Gesamtprojekts
**Status:** \[ ] Nicht gestartet

#### 6.1 KI-Validierung

**Aufgaben:**

* \[ ] AIValidationAgent implementieren (siehe Abschnitt 5.1)
* \[ ] 111 Test-Cases schreiben:

  * \[ ] 45 Unit-Tests (Vitest)
  * \[ ] 25 Integration-Tests
  * \[ ] 15 Stress-Tests
  * \[ ] 16 Polygon-Tests
  * \[ ] 10 Performance-Tests
* \[ ] CI/CD-Pipeline konfigurieren:

```yaml
  # .github/workflows/ci.yml
  name: JetBRAIN CI/CD
  
  on:
    push:
      branches: \[main]
  
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - name: Setup Node.js
          uses: actions/setup-node@v3
          with:
            node-version: '20'
        - name: Install Dependencies
          run: npm ci
        - name: Run Tests
          run: npm test
        - name: Build
          run: npm run build
  ```

#### 6.2 Performance-Validierung

**Aufgaben:**

* \[ ] FPS-Profiling (alle Szenarien aus Tabelle 5.3 durchgehen)
* \[ ] Memory-Leak-Detection (10h Run)
* \[ ] GPU-Last-Messung (Home-PC muss bei 0% bleiben!)

#### 6.3 Beweisdokumentation

**Aufgaben:**

* \[ ] Screenshots erstellen (20+ Bilder)
* \[ ] Videos aufnehmen:

  * \[ ] 24h-Timelapse (24 Minuten Echtzeit)
  * \[ ] Peak-Chaos-Highlight (5 Minuten)
  * \[ ] LOD-System-Demo (3 Minuten)
* \[ ] Reports generieren:

  * \[ ] `POLYGON\_REPORT.md`
  * \[ ] `PERFORMANCE\_TELEMETRIE.md`
  * \[ ] `EVENT\_SYSTEM\_LOG.md`
  * \[ ] `VALIDIERUNGS\_BERICHT.md`

#### 6.4 Production Deployment

**Aufgaben:**

* \[ ] Deployment-Platform auswählen (Vercel / Netlify / Railway / Render)
* \[ ] Build-Optimierung:

```bash
  npm run build --production
  # Output: Minified, Tree-Shaken, Code-Splitted
  ```

* \[ ] GitHub Actions Deployment-Job hinzufügen
* \[ ] Live-URL testen
* \[ ] DNS-Setup (falls Custom-Domain)

**Deliverables:**

* \[ ] Alle Tests grün (111/111 passed)
* \[ ] Performance-Targets erreicht
* \[ ] Vollständige Dokumentation
* \[ ] Live-Production-URL
* \[ ] Home-PC-Temperatur-Bestätigung (<50°C während gesamter Entwicklung)

\---

## 7\. KRITISCHE ERFOLGSFAKTOREN (NON-NEGOTIABLE)

### 7.1 Home-PC-Schutz (ABSOLUT KRITISCH!)

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                    ⚠️ HOME-PC PROTECTION RULES ⚠️                         ║
╠═══════════════════════════════════════════════════════════════════════════╣
║ REGEL 1: KEINE LOKALEN INSTALLS                                          ║
║ • Kein `npm install` auf Home-PC                                          ║
║ • Kein `node`, `python`, `cargo` auf Home-PC                              ║
║ • Alle Installs NUR in CodeAnywhere                                       ║
║                                                                           ║
║ REGEL 2: KEINE LOKALEN BUILDS                                            ║
║ • Kein `npm run build` auf Home-PC                                        ║
║ • Kein Webpack, Vite, Rollup lokal                                        ║
║ • Alle Builds NUR in CodeAnywhere                                         ║
║                                                                           ║
║ REGEL 3: KEINE LOKALEN TESTS                                             ║
║ • Kein `npm test` auf Home-PC                                             ║
║ • Kein Vitest, Jest lokal                                                 ║
║ • Alle Tests NUR in CodeAnywhere oder CI/CD                               ║
║                                                                           ║
║ REGEL 4: NUR BROWSER-ZUGRIFF                                             ║
║ • Home-PC öffnet nur Browser (Brave Nightly)                             ║
║ • URL: https://strazzusochr-pandemiesar-dqkjzls69o.app.codeanywhere.com/ ║
║ • Keine lokalen Dateien, keine IDEs                                       ║
║                                                                           ║
║ ÜBERWACHUNG:                                                              ║
║ • CPU-Temperatur muss <50°C bleiben                                      ║
║ • GPU-Temperatur muss <50°C bleiben                                      ║
║ • Bei >60°C: SOFORT alle Prozesse beenden!                               ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

### 7.2 Performance-Garantien

**Status:** \[ ] Noch nicht gemessen

|Szenario|Target FPS|GPU-Last (Home)|Status|
|-|-|-|-|
|CodeAnywhere IDE geöffnet|N/A|0%|\[ ] Zu verifizieren|
|Browser-Tab (Preview)|N/A|<5%|\[ ] Zu verifizieren|
|50 NPCs in Cloud-Render|≥60 FPS|0%|\[ ] Zu testen|
|200 NPCs Peak Chaos|≥30 FPS|0%|\[ ] Zu testen|

### 7.3 Polygon-Garantien

**Status:** \[ ] Noch nicht validiert

* \[ ] Alle 16 NPC-Typen: ≥200.000 Polygone (LOD-0)
* \[ ] Stephansdom: ≥750.000 Polygone
* \[ ] Automatisierte Validierung mit `PolygonValidator.ts`

\---

## 8\. QUALITÄTSSICHERUNG (CHECKLISTE)

### Pre-Deployment Checklist

**Kern-Systeme:**

* \[ ] Zeit-System läuft korrekt (1 Sek = 1 Min)
* \[ ] Alle 40+ Events registriert und getestet
* \[ ] NPC-Spawning funktioniert
* \[ ] Event-Ketten funktionieren (Ultimatum → Gewalt → Chaos)

**Grafik:**

* \[ ] Alle 16 NPC-Typen haben ≥200k Polygone
* \[ ] LOD-System wechselt korrekt (5 Stufen)
* \[ ] PBR-Materials angewendet
* \[ ] Stephansdom hat ≥750k Polygone

**Performance:**

* \[ ] 50 NPCs bei ≥60 FPS
* \[ ] 200 NPCs bei ≥30 FPS
* \[ ] Memory-Footprint <3GB
* \[ ] Keine Memory-Leaks (10h Run)

**UI/UX:**

* \[ ] HUD vollständig (Zeit, FPS, Eskalation, Minimap)
* \[ ] Dialog-System funktioniert
* \[ ] Taktik-Menü funktioniert
* \[ ] Controls responsiv (Touch + Maus)

**Tests:**

* \[ ] 111/111 Tests grün
* \[ ] ESLint: 0 Errors, 0 Warnings
* \[ ] TypeScript: Keine `any`, Strict Mode

**Deployment:**

* \[ ] Build erfolgreich
* \[ ] Live-URL erreichbar
* \[ ] Alle Assets laden
* \[ ] Keine 404-Errors

**Home-PC-Schutz:**

* \[ ] CPU-Temperatur <50°C während gesamter Entwicklung
* \[ ] GPU-Temperatur <50°C während gesamter Entwicklung
* \[ ] Keinerlei lokale Prozesse gelaufen
* \[ ] Nur Browser-Zugriff auf CodeAnywhere

\---

## 9\. NÄCHSTE SCHRITTE (SOFORTIGE AKTIONEN)

### Schritt 1: CodeAnywhere verifizieren

```bash
# In CodeAnywhere Terminal:
node --version  # Sollte ≥20.0.0 sein
npm --version   # Sollte ≥10.0.0 sein
git --version   # Sollte ≥2.40.0 sein
```

### Schritt 2: Repository klonen

```bash
cd /workspace
git clone https://github.com/strazzusochr/PandemieSARScov.git
cd PandemieSARScov
```

### Schritt 3: Expo-Projekt initialisieren

```bash
npx create-expo-app@latest . --template blank-typescript
npm install react@19.0.0 react-native expo-router
npm install three@0.170.0 @react-three/fiber @react-three/drei
npm install zustand @types/three
```

### Schritt 4: Erste Test-App

```bash
# App starten
npm start

# Web-Preview öffnen
# URL sollte in CodeAnywhere Terminal erscheinen
```

### Schritt 5: Home-PC-Temperatur-Check

* \[ ] Öffne nur Browser (Brave Nightly)
* \[ ] Navigiere zu CodeAnywhere-URL
* \[ ] Prüfe CPU-Temperatur (sollte <50°C sein)
* \[ ] Prüfe GPU-Temperatur (sollte <50°C sein)

\---

## 10\. ANHANG

### A. Entwicklungs-URLs

|Resource|URL|
|-|-|
|**CodeAnywhere Cloud IDE**|`https://strazzusochr-pandemiesar-dqkjzls69o.app.codeanywhere.com/`|
|**GitHub Repository**|`https://github.com/strazzusochr/PandemieSARScov.git`|
|**Production (TBD)**|*Noch nicht deployed*|

### B. Tastenkürzel (Geplant)

|Taste|Funktion|
|-|-|
|**E**|Dialog öffnen (mit NPC interagieren)|
|**C**|Taktik-Menü öffnen|
|**Tab**|HUD ein/ausblenden|
|**M**|Minimap vergrößern|
|**Space**|Pause (Zeit anhalten)|
|**F**|Freie Kamera (Drone-View)|
|**1-9**|Squad-Auswahl (Polizei-Einheiten)|

### C. NPC-Typen (16 Total)

|ID|Typ|Polygon-Budget|LOD-0 Status|
|-|-|-|-|
|1|POLICE|200.000+|\[ ] Zu erstellen|
|2|RIOT\_POLICE|200.000+|\[ ] Zu erstellen|
|3|SEK|200.000+|\[ ] Zu erstellen|
|4|DEMONSTRATOR|200.000+|\[ ] Zu erstellen|
|5|KRAUSE (Hero)|200.000+|\[ ] Zu erstellen|
|6|CIVILIAN|200.000+|\[ ] Zu erstellen|
|7|JOURNALIST|200.000+|\[ ] Zu erstellen|
|8|MEDIC|200.000+|\[ ] Zu erstellen|
|9|FIREFIGHTER|200.000+|\[ ] Zu erstellen|
|10|EXTREMIST|200.000+|\[ ] Zu erstellen|
|11|WATER\_CANNON\_OPERATOR|200.000+|\[ ] Zu erstellen|
|12|POLICE\_CHIEF|200.000+|\[ ] Zu erstellen|
|13|STREET\_VENDOR|200.000+|\[ ] Zu erstellen|
|14|TOURIST|200.000+|\[ ] Zu erstellen|
|15|SECURITY\_GUARD|200.000+|\[ ] Zu erstellen|
|16|CHILD|200.000+|\[ ] Zu erstellen|

\---

**PROJEKT-STATUS:** 🔴 NICHT GESTARTET — Bereit für Phase 1
**DOKUMENT-VERSION:** 3.0 (Vollständig zurückgesetzt, neue Cloud-Infrastruktur)
**LETZTE AKTUALISIERUNG:** 2025-03-19
**NÄCHSTER MEILENSTEIN:** Phase 1 — Cloud-Setup \& Projekt-Initialisierung

\---

## ⚠️ ABSCHLUSS-WARNUNG

**KRITISCH:** Dieses Dokument ist eine vollständige Neufassung. Alle vorherigen Fortschritte wurden zurückgesetzt. Der einzige genehmigte Entwicklungsweg ist:

1. **CodeAnywhere Cloud IDE:** Alle Entwicklung hier
2. **GitHub Repository:** Code-Speicherung hier
3. **Home-PC:** NUR Browser-Zugriff, KEINE lokalen Prozesse

**Bei Verstoß gegen Home-PC-Schutz-Regeln:** Sofortiger Projektabbruch wegen Hardware-Schaden-Risiko!

**Temperatur-Grenzwerte:**

* **<50°C:** ✅ Sicher (Normal-Betrieb)
* **50-60°C:** ⚠️ Warnung (Browser schließen)
* **60-80°C:** 🔥 Kritisch (Sofort alle Tabs schließen)
* **80-94°C:** ☠️ NOTFALL (PC runterfahren, Projekt pausieren)

**Erfolgs-Bestätigung:** Projekt gilt nur als erfolgreich, wenn Home-PC während gesamter Entwicklung <50°C bleibt!

