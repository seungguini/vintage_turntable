import { animated } from "@react-spring/three";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

interface CameraProps {
  turntablePosition: Array<number>
  enableLookAt: boolean
  setEnableLookAt: boolean
  camera: THREE.Camera
  mouse: THREE.Vector2
  position: THREE.Vector3
  focused: boolean
}

export default function Camera({
  turntablePosition,
  enableLookAt,
  setEnableLookAt,
  camera,
  mouse,
  position,
  focused,
} : CameraProps) {
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
}