'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Globe, Zap } from 'lucide-react'
import { openDemoModal } from '@/components/openDemoModal'

// ─── Each path string must exactly match the visible SVG line geometry ────────

// Connector segment paths — each dot travels only its own connector gap
// Left panel (legacy): 4 connector gaps between 5 boxes
const L_C1 = 'M 228 114 L 228 154'   // Browser → AppServer
const L_C2 = 'M 228 202 L 228 242'   // AppServer → MetaStorage
const L_C3 = 'M 228 290 L 228 330'   // MetaStorage → CalcEngine
const L_C4 = 'M 228 386 L 228 426'   // CalcEngine → Database

// Right panel (MPP): 2 connector gaps between 3 blocks
const R_C1 = 'M 712 114 L 712 174'   // Browser → Core (60px gap)
const R_C2 = 'M 712 304 L 712 386'   // Core → Database (82px gap)

function Connector({
  x1, y1, x2, y2,
  color = '#CBD5E1',
  dashed = false,
  label,
  labelX,
  labelY,
}: {
  x1: number; y1: number; x2: number; y2: number
  color?: string; dashed?: boolean
  label?: string; labelX?: number; labelY?: number
}) {
  return (
    <>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.6"
        strokeDasharray={dashed ? '6 5' : undefined}
      />
      <polygon
        points={`${x2},${y2} ${x2 - 4},${y2 - 8} ${x2 + 4},${y2 - 8}`}
        fill={color}
        fillOpacity="0.6"
      />
      {label && (
        <text x={labelX ?? x1 + 8} y={labelY ?? (y1 + y2) / 2 + 4}
          fill={color} fontSize="9" fontFamily="monospace" fillOpacity="0.85">
          {label}
        </text>
      )}
    </>
  )
}

function Box({
  x, y, w, h, label, sub, accent, dark,
}: {
  x: number; y: number; w: number; h: number
  label: string; sub?: string
  accent?: string; dark?: boolean
}) {
  const fill = accent ? `${accent}12` : dark ? '#0D2137' : 'white'
  const stroke = accent ?? (dark ? '#334155' : '#D1D5DB')
  const labelColor = accent ?? (dark ? 'rgba(255,255,255,0.85)' : '#111827')
  const subColor = dark ? 'rgba(255,255,255,0.35)' : '#9CA3AF'
  const glow = accent ? `drop-shadow(0 0 8px ${accent}55)` : undefined

  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx="10"
        fill={fill} stroke={stroke} strokeWidth={accent ? 2 : 1.5}
        style={glow ? { filter: glow } : undefined}
      />
      <text x={x + w / 2} y={sub ? y + h / 2 - 6 : y + h / 2 + 5}
        textAnchor="middle" fill={labelColor}
        fontSize="13" fontWeight="700" fontFamily="system-ui">
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 12}
          textAnchor="middle" fill={subColor} fontSize="10" fontFamily="system-ui">
          {sub}
        </text>
      )}
    </>
  )
}

