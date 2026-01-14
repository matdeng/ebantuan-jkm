-- CreateTable
CREATE TABLE "zz_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parent_id" TEXT,
    "color" TEXT,
    "old_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zz_statuses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zz_statuses" ADD CONSTRAINT "zz_statuses_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "zz_statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
