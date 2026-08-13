# FASE 1 - STAFF & ROSTER SPECIFICATION

## 1. STAFF MODULE

### 1.1 STAFF LIST VIEW
**URL**: `/staff`

**Layout**: 
- Header: "STAFF TEAM"
- Search bar (filter by nome, ruolo)
- Add Staff button (+)
- Grid view: 4-5 card per riga

**Card Component** (per ogni staff member):
```
┌─────────────────────────┐
│    [FOTO 200x200]       │
│                         │
├─────────────────────────┤
│ NOME COGNOME            │
│ Ruolo (e.g., Head Coach)│
│                         │
│ 📧 Email (clickable)    │
│ 📱 Telefono (clickable) │
│                         │
│ [EDIT] [DELETE]         │
└─────────────────────────┘
```

**Card Hover States**: 
- Slight elevation
- Edit/Delete buttons fully visible

---

### 1.2 STAFF DETAIL / ADD / EDIT MODAL

**Trigger**: Click card → Open modal, or click [+] Add Staff

**Form Fields**:
```
┌─────────────────────────────────────────┐
│ STAFF PROFILE                      [X]  │
├─────────────────────────────────────────┤
│                                         │
│ [UPLOAD FOTO] [Preview 150x150]        │
│                                         │
│ Nome Cognome: _________________ (req)   │
│                                         │
│ Ruolo: [Dropdown]                       │
│   - Head Coach                          │
│   - Assistant Coach                     │
│   - Strength & Conditioning             │
│   - Video Coach                         │
│   - Medical Staff (Doctor)              │
│   - Medical Staff (Physio)              │
│   - Nutritionist                        │
│   - Other                               │
│                                         │
│ Email: _________________ (req, valid)   │
│                                         │
│ Telefono: _________________ (optional)  │
│                                         │
│ Specializzazione: ________________      │
│   (e.g., video analysis, strength)     │
│                                         │
│ Note: ________________________ (textarea)│
│   (Disponibilità, collaborazioni, etc) │
│                                         │
│               [SAVE] [CANCEL]          │
└─────────────────────────────────────────┘
```

**Validation**:
- Nome: required, min 3 chars
- Email: required, valid email format
- Ruolo: required
- Telefono: optional, format validation (IT: +39...)
- Foto: optional, max 5MB, accepted formats: jpg, png, webp

