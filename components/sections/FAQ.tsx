"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faq } from "@/lib/content";
import { Plus } from "lucide-react";
import SplitText from "@/components/SplitText";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-porcelain px-6 md:px-10 py-24 md:py-32">
      <div className="max-w-3xl mx-auto">
        <div className="mb-14 text-center">
          <span className="font-script text-2xl text-rust">Good to know</span>
          <h2 className="font-display font-medium text-huge text-kiln mt-2 leading-[0.98] py-1">
            <SplitText text="Questions" />
          </h2>
        </div>

        <div className="flex flex-col">
          {faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="border-t border-kiln/15 last:border-b"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  data-cursor-hover
                  className="w-full flex items-center justify-between py-6 md:py-7 text-left gap-6"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-medium text-lg md:text-2xl text-kiln">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0, scale: isOpen ? 1.15 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="shrink-0 text-rust"
                  >
                    <Plus size={22} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-display italic font-normal text-base md:text-lg text-kiln/75 leading-relaxed pb-7 max-w-xl">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
