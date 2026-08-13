/*
  Warnings:

  - You are about to drop the column `assistsPerGame` on the `PlayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `fieldGoalPercentage` on the `PlayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `freeThrowPercentage` on the `PlayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `pointsPerGame` on the `PlayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `reboundsPerGame` on the `PlayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `threePointPercentage` on the `PlayerStats` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "PlayTypeStats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playType" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "fgPercent" REAL,
    "possessions" REAL,
    "points" REAL,
    "pppp" REAL,
    "foulsDrawn" REAL,
    "turnovers" REAL,
    "updatedAt" DATETIME NOT NULL,
    "statsId" TEXT NOT NULL,
    CONSTRAINT "PlayTypeStats_statsId_fkey" FOREIGN KEY ("statsId") REFERENCES "PlayerStats" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlayerStats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "min" REAL,
    "points" REAL,
    "pppp" REAL,
    "fgPlus" REAL,
    "fg" REAL,
    "fgPercent" REAL,
    "threePass" REAL,
    "threePt" REAL,
    "threePtPercent" REAL,
    "ftPlus" REAL,
    "ft" REAL,
    "ftPercent" REAL,
    "tsPercent" REAL,
    "twoPtPlus" REAL,
    "twoPt" REAL,
    "twoPtPercent" REAL,
    "reb" REAL,
    "oreb" REAL,
    "dreb" REAL,
    "ast" REAL,
    "stl" REAL,
    "tov" REAL,
    "blk" REAL,
    "f" REAL,
    "fd" REAL,
    "plusMinus" REAL,
    "astTo" REAL,
    "orat" REAL,
    "drat" REAL,
    "updatedAt" DATETIME NOT NULL,
    "rosterId" TEXT NOT NULL,
    CONSTRAINT "PlayerStats_rosterId_fkey" FOREIGN KEY ("rosterId") REFERENCES "Roster" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PlayerStats" ("id", "rosterId", "updatedAt") SELECT "id", "rosterId", "updatedAt" FROM "PlayerStats";
DROP TABLE "PlayerStats";
ALTER TABLE "new_PlayerStats" RENAME TO "PlayerStats";
CREATE UNIQUE INDEX "PlayerStats_rosterId_key" ON "PlayerStats"("rosterId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "PlayTypeStats_statsId_idx" ON "PlayTypeStats"("statsId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayTypeStats_statsId_playType_side_key" ON "PlayTypeStats"("statsId", "playType", "side");
