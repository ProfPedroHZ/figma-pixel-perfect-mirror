
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-20 pb-10 flex flex-col items-center">
      <img
        src="/lovable-uploads/7383dfc8-20f9-436b-afbc-701c1f4bef28.png"
        alt="Optima Logo"
        className="w-48 mb-8 max-md:w-36"
      />
      <p className="text-white text-xl font-['Chakra_Petch',sans-serif] text-center max-md:text-lg px-4">
        Para quem não sabe onde está indo, qualquer caminho serve
        <span className="text-[#6FFF57] font-bold">_</span>
      </p>
    </footer>
  );
};
