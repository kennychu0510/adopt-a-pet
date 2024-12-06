/*
  Warnings:

  - Added the required column `petName` to the `Missing` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Missing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "petName" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "lastSeen" DATETIME NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "show" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Missing" ("contact", "createdAt", "description", "id", "image", "lastSeen", "lat", "lng", "name", "show", "type") SELECT "contact", "createdAt", "description", "id", "image", "lastSeen", "lat", "lng", "name", "show", "type" FROM "Missing";
DROP TABLE "Missing";
ALTER TABLE "new_Missing" RENAME TO "Missing";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
