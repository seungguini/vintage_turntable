//  Base component for all button styles

import { animated, useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";

import { useEffect, useState } from "react";

export default function Button({
  scaleNormal,
  scalePressed,
  hoveringScale,
  springConfig,
  switchButton,
  modelPath1,
  modelPath2, // Optional
  position,
  rotation,
  additionalUnclickHandler,
}) {
  const [pressed, setPressed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [showModel1, setShowModel1] = useState(true);
  let model1 = useGLTF(modelPath1).scene;
  let model2 = useGLTF(modelPath2).scene;

  const clickHandler = () => {
    setPressed(true);
  };

  const unclickHandler = () => {
    setPressed(false);
    if (switchButton) {
      setShowModel1(!showModel1);
    }

    if (additionalUnclickHandler) {
      additionalUnclickHandler();
    }
  };

  const { scale } = useSpring({
    scale: !pressed ? (!hovering ? scaleNormal : hoveringScale) : scalePressed,
    config: springConfig,
  });

  useEffect(() => {
    document.body.style.cursor = hovering ? "pointer" : "auto"; // change pointer to finger when hovered
  }, [hovering]);

  return (
    <animated.primitive
      position={position}
      rotation={rotation}
      scale={scale}
      object={switchButton ? (showModel1 ? model1 : model2) : model1}
      onPointerDown={clickHandler}
      onPointerUp={unclickHandler}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
    />
  );
}
