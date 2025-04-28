
import React from "react";

interface TimerUnitProps {
  value: number;
  label: string;
}

export const TimerUnit: React.FC<TimerUnitProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center mx-5 my-0 max-md:mx-0 max-md:my-2.5">
      <span className="text-white text-9xl font-normal max-md:text-[100px] max-sm:text-[80px]">
        {value}
      </span>
      <span className="text-[#6FFF57] text-[32px] font-normal max-md:text-[28px] max-sm:text-2xl">
        {label}
      </span>
    </div>
  );
};
