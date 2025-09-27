import { ConversationResponse } from "@/utils/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get("conversationId");

  if (!conversationId) {
    return new Response("Missing conversationId", { status: 400 });
  }

  if (!process.env.ELEVENLABS_API_KEY) {
    return new Response("Missing ElevenLabs API key", { status: 500 });
  }

  const response = await fetch(
    `${process.env.ELEVENLABS_BASE_URL}/v1/convai/conversations/${conversationId}`,
    {
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  const conversation: ConversationResponse = await response.json();
  return new Response(JSON.stringify(conversation), { status: 200 });
}