**Data Structure** (database):
```json
{
  "staff_id": "uuid",
  "nome_cognome": "string",
  "ruolo": "enum",
  "email": "string",
  "telefono": "string (optional)",
  "specializzazione": "string (optional)",
  "note": "text (optional)",
  "foto_url": "string (optional, stored in /uploads/staff/)",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

**Actions from Modal**:
- **SAVE**: Validate → POST/PUT → Close modal → Refresh list
- **CANCEL**: Close without saving
- **DELETE** (from detail): Confirm dialog → DELETE → Close → Refresh

---

### 1.3 EMAIL INTEGRATION
From any staff card or detail view:
- Click email → Opens mailto: link (client-side)
- Alternative: "Send Message" button that opens in-app email composer (Phase 2+)

---

## 2. ROSTER MODULE

### 2.1 ROSTER LIST VIEW
**URL**: `/roster`

**Layout**:
- Header: "ROSTER SQUADRA 2024-25"  (season selector dropdown)
- Filter bar: by ruolo (all, PG, SG, SF, PF, C)
- Search bar: nome giocatore
- Add Player button (+)
- Table view: more data-dense than staff

**Table Structure**:
```
┌──┬────────────────┬────┬──────┬────┬───────┬────────┬─────────┐
│# │   GIOCATRICE   │ R  │ ALT  │PES │ ETÀ   │ STATS  │ INFORTUNI│
├──┼────────────────┼────┼──────┼────┼───────┼────────┼─────────┤
│1 │[F] Eva Lisec   │PG  │183cm │65kg│  28   │ 15 PPG │   [!]   │
│3 │[F] Teja Oblak  │SG  │175cm │62kg│  26   │ 8 PPG  │   —     │
│5 │[F] Tina Cvij.  │SF  │180cm │68kg│  24   │ 5 PPG  │   [!]   │
│...
└──┴────────────────┴────┴──────┴────┴───────┴────────┴─────────┘
```

**Row Click Behavior**:
- Click row → Open player detail modal/drawer

**Injury Indicator** ([!]):
- Hoverable → Shows: "Caviglia - In corso - ETA ritorno: 15/08"
- Red icon if "in corso"
- Gray icon if "guarito"

---

### 2.2 PLAYER DETAIL / ADD / EDIT MODAL

**Trigger**: Click table row → Open side drawer (or modal)

**Drawer Layout**:
```
┌────────────────────────────────────┐
│ # 3 - TEJA OBLAK            [X]    │
├────────────────────────────────────┤
│ [FOTO 200x200] [EDIT] [DELETE]     │
├────────────────────────────────────┤
│ DATI PERSONALI                     │
│                                    │
│ Nome: Teja Oblak                   │
│ Ruolo: SG                          │
│ Data Nascita: 15/05/1998 (25 anni) │
│ Altezza: 175 cm                    │
│ Peso: 62 kg                        │
│ Email: teja.oblak@...              │
│ Telefono: +386 ...                 │
│                                    │
│ SOCIAL & PROFILI                   │
│ Instagram: @tejaoblak              │
│ FIBA Profile: [link]               │
│                                    │
│────────────────────────────────────│
│ STATS STAGIONALI (Summary)         │
│                                    │
│ MPG: 25.2 | PPG: 8.4 | RPG: 2.1    │
│ APG: 1.2 | FG%: 42.5% | 3P%: 35.2%│
│                                    │
│────────────────────────────────────│
│ INFORTUNI                          │
│                                    │
│ ┌──────────────────────────────────┐│
│ │ Caviglia destra                  ││
│ │ Data: 10/07/2025                 ││
│ │ Status: In corso                 ││
│ │ ETA Ritorno: 15/08/2025          ││
│ │ Note: Riposo consigliato         ││
│ │ [EDIT] [DELETE]                  ││
│ └──────────────────────────────────┘│
│ [+ ADD INJURY]                     │
│                                    │
│────────────────────────────────────│
│ [EDIT PLAYER] [CLOSE]              │
└────────────────────────────────────┘
```

---

### 2.3 PLAYER EDIT FORM

**Form Sections**:

#### 2.3a - BASIC INFO
```
Numero Maglia: [5] (required, 1-15)
Nome: _________________ (required)
Cognome: _________________ (required)
Foto: [UPLOAD] [Preview]
Ruolo: [Dropdown: PG, SG, SF, PF, C] (required)
```

#### 2.3b - PHYSICAL DATA
```
Data Nascita: [date picker] (required)
Altezza (cm): [183] (required, integer)
Peso (kg): [65.5] (required, decimal)
```

#### 2.3c - CONTACT
```
Email: _________________ (optional, valid email)
Telefono: _________________ (optional)
```

#### 2.3d - SOCIAL & LINKS
```
Instagram: [Handle] (optional, for @reference)
FIBA Profile: [URL] (optional)
Other Links: [URL] (optional, JSON array)
```

#### 2.3e - INJURIES (sub-section)
```
[Table of current/past injuries]
┌─────────────────────────────────────────┐
│ Data       │ Tipo        │ Status      │ ETA │
├─────────────────────────────────────────┤
│ 10/07/2025 │ Distorsione │ In corso    │ ... │
│ 20/05/2024 │ Strappo     │ Guarito     │ ... │
└─────────────────────────────────────────┘
[+ ADD INJURY]
```

**Injury Form** (modal inside):
```
Data Infortunio: [date picker] (required)
Tipo: [Dropdown: Distorsione, Strappo, Frattura, Contusione, Altro] (req)
Parte Corpo: [Text: "caviglia sinistra"] (required)
Status: [Dropdown: In corso, Guarito, Sospetto] (required)
ETA Ritorno: [date picker] (required if in corso)
Note: [Textarea] (optional)

