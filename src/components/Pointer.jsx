import { Trail } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export const Pointer = () => {
   const trail = useRef();
   const { camera, mouse, viewport } = useThree();

   const [vec] = useState(() => new THREE.Vector3());

   useFrame(() => {
      // Step 1: Get target position from mouse
      vec.set(mouse.x, mouse.y, 0.5);
      vec.unproject(camera);

      const dir = vec.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const targetPos = camera.position.clone().add(dir.multiplyScalar(distance));

      // Step 2: Lerp to the target position for smooth motion
      if (trail.current) {
         trail.current.position.lerp(targetPos, 0.2); // 0.1 is the smoothing factor (lower is smoother)
      }
   });
   const color = new THREE.Color("skyblue").multiplyScalar(10);

   return (
      <Trail width={0.9} color={color} length={1} decay={1} local={false} stride={0} interval={1}>
         <mesh scale={0.2} visible={false} ref={trail}>
            <sphereGeometry />
            <meshBasicMaterial color={color} />
         </mesh>
      </Trail>
   );
};
