"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

export interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

export interface Release {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  assets: ReleaseAsset[];
}

interface TransitionContextType {
  coordinates: { x: number; y: number };
  platform: string;
  isTransitioning: boolean;
  direction: "enter" | "exit" | null;
  launchedFromDownloadSection: boolean;
  releases: Release[] | null;
  releasesLoading: boolean;
  startTransition: (x: number, y: number, platform: string) => void;
  endTransition: () => void;
  setExitTransition: (x: number, y: number) => void;
  prefetchReleases: () => void;
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
  const [launchedFromDownloadSection, setLaunchedFromDownloadSection] =
    useState(false);
  const [releases, setReleases] = useState<Release[] | null>(null);
  const [releasesLoading, setReleasesLoading] = useState(false);

  const startTransition = useCallback(
    (x: number, y: number, platform: string) => {
      setCoordinates({ x, y });
      setPlatform(platform);
      setDirection("enter");
      setIsTransitioning(true);
      setLaunchedFromDownloadSection(true);
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

  // Kicked off the moment a device is picked, so the fetch has the entire
  // reveal animation (~850ms) to finish before the download page is visible,
  // instead of only starting once that page mounts.
  const prefetchReleases = useCallback(() => {
    setReleasesLoading(true);
    fetch("https://api.github.com/repos/blackingg/SokoFunds/releases")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setReleases(data);
        setReleasesLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setReleasesLoading(false);
      });
  }, []);

  return (
    <TransitionContext.Provider
      value={{
        coordinates,
        platform,
        isTransitioning,
        direction,
        launchedFromDownloadSection,
        releases,
        releasesLoading,
        startTransition,
        endTransition,
        setExitTransition,
        prefetchReleases,
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
