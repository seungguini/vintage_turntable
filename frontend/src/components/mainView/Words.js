import React from "react";
import { Text3D } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

const turntableX = -1.7;
const turntableY = 2.2;
const turntableZ = 4;

export default function Words({ opacity }) {
  const AnimatedText = animated(Text3D);
  const spring2 = useSpring({
    from: { scale: 0 },
    to: { scale: 10 },
    config: {
      friction: 10,
    },
    delay: 1000,
  });
  return (
    <>
      <AnimatedText
        font={process.env.PUBLIC_URL + "/fonts/Roboto_Regular.json"}
        size={0.3}
        height={0.065}
        curveSegments={12}
        position={[turntableX, turntableY, turntableZ]}
        rotation={[0.5, 0.5, -0.25]}

        // rotation={[0, -0.35, -0.05]}
      >
        Click the Turntable!
        <animated.meshStandardMaterial
          color={[0.68, 0.77, 0.81]}
          emissive={[1, 0.1, 0]}
          transparent={true}
          opacity={opacity}
        />
      </AnimatedText>
    </>
  );
}
