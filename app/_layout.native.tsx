import { authClient } from "@/lib/auth-client";
import { ElevenLabsProvider } from "@elevenlabs/react-native";
import { Stack } from "expo-router";

function RootLayoutWithAuth() {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }
  return (
    <ElevenLabsProvider>
      <Stack>
        <Stack.Protected guard={!isPending && data !== null}>
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={isPending || data == null}>
          <Stack.Screen name="(public)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </ElevenLabsProvider>
  );
}

export default function RootLayout() {
  return <RootLayoutWithAuth />;
}
