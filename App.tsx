import React, {FC} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import WindParticle from './src/components/WindParticle';
import RainParticle from './src/components/RainParticle/RainParticle';

const App: FC = () => {
  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <SafeAreaView style={styles.wrapper}>
        <WindParticle />
        <RainParticle />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 120,
  },
});

export default App;
