"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MENU_ITEMS, RIGHT_ICONS, ABPMC_MEGA, type Column } from "./menu-data";

const LOGO_LIGHT = "/images_estrutura/abpmc-logo-white-text.png";
const LOGO_DARK = "/images_estrutura/site-logo-90px.png";

function MegaPanel() {
  return (
    <div className="absolute left-0 right-0 top-full pt-3 z-[70]">
      <div className="mx-auto max-w-[1440px] px-10">
        <div className="bg-white rounded-sm border border-neutral-200 shadow-lg fade-in scale-in">
          <div className="px-12 py-10">
            {/* LINHA 1 */}
            <div className="flex items-start gap-8">
              {ABPMC_MEGA.top.map((col: Column) => (
                <div key={col.title} className="min-w-[260px] flex-1">
                  <h4 className="font-semibold text-[22px] text-[#0B1220] mb-4">{col.title}</h4>
                  <ul className="space-y-3">
                    {col.links.map(l => (
                      <li key={l.label}>
                        <Link href={l.href} className="text-primary-700 hover:text-primary-500 text-[15px]">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* DIVISÓRIA HORIZONTAL */}
            <div className="w-full h-px bg-neutral-200/80 my-8" aria-hidden="true" />

            {/* LINHA 2 */}
            <div className="flex items-start gap-8">
              {ABPMC_MEGA.bottom.map((col: Column) => (
                <div key={col.title} className="min-w-[260px] flex-1">
                  <h4 className="font-semibold text-[22px] text-[#0B1220] mb-4">{col.title}</h4>
                  <ul className="space-y-3">
                    {col.links.map(l => (
                      <li key={l.label}>
                        <Link href={l.href} className="text-primary-700 hover:text-primary-500 text-[15px]">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpenMega(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`site-header fixed top-0 left-0 w-full z-[90] transition-all duration-300 ${
        scrolled ? "is-stuck bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-8 h-[70px]">
        {/* LOGO */}
        <Link href="/" className="relative h-[50px] flex items-center">
          <Image
            src={LOGO_LIGHT}
            alt="ABPMC"
            width={160}
            height={50}
            priority
            className={`transition-all duration-300 ${scrolled ? "hidden" : "block"}`}
          />
          <Image
            src={LOGO_DARK}
            alt="ABPMC"
            width={90}
            height={50}
            priority
            className={`transition-all duration-300 ${scrolled ? "block" : "hidden"}`}
          />
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium">
          {MENU_ITEMS.map(item => {
            if (item.type === "link") {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`nav-link transition-colors ${
                    scrolled ? "text-[#222] hover:text-primary-700" : "text-white hover:text-[#01C2CE]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }
            
            if (item.type === "dropdown") {
              return (
                <div key={item.label} className="relative group">
                  <button
                    className={`inline-flex items-center gap-1 transition-colors ${
                      scrolled ? "text-[#222] hover:text-primary-700" : "text-white hover:text-[#01C2CE]"
                    }`}
                  >
                    {item.label}<span className="text-[12px]">▾</span>
                  </button>
                  <div className="absolute left-0 top-full mt-2 bg-white border border-neutral-200 shadow-lg rounded-sm p-4 hidden group-hover:block z-[75] min-w-[240px] fade-in">
                    <ul className="space-y-2">
                      {item.items.map(i => (
                        <li key={i.label}>
                          <Link href={i.href} className="text-neutral-700 hover:text-primary-700 text-[15px] block py-1">
                            {i.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }
            
            if (item.type === "mega") {
              return (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setOpenMega(true)}
                  onMouseLeave={() => setOpenMega(false)}
                >
                  <button
                    className={`inline-flex items-center gap-1 transition-colors ${
                      scrolled ? "text-[#222] hover:text-primary-700" : "text-white hover:text-[#01C2CE]"
                    }`}
                  >
                    {item.label}<span className="text-[12px]">▾</span>
                  </button>
                  {openMega && <MegaPanel />}
                </div>
              );
            }
            
            return null;
          })}
        </nav>

        {/* ÍCONES À DIREITA */}
        <div className="hidden md:flex items-center gap-3">
          {RIGHT_ICONS.map(i => (
            <Link
              key={i.label}
              href={i.href}
              aria-label={i.label}
              className={`w-10 h-10 inline-flex items-center justify-center rounded-full transition-colors ${
                scrolled ? "text-[#222] hover:bg-neutral-100" : "text-white hover:bg-white/10"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{i.icon}</span>
            </Link>
          ))}
          
          {/* Carrinho */}
          <Link
            href="/checkout"
            aria-label="Checkout"
            className={`w-10 h-10 inline-flex items-center justify-center rounded-full transition-colors ${
              scrolled ? "text-[#222] hover:bg-neutral-100" : "text-white hover:bg-white/10"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
          </Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-md transition-colors ${
            scrolled ? "text-[#222] hover:bg-neutral-100" : "text-white hover:bg-white/10"
          }`}
          aria-label="Abrir menu"
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-[80] md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed top-[70px] left-0 right-0 bottom-0 bg-white z-[85] md:hidden overflow-y-auto">
            <nav className="p-6 space-y-4">
              {MENU_ITEMS.map(item => {
                if (item.type === "link") {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block py-3 text-lg font-medium text-[#222] border-b border-gray-200"
                    >
                      {item.label}
                    </Link>
                  );
                }
                
                if (item.type === "dropdown") {
                  return (
                    <div key={item.label} className="border-b border-gray-200">
                      <div className="py-3 text-lg font-semibold text-[#222]">
                        {item.label}
                      </div>
                      <div className="pl-4 pb-2 space-y-2">
                        {item.items.map(i => (
                          <Link
                            key={i.label}
                            href={i.href}
                            className="block py-2 text-base text-gray-700"
                          >
                            {i.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                
                if (item.type === "mega") {
                  return (
                    <div key={item.label} className="border-b border-gray-200">
                      <div className="py-3 text-lg font-semibold text-[#222]">
                        {item.label}
                      </div>
                      <div className="pl-4 pb-2 space-y-3">
                        {ABPMC_MEGA.top.map(col => (
                          <div key={col.title}>
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">
                              {col.title}
                            </h4>
                            {col.links.map(l => (
                              <Link
                                key={l.label}
                                href={l.href}
                                className="block py-1 text-sm text-gray-700"
                              >
                                {l.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                        {ABPMC_MEGA.bottom.map(col => (
                          <div key={col.title}>
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">
                              {col.title}
                            </h4>
                            {col.links.map(l => (
                              <Link
                                key={l.label}
                                href={l.href}
                                className="block py-1 text-sm text-gray-700"
                              >
                                {l.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                
                return null;
              })}
              
              {/* Login Mobile */}
              <Link
                href="/login"
                className="block py-3 text-lg font-medium text-[#222]"
              >
                Login
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
