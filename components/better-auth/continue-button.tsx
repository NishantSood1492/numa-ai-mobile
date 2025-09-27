import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import Button from "./button";

interface Props extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
}

function ContinueButton({ style, ...props }: Props) {
  return (
    <Button {...props} variant="secondary">
      <Text style={styles.text}>Continue</Text>
      <Ionicons name="caret-forward-outline" size={18} style={styles.icon} />
    </Button>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#fbfaff",
  },
  icon: {
    color: "#c5bbfc",
  },
});

export default ContinueButton;
