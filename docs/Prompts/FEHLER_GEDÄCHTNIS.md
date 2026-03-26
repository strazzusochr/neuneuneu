# 🚫 JETBRAIN — CORONA CONTROL ULTIMATE: FEHLER-GEDÄCHTNIS

> **MANDATORY CHECK-IN:** Dieses File **MUSS** vor Beginn jedes neuen Schrittes oder jeder Fehlerbehebung von der KI konsultiert werden, um historische, wiederkehrende Bugs zu vermeiden.

---

## 🛑 BUG-001: WebGL Rendering Crashing (Browser Tab Crashes)
**Symptom:** AI Browser Tabs und CodeAnywhere crashen bei `localhost:5173`.
**Ursache:** Heavy WebGL 3D Rendering im Browser zieht zu viel Memory/GPU-Power auf billigen VMs/Cloud-Umgebungen.
**Fix:** True "Zero Local GPU Load" Architektur eingeführt. 3D-Szene wird Headless auf dem Server mit Puppeteer gerendert (`server.js`) und als roher MJPEG-Videostream über WebSockets ("Thin-Client" in `PixelStream.tsx`) zum Frontend gestreamt.
**Prävention (NIE VERGESSEN):** Implementiere NIEMALS direkte, speicherintensive Three.js/WebGL-Routinen für den Endnutzer, es sei denn, er befindet sich im dedizierten `?renderer=true` Headless-Modus. Alles muss als Video-Loop gestreamt werden!

## 🛑 BUG-002: EADDRINUSE (Port Conflicts 3001 / 5173)
**Symptom:** `Error: listen EADDRINUSE: address already in use :::3001`.
**Ursache:** Die Node.js Prozesse terminierten nicht, wenn die KI das Shell-Fenster schloss oder abstürzte.
**Fix:** Windows Powershell-Strategie mit `Start-Process ... -NoNewWindow` und sauberes Töten über `Stop-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess`.
**Prävention:** Vor jedem Neustart oder Build MÜSSEN die belegten Ports auf OS-Ebene aktiv geprüft und getötet werden, um Ghost-Prozesse zu verhindern.

## 🛑 BUG-003: 511 Network Auth Required (Localtunnel)
**Symptom:** KI und User sehen im Browser nur einen grauen Fehler "511 Network Auth Required" von der Localtunnel-Warnseite.
**Ursache:** Localtunnel blockiert den API-Traffic mit einem "Click to Continue" Screen.
**Fix:** In den Axios-/Fetch-Requests oder beim Einrichten von Tunnels Header wie `Bypass-Tunnel-Reminder: true` mitgeben. Alternativ einen anderen Tunneling-Dienst nutzen.
**Prävention:** Sobald Localtunnel genutzt wird, an den Auth-Bypass denken oder den Nutzer aufrufen lassen und manuell die Warnung wegklicken lassen.

## 🛑 BUG-004: TypeScript NodeNext Resolution Imports
**Symptom:** Error: `Cannot find module '../gameStore.js' or its corresponding type declarations.`
**Ursache:** In Projekten mit `"moduleResolution": "NodeNext"` (oder ESM) erwartet der TS-Compiler bei relativen Importen IMMER die Endung `.js` am Import-Pfad.
**Fix:** Explicit file extensions (`import ... from '../gameStore.js'`) einbauen.
**Prävention:** Jeder neue TypeScript-Import im Backend muss zwingend auf `.js` enden.

## 🛑 BUG-005: Unsichtbare NPCs (Shift Manager Off-Screen Spawning)
**Symptom:** Die Schicht-Polizei erschien um 20:00 Uhr nicht auf dem Raster. (Gemeldet von User in Phase 10).
**Ursache:** Die Spawn-Koordinaten `[0, 0, -80]` lagen gigantisch weit außerhalb des Kamera-Bereichs `[10x10]`.
**Fix:** Zentrierung der Spawn-Vektoren auf Kamera-nahe Werte (`[8, 0, 8]` etc.).
**Prävention:** Codiere niemals 3D-Welt-Koordinaten blind in Systeme. Kenne die Kamera-Position (`[0, 5, 10]`) und setze Bounds (`Max Z = -15`, `Max X = 15`), damit Spawns für den Spieler direkt sichtbar sind.

## 🛑 BUG-006: Primitive Sphere Placeholder anstelle von "AAA Graphics"
**Symptom:** Figuren sehen nur wie farbige Bälle ("nur ein großer Ball in der Mitte und drei farbige außen rum") aus.
**Ursache:** Phase 4 nutzte `<Sphere>` als Platzhalter, die nicht aktualisiert wurden.
**Fix:** Muss in Phase 10/11 durch detailliertere zusammengesetzte Meshes oder GLTF ausgetauscht werden.
**Prävention:** Placeholder so früh wie möglich durch finale visuelle Repräsentationen ersetzen, wenn AAA gefordert wird.
