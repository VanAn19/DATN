'use client'

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function CenteredLayouts({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="pt-[var(--header-height)]">
        {children}
      </div>
      <Footer />
    </div>
  );
}