import { Linking } from "react-native";

export default function openURL(url: string) {
  Linking.openURL(url);
}
