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

  return (
    <View key={item.name}>
      {loading && (
        <View className="w-full aspect-square justify-center items-center">
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )}
      <TouchableOpacity
        onPressIn={handleLongPress}
        onPressOut={handleLongPress}
        activeOpacity={1}
        style={{
          width: "100%",
          height: undefined,
          aspectRatio: 1,
          opacity: loading ? 0 : 1,
        }}
      >
        <Image
          source={{ uri: item.url }}
          style={{ flex: 1 }}
          resizeMode="cover"
          onLoad={() => setLoading(false)}
        />
        {showOverlay && (
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-70 justify-center items-center p-4">
            <Text className='text-center font-light'>{item.name.split('_')[0].trim()}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ImageItem;
