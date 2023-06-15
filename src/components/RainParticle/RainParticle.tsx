import React from 'react';
import {StyleSheet} from 'react-native';

// @ts-ignore
import {spline} from '@georgedoescode/spline';

import {
  Blur,
  Canvas,
  Path,
  SkiaMutableValue,
  useClockValue,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';
import {createNoise2D} from 'simplex-noise';
import {createPoints, noisePoint} from './RainParticle.utils';

interface Coordinates {
  x: number;
  y: number;
  originX: number;
  originY: number;
  noiseOffsetX: number;
  noiseOffsetY: number;
}

const RainParticle = () => {
  const clock = useClockValue();

  const innerPoints = useValue(createPoints(1200, 120));
  const outerPoints = useValue(createPoints(1300, 60));

  const noise = createNoise2D();
  const noiseStep = 0.004;
  const innerBlobSize = 40;
  const outerBlobSize = 40;
  const innerColor = '#03C4A5';
  const outerColor = 'yellow';

  const animate = (
    oldPoints: SkiaMutableValue<Coordinates[]>,
    reverse: boolean,
    blobSize: number,
  ) => {
    const newPoints = [];

    for (let i = 0; i < oldPoints.current.length; i++) {
      const point = oldPoints.current[i];

      // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
      const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
      const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
      // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
      const x = noisePoint(
        nX,
        reverse ? 1 : -1,
        reverse ? -1 : 1,
        point.originX - blobSize,
        point.originX + blobSize,
      );
      const y = noisePoint(
        nY,
        reverse ? 1 : -1,
        reverse ? -1 : 1,
        point.originY - blobSize,
        point.originY + blobSize,
      );

      // update the point's current coordinates
      point.x = x;
      point.y = y;

      // progress the point's x, y values through "time"
      point.noiseOffsetX += noiseStep;
      point.noiseOffsetY += noiseStep;

      newPoints.push(point);
    }

    oldPoints.current = newPoints;
  };

  const innerPath = useComputedValue(() => {
    animate(innerPoints, false, innerBlobSize);
    return spline(innerPoints.current, 1, true);
  }, [clock]);

  const outerPath = useComputedValue(() => {
    animate(outerPoints, true, outerBlobSize);
    return spline(outerPoints.current, 1, true);
  }, [clock]);

  return (
    <Canvas style={styles.container}>
      <Path path={innerPath} color={innerColor} opacity={0.6}>
        <Blur blur={5} />
      </Path>
      <Path path={outerPath} color={outerColor} opacity={0.7}>
        <Blur blur={8} />
      </Path>
    </Canvas>
  );
};

export default RainParticle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
