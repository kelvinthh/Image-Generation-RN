import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import Header from './src/components/Header';
import ApiService from './src/lib/ApiService';
import { API_GET_IMAGES } from '@env';

const App = () => {
  useEffect(() => {
    // Fetch images and log the response JSON
    const fetchImages = async () => {
      try {
        const response = await ApiService.get(API_GET_IMAGES);
        console.log(response);
      } catch (error) {
        // Handle error, e.g., log the error, show a notification, etc.
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  return (
    <SafeAreaView className="flex-1 mt-8">
      <Header />
      {/* Other components and content */}
    </SafeAreaView>
  );
};

export default App;
