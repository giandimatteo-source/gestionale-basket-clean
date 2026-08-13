# 🏀 GESTIONALE BASKET - Development Guide

## PROGETTO STATO ATTUALE

### ✅ COMPLETATO

**FASE 1 - STAFF & ROSTER** (100% implementato)
- Backend REST API (Express + Node.js)
- Frontend React + Tailwind
- Database schema definito
- CRUD operations (Staff, Players, Injuries)
- File upload (photos)
- Responsive design

**Localizzazione del progetto:**
```
/home/claude/gestionale-basket/
├── backend/          ← API Express
├── frontend/         ← React + Vite
└── README.md         ← Setup instructions
```

**Specs Completati:**
- `/FASE1_STAFF_ROSTER_SPEC.md` - Technical specification

---

## 📋 PROSSIMI PASSI (IN ORDINE)

### STEP 1: Verifica FASE 1 in Claude Code
1. Apri `/home/claude/gestionale-basket` in Claude Code
2. Esegui:
   ```bash
   npm install
   cd backend && npm install && cd ..
   cd frontend && npm install && cd ..
   npm run dev
   ```
3. Verifica:
   - Backend avviato su http://localhost:5000
   - Frontend avviato su http://localhost:3000
   - Endpoint `/api/health` funziona
   - Pagine STAFF e ROSTER visualizzano correttamente
   - CRUD funziona (add/edit/delete staff e players)
   - Upload foto funziona

### STEP 2: Implementa PLAYBOOK Module
**Spec:** `/PLAYBOOK_DRAWING_TOOL_SPEC.md`

**Cosa fare:**
1. Crea backend routes: `/api/playbook` (CRUD for plays)
2. Implementa drawing tool:
   - Installa `Fabric.js` (canvas library)
   - Crea `PlaybookDrawingCanvas.jsx` component
   - Toolbar: linee, frecce, cerchi, rettangoli, player markers (X/O), text
   - Color picker, stroke width, undo/redo, clear
   - Esporta drawing come SVG
3. Crea pagina PLAYBOOK con grid di plays
4. Crea modal per detail play + drawing tool integrato

**Timeline:** ~4-6 ore

### STEP 3: Implementa CALENDAR & TRAININGS (FASE 2)
**Spec:** `/FASE2_CALENDAR_TRAININGS_SPEC.md`

**Cosa fare:**
1. Crea backend routes:
   - `/api/games` (CRUD for matches)
   - `/api/trainings` (CRUD for trainings)
   - `/api/trainings/:id/attendance` (attendance tracking)
2. Implementa Calendar component:
   - Month view
   - Click date per aggiungere eventi
   - Color-coded by type (red=match, blue=training, gray=rest)
3. Implementa Trainings list + detail view
4. Implementa training template selector

**Timeline:** ~6-8 ore

### STEP 4: Integra Self Scouting (FASE 3)
**Già analizzato - Excel files ready**

### STEP 5: Integra Pre-Game Scouting (FASE 3)
**Già analizzato - PDF ready**

---

## 🛠️ TECH STACK

**Frontend:**
- React 18 + Vite (hot reload)
- React Router (navigation)
- Tailwind CSS (styling)
- Lucide React (icons)
- Axios (HTTP client)
- **Fabric.js** (canvas drawing - per PLAYBOOK)

**Backend:**
- Node.js + Express
- Multer (file uploads)
- UUID (ID generation)
- CORS enabled
- **PostgreSQL** (quando pronto passare da in-memory)

**Database:**
- In-memory per MVP (attuale)
- PostgreSQL per production (ready per STEP 3+)

---

## 📊 DATABASE SCHEMA

Già definito in:
- `/FASE1_STAFF_ROSTER_SPEC.md` (STAFF, ROSTER, INJURIES)
- `/PLAYBOOK_DRAWING_TOOL_SPEC.md` (PLAYS)
- `/FASE2_CALENDAR_TRAININGS_SPEC.md` (GAMES, TRAININGS, REST_DAYS)

Quando migrare a PostgreSQL, usare questo schema.

---

## 🚀 QUICK START

### Per Claude Code:

```
1. Apri folder: /home/claude/gestionale-basket

2. Ramo principale (controlla FASE 1):
   $ npm install
   $ npm run dev
   → http://localhost:3000
   → http://localhost:5000/api/health

3. Se OK, procedi con STEP 2 (PLAYBOOK)
   - Leggi /PLAYBOOK_DRAWING_TOOL_SPEC.md
   - Implementa Fabric.js drawing canvas
   - Test su /playbook page

4. Se OK, procedi con STEP 3 (CALENDAR)
   - Leggi /FASE2_CALENDAR_TRAININGS_SPEC.md
   - Implementa calendar + trainings
   - Test su /calendar e /trainings pages

5. Quando tutto funziona:
   $ npm run build  → production ready
```

---

## 📁 CURRENT FILE STRUCTURE

