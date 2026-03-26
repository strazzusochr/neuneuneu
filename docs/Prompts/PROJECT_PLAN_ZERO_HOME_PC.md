# 3D Projektplan (Zero-Home-PC) – Aktueller Stand & Nächste Schritte

Dieser Plan konsolidiert die Architektur-Vorgaben aus:
- ULTIMATE_MASTER_PROMPT_FULL_SOURCES.md
- 24_STUNDEN_LIVE_EVENT_SYSTEM (1).md
- 24h Master Plan
- 24H_HYPER_DETAIL_KOMPLETT.md
- 24H_LIVE_SYSTEM_kompletter_ablauf.md
- HYPER_AAA_GRAFIK_PROMPT_V1.md

Der Plan ist strikt auf das Zero-Home-PC System ausgerichtet: keine Cloud/Puppeteer, keine Post-Processing/Shadow-Pipelines, Low-Power Canvas, durchgängiges Instancing.

## Gedächtnisprotokoll (Pflicht)
- Vor jedem Schritt: Plan-Punkt bestimmen und relevante Quellen prüfen.
- Nach jedem Schritt: Umsetzung + Verifikation in GEDAECHTNIS_PROTOKOLL.md dokumentieren.

## Phasenstatus
- Phase 1 (Setup): abgeschlossen
- Phase 2 (3D Core): abgeschlossen (Low-Power Canvas, leichtes Grid/Floor)
- Phase 3 (24h System): abgeschlossen (Timeline, Realtime, Worker-Bridge, Echo-Fix)
- Phase 4 (Hyper-AAA Zero-Lite): in Arbeit
  - LOD Manager (near/mid/far) implementiert und im NPC-Rendering aktiv
  - Landmark Hero instanziert (Emissive Glow), Distanz-Visibility aktiv
  - Bühne (DemoStage) Distanz-Visibility aktiv, Low-Power Lighting Gate
  - Stadt-Materialien konsistent (Preset-Parameter ohne Textur-Maps)
  - Polygon-Diagnose (Tris/Instanzen) eingebaut, Anzeige im HUD
  - Umgebung Zero-Lite: Trees/Street Lamps/SpawnMarkers mit Distanz-Sichtbarkeit
  - VFX Zero-Lite: Low-Power-Gating für PointLights (Bengalos/Feuer/Laternen/Schwedenfeuer), Schwedenfeuer-Reduktion im Low-Power
- Phase 5 (Gameplay & UI-Polish): in Arbeit
  - TelemetryHUD mit FPS/Tension/NPC/PolyStats
  - Minimap (M): Legende, Typ-Markierung (Police/Riot/SEK Formen), Squad-Ziel/Nummer, Squad-Rahmen, Squad-Mitglieder Highlight
  - Dialog (E, Krause), Taktik-Menü (C), Squad-MOVE (1–9)
  - AI-Feedback Moods/Behaviors mit Balken
  - Formation-Chips (SHIELD_WALL/SURROUND/GUARD/PATROL Counts)
- Phase 6 (QA): in Arbeit
  - Tests: Timeline-Order, Zeitzyklus-Kontinuität, MAX_ACTIVE_NPCS Cap, LOD-Grenzen, Polygon-Validator, HUD-Controls, Squad-MOVE, Ereignis-Schlüsselzeiten, Hyper-Detail Stichproben (Bäckerei, Jogger, Büro), Sperrstunde/Konzert-Sync (17:30/18:00/02:30), Live-System Stichproben, Nacht (00:00/01:00)
  - CI-Workflow aktiv (lint/ts/test/build)
- Phase 7 (Cloud & WebGPU-Optimierung): gestartet
  - COOP/COEP Header in Vite konfiguriert für SharedArrayBuffer Support (WASM/Multithreading)
  - Vorbereitung für GitHub Pages & Oracle Free Tier (Static Assets / Server-mjs)
  - WebGPU-Renderer Kompatibilität (Three.js 0.182+) geprüft

## Nächste Schritte (Aktionsliste)
1. WebGPU-Fallback in GameCanvas implementieren (falls Browser-Support vorhanden).
2. GitHub Action für automatischen Deploy auf GitHub Pages (static) erstellen.
3. Oracle-Server-Startscript für Production-mjs optimieren (Compression/Helmet).
4. QA ergänzen: Weiterführung der stichprobenartigen Abdeckung aus „24H_HYPER_DETAIL_KOMPLETT.md“.
5. LOD-Profil vereinheitlichen (einheitliche Schwellen/Utilities) für Stage/Landmark/Environment/Markers.
6. Minimap Polishing: kompakte Darstellung von Squad-Anteilen und Formation-Infos, bewahrt Low-Power.

## Zero-Load Garantie
- InstancedMesh überall, keine PostFX/Shadows, Low-Power Canvas (dpr=1, antialias=false, powerPreference=low-power).
- Keine Cloud/Puppeteer, keine Kopflose Renderer, alle Änderungen lokal und leichtgewichtig.
