import { Center, Plane, RoundedBox } from "@react-three/drei";
import React, { useEffect } from "react";

import AlbumPicture from "./AlbumPicture";
import SongInfo from "./SongInfo";

// Song info + Song Album Picture
export default function SongItem({ song, position }) {
  useEffect(() => {
    console.log("YO");
    console.log(song);
  }, []);

  const albumPicURL = song.name + ".jpg";

  console.log("HELLOO");
  return (
    <group rotation={[0, -Math.PI * 0.5, 0]} position={[1, 0, 9]}>
      {/* <group position={[0, 0, 4]}> */}
      <group rotation={[0, 0, 0]}>
        {/* <group rotation={[0, Math.PI * 0.05, 0]}> */}
        <Center disableY disableZ>
          <RoundedBox
            position={[position[0], position[1], position[2]]}
            args={[1, 0.35, 0.2]}
            radius={0.06}
            smoothness={4}
          >
            <meshBasicMaterial color={"#73A5C6"} transparent opacity={0.3} />
          </RoundedBox>
        </Center>
        <mesh position={position}>
          <boxGeometry attach="geometry" args={[0.25, 0.25, 0.2]} />
        </mesh>
        {/* <AlbumPicture coverPicUrl={albumPicURL} position={[-0.35, 0, 0.03]} /> */}
        <SongInfo // Displays song title & artist name
          song={song}
          opacity={1}
          position={[position[0], position[1], position[2] + 0.1]}
        />
      </group>
    </group>
  );
}