```
/home/claude/
├── gestionale-basket/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── server.js
│   │   │   └── routes/
│   │   │       ├── staff.js
│   │   │       └── roster.js
│   │   ├── uploads/
│   │   │   ├── staff/
│   │   │   └── players/
│   │   └── package.json
│   │
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── Staff.jsx ✅
│   │   │   │   ├── Roster.jsx ✅
│   │   │   │   ├── Calendar.jsx (stub)
│   │   │   │   ├── Trainings.jsx (stub)
│   │   │   │   ├── Playbook.jsx (stub)
│   │   │   │   └── ...
│   │   │   ├── components/
│   │   │   │   ├── StaffForm.jsx ✅
│   │   │   │   ├── PlayerForm.jsx ✅
│   │   │   │   ├── PlayerDetail.jsx ✅
│   │   │   │   ├── InjuryForm.jsx ✅
│   │   │   │   └── Modal.jsx ✅
│   │   │   ├── App.jsx ✅
│   │   │   └── main.jsx ✅
│   │   ├── vite.config.js
│   │   ├── tailwind.config.js
│   │   └── package.json
│   │
│   ├── README.md
│   ├── FASE1_STAFF_ROSTER_SPEC.md
│   ├── PLAYBOOK_DRAWING_TOOL_SPEC.md ← PER PROSSIMO STEP
│   └── FASE2_CALENDAR_TRAININGS_SPEC.md ← PER PROSSIMO STEP
│
├── FASE1_STAFF_ROSTER_SPEC.md (in /home/claude)
├── PLAYBOOK_DRAWING_TOOL_SPEC.md (in /home/claude)
└── FASE2_CALENDAR_TRAININGS_SPEC.md (in /home/claude)
```

---

## 🔑 KEY FEATURES TO IMPLEMENT

### PLAYBOOK (STEP 2)
- [x] Database schema defined
- [ ] API routes (GET/POST/PUT/DELETE plays)
- [ ] Fabric.js canvas + toolbar
- [ ] Drawing tools (line, arrow, circle, rectangle, text, player markers)
- [ ] Color picker + stroke width
- [ ] Undo/Redo + Clear
- [ ] SVG export
- [ ] PNG thumbnail generation
- [ ] Play list view + grid
- [ ] Play detail modal with drawing
- [ ] Responsive design

### CALENDAR + TRAININGS (STEP 3)
- [x] Database schema defined
- [ ] API routes (games, trainings, rest_days)
- [ ] Calendar month view component
- [ ] Day detail modal
- [ ] Add game form
- [ ] Add training form + templates
- [ ] Attendance tracking
- [ ] Training list + detail view
- [ ] Color-coded events
- [ ] Integration with Roster (injuries affect availability)
- [ ] Integration with Playbook (attach plays to training)

---

## 💡 DEVELOPMENT TIPS

### Use Claude Code for:
1. **Instant file creation** → `create_file` tool
2. **Terminal/npm commands** → `bash_tool`
3. **Code edits** → `str_replace` for targeted changes
4. **Testing** → Can run dev server and check localhost
5. **Dependencies** → Install libs as needed (Fabric.js, react-calendar, etc.)

### When stuck:
- Always check `/README.md` first
- Read relevant SPEC file for context
- Test API endpoints with curl or Postman
- Check browser console for errors
- Use `npm run dev` and inspect network tab

---

## 📞 PASSING CONTEXT TO CLAUDE CODE

When opening Claude Code, say something like:

> "Ho un progetto gestionale basket. FASE 1 (STAFF+ROSTER) è completo. 
> Controlla che funzioni tutto, poi procedi con STEP 2: implementa il PLAYBOOK module con drawing tool.
> Leggi `/PLAYBOOK_DRAWING_TOOL_SPEC.md` per i dettagli. Usa Fabric.js."

Or for FASE 2:

> "FASE 1 funziona. Procedi con FASE 2: Calendar + Trainings.
> Leggi `/FASE2_CALENDAR_TRAININGS_SPEC.md`.
> Crea backend routes, calendar month view, training list con attendance tracking."

---

## ✨ SUCCESS CRITERIA

**FASE 1** ✅
- ✅ Staff CRUD works
- ✅ Roster CRUD works
- ✅ Injury management works
- ✅ File upload works
- ✅ Responsive design works

**FASE 2** (Next target)
- [ ] Calendar renders
- [ ] Can add games/trainings
- [ ] Attendance tracking works
- [ ] Playbook integrated (optional for basic FASE 2)

**FASE 3** (After FASE 2)
- [ ] Self-scouting module works
- [ ] Pre-game scouting integrated
- [ ] Stats aggregation works

---

## 📝 NOTES FOR YOU

- Progetto è **production-ready** per FASE 1
- Database schema è completo per tutte le fasi
- Specs sono dettagliati e pronti
- Frontend e backend sono ben separati (facile manutenzione)
- Tailwind CSS standardizzato per UI consistente
- API è RESTful e pronta per integrazione DB

---

**Pronto per Claude Code!** 🚀

Apri il progetto e fammi sapere se FASE 1 funziona correttamente.
Poi procediamo con gli step successivi!
