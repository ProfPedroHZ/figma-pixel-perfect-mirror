import React, { useState } from "react";
import { GoalList } from "./GoalList";
import { CountdownTimer } from "./CountdownTimer";
import { AddGoalForm } from "./AddGoalForm";

interface Goal {
  id: number;
  text: string;
  title: string;
}

export const GoalTracker: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      text: "Estudar cursos na Alura",
      title: "Estudar 4 cursos na Alura",
    },
    {
      id: 2,
      text: "Criar projetos em JavaScript",
      title: "Criar 3 projetos em JavaScript",
    },
    {
      id: 3,
      text: "Criar um portfolio",
      title: "Desenvolver um portfolio profissional",
    },
    {
      id: 4,
      text: "Atualizar meu currículo",
      title: "Atualizar currículo com novas habilidades",
    },
  ]);

  const [selectedGoal, setSelectedGoal] = useState<Goal>(goals[0]);

  const handleSelectGoal = (goal: Goal) => {
    setSelectedGoal(goal);
  };

  const handleAddGoal = (newGoal: { text: string; title: string }) => {
    const newGoalWithId = {
      ...newGoal,
      id: goals.length > 0 ? Math.max(...goals.map((g) => g.id)) + 1 : 1,
    };

    setGoals([...goals, newGoalWithId]);
  };

  return (
    <main className="max-w-[1440px] w-full min-h-[900px] box-border bg-[#02010E] mx-auto px-0 py-10 max-md:max-w-[991px] max-md:px-0 max-md:py-5 max-sm:max-w-screen-sm font-['Chakra_Petch',sans-serif]">
      <header className="text-white text-[28px] font-normal text-left ml-[124px] max-md:text-2xl max-md:ml-5 max-sm:text-xl">
        <h1>
          <span>Meus objetivos do ano</span>
          <span className="text-[#6FFF57] font-bold">_</span>
        </h1>
      </header>

      <AddGoalForm onAddGoal={handleAddGoal} />

      <GoalList goals={goals} onSelectGoal={handleSelectGoal} />

      <CountdownTimer title={selectedGoal.title} />
    </main>
  );
};
