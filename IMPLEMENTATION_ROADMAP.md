# 🏀 GESTIONALE BASKET - COMPLETE IMPLEMENTATION ROADMAP

## 📋 STATO ATTUALE

### ✅ COMPLETATO (FASE 1)
- **STAFF Module** (CRUD + photo upload)
- **ROSTER Module** (CRUD + injury management)
- **CALENDAR Module** (basic month view)
- **TRAININGS Module** (basic template)

**Codice:** Tutti i file in `/frontend/src/pages` e `/backend/src/routes`

### 📋 PRONTI PER IMPLEMENTAZIONE (Con Specs Concreti)

---

## 🎯 PRIORITY ORDER (Come Implementare)

### PRIORITY 1: PLAYBOOK MODULE (4-6 hours)
**Spec File:** `PLAYBOOK_DRAWING_TOOL_SPEC.md` (già esistente)

**Cosa fare:**
1. Installa Fabric.js: `npm install fabric --save` (in frontend)
2. Crea `/frontend/src/components/PlaybookDrawingCanvas.jsx`
3. Crea `/frontend/src/pages/Playbook.jsx`
4. Backend routes: `POST /api/playbook`, `GET /api/playbook/:id`, `PUT`, `DELETE`
5. Drawing tools: linee, frecce, cerchi, rettangoli, player markers (X/O), text
6. Color picker, stroke width, undo/redo, clear, export SVG

**Quando finisci:**
- Potrai creare plays con disegni visivi
- Salvare in DB con SVG markup
- Accedere da calendar/trainings

---

### PRIORITY 2: SELF-SCOUTING MODULE (8-10 hours)
**Spec File:** `SELF_SCOUTING_MODULE_SPEC.md` (NUOVO - concreto dai tuoi file!)

**Cosa fare (Modulo per Modulo):**

#### 2a) Shooting Dashboard (2 hours)
- Leggi: `Self_Scouting_Shooting_Dashboard.xlsx`
- Crea matrice interattiva (6 contesti × 5 shot clock ranges)
- Upload Excel automatico
- Calcola percentuali automaticamente
- Display: heatmap visuale + tabella

#### 2b) Post-Game Stats (2 hours)
- Leggi: `Self_Scouting_Post_Game_Stats.xlsx`
- Tabella con 30+ metriche per giocatrice
- Import da Excel
- Display: sortable table + detail drawer
- Export Excel + PDF

#### 2c) Hustle Stats (1.5 hours)
- Leggi: `Self_Scputing_Hustle_Stats.xlsx`
- Traccia 8 metriche (deflections, steals, blocks, etc.)
- Tabella semplice
- Trend analysis (miglioramenti nel tempo)

#### 2d) Offensive Breakdown (2 hours)
- Leggi: `Self_Scouting_OFFENSIVE_BREAKDOWN.xlsm`
- 6 azioni (fastbreak, half court, etc.)
- Metriche: FG%, PPP, AST, TO, plays count
- Visualizzazione: bar chart + tabella
- Analisi: quali azioni funzionano meglio

#### 2e) Team & Opponent Stats (2.5 hours)
- Leggi: `Self_Scouting_Team_and_Opponent_Stats.xlsx`
- 35+ metriche avanzate (PPP, EFG%, ORtg, DRtg, etc.)
- Dashboard con widget selezionabili
- Comparison view (nostri stats vs media lega)

**Quando finisci:**
- Dashboard completo con tutti i dati di self-scouting
- Import automatico da Excel
- Analytics pro-level

---

### PRIORITY 3: PRE-GAME SCOUTING MODULE (6-8 hours)
**Spec File:** `PRE_GAME_SCOUTING_MODULE_SPEC.md` (NUOVO - da tuoi file Slovenia!)

**Cosa fare:**

#### 3a) Opponent Individual Scouting (3 hours)
- Leggi: `Pre_Game_Opponent_Stats.xlsx` (Slovenia WNT)
- Per ogni giocatrice (max 15):
  - Foto + numero maglia
  - PPG, FG%, 3P%, FT%, RPG, APG, etc.
  - Tendenze offensive (3 bullet points)
  - Defensive keys (come difenderla)
  - Offensive counters (come attaccarla)
  - Danger level (basso/medio/alto/star)
- Display: detail card + filtri

#### 3b) Opponent Offensive Breakdown (2 hours)
- Leggi: `Pre_Game_Opponent_Offensive_Breakdown.xlsx`
- Come giocano: fastbreak, half court, early offense, etc.
- FG%, PPP, frequency
- Coaching notes per azione
- Display: chart + table

