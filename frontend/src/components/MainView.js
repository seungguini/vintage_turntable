import { Float, PresentationControls } from "@react-three/drei";
import React, { useState } from "react";
import Buttons from "./Buttons";
import Turntable from "./Turntable";

export default function MainView() {
  const [hovering, setHovering] = useState(false);

  return (
    <div>
      <PresentationControls
        enabled={true}
        global={false}
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        // rotation={[0, 0.3, 0]}
        // polar={[-Math.PI / 3, Math.PI / 3]}
        // azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        <Float
          speed={1} // Animation speed, defaults to 1
          rotationIntensity={0.4} // XYZ rotation intensity, defaults to 1
          floatIntensity={0.2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
          floatingRange={[-0.2, 0.2]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
          <Turntable
            hovering={hovering}
            setHovering={setHovering}
            focused={focused}
            setFocused={setFocused}
            playing={playing}
            toneArmFinished={toneArmFinished}
            setToneArmFinished={setToneArmFinished}
            coverPicUrl={coverPicUrl}
          />
        </Float>
      </PresentationControls>

      {/* <Words opacity={opacity} /> */}
      {/* <SongMenuItem coverPicUrl={coverPicUrl} /> */}

      <Buttons
        position={[0, -0.5, 3.5]}
        playing={playing}
        setPlaying={setPlaying}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
        songIndex={songIndex}
        setSongIndex={setSongIndex}
        seeMenu={seeMenu}
        setSeeMenu={setSeeMenu}
      />
    </div>
  );
}
