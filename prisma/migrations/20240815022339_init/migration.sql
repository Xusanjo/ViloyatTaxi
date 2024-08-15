-- CreateTable
CREATE TABLE "Addres" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "long" BIGINT NOT NULL,
    "lat" BIGINT NOT NULL,

    CONSTRAINT "Addres_pkey" PRIMARY KEY ("id")
);
