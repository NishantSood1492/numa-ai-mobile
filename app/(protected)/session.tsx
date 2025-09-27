import SessionScreen from "@/components/screens/SessionScreen";
import { authClient } from "@/lib/auth-client";
import { Button } from "react-native";

export default function Session() {
  return (
    <>
      <SessionScreen />
      <Button title="Sign out" onPress={() => authClient.signOut()} />
    </>
  );
}
