-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_ownerID_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "hashedPassword" TEXT;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
