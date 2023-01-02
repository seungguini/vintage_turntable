import { animated, useSpring } from "@react-spring/three";
import { Center, Text, Text3D } from "@react-three/drei";
import React from "react";

// Song Title, Artist, Album Name

const THICKNESS = 0.005;
const SIZE = 0.05;

export default function SongInfo({ song, position, opacity }) {
  let [x, y, z] = position;
  console.log(song.name);
  console.log(position);
  const AnimatedText = animated(Text3D);

  return (
    // <Center disableY disableZ>
    <group position={[-0.18, 0, 0]}>
      <AnimatedText
        font={process.env.PUBLIC_URL + "/fonts/Roboto_Regular.json"}
        size={SIZE}
        height={THICKNESS} // this is actually the width (ie. how thick the 3D-ness is)
        curveSegments={12}
        position={[x, y, z]}
      >
        {song.name}
        <animated.meshStandardMaterial transparent={true} opacity={opacity} />
      </AnimatedText>
      <AnimatedText
        font={process.env.PUBLIC_URL + "/fonts/Roboto_Regular.json"}
        size={SIZE * 0.7}
        height={THICKNESS}
        curveSegments={12}
        position={[x, y - 0.08, z]}
      >
        {song.artist}
        <animated.meshStandardMaterial transparent={true} opacity={opacity} />
      </AnimatedText>
    </group>
    // </Center>
  );
}
