-- CreateTable
CREATE TABLE "PayList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "doc_no" TEXT,
    "trans_type" TEXT,
    "due_date" TEXT,
    "recipient" TEXT,
    "amount" TEXT
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT,
    "status" TEXT
);
