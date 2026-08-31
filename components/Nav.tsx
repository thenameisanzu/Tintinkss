"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { nav, site } from "@/lib/content";
import { X, Menu, Sparkles } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import Magnetic from "@/components/Magnetic";
import { useInquiryModal } from "@/components/InquiryModalContext";

export default function Nav() {
  const { openModal } = useInquiryModal();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-porcelain/90 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-4 md:py-5 w-full">
          {/* Brand Logo & Name */}
          <a
            href="#top"
            data-cursor-hover
            className="flex items-center gap-2 sm:gap-2.5 md:gap-3 text-base md:text-lg lg:text-xl tracking-tight text-kiln group whitespace-nowrap shrink-0"
          >
            <Image
              src="/logo.png"
              alt={`${site.name} logo`}
              width={36}
              height={36}
              priority
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0"
            />
            <span className="font-display font-medium text-kiln whitespace-nowrap inline-flex items-baseline">
              {site.name}
              <span className="font-script text-rust text-lg sm:text-xl md:text-2xl ml-1 lowercase inline-block whitespace-nowrap">
                by jia
              </span>
            </span>
          </a>

          {/* Desktop & iPad Navigation Links */}
          <nav className="hidden md:flex items-center gap-3 sm:gap-4 md:gap-4 lg:gap-6 xl:gap-8 shrink-0">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-cursor-hover
                className="group relative text-xs md:text-[13px] lg:text-sm font-medium text-kiln/80 hover:text-rust transition-colors py-1 whitespace-nowrap"
              >
                {item.label}
                <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-rust origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]" />
              </a>
            ))}

            {/* Custom Brief CTA */}
            <button
              onClick={() => openModal("commission")}
              data-cursor-hover
              className="inline-flex items-center gap-1.5 px-3 md:px-3.5 lg:px-4 py-1.5 md:py-2 rounded-full bg-rust/10 hover:bg-rust text-rust hover:text-porcelain text-[11px] md:text-xs font-semibold tracking-wide transition-all border border-rust/30 hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
            >
              <Sparkles size={12} className="md:w-3.5 md:h-3.5" />
              <span>Custom Brief</span>
            </button>

            {/* Instagram Icon */}
            <Magnetic
              as="a"
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border border-kiln/20 hover:border-rust hover:text-rust transition-colors shrink-0"
              strength={0.5}
            >
              <InstagramIcon size={15} className="md:w-4 md:h-4" />
            </Magnetic>
          </nav>

          {/* Mobile Hamburger Button (Mobile only) */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden w-9 h-9 flex items-center justify-center text-kiln hover:text-rust transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-50 bg-kiln flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt={`${site.name} logo`}
                  width={36}
                  height={36}
                  className="w-8 h-8 rounded-full object-cover border border-porcelain/20"
                />
                <span className="font-display text-lg text-porcelain">
                  {site.name}
                  <span className="font-script text-rust text-xl ml-1 lowercase">by jia</span>
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-porcelain"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="font-display text-4xl text-porcelain py-3 border-b border-porcelain/10"
                >
                  {item.label}
                </motion.a>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setOpen(false);
                    openModal("commission");
                  }}
                  className="w-full py-3.5 rounded-full bg-rust text-porcelain font-medium text-center shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  <span>Start a Commission Brief</span>
                </button>

                <a
                  href={`https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full bg-porcelain/10 text-porcelain font-medium text-center border border-porcelain/20 flex items-center justify-center gap-2 text-sm"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + nav.length * 0.06 }}
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-script text-2xl text-rust pt-3"
              >
                @tintinkss on instagram
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
