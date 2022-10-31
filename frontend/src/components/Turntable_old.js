import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { BufferAttribute, DoubleSide, Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { Image, useAnimations } from "@react-three/drei";

const AlbumImage = () => {
  return (
    <Image
      url={process.env.PUBLIC_URL + "/covers/Sworn.jpg"}
      position={[-0.34, 0.5, -0.5]}
      rotation={[-Math.PI * 0.5, 0, 0]}
    />
  );
};

const Turntable = () => {
  const model = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/turntable.glb"
  );
  const mask = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/turntable_mask.glb"
  );
  const animations = model.animations;
  const { actions } = useAnimations(animations, model);

  // Trigger Animation
  useEffect(() => {
    const toneArmAction = actions["Tone ArmAction.003"];
    console.log("TONE ARM ACTION");
    console.log(toneArmAction);
    toneArmAction.setLoop(THREE.LoopPingPong);
    toneArmAction.play();

    actions["Tone ArmAction.003"].play();
  }, []);

  useEffect(() => {
    console.log(model);
    if (!model) return;
    model.scene.traverse((object) => {
      if (object instanceof Mesh) {
        var uvs = object.geometry.attributes.uv.array;
        object.geometry.setAttribute("uv2", new BufferAttribute(uvs, 2));
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 0.4;
        object.material.lightMap = object.material.map;
        object.material.lightMapIntensity = 0.3;
      }
    });
  }, [model, mask]);

  return (
    <>
      <AlbumImage />
      <primitive object={model.scene} />
      {/* <primitive object={mask.scene} /> */}
    </>
  );
};

export default Turntable;
