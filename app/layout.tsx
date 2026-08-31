import type { Metadata } from "next";
import { Fraunces, Caveat, Instrument_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";
import { InquiryModalProvider } from "@/components/InquiryModalContext";
import InquiryModal from "@/components/InquiryModal";
import QuickContactPill from "@/components/QuickContactPill";

const fraunces = Fraunces({
  weight: ["300", "400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const caveat = Caveat({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tintinkss by Jia — Handmade Ceramic Studio, Kottayam",
  description:
    "Wheel-thrown pottery, illustrated postcards, calendar cards, and custom ceramic collectibles, made by hand in Kottayam, Kerala.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${caveat.variable} ${instrumentSans.variable}`}>
      <body className="font-body bg-porcelain text-kiln antialiased">
        <InquiryModalProvider>
          <PageLoader />
          <CustomCursor />
          <SmoothScroll>{children}</SmoothScroll>
          <QuickContactPill />
          <InquiryModal />
        </InquiryModalProvider>
      </body>
    </html>
  );
}
