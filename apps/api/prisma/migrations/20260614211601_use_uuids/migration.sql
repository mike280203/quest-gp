/*
  Warnings:

  - The primary key for the `BucketListItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `eventId` column on the `BucketListItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `trackId` column on the `BucketListItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Driver` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Series` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Track` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `authUserId` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `UserSeries` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `VisitedEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `BucketListItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `BucketListItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Driver` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `seriesId` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `trackId` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Series` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Team` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Track` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `UserSeries` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `UserSeries` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `seriesId` on the `UserSeries` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `VisitedEvent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `VisitedEvent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `eventId` on the `VisitedEvent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "BucketListItem" DROP CONSTRAINT "BucketListItem_eventId_fkey";

-- DropForeignKey
ALTER TABLE "BucketListItem" DROP CONSTRAINT "BucketListItem_trackId_fkey";

-- DropForeignKey
ALTER TABLE "BucketListItem" DROP CONSTRAINT "BucketListItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_seriesId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_trackId_fkey";

-- DropForeignKey
ALTER TABLE "UserSeries" DROP CONSTRAINT "UserSeries_seriesId_fkey";

-- DropForeignKey
ALTER TABLE "UserSeries" DROP CONSTRAINT "UserSeries_userId_fkey";

-- DropForeignKey
ALTER TABLE "VisitedEvent" DROP CONSTRAINT "VisitedEvent_eventId_fkey";

-- DropForeignKey
ALTER TABLE "VisitedEvent" DROP CONSTRAINT "VisitedEvent_userId_fkey";

-- AlterTable
ALTER TABLE "BucketListItem" DROP CONSTRAINT "BucketListItem_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
DROP COLUMN "eventId",
ADD COLUMN     "eventId" UUID,
DROP COLUMN "trackId",
ADD COLUMN     "trackId" UUID,
ADD CONSTRAINT "BucketListItem_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Driver_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "seriesId",
ADD COLUMN     "seriesId" UUID NOT NULL,
DROP COLUMN "trackId",
ADD COLUMN     "trackId" UUID NOT NULL,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Series" DROP CONSTRAINT "Series_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Series_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Track" DROP CONSTRAINT "Track_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Track_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "authUserId",
ADD COLUMN     "authUserId" UUID,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserSeries" DROP CONSTRAINT "UserSeries_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
DROP COLUMN "seriesId",
ADD COLUMN     "seriesId" UUID NOT NULL,
ADD CONSTRAINT "UserSeries_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "VisitedEvent" DROP CONSTRAINT "VisitedEvent_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
DROP COLUMN "eventId",
ADD COLUMN     "eventId" UUID NOT NULL,
ADD CONSTRAINT "VisitedEvent_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "BucketListItem_userId_idx" ON "BucketListItem"("userId");

-- CreateIndex
CREATE INDEX "BucketListItem_eventId_idx" ON "BucketListItem"("eventId");

-- CreateIndex
CREATE INDEX "BucketListItem_trackId_idx" ON "BucketListItem"("trackId");

-- CreateIndex
CREATE INDEX "Event_seriesId_idx" ON "Event"("seriesId");

-- CreateIndex
CREATE INDEX "Event_trackId_idx" ON "Event"("trackId");

-- CreateIndex
CREATE UNIQUE INDEX "User_authUserId_key" ON "User"("authUserId");

-- CreateIndex
CREATE INDEX "UserSeries_seriesId_idx" ON "UserSeries"("seriesId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSeries_userId_seriesId_key" ON "UserSeries"("userId", "seriesId");

-- CreateIndex
CREATE INDEX "VisitedEvent_eventId_idx" ON "VisitedEvent"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "VisitedEvent_userId_eventId_key" ON "VisitedEvent"("userId", "eventId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeries" ADD CONSTRAINT "UserSeries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeries" ADD CONSTRAINT "UserSeries_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BucketListItem" ADD CONSTRAINT "BucketListItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BucketListItem" ADD CONSTRAINT "BucketListItem_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BucketListItem" ADD CONSTRAINT "BucketListItem_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitedEvent" ADD CONSTRAINT "VisitedEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitedEvent" ADD CONSTRAINT "VisitedEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
