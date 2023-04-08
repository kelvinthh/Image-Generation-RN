# Image Generation React Native App 🖼️📱

This is a mobile version of the [Image Generation Next.js](https://github.com/kelvinthh/Image-Generation-Next.js) app built with React Native, TypeScript, and NativeWind (Tailwind CSS) for styling. The app allows users to generate images based on text prompts, with suggestions provided by OpenAI's ChatGPT 3.5 API and images generated using OpenAI's DALL-E API. The back end is hosted on Azure Functions, and images are stored in Azure Storage.

## Features 🌟

- Generate images using text prompts 🎨
- Display images in a grid format 📷
- Image loading state with ActivityIndicator ⏳
- Image overlay with name on long-press 🏷️
- Suggestion system powered by ChatGPT 3.5 API 💡
- Refresh image list and suggestions independently 🔄

## Technologies 💻

- React Native with Expo
- TypeScript
- NativeWind (Tailwind CSS) for styling
- OpenAI's ChatGPT 3.5 API for prompt suggestions
- OpenAI's DALL-E API for image generation
- Recoil for global state management
- Azure Functions for back-end hosting
- Azure Storage for storing images

## Getting Started 🚀

1. Clone this repository.

2. Install the required dependencies by running `npm install`.

3. Create a `.env` file in the project root and configure the required environment variables:
```
REMOTE_HOST=
API_GET_IMAGES=
API_GET_SUGGESTIONS=
API_GENERATE_IMAGE=
```

4. Run the app on your preferred platform (iOS or Android) using `npx react-native run-ios` or `npx react-native run-android`.

5. Enjoy generating and exploring images based on your text prompts! 🌈

## Additional Information ℹ️

- The back-end part of this project can be found in the [Image Generation Next.js](https://github.com/kelvinthh/Image-Generation-Next.js) repository.
- The app is designed to work with the back end hosted on Azure Functions and images stored in Azure Storage.
- The project is a creative and user-friendly application that offers suggestions and generates images based on user input.

## Contributions and Support 👥

Feel free to open an issue or submit a pull request if you have any suggestions, improvements, or bug reports. Your contributions are always welcome!
