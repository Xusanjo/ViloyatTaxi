-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('INACTIVE', 'ACTIVE');

-- CreateEnum
CREATE TYPE "definitionLang" AS ENUM ('INGILIZ', 'RUS', 'UZBEK');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Definition" (
    "id" SERIAL NOT NULL,
    "emtySeatNumber" INTEGER NOT NULL,
    "type" "OrderEnum" NOT NULL,
    "lang" "definitionLang" NOT NULL,

    CONSTRAINT "Definition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverInfo" (
    "id" SERIAL NOT NULL,
    "amount" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "transferType" "definitionLang" NOT NULL,

    CONSTRAINT "DriverInfo_pkey" PRIMARY KEY ("id")
);
