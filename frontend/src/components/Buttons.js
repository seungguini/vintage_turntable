import React from "react";

import { config } from "@react-spring/three";
import Button from "./Button";
export default function Buttons({ playing, setPlaying, soundOn, setSoundOn }) {
  const scaleNormal = 0.03;
  const scalePressed = 0.025;
  const springConfig = config.bouncy;

  // Additional unclick handler for play button
  const playUnclickHandler = ({ setPlaying, playing }) => {
    setPlaying(!playing);
  };

  // Additional unclick handler for sound button
  const soundUnclickHandler = ({ setSoundOn, soundOn }) => {
    setSoundOn(!soundOn);
  };

  return (
    <>
      <Button
        id="playPauseButton"
        scaleNormal={scaleNormal}
        scalePressed={scalePressed}
        springConfig={springConfig}
        switchButton={true}
        modelPath1={"/models/buttons/play_button.glb"}
        modelPath2={"/models/buttons/pause_button.glb"}
        position={[0, -1, 4]}
        rotation={[0.5, 0.5, -0.25]}
        onPointerUp={() => {
          console.log("POINTR UP PLAYYYY");
          setPlaying(!playing);
        }}
        additionalUnclickHandler={playUnclickHandler}
        additionalUnclickHandlerConfigs={{ setPlaying, playing }}
      />
      <Button
        id="soundOnOffButton"
        scaleNormal={scaleNormal}
        scalePressed={scalePressed}
        springConfig={springConfig}
        switchButton={true}
        modelPath1={"/models/buttons/soundon_button.glb"}
        modelPath2={"/models/buttons/soundoff_button.glb"}
        position={[2, -1, 4]}
        rotation={[0.5, 0.5, -0.25]}
        onPointerUp={() => setSoundOn(!soundOn)}
      />
      <Button
        id="nextButton"
        scaleNormal={scaleNormal}
        scalePressed={scalePressed}
        springConfig={springConfig}
        switchButton={true}
        modelPath1={"/models/buttons/next_button.glb"}
        modelPath2={"/models/buttons/next_button.glb"}
        position={[1, -1, 4]}
        rotation={[0.5, 0.5, -0.25]}
      />
      <Button
        id="prevButton"
        scaleNormal={scaleNormal}
        scalePressed={scalePressed}
        springConfig={springConfig}
        modelPath1={"/models/buttons/prev_button.glb"}
        modelPath2={"/models/buttons/prev_button.glb"}
        position={[-1, -1, 4]}
        rotation={[0.5, 0.5, -0.25]}
      />
    </>
  );
}
