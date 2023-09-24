import React from "react";
import { useGLTF } from "@react-three/drei";

import Button from "./Button";
import { useIsPlaying, usePlaybackActions } from "../../states/playbackStore";

useGLTF.preload("/prev_button.glb");

export default function Buttons() {

  const isPlaying: boolean = useIsPlaying();
  const { play, pause, mute, unmute, isMute, nextSong, prevSong } = usePlaybackActions();

  // Handlers define the action of a button
  const playClickHandler = (): void => {
    if (isPlaying) {
      pause()
      console.log("setting Zustand pause")
    } else {
      play()
      console.log("setting Zustand play")
    }
  };

  const soundClickHandler = (): void => {
    if (isMute()) {
      unmute()
    } else {
      mute()
    }
  };

  const nextClickHandler = (): void => {
    nextSong()
  }


  const prevClickHandler = (): void => {
    prevSong()
  }

  return (
    <>
      <Button
        id="soundOnOffButton"
        modelPath={"/models/buttons/soundon_button.glb"}
        modelPathAlternative={"/models/buttons/soundoff_button.glb"}
        position={[2, -1, 4]}
        rotation={[0.5, 0.5, -0.25]}
        actionHandler={soundClickHandler}
      />
      <Button
        id="playPauseButton"
        modelPath={"/models/buttons/play_button.glb"}
        modelPathAlternative={"/models/buttons/pause_button.glb"}
        position={[0, -1, 4]}
        rotation={[0.5, 0.5, -0.25]}
        actionHandler={playClickHandler}
      />

      <Button
        id="nextButton"
        modelPath={"/models/buttons/next_button.glb"}
        position={[1, -1, 4]}
        rotation={[0.5, 0.5, -0.25]}
        actionHandler={nextClickHandler}
      />
      <Button
        id="prevButton"
        modelPath={"/models/buttons/prev_button.glb"}
        position={[-1, -1, 4]}
        rotation={[0.5, 0.5, -0.25]}
        actionHandler={prevClickHandler}
      />
      <Button
        id="homeButton"
        modelPath={"/models/buttons/home_button.glb"}
        position={[-1.85, -0.65, 4.5]}
        rotation={[Math.PI * 0.12, Math.PI * 0.16, -Math.PI * 0.08]}
        spring={{
          scaleNormal: 0.8, //Override defaults
          scalePressed: 0.7,
          scaleHovering: 0.9
          // Using default values for config
        }}
        actionHandler={
          () => {
            window.open("https://github.com/seungguini/vintage_turntable");
          }
        }
        
      />
    </>
  );
}
