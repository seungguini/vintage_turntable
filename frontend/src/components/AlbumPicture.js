import React from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function AlbumPicture({ coverPicUrl, position, opacity }) {
  // Album Cover
  const colorMap = useLoader(
    THREE.TextureLoader,
    "/covers/" + coverPicUrl
  ).clone();
  colorMap.flipY = true;
  colorMap.repeat.set(1, 1);

  //   colorMap.repeat.set(1, 1);
  return (
    <mesh position={position} rotation={[0, Math.PI * 0.2, 0]}>
      <boxBufferGeometry attach="geometry" args={[1.3, 1.3, 0.4]} />
      <meshBasicMaterial
        transparent
        opacity={0.5}
        attach="material-0"
        color="#FFFFFF"
      />
      <meshBasicMaterial
        transparent
        opacity={0.5}
        attach="material-1"
        color="#FFFFFF"
      />
      <meshBasicMaterial
        transparent
        opacity={0.5}
        attach="material-2"
        color="#FFFFFF"
      />
      <meshBasicMaterial
        transparent
        opacity={0.5}
        attach="material-3"
        color="#FFFFFF"
      />
      <meshBasicMaterial
        transparent
        opacity={1}
        attach="material-4"
        map={colorMap}
        side={THREE.DoubleSide}
      />
      <meshBasicMaterial
        transparent
        opacity={0.5}
        attach="material-5"
        color="#FFFFFF"
      />
    </mesh>
  );
}
