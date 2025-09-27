import { authClient } from "@/lib/auth-client";
import { Stack } from "expo-router";

function RootLayoutWithAuth() {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }
  return (
    <Stack>
      <Stack.Protected guard={!isPending && data !== null}>
        <Stack.Screen name="(protected)" />
      </Stack.Protected>
      <Stack.Protected guard={isPending || data == null}>
        <Stack.Screen name="(public)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return <RootLayoutWithAuth />;
}
