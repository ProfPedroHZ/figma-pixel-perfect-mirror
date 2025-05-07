
import React, { useState } from "react";
import { GoalItem } from "./GoalItem";

interface Goal {
  id: number;
  text: string;
  title: string;
}

interface GoalListProps {
  goals: Goal[];
  onSelectGoal: (goal: Goal) => void;
  onDeleteGoal: (goalId: number) => void;
}

export const GoalList: React.FC<GoalListProps> = ({ 
  goals, 
  onSelectGoal, 
  onDeleteGoal 
}) => {
  const [activeGoalId, setActiveGoalId] = useState<number | null>(
    goals.length > 0 ? goals[0].id : null
  );

  const handleGoalClick = (goal: Goal) => {
    setActiveGoalId(goal.id);
    onSelectGoal(goal);
  };

  return (
    <nav className="flex justify-center items-center mt-9 max-md:flex-col">
      {goals.map((goal, index) => (
        <GoalItem
          key={goal.id}
          text={goal.text}
          isActive={goal.id === activeGoalId}
          onClick={() => handleGoalClick(goal)}
          onDelete={() => onDeleteGoal(goal.id)}
          className={
            index === 0 
              ? "rounded-tl-lg rounded-bl-lg" 
              : index === goals.length - 1 
                ? "rounded-tr-lg rounded-br-lg" 
                : ""
          }
        />
      ))}
    </nav>
  );
};
