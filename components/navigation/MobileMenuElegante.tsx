'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MENU_ITEMS, ABPMC_MEGA } from './menu-data';

interface MobileMenuEleganteProps {
  isOpen: boolean;
  onClose: () => void;
  scrolled: boolean;
}

export default function MobileMenuElegante({ isOpen, onClose, scrolled }: MobileMenuEleganteProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const pathname = usePathname();

  // Fechar menu ao mudar de página
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Prevenir scroll quando menu está aberto
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }
    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen]);

  const toggleAccordion = (label: string) => {
    setOpenAccordion(openAccordion === label ? null : label);
  };

  return (
    <>
      {/* Backdrop com blur */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[80] md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Menu Drawer - Desliza da direita */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl z-[90] md:hidden transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header do Menu */}
        <div className="sticky top-0 bg-gradient-to-r from-[#0B2E47] to-[#163B56] text-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Menu</h2>
              <p className="text-xs text-gray-300 mt-1">ABPMC</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Fechar menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Conteúdo do Menu */}
        <nav className="overflow-y-auto h-[calc(100vh-180px)] p-4">
          <ul className="space-y-1">
            {MENU_ITEMS.map((item) => {
              if (item.type === 'link') {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`block py-3.5 px-4 text-base font-semibold rounded-xl transition-all ${
                        pathname === item.href
                          ? 'bg-gradient-to-r from-[#01C2CE] to-[#22949e] text-white shadow-md'
                          : 'text-[#0B2E47] hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              if (item.type === 'dropdown') {
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => toggleAccordion(item.label)}
                      className="w-full flex items-center justify-between py-3.5 px-4 text-base font-semibold text-[#0B2E47] hover:bg-gray-100 rounded-xl transition-all"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-5 h-5 transform transition-transform duration-200 ${
                          openAccordion === item.label ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Submenu com animação */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openAccordion === item.label ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="ml-4 mt-2 space-y-1 border-l-2 border-[#01C2CE] pl-3">
                        {item.items.map((subitem) => (
                          <div key={subitem.label}>
                            <Link
                              href={subitem.href}
                              className={`block py-2.5 px-3 text-sm rounded-lg transition-colors ${
                                pathname === subitem.href
                                  ? 'bg-[#01C2CE]/10 text-[#01C2CE] font-medium'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {subitem.label}
                            </Link>
                            
                            {/* Sub-subitems */}
                            {subitem.subitems && (
                              <div className="ml-3 mt-1 space-y-1">
                                {subitem.subitems.map((sub) =>
                                  sub.external ? (
                                    <a
                                      key={sub.label}
                                      href={sub.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block py-2 px-3 text-xs text-gray-600 hover:text-[#01C2CE] hover:bg-gray-50 rounded transition-colors"
                                    >
                                      {sub.label} ↗
                                    </a>
                                  ) : (
                                    <Link
                                      key={sub.label}
                                      href={sub.href}
                                      className="block py-2 px-3 text-xs text-gray-600 hover:text-[#01C2CE] hover:bg-gray-50 rounded transition-colors"
                                    >
                                      {sub.label}
                                    </Link>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }

              if (item.type === 'mega') {
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => toggleAccordion(item.label)}
                      className="w-full flex items-center justify-between py-3.5 px-4 text-base font-semibold text-[#0B2E47] hover:bg-gray-100 rounded-xl transition-all"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-5 h-5 transform transition-transform duration-200 ${
                          openAccordion === item.label ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Mega menu mobile */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openAccordion === item.label ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="mt-2 space-y-3">
                        {ABPMC_MEGA.top.map((col) => (
                          <div key={col.title} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 shadow-sm">
                            <h4 className="font-bold text-sm text-[#0B2E47] mb-3 flex items-center gap-2">
                              <span className="w-1 h-4 bg-[#01C2CE] rounded-full"></span>
                              {col.title}
                            </h4>
                            <div className="space-y-1">
                              {col.links.map((link) => (
                                <Link
                                  key={link.label}
                                  href={link.href}
                                  className="block py-2 px-3 text-sm text-gray-700 hover:text-[#01C2CE] hover:bg-white rounded-lg transition-colors"
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                        
                        {/* Bottom section */}
                        {ABPMC_MEGA.bottom && Array.isArray(ABPMC_MEGA.bottom) && ABPMC_MEGA.bottom.map((bottomCol: any) => (
                          <div key={bottomCol.title} className="bg-gradient-to-br from-[#01C2CE]/10 to-[#22949e]/10 rounded-xl p-4">
                            <h4 className="font-bold text-sm text-[#0B2E47] mb-3 flex items-center gap-2">
                              <span className="w-1 h-4 bg-[#22949e] rounded-full"></span>
                              {bottomCol.title}
                            </h4>
                            <div className="space-y-1">
                              {bottomCol.links.map((link: any) =>
                                link.external ? (
                                  <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block py-2 px-3 text-sm text-gray-700 hover:text-[#22949e] hover:bg-white rounded-lg transition-colors"
                                  >
                                    {link.label} ↗
                                  </a>
                                ) : (
                                  <Link
                                    key={link.label}
                                    href={link.href}
                                    className="block py-2 px-3 text-sm text-gray-700 hover:text-[#22949e] hover:bg-white rounded-lg transition-colors"
                                  >
                                    {link.label}
                                  </Link>
                                )
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }

              return null;
            })}
          </ul>
        </nav>

        {/* Footer do Menu - CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
          <Link
            href="/auth/associado"
            className="block w-full py-3 px-6 bg-gradient-to-r from-[#01C2CE] to-[#22949e] hover:from-[#22949e] hover:to-[#01C2CE] text-white text-center font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Área do Associado
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
