import { animated } from "@react-spring/three";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

const Camera = ({
  turntablePosition,
  enableLookAt,
  camera,
  mouse,
  position,
  focused,
}) => {
  const ref = useRef();

  const vec = new THREE.Vector3();

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
