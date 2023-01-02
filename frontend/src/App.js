import "./App.css";
import React, { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";

// Load turntable 3D model
import MainView from "./components/MainView";
import LocalSongPlayer from "./components/LocalSongPlayer";
import songData from "./utils";
import Set from "./components/Set";
import MenuButtons from "./components/MenuButtons";
import MenuView from "./components/MenuView";
import SongInfo from "./components/SongInfo";
import SongItem from "./components/SongItem";

const COVERPICSURLS = [
  "Beaver Creek.jpg",
  "Daylight.jpg",
  "Keep Going.jpg",
  "Nightfall.jpg",
  "Reflection.jpg",
  "Under the City Stars.jpg",
];

const Scene = () => {
  // STATES

  // 1. Playback Control States
  const [playing, setPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [toneArmFinished, setToneArmFinished] = useState(false);

  // 2. Song States
  const [coverPicUrl, setCoverPicUrl] = useState(COVERPICSURLS[0]);
  const [songIndex, setSongIndex] = useState(0);
  const [songs, setSongs] = useState(songData); // List of songs
  const [currentSong, setCurrentSong] = useState(songs[0]);

  // 3. UI / UX States
  const [seeMenu, setSeeMenu] = useState(false); // Menu mode
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
      <Set
        camera={camera}
        mouse={mouse}
        enableLookAt={enableLookAt}
        setEnableLookAt={setEnableLookAt}
        seeMenu={seeMenu}
      />
      <LocalSongPlayer
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        playing={playing}
        setPlaying={setPlaying}
        toneArmFinished={toneArmFinished}
        soundOn={soundOn}
        songIndex={songIndex}
        songs={songs}
      />
      <MainView
        playing={playing}
        setPlaying={setPlaying}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
        songIndex={songIndex}
        setSongIndex={setSongIndex}
        seeMenu={seeMenu}
        setSeeMenu={setSeeMenu}
        toneArmFinished={toneArmFinished}
        setToneArmFinished={setToneArmFinished}
        coverPicUrl={coverPicUrl}
      />
      <MenuView songs={songs} setSeeMenu={setSeeMenu} />
      {/* <SongItem song={songs[0]} position={[0, 0, 0]} /> */}
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
