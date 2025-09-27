import { authClient } from "@/lib/auth-client";
import Button from "./button";

interface Props {
  redirectUrl?: string;
}

export function SignOutButton({ redirectUrl = "/" }: Props) {
  async function onSignOutPress() {
    try {
      await authClient.signOut({
        // @ts-ignore - redirectUrl is supported but not in the type definitions
        redirectUrl,
      });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }

  return <Button onPress={onSignOutPress}>Sign out</Button>;
}

export default SignOutButton;
