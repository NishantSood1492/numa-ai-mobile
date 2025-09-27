import { authClient } from "@/lib/auth-client";
import { sessions } from "@/utils/sessions";
import { useConversation } from "@elevenlabs/react-native";
// import * as Brightness from "expo-brightness";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import Button from "../Button";
import Gradient from "../gradient";

const SessionScreen = () => {
  const { data } = authClient.useSession();
  const router = useRouter();
  const { sessionId } = useLocalSearchParams();
  const session =
    sessions.find((s) => s.id === Number(sessionId)) ?? sessions[0];

  const [isStarting, setIsStarting] = useState<boolean>(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const conversation = useConversation({
    onConnect: ({ conversationId }) => {
      setConversationId(conversationId);
    },
    onDisconnect: () => console.log("Disconnected from conversation"),
    onMessage: (message) => console.log("Received message:", message),
    onError: (error) => console.error("Conversation error:", error),
    onModeChange: (mode) => console.log("Conversation mode changed:", mode),
    onStatusChange: (prop) =>
      console.log("Conversation status changed:", prop.status),
    onCanSendFeedbackChange: (prop) =>
      console.log("Can send feedback changed:", prop.canSendFeedback),
    onUnhandledClientToolCall: (params) =>
      console.log("Unhandled client tool call:", params),

    clientTools: {
      //   handleSetBrightness: async (params) => {
      //     const { brightnessValue } = params as { brightnessValue: number };
      //     console.log("Received brightness value:", brightnessValue);
      //     const { status } = await Brightness.requestPermissionsAsync();
      //     if (status === "granted") {
      //       await Brightness.setSystemBrightnessAsync(brightnessValue);
      //       return brightnessValue;
      //     }
      //   },
    },
  });

  const startConversation = async () => {
    if (isStarting) return;
    try {
      setIsStarting(true);
      await conversation.startSession({
        agentId: process.env.EXPO_PUBLIC_AGENT_ID,
        dynamicVariables: {
          user_name: data?.user.name ?? "John Doe",
          session_title: session.title,
          session_description: session.description,
        },
      });
    } catch (error) {
      console.error("Error starting conversation:", error);
    } finally {
      setIsStarting(false);
    }
  };

  const endConversation = async () => {
    try {
      await conversation.endSession();
      router.push({
        pathname: "/summary",
        params: { conversationId },
      });
    } catch (error) {
      console.error("Error ending conversation:", error);
    }
  };

  const canStart = conversation.status === "disconnected" && !isStarting;
  const canEnd = conversation.status === "connected";

  return (
    <>
      <Gradient
        isSpeaking={
          conversation.status === "connected" ||
          conversation.status === "connecting"
        }
        position="top"
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <Text>SessionScreen</Text>
        <Text style={{ fontWeight: "bold", fontSize: 32 }}>
          {session.title}
        </Text>
        <Text style={{ fontWeight: 500, fontSize: 16, opacity: 0.5 }}>
          {session.description}
        </Text>
        <Button
          onPress={canStart ? startConversation : endConversation}
          disabled={!canStart && !canEnd}
        >
          {canStart ? "Start Conversation" : "End Conversation"}
        </Button>
      </View>
    </>
  );
};

export default SessionScreen;
