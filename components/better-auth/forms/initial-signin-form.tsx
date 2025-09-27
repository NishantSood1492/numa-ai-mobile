import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { Button } from "react-native";
import ContinueButton from "../continue-button";
import ErrorText from "../error-text";
import Form from "../form";
import FormDivider from "../form-divider";
import Input from "../input";
import TextButton from "../text-button";

// Safely import expo-router
let Router: any = { useRouter: () => ({ replace: () => {} }) };
try {
  Router = require("expo-router");
} catch (error) {
  console.warn("expo-router import failed:", error);
}

interface InitialSignInFormProps {
  signUpUrl?: string;
}

export function InitialSignInForm({
  signUpUrl = "/sign-up",
}: InitialSignInFormProps) {
  const router = Router.useRouter();
  const { data, isPending } = authClient.useSession();

  const [errorMessage, setErrorMessage] = useState("");
  const [erroredParams, setErroredParams] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onContinuePressed() {
    setErrorMessage("");

    try {
      await authClient.signIn.email({
        email,
        password,
      });
    } catch (err: any) {
      console.log("Error", err);
    }
  }

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/index",
    });
  };

  return (
    <Form title={`Welcome to Numa AI`} subtitle="Sign in to continue">
      <Button title="Login with Google" onPress={handleGoogleLogin} />
      <FormDivider />
      <Input
        label={"Email address"}
        autoCapitalize="none"
        value={email}
        onChangeText={(value) => setEmail(value)}
        placeholder={"Enter your email address"}
        paramName="email"
        textContentType="emailAddress"
        error={erroredParams.includes("email") ? errorMessage : undefined}
      />
      <Input
        label={"Password"}
        value={password}
        onChangeText={(value) => setPassword(value)}
        placeholder={"Enter your password"}
        paramName="password"
        secureTextEntry={true}
        error={erroredParams.includes("password") ? errorMessage : undefined}
      />
      <ErrorText message={errorMessage} />
      <ContinueButton
        onPress={onContinuePressed}
        disabled={!email || !password}
      />
      <TextButton
        onPress={() => router.replace(signUpUrl)}
        text="Don't have an account? Sign up"
      />
    </Form>
  );
}

export default InitialSignInForm;
