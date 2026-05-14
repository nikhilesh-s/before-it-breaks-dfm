/**
 * Derives which health-bar PNG segments to show for a given stat value.
 *
 * Each arc has 5 segments (1–5). A stat value of N means segments 1–N are
 * "filled". Segment files live in /src/assets/health-bar/ and follow the
 * naming convention: <type>-arc-<n>.png  (e.g. social-arc-3.png)
 *
 * Usage:
 *   const { socialSegments, mentalSegments, physicalSegments } = useHealthBar(stats);
 *   // each is an array of { index, filled, src } objects
 */
export function useHealthBar(stats) {
  const buildSegments = (type, value) =>
    Array.from({ length: 5 }, (_, i) => ({
      index: i + 1,
      filled: i < value,
      // Actual PNG imports are wired up in the HealthBar component once
      // real assets are dropped into /src/assets/health-bar/
      src: `/src/assets/health-bar/${type}-arc-${i + 1}.png`,
    }));

  return {
    socialSegments:   buildSegments('social',   stats.social),
    mentalSegments:   buildSegments('mental',   stats.mental),
    physicalSegments: buildSegments('physical', stats.physical),
  };
}
