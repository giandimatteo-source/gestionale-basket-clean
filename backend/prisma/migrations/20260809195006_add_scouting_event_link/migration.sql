-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ScoutingNote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reportId" TEXT,
    "note" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,
    CONSTRAINT "ScoutingNote_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "ScoutingReport" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ScoutingNote_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ScoutingNote" ("creatorId", "date", "id", "note", "reportId") SELECT "creatorId", "date", "id", "note", "reportId" FROM "ScoutingNote";
DROP TABLE "ScoutingNote";
ALTER TABLE "new_ScoutingNote" RENAME TO "ScoutingNote";
CREATE INDEX "ScoutingNote_date_idx" ON "ScoutingNote"("date");
CREATE TABLE "new_ScoutingReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "opponent" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "matchDate" DATETIME,
    "content" TEXT,
    "fileUrl" TEXT,
    "fileType" TEXT,
    "keyPlayers" TEXT,
    "strategy" TEXT,
    "notes" TEXT,
    "eventId" TEXT,
    "creatorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ScoutingReport_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "CalendarEvent" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ScoutingReport_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ScoutingReport" ("content", "createdAt", "creatorId", "date", "fileUrl", "id", "keyPlayers", "matchDate", "notes", "opponent", "strategy", "updatedAt") SELECT "content", "createdAt", "creatorId", "date", "fileUrl", "id", "keyPlayers", "matchDate", "notes", "opponent", "strategy", "updatedAt" FROM "ScoutingReport";
DROP TABLE "ScoutingReport";
ALTER TABLE "new_ScoutingReport" RENAME TO "ScoutingReport";
CREATE INDEX "ScoutingReport_opponent_idx" ON "ScoutingReport"("opponent");
CREATE INDEX "ScoutingReport_matchDate_idx" ON "ScoutingReport"("matchDate");
CREATE INDEX "ScoutingReport_eventId_idx" ON "ScoutingReport"("eventId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
