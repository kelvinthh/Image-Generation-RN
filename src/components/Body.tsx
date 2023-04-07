import React from "react";
import { View, Text } from "react-native";
import { useRecoilValue } from "recoil";
import imagesState from "../state/imageState";
import suggestionState from "../state/suggestionState";

const Body = () => {
  const images = useRecoilValue(imagesState);
  const suggestion = useRecoilValue(suggestionState);

  return (
    <View>
      <Text>Suggestion: {suggestion}</Text>
      {images.map((image) => {
        console.log(image.name);
        return (
          <View key={image.name}>
            <Text>{image.name.split("_")[0].trim()}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Body;
