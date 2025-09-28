import { sessions } from "@/utils/sessions";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import Button from "./Button";

const HEADER_HEIGHT = 400;

const ParallaxScrollView = ({ children }: PropsWithChildren) => {
  const todaySession = sessions[Math.floor(Math.random() * sessions.length)];
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const router = useRouter();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const translateY =
      scrollOffset.value <= 0
        ? interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0],
            [-HEADER_HEIGHT / 2, 0]
          )
        : 0;

    const scale =
      scrollOffset.value <= 0
        ? interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0], [2, 1])
        : 1;

    return {
      transform: [{ translateY }, { scale }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            { height: HEADER_HEIGHT, overflow: "hidden" },
            headerAnimatedStyle,
          ]}
        >
          <Image
            source={todaySession.image}
            style={{ width: "100%", height: HEADER_HEIGHT }}
          />
        </Animated.View>
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <View style={{ flex: 5 }} />
            <Text style={styles.headerSubtitle}>Featured Session</Text>
            <Text style={styles.headerTitle}>{todaySession.title}</Text>
            <Text style={styles.headerDescription}>
              {todaySession.description}
            </Text>
            <Button
              onPress={() =>
                router.navigate({
                  pathname: "/session",
                  params: { sessionId: todaySession.id },
                })
              }
            >
              Start Session
            </Button>
            <View style={{ flex: 1 }} />
          </View>
        </View>
        {children}
      </Animated.ScrollView>
    </View>
  );
};

export default ParallaxScrollView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "white",
    opacity: 0.5,
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 48,
    color: "white",
    fontWeight: "bold",
  },
  headerDescription: {
    fontSize: 16,
    color: "white",
  },
  headerContainer: {
    position: "absolute",
    width: "100%",
    height: HEADER_HEIGHT,
    experimental_backgroundImage:
      "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))",
  },
  headerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
