"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { useInquiryModal } from "@/components/InquiryModalContext";
import { site } from "@/lib/content";

export default function QuickContactPill() {
  const { openModal } = useInquiryModal();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 280);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDirectWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanNumber = site.whatsapp.replace(/[^0-9]/g, "");
    const message = `Hi Jia! 🏺 I'm browsing the Tintinkss website and would love to ask about your pottery collection and custom pieces.`;
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2"
        >
          {/* Main Action Pill */}
          <button
            onClick={() => openModal("commission")}
            data-cursor-hover
            className="group flex items-center gap-3 pl-4 pr-5 py-2.5 rounded-full bg-kiln text-porcelain shadow-[0_12px_32px_rgba(58,46,38,0.35)] border border-porcelain/15 hover:border-rust transition-all duration-300 hover:scale-105"
            aria-label="Start a custom pottery commission brief"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rust opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rust"></span>
            </span>

            <span className="font-display text-sm tracking-wide font-medium flex items-center gap-1.5">
              <span>Start a Brief</span>
              <span className="font-script text-rust text-base lowercase">or visit</span>
            </span>
          </button>

          {/* Quick WhatsApp Direct Button */}
          <button
            onClick={handleDirectWhatsApp}
            data-cursor-hover
            className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:bg-[#1EBE5D] hover:scale-110 active:scale-95 transition-all duration-300"
            aria-label="Direct WhatsApp message to Jia"
            title="Chat with Jia on WhatsApp"
          >
            <WhatsAppIcon size={22} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
