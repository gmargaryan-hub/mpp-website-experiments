'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Award, FileText, ExternalLink, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'

const proofs = [
  {
    icon: BookOpen,
    color: '#00C2FF',
    badge: 'ACM Published',
    title: 'Peer-Reviewed Research',
    description:
      'The MPP BI data-centric architecture is backed by peer-reviewed research published in the ACM Digital Library. The paper documents the performance advantages of running business logic inside the database tier versus traditional 3-tier BI architectures.',
    metric: '2x–12x',
    metricLabel: 'Performance gain documented',
    cta: {
      label: 'Read the ACM Paper',
      href: 'https://dl.acm.org/doi/10.1145/3274856.3274869',
      external: true,
    },
    detail: 'ACM International Conference on Information and Knowledge Management',
  },
  {
    icon: Award,
    color: '#00E5A0',
    badge: 'Certified Supplier',
    title: '20 Years of Delivery',
    description:
      'MPP BI is maintained by a UN-registered supplier with over 20 years of enterprise software delivery history. Clients include insurance companies, government agencies, and multi-national corporations across financial services, construction, and publishing sectors.',
    metric: '20+',
    metricLabel: 'Years of delivery history',
    cta: {
      label: 'Talk to Our Team',
      href: '#booking',
      external: false,
    },
    detail: 'UN Supplier Status • International Project Delivery',
  },
  {
    icon: FileText,
    color: '#00C2FF',
    badge: 'v11.0 Architecture',
    title: 'Documented Technical Specs',
    description:
      'The MPP BI Technical Overview v11.0 documents the complete architecture: stored procedure design patterns, hot/warm/cold data tier configuration, security model, deployment topology, and integration specifications. Available on request.',
    metric: 'v11.0',
    metricLabel: 'Current architecture version',
    cta: {
      label: 'Request Technical Overview',
      href: '#booking',
      external: false,
    },
    detail: 'PL/pgSQL Architecture • Security Model • Deployment Guide',
  },
]

export default function TechnicalProofSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 relative" id="research">
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#0AAEDB] text-sm font-semibold tracking-widest uppercase mb-4">Evidence</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-6">
            Peer-Reviewed.{' '}
            <span className="gradient-text">Battle-Tested.</span>
          </h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            Not a startup pitch. Twenty years of delivery, ACM-published research, and documented production results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {proofs.map((proof, i) => {
            const Icon = proof.icon
            return (
              <motion.div
                key={proof.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group bg-white rounded-2xl p-8 border border-[#E2E8F0] card-hover flex flex-col gap-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${proof.color}12`, border: `1px solid ${proof.color}25` }}
                  >
                    <Icon size={20} color={proof.color} />
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: `${proof.color}12`, color: proof.color, border: `1px solid ${proof.color}25` }}
                  >
                    {proof.badge}
                  </span>
                </div>

                {/* Title + description */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#0D1B2A] mb-3">{proof.title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{proof.description}</p>
                </div>

                {/* Metric */}
                <div
                  className="rounded-xl p-4 text-center"
                  style={{ background: `${proof.color}08`, border: `1px solid ${proof.color}18` }}
                >
                  <div className="text-3xl font-black mb-1" style={{ color: proof.color }}>
                    {proof.metric}
                  </div>
                  <div className="text-xs text-[#6B7280]">{proof.metricLabel}</div>
                </div>

                {/* Detail */}
                <p className="text-xs text-[#4B5563] font-medium border-t border-[#E2E8F0] pt-4">
                  {proof.detail}
                </p>

                {/* CTA */}
                {proof.cta.external ? (
                  <a
                    href={proof.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                    style={{ color: proof.color }}
                  >
                    {proof.cta.label}
                    <ExternalLink size={13} />
                  </a>
                ) : (
                  <Link
                    href={proof.cta.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                    style={{ color: proof.color }}
                  >
                    {proof.cta.label}
                    <ArrowRight size={13} />
                  </Link>
                )}

                {/* Hover border */}
                <div
                  className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#0AAEDB]/20 transition-all duration-300 pointer-events-none"
                  style={{ position: 'absolute' }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
