import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FinanceProvider } from "@/context/FinanceContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { LocaleProvider } from "@/context/LocaleContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ClientOnly from "@/components/ClientOnly";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Finance Tracker",
  description: "Offline-first personal finance tracker (localStorage only).",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
        suppressHydrationWarning
      >
        <ClientOnly>
          <LocaleProvider>
            <FinanceProvider>
              <CurrencyProvider>
                <GoogleAnalytics />
                <div className="min-h-screen flex flex-col">
                  <Navigation />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              </CurrencyProvider>
            </FinanceProvider>
          </LocaleProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