#### 3c) Head-to-Head Stats Comparison (2 hours)
- Leggi: `Pre_Game_Compairing_Stats.xlsx`
- 15-20 metriche principali
- Nostri stats vs loro stats
- Vantaggio: us / opponent / balanced
- Highlighted le 3 metriche chiave per il match

**Output auto-generato:**
- Pre-Game Scouting Report PDF (12-15 pagine)
- Game Plan key points

**Quando finisci:**
- Analisi completa dell'avversario prima partita
- Report PDF pronto per stampa
- Coaching staff info sheet

---

### PRIORITY 4: GAME CARD MODULE (6-8 hours)
**Spec File:** `GAME_CARD_MODULE_SPEC.md` (NUOVO - da GAME_CARD_GENERAL.xlsx!)

**Cosa fare:**

#### 4a) Live Game Card Input (3 hours)
- Leggi: `GAME_CARD_GENERAL.xlsx`
- Real-time possession logging durante partita
- Seleziona: offensive play (MANO, GIRO, SPALLA, CORNA, etc.)
- Seleziona: defensive play (BIANCO, GIALLO, BLU, ROSSO, PALLAS)
- Registra: risultato (2PT, 3PT, TO, FTA, etc.)
- Auto-save ogni 30 secondi
- Mobile-friendly (iPad/tablet courtside)

#### 4b) Live Stats Display (2 hours)
- Durante partita: mostra stats in tempo reale
- Per player: min, pts, FG%, REB, AST, TO
- Team stats: FG%, 3P%, score
- Auto-update (refresh ogni 10 secondi)

#### 4c) Post-Game Analytics (3 hours)
- Analisi possession-by-possession
- Play effectiveness: quali plays hanno funzionato meglio
- Defense effectiveness: quali difese hanno limitato meglio
- PPP per ogni play
- Recommendations per prossima partita

**Quando finisci:**
- Real-time game tracking durante partita
- Post-game analytics auto-generato
- Data per miglioramenti tattici

---

### PRIORITY 5: CALENDAR + TRAININGS (Estensione) (4-5 hours)
**File:** Già in progress (stub code exists)

**Cosa completare:**
1. Popola TRAINING_ATTENDANCE tabella
2. Aggiungi attendance tracking (present/absent/injured)
3. Integra con ROSTER injuries (se infortunata, auto-mark absent)
4. Crea training templates (TECNICO, TATTICO, FITNESS, RECOVERY)
5. Mostra plays focus (link PLAYBOOK → TRAINING)
6. Link scouting (PRE-GAME notes → TRAINING drills)

---

## 📊 TOTAL DEVELOPMENT TIME

```
PRIORITÀ 1: PLAYBOOK             4-6 hours
PRIORITÀ 2: SELF-SCOUTING        8-10 hours
PRIORITÀ 3: PRE-GAME SCOUTING    6-8 hours
PRIORITÀ 4: GAME CARD            6-8 hours
PRIORITÀ 5: CALENDAR/TRAININGS   4-5 hours
─────────────────────────────────────────
TOTAL ESTIMATED:                 28-37 hours
```

**Per Claude Code:** 3-4 days di focused development (8 hours/day)

---

## 📂 SPEC FILES IN FOLDER

All specs are in root folder for Claude Code to read:

```
📄 MASTER_INDEX.md                           ← Overview
📄 PLAYBOOK_DRAWING_TOOL_SPEC.md            ← PRIORITY 1
📄 SELF_SCOUTING_MODULE_SPEC.md              ← PRIORITY 2 (NUOVO!)
📄 PRE_GAME_SCOUTING_MODULE_SPEC.md          ← PRIORITY 3 (NUOVO!)
📄 GAME_CARD_MODULE_SPEC.md                  ← PRIORITY 4 (NUOVO!)
📄 FASE2_CALENDAR_TRAININGS_SPEC.md          ← PRIORITY 5 (partial)
📄 FASE1_STAFF_ROSTER_SPEC.md                ← Already done
📄 QUICK_START.md                            ← How to run
```

---

## 🚀 HOW TO USE WITH CLAUDE CODE

### Step 1: Load Project
```
Claude Code → File → Open Folder → /home/claude/gestionale-basket
```

### Step 2: For PRIORITY 1 (PLAYBOOK)
Tell Claude Code:
```
"Implementa PLAYBOOK module con drawing tool.
Leggi PLAYBOOK_DRAWING_TOOL_SPEC.md.
Usa Fabric.js per canvas drawing.
Crea backend routes e components React."
```

