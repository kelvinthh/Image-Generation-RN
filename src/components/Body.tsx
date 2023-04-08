import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  KeyboardAvoidingView,
  Keyboard,
  RefreshControl,
} from "react-native";
import { useRecoilState } from "recoil";
import imagesState from "../state/imageState";
import suggestionState from "../state/suggestionState";
import { ImageUrl } from "../types/imageUrl";
import { fetchImages, fetchSuggestion, generateImage } from "../fetchData";
import ImageItem from "../components/ImageItem";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Body = () => {
  const [images, setImages] = useRecoilState(imagesState);
  const [suggestion, setSuggestion] = useRecoilState(suggestionState);

  const [inputValue, setInputValue] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Reference for the FlatList
  const flatListRef = useRef<FlatList<ImageUrl>>(null);

  const handleSubmit = async (prompt: string) => {
    console.log("Submitting prompt: ", prompt);
    Toast.show({
      type: "info",
      text1: "Generating...",
      text2: `DALL‧E is creating ${prompt.slice(0, 20)}...`,
      position: "bottom",
    });
    setInputValue("");
    Keyboard.dismiss(); // Dismiss the keyboard

    try {
      const res = await generateImage(prompt);
      if (!res) {
        console.log("Error generating image.");
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Error generating image",
          position: "bottom",
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Success!",
          text2: "Your image has been generated!",
          position: "bottom",
        });
        await handleRefreshImage();

        // Scroll the FlatList to the top
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });

        console.log("Image generated!");
      }
    } catch (error) {
      console.error("Error occurred while generating image:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2:
          "An error occurred while generating the image. Please try again later.",
        position: "bottom",
      });
    }
  };

  const handleUseSuggestion = () => {
    setInputValue(suggestion);
  };

  // This handle the FlatList swipe up to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await handleRefreshImage();
    setRefreshing(false);
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
      <KeyboardAvoidingView className="flex flex-col items-center justify-center mx-4 px-2 py-2 mb-2 rounded-lg border-gray-200 border shadow-inner">
        <View className="w-full flex flex-row">
          <TextInput
            className="flex-1 h-15 bg-white border border-gray-300 rounded-lg p-2"
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
          ref={flatListRef}
          data={images}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          contentContainerStyle={{ paddingBottom: 180 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

export default Body;
