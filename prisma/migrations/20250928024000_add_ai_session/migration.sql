-- CreateTable
CREATE TABLE "numa_ai"."AISession" (
    "userId" TEXT NOT NULL,
    "status" TEXT DEFAULT 'in-progress',
    "conversationId" TEXT NOT NULL,
    "tokens" INTEGER DEFAULT 0,
    "callDurationSecs" INTEGER DEFAULT 0,
    "transcript" TEXT,
    "callSummaryTitle" TEXT,

    CONSTRAINT "AISession_pkey" PRIMARY KEY ("userId")
);
