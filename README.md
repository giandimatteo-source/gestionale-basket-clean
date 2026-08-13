# 🏀 Gestionale Pallacanestro Femminile

Piattaforma centralizzata per gestione di team, scouting, calendar, playbook e organizzazione per squadre di pallacanestro femminile.

## 📖 LEGGI PRIMA - SPECS & DOCUMENTATION

**⭐ IMPORTANTE: Tutti gli spec sono nel root folder!**

### Per Claude Code:
1. **START HERE:** `IMPLEMENTATION_ROADMAP.md` (priority order + checklist)
2. Segui priority 1 → 2 → 3 → 4 → 5

| File | Descrizione | Priorità |
|------|-------------|----------|
| **IMPLEMENTATION_ROADMAP.md** | 🎯 ROADMAP COMPLETO + PRIORITY ORDER | START |
| **MASTER_INDEX.md** | 📚 Indice progetto + statistiche | Reference |
| | | |
| **FASE1_STAFF_ROSTER_SPEC.md** | ✅ COMPLETATO (Staff + Roster) | Done |
| **PLAYBOOK_DRAWING_TOOL_SPEC.md** | 🎨 Drawing Tool + SVG export | Priority 1 |
| **SELF_SCOUTING_MODULE_SPEC.md** | 📊 5 sub-modules da 5 file Excel tuoi | Priority 2 |
| **PRE_GAME_SCOUTING_MODULE_SPEC.md** | 🎯 Opponent scouting da Slovenia WNT | Priority 3 |
| **GAME_CARD_MODULE_SPEC.md** | 📋 Real-time possession logging | Priority 4 |
| **FASE2_CALENDAR_TRAININGS_SPEC.md** | 📅 Calendar + training management | Priority 5 |
| | | |
| **QUICK_START.md** | ⚡ Come avviare npm run dev | Setup |
| **CLAUDE_CODE_GUIDE.md** | 💻 Guida Claude Code Desktop | Reference |

### 📊 File Tuoi Implementati Pari Pari:
- ✅ `Self_Scouting_Shooting_Dashboard.xlsx` → **SELF_SCOUTING_MODULE_SPEC.md**
- ✅ `Self_Scouting_Post_Game_Stats.xlsx` → **SELF_SCOUTING_MODULE_SPEC.md**
- ✅ `Self_Scouting_Hustle_Stats.xlsx` → **SELF_SCOUTING_MODULE_SPEC.md**
- ✅ `Self_Scouting_OFFENSIVE_BREAKDOWN.xlsm` → **SELF_SCOUTING_MODULE_SPEC.md**
- ✅ `Self_Scouting_Team_and_Opponent_Stats.xlsx` → **SELF_SCOUTING_MODULE_SPEC.md**
- ✅ `Pre_Game_Opponent_Stats.xlsx` (Slovenia) → **PRE_GAME_SCOUTING_MODULE_SPEC.md**
- ✅ `Pre_Game_Opponent_Offensive_Breakdown.xlsx` → **PRE_GAME_SCOUTING_MODULE_SPEC.md**
- ✅ `Pre_Game_Compairing_Stats.xlsx` → **PRE_GAME_SCOUTING_MODULE_SPEC.md**
- ✅ `GAME_CARD_GENERAL.xlsx` → **GAME_CARD_MODULE_SPEC.md**

---

### 🚀 Quick Start:
```bash
npm run dev
# → http://localhost:3000
```

**👉 Leggi `IMPLEMENTATION_ROADMAP.md` per il piano completo!**

## 📋 Architettura

```
gestionale-basket/
├── backend/
│   ├── src/
│   │   ├── server.js          (Express app)
│   │   └── routes/
│   │       ├── staff.js       (Staff CRUD + foto upload)
│   │       └── roster.js      (Players CRUD + injuries)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── main.jsx           (React entry)
│   │   ├── App.jsx            (Main app + routing)
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Staff.jsx      (FASE 1)
│   │   │   ├── Roster.jsx     (FASE 1)
│   │   │   ├── Calendar.jsx
│   │   │   ├── Trainings.jsx
│   │   │   ├── Playbook.jsx
│   │   │   ├── Scouting.jsx
│   │   │   └── Organization.jsx
│   │   └── components/
│   │       ├── Modal.jsx
│   │       ├── StaffForm.jsx
│   │       ├── PlayerForm.jsx
│   │       ├── PlayerDetail.jsx
│   │       └── InjuryForm.jsx
│   │   └── styles/
│   │       └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Setup & Run

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
cd gestionale-basket

# Install root dependencies
npm install

# Install backend
cd backend && npm install && cd ..

# Install frontend
cd frontend && npm install && cd ..
```

