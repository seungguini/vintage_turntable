import * as React from "react"
import { Text3D } from "@react-three/drei"
import { animated, useSpring } from "@react-spring/three";

interface WordsProps {
  opacity: Number
}

export default function Words({ opacity } : WordsProps) {
  const x : Number = -1.7;
  const y : Number = 2.2;
  const z : Number = 4;

  const AnimatedText : any = animated(Text3D);
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
        position={[x, y, z]}
        rotation={[0.5, 0.5, -0.25]} 
        // rotation={[0, -0.35, -0.05]}
      >
        Click the Turntable!
        <meshStandardMaterial
          color={[0, 0.3, 0]}
          emissive={[1, 0.1, 0]}
          transparent={true}
          opacity={1}
        />
      </AnimatedText>
    </>
  );
}