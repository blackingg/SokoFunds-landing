"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

interface TransitionContextType {
  coordinates: { x: number; y: number };
  platform: string;
  isTransitioning: boolean;
  direction: "enter" | "exit" | null;
  startTransition: (x: number, y: number, platform: string) => void;
  endTransition: () => void;
  setExitTransition: (x: number, y: number) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined,
);

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [platform, setPlatform] = useState("android");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<"enter" | "exit" | null>(null);

  const startTransition = useCallback(
    (x: number, y: number, platform: string) => {
      setCoordinates({ x, y });
      setPlatform(platform);
      setDirection("enter");
      setIsTransitioning(true);
    },
    [],
  );

  const setExitTransition = useCallback((x: number, y: number) => {
    setCoordinates({ x, y });
    setDirection("exit");
    setIsTransitioning(true);
  }, []);

  const endTransition = useCallback(() => {
    setIsTransitioning(false);
    setDirection(null);
  }, []);

  return (
    <TransitionContext.Provider
      value={{
        coordinates,
        platform,
        isTransitioning,
        direction,
        startTransition,
        endTransition,
        setExitTransition,
      }}
    >
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
