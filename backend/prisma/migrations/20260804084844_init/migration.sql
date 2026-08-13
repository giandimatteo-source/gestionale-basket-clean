-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "googleId" TEXT,
    "name" TEXT,
    "picture" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "position" TEXT NOT NULL,
    "photo" TEXT,
    "bio" TEXT,
    "joinDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StaffNote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "staffId" TEXT NOT NULL,
    CONSTRAINT "StaffNote_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Roster" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "height" REAL,
    "weight" REAL,
    "dateOfBirth" DATETIME,
    "nationality" TEXT,
    "photo" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "joinDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PlayerStats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pointsPerGame" REAL,
    "assistsPerGame" REAL,
    "reboundsPerGame" REAL,
    "fieldGoalPercentage" REAL,
    "threePointPercentage" REAL,
    "freeThrowPercentage" REAL,
    "updatedAt" DATETIME NOT NULL,
    "rosterId" TEXT NOT NULL,
    CONSTRAINT "PlayerStats_rosterId_fkey" FOREIGN KEY ("rosterId") REFERENCES "Roster" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Injury" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnDate" DATETIME,
    "severity" TEXT NOT NULL,
    "notes" TEXT,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "rosterId" TEXT NOT NULL,
    CONSTRAINT "Injury_rosterId_fkey" FOREIGN KEY ("rosterId") REFERENCES "Roster" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CalendarEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "endDate" DATETIME,
    "location" TEXT,
    "opponent" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TrainingSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "exercises" TEXT,
    "notes" TEXT,
    "fileUrl" TEXT,
    "calendarEventId" TEXT,
    "creatorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TrainingSession_calendarEventId_fkey" FOREIGN KEY ("calendarEventId") REFERENCES "CalendarEvent" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TrainingSession_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TrainingSessionPlayer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "present" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "trainingId" TEXT NOT NULL,
    "rosterId" TEXT NOT NULL,
    CONSTRAINT "TrainingSessionPlayer_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "TrainingSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TrainingSessionPlayer_rosterId_fkey" FOREIGN KEY ("rosterId") REFERENCES "Roster" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Playbook" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "diagram" TEXT,
    "notes" TEXT,
    "fileUrl" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ScoutingReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "opponent" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "matchDate" DATETIME,
    "content" TEXT,
    "fileUrl" TEXT,
    "keyPlayers" TEXT,
    "strategy" TEXT,
    "notes" TEXT,
    "creatorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ScoutingReport_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ScoutingNote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reportId" TEXT,
    "note" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,
    CONSTRAINT "ScoutingNote_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GameCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "opponent" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "location" TEXT,
    "finalScore" TEXT,
    "result" TEXT,
    "quarter1" INTEGER,
    "quarter2" INTEGER,
    "quarter3" INTEGER,
    "quarter4" INTEGER,
    "fileUrl" TEXT,
    "notes" TEXT,
    "eventId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "GameCard_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "CalendarEvent" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GameCardStat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "points" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "rebounds" INTEGER NOT NULL DEFAULT 0,
    "steals" INTEGER NOT NULL DEFAULT 0,
    "blocks" INTEGER NOT NULL DEFAULT 0,
    "turnovers" INTEGER NOT NULL DEFAULT 0,
    "fieldGoals" TEXT,
    "threePointers" TEXT,
    "freeThrows" TEXT,
    "gameCardId" TEXT NOT NULL,
    "rosterId" TEXT NOT NULL,
    CONSTRAINT "GameCardStat_gameCardId_fkey" FOREIGN KEY ("gameCardId") REFERENCES "GameCard" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GameCardStat_rosterId_fkey" FOREIGN KEY ("rosterId") REFERENCES "Roster" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Gestionale Basket Femminile',
    "city" TEXT,
    "country" TEXT,
    "foundedYear" INTEGER,
    "logo" TEXT,
    "description" TEXT,
    "website" TEXT,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "OrganizationSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "theme" TEXT NOT NULL DEFAULT 'dark',
    "language" TEXT NOT NULL DEFAULT 'it',
    "timezone" TEXT NOT NULL DEFAULT 'Europe/Rome',
    "maxUploadSize" INTEGER NOT NULL DEFAULT 52428800,
    "organizationId" TEXT NOT NULL,
    CONSTRAINT "OrganizationSettings_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_googleId_idx" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_userId_key" ON "Staff"("userId");

-- CreateIndex
CREATE INDEX "Staff_name_idx" ON "Staff"("name");

-- CreateIndex
CREATE INDEX "Staff_position_idx" ON "Staff"("position");

-- CreateIndex
CREATE INDEX "StaffNote_staffId_idx" ON "StaffNote"("staffId");

-- CreateIndex
CREATE INDEX "Roster_number_idx" ON "Roster"("number");

-- CreateIndex
CREATE INDEX "Roster_position_idx" ON "Roster"("position");

-- CreateIndex
CREATE INDEX "Roster_name_idx" ON "Roster"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerStats_rosterId_key" ON "PlayerStats"("rosterId");

-- CreateIndex
CREATE INDEX "Injury_rosterId_idx" ON "Injury"("rosterId");

-- CreateIndex
CREATE INDEX "Injury_date_idx" ON "Injury"("date");

-- CreateIndex
CREATE INDEX "CalendarEvent_date_idx" ON "CalendarEvent"("date");

-- CreateIndex
CREATE INDEX "CalendarEvent_type_idx" ON "CalendarEvent"("type");

-- CreateIndex
CREATE INDEX "TrainingSession_date_idx" ON "TrainingSession"("date");

-- CreateIndex
CREATE INDEX "TrainingSession_creatorId_idx" ON "TrainingSession"("creatorId");

-- CreateIndex
CREATE INDEX "TrainingSessionPlayer_trainingId_idx" ON "TrainingSessionPlayer"("trainingId");

-- CreateIndex
CREATE INDEX "TrainingSessionPlayer_rosterId_idx" ON "TrainingSessionPlayer"("rosterId");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingSessionPlayer_trainingId_rosterId_key" ON "TrainingSessionPlayer"("trainingId", "rosterId");

-- CreateIndex
CREATE INDEX "Playbook_type_idx" ON "Playbook"("type");

-- CreateIndex
CREATE INDEX "Playbook_name_idx" ON "Playbook"("name");

-- CreateIndex
CREATE INDEX "ScoutingReport_opponent_idx" ON "ScoutingReport"("opponent");

-- CreateIndex
CREATE INDEX "ScoutingReport_matchDate_idx" ON "ScoutingReport"("matchDate");

-- CreateIndex
CREATE INDEX "ScoutingNote_date_idx" ON "ScoutingNote"("date");

-- CreateIndex
CREATE UNIQUE INDEX "GameCard_eventId_key" ON "GameCard"("eventId");

-- CreateIndex
CREATE INDEX "GameCard_date_idx" ON "GameCard"("date");

-- CreateIndex
CREATE INDEX "GameCard_opponent_idx" ON "GameCard"("opponent");

-- CreateIndex
CREATE INDEX "GameCardStat_gameCardId_idx" ON "GameCardStat"("gameCardId");

-- CreateIndex
CREATE UNIQUE INDEX "GameCardStat_gameCardId_rosterId_key" ON "GameCardStat"("gameCardId", "rosterId");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationSettings_organizationId_key" ON "OrganizationSettings"("organizationId");
