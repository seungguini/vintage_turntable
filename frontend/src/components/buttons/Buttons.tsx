
import React from "react";
import { config } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";

import Button from "./Button";
import { useIsPlaying, usePlaybackActions } from "../../states";

useGLTF.preload("/prev_button.glb");

export default function Buttons() {
  const scaleNormal = 0.03;
  const scalePressed = 0.025;
  const hoveringScale = 0.032;
  const springConfig = config.gentle;

  const isPlaying = useIsPlaying();
  const { play, pause, mute, unmute, isMute } = usePlaybackActions();

  // Handlers define the action of a button
  const playClickHandler = () => {
    if (isPlaying) {
      pause()
      console.log("setting Zustand pause")
    } else {
      play()
      console.log("setting Zustand play")
    }
  };

  const soundClickHandler = () => {
    if (isMute()) {
      unmute()
    } else {
      mute()
    }
  };

  return (
    <>
      <Button
        id="soundOnOffButton"
        scaleNormal={scaleNormal}
        scalePressed={scalePressed}
        hoveringScale={hoveringScale}
        springConfig={springConfig}
        switchButton={true}
        modelPathOne={"/models/buttons/soundon_button.glb"}
        modelPathTwo={"/models/buttons/soundoff_button.glb"}
        position={[2, -1, 4]}
        rotation={[0.5, 0.5, -0.25]}
        actionHandler={soundClickHandler}
      />
      <Button
        id="playPauseButton"
        scaleNormal={scaleNormal}
        scalePressed={scalePressed}
        hoveringScale={hoveringScale}
        springConfig={springConfig}
        switchButton={true}
        modelPathOne={"/models/buttons/play_button.glb"}
        modelPathTwo={"/models/buttons/pause_button.glb"}
        position={[0, -1, 4]}
        rotation={[0.5, 0.5, -0.25]}
        actionHandler={playClickHandler}
        
      />

      <Button
        id="nextButton"
        scaleNormal={scaleNormal}
        scalePressed={scalePressed}
        hoveringScale={hoveringScale}
        springConfig={springConfig}
        switchButton={true}
        modelPathOne={"/models/buttons/next_button.glb"}
        modelPathTwo={"/models/buttons/next_button.glb"}
        position={[1, -1, 4]}
        rotation={[0.5, 0.5, -0.25]}
        actionHandler={() => {}}
      />
      <Button
        id="prevButton"
        scaleNormal={scaleNormal}
        scalePressed={scalePressed}
        hoveringScale={hoveringScale}
        springConfig={springConfig}
        switchButton={true}
        modelPathOne={"/models/buttons/prev_button.glb"}
        modelPathTwo={"/models/buttons/prev_button.glb"}
        position={[-1, -1, 4]}
        rotation={[0.5, 0.5, -0.25]}
        actionHandler={() => {}}

      />
      <Button
        id="homeButton"
        scaleNormal={0.8}
        scalePressed={0.7}
        hoveringScale={0.9}
        springConfig={springConfig}
        switchButton={true}
        modelPathOne={"/models/buttons/home_button.glb"}
        modelPathTwo={"/models/buttons/home_button.glb"}
        position={[-1.85, -0.65, 4.5]}
        rotation={[Math.PI * 0.12, Math.PI * 0.16, -Math.PI * 0.08]}
        actionHandler={
          () => {
            window.open("https://github.com/seungguini/vintage_turntable");
          }
        }
        
      />
    </>
  );
}
