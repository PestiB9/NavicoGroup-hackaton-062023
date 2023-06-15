import React, {useEffect} from 'react';
import {
  LinearGradient,
  vec,
  RoundedRect,
  Canvas,
  Blur,
} from '@shopify/react-native-skia';
import color from 'color';
import {useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';

const DURATION = 1500;
const PARTICLE_WIDTH = 50;
const REPETITIONS = 1000;

const WindParticle: React.FunctionComponent = () => {
  const startColor = color('#00ff87', 'hex').alpha(0).toString();
  const particleScale = useSharedValue(0);

  const animate = () => {
    particleScale.value = withRepeat(
      withTiming(PARTICLE_WIDTH, {duration: DURATION}),
      REPETITIONS,
      false,
    );
  };

  useEffect(() => {
    setTimeout(() => animate(), Math.floor(Math.random() * 1000));
  }, []);

  return (
    <Canvas style={styles.container}>
      <RoundedRect
        x={10}
        y={10}
        r={10}
        width={particleScale}
        height={5}
        antiAlias>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(140, 5)}
          colors={[startColor, '#00ff87']}
        />
        <Blur blur={1} />
      </RoundedRect>
    </Canvas>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 15,
  },
});

export default WindParticle;
