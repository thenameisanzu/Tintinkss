"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site, nav } from "@/lib/content";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { useInquiryModal } from "@/components/InquiryModalContext";
import { Sparkles } from "lucide-react";

export default function Footer() {
  const { openModal } = useInquiryModal();

  return (
    <footer className="bg-kiln text-porcelain px-6 md:px-10 pt-16 pb-8 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-3">
            <Image
              src="/logo.png"
              alt={`${site.name} logo`}
              width={56}
              height={56}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover shadow-md"
            />
            <motion.p
              animate={{ rotate: [0, -0.6, 0.6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="font-display font-medium text-4xl md:text-6xl"
            >
              {site.name}
              <span className="font-script text-rust text-3xl md:text-4xl ml-2 lowercase">by jia</span>
            </motion.p>
          </div>
          <p className="font-display italic font-normal text-porcelain/60 mt-3 max-w-sm">
            Handmade ceramics, thrown and glazed in {site.location}.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => openModal("commission")}
              data-cursor-hover
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rust text-porcelain text-xs font-semibold hover:bg-rust/90 transition-colors shadow-sm"
            >
              <Sparkles size={13} />
              <span>Start a Custom Brief</span>
            </button>

            <a
              href={`https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-porcelain/10 hover:bg-porcelain/20 text-porcelain text-xs font-medium border border-porcelain/20 transition-colors"
            >
              <WhatsAppIcon size={14} className="text-[#25D366]" />
              <span>{site.whatsappDisplay}</span>
            </a>

            <a
              href={`tel:${site.whatsapp.replace(/[^0-9]/g, "")}`}
              data-cursor-hover
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-porcelain/10 hover:bg-porcelain/20 text-porcelain text-xs font-medium border border-porcelain/20 transition-colors"
            >
              <span>Call: {site.phoneDisplay}</span>
            </a>

            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-porcelain/10 hover:bg-porcelain/20 text-porcelain text-xs font-medium border border-porcelain/20 transition-colors"
            >
              <InstagramIcon size={14} />
              <span>Instagram</span>
            </a>
          </div>
        </motion.div>

        <nav className="flex flex-col gap-2">
          {nav.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ x: -6, color: "#B8542F" }}
              className="text-porcelain/70 w-max"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>
      </div>

      <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-4 mt-14 pt-6 border-t border-porcelain/10 text-xs text-porcelain/40">
        <span>© {new Date().getFullYear()} {site.name}. Made by hand, always.</span>
        <span className="font-script text-lg text-porcelain/50">thrown with care</span>
      </div>
    </footer>
  );
}
