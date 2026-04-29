'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.08 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

export default function MPPETLSection() {
  const { ref, visible } = useInView()

  return (
    <section className="py-24 relative bg-[#080c16]" id="mpp-etl">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,229,160,0.04) 0%, transparent 70%)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <p className="text-[#10B981] text-sm font-semibold tracking-widest uppercase">MPP ETL</p>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25 tracking-wider uppercase">In Development</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-6">
            The Pipeline That{' '}
            <span style={{ color: '#00E5A0' }}>Asks Before It Moves</span>
          </h2>
          <p className="text-[#6B7280] text-lg max-w-2xl">
            MPP ETL applies the same architectural philosophy as MPP BI to data pipelines.
            Before moving any data, it asks one question first.
          </p>
        </motion.div>

        {/* The question */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative rounded-2xl border border-[#10B981]/25 bg-[#10B981]/4 p-8 md:p-10 mb-10 text-center overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 80% at 50% 50%, rgba(0,229,160,0.06) 0%, transparent 70%)' }} />
          <p className="text-[#6B7280] text-sm font-mono tracking-widest uppercase mb-4">The question every pipeline should ask</p>
          <p className="text-3xl md:text-4xl font-bold text-[#0D1B2A] leading-snug">
            "Does this data need to move{' '}
            <span style={{ color: '#00E5A0' }}>at all?</span>"
          </p>
          <p className="text-[#6B7280] text-sm mt-4 max-w-xl mx-auto">
            Most pipeline tools never ask. They move data by default — because they were built to move data.
            MPP ETL was built to make that movement optional.
          </p>
        </motion.div>

        {/* Two modes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

          {/* Mode 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="group bg-white rounded-2xl border border-[#0AAEDB]/20 p-8 hover:border-[#0AAEDB]/40 transition-colors duration-300"
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#0AAEDB]/10 border border-[#0AAEDB]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#0AAEDB] text-xs font-mono font-bold">01</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0D1B2A]">Push Down to Source</h3>
                <p className="text-[#0AAEDB] text-sm font-mono mt-0.5">If capacity available → run there</p>
              </div>
            </div>
            <p className="text-[#6B7280] text-sm leading-relaxed mb-5">
              If your data source has available capacity, the pipeline runs there. Zero data
              movement. Zero egress cost. Maximum speed. The computation goes to the data,
              not the other way around.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Zero movement', 'No egress cost', 'Maximum speed'].map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#0AAEDB]/8 text-[#0AAEDB]/80 border border-[#0AAEDB]/15">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Mode 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group bg-white rounded-2xl border border-[#10B981]/20 p-8 hover:border-[#10B981]/40 transition-colors duration-300"
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#10B981] text-xs font-mono font-bold">02</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0D1B2A]">Offload to Local Storage</h3>
                <p className="text-[#10B981] text-sm font-mono mt-0.5">If source under load → route intelligently</p>
              </div>
            </div>
            <p className="text-[#6B7280] text-sm leading-relaxed mb-5">
              If your data source is under heavy load, MPP ETL routes processing to local
              high-performance storage — without changing your pipeline code. Intelligent
              routing. Transparent to the developer.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Auto-routing', 'No code change', 'Source-aware'].map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#10B981]/8 text-[#10B981]/80 border border-[#10B981]/15">{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Competitor comparison line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl border border-[#E2E8F0] p-8 mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-2">
                <span className="text-[#E05A2B]">Fivetran moves data.</span>{' '}
                <span className="text-[#E05A2B]">Airbyte moves data.</span>{' '}
                <span className="text-[#E05A2B]">Matillion moves data.</span>
              </p>
              <p className="text-[#0D1B2A] text-base font-semibold">
                MPP ETL asks whether it needs to.
              </p>
              <p className="text-[#10B981] text-sm mt-1">Usually, the answer is no.</p>
            </div>
            <div className="md:border-l border-[#E2E8F0] md:pl-6">
              <p className="text-[10px] font-mono text-[#6B7280] tracking-widest uppercase mb-2">Architectural principle</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Data movement is a cost — in latency, in infrastructure, in egress fees, and
                in the risk of stale results. A pipeline that never asks "is this necessary?"
                will always move more than it needs to.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Early access CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-2xl border border-[#10B981]/20 bg-[#10B981]/4 px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div>
            <p className="text-[#0D1B2A] font-semibold mb-1">MPP ETL is in active development.</p>
            <p className="text-[#6B7280] text-sm">Contact us for roadmap access and early partner program details.</p>
          </div>
          <a
            href="#booking"
            className="flex-shrink-0 px-5 py-2.5 rounded-lg text-sm font-semibold text-[#0A0E1A] transition-all duration-200 hover:opacity-90 whitespace-nowrap"
            style={{ background: '#00E5A0' }}
          >
            Request Early Access
          </a>
        </motion.div>
      </div>
    </section>
  )
}
