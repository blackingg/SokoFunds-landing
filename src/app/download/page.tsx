"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const { coordinates, platform } = useTransition();
  const originX = coordinates.x;
  const originY = coordinates.y;

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

  const handleBack = (e: React.MouseEvent) => {
    setExitPosition({
      x: e.clientX,
      y: e.clientY,
    });
    setIsExiting(true);
    setTimeout(() => {
      router.push("/");
    }, 800);
  };

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
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="relative h-full w-full overflow-y-auto overflow-x-hidden">
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 min-h-full">
            <button
              onClick={handleBack}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#007AFF] flex items-center justify-center transition-all shadow-xl backdrop-blur-md mb-16 group active:scale-90 border border-white/20"
            >
              <ArrowLeft
                size={32}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>

            {platform === "ios" ? (
              <div className="flex flex-col items-center text-center py-20">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="p-12 rounded-[4rem] bg-white/10 backdrop-blur-xl border border-white/20 mb-12"
                >
                  <Apple
                    size={120}
                    className="text-white drop-shadow-2xl"
                  />
                </motion.div>
                <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase mb-6 drop-shadow-lg text-white">
                  iOS <span className="text-white/40">App</span>
                </h1>
                <p className="text-2xl font-bold text-white/60 mb-12">
                  Don't own a Mac yet, and that yearly sub goes crazy. So
                  Checkout the Android side.
                </p>
                <div className="px-8 py-4 rounded-full bg-white/5 border border-white/10 font-black uppercase tracking-[0.3em] text-xs text-white">
                  Chao...
                </div>
              </div>
            ) : (
              <div className="text-white">
                <header className="mb-20">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20">
                      <Smartphone size={48} />
                    </div>
                    <div>
                      <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase drop-shadow-lg">
                        Releases
                      </h1>
                      <div className="flex items-center gap-2 text-white/50 font-black uppercase tracking-widest text-xs mt-2">
                        Android Development <ExternalLink size={14} />
                      </div>
                    </div>
                  </div>
                  <p className="text-2xl text-white/60 font-medium max-w-2xl leading-relaxed">
                    Download the latest version of SokoFunds for Android. Each
                    update brings new features and security improvements.
                  </p>
                </header>

                <section className="space-y-8">
                  {loading ? (
                    <div className="flex flex-col items-center gap-6 py-32">
                      <Loader2
                        size={48}
                        className="animate-spin text-white/50"
                      />
                      <p className="font-black uppercase tracking-[0.2em] text-white/30 text-sm">
                        Synchronizing with GitHub...
                      </p>
                    </div>
                  ) : releases.length > 0 ? (
                    releases.map((release, idx) => (
                      <motion.div
                        key={release.tag_name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group bg-white/5 hover:bg-white/10 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 hover:border-white/30 transition-all"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                          <div>
                            <div className="flex items-center gap-3 mb-4">
                              <span className="px-4 py-1.5 rounded-full bg-white text-[#007AFF] text-[10px] font-black uppercase tracking-widest shadow-lg">
                                {release.tag_name}
                              </span>
                              <span className="text-white/40 text-xs font-bold uppercase italic tracking-wider">
                                {new Date(
                                  release.published_at
                                ).toLocaleDateString(undefined, {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            <h3 className="text-3xl font-black italic uppercase tracking-tight mb-4">
                              {release.name || release.tag_name}
                            </h3>
                            {release.body && (
                              <p className="text-white/50 line-clamp-2 text-sm mb-6 max-w-xl">
                                {release.body}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-4">
                              {release.assets.map((asset) => (
                                <a
                                  key={asset.name}
                                  href={asset.browser_download_url}
                                  className="inline-flex items-center gap-4 px-8 py-5 rounded-4xl bg-white text-[#007AFF] font-black uppercase tracking-widest text-sm shadow-[0_15px_30px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95 transition-all"
                                >
                                  {getFileIcon(asset.name)}
                                  {getFileLabel(asset.name)}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-32 bg-black/5 rounded-[4rem] border-2 border-dashed border-white/10">
                      <p className="text-white/30 font-black italic uppercase tracking-[0.2em]">
                        No official releases found.
                      </p>
                    </div>
                  )}
                </section>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
