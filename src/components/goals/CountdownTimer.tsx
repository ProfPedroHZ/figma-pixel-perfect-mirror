
import React, { useState, useEffect } from "react";
import { TimerUnit } from "./TimerUnit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface CountdownTimerProps {
  title: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ title }) => {
  const [days, setDays] = useState(7);
  const [hours, setHours] = useState(13);
  const [minutes, setMinutes] = useState(18);
  const [seconds, setSeconds] = useState(13);
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [isSettingDate, setIsSettingDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (targetDate) {
      const interval = setInterval(() => {
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        if (difference <= 0) {
          setDays(0);
          setHours(0);
          setMinutes(0);
          setSeconds(0);
          clearInterval(interval);
          return;
        }

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setDays(d);
        setHours(h);
        setMinutes(m);
        setSeconds(s);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      // Default countdown if no target date is set
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          setSeconds(59);
          if (minutes > 0) {
            setMinutes(minutes - 1);
          } else {
            setMinutes(59);
            if (hours > 0) {
              setHours(hours - 1);
            } else {
              setHours(23);
              if (days > 0) {
                setDays(days - 1);
              } else {
                clearInterval(interval);
              }
            }
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [days, hours, minutes, seconds, targetDate]);

  const handleSetDate = () => {
    if (selectedDate) {
      const target = new Date(selectedDate);
      target.setHours(23, 59, 59);
      setTargetDate(target);
      setIsSettingDate(false);

      // Calculate initial values
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }
  };

  return (
    <section className="w-[1192px] h-auto min-h-[557px] flex flex-col items-center justify-center bg-[rgba(58,55,94,0.3)] mt-10 mx-auto my-0 rounded-[0_0_40px_40px] max-md:w-[90%] max-md:p-5 pb-10">
      <h2 className="text-white text-[32px] font-normal text-center mb-5 max-md:text-[28px] max-sm:text-2xl mt-10">
        {title}
      </h2>

      <div className="flex items-center mb-5">
        <p className="text-[#6FFF57] text-xl font-bold text-center mr-4 max-md:text-lg max-sm:text-base">
          TEMPO PARA COMPLETAR OBJETIVO
        </p>

        {!isSettingDate ? (
          <Button
            onClick={() => setIsSettingDate(true)}
            className="bg-[rgba(58,55,94,0.7)] text-white hover:bg-[rgba(58,55,94,0.9)] text-sm"
          >
            Definir Data
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="border-[#6FFF57] text-white bg-[rgba(58,55,94,0.7)] hover:bg-[rgba(58,55,94,0.9)]"
                >
                  {selectedDate
                    ? selectedDate.toLocaleDateString()
                    : "Selecionar data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#02010E] border-[#6FFF57]">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className="bg-[#02010E] text-white"
                />
              </PopoverContent>
            </Popover>

            <Button
              onClick={handleSetDate}
              className="bg-[#6FFF57] text-[#02010E] hover:bg-[#5be046]"
              disabled={!selectedDate}
            >
              Confirmar
            </Button>

            <Button
              onClick={() => setIsSettingDate(false)}
              variant="outline"
              className="border-[#6FFF57] bg-transparent text-white hover:bg-[#6FFF57]/20 hover:text-white"
            >
              Cancelar
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-center items-end max-md:flex-col">
        <TimerUnit value={days} label="dias" />
        <TimerUnit value={hours} label="horas" />
        <TimerUnit value={minutes} label="min" />
        <TimerUnit value={seconds} label="seg" />
      </div>

      {targetDate && (
        <p className="text-white mt-6 text-center">
          Data limite: {targetDate.toLocaleDateString()}
        </p>
      )}
    </section>
  );
};
