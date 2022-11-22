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

const COVERPICSURLS = ["Aiguille.jpg", "CanaryForest.jpg", "Sworn.jpg"];

const Scene = () => {
  // States
  // const [turntablePosition, setTurntablePosition] = useState([0, -0.24, 0]);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false); // If Turntable is clicked
  const [playing, setPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [toneArmFinished, setToneArmFinished] = useState(false);
  const [coverPicUrl, setCoverPicUrl] = useState("Aiguille.jpg");

  const [songIndex, setSongIndex] = useState(0);
  const [enableLookAt, setEnableLookAt] = useState(true);

  const { camera, mouse } = useThree();

  useEffect(() => {
    console.log("Updating cover pic!");
    setCoverPicUrl(COVERPICSURLS[songIndex % 3]);
  }, [songIndex]);

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
        rotationIntensity={1.2} // XYZ rotation intensity, defaults to 1
        floatIntensity={1.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-0.2, 0.2]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Turntable
          hovering={hovering}
          setHovering={setHovering}
          focused={focused}
          setFocused={setFocused}
          playing={playing}
          toneArmFinished={toneArmFinished}
          setToneArmFinished={setToneArmFinished}
          coverPicUrl={coverPicUrl}
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
