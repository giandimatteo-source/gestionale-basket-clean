# Quick Start Backend 🚀

## 1️⃣ SETUP DATABASE (Scegli uno)

### ✅ Opzione 1: Supabase (CONSIGLIATO - Rapido e Gratis)

1. Vai a https://supabase.com
2. Crea account e nuovo progetto
3. Vai a Settings → Database → Connection Pooling
4. Copia la connection string PostgreSQL
5. Nel file `backend/.env`, aggiorna:
   ```
   DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database]"
   ```

### Opzione 2: Docker (Locale)
```bash
cd /Users/utente/Downloads/gestionale-basket-clean
docker-compose up -d
```

### Opzione 3: SQLite (Sviluppo Locale Rapido)
Nel file `backend/.env`:
```
DATABASE_URL="file:./dev.db"
```
Nel file `prisma/schema.prisma`, cambia provider:
```
provider = "sqlite"
```

---

## 2️⃣ SETUP GOOGLE OAUTH

1. Vai a https://console.cloud.google.com
2. Crea nuovo progetto ("Gestionale Basket")
3. Abilita Google+ API
4. Vai a Credentials → Create OAuth 2.0 Credentials
5. Copia **Client ID** e **Client Secret**
6. Nel file `backend/.env`, aggiorna:
   ```
   GOOGLE_CLIENT_ID=your_id_here
   GOOGLE_CLIENT_SECRET=your_secret_here
   GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
   ```

---

## 3️⃣ INIZIALIZZARE DATABASE

```bash
cd backend

# Creare le tabelle nel database
npx prisma migrate deploy

# Generare Prisma Client
npx prisma generate
```

---

## 4️⃣ AVVIARE BACKEND

```bash
npm run dev
```

Dovresti vedere:
```
🏀 Gestionale Basket API
━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Server running on http://localhost:5000
📊 Health check: http://localhost:5000/api/health
🔐 Auth: http://localhost:5000/api/auth/health
🔗 Google OAuth: http://localhost:5000/api/auth/google
━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 5️⃣ TEST ENDPOINTS

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Creare Staff (richiede JWT token)
```bash
curl -X POST http://localhost:5000/api/staff \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Marco Rossi",
    "email": "marco@example.com",
    "position": "Head Coach",
    "phone": "+39 333 1234567"
  }'
```

### Ottenere Lista Staff
```bash
curl http://localhost:5000/api/staff
```

### Import Excel
```bash
curl -X POST http://localhost:5000/api/staff/import/excel \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@staff_list.xlsx"
```

### Export Excel
```bash
curl http://localhost:5000/api/staff/export/excel -o staff_export.xlsx
```

---

## 6️⃣ AVVIARE FRONTEND

In un altro terminale:
```bash
cd frontend
npm run dev
```

Frontend in esecuzione su http://localhost:3001

---

## 📋 Checklist di Setup

- [ ] Database configurato (Supabase/Docker/SQLite)
- [ ] Google OAuth credentials creati
- [ ] `.env` aggiornato con credenziali
- [ ] `npx prisma migrate deploy` eseguito
- [ ] Backend avviato (`npm run dev`)
- [ ] Health check funzionante
- [ ] Frontend avviato (`npm run dev`)
- [ ] Login page visibile

---

## 🔗 URL Importanti

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3001
- **Prisma Studio**: `npx prisma studio`
- **Google OAuth**: http://localhost:5000/api/auth/google

---

## ❌ Troubleshooting

### Errore: "Database connection failed"
- Verifica DATABASE_URL nel .env
- Assicurati che Supabase/Docker/SQLite sia attivo
- Esegui `npx prisma migrate deploy`

### Errore: "Google authentication failed"
- Verifica GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET
- Assicurati che Google OAuth callback URL sia corretto
- Controlla Google Cloud Console per errori

### Errore: "CORS policy"
- Verifica FRONTEND_URL nel .env
- Assicurati che corrisponda all'URL del frontend

### Database vuoto dopo migration
- Questo è normale! Inizia a creare dati via API

---

## 📚 Prossimi Step

1. **Integrazione Frontend**: Connettere UI React con API
2. **Login Page**: Implementare Google OAuth nel frontend
3. **Staff Management UI**: Creare interfaccia CRUD per staff
4. **Excel Import UI**: Upload file nel frontend
5. **ROSTER**: Ripetere per giocatrici
6. **CALENDAR**: Evento e partite
7. **TRAININGS**: Allenamenti e presenze

---

## 💡 Tips

- Usa Prisma Studio per ispezionare database: `npx prisma studio`
- Aggiungi header `Authorization: Bearer TOKEN` per endpoint protetti
- File caricati vanno in `backend/uploads/staff/`
- Excel import supporta sia .xlsx che .csv

---

Pronto? 🚀 Avvia il backend e fammi sapere quando vuoi passare al frontend!
