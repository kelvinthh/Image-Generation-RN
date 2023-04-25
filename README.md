# React Native AI Image Generator with DALL-E and ChatGPT  🖼️📱

This is a mobile version of the [Image Generation Next.js](https://github.com/kelvinthh/Image-Generation-Next.js) app built with React Native, TypeScript, and NativeWind (Tailwind CSS) for styling. The app allows users to generate images based on text prompts, with suggestions provided by OpenAI's ChatGPT 3.5 API and images generated using OpenAI's DALL-E API. The back end is hosted on Azure Functions, and images are stored in Azure Storage.
![](https://i.imgur.com/NZdLcXf.png)

## Features 🌟

- Generate images using text prompts powered by DALL-E 🎨
- Get text prompt suggestion immediately generated by ChatGPT 3.5 💡
- Swipe up to refresh images ⏳
- Image overlay with name on long-press 🏷️

## Technologies 💻

- React Native with Expo
- TypeScript
- NativeWind (Tailwind CSS) for styling
- OpenAI's ChatGPT 3.5 API for prompt suggestions
- OpenAI's DALL-E API for image generation
- Recoil for global state management
- Azure Functions for back-end hosting
- Azure Storage for storing images

## Third-Party Libraries Used 📚
- [Axios](https://axios-http.com/)
- [react-native-toast-message](https://github.com/calintamas/react-native-toast-message)
- [NativeWind](https://github.com/marklawlor/nativewind)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Native Async Storage](https://github.com/react-native-async-storage/async-storage)
- [react-native-dotenv](https://github.com/goatandsheep/react-native-dotenv)
- [Recoil](https://recoiljs.org/)

## Getting Started 🚀

1. Make sure you have the back-end set up, this includes the Azure Functions and Storages from the [main Next.js project](https://github.com/kelvinthh/Image-Generation-Next.js).

2. Clone this repository.

3. Install the required dependencies by running `npm install`.

4. Create a `.env` file in the project root and configure the required environment variables:
```
REMOTE_HOST=            // This should be your Azure remote host url
API_GET_IMAGES=         // getImages API endpoint, e.g. /api/getImages
API_GET_SUGGESTIONS=    // getChatGPTSuggestion API endpoint
API_GENERATE_IMAGE=     // generateImage API endpoint
```
5. Download **Expo Go** app from Google Play/App Store, run `npx expo start` in the terminal to start the development server,  then scan the QR Code within Expo Go app or your phone's camera app.

6. Or to build the app, run the app on your preferred platform (iOS or Android) using `npx expo run:ios` or `npx expo run:android`.

7. Enjoy generating and exploring images based on your text prompts! 🌈

## Additional Information ℹ️

- The back-end part of this project can be found in the [Image Generation Next.js](https://github.com/kelvinthh/Image-Generation-Next.js) repository.
- The app is designed to work with the back end hosted on Azure Functions and images stored in Azure Storage.
- The project is a creative and user-friendly application that offers suggestions and generates images based on user input.
