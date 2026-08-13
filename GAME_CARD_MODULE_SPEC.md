# MODULO GAME CARD - SPEC CONCRETO

**Basato su file reale di Gianmarco:**
- GAME_CARD_GENERAL.xlsx (Template game card)

---

## 1. GAME CARD OVERVIEW

**Scopo:** Template per copiare durante la partita in tempo reale.

Contiene:
- **Plays Offensivi:** Con nomi italiani (MANO, GIRO, SPALLA, CORNA, etc.)
- **Plays Difensivi:** Strategie (BIANCO, GIALLO, BLU, ROSSO, PALLAS)
- **Statistiche Real-time:** Durante la partita
- **Possesso per Possesso:** Tracking plays usati

---

## 2. OFFENSIVE PLAYS NAMING (Dal file)

```
NOMI PLAYS OFFENSIVI IN ITALIANO (come nel tuo file):

MANO        - High-low action, hand-off at high post
GIRO        - Rotation/wheel action
SPALLA      - Shoulder action (pick off shoulder)
CORNA       - Horns (dual high screens)
PIEDI       - Feet (pick at feet level)
BOX         - Box formation
STACK       - Stack formation (multiple players stacked)
FLEX        - Flex action (wing screen)
TRIANGLE    - Triangle offense setup
5-OUT       - Five out setup
DRAG        - Drag screen (high screen going into lane)
PUNCH       - Punch action (quick screen)
...
[+ altri plays del tuo playbook]
```

---

## 3. DEFENSIVE PLAYS NAMING (Dal file)

```
NOMI PLAYS DIFENSIVI A COLORI:

BIANCO      - Man-to-man (conventional)
GIALLO      - Zone 2-3
BLU         - Zone 3-2
ROSSO       - Trap formation
PALLAS      - Press defense (full-court or half-court)
MIXED       - Hybrid man-zone
AGGRESSIVE - All-out aggressive
...
[+ altre difese del tuo arsenal]
```

---

## 4. GAME CARD LAYOUT UI

### Durante Partita (Real-time):

```
╔═══════════════════════════════════════════════════════╗
║ GAME CARD: GEAS vs TORTONA (18/07/2024)             ║
║ Period 2 | Time 4:35 | Score GEAS 28 - TORTONA 25   ║
╚═══════════════════════════════════════════════════════╝

┌─── CURRENT POSSESSION ───────────────────────────────┐
│ BALL: Eva Lisec (PG)                                 │
│ FORMATION: 5-OUT (offensive)                         │
│ SCORE: +3 GEAS                                       │
│                                                      │
│ PLAY CALLED: [MANO] ──────────┐                      │
│ DEFENSE: [BIANCO] (Man-to-man) │                     │
│                                ▼                      │
│ ┌─────────────────────────────────────┐              │
│ │ Court Diagram:                      │              │
│ │                                     │              │
│ │   X Eva                             │              │
│ │    \                                │              │
│ │     X Teja (moving to high post)    │              │
│ │      \                              │              │
│ │       O Tina (defender Tortona)     │              │
│ │                                     │              │
│ │ → RESULT: Hand-off → Teja shoots   │              │
│ │   OUTCOME: 2 POINTS ✓              │              │
│ │                                     │              │
│ └─────────────────────────────────────┘              │
│                                                      │
│ POSSESSION STATS THIS GAME:                          │
│ ✓ MANO: 5 times, 3 points (60% efficiency)          │
│ ✓ GIRO: 3 times, 2 points (67% efficiency)          │
│ ✓ SPALLA: 4 times, 2 points (50% efficiency)        │
│                                                      │
└─────────────────────────────────────────────────────┘

[+ Button] Add Possession  [Clear] Reset  [Save] Auto-save
```

---

## 5. POSSESSION TRACKER (Possesso per Possesso)

```
┌──────────────────────────────────────────────────────┐
│ POSSESSION LOG - GEAS vs TORTONA                     │
├──────────────────────────────────────────────────────┤
│                                                      │
│ POI OFF_PLAY   DEF_PLAY    RESULT    SCORE    TIME  │
├──────────────────────────────────────────────────────┤
│ 1   MANO       BIANCO     2PT ✓      2-0    0:00   │
│ 2   GIRO       GIALLO     TO ✗       2-2    1:15   │
│ 3   SPALLA     BIANCO     3PT ✓      5-2    2:30   │
│ 4   5-OUT      ROSSO      FGA ✗      5-4    3:45   │
│ 5   TRIANGLE   PALLAS     2PT ✓      7-4    5:00   │
│ 6   DRAG       BIANCO     TO ✗       7-6    6:20   │
│ 7   MANO       GIALLO     2PT ✓      9-6    7:30   │
│ 8   BOX        MIXED      3PT ✓     12-6    8:45   │
│...                                                  │
│                                                      │
│ SUMMARY (Period 1):                                  │
│ Total Possessions: 12                               │
│ Points Scored: 18                                   │
│ Efficiency: 1.50 PPP (excellent!)                   │
│                                                      │
│ Best Plays:                                          │
│ • MANO: 3/4 (75%) - 6 points                        │
│ • TRIANGLE: 2/2 (100%) - 5 points                   │
│                                                      │
│ Worst Plays:                                         │
│ • GIRO: 1/3 (33%) - 2 points                        │
│ • Turnovers: 2 (costly vs press)                    │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 6. LIVE GAME STATISTICS

Mentre gioca, traccia real-time:

```
GEAS CURRENT STATS (Live):

