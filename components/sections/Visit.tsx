"use client";

import { motion } from "framer-motion";
import { visit, site } from "@/lib/content";
import { MapPin, Calendar, ExternalLink, ArrowRight } from "lucide-react";
import SplitText from "@/components/SplitText";
import { useInquiryModal } from "@/components/InquiryModalContext";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function Visit() {
  const { openModal } = useInquiryModal();

  const handleWhatsAppVisit = () => {
    const cleanNumber = site.whatsapp.replace(/[^0-9]/g, "");
    const message = `Hi Jia! 🪴 I would love to visit the Tintinkss studio in Kottayam. Could I check available appointment slots this week?`;
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="visit" className="bg-kiln text-porcelain px-6 md:px-10 py-24 md:py-32 relative overflow-hidden">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        animate={{ y: [0, -30, 0] }}
        transition={{
          scale: { duration: 1, ease: [0.16, 1, 0.3, 1] },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
        className="pointer-events-none absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-sage/20"
        aria-hidden
      />
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        animate={{ x: [0, 20, 0], rotate: [0, 15, 0] }}
        transition={{
          scale: { duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
          x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="pointer-events-none absolute right-10 top-10 w-28 h-28 rounded-[40%_60%_60%_40%/50%_40%_60%_50%] bg-rust/25"
        aria-hidden
      />
      <div className="relative grid md:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-center">
        <div>
          <span className="font-script text-2xl text-rust">{visit.kicker}</span>
          <h2 className="font-display font-medium text-huge mt-2 leading-[0.98] py-1">
            <SplitText text="The wheel lives" />
            <br />
            <SplitText text="in Kottayam." delay={0.1} />
          </h2>
          <p className="font-display italic font-normal text-lg md:text-xl text-porcelain/80 mt-6 max-w-md leading-relaxed">
            {visit.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8 text-porcelain/90">
            <div className="flex items-center gap-2">
              <motion.span animate={{ y: [0, -6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
                <MapPin size={18} className="text-rust shrink-0" />
              </motion.span>
              <span className="font-medium">{visit.address}</span>
            </div>

            <a
              href="https://maps.google.com/?q=Kottayam,+Kerala,+India"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-rust hover:underline underline-offset-4"
            >
              <span>Get Directions</span>
              <ExternalLink size={13} />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => openModal("visit")}
              data-cursor-hover
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-rust text-porcelain font-medium text-sm md:text-base hover:bg-rust/90 hover:scale-105 active:scale-95 transition-all shadow-md group"
            >
              <Calendar size={16} />
              <span>Book a Studio Stool</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleWhatsAppVisit}
              data-cursor-hover
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-porcelain/10 hover:bg-porcelain/20 text-porcelain border border-porcelain/20 text-sm md:text-base font-medium transition-all"
            >
              <WhatsAppIcon size={17} className="text-[#25D366]" />
              <span>Message Ahead</span>
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02 }}
          className="border border-porcelain/20 rounded-[2rem_1rem_2rem_1rem] p-8 md:p-10"
        >
          <h3 className="font-script text-2xl text-rust mb-6">studio hours</h3>
          <div className="flex flex-col gap-4">
            {visit.hours.map((h, i) => (
              <motion.div
                key={h.day}
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                className="flex items-center justify-between border-b border-porcelain/10 pb-4 last:border-0 last:pb-0"
              >
                <span className="font-medium text-porcelain/90">{h.day}</span>
                <span className="font-display italic font-normal text-porcelain/70">{h.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
