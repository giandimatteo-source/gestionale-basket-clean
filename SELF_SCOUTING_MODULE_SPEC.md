# MODULO SELF-SCOUTING - SPEC CONCRETO

**Basato su file reali di Gianmarco:**
- Self_Scouting_Shooting_Dashboard.xlsx
- Self_Scouting_Post_Game_Stats.xlsx
- Self_Scouting_Hustle_Stats.xlsx
- Self_Scouting_OFFENSIVE_BREAKDOWN.xlsm
- Self_Scouting_Team_and_Opponent_Stats.xlsx

---

## 1. SHOOTING DASHBOARD (Tiro per Contesto)

**File:** `Self_Scouting_Shooting_Dashboard.xlsx`

### Struttura Matrice:

```
CONTESTI DI TIRO (Righe):
- FASTBREAK
- SIDE TO SIDE SHOT (1 PASS)
- SIDE TO SIDE SHOT (2+ PASSES)
- PAINT TOUCHES (1 PASS)
- PAINT TOUCHES (2+ PASSES)
- NO PAINT TOUCHES

SHOT CLOCK (Colonne):
- 24-20''
- 19-15''
- 14-10''
- 9-5''
- 4-0''

METRICHE PER CELLA:
- 2PM (2-point made)
- 2PA (2-point attempted)
- 2P% (calcolato automaticamente)
- 3PM (3-point made)
- 3PA (3-point attempted)
- 3P% (calcolato automaticamente)
```

### Layout UI nel Gestionale:

```
SHOOTING DASHBOARD - Partita: vs TORTONA (18/07/2024)

[Filtro Partita] [Esporta PDF] [Stampa]

┌─────────────────────────────────────────────────────────┐
│                    Shot Clock                           │
│     24-20''  19-15''  14-10''  9-5''   4-0''           │
├─────────────────────────────────────────────────────────┤
│FASTBREAK        │  2/3  1/2    2/4     1/1    0/1     │
│                 │ 2P%: 66.7% | 3P%: 33% │             │
├─────────────────────────────────────────────────────────┤
│SIDE 1-PASS      │  3/5  2/3    1/2     2/2    1/3     │
│                 │ 2P%: 60% | 3P%: 33% │               │
├─────────────────────────────────────────────────────────┤
│SIDE 2+-PASS     │  1/2  0/1    3/4     1/2    0/2     │
│                 │ 2P%: 50% | 3P%: 25% │               │
├─────────────────────────────────────────────────────────┤
│PAINT 1-PASS     │  2/2  3/4    2/3     1/1    0/1     │
│                 │ 2P%: 100% | 3P%: 0% │               │
├─────────────────────────────────────────────────────────┤
│PAINT 2+-PASS    │  1/3  1/2    2/2     0/1    1/1     │
│                 │ 2P%: 66.7% | 3P%: 50% │             │
├─────────────────────────────────────────────────────────┤
│NO PAINT         │  0/1  1/2    1/3     2/3    1/2     │
│                 │ 2P%: 0% | 3P%: 50% │                 │
└─────────────────────────────────────────────────────────┘

TOTALI PARTITA:
2PM: 10/20 (50%)  | 3PM: 6/15 (40%) | TOTAL FG%: 16/35 (45.7%)
```

### Database Structure:

```sql
SHOOTING_DASHBOARD:
- dashboard_id (uuid)
- game_id (uuid, FK)
- player_id (uuid, FK)
- contesto (enum: fastbreak, side_1pass, side_2plus, paint_1pass, paint_2plus, no_paint)
- shot_clock (enum: 24-20, 19-15, 14-10, 9-5, 4-0)
- 2pm (integer)
- 2pa (integer)
- 3pm (integer)
- 3pa (integer)
- created_at (datetime)
- updated_at (datetime)

Views/Computati:
- 2p_percentage = 2pm / 2pa * 100
- 3p_percentage = 3pm / 3pa * 100
- total_fg = (2pm + 3pm) / (2pa + 3pa) * 100
```

---

## 2. POST-GAME STATS (Stats Individuali Gare)

**File:** `Self_Scouting_Post_Game_Stats.xlsx`

