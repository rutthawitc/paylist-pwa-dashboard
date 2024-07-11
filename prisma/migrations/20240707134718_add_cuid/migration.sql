/*
  Warnings:

  - The primary key for the `PayList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PayList` table. All the data in the column will be lost.
  - The required column `unique_id` was added to the `PayList` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PayList" (
    "unique_id" TEXT NOT NULL PRIMARY KEY,
    "doc_no" TEXT,
    "trans_type" TEXT,
    "due_date" TEXT,
    "recipient" TEXT,
    "amount" TEXT
);
INSERT INTO "new_PayList" ("amount", "doc_no", "due_date", "recipient", "trans_type") SELECT "amount", "doc_no", "due_date", "recipient", "trans_type" FROM "PayList";
DROP TABLE "PayList";
ALTER TABLE "new_PayList" RENAME TO "PayList";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
