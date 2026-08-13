-- CreateTable
CREATE TABLE "PracticesShootingStats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rosterId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "lhCorM" INTEGER,
    "lhCorA" INTEGER,
    "lhWgM" INTEGER,
    "lhWgA" INTEGER,
    "topM" INTEGER,
    "topA" INTEGER,
    "rtWgM" INTEGER,
    "rtWgA" INTEGER,
    "rtCorM" INTEGER,
    "rtCorA" INTEGER,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PracticesShootingStats_rosterId_fkey" FOREIGN KEY ("rosterId") REFERENCES "Roster" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "PracticesShootingStats_rosterId_idx" ON "PracticesShootingStats"("rosterId");

-- CreateIndex
CREATE INDEX "PracticesShootingStats_date_idx" ON "PracticesShootingStats"("date");
