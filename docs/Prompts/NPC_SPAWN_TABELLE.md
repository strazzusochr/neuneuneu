# NPC SPAWN TABELLE — 24H LIVE EVENT SYSTEM

## NPC-TYPEN
`zivilist` | `demonstrant` | `polizist` | `riot_polizei` | `sanitäter` | `extremist` | `sek` | `feuerwehr`

---

## SPAWN-TABELLE

| UHRZEIT | AKTION  | TYP          | ANZAHL | WO / WIE                                    | GESAMT AKTIV |
|---------|---------|--------------|--------|---------------------------------------------|--------------|
| 06:00   | SPAWN   | zivilist     | 20     | zufällig verteilt 150m Radius um [0,0,0]    | 20           |
| 06:00   | SPAWN   | polizist     | 5      | Patrouille-Route um den Platz               | 25           |
| 08:00   | SPAWN   | demonstrant  | 8      | direkt am Stephansplatz [0,0,0]             | 33           |
| 09:00   | SPAWN   | demonstrant  | 10     | Stephansplatz Radius 20m um [0,0,0]         | 43           |
| 09:00   | SPAWN   | demonstrant  | 7      | Stephansplatz Radius 25m um [0,0,0]         | 50           |
| 10:00   | SPAWN   | demonstrant  | 10     | Stephansplatz enger Radius 10m um [0,0,0]   | 60           |
| 10:00   | SPAWN   | polizist     | 7      | Polizeilinie bei [0,0,30] (30m vom Platz)   | 67           |
| 10:00   | DESPAWN | zivilist     | 5      | 5 zufällige Zivilisten despawnen            | 62           |
| 11:00   | SPAWN   | polizist     | 3      | zur Polizeilinie [0,0,30] gesamt 15 Cops    | 65           |
| 11:00   | DESPAWN | zivilist     | 5      | weitere 5 Zivilisten despawnen              | 60           |
| 11:30   | DESPAWN | zivilist     | 10     | alle restlichen Zivilisten despawnen        | 50           |
| 12:00   | SPAWN   | polizist     | 7      | Polizeilinie verstärkt gesamt 22 Cops       | 57           |
| 12:15   | SPAWN   | sanitäter    | 3      | Rand des Platzes bei [30,0,0]               | 60           |
| 12:30   | SPAWN   | riot_polizei | 20     | Formation bei [0,0,50] marschieren rein     | 80           |
| 12:30   | DESPAWN | demonstrant  | 10     | 10 Demonstranten fliehen Richtung Nord      | 70           |
| 13:00   | DESPAWN | demonstrant  | 10     | Wasserwerfer zerstreut weitere 10           | 60           |
| 13:30   | DESPAWN | demonstrant  | 8      | Tränengas treibt 8 weitere weg              | 52           |
| 14:00   | DESPAWN | demonstrant  | 12     | Räumung: 12 festgenommen / despawnen        | 40           |
| 14:00   | DESPAWN | polizist     | 5      | 5 verletzte Cops despawnen                  | 35           |
| 15:00   | DESPAWN | demonstrant  | alle   | letzte Demonstranten weg (ca. 15)           | 20           |
| 15:00   | DESPAWN | riot_polizei | 10     | 10 abgezogen despawnen                      | 10           |
| 15:00   | SPAWN   | feuerwehr    | 3      | Platz Mitte [0,0,0] aufräumen               | 13           |
| 15:00   | SPAWN   | sanitäter    | 2      | Platz bei [10,0,10] Verletzte versorgen     | 15           |
| 16:00   | SPAWN   | zivilist     | 8      | Rand des Platzes Radius 80m (Schaulustige)  | 23           |
| 17:00   | DESPAWN | feuerwehr    | 3      | abziehen                                    | 20           |
| 17:00   | DESPAWN | sanitäter    | 5      | alle Sanitäter abziehen                     | 15           |
| 17:30   | DESPAWN | zivilist     | 8      | alle Zivilisten despawnen (Ausgangssperre)  | 7            |
| 18:00   | SPAWN   | extremist    | 6      | Gasse Nord-West [-80,0,-80]                 | 13           |
| 18:00   | SPAWN   | extremist    | 6      | Gasse Nord-Ost  [80,0,-80]                  | 19           |
| 18:00   | SPAWN   | extremist    | 6      | Gasse Süd-West  [-80,0,80]                  | 25           |
| 18:00   | SPAWN   | extremist    | 6      | Gasse Süd-Ost   [80,0,80]                   | 31           |
| 18:00   | SPAWN   | extremist    | 6      | Gasse Süd-Mitte [0,0,100]                   | 37           |
| 19:00   | SPAWN   | polizist     | 5      | Verstärkung Platz [0,0,20]                  | 42           |
| 19:00   | MOVE    | extremist    | 30     | alle marschieren gemeinsam zu [0,0,0]       | 42           |
| 19:30   | DESPAWN | polizist     | 5      | 5 verletzte Cops despawnen                  | 37           |
| 19:30   | DESPAWN | extremist    | 2      | 2 Extremisten fallen im Kampf               | 35           |
| 20:00   | DESPAWN | extremist    | 3      | weitere 3 fallen                            | 32           |
| 20:30   | SPAWN   | sek          | 25     | Platzrand Formation bei [0,0,60]            | 57           |
| 21:00   | SPAWN   | polizist     | 5      | Verstärkung gesamt jetzt 30 Cops            | 62           |
| 21:00   | SPAWN   | sanitäter    | 3      | Hintergrund bei [40,0,40]                   | 65           |
| 21:30   | DESPAWN | extremist    | 15     | fliehen in alle Richtungen despawnen        | 50           |
| 21:30   | DESPAWN | extremist    | 10     | verhaftet / bewusstlos despawnen            | 40           |
| 22:00   | DESPAWN | sek          | 15     | 15 SEK abziehen nur 10 bleiben              | 25           |
| 22:00   | DESPAWN | polizist     | 10     | 10 Cops abziehen nur 20 bleiben             | 15           |
| 22:00   | SPAWN   | feuerwehr    | 4      | brennende Objekte am Platz                  | 19           |
| 22:00   | SPAWN   | sanitäter    | 4      | Verletzte am Boden versorgen                | 23           |
| 23:00   | DESPAWN | feuerwehr    | 4      | fertig abziehen                             | 19           |
| 23:00   | DESPAWN | sanitäter    | 4      | fertig abziehen                             | 15           |
| 23:00   | DESPAWN | sek          | 10     | alle SEK weg                                | 5            |
| 23:00   | DESPAWN | polizist     | 8      | nur 12 bleiben als Checkpoint               | 12           |

---

## REGELN

```
HARTES LIMIT:    if (aktiveNPCs.size >= 120) → KEIN Spawn, return null
MAX GLEICHZEITIG: ~87 NPCs bei 21:00
ZENTRUM:          Stephansplatz [0, 0, 0]
POSITIONS-FORMAT: [x, 0, z] — Y ist immer 0 (Boden)
```
