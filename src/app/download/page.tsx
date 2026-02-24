"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Smartphone,
  Apple,
  ExternalLink,
  ArrowLeft,
  Loader2,
  File,
  Package,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faAndroid } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTransition } from "@/context/TransitionContext";

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface Release {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  assets: ReleaseAsset[];
}

export default function DownloadPage() {
  const router = useRouter();
  const { coordinates, platform, endTransition } = useTransition();
  const originX =
    coordinates.x ||
    (typeof window !== "undefined" ? window.innerWidth / 2 : 500);
  const originY =
    coordinates.y ||
    (typeof window !== "undefined" ? window.innerHeight / 2 : 500);

  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(platform === "android");
  const [isExiting, setIsExiting] = useState(false);
  const [exitPosition, setExitPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (platform === "android") {
      fetch("https://api.github.com/repos/blackingg/SokoFunds/releases")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setReleases(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [platform]);

  const handleRevealComplete = useCallback(() => {
    if (!isExiting) {
      endTransition();
    }
  }, [isExiting, endTransition]);

  const handleExitComplete = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleBack = useCallback((e: React.MouseEvent) => {
    setExitPosition({
      x: e.clientX,
      y: e.clientY,
    });
    setIsExiting(true);
  }, []);

  const getFileIcon = (filename: string) => {
    if (filename.endsWith(".apk")) return <Smartphone size={22} />;
    if (filename.endsWith(".zip")) return <Package size={22} />;
    return <File size={22} />;
  };

  const getFileLabel = (filename: string) => {
    if (filename.endsWith(".apk")) return "Download APK";
    if (filename.endsWith(".aab")) return "Download AAB";
    if (filename.endsWith(".zip")) return "Download ZIP";
    return "Download File";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.25 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <main className="min-h-screen bg-white relative">
      <motion.div
        className="fixed inset-0 bg-[#007AFF] z-50 overflow-hidden"
        initial={{ clipPath: `circle(0px at ${originX}px ${originY}px)` }}
        animate={
          isExiting
            ? {
                clipPath: `circle(0px at ${exitPosition.x}px ${exitPosition.y}px)`,
              }
            : { clipPath: `circle(150% at ${originX}px ${originY}px)` }
        }
        transition={{
          duration: isExiting ? 0.7 : 0.85,
          ease: [0.65, 0, 0.35, 1],
        }}
        onAnimationComplete={
          isExiting ? handleExitComplete : handleRevealComplete
        }
      >
        <div className="relative h-full w-full overflow-y-auto overflow-x-hidden">
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 min-h-full">
            <motion.div
              key="content"
              variants={containerVariants}
              initial="visible"
              animate="visible"
              exit="exit"
            >
              <motion.button
                variants={itemVariants}
                onClick={handleBack}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#007AFF] flex items-center justify-center transition-colors shadow-xl backdrop-blur-md mb-16 group border border-white/20"
              >
                <ArrowLeft
                  size={32}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </motion.button>

              {platform === "ios" ? (
                <div className="flex flex-col items-center text-center py-10 md:py-20">
                  <motion.div
                    variants={itemVariants}
                    className="p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] bg-white/10 backdrop-blur-xl border border-white/20 mb-8 md:mb-12"
                  >
                    <FontAwesomeIcon
                      icon={faApple}
                      className="text-white drop-shadow-2xl text-[80px] md:text-[120px] h-20 w-20 md:h-30 md:w-30"
                    />
                  </motion.div>
                  <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase mb-4 md:mb-6 drop-shadow-lg text-white"
                  >
                    iOS <span className="text-white/40">App</span>
                  </motion.h1>
                  <motion.p
                    variants={itemVariants}
                    className="text-xl md:text-2xl font-bold text-white/60 mb-8 md:mb-12 max-w-lg mx-auto"
                  >
                    Don&apos;t own a Mac yet, and that yearly sub goes crazy. So
                    Checkout the Android side.
                  </motion.p>
                  <motion.div
                    variants={itemVariants}
                    className="px-6 py-3 md:px-8 md:py-4 rounded-full bg-white/5 border border-white/10 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs text-white"
                  >
                    Chao...
                  </motion.div>
                </div>
              ) : (
                <div className="text-white">
                  <header className="mb-12 md:mb-20">
                    <motion.div
                      variants={itemVariants}
                      className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 mb-8"
                    >
                      <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20">
                        <FontAwesomeIcon
                          icon={faAndroid}
                          className="text-white h-8 w-8 md:h-12 md:w-12"
                        />
                      </div>
                      <div>
                        <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase drop-shadow-lg leading-[0.9]">
                          Releases
                        </h1>
                        <div className="flex items-center gap-2 text-white/50 font-black uppercase tracking-widest text-[10px] md:text-xs mt-3 md:mt-4">
                          Android Development <ExternalLink size={14} />
                        </div>
                      </div>
                    </motion.div>
                    <motion.p
                      variants={itemVariants}
                      className="text-lg md:text-2xl text-white/60 font-medium max-w-2xl leading-relaxed"
                    >
                      Download the latest version of SokoFunds for Android. Each
                      update brings new features and security improvements.
                    </motion.p>
                  </header>

                  <motion.section
                    variants={itemVariants}
                    className="space-y-6 md:space-y-8"
                  >
                    {loading ? (
                      <div className="flex flex-col items-center gap-6 py-32">
                        <Loader2
                          size={48}
                          className="animate-spin text-white/50"
                        />
                        <p className="font-black uppercase tracking-[0.2em] text-white/30 text-xs md:text-sm">
                          Synchronizing with GitHub...
                        </p>
                      </div>
                    ) : releases.length > 0 ? (
                      releases.map((release, idx) => (
                        <motion.div
                          key={release.tag_name}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            delay: idx * 0.1,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="group bg-white/5 hover:bg-white/10 backdrop-blur-xl p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/10 hover:border-white/30 transition-all"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div className="w-full">
                              <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white text-[#007AFF] text-[10px] font-black uppercase tracking-widest shadow-lg">
                                  {release.tag_name}
                                </span>
                                <span className="text-white/40 text-[10px] md:text-xs font-bold uppercase italic tracking-wider">
                                  {new Date(
                                    release.published_at,
                                  ).toLocaleDateString(undefined, {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                              <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight mb-4 break-words">
                                {release.name || release.tag_name}
                              </h3>
                              {release.body && (
                                <p className="text-white/50 line-clamp-2 text-sm mb-6 max-w-xl">
                                  {release.body}
                                </p>
                              )}
                              <div className="flex flex-wrap gap-3 md:gap-4">
                                {release.assets.map((asset) => (
                                  <motion.a
                                    key={asset.name}
                                    href={asset.browser_download_url}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-3 md:gap-4 px-6 md:px-8 py-4 md:py-5 rounded-3xl md:rounded-4xl bg-white text-[#007AFF] font-black uppercase tracking-widest text-[10px] md:text-sm shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-shadow hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] w-full md:w-auto justify-center md:justify-start"
                                  >
                                    {getFileIcon(asset.name)}
                                    {getFileLabel(asset.name)}
                                  </motion.a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-20 md:py-32 bg-black/5 rounded-[3rem] md:rounded-[4rem] border-2 border-dashed border-white/10">
                        <p className="text-white/30 font-black italic uppercase tracking-[0.2em] text-sm">
                          No official releases found.
                        </p>
                      </div>
                    )}
                  </motion.section>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
