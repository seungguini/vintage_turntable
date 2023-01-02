import { Environment, Sparkles } from "@react-three/drei";
import React from "react";
import Camera from "./Camera";
import Lights from "./Lights";

export default function Set({
  camera,
  mouse,
  enableLookAt,
  setEnableLookAt,
  focused,
  seeMenu,
}) {
  return (
    <>
      <Environment preset="studio" />
      <Camera
        makeDefault
        turntablePosition={[0, -0.24, 0]}
        camera={camera}
        mouse={mouse}
        enableLookAt={enableLookAt}
        setEnableLookAt={setEnableLookAt}
        focused={focused}
        seeMenu={seeMenu}
      />
      <Lights />
      <Sparkles count={2000} scale={25} size={2} />
    </>
  );
}
