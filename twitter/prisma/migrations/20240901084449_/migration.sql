/*
  Warnings:

  - You are about to drop the column `provider_id` on the `accounts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider,provider_account_id]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "providerId";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "provider_id";

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");
