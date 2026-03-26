# 🔒 CHECKPOINT v1.1-STABLE — Corona Control Ultimate

> Referenzpunkt für die Wiederherstellung eines vollständig funktionsfähigen Spielzustands.

---

## 1. ANKER-SYSTEM

| Anker             | Wert                     |
| ----------------- | ------------------------ |
| 🏷️ **Version**    | `v1.1-STABLE`            |
| ⏰ **Datum**      | 2026-03-01, 02:12 CET    |
| 🔗 **Git Commit** | `666a208`                |
| 🔗 **Git Tag**    | `CHECKPOINT-v1.1-STABLE` |
| 🔗 **Branch**     | `master`                 |
| 📦 **Node.js**    | v24.13.1                 |
| 📦 **npm**        | 11.8.0                   |
| 📦 **Vite**       | 6.4.1                    |

## 2. ÄNDERUNGEN SEIT v1.0

| Feature                                       | Datei                        | Status |
| --------------------------------------------- | ---------------------------- | ------ |
| FPS-Counter (oben rechts, farbcodiert)        | `HUD.tsx`                    | ✅     |
| Rückwärts-Zeitraffer (◀1x bis ◀10x)           | `HUD.tsx`, `useTimeCycle.ts` | ✅     |
| STRG + Pfeiltasten Kamera-Panning             | `Player.tsx`                 | ✅     |
| Spawn-Labels (Uhrzeit + Anzahl + Typ)         | `SpawnMarkers.tsx`           | ✅     |
| Zoom-Range verdoppelt (1-200)                 | `Player.tsx`                 | ✅     |
| Laufgeschwindigkeit verdoppelt (10)           | `Player.tsx`                 | ✅     |
| Spawn-Entzerrung (einzigartiges Zonen-Layout) | `eventScheduler.ts`          | ✅     |
| Flacker-Fix (Y-Offset + polygonOffset)        | `SpawnMarkers.tsx`           | ✅     |
| Intelligente KI (Clustering, Formationen)     | `simWorker.ts`               | ✅     |
| NPC-Farben kräftiger                          | `eventScheduler.ts`          | ✅     |

## 3. BUILD-STATUS

| Metrik             | Wert                   |
| ------------------ | ---------------------- |
| **Build**          | ✅ ERFOLGREICH         |
| **Module**         | 601                    |
| **Bundle**         | 2.824 KB (538 KB gzip) |
| **Runtime-Fehler** | 0                      |

## 4. BACKUP

| Eigenschaft | Wert                                             |
| ----------- | ------------------------------------------------ |
| **ZIP**     | `BACKUP_CHECKPOINT_v1.1_2026-03-01.zip`          |
| **Ort**     | `c:\Users\immer\Desktop\corona-control-project\` |

## 5. WIEDERHERSTELLUNG

```powershell
# Methode A: Git-Tag
git stash
git checkout CHECKPOINT-v1.1-STABLE
npm install
npm run dev

# Methode B: Hard-Reset (ACHTUNG: löscht alles nach Checkpoint!)
git reset --hard CHECKPOINT-v1.1-STABLE
npm install
npm run dev

# Methode C: Backup-ZIP
Expand-Archive "BACKUP_CHECKPOINT_v1.1_2026-03-01.zip" -DestinationPath "restore"
cd restore && npm install && npm run dev
```

---

> Erstellt am 2026-03-01 um 02:12 CET. Vorgänger: `CHECKPOINT-v1.0-STABLE` (`2a6b91c`).
