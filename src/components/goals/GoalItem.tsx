
import React from "react";
import { Trash2 } from "lucide-react";

interface GoalItemProps {
  text: string;
  onClick?: () => void;
  onDelete?: () => void;
  isActive?: boolean;
  className?: string;
}

export const GoalItem: React.FC<GoalItemProps> = ({
  text,
  onClick,
  onDelete,
  isActive = false,
  className = "",
}) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  return (
    <div className={`relative group w-[298px] h-[111px] max-md:w-[90%] max-md:mb-2.5 ${className}`}>
      <button
        className={`w-full h-full text-white text-lg font-normal text-center relative bg-[rgba(58,55,94,0.5)] max-md:text-base ${isActive ? "border-2 border-[#6FFF57]" : ""}`}
        onClick={onClick}
      >
        {text}
      </button>
      <button 
        onClick={handleDeleteClick}
        className="absolute top-2 right-2 p-1 bg-transparent text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Excluir objetivo"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};
