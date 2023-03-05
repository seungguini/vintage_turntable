import "./App.css";
import React, { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Sparkles,
} from "@react-three/drei";
import { useSpring, easings, useSpringRef } from "@react-spring/three";

import Turntable from "./components/mainView/Turntable";
import Camera from "./components/environment/Camera";
import Lights from "./components/environment/Lights";
import Buttons from "./components/buttons/Buttons";
import { useVolume, useIsPlaying, usePlaybackActions } from "./states";

type SongType = HTMLAudioElement

const song: SongType = new Audio("/songs/Daylight.mp3");
song.volume = 0.01;
const toneArmOnSoundeffect: SongType = new Audio("/soundeffects/tonearm_on_sound.mp3");
toneArmOnSoundeffect.volume = 0.4;
const vinylSoundeffect: SongType = new Audio("/soundeffects/vinyl_soundeffect.mp3");
vinylSoundeffect.volume = 1;
vinylSoundeffect.loop = true;

// The base ThreeJS component which renders the scene
const Scene = () => {
  // States
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false); // If Turntable is clicked
  const [toneArmFinished, setToneArmFinished] = useState(false);

  // Playback states and actions
  const isPlaying: boolean = useIsPlaying();
  const volume: number = useVolume();

  //  Pause song
  useEffect(() => {
    if (!isPlaying) {
      song.pause();
      toneArmOnSoundeffect.play();
      vinylSoundeffect.pause();
    }
  }, [isPlaying]);

  // Song plays only when the tone arm moves onto the record
  useEffect(() => {
    if (isPlaying && toneArmFinished) {
      console.log("Play button hit + tone arm moved");
      toneArmOnSoundeffect.play();
      vinylSoundeffect.play();
      song.play();
    }
  }, [toneArmFinished]);

  useEffect(() => {
    toneArmOnSoundeffect.volume = volume;
    song.volume = volume;
  }, [volume]);

  // ANIMATIONS
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

  // Once clicked, zoom-in mode for turntable
  const ttScaleSpring = useSpring({
    scale: hovering && !focused ? 1.35 : 1.3,
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

  return (
    <>
      <Camera
        turntablePosition={[0, -0.24, 0]}
        camera={camera}
        mouse={mouse}
        enableLookAt={enableLookAt}
        setEnableLookAt={setEnableLookAt}
        // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
        position={position}
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
          // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
          scale={ttScaleSpring.scale}
          // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
          rotation={ttRotationSpring.rotation}
          // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)          
          position={ttPositionSpring.position}
          setToneArmFinished={setToneArmFinished}
        />
      </Float>
      {/* <Words opacity={opacity} /> */}
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
