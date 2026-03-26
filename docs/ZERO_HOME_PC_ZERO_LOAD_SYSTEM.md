# 🏛️ ZERO HOME-PC BELASTUNGS SYSTEM (Zero-Load / Hyper-AAA) — Projekt-Standard
*(Verbindliches Architektur-Gedächtnis für dieses Repo. Ziel: keine 94°C mehr.)*

**STATUS:** ✅ AKTIV  
**ZIEL:** Lokal lauffähig, sehr niedrige Last, keine Cloud- oder Headless-Renderer-Abhängigkeit.

---

## 🛑 Goldene Regeln (Hardware-Schutz)
- Keine Cloud-Rendering-Pipeline, kein Remote-GPU-Workflow als Pflicht.
- Keine Headless Browser Renderer/Stream-Proxies (Puppeteer/WebRTC/MJPEG) im Projekt-Stack.
- Keine Post-Processing Shader Pipeline im Default-Run (Bloom/Chromatic/Tiefen-Effects).
- Keine Schatten-Pipelines als Default (ShadowMaps/ContactShadows) bei Home-PC-Betrieb.

---

## 🧱 Säule 1 — Radikales Instancing (Drawcalls minimieren)
**Regel:** Iterative Objektmengen dürfen nicht als viele einzelne `<mesh>` gerendert werden, sondern müssen als `THREE.InstancedMesh` laufen.

**Ist-Zustand im Projekt:**
- NPCs: Instancing ist aktiv.
- Stadt: Gebäude + Straßen sind instanziert.

**Relevante Dateien:**
- [CityEnvironment.tsx](file:///c:/Users/immer/Desktop/newwebgame/src/components/3d/environment/CityEnvironment.tsx)
- [InstancedHumanoid.tsx](file:///c:/Users/immer/Desktop/newwebgame/src/components/characters/InstancedHumanoid.tsx)

---

## 🖼️ Säule 2 — Low-Power Canvas Profil (GPU-Hitzefallen vermeiden)
**Regel:** Canvas läuft mit minimaler GPU-Konfiguration.

**Soll-Konfiguration (Default):**
- `dpr={1}`
- `gl={{ antialias: false, alpha: false, stencil: false, powerPreference: 'low-power' }}`
- Keine `ContactShadows` / keine `castShadow` / keine `shadow-mapSize` als Default

**Relevante Datei:**
- [GameCanvas.tsx](file:///c:/Users/immer/Desktop/newwebgame/src/components/game/GameCanvas.tsx)

---

## 🧠 Säule 3 — UI als DOM-Overlay (keine Canvas-Re-Renders)
**Regel:** HUD/Telemetry läuft als normales React DOM über dem Canvas und triggert keine teuren 3D-Rebuilds.

**Ist-Zustand im Projekt:**
- HUD läuft als Overlay.

**Relevante Dateien:**
- [HUD.tsx](file:///c:/Users/immer/Desktop/newwebgame/src/components/ui/HUD.tsx)
- [App.tsx](file:///c:/Users/immer/Desktop/newwebgame/src/App.tsx)

---

## 🔌 Realtime/Backend Verdrahtung (ohne Kollisionen)
Dieses Repo nutzt Socket.IO für Sync (Zeit/State). Ports sind bewusst so gewählt, dass keine Standard-Ports anderer Systeme “geblockt” werden.

### Default-Ports (kollisionsarm)
- Frontend: `8081`
- Backend: `4001`

### Konfigurierbare Ports (ENV)
- Frontend (Vite): `VITE_CLIENT_PORT`
- Proxy-Ziel zum Backend (Vite): `VITE_BACKEND_PORT`
- Backend: `BACKEND_PORT` (oder `PORT`)

**Relevante Dateien:**
- [vite.config.ts](file:///c:/Users/immer/Desktop/newwebgame/vite.config.ts)
- [server.js](file:///c:/Users/immer/Desktop/newwebgame/server/server.js)
- [server-prod.mjs](file:///c:/Users/immer/Desktop/newwebgame/server/server-prod.mjs)

---

## 🚀 Start-Sequenz (Zero-Load Local)
### Terminal 1 (Backend)
```bash
$env:BACKEND_PORT=4001; node server/server.js
```

### Terminal 2 (Frontend)
```bash
$env:VITE_CLIENT_PORT=8081; $env:VITE_BACKEND_PORT=4001; npm run dev
```

### Browser
- http://localhost:8081/

---

## ✅ Verifikation (muss grün sein)
```bash
npm run lint
npx tsc -b --noEmit
npm run build
```

---

## 🚫 Verbotene Komponenten im Default-Stack
- Puppeteer/Headless Streamer/Proxy
- Cloud-Abhängigkeit als Pflicht
- Postprocessing-Pipelines als Default
- Heavy Shadow Pipelines als Default

---

## 🔁 Änderungsregel
Wenn Performance-/Render-Änderungen gemacht werden, müssen sie dieses Dokument aktualisieren, damit “Zero Home-PC Belastung” dauerhaft erhalten bleibt.

