/*
  Warnings:

  - A unique constraint covering the columns `[emailToken]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" 
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "emailToken" TEXT,
ADD COLUMN     "emailTokenExpiry" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "users_emailToken_key" ON "users"("emailToken");
