import { animated } from "@react-spring/three";
import { Text3D } from "@react-three/drei";
import React from "react";

import AlbumPicture from "./AlbumPicture";
export default function SongMenuItem({ coverPicUrl }) {
  const AnimatedText = animated(Text3D);
  return (
    <group>
      <AlbumPicture coverPicUrl={coverPicUrl} />
    </group>
  );
}
