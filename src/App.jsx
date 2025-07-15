import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Loader, PositionalAudio, Preload } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { Ui } from "./components/Ui";
import { TextUi } from "./components/TextUi";
import { Leva } from "leva";
import { useCameraStore } from "./components/useCameraStore";

function App() {
   const isVisible = useCameraStore((state) => state.isVisible);
   const audioRef = useRef();

   useEffect(() => {
      // Attempt to play audio on mount
      if (audioRef.current) {
         audioRef.current.play().catch((error) => {
            console.log("Autoplay blocked:", error);
         });
      }
   }, []);

   return (
      <div className={`relative w-full h-screen ${isVisible ? "cursor-none" : "cursor-auto"}`}>
         <Canvas
            shadows
            camera={{ position: [0, 6, 17 * 3], fov: 20 }}
            className="absolute top-0 left-0 w-full h-full"
         >
            <Leva hidden />
            <color attach="background" args={["#121512"]} />
            <Suspense fallback={null}>
               <Experience />
               <Preload all />
            </Suspense>
         </Canvas>

         <Loader />
         <Ui />
      </div>
   );
}

export default App;
