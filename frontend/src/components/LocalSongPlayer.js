import React, { useEffect, useState } from "react";
import { Text3D } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

import data from "../utils";
import SongInfo from "./SongInfo";
import AlbumPicture from "./AlbumPicture";
const toneArmOnSoundeffect = new Audio("/soundeffects/tonearm_on_sound.mp3");
toneArmOnSoundeffect.volume = 0.4;
const vinylSoundeffect = new Audio("/soundeffects/vinyl_soundeffect.mp3");
vinylSoundeffect.volume = 1;
vinylSoundeffect.loop = true;

// Player component which manages playback for the song.
// Local mp3 files || Spotify stream
export default function LocalSongPlayer({
  currentSong,
  setCurrentSong,
  playing,
  setPlaying,
  toneArmFinished,
  soundOn,
  songIndex,
  songs,
}) {
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

  return <></>;
}
