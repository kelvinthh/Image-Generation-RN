import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { RecoilRoot, useSetRecoilState } from "recoil";
import Header from "./src/components/Header";
import ApiService from "./src/lib/ApiService";
import { API_GET_IMAGES } from "@env";
import imageState from "./src/state/imageState";
import Body from './src/components/Body';
import { ImageUrl } from './src/types/imageUrl';

interface ImageUrlsResponse {
  imageUrls: ImageUrl[];
}


const AppContent = () => {
  const setImages = useSetRecoilState(imageState);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await ApiService.get<ImageUrlsResponse>(API_GET_IMAGES);
        setImages(response.imageUrls);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  // You can place other components and content here
  return (
    <SafeAreaView className="flex-1 bg-gray-100 mt-8">
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
