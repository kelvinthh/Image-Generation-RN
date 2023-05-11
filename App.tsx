import React, { useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";
import Header from "./src/components/Header";
import imageState from "./src/state/imageState";
import Body from "./src/components/Body";
import suggestionState from "./src/state/suggestionState";
import { fetchImages, fetchSuggestion } from "./src/fetchData";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import internetState from "./src/state/internetState";
import NetInfo from "@react-native-community/netinfo";

const AppContent = () => {
  const setImages = useSetRecoilState(imageState);
  const setSuggestion = useSetRecoilState(suggestionState);
  const [hasInternet, setHasInternet] = useRecoilState(internetState);

  useEffect(() => {

    // Internet check
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log(`Internet state: ${state.type} ${state.isInternetReachable}`);
      setHasInternet(state.isInternetReachable);
    });

    // Fetch getImages and prompt suggestion
    (async () => {
      const images = await fetchImages();
      const suggestion = await fetchSuggestion();

      setImages(images ?? []); // Provide an empty array as the default value
      setSuggestion(suggestion ?? ""); // Provide an empty string as the default value
    })();

    return () => {
      unsubscribe();  // Stop internet connection check on unmount
    };
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <Header />
      <Body />
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <AppContent />
      <Toast />
    </RecoilRoot>
  );
};

export default App;
