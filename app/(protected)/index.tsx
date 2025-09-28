import SignOutButton from "@/components/better-auth/sign-out-button";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { AISession } from "@/generated/prisma";
import { authClient } from "@/lib/auth-client";
import { colors } from "@/utils/colors";
import { sessions } from "@/utils/sessions";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { data: userSession } = authClient.useSession();
  const [sessionHistory, setSessionHistory] = useState<AISession[]>([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    if (!userSession?.user) {
      alert("No user found");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/sessions/?userId=${userSession.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data: AISession[] = await response.json();
      setSessionHistory(data as unknown as AISession[]);
    } catch (error) {
      console.log("Error fetching sessions:", error);
    }
  };

  return (
    <ParallaxScrollView>
      <Text style={styles.title}>Explore Sessions</Text>
      <ScrollView
        contentContainerStyle={{ paddingLeft: 16, gap: 6 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        {sessions.map((session) => (
          <Pressable
            key={session.id}
            style={styles.sessionContainer}
            onPress={() =>
              router.navigate({
                pathname: "/session",
                params: { sessionId: session.id },
              })
            }
          >
            <Image
              source={session.image}
              style={styles.sessionImage}
              contentFit="cover"
              transition={1000}
            />
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                experimental_backgroundImage:
                  "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))",
                borderRadius: 16,
              }}
            />
            <Text style={styles.sessionTitle}>{session.title}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <View
        style={{
          flexGrow: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
        }}
      >
        <Text style={styles.title}>Recents</Text>
        <Pressable onPress={fetchSessions}>
          <Ionicons
            name="refresh-circle-sharp"
            size={24}
            color={colors.primary}
          />
        </Pressable>
      </View>
      <View style={{ gap: 16 }}>
        {sessionHistory.length > 0 ? (
          sessionHistory.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))
        ) : (
          <Text style={{ fontSize: 16, textAlign: "center" }}>
            No recent sessions
          </Text>
        )}
      </View>

      <Text style={styles.title}>Account</Text>
      <View
        style={{
          borderRadius: 16,
          padding: 16,
          marginHorizontal: 16,
          backgroundColor: "white",
          gap: 8,
          marginBottom: 100,
        }}
      >
        {userSession?.user?.image && (
          <Image
            source={userSession?.user?.image}
            style={{ width: 50, height: 50, borderRadius: 100 }}
          />
        )}
        <Text style={{ fontSize: 16 }}>{userSession?.user?.name}</Text>
        <Text style={{ fontSize: 16 }}>{userSession?.user?.email}</Text>
        <SignOutButton />
      </View>
    </ParallaxScrollView>
  );
}

const SessionCard = ({ session }: { session: AISession }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const randomEmoji = useMemo(() => {
    return ["🚗", "🏝️", "☀️", "🌙", "⛈️"][Math.floor(Math.random() * 10)];
  }, []);

  return (
    <View
      style={{
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 16,
        backgroundColor: "white",
        gap: 8,
      }}
    >
      {randomEmoji && <Text style={{ fontSize: 24 }}>{randomEmoji}</Text>}
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {session.callSummaryTitle}
      </Text>
      {isExpanded ? (
        <>
          <Text style={{ fontSize: 16 }}>{session.transcript}</Text>
          <Pressable onPress={() => setIsExpanded(false)}>
            <Text style={{ fontSize: 16, color: colors.primary }}>
              Read less
            </Text>
          </Pressable>
        </>
      ) : (
        <Pressable onPress={() => setIsExpanded(true)}>
          <Text style={{ fontSize: 16, color: colors.primary }}>Read more</Text>
        </Pressable>
      )}
      <Text style={{ fontSize: 16 }}>
        {session.callDurationSecs} seconds, {session.tokens} tokens
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
  },
  sessionContainer: {
    position: "relative",
  },
  sessionImage: {
    width: 250,
    height: 140,
    borderRadius: 16,
    overflow: "hidden",
  },
  sessionTitle: {
    position: "absolute",
    width: "100%",
    bottom: 16,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});
