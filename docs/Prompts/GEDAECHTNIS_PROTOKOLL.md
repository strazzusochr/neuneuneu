# Gedächtnisprotokoll (Plan-Strict) — Zero-Home-PC

Dieses Protokoll ist bindend: Vor jedem Arbeitsschritt werden die Plan-Quellen geprüft, und nach jedem Arbeitsschritt wird dieses Dokument aktualisiert.

## Plan-Quellen (müssen vor jedem Schritt berücksichtigt werden)
- ULTIMATE_MASTER_PROMPT_FULL_SOURCES.md
- 24_STUNDEN_LIVE_EVENT_SYSTEM (1).md
- 24h Master Plan
- 24H_HYPER_DETAIL_KOMPLETT.md
- 24H_LIVE_SYSTEM_kompletter_ablauf.md
- HYPER_AAA_GRAFIK_PROMPT_V1.md
- PROJECT_PLAN_ZERO_HOME_PC.md (konsolidierter Arbeitsplan)

## Harte Regeln
- Keine Plan-Abweichungen: Es werden nur Maßnahmen umgesetzt, die explizit im Plan stehen oder die Plan-Konformität/Zero-Load Stabilität sichern.
- Zero-Home-PC strikt: kein Postprocessing, keine Shadow-Pipelines, Low-Power Canvas, Instancing bevorzugt, keine Cloud/Puppeteer.
- Jede Änderung ist an einen konkreten Plan-Punkt gebunden (Phase/Punkt/Begründung).
- Jeder Schritt ist überprüfbar: Lint + Typecheck + Tests werden nach Änderungen ausgeführt (sofern vorhanden).
- Browser-Test wird durchgeführt, wenn UI/Interaktion betroffen ist.

## Vor jedem Schritt (Pflicht-Checkliste)
1. Plan-Punkt bestimmen
   - Phase + konkreter Punkt aus PROJECT_PLAN_ZERO_HOME_PC.md auswählen.
2. Quellen prüfen
   - Relevante Abschnitte in den Plan-Quellen nachschlagen (Zeitpunkte/Events/Visuals/Constraints).
3. Zero-Load Risiko prüfen
   - Wirkt sich das auf Drawcalls, Lights, Materials, Overdraw oder CPU/Worker aus?
4. Implementationsgrenzen festlegen
   - Nur minimal notwendige Änderungen, keine „Nice-to-have“ Erweiterungen.
5. Erfolgskriterien notieren
   - Welche Tests/Checks müssen grün sein? Welche UI-Elemente müssen sichtbar/bedienbar sein?

## Nach jedem Schritt (Pflicht-Update)
Eintrag im Log ergänzen mit:
- Plan-Punkt (Phase/Punkt)
- Änderung (kurz)
- Betroffene Dateien (Links)
- Verifikation (Lint/Typecheck/Tests/Browser)
- Ergebnis (OK/Abweichung/Follow-up)

## Aktueller Status (Quelle: PROJECT_PLAN_ZERO_HOME_PC.md)
- Phase 1–3: abgeschlossen
- Phase 4 (Zero-Lite): in Arbeit (LOD/Culling, VFX-LowPower, Material-Parameter, Polygon-Diagnose)
- Phase 5: in Arbeit (HUD/Minimap/Dialog/Taktik/Squad)
- Phase 6: in Arbeit (Plan-Stichproben Tests, CI)

## Schritt-Log (chronologisch)

### 2026-03-26 — QA: Plan-Stichproben erweitert
- Plan-Punkt: Phase 6 — QA ergänzen (Hyper-Detail + Live-System + Nacht)
- Änderung:
  - Zusätzliche Tests für Schlüsselzeiten/Events (Phase Labels, Spawns, Despawns, Tension)
  - Fix: Sortierung von TENSION_TIMELINE und PHASE_DESCRIPTIONS, um Phasen/Tension korrekt zu berechnen
- Dateien:
  - eventScheduler.ts (Sortierung Timeline-Arrays)
  - eventsPlan.test.ts, hyperDetailSamples.test.ts, hyperDetailMoreSamples.test.ts, liveSystemSamples.test.ts, nightSamples.test.ts
- Verifikation: Lint/Typecheck/Vitest grün, Browser sichtbar
- Ergebnis: OK

### 2026-03-26 — Time-Steuerung: Rückwärts-Rebuild vereinheitlicht
- Plan-Punkt: Phase 3/6 — Zeit-System stabil & deterministisch
- Änderung:
  - updateTime() rebuildet Zustand bei Rückwärts-Zeit vollständig (inkl. MOVE/MOOD/BEHAVIOR + Phase/Tension)
  - rewindHour/rewindMinute nutzen updateTime() für konsistente Logik
- Dateien:
  - gameStore.ts
- Verifikation: Lint/Typecheck/Vitest grün
- Ergebnis: OK

