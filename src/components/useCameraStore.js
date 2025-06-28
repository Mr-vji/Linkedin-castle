import { create } from "zustand";

export const useCameraStore = create((set) => ({
   cameraPositions: {
      zero: [
         -1.0749781066757396, 4.20937242242996, 43.283765517770505, 0.002012876844139401,
         1.1492270466951795, -0.08104805930169555,
      ],
      one: [
         -7.525482401956721, -9.998186656550548, 40.966764689610635, -0.7035519991502235,
         -0.8146324482956927, -0.9874371685673916,
      ],
      two: [
         -30.945245930815283, 3.96057899070769, 30.116584770626112, -3.584109607956044,
         -0.9163937780492948, -3.3291146780048697,
      ],
      three: [
         26.422409352347444, 0.5257181735209218, 34.24996279127749, 4.014123748447112,
         -0.7122133370367552, -2.997422590016599,
      ],
   },

   controls: null,

   setControls: (controlsRef) => set({ controls: controlsRef }),

   activeView: "zero", // default

   setActiveView: (key) => set({ activeView: key }),

   // ✅ changed: added { duration: 2 } for smooth transition
   moveCameraTo: (key) =>
      set((state) => {
         const pos = state.cameraPositions[key];
         if (state.controls && pos) {
            state.controls.setLookAt(...pos, true, { duration: 2 });
         }
         return { activeView: key }; // ✅ sets active view
      }),

   // ✅ Added true/false variable
   isVisible: false,

   // ✅ Setter to update isVisible
   setIsVisible: (value) => set({ isVisible: value }),
}));
