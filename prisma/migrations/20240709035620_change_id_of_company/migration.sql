/*
  Warnings:

  - The primary key for the `companyname` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_companyname" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "short_name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_companyname" ("created_at", "full_name", "id", "short_name", "updated_at") SELECT "created_at", "full_name", "id", "short_name", "updated_at" FROM "companyname";
DROP TABLE "companyname";
ALTER TABLE "new_companyname" RENAME TO "companyname";
CREATE UNIQUE INDEX "companyname_short_name_key" ON "companyname"("short_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
