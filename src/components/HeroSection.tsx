'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Globe, Zap } from 'lucide-react'
import { openDemoModal } from '@/components/openDemoModal'

// ─── Animated dot paths ───────────────────────────────────────────────────────
// Legacy: Browser ↔ App Server
const L_C1 = 'M 228 114 L 228 152'
// Legacy: App Server → Metadata
const L_C2 = 'M 228 200 L 228 238'
// Legacy: E.S. → Internal Storage (Import, upward)
const L_C3 = 'M 329 468 L 329 376'

// MPP: Browser ↔ App Server (left gutter)
const R_C1 = 'M 508 90 L 494 90 L 494 248 L 508 248'
// MPP: App Server → E.S. (right gutter)
const R_C2 = 'M 884 248 L 900 248 L 900 490 L 884 490'

function ArchDiagram() {
  return (
    <svg viewBox="0 0 960 560" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">

      {/* ── PANELS ── */}
      <rect x="8" y="8" width="440" height="544" rx="16" fill="#FAFAF8" stroke="#E5DDD4" strokeWidth="1.5" />
      <rect x="492" y="8" width="460" height="544" rx="16" fill="#0D1B2A" stroke="#1A3A5C" strokeWidth="1.5" />

      {/* ── PANEL LABELS ── */}
      <circle cx="28" cy="32" r="5" fill="#E05A2B" />
      <text x="40" y="37" fill="#E05A2B" fontSize="10" fontWeight="800" fontFamily="system-ui" letterSpacing="2">TRADITIONAL BI</text>
      <text x="40" y="52" fill="#E05A2B" fontSize="9" fontFamily="monospace" fillOpacity="0.55">Tableau · Power BI · Looker</text>

      <circle cx="510" cy="32" r="5" fill="#0AAEDB" />
      <text x="522" y="37" fill="#0AAEDB" fontSize="10" fontWeight="800" fontFamily="system-ui" letterSpacing="2">MPP BI</text>
      <text x="522" y="52" fill="#10B981" fontSize="9" fontFamily="monospace" fillOpacity="0.75">2-tier · No calc engine · Always live</text>

      {/* ══════════ LEFT STACK ══════════ */}

      {/* Left gutter: App Server ↔ CE/IS — drawn BEFORE boxes so boxes paint over crossing points */}
      <polyline points="32,176 16,176 16,346 32,346" fill="none" stroke="#E05A2B" strokeWidth="2.5" strokeOpacity="0.7" strokeLinejoin="round" />
      {/* arrowhead bottom → into CE */}
      <polygon points="32,346 20,340 20,352" fill="#E05A2B" fillOpacity="0.7" />
      {/* arrowhead top → double-headed */}
      <polygon points="32,176 20,170 20,182" fill="#E05A2B" fillOpacity="0.7" />
      <text x="5" y="275" fill="#E05A2B" fontSize="9" fontFamily="monospace" fillOpacity="0.8" transform="rotate(-90,5,275)">data travels ↕</text>

      {/* Right gutter: App Server → E.S. Direct/Live SQL */}
      <polyline points="424,176 442,176 442,492 424,492" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeOpacity="0.5" strokeLinejoin="round" />
      <polygon points="424,492 436,486 436,498" fill="#9CA3AF" fillOpacity="0.5" />
      <text x="450" y="335" fill="#9CA3AF" fontSize="9" fontFamily="monospace" fillOpacity="0.7" transform="rotate(90,450,335)">Direct / Live SQL</text>

      {/* 1. Browser Client */}
      <rect x="32" y="66" width="392" height="48" rx="10" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
      <text x="228" y="84" textAnchor="middle" fill="#111827" fontSize="13" fontWeight="700" fontFamily="system-ui">Browser Client</text>
      <text x="228" y="102" textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">Dashboard your team sees</text>

      {/* Browser ↔ App Server double-headed */}
      <line x1="228" y1="114" x2="228" y2="152" stroke="#9CA3AF" strokeWidth="2" strokeOpacity="0.6" />
      <polygon points="228,114 224,122 232,122" fill="#9CA3AF" fillOpacity="0.6" />
      <polygon points="228,152 224,144 232,144" fill="#9CA3AF" fillOpacity="0.6" />

      {/* 2. App Server */}
      <rect x="32" y="152" width="392" height="48" rx="10" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
      <text x="228" y="170" textAnchor="middle" fill="#111827" fontSize="13" fontWeight="700" fontFamily="system-ui">App Server</text>
      <text x="228" y="188" textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">Sessions, routing, query prep</text>

      {/* App Server → Metadata single arrow */}
      <line x1="228" y1="200" x2="228" y2="238" stroke="#9CA3AF" strokeWidth="2" strokeOpacity="0.6" />
      <polygon points="228,238 224,230 232,230" fill="#9CA3AF" fillOpacity="0.6" />

      {/* 3. Metadata Storage — drawn AFTER gutter so white fill covers the crossing */}
      <rect x="32" y="238" width="392" height="48" rx="10" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
      <text x="228" y="256" textAnchor="middle" fill="#111827" fontSize="13" fontWeight="700" fontFamily="system-ui">Metadata Storage</text>
      <text x="228" y="274" textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">Dashboards, users, settings</text>

      {/* 4. CE + IS side by side */}
      <rect x="32" y="316" width="185" height="60" rx="10" fill="#FEF2EE" stroke="#E05A2B" strokeWidth="1.5" />
      <text x="124" y="338" textAnchor="middle" fill="#E05A2B" fontSize="12" fontWeight="700" fontFamily="system-ui">Calc Engine</text>
      <text x="124" y="354" textAnchor="middle" fill="#E05A2B" fontSize="9" fontFamily="system-ui" fillOpacity="0.7">Hyper / VertiPaq</text>
      <text x="124" y="368" textAnchor="middle" fill="#E05A2B" fontSize="9" fontFamily="system-ui" fillOpacity="0.6">eats RAM · breaks live mode</text>

      {/* CE ↔ IS double-headed */}
      <line x1="217" y1="346" x2="235" y2="346" stroke="#E05A2B" strokeWidth="2" strokeOpacity="0.6" />
      <polygon points="217,346 225,342 225,350" fill="#E05A2B" fillOpacity="0.6" />
      <polygon points="235,346 227,342 227,350" fill="#E05A2B" fillOpacity="0.6" />

      <rect x="235" y="316" width="189" height="60" rx="10" fill="#FEF2EE" stroke="#E05A2B" strokeWidth="1.5" />
      <text x="329" y="338" textAnchor="middle" fill="#E05A2B" fontSize="12" fontWeight="700" fontFamily="system-ui">Internal Storage</text>
      <text x="329" y="354" textAnchor="middle" fill="#E05A2B" fontSize="9" fontFamily="system-ui" fillOpacity="0.7">imported · stale · expensive</text>
      <text x="329" y="368" textAnchor="middle" fill="#E05A2B" fontSize="9" fontFamily="system-ui" fillOpacity="0.6">RAM ceiling applies</text>

      {/* E.S. → IS Import (dashed, upward) */}
      <line x1="329" y1="468" x2="329" y2="376" stroke="#E05A2B" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="6 4" />
      <polygon points="329,376 325,384 333,384" fill="#E05A2B" fillOpacity="0.6" />
      <text x="338" y="428" fill="#E05A2B" fontSize="9" fontFamily="monospace" fillOpacity="0.8">Import</text>

      {/* 5. E.S. Legacy */}
      <rect x="32" y="468" width="392" height="52" rx="10" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
      <text x="228" y="490" textAnchor="middle" fill="#374151" fontSize="13" fontWeight="700" fontFamily="system-ui">E.S.</text>
      <text x="228" y="508" textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">Externally connected. Data extracted and moved.</text>

      {/* ── ANIMATED DOTS (Legacy) ── */}
      <circle r="5" fill="#E05A2B" fillOpacity="0.9">
        <animateMotion dur="1.6s" begin="0s" repeatCount="indefinite" path={L_C1} />
      </circle>
      <circle r="5" fill="#9CA3AF" fillOpacity="0.9">
        <animateMotion dur="1.6s" begin="0.5s" repeatCount="indefinite" path={L_C2} />
      </circle>
      <circle r="5" fill="#E05A2B" fillOpacity="0.9">
        <animateMotion dur="1.6s" begin="1.0s" repeatCount="indefinite" path={L_C3} />
      </circle>

      {/* ── VS ── */}
      <circle cx="470" cy="284" r="20" fill="#111827" stroke="#1E3A5F" strokeWidth="1.5" />
      <text x="470" y="288" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="800" fontFamily="system-ui">VS</text>

      {/* ══════════ RIGHT STACK (MPP BI) ══════════ */}

      {/* Left gutter: Browser ↔ App Server */}
      <polyline points="508,90 494,90 494,248 508,248" fill="none" stroke="#0AAEDB" strokeWidth="2.5" strokeOpacity="0.7" strokeLinejoin="round" />
      <polygon points="508,90 496,84 496,96" fill="#0AAEDB" fillOpacity="0.7" />
      <polygon points="508,248 496,242 496,254" fill="#0AAEDB" fillOpacity="0.7" />

      {/* Right gutter: App Server → E.S. Direct push */}
      <polyline points="884,248 900,248 900,490 884,490" fill="none" stroke="#0AAEDB" strokeWidth="2.5" strokeOpacity="0.7" strokeLinejoin="round" />
      <polygon points="884,490 896,484 896,496" fill="#0AAEDB" fillOpacity="0.7" />
      <text x="908" y="380" fill="#0AAEDB" fontSize="9" fontFamily="monospace" fillOpacity="0.7" transform="rotate(90,908,380)">Direct push</text>

      {/* Metadata Storage dashed container — drawn after gutters */}
      <rect x="496" y="126" width="384" height="218" rx="12" fill="#0AAEDB" fillOpacity="0.03" stroke="#0AAEDB" strokeWidth="1" strokeDasharray="6 3" strokeOpacity="0.4" />
      <text x="688" y="146" textAnchor="middle" fill="#0AAEDB" fontSize="10" fontFamily="monospace" fillOpacity="0.6" letterSpacing="1">METADATA STORAGE</text>

      {/* 1. Browser Client */}
      <rect x="508" y="66" width="372" height="48" rx="10" fill="#0D2137" stroke="#334155" strokeWidth="1.5" />
      <text x="694" y="84" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="13" fontWeight="700" fontFamily="system-ui">Browser Client</text>
      <text x="694" y="102" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="system-ui">Same lightweight client. No plugins.</text>

      {/* 2. App Server inside Metadata Storage */}
      <rect x="508" y="158" width="372" height="162" rx="10" fill="#0D2137" stroke="#0AAEDB" strokeWidth="2"
        style={{ filter: 'drop-shadow(0 0 14px rgba(10,174,219,0.18))' }} />
      <text x="694" y="222" textAnchor="middle" fill="#0AAEDB" fontSize="16" fontWeight="800" fontFamily="system-ui">App Server</text>
      <text x="694" y="242" textAnchor="middle" fill="#0AAEDB" fontSize="10" fontFamily="system-ui" fillOpacity="0.6">App Server + Metadata — unified inside PostgreSQL</text>
      <rect x="520" y="256" width="156" height="28" rx="7" fill="#10B981" fillOpacity="0.09" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3" />
      <text x="598" y="274" textAnchor="middle" fill="#10B981" fontSize="10.5" fontFamily="system-ui" fontWeight="600">No Calc Engine</text>
      <rect x="688" y="256" width="156" height="28" rx="7" fill="#10B981" fillOpacity="0.09" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3" />
      <text x="766" y="274" textAnchor="middle" fill="#10B981" fontSize="10.5" fontFamily="system-ui" fontWeight="600">No Data Copy</text>

      {/* 3. E.S. MPP BI */}
      <rect x="508" y="468" width="372" height="60" rx="12" fill="#0D2137" stroke="#0AAEDB" strokeWidth="2"
        style={{ filter: 'drop-shadow(0 0 14px rgba(10,174,219,0.18))' }} />
      <text x="694" y="492" textAnchor="middle" fill="#0AAEDB" fontSize="15" fontWeight="800" fontFamily="system-ui">E.S.</text>
      <text x="694" y="510" textAnchor="middle" fill="#0AAEDB" fontSize="10" fontFamily="system-ui" fillOpacity="0.6">Query runs here. Data never moves. Always live.</text>

      {/* ── ANIMATED DOTS (MPP BI) ── */}
      <circle r="5" fill="#0AAEDB" style={{ filter: 'drop-shadow(0 0 6px rgba(10,174,219,0.85))' }}>
        <animateMotion dur="1.1s" begin="0s" repeatCount="indefinite" path={R_C1} />
      </circle>
      <circle r="5" fill="#0AAEDB" style={{ filter: 'drop-shadow(0 0 6px rgba(10,174,219,0.85))' }}>
        <animateMotion dur="1.1s" begin="0.55s" repeatCount="indefinite" path={R_C2} />
      </circle>

    </svg>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden bg-white">
      <div className="absolute inset-0 dot-grid opacity-25" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(10,174,219,0.07) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(0,116,166,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col items-center text-center gap-8">

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#0AAEDB] text-xs font-semibold uppercase tracking-[0.15em]"
          >
            Next-Generation Business Intelligence
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-[#0D1B2A]">
              Built Inside Your Data.
              <br />
              <span className="gradient-text">The New Age of BI.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="max-w-2xl text-lg md:text-xl text-[#374151] leading-relaxed"
          >
            MPP BI is built for the next generation of business intelligence and analytics. The business logic runs directly inside the database — not on top of it. We don&apos;t need the calculation engine or BI servers. 2×–12× faster than traditional BI, increasing with query complexity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <button onClick={openDemoModal} className="bg-[#0AAEDB] hover:bg-[#0074A6] text-white font-semibold text-base px-7 py-3.5 rounded-lg transition-colors duration-200 min-w-[180px] text-center">Book a Demo</button>
            <Link
              href="#architecture"
              className="text-[#0D1B2A] font-medium text-base hover:text-[#0AAEDB] transition-colors underline-offset-4 hover:underline"
            >
              Explore the Architecture →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#6B7280]"
          >
            <span className="flex items-center gap-1.5">
              <Globe size={12} className="text-[#0AAEDB]" />
              UN Supplier
            </span>
            <span className="text-[#D1D5DB]">·</span>
            <span className="flex items-center gap-1.5">
              <Zap size={12} className="text-[#0AAEDB]" />
              20+ Years Delivery
            </span>
            <span className="text-[#D1D5DB]">·</span>
            <span>Banking · Oil &amp; Gas · Insurance · Construction</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="w-full mt-4 rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.18)]"
          >
            <ArchDiagram />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
