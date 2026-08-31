"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { commissions, site } from "@/lib/content";
import SplitText from "@/components/SplitText";
import { useInquiryModal } from "@/components/InquiryModalContext";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Commissions() {
  const { openModal } = useInquiryModal();
  const lines = commissions.headline.split("\n");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end center"] });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const handleWhatsAppQuickChat = () => {
    const cleanNumber = site.whatsapp.replace(/[^0-9]/g, "");
    const message = `Hi Jia! 🏺 I would love to talk to you about commissioning a custom ceramic piece. Could you share details about current slots and timelines?`;
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="commissions" className="bg-sage/15 px-6 md:px-10 py-24 md:py-32">
      <div className="grid md:grid-cols-2 gap-14 md:gap-10 items-start">
        <div>
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-script text-2xl text-rust inline-block"
          >
            {commissions.kicker}
          </motion.span>
          <h2 className="font-display font-medium text-huge text-kiln mt-2 leading-[0.98] py-1">
            {lines.map((l, i) => (
              <div key={i} className="block py-0.5">
                <SplitText text={l} delay={i * 0.1} />
              </div>
            ))}
          </h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.4 }}
            className="mt-6 inline-block rounded-full bg-rust/10 border border-rust/30 px-5 py-2.5"
          >
            <p className="font-medium text-sm md:text-base text-rust">{commissions.note}</p>
          </motion.div>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <button
              onClick={() => openModal("commission")}
              data-cursor-hover
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-rust text-porcelain font-medium text-sm md:text-base hover:bg-rust/90 hover:scale-105 active:scale-95 transition-all shadow-md group"
            >
              <Sparkles size={16} />
              <span>Start a Commission Brief</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleWhatsAppQuickChat}
              data-cursor-hover
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-porcelain text-kiln border border-kiln/20 hover:border-rust hover:text-rust font-medium text-sm md:text-base transition-all shadow-sm"
              title="Message Jia directly on WhatsApp"
            >
              <WhatsAppIcon size={18} className="text-[#25D366]" />
              <span>Chat on WhatsApp</span>
            </button>
          </motion.div>
        </div>

        <div ref={ref} className="relative flex flex-col">
          <svg
            className="absolute left-5 top-2 bottom-2 w-px h-[calc(100%-1rem)] hidden md:block"
            aria-hidden
          >
            <motion.line
              x1="0.5"
              y1="0"
              x2="0.5"
              y2="100%"
              stroke="#B8542F"
              strokeWidth="2"
              style={{ pathLength }}
            />
          </svg>

          {commissions.steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-5 md:gap-6 py-6 border-t border-kiln/15 last:border-b relative"
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, type: "spring", bounce: 0.6 }}
                className="font-display font-medium text-2xl md:text-3xl text-rust shrink-0 w-10 relative z-10"
              >
                {String(i + 1).padStart(2, "0")}
              </motion.span>
              <div>
                <h3 className="font-display font-medium text-xl md:text-2xl text-kiln">{step.title}</h3>
                <p className="font-display italic font-normal text-base md:text-lg text-kiln/70 mt-1.5 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
