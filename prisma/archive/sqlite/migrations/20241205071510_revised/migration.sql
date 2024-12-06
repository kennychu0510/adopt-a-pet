/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Adoption` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ContactUs` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Missing` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Wish` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Adoption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "petName" TEXT NOT NULL,
    "show" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Adoption" ("contact", "description", "id", "image", "name", "petName", "show", "type") SELECT "contact", "description", "id", "image", "name", "petName", "show", "type" FROM "Adoption";
DROP TABLE "Adoption";
ALTER TABLE "new_Adoption" RENAME TO "Adoption";
CREATE TABLE "new_ContactUs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contact" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL
);
INSERT INTO "new_ContactUs" ("contact", "id", "message", "name") SELECT "contact", "id", "message", "name" FROM "ContactUs";
DROP TABLE "ContactUs";
ALTER TABLE "new_ContactUs" RENAME TO "ContactUs";
CREATE TABLE "new_Missing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
INSERT INTO "new_Missing" ("contact", "description", "id", "image", "lastSeen", "lat", "lng", "name", "petName", "show", "type") SELECT "contact", "description", "id", "image", "lastSeen", "lat", "lng", "name", "petName", "show", "type" FROM "Missing";
DROP TABLE "Missing";
ALTER TABLE "new_Missing" RENAME TO "Missing";
CREATE TABLE "new_Wish" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "show" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Wish" ("contact", "description", "id", "name", "show", "type") SELECT "contact", "description", "id", "name", "show", "type" FROM "Wish";
DROP TABLE "Wish";
ALTER TABLE "new_Wish" RENAME TO "Wish";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