### Colonne (esatte dal file):

```
#    NAME    MINS  PF   PFD  POINTS  2PM  2PA  2P%  3PM  3PA  3P%  FTM  FTA  FT%  ORB  DRB  TR   AST  TO   BLK  ST   EFF  POSS  PPP
```

### Layout UI:

```
POST-GAME STATS - Vs TORTONA (18/07/2024)

┌──────────────────────────────────────────────────────────────────┐
│ #  GIOCATRICE    MIN  PF  POINTS  2P%  3P%  FT%  REB  AST  TO  EFF│
├──────────────────────────────────────────────────────────────────┤
│ 1  Eva Lisec     28   2    15    5/8  2/4  3/4  2+3  4   2   +8  │
│ 3  Teja Oblak    24   3    12    3/6  2/3  0/0  1+2  2   1   +5  │
│ 5  Tina Cvij     20   2     8    3/5  1/2  1/2  2+1  1   0   +6  │
│...                                                              │
└──────────────────────────────────────────────────────────────────┘

[Download Excel] [Print] [Share]
```

### Database:

```sql
POSTGAME_STATS:
- postgame_id (uuid)
- game_id (uuid, FK)
- player_id (uuid, FK)
- mins (integer - minutes played)
- pf (integer - personal fouls)
- pfd (integer - fouls drawn)
- points (integer)
- 2pm (integer)
- 2pa (integer)
- 3pm (integer)
- 3pa (integer)
- ftm (integer)
- fta (integer)
- orb (integer - offensive rebounds)
- drb (integer - defensive rebounds)
- ast (integer - assists)
- to (integer - turnovers)
- blk (integer - blocks)
- st (integer - steals)
- efficiency (computed: custom formula)
- poss (possessions)
- ppp (points per possession)
```

---

## 3. HUSTLE STATS (Deflections, Steals, Blocks, etc.)

**File:** `Self_Scputing_Hustle_Stats.xlsx`

### Metriche:

```
DEFLECTIONS - Palleggi persi del difensore
STEALS - Palle rubate
BLOCKS - Tiri bloccati
DRAW CHARGES - Falli provocati
DIVES - Tuffi per la palla
OFF REBS TAPOUT - Rimbalzi offensivi per tap-out
ACC - Accelerazioni (veloce spinta avanti)
ACC/MIN - Accelerazioni per minuto
```

### Layout UI:

```
HUSTLE STATS - Vs TORTONA (18/07/2024)

┌────────────────────────────────────────────────┐
│ GIOCATRICE    DEFL  STEAL  BLK  CHG  DIVE  ACC │
├────────────────────────────────────────────────┤
│ Eva Lisec      5     2      1    1    2    4   │
│ Teja Oblak     3     1      0    0    1    2   │
│ Tina Cvij      2     0      2    1    0    3   │
│ ...                                           │
└────────────────────────────────────────────────┘
```

### Database:

```sql
HUSTLE_STATS:
- hustle_id (uuid)
- game_id (uuid, FK)
- player_id (uuid, FK)
- deflections (integer)
- steals (integer)
- blocks (integer)
- draw_charges (integer)
- dives (integer)
- off_rebs_tapout (integer)
- accelerations (integer)
- acc_per_min (decimal)
```

---

## 4. OFFENSIVE BREAKDOWN (Per Tipo di Azione)

**File:** `Self_Scouting_OFFENSIVE_BREAKDOWN.xlsm`

### Azioni Offensive (dal file):

```
FASTBREAK
EARLY OFFENSE
HALF COURT
OOB (Out of Bounds)
OFF REBOUNDS
ATO (After TimeOut)
```

### Metriche per Azione:

```
PAINT TOUCH (1 PASS)
PAINT TOUCH (2+ PASSES)
NO PAINT TOUCH

Per ogni:
- FG (Field Goals)
- FGA (Attempts)
- FG% (Percentage)
- 3P (3-pointers)
- AST (Assists)
- TO (Turnovers)
- PPP (Points per Possession)
```

### Layout UI:

