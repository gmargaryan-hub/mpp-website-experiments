'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface OctopusLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  animated?: boolean
}

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 80,
  xl: 120,
}

export default function OctopusLogo({
  size = 'md',
  className,
  animated = true,
}: OctopusLogoProps) {
  const px = sizeMap[size]

  return (
    <motion.div
      className={cn('inline-flex items-center justify-center', className)}
      whileHover={animated ? { scale: 1.05 } : undefined}
      style={{ width: px, height: px }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={px}
        height={px}
        animate={
          animated
            ? {
                filter: [
                  'drop-shadow(0 0 4px rgba(0,194,255,0.5))',
                  'drop-shadow(0 0 12px rgba(0,194,255,0.9))',
                  'drop-shadow(0 0 4px rgba(0,194,255,0.5))',
                ],
              }
            : undefined
        }
        transition={animated ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } : undefined}
      >
        <defs>
          <radialGradient id="headGrad" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#00E5A0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00C2FF" stopOpacity="0" />
          </radialGradient>
          <filter id="glowFilter">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Tentacles — 8 curving outward/downward from base of head */}
        {/* Tentacle 1 — far left */}
        <path
          d="M 33 58 C 18 65 10 72 14 84 C 16 90 22 90 22 84"
          stroke="#00C2FF"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#glowFilter)"
        />
        {/* Tentacle 2 — center-left-outer */}
        <path
          d="M 38 62 C 26 70 22 80 28 88 C 30 92 36 90 34 84"
          stroke="#00C2FF"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#glowFilter)"
        />
        {/* Tentacle 3 — center-left-inner */}
        <path
          d="M 43 65 C 36 74 36 86 43 92 C 46 95 50 93 48 87"
          stroke="#00C2FF"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#glowFilter)"
        />
        {/* Tentacle 4 — center-left */}
        <path
          d="M 48 66 C 44 76 46 88 52 93 C 55 96 58 93 56 87"
          stroke="#00C2FF"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#glowFilter)"
        />
        {/* Tentacle 5 — center-right */}
        <path
          d="M 52 66 C 56 76 54 88 48 93 C 45 96 42 93 44 87"
          stroke="#00C2FF"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#glowFilter)"
        />
        {/* Tentacle 6 — center-right-inner */}
        <path
          d="M 57 65 C 64 74 64 86 57 92 C 54 95 50 93 52 87"
          stroke="#00C2FF"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#glowFilter)"
        />
        {/* Tentacle 7 — center-right-outer */}
        <path
          d="M 62 62 C 74 70 78 80 72 88 C 70 92 64 90 66 84"
          stroke="#00C2FF"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#glowFilter)"
        />
        {/* Tentacle 8 — far right */}
        <path
          d="M 67 58 C 82 65 90 72 86 84 C 84 90 78 90 78 84"
          stroke="#00C2FF"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#glowFilter)"
        />

        {/* Head/Mantle — oval */}
        <ellipse
          cx="50"
          cy="38"
          rx="22"
          ry="26"
          fill="#0A0E1A"
          stroke="#00C2FF"
          strokeWidth="2.5"
          filter="url(#glowFilter)"
        />

        {/* Inner mantle highlight */}
        <ellipse
          cx="50"
          cy="36"
          rx="16"
          ry="19"
          fill="url(#headGrad)"
        />

        {/* Mantle top dome accent */}
        <path
          d="M 30 38 Q 50 18 70 38"
          stroke="#00C2FF"
          strokeWidth="1"
          strokeOpacity="0.4"
          fill="none"
        />

        {/* Eyes */}
        <circle cx="43" cy="34" r="4" fill="#0A0E1A" stroke="#00C2FF" strokeWidth="1.5" />
        <circle cx="57" cy="34" r="4" fill="#0A0E1A" stroke="#00C2FF" strokeWidth="1.5" />

        {/* Eye pupils */}
        <circle cx="43" cy="34" r="1.8" fill="#00C2FF" />
        <circle cx="57" cy="34" r="1.8" fill="#00C2FF" />

        {/* Eye glints */}
        <circle cx="44" cy="33" r="0.7" fill="#ffffff" />
        <circle cx="58" cy="33" r="0.7" fill="#ffffff" />

        {/* Mantle fin details */}
        <path
          d="M 28 44 C 24 40 24 32 28 28"
          stroke="#00C2FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.6"
          fill="none"
        />
        <path
          d="M 72 44 C 76 40 76 32 72 28"
          stroke="#00C2FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.6"
          fill="none"
        />

        {/* Siphon at bottom of mantle */}
        <path
          d="M 44 62 Q 50 68 56 62"
          stroke="#00C2FF"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </motion.svg>
    </motion.div>
  )
}
