const NUMBER_OF_POINTS = 20; // how many points a rain patch is formed from

const randomMultiplier = (multiplier: number) => {
  return Math.random() * multiplier;
};

export function createPoints(multiplier: number, radius: number) {
  const points = [];
  // used to equally space each point around the circle
  const angleStep = (Math.PI * 2) / NUMBER_OF_POINTS;

  for (let i = 1; i <= NUMBER_OF_POINTS; i++) {
    // x & y coordinates of the current point
    const theta = i * angleStep;

    const x = 150 + Math.cos(theta) * radius;
    const y = 150 + Math.sin(theta) * radius;

    points.push({
      x: x,
      y: y,
      // we need to keep a reference to the point's original {x, y} coordinates so we always keep a +/-20 from the original offset
      originX: x,
      originY: y,
      noiseOffsetX: randomMultiplier(multiplier),
      noiseOffsetY: randomMultiplier(multiplier),
    });
  }

  return points;
}

export function noisePoint(
  noise: number,
  start1: number,
  end1: number,
  start2: number,
  end2: number,
) {
  return ((noise - start1) / (end1 - start1)) * (end2 - start2) + start2;
}
