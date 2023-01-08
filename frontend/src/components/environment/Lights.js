import React from "react";

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        shadow-mapSize={[512, 512]}
        castShadow
        intensity={2}
      />
    </>
  );
};

export default Lights;
