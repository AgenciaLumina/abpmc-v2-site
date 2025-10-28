"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MENU_ITEMS, RIGHT_ICONS, ABPMC_MEGA, type Column } from "./menu-data";

function MobileAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3.5 px-4 text-base font-semibold text-[#0B2E47] hover:bg-gray-50 rounded-lg transition-colors"
      >
        <span>{title}</span>
        <svg 
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-2 pb-2 animate-slideDown">
          {children}
        </div>
      )}
    </div>
  );
}

const LOGO_LIGHT = "/images_estrutura/abpmc-logo-white-text.png";
const LOGO_DARK = "/images_estrutura/site-logo-90px.png";

function MegaPanel() {
  return (
    <div className="fixed left-0 right-0 top-[70px] z-[70]">
      <div className="max-w-[1440px] mx-auto bg-white shadow-2xl animate-fadeIn">
        <div className="px-12 py-12">
          {/* LINHA 1 - 4 COLUNAS COM DIVISÓRIAS */}
          <div className="grid grid-cols-4 gap-0 mb-12">
            {ABPMC_MEGA.top.map((col: Column, index: number) => (
              <div 
                key={col.title} 
                className={`px-8 ${index < ABPMC_MEGA.top.length - 1 ? 'border-r border-gray-200' : ''}`}
              >
                <h4 className="font-semibold text-base text-[#0B2E47] mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l.label}>
                      <Link 
                        href={l.href} 
                        className="text-[#0099CC] hover:text-[#01C2CE] text-sm transition-colors block"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* LINHA 2 - 3 COLUNAS ALINHADAS À ESQUERDA */}
          <div className="grid grid-cols-4 gap-0">
            {ABPMC_MEGA.bottom.map((col: Column, index: number) => (
              <div 
                key={col.title} 
                className={`px-8 ${index < ABPMC_MEGA.bottom.length - 1 ? 'border-r border-gray-200' : ''}`}
              >
                <h4 className="font-semibold text-base text-[#0B2E47] mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l.label}>
                      <Link 
                        href={l.href} 
                        className="text-[#0099CC] hover:text-[#01C2CE] text-sm transition-colors block"
                      >
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
                <div 
                  key={item.label} 
                  className="relative group"
                  onMouseEnter={(e) => {
                    const dropdown = e.currentTarget.querySelector('.dropdown-menu') as HTMLElement;
                    if (dropdown) {
                      clearTimeout((dropdown as any).hideTimeout);
                      dropdown.classList.remove('hidden');
                    }
                  }}
                  onMouseLeave={(e) => {
                    const dropdown = e.currentTarget.querySelector('.dropdown-menu') as HTMLElement;
                    if (dropdown) {
                      (dropdown as any).hideTimeout = setTimeout(() => {
                        dropdown.classList.add('hidden');
                      }, 300);
                    }
                  }}
                >
                  <button
                    className={`inline-flex items-center gap-1 transition-colors ${
                      scrolled ? "text-[#222] hover:text-[#01C2CE]" : "text-white hover:text-[#01C2CE]"
                    }`}
                  >
                    {item.label}<span className="text-[12px]">▾</span>
                  </button>
                  <div className="dropdown-menu absolute left-0 top-full mt-2 bg-white border border-gray-200 shadow-xl rounded-md p-4 hidden z-[75] min-w-[260px] animate-fadeIn">
                    <ul className="space-y-2">
                      {item.items.map(i => (
                        <li key={i.label}>
                          <Link 
                            href={i.href} 
                            className="text-gray-700 hover:text-[#01C2CE] hover:bg-gray-50 text-[15px] block py-2 px-3 rounded-md transition-all"
                          >
                            {i.label}
                          </Link>
                          {i.subitems && (
                            <ul className="ml-4 mt-2 space-y-1 border-l-2 border-[#01C2CE] pl-3">
                              {i.subitems.map(sub => (
                                <li key={sub.label}>
                                  <Link
                                    href={sub.href}
                                    className="text-gray-600 hover:text-[#01C2CE] text-sm block py-1.5 px-2 rounded transition-all"
                                  >
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
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
                  className="relative"
                  onMouseEnter={() => {
                    clearTimeout((window as any).megaHideTimeout);
                    setOpenMega(true);
                  }}
                  onMouseLeave={() => {
                    (window as any).megaHideTimeout = setTimeout(() => {
                      setOpenMega(false);
                    }, 300);
                  }}
                >
                  <button
                    className={`inline-flex items-center gap-1 transition-colors ${
                      scrolled ? "text-[#222] hover:text-[#01C2CE]" : "text-white hover:text-[#01C2CE]"
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
          {/* Login */}
          <Link
            href="/login"
            aria-label="Login"
            className={`w-10 h-10 inline-flex items-center justify-center rounded-full transition-colors ${
              scrolled ? "text-[#222] hover:bg-neutral-100" : "text-white hover:bg-white/10"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </Link>
          
          {/* Carrinho */}
          <Link
            href="/checkout"
            aria-label="Checkout"
            className={`w-10 h-10 inline-flex items-center justify-center rounded-full transition-colors ${
              scrolled ? "text-[#222] hover:bg-neutral-100" : "text-white hover:bg-white/10"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
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
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 z-[80] md:hidden animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed top-[70px] left-0 right-0 bottom-0 bg-white z-[85] md:hidden overflow-y-auto animate-slideDown">
            <nav className="p-4 space-y-1">
              {MENU_ITEMS.map(item => {
                if (item.type === "link") {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block py-3.5 px-4 text-base font-semibold text-[#0B2E47] hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  );
                }
                
                if (item.type === "dropdown") {
                  return (
                    <MobileAccordion key={item.label} title={item.label}>
                      <div className="space-y-1 pt-2">
                        {item.items.map(i => (
                          <div key={i.label}>
                            <Link
                              href={i.href}
                              className="block py-2.5 px-4 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                            >
                              {i.label}
                            </Link>
                            {i.subitems && (
                              <div className="ml-4 mt-1 space-y-1 border-l-2 border-[#01C2CE] pl-3">
                                {i.subitems.map(sub => (
                                  <Link
                                    key={sub.label}
                                    href={sub.href}
                                    className="block py-2 px-3 text-xs text-gray-600 hover:text-[#01C2CE] hover:bg-gray-50 rounded transition-colors"
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </MobileAccordion>
                  );
                }
                
                if (item.type === "mega") {
                  return (
                    <MobileAccordion key={item.label} title={item.label}>
                      <div className="space-y-4 pt-2">
                        {ABPMC_MEGA.top.map(col => (
                          <div key={col.title} className="bg-gray-50 rounded-lg p-3">
                            <h4 className="font-bold text-sm text-[#0B2E47] mb-2 border-b border-[#01C2CE] pb-1">
                              {col.title}
                            </h4>
                            <div className="space-y-1">
                              {col.links.map(l => (
                                <Link
                                  key={l.label}
                                  href={l.href}
                                  className="block py-1.5 text-sm text-gray-700 hover:text-[#01C2CE] transition-colors"
                                >
                                  {l.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                        {ABPMC_MEGA.bottom.map(col => (
                          <div key={col.title} className="bg-gray-50 rounded-lg p-3">
                            <h4 className="font-bold text-sm text-[#0B2E47] mb-2 border-b border-[#01C2CE] pb-1">
                              {col.title}
                            </h4>
                            <div className="space-y-1">
                              {col.links.map(l => (
                                <Link
                                  key={l.label}
                                  href={l.href}
                                  className="block py-1.5 text-sm text-gray-700 hover:text-[#01C2CE] transition-colors"
                                >
                                  {l.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </MobileAccordion>
                  );
                }
                
                return null;
              })}
              
              {/* Login Mobile */}
              <Link
                href="/login"
                className="block py-3.5 px-4 text-base font-semibold text-[#0B2E47] hover:bg-gray-50 rounded-lg transition-colors mt-2"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login
                </span>
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
