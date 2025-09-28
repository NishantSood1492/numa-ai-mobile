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
  {
    id: 2,
    title: "Ocean Waves",
    image: require("@/assets/sessions/ocean-waves.avif"),
    screen: "Session2",
    description: "Relax with the rhythm of calming ocean waves",
    isPremium: true,
  },
  {
    id: 3,
    title: "Mountain Peak",
    image: require("@/assets/sessions/mountain-peak.avif"),
    screen: "Session3",
    description: "Find stillness and clarity at the top of a mountain",
    isPremium: false,
  },
  {
    id: 4,
    title: "Sunrise Meditation",
    image: require("@/assets/sessions/sunrise-meditation.avif"),
    screen: "Session4",
    description: "Start your day with gratitude and gentle focus",
    isPremium: true,
  },
  {
    id: 5,
    title: "Starry Night",
    image: require("@/assets/sessions/starry-night.avif"),
    screen: "Session5",
    description: "Unwind beneath a peaceful night sky full of stars",
    isPremium: false,
  },
];
