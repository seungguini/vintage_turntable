import { animated, useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import * as THREE from 'three'
import React from "react";

import { useEffect, useState } from "react";

type AdditionalUnclickHandlerFuncParameters = {
  [key: string]: () => void | boolean
}

interface ButtonProps {
  id: string
  scaleNormal: number
  scalePressed: number
  hoveringScale: number
  springConfig: {
    tension: number,
    friction: number
  }
  switchButton: boolean
  modelPathOne: string
  modelPathTwo: string // Optional
  position: Array<number>
  rotation: Array<number>
  additionalUnclickHandler: (
    {}: AdditionalUnclickHandlerFuncParameters | any
  ) => void
  additionalUnclickHandlerConfigs: AdditionalUnclickHandlerFuncParameters | any
}

export default function Button({
  id,
  scaleNormal,
  scalePressed,
  hoveringScale,
  springConfig,
  switchButton,
  modelPathOne,
  modelPathTwo, // Optional
  position,
  rotation,
  additionalUnclickHandler,
  additionalUnclickHandlerConfigs,
} : ButtonProps) {
  const [pressed, setPressed] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);
  const [showModelOne, setShowModelOne] = useState<boolean>(true);
  let modelOne = useGLTF(modelPathOne).scene; // Type is insane
  let modelTwo = useGLTF(modelPathTwo).scene; // Type is insane

  const clickHandler = () => {
    setPressed(true);
  };

  const unclickHandler = () => {
    setPressed(false);
    if (switchButton) {
      setShowModelOne(!showModelOne);
    }

    if (additionalUnclickHandler) {
      additionalUnclickHandler(additionalUnclickHandlerConfigs);
    }
  };

  const { scale } = useSpring({
    scale: !pressed ? (!hovering ? scaleNormal : hoveringScale) : scalePressed,
    config: springConfig,
  })

  useEffect(() => {
    document.body.style.cursor = hovering ? "pointer" : "auto"; // change pointer to finger when hovered
  }, [hovering]);

  return (
    <primitive
      position={position}
      rotation={rotation}
      scale={scale}
      object={switchButton ? (showModelOne ? modelOne : modelTwo) : modelOne}
      onPointerDown={clickHandler}
      onPointerUp={unclickHandler}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
    ></primitive>
  );

}