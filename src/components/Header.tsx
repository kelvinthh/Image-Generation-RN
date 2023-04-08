import React from "react";
import { View, Text, Linking, TouchableOpacity, Image } from "react-native";

const Header = () => {
  const openURL = (url: string) => {
    Linking.openURL(url);
  };

  const gitHubIcon = require("../images/25231.png");

  return (
    <View className="flex-row justify-between items-center px-4 py-2">
      <View>
        <Text className="text-xl font-bold">Image Generator by Kelvin Tam</Text>
        <Text className="text-gray-500">Powered by OpenAI & Azure</Text>
      </View>
      <TouchableOpacity onPress={() => openURL("https://github.com/kelvinthh/Image-Generation-RN")}>
        <Image source={gitHubIcon} style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
