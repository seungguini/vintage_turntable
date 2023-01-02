import React from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function AlbumPicture({ coverPicUrl, position, opacity }) {
  // Album Cover
  const colorMap = useLoader(THREE.TextureLoader, "/covers/" + coverPicUrl);
  colorMap.flipY = true;
  colorMap.repeat.set(1, 1);

  //   colorMap.repeat.set(1, 1);
  return (
    <mesh position={position}>
      <boxGeometry attach="geometry" args={[0.25, 0.25, 0.2]} />
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
