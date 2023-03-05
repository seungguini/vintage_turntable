import { animated, useSpring, easings } from "@react-spring/three";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

interface CameraProps {
  turntablePosition: Array<number>
  enableLookAt: boolean
  setEnableLookAt: (to: boolean) => void
  camera: THREE.Camera
  mouse: THREE.Vector2
  focused: boolean
}

export default function Camera({
  turntablePosition,
  enableLookAt,
  setEnableLookAt,
  camera,
  mouse,
  focused,
} : CameraProps) {
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

  const AnimatedPerspectiveCamera = animated(PerspectiveCamera);

  const { position } = useSpring({
    // react-spring
    from: {
      position: [15, 6, 10],
    },
    to: {
      position: [0, 0, 8],
    },
    config: {
      duration: 5000,
      easing: easings.easeInOutSine,
    },
    onResolve: () => {
      setEnableLookAt(false); // Disable lookat so camera can follow mouse
    },
  });


  return (
    <>
      <AnimatedPerspectiveCamera
        ref={ref}
        makeDefault
        fov={50}
        // See https://github.com/pmndrs/react-spring/issues/1302#issuecomment-1404664605
        // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
        position={position}
      />
    </>
  );
}
