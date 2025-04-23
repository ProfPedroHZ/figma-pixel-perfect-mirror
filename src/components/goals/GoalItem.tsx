import React from "react";

interface GoalItemProps {
  text: string;
  onClick?: () => void;
  isActive?: boolean;
}

export const GoalItem: React.FC<GoalItemProps> = ({
  text,
  onClick,
  isActive = false,
}) => {
  return (
    <button
      className={`w-[298px] h-[111px] text-white text-lg font-normal text-center relative bg-[rgba(58,55,94,0.5)] max-md:w-[90%] max-md:mb-2.5 max-sm:text-base ${isActive ? "border-2 border-[#6FFF57]" : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
