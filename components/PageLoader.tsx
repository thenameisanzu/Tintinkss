"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/content";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(prefersReduced);
    if (prefersReduced) {
      setVisible(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-kiln select-none overflow-hidden"
        >
          {/* Ambient warm glow */}
          <div className="absolute w-80 h-80 bg-rust/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col items-center">
            {/* Center Logo with Animated Potter's Wheel Ring */}
            <div className="relative flex items-center justify-center">
              {/* Outer Spinning Ring */}
              <motion.div
                className="absolute w-28 h-28 md:w-36 md:h-36 -inset-2 md:-inset-3 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="#B8542F"
                    strokeWidth="2"
                    strokeDasharray="220 70"
                    initial={{ strokeDashoffset: 290 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="#EFEBE4"
                    strokeWidth="1"
                    strokeOpacity="0.2"
                  />
                </svg>
              </motion.div>

              {/* Logo Container */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-2xl border-2 border-porcelain/30 bg-kiln-dark p-1"
              >
                <Image
                  src="/logo.png"
                  alt={`${site.name} logo`}
                  fill
                  sizes="(max-width: 768px) 80px, 96px"
                  priority
                  className="object-cover rounded-full"
                />
              </motion.div>
            </div>

            {/* Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 flex flex-col items-center text-center"
            >
              <div className="flex items-baseline gap-1.5 font-display text-2xl md:text-3xl text-porcelain tracking-tight font-medium">
                <span>{site.name}</span>
                <span className="font-script text-rust text-xl md:text-2xl lowercase">by jia</span>
              </div>
              <span className="font-script text-lg md:text-xl text-porcelain/60 mt-1">
                throwing the page...
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
