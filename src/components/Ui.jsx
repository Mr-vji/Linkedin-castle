import { useState } from "react";
import { useCameraStore } from "./useCameraStore";

export const Ui = ({ visible }) => {
   const controls = useCameraStore((state) => state.controls);
   const cameraPositions = useCameraStore((state) => state.cameraPositions);

   const isVisible = useCameraStore((state) => state.isVisible);
   const setIsVisible = useCameraStore((state) => state.setIsVisible);

   const [activeView, setActiveView] = useState("home");

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
         {/* <button
            className={buttonClasses(activeView === "home")}
            onClick={() => handleViewClick("home", cameraPositions.zero)}
         >
            Home
         </button>
         <button
            className={buttonClasses(activeView === "view1")}
            onClick={() => handleViewClick("view1", cameraPositions.one)}
         >
            View 1
         </button>
         <button
            className={buttonClasses(activeView === "view2")}
            onClick={() => handleViewClick("view2", cameraPositions.two)}
         >
            View 2
         </button>
         <button
            className={buttonClasses(activeView === "view3")}
            onClick={() => handleViewClick("view3", cameraPositions.three)}
         >
            View 3
         </button> */}

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
