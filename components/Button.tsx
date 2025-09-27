import { colors } from "@/utils/colors";
import React, { useState } from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

const Button = ({ children, ...props }: PressableProps) => {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <Pressable
      style={[styles.button, isPressed && styles.buttonPressed]}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      {...props}
    >
      {typeof children === "string" ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    backgroundColor: colors.blue,
    opacity: 0.9,
  },
  text: {
    color: "white",
  },
});
