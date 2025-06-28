import { Cloud, Clouds } from "@react-three/drei";
import { MeshBasicMaterial } from "three";
import { randFloat, randFloatSpread } from "three/src/math/MathUtils.js";

export function CloudScene() {
   const cloudCount = 20;

   const clouds = Array.from({ length: cloudCount }, (_, i) => {
      const position = [
         randFloat(8, 16),
         randFloatSpread(20),
         0, // z between -10 and +10
      ];
      const rotation = [0, randFloat(0, Math.PI * 2), 0];

      const scale = Math.random() * 0.5 + 0.2; // scale between 0.2 - 0.7
      const volume = Math.random() * 5 + 5; // volume between 5 - 10
      const fade = Math.floor(Math.random() * 200 + 100); // fade between 100-300
      const seed = i; // use index as seed

      return (
         <group rotation={rotation} key={i}>
            <Cloud
               key={i}
               position={position}
               scale={scale}
               volume={volume}
               fade={fade}
               seed={seed}
               color="white"
            />
         </group>
      );
   });

   return <Clouds material={MeshBasicMaterial}>{clouds}</Clouds>;
}
