import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  KeyboardAvoidingView,
} from "react-native";
import { useRecoilState } from "recoil";
import imagesState from "../state/imageState";
import suggestionState from "../state/suggestionState";
import { ImageUrl } from "../types/imageUrl";
import { fetchImages, fetchSuggestion, generateImage } from "../fetchData";
import ImageItem from "../components/ImageItem";

const Body = () => {
  const [images, setImages] = useRecoilState(imagesState);
  const [suggestion, setSuggestion] = useRecoilState(suggestionState);

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (prompt: string) => {
    console.log("Submitting prompt: ", prompt);
    setInputValue("");
    const res = await generateImage(prompt);
    // !res ? console.log("Error generating image!") : handleRefreshImage();
    if (!res) {
      console.log("Error generating image.");
    } else {
      handleRefreshImage();
      console.log("Image generated!");
    }
  };

  const handleUseSuggestion = () => {
    setInputValue(suggestion);
  };

  const handleRefreshSuggestion = async () => {
    setSuggestion("Loading new suggestion...");
    const newSuggestion = await fetchSuggestion();
    setSuggestion(newSuggestion ?? "");
  };

  const handleRefreshImage = async () => {
    const newImages = await fetchImages();
    setImages(newImages ?? []);
  };

  const renderItem: ListRenderItem<ImageUrl> = ({ item }) => {
    return <ImageItem item={item} />;
  };

  return (
    <View className="flex-1">
      <KeyboardAvoidingView className="flex flex-col items-center justify-center mx-4 mb-2">
        <View className="w-full flex flex-row">
          <TextInput
            className="flex-1 h-15 bg-white border border-gray-300 rounded p-2"
            placeholder={suggestion}
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <View className="w-2" />
          <TouchableOpacity
            className={`h-15 rounded text-center px-3 py-2 justify-center items-center ${
              !inputValue ? " bg-blue-200" : "bg-blue-500"
            }`}
            onPress={() => handleSubmit(inputValue)}
            disabled={!inputValue}
          >
            <Text className="text-white font-bold">Submit</Text>
          </TouchableOpacity>
        </View>
        {inputValue && (
          <Text className="w-full my-1">
            Suggestion💡
            <Text className="font-light italic">{suggestion}</Text>
          </Text>
        )}
        <TouchableOpacity
          className="w-full h-10 bg-green-500 rounded text-center p-2 my-1 justify-center items-center"
          onPress={handleRefreshSuggestion}
        >
          <Text className="text-white">Gimme a new suggestion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full h-10 bg-yellow-600 rounded text-center p-2 justify-center items-center"
          onPress={handleUseSuggestion}
        >
          <Text className="text-white">Use suggestion</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View className="flex flex-col items-center justify-center mx-4">
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          contentContainerStyle={{ paddingBottom: 180 }}
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
