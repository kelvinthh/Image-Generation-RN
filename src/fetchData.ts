import ApiService from "./lib/ApiService";
import { API_GET_IMAGES, API_GET_SUGGESTIONS, API_GENERATE_IMAGE } from "@env";
import { ImageUrl } from "./types/imageUrl";

interface ImageUrlsResponse {
  imageUrls: ImageUrl[];
}

export const fetchImages = async () => {
  try {
    const response = await ApiService.get<ImageUrlsResponse>(API_GET_IMAGES);
    response.imageUrls && console.log("Fetched images");
    return response.imageUrls;
  } catch (error) {
    console.error("Fetch Images", error);
  }
};

export const fetchSuggestion = async () => {
  try {
    const response = await ApiService.get<string>(API_GET_SUGGESTIONS);
    response && console.log("Fetched suggestion.");
    return response.trim();
  } catch (error) {
    console.log("Fetch Suggestion", error);
  }
};

export const generateImage = async (prompt: string) => {
  try {
    const response = await ApiService.post<any>(
      API_GENERATE_IMAGE,
      { prompt: prompt },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Generated image.");
    return {response};
  } catch (error) {
    console.error(error);
    return ""
  }
};

