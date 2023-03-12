import "./App.css";
import React, { useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Sparkles,
} from "@react-three/drei";

import Turntable from "./components/mainView/Turntable";
import Camera from "./components/environment/Camera";
import Lights from "./components/environment/Lights";
import Buttons from "./components/buttons/Buttons";
import { useInitializePlayback } from "./hooks/playbackHooks";

// The base ThreeJS component which renders the scene
const Scene = () => {

  useInitializePlayback()

  // ANIMATIONS
  const [enableLookAt, setEnableLookAt] = useState(true);

  const { camera, mouse } = useThree();
  
  return (
    <>
      <Camera
        turntablePosition={[0, -0.24, 0]}
        camera={camera}
        mouse={mouse}
        enableLookAt={enableLookAt}
        setEnableLookAt={setEnableLookAt}
      />
      <Lights />
      <Sparkles count={2000} scale={25} size={2} />
      <Float
        speed={1} // Animation speed, defaults to 1
        rotationIntensity={1.5} // XYZ rotation intensity, defaults to 1
        floatIntensity={1.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-0.2, 0.2]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
      </Float>
      <Buttons />
      <Turntable />

      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={1}
        scale={50}
        blur={1}
        far={4}
      />
      <Environment preset="studio" />
    </>
  );
};

const App = () => {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 50 }}>
      <Scene />
    </Canvas>
  );
};

export default App;
