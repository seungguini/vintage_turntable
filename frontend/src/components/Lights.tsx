import '@react-three/fiber'
import * as React from "react"

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.1} position={[2, 2, 2]} />
      <spotLight intensity={0.1} position={[5, 20, 20]} />
      <pointLight intensity={0.1} position={[0, 10, 0]} />
    </>
  );
};

export default Lights;
