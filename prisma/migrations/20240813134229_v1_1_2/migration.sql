-- DropForeignKey
ALTER TABLE "OrderTaxi" DROP CONSTRAINT "OrderTaxi_driverId_fkey";

-- DropForeignKey
ALTER TABLE "Otp" DROP CONSTRAINT "Otp_userId_fkey";

-- DropForeignKey
ALTER TABLE "Refresh" DROP CONSTRAINT "Refresh_userId_fkey";

-- AlterTable
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "OrderTaxi" ADD CONSTRAINT "OrderTaxi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderTaxi" ADD CONSTRAINT "OrderTaxi_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refresh" ADD CONSTRAINT "Refresh_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
