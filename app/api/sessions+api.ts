import { AISession } from "@/generated/prisma";
import db from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  if (!searchParams.get("userId")) {
    return new Response("Missing userId", { status: 400 });
  }

  if (db === null) {
    return new Response("Prisma client is null", { status: 500 });
  }

  try {
    const response: AISession[] = await db.aISession.findMany({
      where: {
        userId: searchParams.get("userId")!,
      },
    });

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log("Error fetching sessions:", error);
    return new Response("Error fetching sessions", { status: 500 });
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);

  const body = await request.json();

  if (!searchParams.get("conversationId")) {
    return new Response("Missing conversationId", { status: 400 });
  }

  const response = await db.aISession.create({
    data: {
      conversationId: searchParams.get("conversationId")!,
      userId: body.userId,
      tokens: body.tokens,
      callDurationSecs: body.callDurationSecs,
      transcript: body.transcript,
      callSummaryTitle: body.callSummaryTitle,
    },
  });

  console.log("Response", response);

  return new Response(JSON.stringify(response), { status: 200 });
}
