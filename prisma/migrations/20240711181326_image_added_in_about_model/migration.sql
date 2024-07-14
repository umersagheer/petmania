/*
  Warnings:

  - Added the required column `aboutHeroImage` to the `About` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_About" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT '1',
    "aboutDescription" TEXT NOT NULL,
    "visionDescription" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "contactDescription" TEXT NOT NULL,
    "contactImg" TEXT NOT NULL,
    "aboutImg" TEXT NOT NULL,
    "descriptionImg" TEXT NOT NULL,
    "aboutHeroImage" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_About" ("aboutDescription", "aboutImg", "contactDescription", "contactImg", "createdAt", "descriptionImg", "goal", "id", "updatedAt", "visionDescription") SELECT "aboutDescription", "aboutImg", "contactDescription", "contactImg", "createdAt", "descriptionImg", "goal", "id", "updatedAt", "visionDescription" FROM "About";
DROP TABLE "About";
ALTER TABLE "new_About" RENAME TO "About";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
