
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddGoalFormProps {
  onAddGoal: (goal: { text: string; title: string }) => void;
}

export const AddGoalForm: React.FC<AddGoalFormProps> = ({ onAddGoal }) => {
  const [goalText, setGoalText] = useState("");
  const [goalTitle, setGoalTitle] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goalText.trim() && goalTitle.trim()) {
      onAddGoal({ text: goalText, title: goalTitle });
      setGoalText("");
      setGoalTitle("");
      setIsFormVisible(false);
    }
  };

  return (
    <div className="mt-0 flex justify-end pr-[124px] max-md:pr-5 max-sm:pr-2.5">
      {!isFormVisible ? (
        <Button
          onClick={() => setIsFormVisible(true)}
          className="bg-[#6FFF57] text-[#02010E] hover:bg-[#5be046]"
        >
          Adicionar Novo Objetivo
        </Button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-4 bg-[rgba(58,55,94,0.7)] rounded-lg"
        >
          <h3 className="text-white text-xl mb-4">Adicionar Novo Objetivo</h3>

          <div className="mb-4">
            <Label htmlFor="goalText" className="text-white mb-2 block">
              Texto do Objetivo
            </Label>
            <Input
              id="goalText"
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
              placeholder="Ex: Estudar cursos na Alura"
              className="bg-[rgba(58,55,94,0.5)] text-white border-[#6FFF57]"
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="goalTitle" className="text-white mb-2 block">
              Título Detalhado
            </Label>
            <Input
              id="goalTitle"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              placeholder="Ex: Estudar 4 cursos na Alura"
              className="bg-[rgba(58,55,94,0.5)] text-white border-[#6FFF57]"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsFormVisible(false)}
              className="border-[#6FFF57] text-white hover:bg-[rgba(58,55,94,0.7)]"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#6FFF57] text-[#02010E] hover:bg-[#5be046]"
            >
              Salvar
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

