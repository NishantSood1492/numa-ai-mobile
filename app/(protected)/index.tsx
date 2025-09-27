import SignOutButton from "@/components/better-auth/sign-out-button";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home Screen</Text>
      <SignOutButton />
    </View>
  );
}
