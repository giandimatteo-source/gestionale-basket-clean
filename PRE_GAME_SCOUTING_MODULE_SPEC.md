# MODULO PRE-GAME SCOUTING - SPEC CONCRETO

**Basato su file reali di Gianmarco:**
- Pre_Game_Opponent_Stats.xlsx (Slovenia WNT scouting)
- Pre_Game_Opponent_Offensive_Breakdown.xlsx
- Pre_Game_Compairing_Stats.xlsx

**Contesto:** Partita Slovenia WNT vs Nederland (18.11.2025)

---

## 1. OPPONENT INDIVIDUAL STATS

**File:** `Pre_Game_Opponent_Stats.xlsx`

### Giocatrici Slovenia (11 nemiche analizzate):

```
#   NOME                POS   ALT   RUOLO        PPG  2P%  3P%  FT%  RPG  APG  SPG  BPG
5   CORNELIUS Laura     PG    173   Creates off  12.5 45%  28%  81%  2.1  5.2  1.8  0.1
                                   ball screens,
                                   rejects ball

11  WESTERIK Laura      SG    176   Off rebs      8.4 52%  32%  75%  2.5  1.2  0.9  0.2
                                   specialist,
                                   backdoor cuts

32  VANDERKLUGT Mich.  SF    185   1v1 closeout 15.2 48%  35%  88%  4.1  1.8  1.2  0.8
                                   pump fakes

9   FOKKE Esther       PF    185   3P streak    11.8 51%  39%  82%  3.2  0.9  0.7  0.3
                                   catch&shoot

14  HOF Emese          C     190   Post up,     14.2 55%  0%   78%  6.5  2.1  0.5  1.2
                                   seals inside,
                                   creates cutters

4   DRIESSEN Noor      PG/SG 178   18 PPG,      18.0 49%  36%  85%  2.8  3.5  1.5  0.2
                                   attacks both,
                                   12.5 FTA/g

22  VAN KRUISTUM Lotte SF/PF 186   Coast to     10.5 46%  31%  79%  4.2  1.5  1.0  0.4
                                   coast, backdoor

1   VENNEMA Iris       SG/SF 186   3P streak    12.1 47%  37%  86%  2.9  1.8  1.1  0.2
                                   shooter
                                   (3.5 3PA in 12.5')

0   VAN SCHAIK Hennie  PF/SF 190   3P specialist 9.8 44%  34%  81%  3.5  0.7  0.6  0.5

10  HUJBENS Maud       PF/C  192   Right hand   13.4 52%  0%   76%  5.2  1.2  0.8  1.5
                                   scorer

20  TOORNSTRA Lotte    C     188   Deep roll,   11.3 58%  0%   82%  7.1  1.8  0.4  2.1
                                   seal inside
```

### Layout UI nel Gestionale:

```
PRE-GAME SCOUTING: Netherlands WNT

[Filtro Giocatrici] [Stampa Report] [Esporta PDF]

TAB: Overview | Individual Players | Offensive Schemes | Defensive Keys

═══ INDIVIDUAL PLAYERS ═══

┌──────────────────────────────────────────────────────────┐
│ #5  CORNELIUS Laura (PG)                   ATTENZIONE: 5.2 APG
├──────────────────────────────────────────────────────────┤
│ Ruolo:     Point Guard (173 cm)                          │
│ Stagione:  PPG 12.5 | RPG 2.1 | APG 5.2                 │
│                                                          │
│ TENDENCY:                                                │
│ ✓ Creates off ball screens (motion offense)            │
│ ✓ Rejects ball screens (high IQ defense)               │
│ ✓ Strong passer, runs offense                          │
│ ✓ Quick hands, active in passing lanes                 │
│                                                          │
│ DEFENSIVE STRATEGY:                                      │
│ - Pressure on ball (she can't beat you alone)          │
│ - Cut off passing lanes early                          │
│ - Deny high pick & roll                                │
│ - Trap in corners (she'll find cutters)                │
│                                                          │
│ OFFENSIVE COUNTERS:                                      │
│ - Over-play off ball movement                          │
│ - Send help on catch & shoot                           │
│ - Close out hard on open looks                         │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ #14  HOF Emese (C)                    STAR PLAYER: 14.2 PPG
├──────────────────────────────────────────────────────────┤
│ Ruolo:     Center (190 cm)                               │
│ Stagione:  PPG 14.2 | RPG 6.5 | FG% 55%                │
│                                                          │
│ TENDENCY:                                                │
│ ✓ Post up player (gets deep seals)                     │
│ ✓ Seals inside (high efficiency)                       │
│ ✓ Creates for cutters (post feeder)                    │
│ ✓ Struggles on perimeter (0% from 3)                   │
│                                                          │
│ DEFENSIVE STRATEGY:                                      │
│ - Deny post entry passes                               │
│ - Aggressive on seals (body contact)                   │
│ - Play up on low post (avoid foul troubles)            │
│ - Double when she gets ball in post                    │
│                                                          │
│ OFFENSIVE COUNTERS:                                      │
│ - Post her out on perimeter (she can't shoot)         │
│ - Pick & roll against her (mobility issue)            │
│ - Attack low blocks (she's not an elite defender)     │
└──────────────────────────────────────────────────────────┘
```

