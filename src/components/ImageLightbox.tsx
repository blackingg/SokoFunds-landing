"use client";
import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxImage {
  src: string;
  title: string;
  desc: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageLightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  // Sync initialIndex when lightbox opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setDirection(0);
    }
  }, [isOpen, initialIndex]);

  const goNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, images.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goNext, goPrev]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.85,
      rotateY: dir > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: {
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
        rotateY: {
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 400 : -400,
      opacity: 0,
      scale: 0.85,
      rotateY: dir < 0 ? 15 : -15,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 },
        rotateY: { duration: 0.3 },
      },
    }),
  };

  const current = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
          />

          {/* Top bar: counter + close */}
          <motion.div
            className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-5 md:px-10 md:py-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-white/90 font-black text-sm md:text-base tracking-widest uppercase">
                {current.title}
              </span>
              <span className="text-white/30 font-bold text-xs tracking-widest">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.15, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X
                size={22}
                strokeWidth={2.5}
              />
            </motion.button>
          </motion.div>

          {/* Navigation arrows */}
          <motion.button
            onClick={goPrev}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: currentIndex > 0 ? 1 : 0.2,
              x: 0,
            }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            whileHover={{ scale: currentIndex > 0 ? 1.1 : 1 }}
            whileTap={{ scale: currentIndex > 0 ? 0.9 : 1 }}
            disabled={currentIndex === 0}
            className="absolute left-3 md:left-8 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-colors disabled:cursor-not-allowed"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            onClick={goNext}
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: currentIndex < images.length - 1 ? 1 : 0.2,
              x: 0,
            }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            whileHover={{
              scale: currentIndex < images.length - 1 ? 1.1 : 1,
            }}
            whileTap={{
              scale: currentIndex < images.length - 1 ? 0.9 : 1,
            }}
            disabled={currentIndex === images.length - 1}
            className="absolute right-3 md:right-8 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-colors disabled:cursor-not-allowed"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </motion.button>

          {/* Image container */}
          <div className="relative w-full max-w-sm md:max-w-md h-[75vh] flex items-center justify-center perspective-[1200px]">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full h-full flex items-center justify-center"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  const swipeThreshold = 60;
                  if (info.offset.x < -swipeThreshold) {
                    goNext();
                  } else if (info.offset.x > swipeThreshold) {
                    goPrev();
                  }
                }}
              >
                <div className="relative w-full h-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/10 bg-zinc-900">
                  <img
                    src={current.src}
                    alt={current.title}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable={false}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom info */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center pb-6 md:pb-10 px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <p className="text-white/50 text-sm md:text-base font-semibold text-center max-w-md mb-5">
              {current.desc}
            </p>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {images.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className="relative p-1"
                  aria-label={`Go to image ${idx + 1}`}
                >
                  <motion.div
                    className="rounded-full"
                    animate={{
                      width: idx === currentIndex ? 28 : 8,
                      height: 8,
                      backgroundColor:
                        idx === currentIndex
                          ? "#007AFF"
                          : "rgba(255, 255, 255, 0.25)",
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
