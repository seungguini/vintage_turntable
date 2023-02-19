import { animated, useSpring, config } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import React from "react";

import { useEffect, useState } from "react";

interface SpringProps {
  scaleNormal?: number,
  scalePressed?: number,
  scaleHovering?: number,
  config?: {
    tension: number,
    friction: number
  }
}

const DEFAULT_SPRING_VALUES : SpringProps = {
  scaleNormal: 0.03,
  scalePressed: 0.025,
  scaleHovering: 0.032,
  config: {
    tension: config.gentle.tension,
    friction: config.gentle.friction
  }
}

interface ButtonProps {
  id: string,
  modelPath: string
  position: Array<number>
  rotation: Array<number>
  modelPathAlternative?: string
  spring?: SpringProps,
}

export default function Button({
  id,
  modelPath,
  position,
  rotation,
  modelPathAlternative = modelPath, // Optional
  spring = DEFAULT_SPRING_VALUES,
} : ButtonProps) {
  const [pressed, setPressed] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);
  const [showDefaultModel, setShowDefaultModel] = useState<boolean>(true);
  let modelDefault = useGLTF(modelPath).scene; // Type is insane
  let modelAlternate = useGLTF(modelPathAlternative).scene; // Type is insane

  const clickHandler = () => {
    setPressed(true);
  };

  const unclickHandler = () => {
    setPressed(false);
    if (modelPath !== modelPathAlternative) {
      setShowDefaultModel(!showDefaultModel);
    }
  };

  const { scale } = useSpring({
    scale: !pressed ? (!hovering ? spring.scaleNormal : spring.scaleHovering) : spring.scalePressed,
    config: spring.config,
  })

  useEffect(() => {
    document.body.style.cursor = hovering ? "pointer" : "auto"; // change pointer to finger when hovered
  }, [hovering]);

  return (
    <>
    {/* @ts-ignore: https://github.com/pmndrs/react-spring/issues/1515 */}
    <animated.primitive
        position={position}
        rotation={rotation}
        scale={scale}
        object={showDefaultModel ? modelDefault : modelAlternate}
        onPointerDown={clickHandler}
        onPointerUp={unclickHandler}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
      />
    </>
  );

}
