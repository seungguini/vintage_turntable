import { ContactShadows } from "@react-three/drei";
import React from "react";

const Lights = () => {
  return (
    <>
      {/* Main Lights */}
      <ambientLight intensity={0.2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        shadow-mapSize={[512, 512]}
        castShadow
        intensity={2}
      />
      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={1}
        scale={50}
        blur={1}
        far={4}
      />
      <spotLight
        position={[-7, 0, 12]}
        lookAt={[-5, 0, 10]}
        penumbra={1}
        shadow-mapSize={[512, 512]}
        castShadow
        intensity={0}
      />

      {/* Menu Lights */}
      <spotLight
        position={[6, 5, 7]}
        lookAt={[8, 0, 9]}
        penumbra={1}
        shadow-mapSize={[512, 512]}
        castShadow
        intensity={0}
      />
    </>
  );
};

export default Lights;
