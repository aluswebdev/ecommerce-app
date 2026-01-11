import React, { useEffect } from "react";
import {
  Canvas,
  Rect,
  Blur,
  runTiming,
  interpolate,
  Easing,
  SkiaValue,
} from "@shopify/react-native-skia";

const Glow = () => {
  const progress = SkiaValue(0); // <-- correct way in latest Skia

  useEffect(() => {
    const loop = () => {
      runTiming(
        progress,
        { to: 1, duration: 2000, easing: Easing.inOut(Easing.sin) },
        () => {
          progress.current = 0;
          loop();
        }
      );
    };
    loop();
  }, []);

  const opacity = interpolate(progress, [0, 1], [0.2, 0.7]);

  return (
    <Canvas style={{ width: 90, height: 90, position: "absolute" }}>
      <Rect x={0} y={0} width={80} height={80} color="white" opacity={opacity}>
        <Blur blur={20} />
      </Rect>
    </Canvas>
  );
};

export default Glow;
