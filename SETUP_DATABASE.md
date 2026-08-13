# Setup Database - PostgreSQL con Supabase

## Opzione 1: Supabase (CONSIGLIATO - Gratis) ✅

### Step 1: Creare account Supabase
1. Vai a https://supabase.com
2. Clicca "Start your project"
3. Sign up con Google o email
4. Crea un nuovo progetto

### Step 2: Recuperare Credentials
1. Vai al Dashboard
2. Settings → Database
3. Copia la Connection String (PostgreSQL)
4. Assomiglia a:
   ```
   postgresql://[user]:[password]@[host]:[port]/[database]
   ```

### Step 3: Aggiornare .env
Sostituisci DATABASE_URL nel file `.env`:
```bash
DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database]"
```

### Step 4: Eseguire Migrations
```bash
npx prisma migrate deploy
```

### Step 5: Generare Prisma Client
```bash
npx prisma generate
```

---

## Opzione 2: Docker Locale

Se hai Docker installato:
```bash
docker-compose up -d
```

Poi esegui:
```bash
npx prisma migrate deploy
npx prisma generate
```

---

## Opzione 3: SQLite (Sviluppo Locale)

Per sviluppo rapido locale, puoi usare SQLite:
1. Cambia `DATABASE_URL` nel `.env`:
   ```
   DATABASE_URL="file:./dev.db"
   ```
2. Cambia provider in `prisma/schema.prisma`:
   ```
   provider = "sqlite"
   ```
3. Esegui migration:
   ```bash
   npx prisma migrate deploy
   ```

---

## Comandi Prisma Utili

```bash
# Creare una nuova migration
npx prisma migrate dev --name add_users_table

# Eseguire migrations
npx prisma migrate deploy

# Generare Prisma Client
npx prisma generate

# Aprire Prisma Studio (GUI)
npx prisma studio

# Resettare database (ATTENZIONE: cancella tutto!)
npx prisma migrate reset
```
