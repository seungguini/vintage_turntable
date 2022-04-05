import "./App.css";
import ReactDOM from "react-dom";
import React, { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  ContactShadows,
  Environment,
  Stage,
} from "@react-three/drei";

/** State management */

/** ThreeJS */
import Lights from "./components/Lights";
// Load turntable 3D model
import Turntable from "./components/Turntable";
// Component Imports
import Login from "./Login";
import Dashboard from "./Dashboard";

import "bootstrap/dist/css/bootstrap.min.css";

// Grab Spotify Auth code from the URL
const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
  const ref = useRef();
  return (
    <div className="App">
      <Canvas className="canvas" shadowMap>
        <color attach="background" args={["#171717"]} />
        <Suspense fallback={null}>
          <Stage
            contactShadow
            shadows
            adjustCamera
            environment="studio"
            intensity={0}
          >
            <Turntable rotation={[0, Math.PI * 0.1, 0]} />
          </Stage>

          {/* <Environment preset="sunset" background /> */}
        </Suspense>

        {/*<Lights />*/}
        <OrbitControls ref={ref} preset />
      </Canvas>
      <div className="spotify">
        {code ? (
          <Dashboard className="dashboard" code={code} />
        ) : (
          <Login className="login" />
        )}
      </div>
    </div>
  );
};

export default App;
