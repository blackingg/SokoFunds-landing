"use client";
import React, { createContext, useContext, useState } from "react";

interface TransitionContextType {
  coordinates: { x: number; y: number };
  platform: string;
  setTransition: (x: number, y: number, platform: string) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [platform, setPlatform] = useState("android");

  const setTransition = (x: number, y: number, platform: string) => {
    setCoordinates({ x, y });
    setPlatform(platform);
  };

  return (
    <TransitionContext.Provider value={{ coordinates, platform, setTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}
