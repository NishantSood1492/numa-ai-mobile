import InitialSignInForm from "@/components/better-auth/forms/initial-signin-form";
import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";

// Safely import expo-router
let Router: any = { useRouter: () => ({ replace: () => {} }) };
try {
  Router = require("expo-router");
} catch (error) {
  console.warn("expo-router import failed:", error);
}

enum FormState {
  SignIn,
  VerifyFirstFactor,
  AlternateFirstFactor,
  SecondFactor,
  ForgotPassword,
  NewPasswordNeeded,
  Done,
}

interface SignInProps {
  scheme?: string;
  signUpUrl?: string;
  homeUrl?: string;
}

export function SignIn({
  scheme = "numaai://",
  signUpUrl = "/sign-up",
  homeUrl = "/",
}: SignInProps) {
  const { isPending, data } = authClient.useSession();
  const [formState, setFormState] = useState<FormState>(FormState.SignIn);

  if (!isPending && data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  switch (formState) {
    case FormState.SignIn:
      return <InitialSignInForm signUpUrl={signUpUrl} />;

    default:
      return null;
  }
}

export default SignIn;
