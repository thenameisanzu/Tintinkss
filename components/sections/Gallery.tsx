"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  galleryItems,
  galleryCategories,
  GalleryItem,
  GalleryCategoryKey,
} from "@/lib/content";
import SplitText from "@/components/SplitText";
import { useInquiryModal } from "@/components/InquiryModalContext";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ArrowRight,
  Send,
  Camera,
} from "lucide-react";
import Magnetic from "@/components/Magnetic";

export default function Gallery() {
  const { openModal } = useInquiryModal();
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategoryKey>("all");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.categoryKey === selectedCategory);

  const currentIndex = activeItem
    ? filteredItems.findIndex((item) => item.id === activeItem.id)
    : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setActiveItem(filteredItems[currentIndex - 1]);
    } else {
      setActiveItem(filteredItems[filteredItems.length - 1]);
    }
  }, [currentIndex, filteredItems]);

  const handleNext = useCallback(() => {
    if (currentIndex < filteredItems.length - 1) {
      setActiveItem(filteredItems[currentIndex + 1]);
    } else {
      setActiveItem(filteredItems[0]);
    }
  }, [currentIndex, filteredItems]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!activeItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveItem(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, handlePrev, handleNext]);

  const handleInquire = (item: GalleryItem) => {
    setActiveItem(null);
    openModal("commission", item.inquiryCategory);
  };

  return (
    <section id="gallery" className="relative bg-bisque px-6 md:px-10 pt-28 md:pt-36 pb-24 md:pb-32 scroll-mt-20">
      {/* Decorative ambient backdrop */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-rust/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-sage/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-script text-2xl md:text-3xl text-rust inline-block mb-1"
            >
              Studio Archive & Works
            </motion.span>
            <h2 className="font-display font-medium text-huge text-kiln leading-[0.94]">
              <SplitText text="Made Slowly," />
              <br />
              <SplitText text="By Hand." delay={0.1} />
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display italic font-normal text-lg md:text-xl text-kiln/85 max-w-md leading-relaxed"
          >
            A look into the small batches, bespoke keepsakes, and functional ceramics thrown at our Kottayam wheel.
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-2.5 md:gap-3 mb-10"
        >
          {galleryCategories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                data-cursor-hover
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-kiln text-porcelain shadow-md scale-102"
                    : "bg-porcelain/80 text-kiln/80 hover:bg-porcelain hover:text-kiln border border-clay-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="galleryFilterActive"
                    className="absolute inset-0 bg-kiln rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Responsive Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="group relative rounded-[2rem_0.8rem_2rem_0.8rem] overflow-hidden bg-porcelain shadow-[0_16px_40px_-15px_rgba(58,46,38,0.18)] border border-clay-200/70 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5"
                onClick={() => setActiveItem(item)}
              >
                {/* Image / Placeholder Area */}
                <div className={`relative w-full aspect-[4/5] overflow-hidden bg-gradient-to-br ${item.colorTheme}`}>
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    /* Elegant Studio Placeholder */
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden bg-kiln/5">
                      {/* Concentric rings */}
                      <div className="absolute inset-0 opacity-25 pointer-events-none flex items-center justify-center">
                        <div className="w-52 h-52 rounded-full border border-kiln/40" />
                        <div className="w-36 h-36 rounded-full border border-kiln/40 absolute" />
                        <div className="w-20 h-20 rounded-full border border-kiln/40 absolute" />
                      </div>

                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-porcelain/90 backdrop-blur-md flex items-center justify-center text-kiln shadow-md mb-3 group-hover:scale-110 transition-transform duration-300">
                          <Camera className="w-5 h-5 text-rust" />
                        </div>
                        <span className="font-script text-2xl md:text-3xl text-kiln">
                          {item.potteryType}
                        </span>
                        <span className="text-[11px] font-mono tracking-wider uppercase text-kiln/80 font-medium mt-1 bg-porcelain/80 px-3 py-1 rounded-full shadow-xs">
                          {item.dimensions || "Handmade piece"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Gradient & Overlay with high contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-kiln via-kiln/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

                  {/* Tag badge on top left */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-porcelain text-kiln shadow-md border border-white/60">
                      {item.tag}
                    </span>
                  </div>

                  {/* Expand icon on top right */}
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-9 h-9 rounded-full bg-porcelain text-kiln flex items-center justify-center shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Card Content Footer */}
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-porcelain flex flex-col justify-end z-10">
                    <span className="text-xs uppercase tracking-widest font-mono text-rust-light font-semibold mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-display font-medium text-xl md:text-2xl text-porcelain leading-snug drop-shadow-sm">
                      {item.title}
                    </h3>
                    <p className="font-display italic text-xs md:text-sm text-porcelain/90 mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-porcelain/25 flex items-center justify-between text-xs font-medium">
                      <span className="text-rust-light font-script text-lg">View piece story</span>
                      <span className="flex items-center gap-1.5 text-porcelain font-medium group-hover:translate-x-1 transition-transform">
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Custom Order Callout Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 rounded-[2.5rem_1rem_2.5rem_1rem] bg-kiln text-porcelain p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-64 h-64 bg-rust/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-xl">
            <span className="font-script text-2xl text-rust-light inline-block">Looking for something custom?</span>
            <h3 className="font-display font-medium text-2xl md:text-3xl text-porcelain mt-1 leading-tight">
              Have an occasion, wedding, or specific glaze in mind?
            </h3>
            <p className="font-display italic text-sm md:text-base text-porcelain/85 mt-2 leading-relaxed">
              Jia throws custom batches of vases, personalised fridge magnets, and commemorative keepsakes by request.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <Magnetic
              as="button"
              onClick={() => openModal("commission")}
              className="px-7 py-3.5 rounded-full bg-rust hover:bg-rust-hover text-porcelain font-medium text-sm transition-all shadow-lg flex items-center gap-2"
            >
              <span>Submit a Brief</span>
              <ArrowRight className="w-4 h-4" />
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-kiln/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setActiveItem(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              data-cursor-hover
              className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-porcelain/15 hover:bg-porcelain/30 text-porcelain flex items-center justify-center transition-colors shadow-lg"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev / Next Arrows */}
            {filteredItems.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  data-cursor-hover
                  className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-porcelain/15 hover:bg-porcelain/30 text-porcelain items-center justify-center transition-all hover:scale-110 shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  data-cursor-hover
                  className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-porcelain/15 hover:bg-porcelain/30 text-porcelain items-center justify-center transition-all hover:scale-110 shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-kiln border border-porcelain/20 rounded-[2.5rem_1rem_2.5rem_1rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image / Placeholder Side */}
              <div className={`relative w-full md:w-3/5 h-72 md:h-[640px] bg-gradient-to-br ${activeItem.colorTheme} overflow-hidden flex items-center justify-center`}>
                {activeItem.image ? (
                  <Image
                    src={activeItem.image}
                    alt={activeItem.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-contain md:object-cover"
                    priority
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center relative z-10">
                    <div className="w-16 h-16 rounded-full bg-porcelain/90 backdrop-blur-md flex items-center justify-center text-kiln shadow-lg mb-4">
                      <Camera className="w-8 h-8 text-rust" />
                    </div>
                    <span className="font-script text-3xl md:text-4xl text-kiln">
                      {activeItem.potteryType}
                    </span>
                    <span className="font-display italic text-sm text-kiln/80 mt-2">
                      Tintinkss Pottery Studio • Kottayam
                    </span>
                    <span className="mt-4 px-4 py-1.5 rounded-full text-xs font-mono bg-porcelain/80 text-kiln font-semibold shadow-xs">
                      {activeItem.dimensions || "Handcrafted Batch"}
                    </span>
                  </div>
                )}
              </div>

              {/* Info Side */}
              <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between bg-kiln text-porcelain overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs uppercase tracking-widest font-mono text-rust-light font-semibold">
                      {activeItem.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-porcelain/15 text-porcelain border border-porcelain/20">
                      {activeItem.tag}
                    </span>
                  </div>

                  <h3 className="font-display font-medium text-2xl md:text-3xl text-porcelain leading-tight">
                    {activeItem.title}
                  </h3>

                  <p className="font-display italic text-base md:text-lg text-porcelain/90 mt-4 leading-relaxed">
                    {activeItem.description}
                  </p>

                  <div className="mt-6 p-4 rounded-xl bg-porcelain/5 border border-porcelain/10 space-y-2.5 text-xs text-porcelain/85">
                    <div className="flex justify-between">
                      <span className="text-porcelain/60">Studio Location:</span>
                      <span className="font-medium text-porcelain">Kottayam, Kerala</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-porcelain/60">Crafted by:</span>
                      <span className="font-medium text-porcelain">Jia Susan Joseph</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-porcelain/60">Method:</span>
                      <span className="font-medium text-porcelain">100% Wheel / Hand-finished</span>
                    </div>
                    {activeItem.dimensions && (
                      <div className="flex justify-between">
                        <span className="text-porcelain/60">Specs / Batch:</span>
                        <span className="font-medium text-porcelain">{activeItem.dimensions}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-porcelain/15 flex flex-col gap-3">
                  <button
                    onClick={() => handleInquire(activeItem)}
                    data-cursor-hover
                    className="w-full py-3.5 px-6 rounded-full bg-rust hover:bg-rust-hover text-porcelain font-medium text-sm transition-all shadow-lg flex items-center justify-center gap-2 group"
                  >
                    <span>Inquire About Similar Piece</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-center text-xs text-porcelain/60 font-display italic">
                    Every piece is crafted in individual batches; exact glaze and dimensions may vary naturally.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
