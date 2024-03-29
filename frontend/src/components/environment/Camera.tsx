import { animated, useSpring, easings } from "@react-spring/three";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";

interface CameraProps {
  turntablePosition: Array<number>
}

export default function Camera({
  turntablePosition,
} : CameraProps) {


  // ANIMATIONS
  const [enableLookAt, setEnableLookAt] = useState(true);

  const { camera, mouse } = useThree();

  const vec = new THREE.Vector3();

  const cameraMovementScale = 1.1;

  useFrame(() => {

    camera.position.lerp(
      vec.set(
        mouse.x * cameraMovementScale,
        mouse.y * cameraMovementScale,
        camera.position.z
      ),
      0.02
    );

    // During landing page animation sequence
    // camera looks at the turntable.
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
        makeDefault
        fov={50}
        // See https://github.com/pmndrs/react-spring/issues/1302#issuecomment-1404664605
        // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
        position={position}
      />
    </>
  );
}