function ArchDiagram() {
  // Left panel: x=8..448, boxes x=32 w=392, center x=228
  // Right panel: x=492..932, boxes x=508 w=408, center x=712
  return (
    <svg viewBox="0 0 940 500" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">

      {/* ── PANELS ──────────────────────────────────────────────────────── */}
      <rect x="8" y="8" width="440" height="484" rx="16" fill="#FAFAF8" stroke="#E5DDD4" strokeWidth="1.5" />
      <rect x="492" y="8" width="440" height="484" rx="16" fill="#0D1B2A" stroke="#1A3A5C" strokeWidth="1.5" />

      {/* ── PANEL LABELS ───────────────────────────────────────────────── */}
      <circle cx="28" cy="32" r="5" fill="#E05A2B" />
      <text x="40" y="37" fill="#E05A2B" fontSize="10" fontWeight="800" fontFamily="system-ui" letterSpacing="2">TRADITIONAL BI</text>
      <text x="40" y="52" fill="#E05A2B" fontSize="9" fontFamily="monospace" fillOpacity="0.55">Tableau · Power BI · Looker</text>

      <circle cx="510" cy="32" r="5" fill="#0AAEDB" />
      <text x="522" y="37" fill="#0AAEDB" fontSize="10" fontWeight="800" fontFamily="system-ui" letterSpacing="2">MPP BI</text>
      <text x="522" y="52" fill="#10B981" fontSize="9" fontFamily="monospace" fillOpacity="0.75">2-tier · No calc engine · Always live</text>

      {/* ── LEFT STACK (Traditional BI — 5 layers) ─────────────────────── */}

      <Box x={32} y={66} w={392} h={48} label="Browser Client" sub="Dashboard your team sees" />
      <Connector x1={228} y1={114} x2={228} y2={154} color="#9CA3AF" />

      <Box x={32} y={154} w={392} h={48} label="App Server" sub="Sessions, routing, query prep" />
      <Connector x1={228} y1={202} x2={228} y2={242} color="#9CA3AF" />

      <Box x={32} y={242} w={392} h={48} label="Metadata Storage" sub="Dashboards, users, settings" />

      {/* Red connector — data must physically travel */}
      <Connector x1={228} y1={290} x2={228} y2={330} color="#E05A2B" dashed label="data must travel ↓" labelX={238} labelY={315} />

      {/* Calc Engine + Data Copy — side by side */}
      <rect x={32} y={330} width={188} height={56} rx="10" fill="#FEF2EE" stroke="#E05A2B" strokeWidth="1.5" />
      <text x={126} y={353} textAnchor="middle" fill="#E05A2B" fontSize="12" fontWeight="700" fontFamily="system-ui">Calc Engine</text>
      <text x={126} y={369} textAnchor="middle" fill="#E05A2B" fontSize="9" fontFamily="system-ui" fillOpacity="0.7">Hyper / VertiPaq</text>
      <text x={126} y={381} textAnchor="middle" fill="#E05A2B" fontSize="9" fontFamily="system-ui" fillOpacity="0.65">eats RAM · breaks live mode</text>

      <rect x={228} y={330} width={196} height={56} rx="10" fill="#FEF2EE" stroke="#E05A2B" strokeWidth="1.5" />
      <text x={326} y={353} textAnchor="middle" fill="#E05A2B" fontSize="12" fontWeight="700" fontFamily="system-ui">Data Copy</text>
      <text x={326} y={369} textAnchor="middle" fill="#E05A2B" fontSize="9" fontFamily="system-ui" fillOpacity="0.7">imported · stale · expensive</text>
      <text x={326} y={381} textAnchor="middle" fill="#E05A2B" fontSize="9" fontFamily="system-ui" fillOpacity="0.65">RAM ceiling applies</text>

      <Connector x1={228} y1={386} x2={228} y2={426} color="#9CA3AF" dashed />

      <Box x={32} y={426} w={392} h={48} label="Your Database" sub="Where the real data lives" />

      {/* LEFT DOTS — one per connector, cascade effect */}
      <circle r="5" fill="#E05A2B" fillOpacity="0.9">
        <animateMotion dur="1.6s" begin="0s" repeatCount="indefinite" path={L_C1} />
      </circle>
      <circle r="5" fill="#E05A2B" fillOpacity="0.9">
        <animateMotion dur="1.6s" begin="0.4s" repeatCount="indefinite" path={L_C2} />
      </circle>
      <circle r="5" fill="#E05A2B" fillOpacity="0.9">
        <animateMotion dur="1.6s" begin="0.8s" repeatCount="indefinite" path={L_C3} />
      </circle>
      <circle r="5" fill="#E05A2B" fillOpacity="0.9">
        <animateMotion dur="1.6s" begin="1.2s" repeatCount="indefinite" path={L_C4} />
      </circle>

      {/* ── VS ─────────────────────────────────────────────────────────── */}
      <circle cx="470" cy="252" r="20" fill="#111827" stroke="#1E3A5F" strokeWidth="1.5" />
      <text x="470" y="256" textAnchor="middle" fill="rgba(255,255,255,0.4)"
        fontSize="9" fontWeight="800" fontFamily="system-ui">VS</text>

      {/* ── RIGHT STACK (MPP BI — 3 layers, spacious) ──────────────────── */}

      <Box x={508} y={66} w={408} h={48} label="Browser Client" sub="Same lightweight client. No plugins." dark />
      <Connector x1={712} y1={114} x2={712} y2={174} color="#334155" />

      {/* MPP BI Core — prominent, with room to breathe */}
      <rect x={508} y={174} width={408} height={130} rx="12"
        fill="#0D2137" stroke="#0AAEDB" strokeWidth="2"
        style={{ filter: 'drop-shadow(0 0 14px rgba(10,174,219,0.18))' }} />
      <text x={712} y={212} textAnchor="middle" fill="#0AAEDB"
        fontSize="16" fontWeight="800" fontFamily="system-ui">MPP BI Core</text>
      <text x={712} y={230} textAnchor="middle" fill="#0AAEDB"
        fontSize="10" fontFamily="system-ui" fillOpacity="0.6">
        App Server + Metadata — unified inside PostgreSQL
      </text>
      <rect x={520} y={244} width={172} height={30} rx="7"
        fill="#10B981" fillOpacity="0.09" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3" />
      <text x={606} y={263} textAnchor="middle" fill="#10B981"
        fontSize="10.5" fontFamily="system-ui" fontWeight="600">No Calc Engine</text>
      <rect x={706} y={244} width={172} height={30} rx="7"
        fill="#10B981" fillOpacity="0.09" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3" />
      <text x={792} y={263} textAnchor="middle" fill="#10B981"
        fontSize="10.5" fontFamily="system-ui" fontWeight="600">No Data Copy</text>

      {/* Generous connector gap between Core and Database */}
      <Connector x1={712} y1={304} x2={712} y2={386} color="#0AAEDB" />
      <text x={726} y={350} fill="#0AAEDB" fontSize="9" fontFamily="monospace" fillOpacity="0.6">
        Online SQL Query → pushed to database
      </text>

      {/* Your Database */}
      <rect x={508} y={386} width={408} height={72} rx="12"
        fill="#0D2137" stroke="#0AAEDB" strokeWidth="2"
        style={{ filter: 'drop-shadow(0 0 14px rgba(10,174,219,0.18))' }} />
      <text x={712} y={420} textAnchor="middle" fill="#0AAEDB"
        fontSize="15" fontWeight="800" fontFamily="system-ui">Your Database</text>
      <text x={712} y={438} textAnchor="middle" fill="#0AAEDB"
        fontSize="10" fontFamily="system-ui" fillOpacity="0.6">
        Query runs here. Data never moves. Always live.
      </text>

      {/* RIGHT DOTS — one per connector, fast and direct */}
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
