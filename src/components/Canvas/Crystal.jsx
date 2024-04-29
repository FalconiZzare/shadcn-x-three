import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useAnimations, useGLTF } from "@react-three/drei";
import CanvasLoader from "@/components/Canvas/Loader.jsx";
import * as THREE from "three";

const Crystal = (props) => {
  const group = useRef();
  const model = useGLTF("/3DModels/crystal/crystal.glb");
  const { nodes, scene, animations } = model;

  //DIFFERENT APPROACH//
  const { actions, mixer } = useAnimations(animations, group);
  useEffect(() => {
    //To get the action name to use below
    // console.log("ACTIONS", Object.keys(actions));

    actions?.Scene.play();
  }, [mixer]);

  //ANOTHER APPROACH//
  // const actions = useRef();
  // const [mixer] = useState(() => new THREE.AnimationMixer());
  //
  // useFrame((state, delta) => mixer.update(delta));
  // useEffect(() => {
  //   actions.current = { idle: mixer.clipAction(animations[0], group.current) };
  //   actions.current.idle.play();
  //   return () => animations.forEach((clip) => mixer.uncacheClip(clip));
  // }, []);

  return (
    <primitive
      ref={group}
      object={nodes["RootNode"]}
      scale={0.015}
      position-y={0}
      rotation-y={0}
      rotation-x={0}
      dispose={null}
      {...props}
    />
  );
};

const CrystalCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop={"always"}
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 90,
        near: 0.1,
        far: 200,
        position: [0, 3, 5]
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={1}
          minPolarAngle={1}
        />
        <Crystal />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default CrystalCanvas;
