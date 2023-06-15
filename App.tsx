import React, {FC} from 'react';
import {SafeAreaView, StyleSheet, View, Dimensions} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import WindParticle from './src/components/WindParticle';
import RainParticle from './src/components/RainParticle/RainParticle';

const WIND_PARTICLES_CONTAINER_HEIGHT = 200;
const WIND_PARTICLES_CONTAINER_WIDTH = Dimensions.get('window').width - 20;
const TOTAL_WIND_PARTICLES_COUNT = 25;

const ElementWidth = 40;
const ElementHeight = 10;

const generateRandomElements = (containerHeight) => {
  const elements = [];

  for (let i = 0; i < TOTAL_WIND_PARTICLES_COUNT; i++) {
    const element = {
      top: 0,
      left: 0,
    };

    let overlapping = true;
    while (overlapping) {
      element.top = Math.floor(Math.random() * (containerHeight - ElementHeight));
      element.left = Math.floor(Math.random() * (WIND_PARTICLES_CONTAINER_WIDTH - ElementWidth));

      overlapping = elements.some((existingElement) => {
        const horizontalOverlap =
          element.left < existingElement.left + ElementWidth &&
          element.left + ElementWidth > existingElement.left;

        const verticalOverlap =
          element.top < existingElement.top + ElementHeight &&
          element.top + ElementHeight > existingElement.top;

        return horizontalOverlap && verticalOverlap;
      });
    }

    elements.push(element);
  }

  return elements;
};

const App: FC = () => {
  const elements = generateRandomElements(WIND_PARTICLES_CONTAINER_HEIGHT);
  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.windParticlesContainer}>
          {elements.map(({ top, left }, i) => (
            <View key={i} style={styles.windParticleWrap(top, left)}>
              <WindParticle />
            </View>
          ))}
        </View>
        <RainParticle />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  windParticlesContainer: {
    height: WIND_PARTICLES_CONTAINER_HEIGHT,
    marginBottom: 100,
  },
  windParticleWrap: (top, left) => ({
    position: 'absolute',
    top,
    left,
    width: ElementWidth,
    height: ElementHeight,
  }),
});

export default App;
