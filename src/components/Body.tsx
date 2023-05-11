import React, { useState, useRef, useEffect } from "react";
import { View, FlatList, ListRenderItem, RefreshControl } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import imagesState from "../state/imageState";
import { ImageUrl } from "../types/imageUrl";
import { fetchImages } from "../fetchData";
import ImageItem from "../components/ImageItem";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import internetState from "../state/internetState";
import InputPrompt from "./InputPrompt";

const Body = () => {
  const [images, setImages] = useRecoilState(imagesState);
  const hasInternet = useRecoilValue(internetState);
  const [refreshing, setRefreshing] = useState(false);

  const flatListRef = useRef<FlatList<ImageUrl>>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Prevent the toast pop up on the first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!hasInternet) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No internet connection.",
        position: "bottom",
      });
    }
  }, [hasInternet]);

  // This handle the FlatList swipe up to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await handleRefreshImage();
    setRefreshing(false);
  };

  const handleRefreshImage = async () => {
    if (!hasInternet) return;
    const newImages = await fetchImages();
    setImages(newImages ?? []);
  };

  const renderItem: ListRenderItem<ImageUrl> = ({ item }) => {
    return <ImageItem item={item} />;
  };

  return (
    <View className="flex-1">
      <InputPrompt flatListRef={flatListRef} isFirstRender={isFirstRender} />
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="mx-4"
      />
    </View>
  );
};

export default Body;
