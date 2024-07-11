-- CreateTable
CREATE TABLE "companyname" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "short_name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "companyname_short_name_key" ON "companyname"("short_name");
