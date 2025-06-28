import { Environment, Preload, useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export function Lights() {
   const directionalRef = useRef();

   return (
      <>
         {/* Main white light from the front */}
         <directionalLight
            ref={directionalRef}
            position={[6, 5, 9]}
            intensity={2}
            castShadow
            // shadow-mapSize-width={1024}
            // shadow-mapSize-height={1024}
         />
         <Environment preset="night" intensity={0.2} />
         {/* Fill light from the opposite side to soften shadows */}
         <directionalLight position={[-1, 2, 1]} intensity={1} color="skyblue" />

         {/* Ambient light to soften the whole scene */}
         {/* <ambientLight intensity={0.4} /> */}
      </>
   );
}
