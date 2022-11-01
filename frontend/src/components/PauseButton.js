import { animated, useSpring } from "@react-spring/three";
import { useFBX, useGLTF } from "@react-three/drei";

import React, { useState } from "react";

export default function PlayPauseButton({ playing, setPlaying }) {
  const [pressed, setPressed] = useState(false);

  let playGltf = useGLTF("/models/buttons/play_button.glb");

  let pauseGltf = useGLTF("/models/buttons/pause_button.glb");

  const { scale } = useSpring({
    scale: !pressed ? 0.03 : 0.025,
  });

  const clickHandler = () => {
    setPressed(true);
  };

  const unclickHandler = () => {
    setPlaying(!playing);

    setPressed(false);
  };

  return (
    <animated.primitive
      position={[0, -1, 4]}
      rotation={[0.5, 0.5, -0.25]}
      scale={scale}
      object={playing ? pauseGltf.scene : playGltf.scene}
      onPointerDown={clickHandler}
      onPointerUp={unclickHandler}
    />
  );
}
