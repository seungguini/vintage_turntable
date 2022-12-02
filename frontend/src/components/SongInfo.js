import { animated, useSpring } from "@react-spring/three";
import { Text, Text3D } from "@react-three/drei";
import React from "react";

export default function SongInfo({ currentSong, playing, position, opacity }) {
  let [x, y, z] = position;
  const AnimatedText = animated(Text);

  return (
    <group>
      <AnimatedText
        font={process.env.PUBLIC_URL + "/fonts/Roboto_Regular.json"}
        // size={0.2}
        // height={0.065}
        // curveSegments={12}
        // rotation={[0, Math.PI * 0.2, 0]}
        position={[x, y, z]}
        // rotation={[0, -0.35, -0.05]}
      >
        {currentSong.name}
        <animated.meshStandardMaterial
          color={[0.68, 0.77, 0.81]}
          transparent={true}
          opacity={opacity}
        />
      </AnimatedText>
      <AnimatedText
        font={process.env.PUBLIC_URL + "/fonts/Roboto_Regular.json"}
        // size={0.05}
        // height={0.065}
        // curveSegments={12}
        // rotation={[0, Math.PI * 0.2, 0]}
        position={[x, y - 0.2, z]}
        // rotation={[0, -0.35, -0.05]}
      >
        {currentSong.artist}
        <animated.meshStandardMaterial
          color={[0.68, 0.77, 0.81]}
          transparent={true}
          opacity={opacity}
        />
      </AnimatedText>
    </group>
  );
}
