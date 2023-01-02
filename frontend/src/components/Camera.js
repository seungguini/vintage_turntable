import { animated, easings, useSpring } from "@react-spring/three";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Camera = ({
  turntablePosition,
  enableLookAt,
  setEnableLookAt,
  camera,
  mouse,
  focused,
  seeMenu,
}) => {
  const ref = useRef();

  const vec = new THREE.Vector3();

  const cameraMovementScale = 0.7;

  const { position } = useSpring({
    // react-spring
    from: {
      position: [15, 6, 10],
    },
    to: {
      position: [0, 0, 9],
    },
    config: {
      duration: 5000,
      easing: easings.easeInOutSine,
    },
    onResolve: () => {
      setEnableLookAt(false); // Disable lookat so camera can follow mouse
    },
  });

  // Animate camera to menu location
  const menuRotationSpring = useSpring({
    rotation: !seeMenu ? [0, 0, 0] : [0, -Math.PI * 0.5, 0],
    config: {
      duration: 500,
      easing: easings.easeInOutSine,
    },
  });

  useEffect(() => {
    console.log("SEE MENU");
    console.log(seeMenu);
  }, [seeMenu]);

  useFrame(() => {
    // if (!focused & !seeMenu) {
    //   camera.position.lerp(
    //     vec.set(
    //       mouse.x * cameraMovementScale,
    //       mouse.y * cameraMovementScale,
    //       camera.position.z
    //     ),
    //     0.007
    //   );
    // }

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
      {/* <OrbitControls /> */}
      <AnimatedPerspectiveCamera
        ref={ref}
        makeDefault
        fov={50}
        position={position}
        rotation={menuRotationSpring.rotation}
      />
    </>
  );
};

export default Camera;
