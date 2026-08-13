-- CreateTable
CREATE TABLE "ScoutingPlayerStats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reportId" TEXT NOT NULL,
    "sheetType" TEXT NOT NULL,
    "playerNumber" INTEGER,
    "playerName" TEXT,
    "data" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ScoutingPlayerStats_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "ScoutingReport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ScoutingOffensiveBreakdown" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reportId" TEXT NOT NULL,
    "rank" INTEGER,
    "call" TEXT,
    "poss" REAL,
    "points" REAL,
    "pfd" REAL,
    "twopm" REAL,
    "twoam" REAL,
    "threepm" REAL,
    "threeam" REAL,
    "ftm" REAL,
    "fta" REAL,
    "paintTouch" BOOLEAN,
    "data" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ScoutingOffensiveBreakdown_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "ScoutingReport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ScoutingComparingStats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reportId" TEXT NOT NULL,
    "statName" TEXT NOT NULL,
    "ourValue" REAL,
    "ourCategory" TEXT,
    "theirValue" REAL,
    "theirCategory" TEXT,
    "data" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ScoutingComparingStats_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "ScoutingReport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ScoutingKeyPoint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reportId" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT NOT NULL,
    "category" TEXT,
    "priority" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ScoutingKeyPoint_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "ScoutingReport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ScoutingPlayerStats_reportId_idx" ON "ScoutingPlayerStats"("reportId");

-- CreateIndex
CREATE INDEX "ScoutingPlayerStats_sheetType_idx" ON "ScoutingPlayerStats"("sheetType");

-- CreateIndex
CREATE INDEX "ScoutingOffensiveBreakdown_reportId_idx" ON "ScoutingOffensiveBreakdown"("reportId");

-- CreateIndex
CREATE INDEX "ScoutingComparingStats_reportId_idx" ON "ScoutingComparingStats"("reportId");

-- CreateIndex
CREATE INDEX "ScoutingKeyPoint_reportId_idx" ON "ScoutingKeyPoint"("reportId");
