"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/content";

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
        const increment = prev < 35 ? 4 : prev < 75 ? 3 : 2;
        return Math.min(prev + increment, 100);
      });
    }, 32);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (reduced) return null;

  // Format as 2 or 3 digits (e.g. 04, 82, 100)
  const formattedCount = progress < 10 ? `0${progress}` : `${progress}`;

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[200] select-none pointer-events-auto overflow-hidden">
          
          {/* Staggered Vertical Shutter Columns Exit Reveal */}
          <div className="absolute inset-0 flex z-0 pointer-events-none">
            {[0, 1, 2, 3].map((col) => (
              <motion.div
                key={col}
                initial={{ y: "0%" }}
                exit={{
                  y: "-100%",
                  transition: {
                    duration: 0.8,
                    ease: [0.77, 0, 0.175, 1],
                    delay: col * 0.08,
                  },
                }}
                className="h-full w-1/4 bg-[#1C1613] border-r border-porcelain/5 last:border-r-0"
              />
            ))}
          </div>

          {/* Main Editorial Content Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 0.96,
              transition: { duration: 0.35, ease: "easeOut" },
            }}
            className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-12 text-porcelain"
          >
            {/* Ambient Warm Kiln Core Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rust/15 rounded-full blur-[140px] pointer-events-none" />

            {/* Top Bar Metadata */}
            <div className="flex items-center justify-between font-mono text-[10px] md:text-xs tracking-widest uppercase text-porcelain/50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rust animate-pulse" />
                <span>9°35&apos;29&quot;N 76°31&apos;20&quot;E</span>
              </div>
              <div className="hidden sm:block text-center tracking-[0.2em] text-porcelain/70">
                TINTINKSS ATELIER &bull; KOTTAYAM
              </div>
              <div>ARCHIVE 2026</div>
            </div>

            {/* Center Monolith Counter & Monogram */}
            <div className="relative flex flex-col items-center justify-center my-auto">
              
              {/* Logo Emblem Pill */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 bg-porcelain/5 border border-porcelain/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 shadow-xl"
              >
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-rust/40">
                  <Image
                    src="/logo.png"
                    alt={site.name}
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                </div>
                <span className="font-display font-medium tracking-tight text-sm text-porcelain/90">
                  {site.name} <span className="font-script text-rust text-base">by jia</span>
                </span>
              </motion.div>

              {/* Giant Serif Monolith Counter */}
              <div className="flex items-baseline justify-center tracking-tighter">
                <span className="font-display font-light text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] text-porcelain leading-none select-none drop-shadow-2xl">
                  {formattedCount}
                </span>
                <span className="font-mono text-xl sm:text-2xl md:text-3xl text-rust font-light ml-2">
                  %
                </span>
              </div>

              {/* Dynamic Status Tagline */}
              <div className="mt-4 flex items-center gap-3">
                <span className="h-[1px] w-8 bg-rust/50" />
                <span className="font-script text-2xl md:text-3xl text-rust-light">
                  {progress < 40
                    ? "throwing raw stoneware..."
                    : progress < 80
                    ? "firing kiln to temperature..."
                    : "finishing handcrafted studio drop..."}
                </span>
                <span className="h-[1px] w-8 bg-rust/50" />
              </div>
            </div>

            {/* Bottom Timeline & Footer */}
            <div className="w-full flex flex-col gap-3">
              {/* Ultra Thin Hairline Loader */}
              <div className="w-full h-[2px] bg-porcelain/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-rust rounded-full relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-rust-light shadow-[0_0_10px_rgba(224,114,75,1)]" />
                </motion.div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-porcelain/50">
                <span className="font-script text-lg text-porcelain/70 capitalize">
                  everything here was mud once
                </span>
                <span>SYSTEM READY // 2026</span>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
