import { Trail } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import React, { useRef, useMemo } from "react";

const NUM_STARS = 30;

export const FallingStars = () => {
   const group = useRef();
   const { viewport } = useThree();

   const stars = useMemo(() => {
      const arr = [];
      for (let i = 0; i < NUM_STARS; i++) {
         arr.push({
            position: new THREE.Vector3(
               THREE.MathUtils.randFloat(viewport.width * 0.5, viewport.width * 1.2), // Right side
               THREE.MathUtils.randFloat(viewport.height * 0.5, viewport.height * 1.2), // Top
               THREE.MathUtils.randFloat(-2, 2) // Depth variation
            ),
            speed: THREE.MathUtils.randFloat(0.01, 0.05),
            drift: THREE.MathUtils.randFloat(0.01, 0.03),
            ref: React.createRef(),
         });
      }
      return arr;
   }, [viewport]);

   useFrame(() => {
      stars.forEach((star) => {
         const { position, speed, drift, ref } = star;
         position.x -= drift;
         position.y -= speed;

         // Recycle if out of view
         if (position.y < -viewport.height / 2 || position.x < -viewport.width / 2) {
            position.set(
               THREE.MathUtils.randFloat(viewport.width * 0.5, viewport.width * 1.2),
               THREE.MathUtils.randFloat(viewport.height * 0.5, viewport.height * 1.2),
               THREE.MathUtils.randFloat(-2, 2)
            );
         }

         if (ref.current) {
            ref.current.position.lerp(position, 0.2); // optional smooth move
         }
      });
   });
   const redColor = new THREE.Color("yellow").multiplyScalar(40);

   return (
      <>
         {stars.map((star, idx) => (
            <Trail
               key={idx}
               width={0.1}
               length={4}
               decay={1.5}
               color={redColor}
               stride={0}
               interval={1}
               local={false}
            >
               <mesh visable={false} ref={star.ref} scale={0.1}>
                  <sphereGeometry args={[1, 8, 8]} />
                  <meshBasicMaterial color="redColor" />
               </mesh>
            </Trail>
         ))}
      </>
   );
};
