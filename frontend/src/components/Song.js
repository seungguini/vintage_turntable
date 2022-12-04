import React, { useEffect, useState } from "react";
import { Text3D } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";
import { v4 as uuidv4 } from "uuid";

import songData from "../utils.js";
const toneArmOnSoundeffect = new Audio("/soundeffects/tonearm_on_sound.mp3");
toneArmOnSoundeffect.volume = 0.4;
const vinylSoundeffect = new Audio("/soundeffects/vinyl_soundeffect.mp3");
vinylSoundeffect.volume = 1;
vinylSoundeffect.loop = true;

export default function Song({
  playing,
  setPlaying,
  toneArmFinished,
  soundOn,
  songIndex,
}) {
  const songInfoTextX = -3.2;
  const songInfoTextY = 1.4;
  const songInfoTextZ = 4;

  const [songs, setSongs] = useState(songData); // List of songs
  const [currentSong, setCurrentSong] = useState(songs[0]);
  // const [currentSong, setCurrentSong] = useState({
  //   name: "Beaver Creek",
  //   cover:
  //     "https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg",
  //   artist: "Aso, Middle School, Aviino",
  //   audio: "Beaver Creek.mp3",
  //   color: ["#205950", "#2ab3bf"],
  //   id: uuidv4(),
  //   active: true,
  // });

  // Handle change in song
  useEffect(() => {
    console.log("CHANGING SONG");
    currentAudio.pause();
    setPlaying(false);
    setCurrentSong(songs[songIndex]);
  }, [songIndex]);

  useEffect(() => {
    console.log(currentSong);
    if (currentSong["audio"]) {
      setCurrentAudio(
        new Audio(process.env.PUBLIC_URL + "/songs/" + currentSong["audio"])
      );
      console.log(currentAudio);
    }
  }, [currentSong]);

  useEffect(() => {
    setCurrentSong(songs[0]);
  }, [songs]);

  const [currentAudio, setCurrentAudio] = useState(
    new Audio(process.env.PUBLIC_URL + "/songs/Daylight.mp3")
  );

  useEffect(() => {
    window.console.log("sound on");
    console.log(soundOn);
    if (!soundOn) {
      toneArmOnSoundeffect.volume = 0;
      currentAudio.volume = 0;
    } else {
      toneArmOnSoundeffect.volume = 1;
      currentAudio.volume = 0.08;
    }
  }, [soundOn]);

  useEffect(() => {
    if (!playing) {
      console.log("PAUSING AUDIO");
      currentAudio.pause();
      toneArmOnSoundeffect.play();
      vinylSoundeffect.pause();
    }
  }, [playing, currentAudio]);

  useEffect(() => {
    if (playing & toneArmFinished) {
      console.log("Play button hit + tone arm moved");
      toneArmOnSoundeffect.play();
      vinylSoundeffect.play();
      currentAudio.play();
    }
  }, [toneArmFinished]);

  const AnimatedText = animated(Text3D);
  const { opacity } = useSpring({
    opacity: playing ? 1 : 0,
    config: {
      duration: 1000,
    },
  });
  return (
    <>
      <AnimatedText
        font={process.env.PUBLIC_URL + "/fonts/Roboto_Regular.json"}
        size={0.3}
        height={0.065}
        curveSegments={12}
        position={[songInfoTextX, songInfoTextY, songInfoTextZ]}
        rotation={[0.5, 0.5, -0.25]}
      >
        {currentSong.name}
        <animated.meshStandardMaterial
          color={[0.68, 0.77, 0.81]}
          emissive={[1, 0.1, 0]}
          transparent={true}
          opacity={opacity}
        />
      </AnimatedText>
      <AnimatedText
        font={process.env.PUBLIC_URL + "/fonts/Roboto_Regular.json"}
        size={0.1}
        height={0.065}
        curveSegments={12}
        position={[songInfoTextX, songInfoTextY - 0.3, songInfoTextZ]}
        rotation={[0.5, 0.5, -0.25]}
      >
        {currentSong.artist}
        <animated.meshStandardMaterial
          color={[0.68, 0.77, 0.81]}
          emissive={[1, 0.1, 0]}
          transparent={true}
          opacity={opacity}
        />
      </AnimatedText>
    </>
  );
}
