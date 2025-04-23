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
}

export const GoalList: React.FC<GoalListProps> = ({ goals, onSelectGoal }) => {
  const [activeGoalId, setActiveGoalId] = useState<number | null>(1);

  const handleGoalClick = (goal: Goal) => {
    setActiveGoalId(goal.id);
    onSelectGoal(goal);
  };

  return (
    <nav className="flex justify-center items-center mt-9 max-md:flex-col">
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          text={goal.text}
          isActive={goal.id === activeGoalId}
          onClick={() => handleGoalClick(goal)}
        />
      ))}
    </nav>
  );
};
