import React from "react";
import { Text3D } from "@react-three/drei";

export default function Words() {
  const x = -2.4;
  const y = -1;
  const z = 1;

  return (
    <>
      <Text3D
        font={process.env.PUBLIC_URL + "/fonts/Roboto_Regular.json"}
        size={0.575}
        height={0.065}
        curveSegments={12}
        position={[x, y, z]}
        // rotation={[0, -0.35, -0.05]}
      >
        SeungguiniAudio
        <meshStandardMaterial
          color={[0.68, 0.77, 0.81]}
          emissive={[1, 0.1, 0]}
        />
      </Text3D>
    </>
  );
}
