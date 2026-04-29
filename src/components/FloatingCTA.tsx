'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar } from 'lucide-react'
import Link from 'next/link'
import { openDemoModal } from '@/components/openDemoModal'


export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true)
      } else if (window.scrollY <= 300) {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDismissed(true)
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        >
          {/* Main button */}
<button onClick={openDemoModal} className="flex items-center gap-2.5 bg-[#0AAEDB] text-[#0A0E1A] px-5 py-3 rounded-xl font-semibold text-sm shadow-[0_0_30px_rgba(0,194,255,0.4)] hover:shadow-[0_0_40px_rgba(0,194,255,0.6)] hover:bg-[#00A8E0] transition-all duration-200 active:scale-[0.98]"><Calendar size={15} /> Book a Demo </button>

          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="w-8 h-8 rounded-full bg-white border border-white/10 flex items-center justify-center text-[#6B7280] hover:text-[#0D1B2A] hover:border-white/20 transition-all duration-200"
            aria-label="Dismiss"
          >
            <X size={13} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