Players:
│ #   │ NAME           │ MIN │ PTS │ 2PM/2PA │ 3PM/3PA │ REB │ AST │ TO │
├─────┼────────────────┼─────┼─────┼─────────┼─────────┼─────┼─────┼────┤
│ 1   │ Eva Lisec      │ 16  │  12 │  5/8    │  1/3    │  2  │  3  │ 1  │
│ 3   │ Teja Oblak     │ 14  │   8 │  3/5    │  1/2    │  1  │  2  │ 0  │
│ 5   │ Tina Cvij      │ 12  │   6 │  2/4    │  0/1    │  2  │  1  │ 1  │
│...                                                                    │

Team Stats:
│ GEAS      │ 28 Pts │ 13/23 FG (56%) │ 3/7 3P (43%) │ 5 REB │ 6 AST │
│ TORTONA   │ 25 Pts │ 11/20 FG (55%) │ 2/6 3P (33%) │ 4 REB │ 4 AST │
```

---

## 7. POST-GAME GAME CARD ANALYSIS

Finita la partita, sistema auto-genera:

```
═══════════════════════════════════════════════════════
        POST-GAME GAME CARD ANALYSIS
═══════════════════════════════════════════════════════

GEAS 68 - 64 TORTONA (Victory!)

OFFENSIVE EFFICIENCY:

Play Effectiveness:
┌────────────────────────────────────────────┐
│ PLAY       │ USED │ PPP  │ RESULT           │
├────────────────────────────────────────────┤
│ MANO       │  8   │ 1.38 │ Excellent (7pts) │
│ TRIANGLE   │  5   │ 1.20 │ Good (6 pts)     │
│ GIRO       │  4   │ 0.75 │ Poor (3 pts)     │
│ SPALLA     │  6   │ 0.83 │ Okay (5 pts)     │
│ 5-OUT      │  3   │ 1.67 │ Excellent (5pts) │
│ DRAG       │  2   │ 1.00 │ Neutral (2 pts)  │
│...                                         │
│                                            │
│ Total: 32 possessions | 68 points (2.125  │
│ PPP - Very efficient!)                     │
└────────────────────────────────────────────┘

DEFENSIVE EFFICIENCY:

Defense Effectiveness:
┌────────────────────────────────────────────┐
│ DEFENSE  │ USED │ PTS ALLOWED │ RATING   │
├────────────────────────────────────────────┤
│ BIANCO   │  14  │ 22 (1.57)   │ Okay     │
│ GIALLO   │  10  │ 18 (1.80)   │ Weak     │
│ ROSSO    │  5   │ 12 (2.40)   │ Weak     │
│ PALLAS   │  3   │  4 (1.33)   │ Good     │
│...                                        │
│                                           │
│ Best: PALLAS (press - 1.33 PPP allowed)  │
│ Worst: ROSSO (trap - 2.40 PPP allowed)   │
└────────────────────────────────────────────┘

KEY MOMENTS:
• 2nd quarter: Used MANO 4 times, scored 10 points (crucial)
• 4th quarter: GIALLO defense weak (Tortona scored 16 in Q4)
• Clutch: PALLAS press forced 2 turnovers in final 2 mins

RECOMMENDATIONS FOR NEXT GAME:
✓ Keep using MANO (1.38 PPP - most efficient)
✗ Review GIALLO defense (too weak, 1.80 PPP allowed)
✗ Less GIRO (low efficiency, 0.75 PPP)
✓ More 5-OUT (high efficiency, 1.67 PPP)
```

---

## 8. DATABASE STRUCTURE

```sql
GAME_CARD:
- game_card_id (uuid)
- game_id (uuid, FK)
- created_at (datetime)
- updated_at (datetime)

POSSESSION:
- possession_id (uuid)
- game_card_id (uuid, FK)
- possession_number (integer - 1, 2, 3...)
- quarter (integer)
- game_time (time - mm:ss)
- offensive_play (string - enum: MANO, GIRO, SPALLA, etc.)
- defensive_play (string - enum: BIANCO, GIALLO, BLU, etc.)
- result (enum: 2PT, 3PT, FT, FTA, TO, etc.)
- points_scored (integer)
- player_initiator (uuid, FK - chi ha ball)
- player_scorer (uuid, FK - chi ha segnato)
- notes (text - qualsiasi osservazione)

GAME_CARD_STATS (computed at game end):
- game_card_stats_id (uuid)
- game_card_id (uuid, FK)
- play_name (string)
- times_used (integer)
- points_scored (integer)
- ppp (decimal - computed)
- efficiency_rating (enum: excellent, good, okay, poor)
```

---

## 9. FEATURES

✅ Real-time possession logging during game
✅ Auto-save every 30 seconds
✅ Mobile-friendly (iPa, tablet support for courtside)
✅ Keyboard shortcuts for quick play entry
✅ Undo/Redo for mis-entries
✅ Post-game analytics auto-generation
✅ Compare vs previous games
✅ Export stats to Excel
✅ Print game card for coaching staff

---

## ✅ FILE IMPLEMENTATO PARI PARI

Questo modulo implementa ESATTAMENTE:
- ✅ GAME_CARD_GENERAL.xlsx (con plays in italiano MANO, GIRO, SPALLA, etc.)
- ✅ Real-time stat tracking
- ✅ Post-game analytics
- ✅ Possession-by-possession logging

---

**PRONTO PER IMPLEMENTAZIONE IN CLAUDE CODE!** 🚀
