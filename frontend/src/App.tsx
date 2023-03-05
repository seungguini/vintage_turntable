import "./App.css";
import React, { useEffect, useState } from "react";
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
import { useVolume, useIsPlaying } from "./states/states";

import { TONE_ARM_SOUND_EFFECT, VINYL_SOUND_EFFECT } from "./utils/constants";
import type { AudioType } from "./utils/constants";

// The base ThreeJS component which renders the scene
const Scene = () => {
  // States
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false); // If Turntable is clicked
  const [toneArmFinished, setToneArmFinished] = useState(false);

  // Playback states and actions
  const isPlaying: boolean = useIsPlaying();
  const volume: number = useVolume();


  const song: AudioType = new Audio("/songs/Daylight.mp3");
  song.volume = 0.01;


  //  Pause song
  useEffect(() => {
    if (!isPlaying) {
      song.pause();
      TONE_ARM_SOUND_EFFECT.play();
      VINYL_SOUND_EFFECT.pause();
    }
  }, [isPlaying]);

  // Song plays only when the tone arm moves onto the record
  useEffect(() => {
    if (isPlaying && toneArmFinished) {
      console.log("Play button hit + tone arm moved");
      TONE_ARM_SOUND_EFFECT.play();
      VINYL_SOUND_EFFECT.play();
      song.play();
    }
  }, [toneArmFinished]);

  useEffect(() => {
    TONE_ARM_SOUND_EFFECT.volume = volume;
    song.volume = volume;
  }, [volume]);

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
        focused={focused}
      />
      <Lights />
      <Sparkles count={2000} scale={25} size={2} />
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
          setToneArmFinished={setToneArmFinished}
        />
      </Float>
      <Buttons />

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
