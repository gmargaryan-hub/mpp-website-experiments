'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { openDemoModal } from '@/components/openDemoModal'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Compare', href: '#comparison' },
  { label: 'Research', href: '#research' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 border-b border-[#E2E8F0] ${
        scrolled ? 'shadow-[0_1px_12px_rgba(0,0,0,0.08)]' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/mppbi-logo.png"
              alt="MPP BI"
              width={200}
              height={64}
              className="object-contain h-20 w-auto"
              priority
              unoptimized
            />
          </Link>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#374151] hover:text-[#0AAEDB] text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <button onClick={openDemoModal} className="bg-[#0AAEDB] hover:bg-[#0074A6] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200">Book a Demo</button>
          </div>

          {/* Mobile */}
          <button
            className="md:hidden p-2 text-[#374151] hover:text-[#0AAEDB] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-[#E2E8F0] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[#374151] hover:text-[#0AAEDB] text-base font-medium transition-colors py-2 border-b border-[#E2E8F0] last:border-0"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => { openDemoModal(); setMobileOpen(false); }}
                className="bg-[#0AAEDB] text-white text-sm font-semibold px-5 py-3 rounded-lg text-center mt-2">Book a Demo</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
