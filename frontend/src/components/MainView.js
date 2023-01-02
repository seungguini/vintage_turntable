import { Float, PresentationControls } from "@react-three/drei";
import React, { useState } from "react";
import Buttons from "./Buttons";
import Turntable from "./Turntable";

export default function MainView({
  playing,
  setPlaying,
  soundOn,
  setSoundOn,
  songIndex,
  setSongIndex,
  seeMenu,
  setSeeMenu,
  toneArmFinished,
  setToneArmFinished,
  coverPicUrl,
}) {
  return (
    <>
      <Float
        speed={1} // Animation speed, defaults to 1
        rotationIntensity={0.4} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-0.2, 0.2]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Turntable
          playing={playing}
          toneArmFinished={toneArmFinished}
          setToneArmFinished={setToneArmFinished}
          coverPicUrl={coverPicUrl}
        />
      </Float>
      <Buttons
        position={[0, -0.5, 5.5]}
        playing={playing}
        setPlaying={setPlaying}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
        songIndex={songIndex}
        setSongIndex={setSongIndex}
        seeMenu={seeMenu}
        setSeeMenu={setSeeMenu}
      />
    </>
  );
}
