import { Stack } from "expo-router";

const ProtectedLayout = () => {
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default ProtectedLayout;
