import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import ContinueButton from "../continue-button";
import ErrorText from "../error-text";
import Form from "../form";
import Input from "../input";
import TextButton from "../text-button";

// Safely import expo-router
let Router: any = { useRouter: () => ({ replace: () => {} }) };
try {
  Router = require("expo-router");
} catch (error) {
  console.warn("expo-router import failed:", error);
}

interface Props {
  onContinue: (emailAddress: string) => void;
  scheme?: string;
  signInUrl?: string;
}

function InitialSignUpForm({
  onContinue,
  scheme = "numaai://",
  signInUrl = "/(auth)",
}: Props) {
  const router = Router.useRouter();
  const { data, isPending } = authClient.useSession();
  const [errorMessage, setErrorMessage] = useState("");
  const [erroredParams, setErroredParams] = useState<string[]>([]);

  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  async function onContinuePressed() {
    if (!isPending || !data) {
      return;
    }

    try {
      await authClient.signUp.email({
        email: emailAddress,
        password,
        name: emailAddress,
      });
      onContinue(emailAddress);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setErrorMessage(err.errors[0].message);
      setErroredParams(err.errors.map((error: any) => error.meta.paramName));
    }
  }

  return (
    <Form
      title={`Create Your Account`}
      subtitle="Welcome! Please fill in the details to get started."
    >
      <Input
        label="Name"
        value={name}
        onChangeText={(name: string) => setName(name)}
        placeholder="Enter your Name"
        paramName="name"
        error={erroredParams.includes("name") ? errorMessage : undefined}
      />
      <Input
        label="Email address"
        autoCapitalize="none"
        value={emailAddress}
        onChangeText={(email: string) => setEmailAddress(email)}
        placeholder="Enter your email"
        paramName="email_address"
        textContentType="emailAddress"
        error={
          erroredParams.includes("email_address") ? errorMessage : undefined
        }
      />
      <Input
        label="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(password: string) => setPassword(password)}
        placeholder="Create a password"
        paramName="password"
        error={erroredParams.includes("password") ? errorMessage : undefined}
      />
      <ErrorText message={errorMessage} />
      <ContinueButton
        onPress={onContinuePressed}
        disabled={!emailAddress || !password}
      />
      <TextButton
        onPress={() => router.replace(signInUrl)}
        text="Already have an account? Sign in"
      />
    </Form>
  );
}

export default InitialSignUpForm;