### Step 3: For PRIORITY 2 (SELF-SCOUTING)
Tell Claude Code:
```
"Implementa SELF-SCOUTING module pari pari dal file.
Leggi SELF_SCOUTING_MODULE_SPEC.md.
Implementa 5 sub-modules:
1. Shooting Dashboard
2. Post-Game Stats
3. Hustle Stats
4. Offensive Breakdown
5. Team & Opponent Stats"
```

### Step 4: For PRIORITY 3 (PRE-GAME)
Tell Claude Code:
```
"Implementa PRE-GAME SCOUTING module.
Leggi PRE_GAME_SCOUTING_MODULE_SPEC.md.
3 sub-modules:
1. Opponent Player Scouting
2. Opponent Offensive Breakdown
3. Head-to-Head Stats Comparison
Genera PDF report automaticamente."
```

### Step 5: For PRIORITY 4 (GAME CARD)
Tell Claude Code:
```
"Implementa GAME CARD module.
Leggi GAME_CARD_MODULE_SPEC.md.
Real-time possession logging durante partita.
Post-game analytics auto-generated."
```

---

## 📋 IMPLEMENTATION CHECKLIST

### PLAYBOOK (Priority 1)
- [ ] Fabric.js installed
- [ ] PlaybookDrawingCanvas component created
- [ ] All 7 tools working (line, arrow, circle, rect, player X, player O, text)
- [ ] Color picker + stroke width working
- [ ] Undo/Redo/Clear working
- [ ] SVG export working
- [ ] PNG thumbnail auto-generated
- [ ] Backend routes CRUD working
- [ ] Play list view + detail modal working
- [ ] Responsive design tested

### SELF-SCOUTING (Priority 2)
- [ ] Shooting Dashboard table + calculations
- [ ] Post-Game Stats table with 30+ metrics
- [ ] Hustle Stats tracking
- [ ] Offensive Breakdown with PPP calculations
- [ ] Team & Opponent Stats dashboard
- [ ] Excel import working for all 5 modules
- [ ] PDF export working
- [ ] Analytics dashboard overview
- [ ] All database tables created

### PRE-GAME SCOUTING (Priority 3)
- [ ] Opponent player scouting cards (with photo, stats, tendency, keys)
- [ ] Opponent offensive breakdown
- [ ] Head-to-head comparison
- [ ] PDF report generation
- [ ] Player detail view
- [ ] Stats comparison view

### GAME CARD (Priority 4)
- [ ] Real-time possession input (mobile-friendly)
- [ ] Live stats display during game
- [ ] Auto-save every 30 seconds
- [ ] Post-game possession log
- [ ] Play efficiency analytics
- [ ] Defense efficiency analytics
- [ ] Export stats to Excel

### CALENDAR/TRAININGS (Priority 5)
- [ ] Attendance tracking
- [ ] Training templates
- [ ] Link to playbook focus
- [ ] Link to pre-game scouting

---

## 💾 DATABASE TABLES TO CREATE

```sql
-- PLAYBOOK
CREATE TABLE plays (...)
CREATE TABLE play_elements (...)

-- SELF-SCOUTING
CREATE TABLE shooting_dashboard (...)
CREATE TABLE postgame_stats (...)
CREATE TABLE hustle_stats (...)
CREATE TABLE offensive_breakdown (...)
CREATE TABLE team_stats (...)

-- PRE-GAME
CREATE TABLE opponent_player_scouting (...)
CREATE TABLE opponent_offensive_breakdown (...)
CREATE TABLE comparing_stats (...)

-- GAME CARD
CREATE TABLE game_cards (...)
CREATE TABLE possessions (...)
CREATE TABLE game_card_stats (...)

-- CALENDAR/TRAININGS (enhance existing)
CREATE TABLE training_attendance (...)
```

---

## ✅ EVERYTHING IS READY

Tutti gli spec sono concreti e basati sui TUOI file reali:
- ✅ Self_Scouting_*.xlsx (5 file)
- ✅ Pre_Game_*.xlsx (3 file)
- ✅ GAME_CARD_GENERAL.xlsx
- ✅ Playbook (FIBA drawing tool reference)

**Claude Code ha TUTTO quello che serve per implementare completamente il gestionale!**

---

**NEXT STEP:** Scarica il progetto aggiornato con tutti gli spec e carica in Claude Code! 🚀
