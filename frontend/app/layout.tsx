import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { ChatWidget } from "@/components/ai/ChatWidget";
import { CommandPalette } from "@/components/ai/CommandPalette";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OmniMind Retail",
  description: "AI-First Shopping Experience",
};

import { CartProvider } from "@/lib/cart";

import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen bg-background">
            {children}
          </main>
          <ChatWidget />
          <CommandPalette />
          <Toaster position="bottom-right" />
        </CartProvider>
      </body>
    </html>
  );
}
