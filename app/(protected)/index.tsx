import ParallaxScrollView from "@/components/ParallaxScrollView";
import { sessions } from "@/utils/sessions";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <ParallaxScrollView>
      <Text style={styles.title}>Explore Sessions</Text>
      <ScrollView
        contentContainerStyle={{ paddingLeft: 16, gap: 6 }}
        horizontal
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
    </ParallaxScrollView>
  );
}

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
