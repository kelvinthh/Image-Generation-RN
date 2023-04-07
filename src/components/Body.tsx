import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ListRenderItem,
} from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import imagesState from "../state/imageState";
import suggestionState from "../state/suggestionState";
import { ImageUrl } from "../types/imageUrl";
import { fetchImages, fetchSuggestion } from "../fetchData";
// import { fetchImage } from "../utils/fetchImage"; // Import fetchImage from the correct module

const Body = () => {
  const images = useRecoilValue(imagesState);
  const suggestion = useRecoilValue(suggestionState);

  const setImages = useSetRecoilState(imagesState);
  const setSuggestion = useSetRecoilState(suggestionState);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    console.log("Submit:", inputValue);
    setInputValue("");
  };

  const handleUseSuggestion = () => {
    setInputValue(suggestion);
  };

  const handleRefreshSuggestion = async () => {
    const newSuggestion = await fetchSuggestion();
    setSuggestion(newSuggestion ?? "");
  };

  const handleRefreshImage = async () => {
    const newImages = await fetchImages();
    setImages(newImages ?? []);
  };

  const renderItem: ListRenderItem<ImageUrl> = ({ item }) => {
    return (
      <View key={item.name}>
        <Image
          source={{ uri: item.url }}
          style={{ width: "100%", height: undefined, aspectRatio: 1 }}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <View className="flex-1">
      <View className="flex flex-col items-center justify-center mx-4 mb-2">
        <TextInput
          className="w-full h-15 bg-white border border-gray-300 rounded p-2"
          placeholder={suggestion}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        {inputValue && (
          <Text className="w-full my-2">How about💡...{suggestion}</Text>
        )}
        <TouchableOpacity
          className={`w-full h-10 bg-blue-500 rounded text-white text-center p-2 justify-center items-center ${
            !inputValue && "mt-2"
          }`}
          onPress={handleSubmit}
          disabled={!inputValue}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full h-10 bg-green-500 rounded text-white text-center p-2 my-1 justify-center items-center"
          onPress={handleRefreshSuggestion}
        >
          <Text>Gimme a new suggestion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full h-10 bg-yellow-500 rounded text-white text-center p-2 justify-center items-center"
          onPress={handleUseSuggestion}
        >
          <Text>Use suggestion</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col items-center justify-center mx-4">
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      </View>
      <TouchableOpacity
        className="absolute bottom-4 right-4 bg-green-500 rounded text-white text-center p-2 justify-center items-center"
        onPress={handleRefreshImage}
      >
        <Text>Refresh Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Body;
