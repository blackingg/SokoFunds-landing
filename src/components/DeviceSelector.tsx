"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faAndroid } from "@fortawesome/free-brands-svg-icons";

import { useTransition } from "@/context/TransitionContext";

type Device = (typeof devices)[number];

const devices = [
  {
    id: "ios",
    name: "iOS App",
    icon: faApple,
    color: "#007AFF",
    tagline: "Coming Soon",
    available: false,
  },
  {
    id: "android",
    name: "Android",
    icon: faAndroid,
    color: "#059669",
    tagline: "Available Now",
    available: true,
  },
];

export default function DeviceSelector() {
  const router = useRouter();
  const { startTransition, prefetchReleases } = useTransition();

  const handleSelect = (device: Device, e: React.MouseEvent) => {
    startTransition(e.clientX, e.clientY, device.id);
    if (device.id === "android") {
      // Start fetching now, in parallel with the reveal animation, so the
      // releases are already in hand by the time the download page shows.
      prefetchReleases();
    }
    // Small delay so context state is committed before Next.js navigates
    setTimeout(() => {
      router.push("/download");
    }, 50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-16 py-12 px-4 relative"
    >
      <div className="text-center">
        <h2 className="text-5xl md:text-7xl font-black text-[var(--foreground)] uppercase italic tracking-tighter mb-4 font-display">
          Get Started
        </h2>
        <p className="text-[var(--muted)] text-xl font-semibold">
          Experience banking like never before.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 md:gap-12 max-w-4xl w-full">
        {devices.map((device, i) => (
          <motion.button
            key={device.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.15,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => handleSelect(device, e)}
            style={{ borderColor: `${device.color}26` }}
            className="group relative overflow-hidden bg-white p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] flex-1 min-w-70 border-2 transition-shadow duration-500 cursor-pointer shadow-[0_15px_35px_rgba(17,24,39,0.06)] hover:shadow-[0_30px_60px_rgba(17,24,39,0.12)]"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-70 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at 22% 0%, ${device.color}16, transparent 60%)`,
              }}
            />

            <div className="relative flex flex-col items-center gap-6 md:gap-8">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.15em]"
                style={{
                  backgroundColor: device.available
                    ? `${device.color}14`
                    : "rgba(17,24,39,0.05)",
                  color: device.available ? device.color : "var(--muted-2)",
                }}
              >
                <span
                  className={device.available ? "animate-pulse" : ""}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    display: "inline-block",
                    backgroundColor: device.available
                      ? device.color
                      : "rgba(17,24,39,0.3)",
                  }}
                />
                {device.tagline}
              </span>

              <div
                className="p-8 md:p-10 rounded-4xl md:rounded-[2.5rem] transition-transform duration-500 group-hover:scale-110"
                style={{
                  background: `linear-gradient(160deg, ${device.color}26, ${device.color}08)`,
                  boxShadow: `0 20px 45px ${device.color}26`,
                  color: device.color,
                }}
              >
                <FontAwesomeIcon
                  icon={device.icon}
                  className="text-6xl md:text-7xl"
                />
              </div>

              <span className="block font-black text-3xl md:text-4xl text-[var(--foreground)] italic uppercase tracking-tighter font-display">
                {device.name}
              </span>
            </div>

            <div
              className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 shadow-lg"
              style={{ backgroundColor: device.color }}
            >
              <ArrowRight
                size={18}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
