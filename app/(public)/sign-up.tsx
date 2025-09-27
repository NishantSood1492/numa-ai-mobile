import InitialSignUpForm from "@/components/better-auth/forms/initial-signup-form";
import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";

enum FormState {
  SignIn,
  VerifyEmailCode,
}

interface Props {
  scheme?: string;
  signInUrl?: string;
  homeUrl?: string;
}

export function SignUp({
  scheme = "numaai://",
  signInUrl = "/",
  homeUrl = "/",
}: Props) {
  const { isPending } = authClient.useSession();
  const [formState, setFormState] = useState<FormState>(FormState.SignIn);
  const [emailAddress, setEmailAddress] = useState("");

  if (isPending) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  switch (formState) {
    case FormState.SignIn:
      return (
        <InitialSignUpForm
          onContinue={(emailAddress: string) => {
            setEmailAddress(emailAddress);
            setFormState(FormState.VerifyEmailCode);
          }}
          scheme={scheme}
          signInUrl={signInUrl}
        />
      );
    case FormState.VerifyEmailCode:
      return null;
    default:
      return null;
  }
}

export default SignUp;
