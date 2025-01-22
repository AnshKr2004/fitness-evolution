"use client";
import { Trainer } from "@/types/user";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

interface TrainerContextType {
    trainer: Trainer | null;
    
}


const TrainerContext = createContext<TrainerContextType | null>(null);

export const TrainerProvider = ({ children }: { children: React.ReactNode }) => {
    const [trainer, setTrainer] = useState<Trainer | null>(null);
        const {data} = useSession()
        const user = data?.user

    useEffect(() => {
        const fetchTrainer = async () => {
            try {
                const [trainerResponse] = await Promise.all([
                    fetch("/api/user/details"),
                ])

                const [trainerData] = await Promise.all([
                    trainerResponse.json(),
                ])

                setTrainer(trainerData);
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