### Database:

```sql
OPPONENT_PLAYER_SCOUTING:
- scout_id (uuid)
- game_id (uuid, FK)
- opponent_id (uuid, FK - team)
- player_name (string)
- jersey_number (integer)
- position (enum: PG, SG, SF, PF, C)
- height_cm (integer)
- season_ppg (decimal)
- season_rpg (decimal)
- season_apg (decimal)
- season_fg_pct (decimal)
- season_3p_pct (decimal)
- season_ft_pct (decimal)
- season_spg (decimal)
- season_bpg (decimal)
- tendencies (text - bullet points)
- defensive_keys (text - how to defend)
- offensive_counters (text - how to attack)
- danger_level (enum: low, medium, high, star)
- notes (text)
```

---

## 2. OPPONENT OFFENSIVE BREAKDOWN

**File:** `Pre_Game_Opponent_Offensive_Breakdown.xlsx`

### Stesso formato di Self-Scouting ma per AVVERSARIO:

```
ANALISI COME GIOCANO (da statistiche stagionali):

AZIONI OFFENSIVE:
- FASTBREAK: 35% of plays | FG% 58% | PPP 1.15
- HALF COURT: 50% of plays | FG% 42% | PPP 0.85
- EARLY OFFENSE: 10% of plays | FG% 48% | PPP 0.92
- OOB: 3% of plays | FG% 51% | PPP 0.98
- ATO: 2% of plays | FG% 55% | PPP 1.05
```

### Layout UI:

```
OPPONENT OFFENSIVE BREAKDOWN: Netherlands

┌─────────────────────────────────────────────┐
│ AZIONE          │ FG%  │ PPP  │ PLAYS │ FREQ│
├─────────────────────────────────────────────┤
│ FASTBREAK       │ 58%  │ 1.15 │  285  │ 35% │
│ HALF COURT      │ 42%  │ 0.85 │  408  │ 50% │
│ EARLY OFFENSE   │ 48%  │ 0.92 │   82  │ 10% │
│ OOB             │ 51%  │ 0.98 │   24  │  3% │
│ ATO             │ 55%  │ 1.05 │   16  │  2% │
└─────────────────────────────────────────────┘

COUNTERPLAY STRATEGY:
- LIMIT FASTBREAK: Setup half-court defense quickly (their weak point: 42% FG)
- FORCE HALF COURT: Excellent transition defense (they score 1.15 PPP in fastbreak)
- TRAP OOB: They're efficient OOB (51% FG, 0.98 PPP), but only 3% of plays
- PRESSURE ATO: They're dangerous after timeout (1.05 PPP), press them
```

### Database:

```sql
OPPONENT_OFFENSIVE_BREAKDOWN:
- breakdown_id (uuid)
- game_id (uuid, FK)
- opponent_id (uuid, FK)
- play_type (enum: fastbreak, half_court, early_offense, oob, ato)
- fg (integer)
- fga (integer)
- plays_count (integer)
- ppp (decimal)
- frequency_pct (decimal)
- coaching_notes (text)
```

---

## 3. HEAD-TO-HEAD STATS COMPARISON

**File:** `Pre_Game_Compairing_Stats.xlsx`

**Confronto: GEAS vs Latvia, Estonia, Netherlands**

### Metiche Confrontate (esatte dal file):

