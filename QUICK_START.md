# 🚀 QUICK START - Gestionale Basket

## ✅ Setup Completato!

Tutte le dipendenze sono installate. Pronto a partire! 🏀

---

## 🎯 OPZIONE 1: Avviare dal Terminal

### Via terminale locale (Mac/Linux):

```bash
cd /home/claude/gestionale-basket
npm run dev
```

**Risultato:**
- Backend avviato su **http://localhost:5000** ✅
- Frontend avviato su **http://localhost:3000** ✅

Apri il browser e vai a: **http://localhost:3000**

### Via terminale Windows:

```cmd
cd C:\Users\[TuoUser]\...gestionale-basket
npm run dev
```

---

## 🎯 OPZIONE 2: Avviare Backend e Frontend SEPARATAMENTE

### Terminale 1 - Backend:
```bash
cd /home/claude/gestionale-basket/backend
npm run dev
```
→ Avviato su http://localhost:5000

### Terminale 2 - Frontend:
```bash
cd /home/claude/gestionale-basket/frontend
npm run dev
```
→ Avviato su http://localhost:3000

---

## ✨ COSA VEDRAI

### Home Page (Dashboard)
```
🏀 Gestionale Basket
├── Dashboard (overview stats)
├── Staff (card grid)
├── Roster (player table)
├── Calendario
├── Allenamenti
├── Playbook
├── Scouting
└── Organizzazione
```

### Test FASE 1 (Staff + Roster)

**STAFF:**
1. Vai a `/staff`
2. Vedrai 1 staff member di default (Marco Rossi)
3. Clicca [+] Aggiungi Staff
4. Compila form e salva
5. Dovrebbe apparire come nuova card

**ROSTER:**
1. Vai a `/roster`
2. Vedrai 1 giocatrice di default (Eva Lisec)
3. Clicca [+] Aggiungi Giocatrice
4. Compila form e salva
5. Dovrebbe apparire nella tabella
6. Clicca sulla riga → vedi dettagli + infortuni
7. Clicca [+] Aggiungi infortunio → aggiungi injury

---

## 🔗 API ENDPOINTS (Test)

Apri terminal e testa con curl:

### Test Health Check:
```bash
curl http://localhost:5000/api/health
```
→ Risposta: `{"status":"OK","timestamp":"..."}`

### Get All Staff:
```bash
curl http://localhost:5000/api/staff
```
→ Array di staff members

### Get All Players:
```bash
curl http://localhost:5000/api/roster
```
→ Array di giocatrici

### Create Staff:
```bash
curl -X POST http://localhost:5000/api/staff \
  -H "Content-Type: application/json" \
  -d '{
    "nome_cognome": "Test Coach",
    "ruolo": "Head Coach",
    "email": "test@example.com",
    "telefono": "+39 333 1234567",
    "specializzazione": "Video Analysis",
    "note": "Test staff"
  }'
```

---

## 🐛 TROUBLESHOOTING

### Port 3000 o 5000 già in uso?

**Macbook/Linux:**
```bash
# Uccidi process su port 3000
lsof -ti:3000 | xargs kill -9

# Uccidi process su port 5000
lsof -ti:5000 | xargs kill -9
```

**Windows:**
```cmd
# Uccidi process su port 3000
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Uccidi process su port 5000
netstat -ano | findstr :5000
taskkill /PID [PID] /F
```

### Errore "Module not found"?

```bash
cd gestionale-basket
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### Blank page su localhost:3000?

1. Apri **DevTools** (F12)
2. Vedi se ci sono errori in Console
3. Controlla che backend sia avviato (localhost:5000/api/health)

---

## 📁 STRUCTURE

```
gestionale-basket/
├── backend/
│   ├── src/
│   │   ├── server.js (Express app)
│   │   └── routes/
│   │       ├── staff.js ← API routes
│   │       └── roster.js ← API routes
│   └── uploads/ ← Store photos
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx ← Main app
│   │   ├── pages/
│   │   │   ├── Staff.jsx ← Staff page
│   │   │   └── Roster.jsx ← Roster page
│   │   └── components/ ← Reusable components
│   └── index.html
│
└── README.md ← Full documentation
```

---

## 📖 PROSSIMI STEP

### STEP 1: Test FASE 1
- Avvia `npm run dev`
- Test Staff CRUD
- Test Roster CRUD
- Test Injuries
- Verifica responsive su mobile (DevTools)

### STEP 2: Procedi con PLAYBOOK
- Leggi `/PLAYBOOK_DRAWING_TOOL_SPEC.md`
- Installa Fabric.js: `npm install fabric --save` (in frontend)
- Crea `/frontend/src/components/PlaybookDrawingCanvas.jsx`
- Implementa drawing tools

### STEP 3: Procedi con FASE 2
- Leggi `/FASE2_CALENDAR_TRAININGS_SPEC.md`
- Crea backend routes per games/trainings
- Implementa calendar component

---

## 💡 TIPS

- **Hot Reload:** Frontend e backend hanno hot reload. Salva il file → aggiornamento automatico
- **API Proxy:** Frontend proxya `/api` automaticamente al backend
- **Tailwind:** Modifica `className` nei .jsx e vedi i cambiamenti subito
- **Debugging:** Apri DevTools (F12) per vedere errori e network calls

---

## 🎬 VIDEO DEMO (Step-by-step)

Quando tutto è avviato:

1. **Staff Page:**
   - Vedi staff card di Marco Rossi
   - Clicca "Aggiungi Staff"
   - Riempi form (nome, ruolo, email)
   - Clicca "Salva"
   - Vedrai la nuova card aggiunta

2. **Roster Page:**
   - Vedi tabella con Eva Lisec (PG)
   - Clicca sulla riga
   - Drawer apre a destra con dettagli
   - Clicca "Aggiungi" nella sezione Infortuni
   - Compila form infortunio
   - Salva → vedi infortunio nella lista

---

## ✅ SUCCESS CRITERIA

Quando vedi questo = tutto funziona! ✅

- [ ] Frontend carica su http://localhost:3000
- [ ] Menu navigation è visibile
- [ ] STAFF page mostra card
- [ ] ROSTER page mostra tabella
- [ ] Puoi aggiungere staff/giocatori
- [ ] Puoi aggiungere infortuni
- [ ] API endpoints rispondono

---

## 🎯 PROSSIMO: CLAUDE CODE

Una volta verificato che FASE 1 funziona:

1. Apri **Claude Code Desktop**
   - Download: https://claude.ai
   - File → Open Folder → `/home/claude/gestionale-basket`

2. Oppure dimmi e continuo da qui

3. Procediamo con PLAYBOOK module 🎨

---

**Ready!** 🚀 Avvia `npm run dev` e vedi il progetto in azione! 💪

Dimmi se hai domande! 👈
