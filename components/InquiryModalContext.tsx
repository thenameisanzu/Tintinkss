"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ModalMode = "commission" | "visit" | "general";

interface ModalContextType {
  isOpen: boolean;
  mode: ModalMode;
  initialCategory?: string;
  openModal: (mode?: ModalMode, initialCategory?: string) => void;
  closeModal: () => void;
}

const InquiryModalContext = createContext<ModalContextType | undefined>(undefined);

export function InquiryModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ModalMode>("commission");
  const [initialCategory, setInitialCategory] = useState<string | undefined>(undefined);

  const openModal = (newMode: ModalMode = "commission", category?: string) => {
    setMode(newMode);
    setInitialCategory(category);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <InquiryModalContext.Provider value={{ isOpen, mode, initialCategory, openModal, closeModal }}>
      {children}
    </InquiryModalContext.Provider>
  );
}

export function useInquiryModal() {
  const context = useContext(InquiryModalContext);
  if (!context) {
    throw new Error("useInquiryModal must be used within an InquiryModalProvider");
  }
  return context;
}
