# FASE 2 - CALENDAR & TRAININGS SPECIFICATION

## 1. CALENDAR MODULE

**URL**: `/calendar`

### 1.1 Calendar View

```
┌─────────────────────────────────────────────────────────┐
│ CALENDARIO 2024-25                    [◄ Lug 2024 ►]    │
├─────────────────────────────────────────────────────────┤
│  L    M    M    G    V    S    D                         │
│  1    2    3    4    5    6    7                         │
│  8    9   10   11   12   13   14                         │
│ 15   16   17  [18] 19   20   21   ← Today              │
│ 22   23   24   25   26   27   28                         │
│ 29   30   31                                             │
│                                                         │
│ Legend:                                                 │
│ [PARTITA] = Match (red)                                │
│ [ALLENAMENTO] = Training (blue)                         │
│ [RIPOSO] = Rest day (gray)                              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 1.2 Event Types & Colors

```
PARTITA (Match) - Red (#ff0000)
├── Serie A / Serie A2 / Cup / Friendly
├── Home / Away
├── Time, opponent, location
└── Links: scouting, game card, video

ALLENAMENTO (Training) - Blue (#0066cc)
├── Time, duration
├── Type (technical, tactical, fitness, recovery)
├── Players attending
└── Playbook focus

RIPOSO (Rest) - Gray (#999999)
├── Full rest day

EVENTO (Event) - Orange (#ff9900)
├── Team meeting
├── Medical appointment
└── Other
```

### 1.3 Day Detail View

Click on any date → Drawer/Modal shows:

```
┌──────────────────────────────────┐
│ 18 Luglio 2024 (Mercoledì)  [X] │
├──────────────────────────────────┤
│                                  │
│ 14:00 - ALLENAMENTO              │
│ ├─ Tipo: Tattico                 │
│ ├─ Durata: 90 minuti             │
│ ├─ Luogo: Palestra Comunale      │
│ ├─ Giocatrici: 12/15             │
│ ├─ Focus: Pick & Roll            │
│ └─ [MODIFICA] [ELIMINA]          │
│                                  │
│ 19:30 - PARTITA (CASA)           │
│ ├─ Avversario: Trieste           │
│ ├─ Luogo: Palestra Comunale      │
│ ├─ Categoria: Serie A            │
│ ├─ Links:                        │
│ │  • Pre-Game Scouting           │
│ │  • Game Card                   │
│ │  • Hudl Video                  │
│ └─ [MODIFICA] [ELIMINA]          │
│                                  │
│ [+ NUOVO EVENTO]                 │
└──────────────────────────────────┘
```

### 1.4 Add/Edit Event Form

```
┌──────────────────────────────────┐
│ Nuovo Evento                 [X] │
├──────────────────────────────────┤
│                                  │
│ Data: [18/07/2024]               │
│ Ora Inizio: [14:00]              │
│ Ora Fine: [15:30]                │
│                                  │
│ Tipo:                            │
│ ○ PARTITA                        │
│ ○ ALLENAMENTO                    │
│ ○ RIPOSO                         │
│ ○ EVENTO                         │
│                                  │
│ [Conditional fields based on type]
│                                  │
│        [SALVA] [ANNULLA]         │
└──────────────────────────────────┘
```

#### For PARTITA:
```
Avversario: ________________
Categoria: [Serie A ▼]
Tipo: ○ Casa  ○ Trasferta
Luogo: ________________
Orario Inizio: [--:--]
Note: _________________
Pre-Game Link: ________
Game Card Link: _______
Video Link: __________
```

#### For ALLENAMENTO:
```
Tipo: [Tattico ▼]
  - Tecnico
  - Tattico
  - Fitness
  - Recovery
  - Mixed

Durata (min): [90]
Luogo: ________________
Descrizione: __________
Focus Playbook: [Triangle Offense ▼]  (optional)
Partecipanti (multi-select):
  ☑ Eva Lisec
  ☐ Teja Oblak
  ☑ Tina Cvij
  ...
```

### 1.5 Database Structure

```sql
GAMES:
game_id (uuid)
data_ora (datetime)
avversario_id (FK - opponent team)
luogo (string)
season (string)
competizione (enum: Serie A, Serie A2, Cup, Friendly)
tipo_gioco (enum: home, away)
status (enum: scheduled, played, cancelled)
note (text)
link_scouting (url)
link_game_card (url)
link_hudl (url)
created_at (datetime)
updated_at (datetime)

TRAININGS:
training_id (uuid)
data_ora_inizio (datetime)
data_ora_fine (datetime)
tipo (enum: tecnico, tattico, fitness, recovery, mixed)
luogo (string)
descrizione (text)
focus_playbook_id (FK - play)
note (text)
created_at (datetime)
updated_at (datetime)

TRAINING_ATTENDANCE:
training_id (uuid, FK)
player_id (uuid, FK)
status (enum: present, absent, injured)
note (text)

REST_DAYS:
rest_day_id (uuid)
data (date)
tipo (enum: full_rest, recovery, travel)
note (text)

EVENTS:
event_id (uuid)
data_ora (datetime)
tipo (enum: meeting, appointment, other)
titolo (string)
descrizione (text)
luogo (string)
note (text)
created_at (datetime)
updated_at (datetime)
```

---

## 2. TRAININGS MODULE

**URL**: `/trainings`

### 2.1 Trainings List View

```
┌──────────────────────────────────────────────────────┐
│ ALLENAMENTI                                [+ NUOVO]  │
├──────────────────────────────────────────────────────┤
│ Filter: [Tutti ▼] [Jul 2024 ▼]  Search: ________    │
├──────────────────────────────────────────────────────┤
│                                                      │
│ 18 Lug (Mer) 14:00 - TATTICO (90 min)               │
│ ├─ Luogo: Palestra Comunale                         │
│ ├─ Partecipanti: 12/15 (Eva, Teja, Tina, ...)     │
│ ├─ Focus: Pick & Roll                              │
│ └─ [DETTAGLI] [MODIFICA] [ELIMINA]                │
│                                                      │
│ 20 Lug (Ven) 10:00 - TECNICO (60 min)              │
│ ├─ Luogo: Palestra Comunale                         │
│ ├─ Partecipanti: 14/15 (Eva, Teja, ...)           │
│ ├─ Focus: Shooting Drills                          │
│ └─ [DETTAGLI] [MODIFICA] [ELIMINA]                │
│                                                      │
│ 22 Lug (Dom) 09:00 - RECOVERY (45 min)            │
│ ├─ Luogo: Palestra                                  │
│ ├─ Partecipanti: 10/15                             │
│ ├─ Focus: Mobility & Stretching                    │
│ └─ [DETTAGLI] [MODIFICA] [ELIMINA]                │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### 2.2 Training Detail View

```
┌──────────────────────────────────────────────────┐
│ ALLENAMENTO - 18 Luglio 2024         [MODIFICA] │
├──────────────────────────────────────────────────┤
│                                                  │
│ Orario: 14:00 - 15:30 (90 minuti)               │
│ Tipo: TATTICO                                   │
│ Luogo: Palestra Comunale                        │
│                                                  │
│ Focus Tattico: Pick & Roll                      │
│ ├─ Descrizione: Set plays for P&R offensive     │
│ │  positions and defensive counters             │
│ └─ [View Play Diagram]                          │
│                                                  │
│ Descrizione Allenamento:                        │
│ "Focus on Pick & Roll offensive options.        │
│  Work on spacing and timing."                   │
│                                                  │
│ PARTECIPANTI (12/15):                           │
│ ┌──────────────────────────────────┐            │
│ │ ☑ Eva Lisec (PG) - Presente     │            │
│ │ ☑ Teja Oblak (SG) - Presente    │            │
│ │ ☑ Tina Cvij (SF) - Presente     │            │
│ │ ☐ Player 4 - Assente             │            │
│ │ ☑ Player 5 - Presente            │            │
│ │ ...                              │            │
│ │                                  │            │
│ │ [Modifica Presenze]              │            │
│ └──────────────────────────────────┘            │
│                                                  │
│ NOTE:                                           │
│ "Remember to work on transition defense"        │
│                                                  │
│              [CHIUDI] [ELIMINA]                 │
└──────────────────────────────────────────────────┘
```

### 2.3 Training Plan Template

When creating a NEW training, can use templates:

```
┌──────────────────────────────────────┐
│ Nuovo Allenamento - Scegli Template │
├──────────────────────────────────────┤
│                                      │
│ ☐ Vuoto (blank)                      │
│                                      │
│ ☐ TATTICO - Offensivo               │
│   "90 min - Focus on plays/movement" │
│                                      │
│ ☐ TATTICO - Difensivo               │
│   "90 min - Defensive schemes"       │
│                                      │
│ ☐ TECNICO - Shooting               │
│   "60 min - Drills & accuracy"       │
│                                      │
│ ☐ TECNICO - Ball Handling           │
│   "45 min - Dribble & passes"        │
│                                      │
│ ☐ FITNESS - High Intensity           │
│   "45 min - Conditioning"            │
│                                      │
│ ☐ RECOVERY - Mobility                │
│   "30 min - Stretching & cool down"  │
│                                      │
│          [SELEZIONA] [ANNULLA]       │
└──────────────────────────────────────┘
```

Selected template pre-fills form, coach can customize.

### 2.4 Attendance Tracking

Modal for marking attendance:

```
┌──────────────────────────────────────┐
│ Presenze - 18 Lug Allenamento  [X]  │
├──────────────────────────────────────┤
│                                      │
│ ☑ Eva Lisec (PG)                    │
│ ☑ Teja Oblak (SG)                   │
│ ☑ Tina Cvij (SF)                    │
│ ☐ Player 4 (PF) → [Assente ▼]      │
│   ├─ Assente (excused)              │
│   ├─ Assente (unexcused)            │
│   ├─ Infortunio                     │
│   └─ Altro: ________________        │
│                                      │
│ ☑ Player 5 (C)                      │
│ ...                                  │
│                                      │
│ Totale Presenti: 12/15              │
│                                      │
│         [SALVA] [ANNULLA]           │
└──────────────────────────────────────┘
```

---

## 3. INTEGRATION WITH OTHER MODULES

### Calendar ← → Trainings:
- Click training in calendar → show details
- Create training from calendar
- Drag-to-reschedule training

### Calendar ← → Roster (Injuries):
- Mark injured players unavailable for training
- Auto-reduce "Presenti" count if injured

### Calendar ← → Games:
- Pre-game scouting scheduled 2 days before match
- Post-game analysis scheduled 1 day after
- Recovery training next day after match

### Trainings ← → Playbook:
- Assign playbook focus to training
- Show diagrams during training detail
- Track which plays practiced

### Trainings ← → Self Scouting:
- Link to video analysis of training
- Compare training drill accuracy vs game performance

---

## 4. API ENDPOINTS

### GAMES
```
GET    /api/games?season=2024-25&month=7     - List games
POST   /api/games                             - Create game
GET    /api/games/:id                         - Get single game
PUT    /api/games/:id                         - Update game
DELETE /api/games/:id                         - Delete game
```

### TRAININGS
```
GET    /api/trainings?season=2024-25&month=7 - List trainings
POST   /api/trainings                         - Create training
GET    /api/trainings/:id                     - Get single training
PUT    /api/trainings/:id                     - Update training
DELETE /api/trainings/:id                     - Delete training
POST   /api/trainings/:id/attendance          - Mark attendance
GET    /api/trainings/:id/attendance          - Get attendance
```

### REST DAYS
```
GET    /api/rest-days?month=7                 - List rest days
POST   /api/rest-days                         - Create rest day
DELETE /api/rest-days/:id                     - Delete rest day
```

---

## 5. SUCCESS CRITERIA

✅ Calendar displays month view with events  
✅ Can click date to see/add events  
✅ Add game with all details (opponent, location, links)  
✅ Add training with type, duration, location  
✅ Mark training attendance (present/absent/injured)  
✅ Filter trainings by month/type  
✅ Link playbook to training  
✅ Responsive on mobile  
✅ Events color-coded (red/blue/gray/orange)  
✅ Can edit/delete events  

---

## 6. NICE-TO-HAVE (Phase 2.5+)

- 📅 iCal export (sync with Google Calendar)
- 📱 Push notifications before events
- 📊 Training load analysis (total minutes per week)
- 🎬 Auto-link to Hudl videos
- 📈 Track player availability trends
- 🔄 Recurring trainings (e.g., every Monday 14:00)
- 📋 Training minutes history per player
- 🏆 Match preview/recap automatic generation

---

**Ready to implement FASE 2 in Claude Code!** 🚀
