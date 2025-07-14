-- AlterTable
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("sessionToken");

-- DropIndex
DROP INDEX "sessions_sessionToken_key";
