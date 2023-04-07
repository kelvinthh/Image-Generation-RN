import ApiService from "./lib/ApiService";
import { API_GET_IMAGES, API_GET_SUGGESTIONS } from "@env";
import { ImageUrl } from "./types/imageUrl";

interface ImageUrlsResponse {
  imageUrls: ImageUrl[];
}

export const fetchImages = async () => {
  try {
    const response = await ApiService.get<ImageUrlsResponse>(API_GET_IMAGES);
    return response.imageUrls;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSuggestion = async () => {
  try {
    const response = await ApiService.get<string>(API_GET_SUGGESTIONS);
    return response;
  } catch (error) {
    console.log(error);
  }
};
