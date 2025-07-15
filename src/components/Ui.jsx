import { useState, useRef, useEffect } from "react";
import { useCameraStore } from "./useCameraStore";

export const Ui = ({ visible }) => {
   const controls = useCameraStore((state) => state.controls);
   const cameraPositions = useCameraStore((state) => state.cameraPositions);

   const isVisible = useCameraStore((state) => state.isVisible);
   const setIsVisible = useCameraStore((state) => state.setIsVisible);

   const [activeView, setActiveView] = useState("home");
   const [isPlaying, setIsPlaying] = useState(false); // to track play/pause

   const audioRef = useRef(null);

   // Play or pause based on isPlaying state
   useEffect(() => {
      if (audioRef.current) {
         if (isPlaying) {
            audioRef.current.play();
            audioRef.current.volume = 0.3;
         } else {
            audioRef.current.pause();
         }
      }
   }, [isPlaying]);

   const handleViewClick = (viewName, position) => {
      controls.setLookAt(...position, true, { duration: 2 });
      setActiveView(viewName);
   };

   const buttonClasses = (isActive) =>
      `w-32 px-4 py-2 rounded-full shadow-lg transition-transform duration-300 backdrop-blur-md ${
         isActive
            ? "bg-white text-black scale-105"
            : "bg-white/30 text-white hover:bg-white/50 hover:scale-105"
      }`;

   return (
      <div className="fixed bottom-5 left-0 w-full flex justify-center space-x-4 px-4">
         {/* Audio Element */}
         <audio ref={audioRef} loop>
            <source
               src="/music/carol-of-the-bells-background-christmas-music-for-video-bells-ver-254194.mp3"
               type="audio/mpeg"
            />
            Your browser does not support the audio element.
         </audio>

         {/* Music Toggle Button */}
         <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white/30 text-white px-4 py-2 rounded-full shadow-lg hover:bg-white/50 hover:scale-105 transition-transform duration-300 cursor-pointer"
         >
            {isPlaying ? "🔊 Playing" : "🔇 Muted"}
         </button>

         {/* Your existing toggle */}
         <label className="flex items-center space-x-3 bg-white/30 backdrop-blur-md px-4 py-2 rounded-full shadow-lg hover:bg-white/50 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <input
               type="checkbox"
               checked={isVisible}
               onChange={(e) => setIsVisible(e.target.checked)}
               className="appearance-none h-5 w-5 rounded-full border border-white checked:bg-white checked:ring-2 checked:ring-white"
            />
            <span className="text-white">
               {isVisible ? "🫥 Cursor Hidden" : "🖱️ Cursor Visible"}
            </span>
         </label>
      </div>
   );
};
