
import React, { useState, useEffect } from "react";
import { GoalList } from "./GoalList";
import { CountdownTimer } from "./CountdownTimer";
import { AddGoalForm } from "./AddGoalForm";
import { Footer } from "./Footer";
import { toast } from "sonner";

interface Goal {
  id: number;
  text: string;
  title: string;
}

export const GoalTracker: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  // Carrega os objetivos do localStorage quando o componente é montado
  useEffect(() => {
    const savedGoals = localStorage.getItem("goals");
    const parsedGoals = savedGoals ? JSON.parse(savedGoals) : [
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
    ];
    
    setGoals(parsedGoals);
    if (parsedGoals.length > 0) {
      setSelectedGoal(parsedGoals[0]);
    }
  }, []);

  // Salva os objetivos no localStorage sempre que houver alteração
  useEffect(() => {
    if (goals.length > 0) {
      localStorage.setItem("goals", JSON.stringify(goals));
    }
  }, [goals]);

  const handleSelectGoal = (goal: Goal) => {
    setSelectedGoal(goal);
  };

  const handleAddGoal = (newGoal: { text: string; title: string }) => {
    const newGoalWithId = {
      ...newGoal,
      id: goals.length > 0 ? Math.max(...goals.map((g) => g.id)) + 1 : 1,
    };

    setGoals([...goals, newGoalWithId]);
    toast.success("Objetivo adicionado com sucesso!");
  };

  const handleDeleteGoal = (goalId: number) => {
    const updatedGoals = goals.filter((goal) => goal.id !== goalId);
    setGoals(updatedGoals);
    
    // Se o objetivo excluído for o selecionado, seleciona o primeiro da lista
    if (selectedGoal && selectedGoal.id === goalId) {
      if (updatedGoals.length > 0) {
        setSelectedGoal(updatedGoals[0]);
      } else {
        setSelectedGoal(null);
      }
    }

    // Atualiza o localStorage depois da exclusão
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    toast.success("Objetivo removido com sucesso!");
  };

  return (
    <div className="min-h-screen bg-[#02010E] flex justify-center">
      <main className="w-full max-w-[1192px] min-h-[900px] box-border bg-[#02010E] mx-auto px-5 py-10 max-md:py-5 font-['Chakra_Petch',sans-serif]">
        <header className="flex justify-between items-center mb-10 max-md:flex-col max-md:gap-4">
          <h1 className="text-white text-[28px] font-normal text-left max-md:text-center max-md:text-2xl">
            <span>Meus objetivos do ano</span>
            <span className="text-[#6FFF57] font-bold">_</span>
          </h1>
          <AddGoalForm onAddGoal={handleAddGoal} />
        </header>

        <GoalList 
          goals={goals} 
          onSelectGoal={handleSelectGoal} 
          onDeleteGoal={handleDeleteGoal}
        />
        {selectedGoal && <CountdownTimer title={selectedGoal.title} />}
        <Footer />
      </main>
    </div>
  );
};
