import React, { useState } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import { ImageUrl } from "../types/imageUrl";

interface ImageItemProps {
  item: ImageUrl;
}

const ImageItem: React.FC<ImageItemProps> = ({ item }) => {
  const [loading, setLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleLongPress = () => {
    setShowOverlay(!showOverlay);
  };

  const hasNonAsciiCharacters = (str: string): boolean => {
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 127) {
        return true;
      }
    }
    return false;
  };

  const spacelessUrl = item.url.replace(/ /g, "%20");
  const lastSvIndex = spacelessUrl.lastIndexOf("?sv=");

  let imageFileName = spacelessUrl.substring(0, lastSvIndex);
  if (hasNonAsciiCharacters(imageFileName))
    imageFileName = encodeURI(imageFileName);

  const sasToken = spacelessUrl.substring(lastSvIndex);
  const formattedUrl = imageFileName + sasToken;
  // console.log(formattedUrl);

  return (
    <View key={item.name} className="py-1">
      <TouchableOpacity
        onPressIn={handleLongPress}
        onPressOut={handleLongPress}
        activeOpacity={1}
        style={{
          width: "100%",
          height: undefined,
          aspectRatio: 1,
        }}
      >
        {loading && (
          <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center p-4 bg-gray-200 rounded-lg">
            <ActivityIndicator size="large" color="#000000" />
            <Text className="font-light pt-1">Loading...</Text>
          </View>
        )}
        <Image
          source={{ uri: formattedUrl }}
          style={{ flex: 1, width: "100%" }}
          resizeMode="cover"
          onLoad={() => setLoading(false)}
          className="rounded-lg drop-shadow-2xl"
        />
        {!loading && showOverlay && (
          <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center p-4">
            <View className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-70" />
            <Text className="text-lg font-light italic text-center">
              {item.name.split("_")[0].trim()}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(ImageItem);
