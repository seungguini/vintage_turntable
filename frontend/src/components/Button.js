//  Base component for all button styles

import { animated, useSpring } from "@react-spring/three";
import { useFBX, useGLTF } from "@react-three/drei";

import { useEffect, useState } from "react";

export default function Button({
  scaleNormal,
  scalePressed,
  hoveringScale,
  springConfig,
  switchButton,
  setSwitchButton,
  modelPath1,
  modelPath2, // Optional
  position,
  rotation,
  additionalUnclickHandler,
  additionalUnclickHandlerConfigs,
}) {
  const [pressed, setPressed] = useState(false);
  const [hovering, setHovering] = useState(false);
  let model1 = useGLTF(modelPath1).scene;
  let model2 = useGLTF(modelPath2).scene;

  const clickHandler = () => {
    setPressed(true);
  };

  const unclickHandler = () => {
    setPressed(false);

    if (setSwitchButton) setSwitchButton(!switchButton);

    if (additionalUnclickHandler) {
      additionalUnclickHandler(additionalUnclickHandlerConfigs);
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
      object={switchButton ? model1 : model2}
      onPointerDown={clickHandler}
      onPointerUp={unclickHandler}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
    />
  );
}
