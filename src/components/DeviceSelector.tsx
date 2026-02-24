"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faAndroid } from "@fortawesome/free-brands-svg-icons";

import { useTransition } from "@/context/TransitionContext";

const devices = [
  {
    id: "ios",
    name: "iOS App",
    icon: faApple,
    color: "#007AFF",
    tagline: "Coming Soon",
  },
  {
    id: "android",
    name: "Android",
    icon: faAndroid,
    color: "#007AFF",
    tagline: "Available Now",
  },
];

export default function DeviceSelector() {
  const router = useRouter();
  const { startTransition } = useTransition();

  const handleSelect = (device: any, e: React.MouseEvent) => {
    startTransition(e.clientX, e.clientY, device.id);
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
        <h2 className="text-5xl md:text-7xl font-black text-black uppercase italic tracking-tighter mb-4">
          Get Started
        </h2>
        <p className="text-black/40 text-xl font-semibold">
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
            className={`glass group relative p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] flex-1 min-w-70 border-black/5 transition-all cursor-pointer bg-white/50`}
          >
            <div className="flex flex-col items-center gap-6 md:gap-8">
              <div
                className="p-8 md:p-10 rounded-4xl md:rounded-[2.5rem] transition-all duration-500 group-hover:scale-110 shadow-xl shadow-transparent group-hover:shadow-[#007AFF]/10"
                style={{
                  backgroundColor: `${device.color}10`,
                  color: device.color,
                }}
              >
                <FontAwesomeIcon
                  icon={device.icon}
                  className="text-6xl md:text-7xl"
                />
              </div>

              <div className="text-center">
                <span className="block font-black text-3xl md:text-4xl text-black italic uppercase tracking-tighter mb-2">
                  {device.name}
                </span>
                <div className="flex items-center justify-center gap-2 text-black/30 text-xs md:text-sm font-bold uppercase tracking-[0.2em] group-hover:text-[#007AFF] transition-colors">
                  {device.tagline}{" "}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
