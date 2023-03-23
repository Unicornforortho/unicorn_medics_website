-- CreateEnum
CREATE TYPE "SpecialityEnum" AS ENUM ('HIP', 'KNEE', 'SHOULDER', 'ELBOW', 'FOOT_AND_ANKLE', 'WRIST', 'FINGER_JOINTS', 'UPPER_LIMB', 'LOWER_LIMB');

-- CreateTable
CREATE TABLE "Customers" (
    "customerId" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "speciality" "SpecialityEnum" NOT NULL,
    "phone" TEXT,
    "institution" TEXT,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "CustomerActivity" (
    "activityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uploadedImageURL" TEXT NOT NULL,
    "predictionMade" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "CustomerActivity_pkey" PRIMARY KEY ("activityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customers_email_key" ON "Customers"("email");

-- AddForeignKey
ALTER TABLE "CustomerActivity" ADD CONSTRAINT "CustomerActivity_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customers"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;
