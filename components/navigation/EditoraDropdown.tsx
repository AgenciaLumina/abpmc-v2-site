'use client'

import { useEffect, useRef, useState } from 'react'
import { EDITORA_ITEMS } from './megamenu.data'
import Link from 'next/link'

export default function EditoraDropdown() {
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
        EDITORA <span className="text-[12px] ml-1">▾</span>
      </button>

      {open && (
        <div
          className="absolute left-0 z-[60] mt-2 w-[320px] animate-fadeIn"
        >
          <div
            className="rounded-lg bg-white shadow-[0_8px_30px_rgba(11,46,71,0.12)] border border-gray-200 p-4"
            role="menu"
            aria-label="Menu Editora"
          >
            <ul className="space-y-2">
              {EDITORA_ITEMS.map(item => (
                <li key={item.label}>
                  <Link 
                    href={item.href}
                    className="block px-3 py-2 text-[15px] text-gray-700 hover:text-[#01C2CE] hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
