import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { RecoilRoot, useSetRecoilState } from "recoil";
import Header from "./src/components/Header";
import imageState from "./src/state/imageState";
import Body from "./src/components/Body";
import suggestionState from "./src/state/suggestionState";
import { fetchImages, fetchSuggestion } from "./src/fetchData";

const AppContent = () => {
  const setImages = useSetRecoilState(imageState);
  const setSuggestion = useSetRecoilState(suggestionState);

  useEffect(() => {
    (async () => {
      const images = await fetchImages();
      const suggestion = await fetchSuggestion();
      
      setImages(images ?? []); // Provide an empty array as the default value
      setSuggestion(suggestion ?? ""); // Provide an empty string as the default value
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white mt-8">
      <Header />
      <Body />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <AppContent />
    </RecoilRoot>
  );
};

export default App;