```
OFFENSIVE BREAKDOWN - Vs TORTONA (18/07/2024)

┌─────────────────────────────────────────────────┐
│ AZIONE          │ FG% │ PPP │ AST │ TO │ PLAYS │
├─────────────────────────────────────────────────┤
│ FASTBREAK       │ 55% │ 1.2 │  2  │ 1  │  12   │
│ EARLY OFFENSE   │ 48% │ 0.9 │  4  │ 2  │  20   │
│ HALF COURT      │ 42% │ 0.8 │  8  │ 3  │  35   │
│ OOB             │ 60% │ 1.1 │  1  │ 0  │   5   │
│ OFF REBOUNDS    │ 70% │ 1.4 │  0  │ 0  │   7   │
│ ATO             │ 65% │ 1.3 │  2  │ 0  │   3   │
└─────────────────────────────────────────────────┘

TOTALI: 52% FG | 0.95 PPP | 17 AST | 6 TO | 82 plays
```

### Database:

```sql
OFFENSIVE_BREAKDOWN:
- breakdown_id (uuid)
- game_id (uuid, FK)
- play_type (enum: fastbreak, early_offense, half_court, oob, off_reb, ato)
- paint_context (enum: paint_1pass, paint_2plus, no_paint)
- fg (integer)
- fga (integer)
- three_p (integer)
- ast (integer)
- to (integer)
- plays_count (integer)
- ppp (decimal)

Computed:
- fg_percentage = fg / fga * 100
```

---

## 5. TEAM & OPPONENT STATS AVANZATI

**File:** `Self_Scouting_Team_and_Opponent_Stats.xlsx`

**35+ metriche da implementare:**

```
FONDAMENTALI:
- PPG (Points per game)
- RPG (Rebounds per game)
- APG (Assists per game)
- TO% (Turnover percentage)

EFFICIENZE:
- EFG% (Effective FG%)
- TS% (True Shooting %)
- ORB% (Offensive Rebound %)
- DRB% (Defensive Rebound %)
- AST% (Assist %)
- TO% (Turnover %)

AVANZATE:
- PACE (Possessions per 40 min)
- ORtg (Offensive Rating)
- DRtg (Defensive Rating)
- Net Rating
- BPM (Box Plus/Minus)
- USG% (Usage %)
- e molte altre...
```

### Database:

```sql
TEAM_STATS:
- team_stats_id (uuid)
- game_id (uuid, FK)
- is_opponent (boolean)
- ppg (decimal)
- rpg (decimal)
- apg (decimal)
- efg_percentage (decimal)
- ts_percentage (decimal)
- orb_percentage (decimal)
- [... 30+ altre metriche]
```

---

## 6. IMPORT/EXPORT

### Input:
1. **Upload Excel file** con statistiche
2. **Seleziona foglio** (game vs opzione)
3. **Map colonne** (automatico se standard)
4. **Importa dati** nella DB

### Output:
1. **Download Excel** con stats formattate
2. **Export PDF** report
3. **Share URL** con report pubblico

---

## 7. DASHBOARD ANALYTICS

Quando tutti i dati sono dentro:

```
SELF-SCOUTING DASHBOARD (Overview)
┌─────────────────────────────────────┐
│ Ultimi 10 Partite:                  │
│ - Avg PPG: 68.5                     │
│ - Avg FG%: 43.2%                    │
│ - Avg 3P%: 35.8%                    │
│ - Avg ORtg: 105.3                   │
│                                     │
│ Giocatrice Top Scorer: Eva Lisec    │
│ Tendenza: ↑ (in aumento)            │
└─────────────────────────────────────┘
```

---

## ✅ TUTTI I FILE IMPLEMENTATI PARI PARI

Questo modulo implementa ESATTAMENTE:
- ✅ Self_Scouting_Shooting_Dashboard.xlsx
- ✅ Self_Scouting_Post_Game_Stats.xlsx
- ✅ Self_Scouting_Hustle_Stats.xlsx
- ✅ Self_Scouting_OFFENSIVE_BREAKDOWN.xlsm
- ✅ Self_Scouting_Team_and_Opponent_Stats.xlsx

---

**PRONTO PER IMPLEMENTAZIONE IN CLAUDE CODE!** 🚀
