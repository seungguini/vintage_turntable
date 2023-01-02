import React from "react";
import MenuButtons from "./MenuButtons";
import SongItem from "./SongItem";
import SongList from "./SongList";

export default function MenuView({ songs, setSeeMenu }) {
  return (
    <group>
      <SongList songs={songs} />
      {/* <SongItem song={songs[0]} position={[0, 0, 0]} />; */}
      <MenuButtons position={[0, 0, 0]} setSeeMenu={setSeeMenu} />
    </group>
  );
}