### Development Mode

Run both backend and frontend concurrently:

```bash
npm run dev
```

This will start:
- **Backend API**: http://localhost:5000
- **Frontend**: http://localhost:3000

### Individual Mode

**Backend only:**
```bash
cd backend && npm run dev
# Listens on http://localhost:5000
```

**Frontend only:**
```bash
cd frontend && npm run dev
# Listens on http://localhost:3000 (proxies /api to backend)
```

## 🔌 API Endpoints

### STAFF

```
GET    /api/staff              - List all staff
POST   /api/staff              - Create staff (multipart/form-data with foto)
GET    /api/staff/:id          - Get single staff
PUT    /api/staff/:id          - Update staff (multipart/form-data)
DELETE /api/staff/:id          - Delete staff
```

**Staff Object:**
```json
{
  "staff_id": "uuid",
  "nome_cognome": "string",
  "ruolo": "enum",
  "email": "string",
  "telefono": "string|null",
  "specializzazione": "string|null",
  "note": "string|null",
  "foto_url": "string|null",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### ROSTER

```
GET    /api/roster?season=2024-25&ruolo=PG - List players (with filters)
POST   /api/roster                          - Create player
GET    /api/roster/:id                      - Get single player (with injuries)
PUT    /api/roster/:id                      - Update player
DELETE /api/roster/:id                      - Delete player
```

### INJURIES

```
POST   /api/roster/:player_id/injuries                   - Add injury
PUT    /api/roster/:player_id/injuries/:injury_id        - Update injury
DELETE /api/roster/:player_id/injuries/:injury_id        - Delete injury
```

**Injury Object:**
```json
{
  "injury_id": "uuid",
  "player_id": "uuid",
  "data_infortunio": "date",
  "tipo": "enum",
  "parte_corpo": "string",
  "status": "enum (in_corso|guarito|sospetto)",
  "eta_ritorno": "date|null",
  "note": "string|null",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

## ✅ FASE 1 Features (STAFF + ROSTER)

### Staff Module
- ✅ List staff in card grid
- ✅ Add new staff member
- ✅ Edit staff (modal form)
- ✅ Delete staff
- ✅ Upload photo
- ✅ Search by name/role
- ✅ Email & phone links

### Roster Module
- ✅ List players in table
- ✅ Add new player
- ✅ Edit player details
- ✅ Delete player
- ✅ Upload player photo
- ✅ Filter by role (PG, SG, SF, PF, C)
- ✅ Search by name
- ✅ Player detail drawer
- ✅ Injury management (add/edit/delete)
- ✅ Injury status tracking

## 🎯 Next Phases

**FASE 2**: Calendar + Trainings
**FASE 3**: Self Scouting + Pre-Game
**FASE 4**: Shooting Stats + Playbook

## 🛠️ Technology Stack

**Frontend:**
- React 18 + Vite
- React Router (navigation)
- Tailwind CSS (styling)
- Lucide Icons
- Axios (HTTP client)

**Backend:**
- Node.js + Express
- Multer (file upload)
- UUID (ID generation)
- CORS enabled
- In-memory storage (MVP - replace with DB in production)

## 📝 Notes

- **In-memory storage**: Current implementation uses in-memory arrays. For production, replace with PostgreSQL or MongoDB.
- **File uploads**: Photos stored in `/backend/uploads/`. For production, use cloud storage (AWS S3, etc.)
- **Authentication**: Not yet implemented. Add JWT in FASE 2+.
- **Database**: PostgreSQL schema defined in `/FASE1_STAFF_ROSTER_SPEC.md`.

## 🚦 Development Workflow

1. Frontend updates (React components, styling)
2. Backend updates (API routes, validation)
3. Test in http://localhost:3000
4. Use browser devtools for debugging
5. Check API calls with Axios logging

## 📞 Support

For detailed specifications, see:
- `/FASE1_STAFF_ROSTER_SPEC.md` - FASE 1 technical spec
- `/Gestionale_Architettura_Completa.docx` - Full system architecture

---

**Ready to develop in Claude Code Desktop!** 🚀