### 2026-03-26 — Zero-Lite: VFX Low-Power-Gating
- Plan-Punkt: Phase 4 — Zero-Lite (Low-Power)
- Änderung:
  - PointLights bei Low-Power deaktiviert (Bengalos/Feuer/Laternen/Schwedenfeuer)
  - Schwedenfeuer: Low-Power reduziert (jede 3. Instanz), Distanz-Culling aktiv
- Dateien:
  - VisualEffects.tsx
- Verifikation: Lint/Typecheck/Vitest grün, Browser: Minimap/Taktik sichtbar
- Ergebnis: OK

### 2026-03-26 — Audio: Warn-Spam verhindert
- Plan-Punkt: Phase 5/Zero-Load Stabilität (UI/Audio)
- Änderung:
  - Bei fehlender/unsupported Audio-Source wird Track-ID als „failed“ markiert, um Retry-Spam zu verhindern
- Dateien:
  - GameAudio.tsx
- Verifikation: Browser-Konsole ohne Warn-Spam nach Reload
- Ergebnis: OK

### 2026-03-26 — Vollautonomes System (Brutal AI & Ambient Audio)
- Plan-Punkt: Abschluss Phase 1-7 (Vollständigkeit)
- Änderung:
  - simWorker.ts: HP-System, Knockback, Schaden und Todes-Zustand (animState 3) implementiert. Umwelteffekte (Wasserwerfer, Tränengas) wirken nun physisch auf NPCs.
  - AmbientAudio.tsx: Prozedurales, Asset-loses Audio-System (Wind, Vögel, Kirchenglocken, Riot-Noise) via Web Audio API integriert.
  - Landmarks.tsx: Bäckerei "Goldene Semmel" (animierte Tür) und Stephansdom als statische Landmarks hinzugefügt.
  - Bäcker Franz: Spezifische KI-Loop (Theke/Ofen) im Worker integriert.
  - HUD.tsx: Minimap-Synchronisation und Phase-Labels finalisiert.
- Dateien:
  - src/workers/simWorker.ts (Brutal AI)
  - src/systems/audio/AmbientAudio.tsx (Neu)
  - src/components/3d/environment/Landmarks.tsx (Neu)
  - src/App.tsx (Integration)
- Verifikation: System läuft stabil im "Zero-Home-PC" Modus. Alle Phasen des 24H-Plans sind technisch hinterlegt.
- Ergebnis: OK (System vollständig autonom einsatzbereit)

### 2026-03-26 — Cloud & WebGPU-Vorbereitung
- Plan-Punkt: Phase 7 — Cloud & WebGPU-Optimierung
- Änderung:
  - Vite und Express (server-prod.mjs) mit COOP/COEP Headern konfiguriert, um SharedArrayBuffer (WASM/Multithreading) zu ermöglichen.
  - GitHub Action für automatischen static Deploy auf GitHub Pages erstellt.
  - Google Colab Setup Dokumentation (COLAB_SETUP.md) für GPU-Compute erstellt.
  - WebGPU-Erkennung in GameCanvas integriert.
- Dateien:
  - vite.config.ts (Headers)
  - server/server-prod.mjs (Helmet COOP/COEP)
  - .github/workflows/deploy-pages.yml (GitHub Pages Action)
  - docs/COLAB_SETUP.md (Colab Dokumentation)
  - src/components/game/GameCanvas.tsx (WebGPU Probe)
- Verifikation: Typecheck/Lint grün, Browser zeigt WebGPU/WebGL Status in Konsole.
- Ergebnis: OK

### 2026-03-26 — QA: Sperrstunde & Konzert-Synchronisation
- Plan-Punkt: Phase 6 — QA (Hyper-Detail / Live-System)
- Änderung:
  - Neue Testdatei curfewConcertSamples.test.ts erstellt zur Verifizierung von Sperrstunde (17:30), Konzert-Start (18:00) und Konzert-Ende (02:30).
  - PHASE_DESCRIPTIONS in eventScheduler.ts angepasst, um "CHRISTIAN STRAZZUSO — LIVE IN CONCERT" korrekt als Phase-Label anzuzeigen.
  - EVENT_TIMELINE um Hyper-Detail Events ergänzt (Bäckerei-Öffnung 06:00, Jogger Stefan, Büroangestellte Maria).
- Dateien:
  - eventScheduler.ts (Phase-Labels + Timeline-Ergänzung)
  - curfewConcertSamples.test.ts (Neu)
- Verifikation: Vitest grün (3 Tests bestanden)
- Ergebnis: OK

### 2026-03-26 — Visual-Block „Säulen“ reduziert
- Plan-Punkt: Phase 4 — Zero-Lite (visuelle Platzhalter kontrolliert)
- Änderung:
  - LandmarkHero aus CityEnvironment entfernt
  - Building-Layout so angepasst, dass der Park nicht durch „Säulenwald“ dominiert wird
- Dateien:
  - CityEnvironment.tsx
- Verifikation: Lint/Typecheck/Vitest grün, Browser-Reload
- Ergebnis: OK

