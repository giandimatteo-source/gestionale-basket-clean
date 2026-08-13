/*
  Warnings:

  - You are about to drop the column `date` on the `CalendarEvent` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `CalendarEvent` table. All the data in the column will be lost.
  - Added the required column `startTime` to the `CalendarEvent` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "EventRecurrence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "frequency" TEXT NOT NULL,
    "daysOfWeek" TEXT,
    "endDate" DATETIME,
    "occurrences" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CalendarEventParticipant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "notificationType" TEXT NOT NULL DEFAULT 'both',
    "eventId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CalendarEventParticipant_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "CalendarEvent" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EventNotification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "sentAt" DATETIME,
    "scheduledFor" DATETIME NOT NULL,
    "content" TEXT,
    "recipientEmail" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "eventId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EventNotification_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "CalendarEvent" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CalendarEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME,
    "location" TEXT,
    "opponent" TEXT,
    "notes" TEXT,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "parentEventId" TEXT,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "recurrenceId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CalendarEvent_recurrenceId_fkey" FOREIGN KEY ("recurrenceId") REFERENCES "EventRecurrence" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CalendarEvent" ("createdAt", "description", "id", "location", "notes", "opponent", "title", "type", "updatedAt") SELECT "createdAt", "description", "id", "location", "notes", "opponent", "title", "type", "updatedAt" FROM "CalendarEvent";
DROP TABLE "CalendarEvent";
ALTER TABLE "new_CalendarEvent" RENAME TO "CalendarEvent";
CREATE INDEX "CalendarEvent_startTime_idx" ON "CalendarEvent"("startTime");
CREATE INDEX "CalendarEvent_type_idx" ON "CalendarEvent"("type");
CREATE INDEX "CalendarEvent_createdBy_idx" ON "CalendarEvent"("createdBy");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "CalendarEventParticipant_eventId_idx" ON "CalendarEventParticipant"("eventId");

-- CreateIndex
CREATE INDEX "CalendarEventParticipant_email_idx" ON "CalendarEventParticipant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CalendarEventParticipant_eventId_email_key" ON "CalendarEventParticipant"("eventId", "email");

-- CreateIndex
CREATE INDEX "EventNotification_eventId_idx" ON "EventNotification"("eventId");

-- CreateIndex
CREATE INDEX "EventNotification_scheduledFor_idx" ON "EventNotification"("scheduledFor");

-- CreateIndex
CREATE INDEX "EventNotification_status_idx" ON "EventNotification"("status");
