import "./App.css";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";

import {
  ContactShadows,
  Environment,
  Float,
  Sparkles,
} from "@react-three/drei";
import { useSpring, easings, useSpringRef } from "@react-spring/three";

// Load turntable 3D model
import Turntable from "./components/Turntable";
import Camera from "./components/Camera";
import Words from "./components/Words";

import Buttons from "./components/Buttons";
import Song from "./components/Song";
import Lights from "./components/Lights";

// let song = new Audio("/songs/Daylight.mp3");
// song.volume = 0.01;
// const toneArmOnSoundeffect = new Audio("/soundeffects/tonearm_on_sound.mp3");
// toneArmOnSoundeffect.volume = 0.4;
// const vinylSoundeffect = new Audio("/soundeffects/vinyl_soundeffect.mp3");
// vinylSoundeffect.volume = 1;
// vinylSoundeffect.loop = true;

const Scene = () => {
  // States
  // const [turntablePosition, setTurntablePosition] = useState([0, -0.24, 0]);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false); // If Turntable is clicked
  const [playing, setPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [toneArmFinished, setToneArmFinished] = useState(false);
  // Songs

  // AUDIO

  // Skip Song

  // ANIMATIONS

  // Camera animation

  const cameraIntroDuration = 5000;
  const [songIndex, setSongIndex] = useState(0);
  const [enableLookAt, setEnableLookAt] = useState(true);

  const cameraMoveRef = useSpringRef();

  const { camera, mouse } = useThree();

  const { position } = useSpring({
    // react-spring
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
      <Lights />
      <Sparkles count={2000} scale={25} size={2} />
      <Song
        playing={playing}
        setPlaying={setPlaying}
        toneArmFinished={toneArmFinished}
        soundOn={soundOn}
        songIndex={songIndex}
      />
      <Float
        speed={1} // Animation speed, defaults to 1
        rotationIntensity={1.5} // XYZ rotation intensity, defaults to 1
        floatIntensity={1.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-0.2, 0.2]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Turntable
          hovering={hovering}
          setHovering={setHovering}
          focused={focused}
          setFocused={setFocused}
          playing={playing}
          setToneArmFinished={setToneArmFinished}
        />
      </Float>
      {/* <Words opacity={opacity} /> */}
      <Buttons
        playing={playing}
        setPlaying={setPlaying}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
        songIndex={songIndex}
        setSongIndex={setSongIndex}
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
