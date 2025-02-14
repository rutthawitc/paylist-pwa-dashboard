-- CreateTable
CREATE TABLE "PayList" (
    "unique_id" TEXT NOT NULL,
    "doc_no" TEXT,
    "trans_type" TEXT,
    "due_date" TEXT,
    "recipient" TEXT,
    "amount" TEXT,
    "upload_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PayList_pkey" PRIMARY KEY ("unique_id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT,
    "status" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companyname" (
    "id" SERIAL NOT NULL,
    "short_name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companyname_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companyname_short_name_key" ON "companyname"("short_name");
