"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, MessageCircle, Mail, MapPin, Sparkles, Copy, CheckCheck } from "lucide-react";
import { site } from "@/lib/content";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { useInquiryModal } from "@/components/InquiryModalContext";

const categories = [
  "Wheel-thrown Mug / Cup",
  "Ceramic Bowl / Plate",
  "Vase / Planter",
  "Illustrated Ceramic Postcard",
  "Calendar Cards Keepsake",
  "Custom Story Piece",
  "Other Custom Project",
];

const visitTimes = ["10:30 AM", "12:00 PM", "2:30 PM", "4:00 PM"];

export default function InquiryModal() {
  const { isOpen, mode, initialCategory, closeModal, openModal } = useInquiryModal();

  const [activeTab, setActiveTab] = useState<"commission" | "visit" | "general">("commission");
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [brief, setBrief] = useState("");
  const [quantity, setQuantity] = useState("1 piece");
  const [timeline, setTimeline] = useState("Flexible");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState(visitTimes[0]);
  const [visitorsCount, setVisitorsCount] = useState("1-2 people");

  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync mode and category when opened
  useEffect(() => {
    if (isOpen) {
      setActiveTab(mode);
      if (initialCategory && categories.includes(initialCategory)) {
        setSelectedCategory(initialCategory);
      }
      setIsSubmitted(false);
      setIsCopied(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, mode, initialCategory]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  const generateWhatsAppMessage = () => {
    if (activeTab === "commission") {
      return `🏺 *Tintinkss — Custom Commission Brief*
----------------------------------
👤 *From:* ${name || "Client"}
📞 *Contact:* ${contact || "Direct"}
🏷️ *Item Type:* ${selectedCategory}
📦 *Quantity:* ${quantity}
⏳ *Timeline:* ${timeline}

📝 *The Story & Idea:*
${brief || "I would love to discuss a custom handmade ceramic piece!"}

📍 *Sent from Tintinkss Studio Website*`;
    } else if (activeTab === "visit") {
      return `🪴 *Tintinkss — Studio Visit Appointment Request*
----------------------------------
👤 *Name:* ${name || "Visitor"}
📞 *Contact:* ${contact || "Direct"}
🗓️ *Preferred Date:* ${visitDate || "This week"}
⏰ *Preferred Time:* ${visitTime}
👥 *Group Size:* ${visitorsCount}

💬 *Note / Question:*
${brief || "Looking forward to seeing the wheel in Kottayam!"}

📍 *Sent from Tintinkss Studio Website*`;
    } else {
      return `✨ *Tintinkss — General Inquiry*
----------------------------------
👤 *Name:* ${name || "Client"}
📞 *Contact:* ${contact || "Direct"}

💬 *Message:*
${brief || "Hi Jia, I have a question regarding your pottery and collection."}

📍 *Sent from Tintinkss Studio Website*`;
    }
  };

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = generateWhatsAppMessage();
    const cleanNumber = site.whatsapp.replace(/[^0-9]/g, "");
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsSubmitted(true);
  };

  const handleEmailSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = generateWhatsAppMessage();
    const subject =
      activeTab === "commission"
        ? `[Tintinkss Brief] Custom Pottery Inquiry - ${name || "Client"}`
        : activeTab === "visit"
        ? `[Studio Visit] Kottayam Appointment Request - ${name || "Visitor"}`
        : `[Inquiry] Question from ${name || "Client"}`;

    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    window.open(mailto, "_blank");
    setIsSubmitted(true);
  };

  const handleCopy = () => {
    const text = generateWhatsAppMessage();
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
            className="fixed inset-0 bg-kiln/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-porcelain rounded-[2.5rem_1.25rem_2.5rem_1.25rem] shadow-2xl border border-kiln/10 overflow-hidden z-10 my-8 text-kiln"
            role="dialog"
            aria-modal="true"
          >
            {/* Top decorative texture header */}
            <div className="bg-kiln text-porcelain px-6 sm:px-8 py-6 relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rust/30 flex items-center justify-center text-rust">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <span className="font-script text-xl text-rust">Tintinkss Studio</span>
                    <h2 className="font-display font-medium text-2xl sm:text-3xl leading-tight">
                      {activeTab === "commission"
                        ? "Start a Custom Brief"
                        : activeTab === "visit"
                        ? "Book a Studio Visit"
                        : "Ask Jia a Question"}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={closeModal}
                  className="w-9 h-9 rounded-full bg-porcelain/10 hover:bg-porcelain/20 text-porcelain flex items-center justify-center transition-colors"
                  aria-label="Close dialog"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tab navigation */}
              <div className="flex gap-2 mt-5 border-t border-porcelain/15 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("commission");
                    setIsSubmitted(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeTab === "commission"
                      ? "bg-rust text-porcelain shadow-sm"
                      : "bg-porcelain/10 text-porcelain/70 hover:text-porcelain"
                  }`}
                >
                  🎨 Custom Commission
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("visit");
                    setIsSubmitted(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeTab === "visit"
                      ? "bg-rust text-porcelain shadow-sm"
                      : "bg-porcelain/10 text-porcelain/70 hover:text-porcelain"
                  }`}
                >
                  🪴 Studio Visit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("general");
                    setIsSubmitted(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeTab === "general"
                      ? "bg-rust text-porcelain shadow-sm"
                      : "bg-porcelain/10 text-porcelain/70 hover:text-porcelain"
                  }`}
                >
                  💬 Quick Question
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
              {isSubmitted ? (
                <div className="py-8 px-4 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-sage/30 text-sage-800 flex items-center justify-center mb-4">
                    <Check size={32} className="text-sage" />
                  </div>
                  <span className="font-script text-2xl text-rust">Brief generated!</span>
                  <h3 className="font-display font-medium text-3xl text-kiln mt-1 mb-3">
                    Your message is ready
                  </h3>
                  <p className="font-display italic font-normal text-kiln/80 max-w-md mx-auto mb-6 text-sm sm:text-base">
                    If WhatsApp didn&apos;t automatically open, click below to launch the chat with Jia or copy your formatted brief.
                  </p>

                  <div className="flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={handleWhatsAppSend}
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#25D366] text-white font-medium hover:bg-[#1EBE5D] transition-colors shadow-sm"
                    >
                      <WhatsAppIcon size={18} />
                      Open WhatsApp Chat
                    </button>
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-kiln/20 hover:border-kiln/40 text-kiln font-medium transition-colors"
                    >
                      {isCopied ? <CheckCheck size={16} className="text-sage" /> : <Copy size={16} />}
                      {isCopied ? "Copied to Clipboard!" : "Copy Brief Text"}
                    </button>
                  </div>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-xs text-kiln/60 hover:text-rust underline"
                  >
                    Edit details & resend
                  </button>
                </div>
              ) : (
                <form onSubmit={handleWhatsAppSend} className="space-y-5">
                  {/* Category Chips for Commission */}
                  {activeTab === "commission" && (
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-kiln/70 mb-2">
                        What piece do you have in mind?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                              selectedCategory === cat
                                ? "bg-kiln text-porcelain border-kiln shadow-sm"
                                : "bg-bisque/60 text-kiln/80 border-kiln/10 hover:border-kiln/30"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Visit Date & Time */}
                  {activeTab === "visit" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-kiln/70 mb-1.5">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={visitDate}
                          onChange={(e) => setVisitDate(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-bisque/40 border border-kiln/15 focus:border-rust focus:outline-none text-sm text-kiln"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-kiln/70 mb-1.5">
                          Preferred Time Slot
                        </label>
                        <select
                          value={visitTime}
                          onChange={(e) => setVisitTime(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-bisque/40 border border-kiln/15 focus:border-rust focus:outline-none text-sm text-kiln"
                        >
                          {visitTimes.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Name & Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-kiln/70 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maya Nair"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-bisque/40 border border-kiln/15 focus:border-rust focus:outline-none text-sm text-kiln placeholder:text-kiln/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-kiln/70 mb-1.5">
                        WhatsApp / Instagram Handle *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. +91 98470... or @mayastyle"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-bisque/40 border border-kiln/15 focus:border-rust focus:outline-none text-sm text-kiln placeholder:text-kiln/40"
                      />
                    </div>
                  </div>

                  {/* Quantity & Timeline for Commission */}
                  {activeTab === "commission" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-kiln/70 mb-1.5">
                          Quantity
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 1 piece, set of 2, set of 4"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-bisque/40 border border-kiln/15 focus:border-rust focus:outline-none text-sm text-kiln placeholder:text-kiln/40"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-kiln/70 mb-1.5">
                          Timeline / Target Date
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Flexible, by Oct 15th, Birthday gift"
                          value={timeline}
                          onChange={(e) => setTimeline(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-bisque/40 border border-kiln/15 focus:border-rust focus:outline-none text-sm text-kiln placeholder:text-kiln/40"
                        />
                      </div>
                    </div>
                  )}

                  {/* Brief / Details */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-kiln/70 mb-1.5">
                      {activeTab === "commission"
                        ? "Tell Jia the Story / Idea & Preferences *"
                        : activeTab === "visit"
                        ? "Notes for your visit (Special requests / occasion)"
                        : "Your Message *"}
                    </label>
                    <textarea
                      rows={3}
                      required={activeTab !== "visit"}
                      placeholder={
                        activeTab === "commission"
                          ? "Share the occasion, person, initials, glaze mood (e.g. speckled cream, earthy terracotta, moss green), or functional details..."
                          : activeTab === "visit"
                          ? "Let Jia know if you're looking for specific pieces or interested in seeing wheel throwing in action."
                          : "How can Jia help with your pottery inquiry?"
                      }
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-bisque/40 border border-kiln/15 focus:border-rust focus:outline-none text-sm text-kiln placeholder:text-kiln/40 resize-none"
                    />
                  </div>

                  {/* Submission Action Buttons */}
                  <div className="pt-3 border-t border-kiln/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-kiln/60">
                      <MapPin size={14} className="text-rust" />
                      <span>Studio based in Kottayam, ships all-India</span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleEmailSend}
                        className="px-4 py-2.5 rounded-full border border-kiln/20 hover:border-kiln/40 text-kiln text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                        title="Send via Email instead"
                      >
                        <Mail size={15} />
                        <span className="hidden sm:inline">Email</span>
                      </button>

                      <button
                        type="submit"
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-rust hover:bg-rust/90 text-porcelain text-sm font-medium transition-all shadow-md hover:shadow-lg group"
                      >
                        <WhatsAppIcon size={16} />
                        <span>Send on WhatsApp</span>
                        <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
