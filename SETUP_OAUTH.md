# Setup Google OAuth

## Step 1: Creare progetto su Google Cloud Console

1. Vai a https://console.cloud.google.com
2. Crea un nuovo progetto (nome: "Gestionale Basket")
3. Aspetta che si crei il progetto

## Step 2: Abilitare Google+ API

1. Vai a **APIs & Services** → **Library**
2. Cerca "Google+ API"
3. Clicca e abilita

## Step 3: Creare OAuth 2.0 Credentials

1. Vai a **APIs & Services** → **Credentials**
2. Clicca **Create Credentials** → **OAuth 2.0 Client ID**
3. Se ti chiede di creare una "OAuth consent screen":
   - Scegli "External"
   - Riempi nome app: "Gestionale Basket"
   - Email di supporto: la tua email
   - Clicca "Save and Continue"
   - Aggiungi scopes: `profile`, `email`
   - Clicca "Save and Continue"
   - Aggiungi te stesso come test user
   - Clicca "Save and Continue"

4. Dopo, per le Credentials:
   - Scegli **Application Type** → **Web application**
   - Assegna un nome: "Gestionale API"

5. Aggiungi Authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback` (development)
   - `http://localhost:3001/auth/callback` (frontend)
   - Aggiungi il tuo dominio di produzione quando deployerai

6. Clicca **Create**

## Step 4: Recuperare Credentials

1. Nella pagina Credentials, troverai:
   - **Client ID**
   - **Client Secret**

2. Copia questi valori

## Step 5: Aggiornare .env

Nel file `backend/.env`, aggiorna:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

## Step 6: Testare

1. Avvia il backend:
   ```bash
   npm run dev
   ```

2. Vai a `http://localhost:5000/api/auth/google`

3. Dovresti essere reindirizzato a Google login

4. Dopo l'autenticazione, verrai reindirizzato al frontend con un token JWT

## Scopes

L'app richiede:
- `profile` - Nome e foto profilo
- `email` - Email dell'utente

## Troubleshooting

### Errore: "The redirect URI doesn't match"
- Controlla che l'URI in Google Console corrisponda esattamente a quello nel codice
- Non deve avere slash alla fine o differenze

### Errore: "Invalid Client"
- Verifica che GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET siano corretti
- Controlla che non ci siano spazi nei valori

### Errore: "Redirect URI mismatch"
- Aggiungi l'URI esatto in Google Console sotto Authorized redirect URIs
- Nota: `http` per development, `https` per production

## Note sulla sicurezza

⚠️ **IMPORTANTE**: 
- Non committare mai il `.env` file nel repository
- Mantieni GOOGLE_CLIENT_SECRET privato
- In production, usa variabili d'ambiente sicure (AWS Secrets, etc.)
