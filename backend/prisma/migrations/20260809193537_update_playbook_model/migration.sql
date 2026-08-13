/*
  Warnings:

  - You are about to drop the column `diagram` on the `Playbook` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Playbook` table. All the data in the column will be lost.
  - Added the required column `fileType` to the `Playbook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `side` to the `Playbook` table without a default value. This is not possible if the table is not empty.
  - Made the column `fileUrl` on table `Playbook` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Playbook" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "side" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "tags" TEXT,
    "notes" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Playbook" ("active", "createdAt", "description", "fileUrl", "id", "name", "notes", "updatedAt") SELECT "active", "createdAt", "description", "fileUrl", "id", "name", "notes", "updatedAt" FROM "Playbook";
DROP TABLE "Playbook";
ALTER TABLE "new_Playbook" RENAME TO "Playbook";
CREATE INDEX "Playbook_side_idx" ON "Playbook"("side");
CREATE INDEX "playbook_name_idx" ON "Playbook"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
