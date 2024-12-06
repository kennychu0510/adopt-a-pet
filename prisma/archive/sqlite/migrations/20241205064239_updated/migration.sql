-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Adoption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "petName" TEXT NOT NULL,
    "show" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Adoption" ("contact", "createdAt", "description", "id", "image", "name", "petName", "show", "type") SELECT "contact", "createdAt", "description", "id", "image", "name", "petName", "show", "type" FROM "Adoption";
DROP TABLE "Adoption";
ALTER TABLE "new_Adoption" RENAME TO "Adoption";
CREATE TABLE "new_Missing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
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
CREATE TABLE "new_Wish" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "show" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Wish" ("contact", "createdAt", "description", "id", "name", "show", "type") SELECT "contact", "createdAt", "description", "id", "name", "show", "type" FROM "Wish";
DROP TABLE "Wish";
ALTER TABLE "new_Wish" RENAME TO "Wish";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
