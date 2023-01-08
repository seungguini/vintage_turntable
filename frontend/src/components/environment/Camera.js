import { animated } from "@react-spring/three";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";

const Camera = ({
  turntablePosition,
  enableLookAt,
  setEnableLookAt,
  camera,
  mouse,
  position,
  focused,
}) => {
  const ref = useRef();

  const vec = new THREE.Vector3();

  let lookAtFlag = true;

  const cameraMovementScale = 2;

  useFrame(() => {
    if (!focused) {
      camera.position.lerp(
        vec.set(
          mouse.x * cameraMovementScale,
          mouse.y * cameraMovementScale,
          camera.position.z
        ),
        0.02
      );
    }

    if (enableLookAt) {
      camera.lookAt(
        turntablePosition[0],
        turntablePosition[1],
        turntablePosition[2]
      );
    }

    // console.log(position);
  });

  // Animate initial camera movement
  const AnimatedPerspectiveCamera = animated(PerspectiveCamera);

  // const cameraPath = [
  //   [15, 6, 10],
  //   [0, 0, 8],
  // ];

  // const { position } = useSprings(
  //   cameraPath.length,
  //   cameraPath.map((path) => ({
  //     position: path,
  //     config: {
  //       duration: 10000,
  //       easing: easings.easeInOutSine,
  //     },
  //     onResolve: () => {
  //       setEnableLookAt(false); // Disable lookat so camera can follow mouse
  //     },
  //   }))
  // );

  return (
    <>
      <AnimatedPerspectiveCamera
        ref={ref}
        makeDefault
        fov={50}
        position={position}
      />
    </>
  );
};

export default Camera;
