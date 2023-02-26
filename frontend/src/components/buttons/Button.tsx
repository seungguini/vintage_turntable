import { animated, useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import React from "react";

import { useEffect, useState } from "react";


interface ButtonProps {
  id: string,
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
  actionHandler: () => void,
  
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
  actionHandler,
} : ButtonProps) {
  const [isShrunk, setShrunk] = useState<boolean>(false);
  const [isHovering, setHovering] = useState<boolean>(false);
  const [showModelOne, setShowModelOne] = useState<boolean>(true);
  let modelOne = useGLTF(modelPathOne).scene; // Type is insane
  let modelTwo = useGLTF(modelPathTwo).scene; // Type is insane

  const clickHandler = () => {
    setShrunk(true)
  }

  const unclickHandler = () => { 
    setShrunk(false)
    actionHandler()
    if (switchButton) {
      setShowModelOne(!showModelOne);
    }
  }


  const { scale } = useSpring({
    scale: !isShrunk ? (!isHovering ? scaleNormal : hoveringScale) : scalePressed,
    config: springConfig,
  })

  useEffect(() => {
    document.body.style.cursor = isHovering ? "pointer" : "auto"; // change pointer to finger when hovered
  }, [isHovering]);

  return (
    <>
    {/* @ts-ignore: https://github.com/pmndrs/react-spring/issues/1515 */}
    <animated.primitive
        position={position}
        rotation={rotation}
        scale={scale}
        object={switchButton ? (showModelOne ? modelOne : modelTwo) : modelOne}
        onPointerDown={clickHandler}
        onPointerUp={unclickHandler}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
      />
    </>
  );

}



