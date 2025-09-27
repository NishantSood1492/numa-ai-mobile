import { ConversationResponse } from "@/utils/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../Button";
import Gradient from "../gradient";

const SummaryScreen = () => {
  const router = useRouter();
  const { conversationId } = useLocalSearchParams();
  const [conversation, setConversation] = useState<ConversationResponse | null>(
    null
  );

  useEffect(() => {
    getSummary();
  }, []);
  const getSummary = async () => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/conversations?conversationId=${conversationId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data: ConversationResponse = await response.json();
    setConversation(data);
  };

  return (
    <>
      <Gradient isSpeaking={false} position="bottom" />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        {conversation?.status !== "done" && (
          <View>
            <Text style={styles.title}>We are processing your call...</Text>
            <Text style={styles.subtitle}>This may take few minutes...</Text>
            <Text style={styles.subtitle}>
              Current Status: {conversation?.status}
            </Text>
            <Button onPress={getSummary}>Refresh</Button>
          </View>
        )}
        {conversation?.status === "done" && (
          <View style={{ gap: 16, paddingBottom: 16 }}>
            <Text style={styles.caption}>{conversationId}</Text>
            <Text style={styles.title}>
              {conversation?.analysis?.call_summary_title}
            </Text>
            <Text style={styles.subtitle}>
              {conversation?.analysis?.transcript_summary.trim()}
            </Text>
            <Text style={styles.title}>Stats</Text>
            <Text style={styles.subtitle}>
              {conversation?.metadata?.call_duration_secs} seconds
            </Text>
            <Text style={styles.subtitle}>
              {conversation?.metadata?.cost} tokens
            </Text>
            <Text style={styles.subtitle}>
              {new Date(
                conversation?.metadata?.start_time_unix_secs! * 1000
              ).toLocaleString()}
            </Text>
            <Text style={styles.title}> Transcript </Text>
            <Text style={styles.subtitle}>
              {conversation?.transcript.map((t) => t.message).join("\n")}
            </Text>
          </View>
        )}
        <View>
          <Button onPress={() => router.dismissAll()}>Save and continue</Button>
        </View>
      </ScrollView>
    </>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
  },
  caption: {
    fontSize: 14,
    color: "#757575",
  },
});