[SAVE] [CANCEL]
```

---

### 2.4 DATA STRUCTURE

**PLAYER**:
```json
{
  "player_id": "uuid",
  "numero_maglia": "integer",
  "nome": "string",
  "cognome": "string",
  "ruolo": "enum (PG|SG|SF|PF|C)",
  "data_nascita": "date",
  "altezza_cm": "integer",
  "peso_kg": "decimal",
  "email": "string (optional)",
  "telefono": "string (optional)",
  "foto_url": "string (optional)",
  "social_links": {
    "instagram": "string (optional)",
    "fiba_profile": "url (optional)",
    "other": "array (optional)"
  },
  "season": "string (e.g., 2024-25)",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

**INJURY**:
```json
{
  "injury_id": "uuid",
  "player_id": "uuid (FK)",
  "data_infortunio": "date",
  "tipo": "enum",
  "parte_corpo": "string",
  "status": "enum (in_corso|guarito|sospetto)",
  "eta_ritorno": "date (optional)",
  "note": "text (optional)",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

**PLAYER_STATS** (aggregated per season):
```json
{
  "player_stats_id": "uuid",
  "player_id": "uuid (FK)",
  "season": "string",
  "mpg": "decimal",
  "ppg": "decimal",
  "rpg": "decimal",
  "apg": "decimal",
  "fg_percentage": "decimal",
  "three_p_percentage": "decimal",
  "ft_percentage": "decimal",
  "updated_at": "datetime"
}
```

---

## 3. NAVIGATION & LAYOUT

### 3.1 Main App Layout
```
┌─────────────────────────────────────────┐
│ GESTIONALE BASKET      [MENU HAMBURGER] │
├─────────────────────────────────────────┤
│                                         │
│  [STAFF] [ROSTER] [CALENDAR] [TRAININGS]│
│  [PLAYBOOK] [SCOUTING] [ORGANIZATION]   │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│                                         │
│       [CONTENT AREA - Dynamic]          │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

### 3.2 Responsive Breakpoints
- Desktop: 1200px+ → Card/Table grid
- Tablet: 768px-1199px → 2-3 columns, stacked
- Mobile: <768px → Full-width, modal-first

---

## 4. UI COMPONENTS (Reusable)

- **Button**: Primary (blue), Secondary (gray), Danger (red)
- **Input**: Text, Email, Date picker, Dropdown
- **Modal**: Centered, dark overlay, close button
- **Drawer**: Side panel (right), overlay, close button
- **Table**: Sortable columns, hover rows, clickable
- **Card**: Elevation on hover, consistent spacing
- **Alert**: Success (green), Error (red), Warning (yellow)

---

## 5. WORKFLOW

### Add/Edit Staff:
1. Click [+] → Modal opens
2. Fill form → Validation on blur
3. [SAVE] → POST/PUT request
4. Success alert → Modal closes → List refreshes

### View Player Injuries:
1. Click player row → Drawer opens
2. Scroll to "INFORTUNI" section
3. See all injuries (current + historical)
4. Click [EDIT] on injury → Modal opens
5. Or [+ ADD INJURY] for new injury

### Delete Staff/Player:
1. Click [DELETE] → Confirmation dialog
2. Confirm → DELETE request
3. Error/Success alert → List refreshes

---

## 6. BACKEND ENDPOINTS (REST API)

```
STAFF:
GET    /api/staff                 - List all staff
POST   /api/staff                 - Create staff
GET    /api/staff/:id             - Get single staff
PUT    /api/staff/:id             - Update staff
DELETE /api/staff/:id             - Delete staff

ROSTER:
GET    /api/roster?season=2024-25 - List players
POST   /api/roster                - Create player
GET    /api/roster/:id            - Get single player
PUT    /api/roster/:id            - Update player
DELETE /api/roster/:id            - Delete player

INJURIES:
POST   /api/roster/:player_id/injuries    - Add injury
PUT    /api/roster/:player_id/injuries/:id - Update injury
DELETE /api/roster/:player_id/injuries/:id - Delete injury

STATS:
GET    /api/roster/:id/stats?season=2024-25 - Get player season stats
PUT    /api/roster/:id/stats               - Update aggregated stats
```

---

## 7. SUCCESS CRITERIA

✅ Staff cards display correctly with photo, name, role
✅ Add/Edit staff form validates input
✅ Roster table shows all players with sortable columns
✅ Player detail drawer shows full profile + injury history
✅ Add injury modal works and saves correctly
✅ All CRUD operations successful
✅ Responsive on mobile, tablet, desktop
✅ Error handling (network, validation)
✅ Success alerts after operations

---

**Ready for FASE 2** (Calendar + Trainings) once this is done ✅
