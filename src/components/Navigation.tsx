"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/context/LocaleContext";

const Navigation: React.FC = () => {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLocale();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const navItems = [
    { href: "/", label: t("nav.dashboard"), icon: "📊" },
    { href: "/add-account", label: t("nav.addAccount"), icon: "➕" },
    { href: "/record-balances", label: t("nav.transactions"), icon: "💸" },
    { href: "/historical", label: t("nav.historical"), icon: "📈" },
  ];

  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* <Image src="/image.png" alt="Logo" width={28} height={28} /> */}
          <span className="text-2xl">📈</span>
          <span className="font-semibold text-gray-800 ">
            Personal Finance Tracker
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLocale("en")}
              className={`px-2 py-1 rounded text-xs ${
                locale === "en"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLocale("th")}
              className={`px-2 py-1 rounded text-xs ${
                locale === "th"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              ไทย
            </button>
          </div>
        </div>

        <div className="md:hidden relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="px-3 py-2 rounded bg-gray-100 text-gray-800 text-sm"
          >
            {t("nav.menu")}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg p-2 z-50">
              <div className="flex items-center justify-between px-2 py-2">
                <span className="text-xs text-gray-500">
                  {t("nav.language")}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setLocale("en")}
                    className={`px-2 py-1 rounded text-xs ${
                      locale === "en"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLocale("th")}
                    className={`px-2 py-1 rounded text-xs ${
                      locale === "th"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    ไทย
                  </button>
                </div>
              </div>

              <div className="border-t my-2" />

              <nav className="flex flex-col">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
