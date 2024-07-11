-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PayList" (
    "unique_id" TEXT NOT NULL PRIMARY KEY,
    "doc_no" TEXT,
    "trans_type" TEXT,
    "due_date" TEXT,
    "recipient" TEXT,
    "amount" TEXT,
    "upload_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_PayList" ("amount", "doc_no", "due_date", "recipient", "trans_type", "unique_id") SELECT "amount", "doc_no", "due_date", "recipient", "trans_type", "unique_id" FROM "PayList";
DROP TABLE "PayList";
ALTER TABLE "new_PayList" RENAME TO "PayList";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
