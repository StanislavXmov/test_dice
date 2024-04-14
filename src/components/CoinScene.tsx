import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Coin } from "./Coin";


export const CoinScene = () => {  
  return (
    <Canvas
      shadows
      camera={{ fov: 75, position: [0, 20, 20], zoom: 50}}
      orthographic
    >
      <OrbitControls />
      <Suspense>
        <Coin />
      </Suspense>
    </Canvas>
  );
}