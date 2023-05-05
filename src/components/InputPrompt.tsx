import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import suggestionState from "../state/suggestionState";
import internetState from "../state/internetState";
import Toast from "react-native-toast-message";
import { fetchImages, fetchSuggestion, generateImage } from "../fetchData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import imagesState from "../state/imageState";
import { ImageUrl } from '../types/imageUrl';

interface InputPromptProps {
    flatListRef: React.RefObject<FlatList<ImageUrl>>,
    isFirstRender: React.MutableRefObject<boolean>
}

const InputPrompt: React.FC<InputPromptProps> = ({
    flatListRef,
    isFirstRender,
  })=> {
  const setImages = useSetRecoilState(imagesState);
  const [suggestion, setSuggestion] = useRecoilState(suggestionState);
  const [inputValue, setInputValue] = useState("");
  const [generating, setGenerating] = useState(false);
  const hasInternet = useRecoilValue(internetState);

  // AsyncStorage key
  const LAST_GENERATED_TIME_KEY = "lastGeneratedTime";

  async function setLastGeneratedTime() {
    const currentTime = new Date().getTime();
    await AsyncStorage.setItem(
      LAST_GENERATED_TIME_KEY,
      JSON.stringify(currentTime)
    );
  }

  async function getLastGeneratedTime() {
    const lastGeneratedTime = await AsyncStorage.getItem(
      LAST_GENERATED_TIME_KEY
    );
    return lastGeneratedTime ? JSON.parse(lastGeneratedTime) : null;
  }

  const handleRefreshImage = async () => {
    if (!hasInternet) return;
    const newImages = await fetchImages();
    setImages(newImages ?? []);
  };

  const handleRefreshSuggestion = async () => {
    setSuggestion("Loading new suggestion...");
    const newSuggestion = await fetchSuggestion();
    setSuggestion(newSuggestion ?? "");
  };

  const handleUseSuggestion = () => {
    setInputValue(suggestion);
  };

  const handleSubmit = async (prompt: string) => {
    const lastGeneratedTime = await getLastGeneratedTime();
    const currentTime = new Date().getTime();

    if (lastGeneratedTime && currentTime - lastGeneratedTime < 10000) {
      Toast.show({
        type: "info",
        text1: "Please wait",
        text2: "You can generate an image every 10 seconds.",
        position: "bottom",
      });
      return;
    }

    setGenerating(true);
    console.log("Submitting prompt: ", prompt);
    Toast.show({
      type: "info",
      text1: "Generating...",
      text2: `DALL‧E is creating ${prompt.slice(0, 30)}...`,
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
          text2: "Error generating image. Please try again later.",
          position: "bottom",
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Success!",
          text2: "Your image has been generated!",
          position: "bottom",
        });

        await setLastGeneratedTime();
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
    } finally {
      setGenerating(false);
    }
  };

  return (
    <KeyboardAvoidingView className="flex flex-col items-center justify-center mx-4 px-2 py-2 mb-1 rounded-lg border-gray-200 border shadow-inner">
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
            !inputValue || generating || !hasInternet
              ? " bg-fuchsia-200"
              : "bg-fuchsia-600"
          }`}
          onPress={!generating ? () => handleSubmit(inputValue) : undefined}
          disabled={!inputValue || generating || !hasInternet}
        >
          <Text className="text-white font-bold">
            {generating ? "Loading..." : "Submit"}
          </Text>
        </TouchableOpacity>
      </View>
      {inputValue &&
        !inputValue.includes(suggestion) &&
        (suggestion || hasInternet) && (
          <Text className="w-full my-1">
            <Text className="font-medium">Suggestion💡</Text>
            <Text className="font-light italic">{suggestion}</Text>
          </Text>
        )}
      <TouchableOpacity
        className={`w-full h-10 ${
          hasInternet ? "bg-green-500" : "bg-green-200"
        } rounded text-center p-2 my-1 justify-center items-center`}
        onPress={handleRefreshSuggestion}
        disabled={!hasInternet}
      >
        <Text className="text-white">Gimme a new suggestion!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="w-full h-10 bg-blue-500 rounded text-center p-2 justify-center items-center"
        onPress={handleUseSuggestion}
      >
        <Text className="text-white">Use suggestion!</Text>
      </TouchableOpacity>
      {!hasInternet && !isFirstRender.current && (
        <Text className="w-full my-1 text-red-500 font-light italic">
          ⛔️ Error: No internet connection.
        </Text>
      )}
    </KeyboardAvoidingView>
  );
};

export default InputPrompt;
