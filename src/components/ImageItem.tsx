import React, { useState } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { ImageUrl } from "../types/imageUrl";

interface ImageItemProps {
  item: ImageUrl;
}

const ImageItem: React.FC<ImageItemProps> = ({ item }) => {
  const [loading, setLoading] = useState(true);

  return (
    <View key={item.name}>
      {loading && (
        <View className="w-full aspect-square justify-center items-center">
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )}
      <Image
        source={{ uri: item.url }}
        style={{
          width: "100%",
          height: undefined,
          aspectRatio: 1,
          opacity: loading ? 0 : 1,
        }}
        resizeMode="cover"
        onLoad={() => setLoading(false)}
      />
    </View>
  );
};

export default ImageItem;