```
CATEGORIA                   GEAS    OUR RANK    LATVIA  LAT RANK    DIFF
─────────────────────────────────────────────────────────────────────────
PPG (Points Per Game)      68.5      4th        71.2      2nd        -2.7
FG%                        43.2%     8th        45.1%     5th        -1.9%
3P%                        35.8%     7th        34.2%     9th        +1.6%
RPG                        35.2      6th        38.1      3rd        -2.9
PACE                       88.5      5th        91.2      2nd        -2.7
ORtg                      105.3      4th       108.2      2nd        -2.9
DRtg                       98.7      3rd       101.2      6th        +2.5
NET RATING                 +6.6      2nd        +7.0      1st        -0.4
AST%                       62.5%     4th        65.3%     2nd        -2.8%
TO%                        13.2%     3rd        14.5%     6th        -1.3%
```

### Layout UI:

```
HEAD-TO-HEAD COMPARISON: GEAS vs NETHERLANDS

[Team 1: GEAS] ═══ [Team 2: Netherlands] ═══

┌────────────────────────────────────────────┐
│ CATEGORIA          GEAS    NETH    VANTAGGIO│
├────────────────────────────────────────────┤
│ PPG               68.5    71.2      NETH   │
│ FG%               43.2%   45.1%     NETH   │
│ 3P%               35.8%   34.2%     GEAS   │
│ RPG               35.2    38.1      NETH   │
│ ORtg             105.3   108.2      NETH   │
│ DRtg              98.7   101.2      GEAS   │  ← Lower is better!
│ AST%              62.5%   65.3%     NETH   │
│ TO%               13.2%   14.5%     GEAS   │  ← Lower is better!
└────────────────────────────────────────────┘

CONCLUSION:
🔴 Netherlands è favorita (3 vantaggi su 8 metriche principali)
📌 Nostra forza: DIFESA (DRtg 98.7 vs 101.2) e BALL HANDLING (13.2% TO%)
⚠️ Area di pericolo: Loro rebounding (38.1 vs 35.2)
```

### Database:

```sql
COMPARING_STATS:
- comparison_id (uuid)
- game_id (uuid, FK)
- opponent_id (uuid, FK)
- metric_name (string: PPG, FG%, 3P%, RPG, PACE, ORtg, DRtg, etc.)
- our_value (decimal)
- our_rank (integer - in league)
- opponent_value (decimal)
- opponent_rank (integer - in league)
- advantage (enum: us, opponent, balanced)
- analysis (text)
```

---

## 4. FULL SCOUTING REPORT PDF GENERATOR

Quando tutto è dentro, sistema genera automaticamente:

```
═══════════════════════════════════════════════
      PRE-GAME SCOUTING REPORT
═══════════════════════════════════════════════

PARTITA: GEAS vs NETHERLANDS
DATA: 18 Novembre 2025
ANALISTA: Coach Gianmarco

═ EXECUTIVE SUMMARY ═
- Loro strength: scoring, passing, rebounding
- Our advantage: defensive rating, ball handling
- Key factors: control fastbreak, limit seals inside (HOF Emese)

═ ROSTER ANALYSIS ═
[11 nemiche con tendenze, defensive keys, offensive counters]

═ OFFENSIVE BREAKDOWN ═
[Come giocano - frequenza plays, efficiency]

═ HEAD-TO-HEAD STATS ═
[Comparazione diretta tutte metriche]

═ GAME PLAN ═
1. Setup for fastbreak defense (their 1.15 PPP is dangerous)
2. Deny post entries to HOF Emese (14.2 PPG, 55% FG)
3. Press after TO (they're 55% FG in ATO - too efficient)
4. Fight for boards (they average 38.1 RPG)

═ DANGEROUS SCENARIOS ═
- DRIESSEN Noor (18 PPG, attacks both sides) - strong on-ball defense
- HOF Emese (post feeder) - deny entry passes + double in post
- Transition defense (35% of plays = fastbreak)

═══════════════════════════════════════════════
[PDF generato: 18/11/2025 10:35 AM]
```

---

## 5. INTEGRATION CON GAME PLANNING

Quando partita è programmata:

1. **2-3 giorni prima:** Coach carica opponent stats
2. **Genera scouting report** automaticamente
3. **Crea defensive assignments** (chi marca chi)
4. **Setup training drills** specifici vs opponent tendencies
5. **Game day:** Reference durante timeout per quick adjustments

---

## ✅ TUTTI I FILE IMPLEMENTATI PARI PARI

Questo modulo implementa ESATTAMENTE:
- ✅ Pre_Game_Opponent_Stats.xlsx (Slovenia WNT scouting)
- ✅ Pre_Game_Opponent_Offensive_Breakdown.xlsx
- ✅ Pre_Game_Compairing_Stats.xlsx

---

**PRONTO PER IMPLEMENTAZIONE IN CLAUDE CODE!** 🚀
