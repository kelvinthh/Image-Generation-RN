import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import Header from './src/components/Header';

const App = () => {
  return (
    <SafeAreaView className="flex-1 mt-8">
      <Header />
      {/* Other components and content */}
      <>
      <Text>Hello</Text>
      </>
    </SafeAreaView>
  );
};

export default App;
