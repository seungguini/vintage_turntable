/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { animated } from "@react-spring/three";
import { useIsPlaying } from "../../states";

export default function Turntable({
  setHovering,
  hovering,
  setFocused,
  scale,
  rotation,
  position,
  playing,
  setToneArmFinished,
}) {
  const group = useRef();
  const modelLocation = "/models/turntable.glb";
  const turntable = useGLTF(modelLocation);
  const { nodes, materials, animations } = turntable;
  console.log("printing nodes!");
  console.log(nodes);
  const { actions } = useAnimations(animations, group);

  // States + actions from the playbackStore
  const isPlaying = useIsPlaying();

  // Animations
  useEffect(() => {
    const toneArmAction = actions["Tone ArmAction.003"];

    toneArmAction.clampWhenFinished = true;
    toneArmAction.paused = true;
    toneArmAction.timeScale = 1;
    toneArmAction.setLoop(THREE.LoopOnce, 1);
    toneArmAction.play();
  }, []);

  useEffect(() => {
    setToneArmFinished(false);
    const toneArmAction = actions["Tone ArmAction.003"];
    console.log(toneArmAction);
    if (playing) {
      toneArmAction.setEffectiveTimeScale(1);
      toneArmAction.paused = false;
      toneArmAction.clampWhenFinished = true;
    } else {
      toneArmAction.setEffectiveTimeScale(-1);
      toneArmAction.paused = false;
      toneArmAction.clampWhenFinished = true;
    }

    toneArmAction._mixer.addEventListener("finished", () => {
      setToneArmFinished(true);
    });
  }, [playing]);

  useEffect(() => {
    document.body.style.cursor = hovering ? "pointer" : "auto"; // change pointer to finger when hovered
  }, [hovering]);

  // Event handler when hovering over Turntable
  const turntableHoverEnter = () => {
    console.log("Hovering over turntable");

    // Set state
    setHovering(true);
  };

  const turntableHoverLeave = () => {
    console.log("Leaving turntable hover");
    setHovering(false);
  };

  const turntableClick = () => {
    setFocused(true);
  };

  const turntableMiss = () => {
    setFocused(false);
  };

  return (
    <animated.group
      scale={scale}
      rotation={rotation}
      position={position}
      ref={group}
      // {...props}
      dispose={null}
      onPointerEnter={turntableHoverEnter}
      onPointerLeave={turntableHoverLeave}
      onPointerDown={turntableClick}
      onPointerMissed={turntableMiss}
    >
      <group name="Scene">
        <group name="Plinth" position={[-0.62, 0, -0.86]}>
          <mesh
            name="Cube"
            castShadow
            receiveShadow
            geometry={nodes.Cube.geometry}
            material={nodes.Cube.material}
          />
          <mesh
            name="Cube_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube_1.geometry}
            material={nodes.Cube_1.material}
          />
          <mesh
            name="Cube_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube_2.geometry}
            material={materials["Body- Edges"]}
          />
        </group>
        <group
          name="Case_Cover"
          position={[-0.02, 0.34, -1.66]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1, 0.79, 1]}
        >
          <mesh
            name="Cube001"
            castShadow
            receiveShadow
            geometry={nodes.Cube001.geometry}
            material={nodes.Cube001.material}
          />
          <mesh
            name="Cube001_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube001_1.geometry}
            material={materials["Intter Yellow"]}
          />
          <mesh
            name="Cube001_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube001_2.geometry}
            material={materials["Material.001"]}
          />
        </group>
        <mesh
          name="Record"
          castShadow
          receiveShadow
          geometry={nodes.Record.geometry}
          material={nodes.Record.material}
          position={[-0.33, -0.7, -0.52]}
          scale={0.97}
        />
        <mesh
          name="Platter"
          castShadow
          receiveShadow
          geometry={nodes.Platter.geometry}
          material={nodes.Platter.material}
          position={[-0.33, -0.66, -0.52]}
          scale={[0.76, 0.98, 0.76]}
        />
        <mesh
          name="Center_Swivel_Album"
          castShadow
          receiveShadow
          geometry={nodes.Center_Swivel_Album.geometry}
          material={nodes.Center_Swivel_Album.material}
          position={[-0.33, -0.57, -0.52]}
          scale={0.97}
        />
        <mesh
          name="Album_inner_cover"
          castShadow
          receiveShadow
          geometry={nodes.Album_inner_cover.geometry}
          material={materials["Album Red"]}
          position={[-0.33, 0.16, -0.52]}
          scale={0.23}
        />
        <mesh
          name="Record003"
          castShadow
          receiveShadow
          geometry={nodes.Record003.geometry}
          material={materials["Album Inner"]}
          position={[-0.33, 0.71, -0.52]}
          scale={[0.46, 0.23, 0.46]}
        />
        <mesh
          name="Arm_Top_Base"
          castShadow
          receiveShadow
          geometry={nodes.Arm_Top_Base.geometry}
          material={nodes.Arm_Top_Base.material}
          position={[1.09, 0.26, -1.18]}
          scale={0.47}
        />
        <group
          name="Tone_Arm"
          position={[1.08, 0.66, -1.19]}
          rotation={[0, 0.02, 0]}
          scale={0.3}
        >
          <mesh
            name="Cylinder005"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder005.geometry}
            material={materials["Tone Arm"]}
          />
          <mesh
            name="Cylinder005_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder005_1.geometry}
            material={nodes.Cylinder005_1.material}
          />
        </group>
      </group>
    </animated.group>
  );
}

useGLTF.preload("/turntable.glb");
