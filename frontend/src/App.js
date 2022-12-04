import "./App.css";
import React, { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { v4 as uuidv4 } from "uuid";

import {
  Environment,
  Float,
  PresentationControls,
  Sparkles,
} from "@react-three/drei";

// Load turntable 3D model
import Turntable from "./components/Turntable";
import Camera from "./components/Camera";

import Buttons from "./components/Buttons";
import Song from "./components/Song";
import Lights from "./components/Lights";

const COVERPICSURLS = ["Aiguille.jpg", "CanaryForest.jpg", "Sworn.jpg"];

const Scene = () => {
  // States
  // const [turntablePosition, setTurntablePosition] = useState([0, -0.24, 0]);

  const [playing, setPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [toneArmFinished, setToneArmFinished] = useState(false);
  const [coverPicUrl, setCoverPicUrl] = useState("Aiguille.jpg");

  const [seeMenu, setSeeMenu] = useState(false); // Menu mode
  const [songIndex, setSongIndex] = useState(0);
  const [enableLookAt, setEnableLookAt] = useState(true);

  const { camera, mouse } = useThree();

  useEffect(() => {
    console.log("Updating cover pic!");
    setCoverPicUrl(COVERPICSURLS[songIndex % 3]);
  }, [songIndex]);

  const playingSongInfoSpring = useSpring({
    opacity: playing ? 1 : 0,
    config: {
      duration: 1000,
    },
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
        focused={focused}
        seeMenu={seeMenu}
      />
      <Lights />
      <Sparkles count={2000} scale={25} size={2} />
      <Song
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        playing={playing}
        setPlaying={setPlaying}
        toneArmFinished={toneArmFinished}
        soundOn={soundOn}
        songIndex={songIndex}
        coverPicUrl={coverPicUrl}
        position={[-3, 2.5, 0]}
      />

      <Float
        speed={1} // Animation speed, defaults to 1
        rotationIntensity={0.4} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.05} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-0.2, 0.2]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Turntable
          playing={playing}
          toneArmFinished={toneArmFinished}
          setToneArmFinished={setToneArmFinished}
          coverPicUrl={coverPicUrl}
        />
      </Float>
      <SongInfo
        playing={playing}
        currentSong={currentSong}
        position={[-1, -1, 6.5]}
        opacity={playingSongInfoSpring.opacity}
      />

      {/* <Words opacity={opacity} /> */}
      {/* <SongMenuItem coverPicUrl={coverPicUrl} /> */}

      <Buttons
        position={[0, -0.4, 5.3]}
        playing={playing}
        setPlaying={setPlaying}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
        songIndex={songIndex}
        setSongIndex={setSongIndex}
        seeMenu={seeMenu}
        setSeeMenu={setSeeMenu}
      />
      <MenuButtons
        position={[3, 0, 8]}
        rotation={[0, Math.PI * 0.5, 0]}
        setSeeMenu={setSeeMenu}
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
