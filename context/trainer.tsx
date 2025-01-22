"use client";
import { TodaySchedule, Trainer } from "@/types/user";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

interface TrainerContextType {
    trainer: Trainer | null;
    todaySchedule: TodaySchedule[] | [];
}


const TrainerContext = createContext<TrainerContextType | null>(null);

export const TrainerProvider = ({ children }: { children: React.ReactNode }) => {
    const [trainer, setTrainer] = useState<Trainer | null>(null);
    const [todaySchedule, setTodaySchedule] = useState<TodaySchedule[] | []>([]);
        const {data} = useSession()
        const user = data?.user

    useEffect(() => {
        const fetchTrainer = async () => {
            try {
                const [
                    trainerResponse,
                    todayScheduleResponse,
                ] = await Promise.all([
                    fetch("/api/user/details"),
                    fetch("/api/schedule/today"),
                ])

                const [trainerData, todayScheduleData] = await Promise.all([
                    trainerResponse.json(),
                    todayScheduleResponse.json(),
                ])

                setTrainer(trainerData);
                setTodaySchedule(todayScheduleData.schedules);
            } catch (error) {
                console.error("Error fetching user stats:", error);
            }
        }

        if (user?.role === 'TRAINER') {
            fetchTrainer()
        }

    }, [user?.role])

    const value = {
        trainer,
        todaySchedule
    }
  return (
    <TrainerContext.Provider value={value}>{children}</TrainerContext.Provider>
  );
};


export const useTrainerContext = () => {
  const context = useContext(TrainerContext);
  if (!context) {
    throw new Error("useTrainer must be used within a TrainerProvider");
  }
  return context;
};