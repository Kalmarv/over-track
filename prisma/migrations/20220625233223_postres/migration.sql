-- CreateEnum
CREATE TYPE "GameResult" AS ENUM ('WIN', 'LOSE', 'DRAW');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TANK', 'SUPPORT', 'DAMAGE');

-- CreateEnum
CREATE TYPE "MapType" AS ENUM ('Assault', 'Escort', 'Control', 'Hybrid');

-- CreateEnum
CREATE TYPE "Hero" AS ENUM ('ANA', 'ASHE', 'BAPTISTE', 'BASTION', 'BRIGITTE', 'CASSIDY', 'DVA', 'DOOMFIST', 'ECHO', 'GENJI', 'HANZO', 'JUNKRAT', 'LUCIO', 'MEI', 'MERCY', 'MOIRA', 'ORISA', 'PHARAH', 'REAPER', 'REINHARDT', 'ROADHOG', 'SIGMA', 'SOLDIER', 'SOMBRA', 'SYMMETRA', 'TORBJORN', 'TRACER', 'WIDOWMAKER', 'WINSTON', 'WRECKING_BALL', 'ZARYA', 'ZENYATTA');

-- CreateEnum
CREATE TYPE "Map" AS ENUM ('BLIZZARD_WORLD', 'BUSAN', 'DORADO', 'EICHENWALDE', 'HANAMURA', 'HAVANA', 'HOLLYWOOD', 'HORIZON_LUNAR_COLONY', 'ILLIOS', 'JUNKERTOWN', 'KINGS_ROW', 'LIJIANG_TOWER', 'NEPAL', 'NUMBANI', 'OASIS', 'PARIS', 'RIALTO', 'ROUTE_66', 'TEMPLE_OF_ANUBIS', 'VOLSKAYA', 'GIBRALTER');

-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "BattleAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BattleAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuickMatch" (
    "id" TEXT NOT NULL,
    "battleAccountId" TEXT,
    "result" "GameResult" NOT NULL,
    "role" "Role" NOT NULL,
    "hero" "Hero"[],
    "mapType" "MapType" NOT NULL,
    "map" "Map" NOT NULL,
    "playedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuickMatch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");
