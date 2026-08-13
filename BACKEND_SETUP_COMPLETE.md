# Backend Setup Completato ✅

## Cosa è stato creato

### 1️⃣ Database (PostgreSQL + Prisma)
- ✅ Schema Prisma completo con 18 modelli
- ✅ Modelli: User, Staff, Roster, Calendar, Training, Playbook, Scouting, GameCard, Organization
- ✅ Relazioni e indici configurati
- ✅ Support per 3 opzioni database:
  - Supabase (free, cloud, consigliato)
  - Docker (locale)
  - SQLite (sviluppo rapido)

### 2️⃣ Autenticazione OAuth Google
- ✅ Configurazione Passport.js
- ✅ JWT token generation
- ✅ Middleware di autenticazione
- ✅ Ruoli e permessi (ADMIN, COACH, ASSISTANT, STAFF, USER)

### 3️⃣ Sezione STAFF - Completamente Implementata
#### API Endpoints:
```
GET    /api/staff              - Lista staff con filtri/paginazione
GET    /api/staff/:id          - Dettagli singolo staff
GET    /api/staff/stats        - Statistiche staff
POST   /api/staff              - Creare nuovo staff (+ upload foto)
PUT    /api/staff/:id          - Modificare staff (+ upload foto)
DELETE /api/staff/:id          - Eliminare staff (soft delete)
POST   /api/staff/:id/notes    - Aggiungere nota a staff
POST   /api/staff/import/excel - Importare staff da Excel
GET    /api/staff/export/excel - Esportare staff a Excel
```

#### Funzionalità:
- ✅ CRUD completo con validazione
- ✅ Upload foto (JPG, PNG, WebP max 5MB)
- ✅ Import da Excel (.xlsx, .csv)
- ✅ Export a Excel
- ✅ Paginazione e filtri
- ✅ Soft delete (mark as inactive)
- ✅ Note per ogni staff member

### 4️⃣ Struttura Backend Organizzata
```
backend/src/
├── controllers/
│   ├── authController.js      - Autenticazione
│   ├── staffController.js     - Staff CRUD
│   └── excelController.js     - Import/Export Excel
├── middleware/
│   └── auth.js                - JWT e role-based access
├── services/
│   ├── authService.js         - OAuth e JWT logic
│   └── excelService.js        - Excel import/export logic
├── routes/
│   ├── auth.js                - Auth endpoints
│   └── staff.js               - Staff endpoints
├── utils/
│   └── passport.js            - Passport configuration
└── server.js                  - Main server
```

## Prossimi Step

### Per Partire Subito:
1. **Setup Database** (scegli uno):
   - Supabase (consigliato): Vai a https://supabase.com, crea progetto, copia URL
   - Docker: `docker-compose up -d`
   - SQLite: Cambia DATABASE_URL nel .env

2. **Setup Google OAuth**:
   - Crea progetto su https://console.cloud.google.com
   - Abilita Google+ API
   - Crea OAuth credentials
   - Copia Client ID e Secret nel .env

3. **Inizializza Database**:
   ```bash
   cd backend
   npx prisma migrate deploy
   npx prisma generate
   ```

4. **Avvia Backend**:
   ```bash
   npm run dev
   ```
   Backend in esecuzione su `http://localhost:5000`

5. **Test OAuth**:
   - Vai a `http://localhost:5000/api/auth/google`
   - Dovresti essere reindirizzato a Google login

### Prossime Task (da completare):
- ✅ #1-4: Backend Setup + Staff CRUD + Excel
- 📋 #5: Integrazione Frontend + API (Staff UI components)
- 📋 #6: ROSTER - Modelli, CRUD, Upload e Frontend
- 📋 #7: CALENDAR - Modelli, CRUD e Frontend
- 📋 #8: TRAININGS - Modelli, CRUD, Upload e Frontend
- 📋 #9: Sezioni Rimanenti (Playbook, Scouting, GameCard, Organization)

## File di Configurazione

### .env (Backend)
```env
DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database]"
PORT=5000
NODE_ENV=development
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
JWT_SECRET=your_jwt_secret_key_change_me
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3001
MAX_FILE_SIZE=52428800
UPLOAD_DIR=./uploads
```

### Prisma Schema
- 18 modelli completamente relazionati
- Cascading deletes configurati
- Indexes per performance
- Enums per ruoli e type

## Dependencies Installate

```json
{
  "passport": "^0.7.0",
  "passport-google-oauth20": "^2.0.0",
  "jsonwebtoken": "^9.1.2",
  "axios": "^1.6.0",
  "express-session": "^1.17.3",
  "@prisma/client": "^5.0.0",
  "prisma": "^5.0.0",
  "exceljs": "^4.4.0",
  "multer": "^1.4.5",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "joi": "^17.11.0",
  "uuid": "^9.0.1"
}
```

## Comandi Utili

```bash
# Avviare backend in development
npm run dev

# Prisma Studio (GUI per database)
npx prisma studio

# Creare nuova migration
npx prisma migrate dev --name [nome_migration]

# Reset database (⚠️ cancella tutto!)
npx prisma migrate reset

# Generare Prisma Client
npx prisma generate

# Testare health
curl http://localhost:5000/api/health

# Testare auth
curl http://localhost:5000/api/auth/health
```

## Documenti di Riferimento

- `SETUP_DATABASE.md` - Configurazione database
- `SETUP_OAUTH.md` - Setup Google OAuth
- `prisma/schema.prisma` - Schema database completo
- `.env` - Variabili d'ambiente

## Pronto per il Prossimo Step? 🚀

Backend è completo e pronto per il frontend! Prossimo passo:
- Integrazione Frontend con API Staff
- Creazione pagina Staff.jsx con CRUD UI
- Connessione a endpoints API
- Login page con Google OAuth

Vuoi che cominci subito con il **TASK #5: Frontend Integration**?
