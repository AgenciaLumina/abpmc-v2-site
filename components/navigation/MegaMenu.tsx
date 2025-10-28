'use client'

import { useEffect, useRef, useState } from 'react'
import { MEGA_MENU_GROUPS } from './megamenu.data'
import Link from 'next/link'

type Props = { triggerLabel?: string }

export default function MegaMenu({ triggerLabel = 'A ABPMC' }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => { 
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div 
      className="relative" 
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="px-3 py-2 text-[15px] font-medium text-white hover:text-[#01C2CE] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#01C2CE] rounded-md"
        aria-haspopup="menu"
        aria-expanded={open}
        onFocus={() => setOpen(true)}
      >
        {triggerLabel} <span className="text-[12px] ml-1">▾</span>
      </button>

      {open && (
        <div
          className="absolute left-1/2 z-[60] mt-2 w-[min(1200px,92vw)] -translate-x-1/2 animate-fadeIn"
        >
          <div
            className="rounded-2xl bg-white shadow-[0_12px_40px_rgba(11,46,71,0.15)] border border-gray-200"
            role="menu"
            aria-label="Mega menu"
          >
            {/* Primeira Linha - 4 Colunas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 p-10">
              {MEGA_MENU_GROUPS.slice(0,4).map((group, idx) => (
                <div 
                  key={group.title}
                  className={`
                    ${idx === 0 ? 'pr-8' : 'pl-8 pr-8'} 
                    ${idx > 0 ? 'border-l border-gray-200 hidden lg:block' : ''}
                    ${idx === 0 || idx === 1 ? 'block' : 'hidden lg:block'}
                  `}
                >
                  <h3 className="text-[18px] lg:text-[22px] leading-7 font-semibold text-[#0B2E47] mb-3">
                    {group.title}
                  </h3>
                  <ul className="space-y-3">
                    {group.items.map(item => (
                      <li key={item.label}>
                        <Link 
                          href={item.href}
                          className="text-[16px] lg:text-[18px] leading-6 text-[#0099CC] hover:text-[#01C2CE] hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01C2CE] rounded"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Divisória Horizontal */}
            <div className="border-t border-gray-200" />

            {/* Segunda Linha - 3 Colunas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 p-10">
              {MEGA_MENU_GROUPS.slice(4).map((group, idx) => (
                <div 
                  key={group.title}
                  className={`
                    ${idx === 0 ? 'pr-8' : 'pl-8 pr-8'} 
                    ${idx > 0 ? 'border-l border-gray-200 hidden lg:block' : ''}
                    ${idx === 0 || idx === 1 ? 'block' : 'hidden lg:block'}
                  `}
                >
                  <h3 className="text-[18px] lg:text-[22px] leading-7 font-semibold text-[#0B2E47] mb-3">
                    {group.title}
                  </h3>
                  <ul className="space-y-3">
                    {group.items.map(item => (
                      <li key={item.label}>
                        <Link 
                          href={item.href}
                          className="text-[16px] lg:text-[18px] leading-6 text-[#0099CC] hover:text-[#01C2CE] hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01C2CE] rounded"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
