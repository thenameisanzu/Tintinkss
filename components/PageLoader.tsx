"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/content";

const THROWING_STAGES = [
  { threshold: 0, title: "Centering the clay", subtitle: "Wetting the stoneware on the wheel head" },
  { threshold: 25, title: "Opening the vessel", subtitle: "Pressing thumbs deep into the center" },
  { threshold: 50, title: "Pulling the walls", subtitle: "Drawing clay upward with steady hands" },
  { threshold: 75, title: "Shaping the rim", subtitle: "Smoothing curves and trimming the foot" },
  { threshold: 95, title: "Fresh off the wheel", subtitle: "Ready for bisque firing in Kottayam" },
];

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(prefersReduced);
    if (prefersReduced) {
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    // Progress counter animation from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            document.body.style.overflow = "";
          }, 450);
          return 100;
        }
        const increment = prev < 30 ? 4 : prev < 75 ? 3 : 2;
        return Math.min(prev + increment, 100);
      });
    }, 38);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (reduced) return null;

  const currentStage =
    [...THROWING_STAGES].reverse().find((s) => progress >= s.threshold) || THROWING_STAGES[0];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: "blur(4px)",
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#F7F4EE] select-none pointer-events-auto overflow-hidden px-6"
        >
          {/* Ambient Warm Studio Lighting */}
          <div className="absolute w-[500px] h-[500px] bg-rust/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute w-[350px] h-[350px] bg-sage/15 rounded-full blur-[90px] -top-20 -left-20 pointer-events-none" />

          {/* Main Wheel Container */}
          <div className="relative flex flex-col items-center max-w-sm w-full">
            
            {/* The Potter's Wheel Centerpiece */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
              
              {/* Concentric Clay Throwing Ripples (expanding outwards) */}
              {[0, 1, 2].map((idx) => (
                <motion.div
                  key={idx}
                  className="absolute inset-0 rounded-full border border-rust/35 pointer-events-none"
                  animate={{
                    scale: [0.75, 1.45],
                    opacity: [0.65, 0],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: idx * 0.8,
                  }}
                />
              ))}

              {/* Spinning Wheel Head Disc */}
              <motion.div
                className="absolute inset-0 rounded-full border border-clay-300/60 bg-gradient-to-b from-[#ECE7DF] to-[#E2DDD3] shadow-[0_15px_35px_rgba(44,36,32,0.1)] flex items-center justify-center p-3"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                {/* Lathe Ring Grooves on Wheel Head */}
                <svg viewBox="0 0 200 200" className="w-full h-full pointer-events-none opacity-40">
                  <circle cx="100" cy="100" r="92" fill="none" stroke="#B8542F" strokeWidth="1" strokeDasharray="6 4" />
                  <circle cx="100" cy="100" r="76" fill="none" stroke="#685E57" strokeWidth="0.8" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="#B8542F" strokeWidth="0.8" strokeDasharray="3 3" />
                  <circle cx="100" cy="100" r="44" fill="none" stroke="#685E57" strokeWidth="0.5" />
                </svg>
              </motion.div>

              {/* Centered Tintinkss Logo Medallion */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-porcelain p-1.5 shadow-[0_8px_25px_rgba(44,36,32,0.18)] border-2 border-rust/40 flex items-center justify-center"
              >
                {/* Inner Delicate Ceramic Ring */}
                <div className="absolute inset-1 rounded-full border border-clay-300/40 pointer-events-none" />

                <Image
                  src="/logo.png"
                  alt={`${site.name} logo`}
                  fill
                  sizes="(max-width: 768px) 96px, 112px"
                  priority
                  className="object-cover rounded-full p-1"
                />
              </motion.div>

              {/* Orbiting Clay Marker Dot */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-rust absolute top-2 left-1/2 -translate-x-1/2 shadow-[0_0_8px_rgba(184,84,47,0.6)]" />
              </motion.div>
            </div>

            {/* Brand Title */}
            <div className="mt-7 text-center">
              <div className="flex items-baseline justify-center gap-2 font-display text-3xl sm:text-4xl text-kiln font-medium tracking-tight">
                <span>{site.name}</span>
                <span className="font-script text-rust text-2xl sm:text-3xl lowercase">by jia</span>
              </div>
            </div>

            {/* Dynamic Throwing Stage Narrative */}
            <div className="mt-4 text-center h-14 flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.title}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <span className="font-script text-2xl sm:text-3xl text-rust">
                    {currentStage.title}
                  </span>
                  <span className="font-serif italic text-xs text-kiln/60 mt-0.5">
                    {currentStage.subtitle}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Clay Throwing Progress Bar & Gauge */}
            <div className="mt-5 w-full max-w-[240px] flex flex-col items-center">
              <div className="w-full h-1 bg-clay-200/90 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-rust rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              <div className="w-full flex items-center justify-between mt-2 font-mono text-[11px] text-kiln/60">
                <span className="tracking-wider uppercase">Wheel Speed</span>
                <span className="font-semibold text-rust">{progress}%</span>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
