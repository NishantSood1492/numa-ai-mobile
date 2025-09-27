import { ImageSourcePropType } from "react-native";

interface Session {
  id: number;
  title: string;
  image: ImageSourcePropType | undefined;
  screen: string;
  description: string;
  isPremium: boolean;
}

export const sessions: Session[] = [
  {
    id: 1,
    title: "Forest Path",
    image: require("@/assets/sessions/forest-path.avif"),
    screen: "Session1",
    description: "Mindful walking through a forest path",
    isPremium: false,
  },
];
