import "./App.css";
import ReactDOM from "react-dom";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  PresentationControls,
  Sparkles,
  Text3D,
} from "@react-three/drei";
import {
  useSpring,
  animated,
  easings,
  useSpringRef,
  useChain,
  config,
} from "@react-spring/three";
import * as THREE from "three";

// Load turntable 3D model
import Turntable from "./components/Turntable";
import Camera from "./components/Camera";
import Words from "./components/Words";

import Buttons from "./components/Buttons";
import { Track } from "./components/Track";
const audio = new Audio("/songs/Daylight.mp3");

const Scene = () => {
  // States
  // const [turntablePosition, setTurntablePosition] = useState([0, -0.24, 0]);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false); // If Turntable is clicked
  const [playing, setPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [toneArmFinished, setToneArmFinished] = useState(false);

  // AUDIO

  useEffect(() => {
    if (!playing) {
      console.log("PAUSING AUDIO");
      audio.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (playing & toneArmFinished) {
      console.log("Play button hit + tone arm moved");
      audio.play();
    }
  }, [toneArmFinished]);

  // ANIMATIONS

  // Camera animation

  const cameraIntroDuration = 5000;

  const [enableLookAt, setEnableLookAt] = useState(true);

  const cameraMoveRef = useSpringRef();

  const { camera, mouse } = useThree();

  const { position } = useSpring({
    from: {
      position: [15, 6, 10],
    },
    to: {
      position: [0, 0, 8],
    },
    config: {
      duration: 5000,
      easing: easings.easeInOutSine,
    },
    onResolve: () => {
      setEnableLookAt(false); // Disable lookat so camera can follow mouse
    },
    ref: cameraMoveRef,
  });

  // Turntable animations

  // Once clicked, zoom-in mode for turntable
  const ttScaleSpring = useSpring({
    scale: hovering & !focused ? 1.05 : 1,
    // scale: 10,
  });

  const zoomConfig = {
    duration: 500,
    easing: easings.easeInOutSine,
  };

  const ttRotationSpring = useSpring({
    rotation: !focused ? [0.5, 0.5, -0.25] : [Math.PI * 0.5, 0, 0],
    config: zoomConfig,
  });

  const ttPositionSpring = useSpring({
    position: !focused ? [0, -0.24, 0] : [0, 0, 6],
    config: zoomConfig,
  });

  // Word animations

  const { opacity } = useSpring({
    loop: { reverse: true },

    from: { opacity: 0 },
    to: { opacity: !focused ? 1 : 0 },
    config: {
      duration: 2000,
      easing: easings.easeInOutSine,
    },
    // delay: cameraIntroDuration,
    delay: 500,

    // ref: wordsOpacityRef,
  });

  // JSX

  return (
    <>
      <Camera
        makeDefault
        turntablePosition={[0, -0.24, 0]}
        camera={camera}
        mouse={mouse}
        enableLookAt={enableLookAt}
        setEnableLookAt={setEnableLookAt}
        position={position}
        focused={focused}
      />
      <ambientLight intensity={0.3} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        shadow-mapSize={[512, 512]}
        castShadow
        intensity={2}
      />
      <Sparkles count={1000} scale={25} size={1.5} />
      <Turntable
        hovering={hovering}
        setHovering={setHovering}
        focused={focused}
        setFocused={setFocused}
        scale={ttScaleSpring.scale}
        rotation={ttRotationSpring.rotation}
        position={ttPositionSpring.position}
        playing={playing}
        setToneArmFinished={setToneArmFinished}
      />
      <Words opacity={opacity} />
      <Buttons
        playing={playing}
        setPlaying={setPlaying}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
      />

      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={1}
        scale={50}
        blur={1}
        far={4}
      />
      <Environment preset="studio" />
      {/* <Environment preset="sunset" background /> */}
      {/*<Lights />*/}
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
