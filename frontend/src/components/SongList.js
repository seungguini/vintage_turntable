import { Scroll, ScrollControls } from "@react-three/drei";
import React from "react";
import SongItem from "./SongItem";

export default function SongList({ songs }) {
  return (
    <>
      <ScrollControls pages={2}>
        {/* <SongItem song={songs[0]} position={[0, 0, 0]} /> */}
        <Scroll>
          {songs.map((song, songIndex) => {
            return (
              <>
                <SongItem
                  key={songIndex}
                  song={song}
                  position={[0, -songIndex, 0]}
                />
              </>
            );
          })}
        </Scroll>
      </ScrollControls>
    </>
  );
}
