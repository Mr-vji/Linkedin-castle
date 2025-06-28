export const TextUi = () => {
   return (
      <div className="flex flex-col items-center justify-center w-full h-screen text-center px-4">
         <h1
            className="font-bold leading-tight"
            style={{
               fontFamily: "Bungee, sans-serif",
               fontSize: "9vw",
               lineHeight: 1,
               color: "white",
            }}
         >
            Castel Title
         </h1>
         <p
            className="mt-4 text-base"
            style={{
               fontFamily: "Kapakana, sans-serif",
               fontSize: "5vw", // adjust as needed
               color: "white",
            }}
         >
            This is the sub text
         </p>
      </div>
   );
};
