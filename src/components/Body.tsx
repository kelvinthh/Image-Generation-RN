import React, { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  ListRenderItem,
  RefreshControl,
  Text,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import imagesState from "../state/imageState";
import { ImageUrl } from "../types/imageUrl";
import { fetchImages } from "../fetchData";
import ImageItem from "../components/ImageItem";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import internetState from "../state/internetState";
import InputPrompt from "./InputPrompt";
import Icon from "react-native-vector-icons/AntDesign";

const Body = () => {
  const [images, setImages] = useRecoilState(imagesState);
  const hasInternet = useRecoilValue(internetState);
  const [refreshing, setRefreshing] = useState(false);

  const [scrollBtn, setScrollBtn] = useState(false);

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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset > 300 && !scrollBtn) {
      setScrollBtn(true);
    } else if (yOffset <= 300 && scrollBtn) {
      setScrollBtn(false);
    }
  };

  const renderItem: ListRenderItem<ImageUrl> = ({ item }) => {
    return <ImageItem item={item} />;
  };

  return (
    <View className="flex-1 bg-gray-100 pt-2 flex-col space-y-2">
      <InputPrompt flatListRef={flatListRef} isFirstRender={isFirstRender} />

      {/* Image list */}
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={handleScroll}
        className="mx-4"
      />

      {/* Scroll to top button */}
      <TouchableOpacity
        className={`absolute bottom-6 right-6 bg-red-500 rounded-full p-4 ${!scrollBtn ? `opacity-0` : `opacity-75`}`}
        onPress={() =>
          flatListRef.current?.scrollToOffset({ animated: true, offset: 0 })
        }
        disabled={!scrollBtn}
      >
        <Icon name="arrowup" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default Body;
