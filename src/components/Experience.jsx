import { useRef, useEffect, useState } from "react";
import {
   CameraControls,
   Environment,
   OrbitControls,
   PositionalAudio,
   PositionPoint,
   Text,
} from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Snowflakes } from "./Snowflakes";
import { StarrySky } from "./StarrySky";
import { Castel } from "./Castel";
import { Pointer } from "./Pointer";
import { button, useControls } from "leva";
import { useCameraStore } from "./useCameraStore";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Experience = () => {
   const castleRef = useRef();
   const controls = useRef();

   const [introFinished, setIntroFinished] = useState(false);
   const { targetPosition, cameraPositions } = useCameraStore();
   const [curPosition, setCurPosition] = useState(cameraPositions[1]);

   const setControls = useCameraStore((state) => state.setControls);
   useControls("Helper", {
      getLookAt: button(() => {
         const position = controls.current.getPosition();
         const target = controls.current.getTarget();
         console.log([...position, ...target]);
      }),
   });
   const intro = async () => {
      controls.current.setLookAt(
         -1.2757983998720994,
         4.779980070016825,
         51.36975203967381,
         0.002012876844139401,
         1.1492270466951795,
         -0.08104805930169555,
         false
      );

      await controls.current.setLookAt(
         -1.2310222214119226,
         14.269270947720758,
         49.56684870869765,
         0,
         0,
         0,
         true,
         2.0
      );
      await controls.current.setLookAt(
         -1.0749781066757396,
         4.20937242242996,
         43.283765517770505,
         0.002012876844139401,
         1.1492270466951795,
         -0.08104805930169555,
         true,
         2.0
      );
   };

   const moveCameraTo = useCameraStore((state) => state.moveCameraTo);
   useEffect(() => {
      intro();
   }, []);

   useEffect(() => {
      if (controls.current) {
         setControls(controls.current);
      }
   }, [setControls]);

   const playTransition = () => {
      moveCameraTo("one"); // ✅ updates activeView too
      setIntroFinished(true);
   };

   useEffect(() => {
      if (!introFinished) return;
      playTransition();
   }, [cameraPositions, introFinished]);

   const home = useRef();
   const MouseMOVER = useRef();

   // let vec3 = new THREE.Vector3();
   // const initialCameraPos = useRef();

   // useFrame(({ camera, mouse }) => {
   //    if (!initialCameraPos.current) {
   //       // Store initial position once
   //       initialCameraPos.current = camera.position.clone();
   //    }

   //    // Calculate target based on initial position
   //    vec3.set(
   //       initialCameraPos.current.x + mouse.x * 0.5 * 20,
   //       initialCameraPos.current.y + mouse.y * 0.3 * 20,
   //       initialCameraPos.current.z // keep original z fixed
   //    );

   //    // Lerp to target
   //    camera.position.lerp(vec3, 0.02);

   //    // Look at center
   //    camera.lookAt(0, 0, 0);
   // });

   useFrame(({ mouse }) => {
      if (!castleRef.current) return;

      // Calculate target rotation based on mouse movement
      const targetRotationX = mouse.y * 0.2; // tilt up/down
      const targetRotationY = mouse.x * 0.4; // turn left/right

      // Smoothly interpolate (lerp) the current rotation towards target
      castleRef.current.rotation.x = THREE.MathUtils.lerp(
         castleRef.current.rotation.x,
         targetRotationX / 4,
         0.09
      );

      castleRef.current.rotation.y = THREE.MathUtils.lerp(
         castleRef.current.rotation.y,
         targetRotationY / 2,
         0.09
      );
   });

   return (
      <group>
         <Pointer />
         <OrbitControls
            minDistance={19 * 2.5}
            maxDistance={19 * 3}
            minPolarAngle={Math.PI / 4 + 0.1}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
         />
         {/* <CameraControls
            ref={controls}
            makeDefault
            Disable
            zoom
            zoomToCursor={false} // Prevents zooming towards the cursor
            dollySpeed={0} // Sets the dolly (zoom in/out) speed to zero
            truckSpeed={1}
            minDistance={30} // set your minimum distance here
            maxDistance={70}
         /> */}
         <directionalLight intensity={0.5} position={[0, 2, 5]} color={"white"} />
         <pointLight color={"white"} intensity={1} position={[0, -0.3, 0]} />
         <Environment preset="forest" />
         <group ref={castleRef}>
            <group position={[0, 0, -0.5]} rotation={[0, 0.2, 0]}>
               <StarrySky nbParticles={500} />
            </group>
            <group position={[0, 0, -2]}>
               <Snowflakes nbParticles={1000} />
            </group>
            {/* HOME */}
            <group ref={home}>
               <Text
                  position={[0, 2.3, -10]}
                  fontSize={3}
                  color="white"
                  font="/fonts/Wonderbar Demo.otf"
                  anchorX="center"
                  anchorY="middle"
               >
                  The Castle of Dreams
               </Text>

               <Text
                  position={[0, -1, -10]}
                  fontSize={3}
                  color="white"
                  font="/fonts/ChettalburyItalic-lxxwq.otf"
                  anchorX="center"
                  anchorY="middle"
               >
                  Unlock Your Imagination
               </Text>
               <Text
                  position={[0, -4, -10]}
                  fontSize={2.5}
                  color="white"
                  font="/fonts/ChettalburyItalic-lxxwq.otf"
                  anchorX="center"
                  anchorY="middle"
               >
                  Mr_Vji
               </Text>
            </group>

            <Castel position={[0, -5, 0]} />
         </group>

         <EffectComposer>
            <Bloom mipmapBlur intensity={1.9} luminanceThreshold={1.3} />
         </EffectComposer>
      </group>
   );
};
