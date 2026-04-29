'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Search, BookOpen, Database, Layers, ArrowRight,
  Zap, Globe, ExternalLink, BarChart3, GitMerge,
  Menu, X, ChevronRight
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const products = [
  {
    icon: <BarChart3 size={28} />,
    name: 'MPP BI',
    tagline: 'Analytics & Dashboards',
    description:
      'Build live dashboards and reports that query your database directly — no data extraction, no calculation engine, no stale data.',
    href: '/docs/bi',
    cta: 'View MPP BI Docs',
    accent: '#0AAEDB',
  },
  {
    icon: <GitMerge size={28} />,
    name: 'MPP ETL',
    tagline: 'Data Pipeline Automation',
    description:
      'Design, schedule, and monitor data pipelines that push transformations directly inside your database for maximum throughput.',
    href: '/docs/etl',
    cta: 'View MPP ETL Docs',
    accent: '#10B981',
  },
  {
    icon: <Layers size={28} />,
    name: 'MPP Platform',
    tagline: '2-Tier Architecture',
    description:
      'The unified engine underneath MPP BI and ETL. Learn the architecture, security model, and deployment options.',
    href: '/docs/platform',
    cta: 'View Platform Docs',
    accent: '#8B5CF6',
  },
]

const guides = [
  {
    title: 'Getting Started with MPP BI',
    description: 'Connect your database and build your first live dashboard in minutes.',
    href: '/docs/guides/getting-started',
    tag: 'Beginner',
    tagColor: '#10B981',
  },
  {
    title: 'Architecture Deep Dive',
    description: 'Understand the 2-tier model: how MPP BI eliminates the calc engine and runs SQL inside your DB.',
    href: '/docs/guides/architecture',
    tag: 'Architecture',
    tagColor: '#0AAEDB',
  },
  {
    title: 'Connecting Your Database',
    description: 'Set up PostgreSQL, Snowflake, Redshift, or BigQuery as your live data source.',
    href: '/docs/guides/database-connections',
    tag: 'Setup',
    tagColor: '#0AAEDB',
  },
  {
    title: 'PL/pgSQL Reference',
    description: 'Complete reference for writing business logic directly inside your PostgreSQL database.',
    href: '/docs/guides/plpgsql-reference',
    tag: 'Reference',
    tagColor: '#6B7280',
  },
  {
    title: 'Migrating from Power BI',
    description: 'Move your reports and data models from Power BI to MPP BI step by step.',
    href: '/docs/guides/migrate-from-powerbi',
    tag: 'Migration',
    tagColor: '#E05A2B',
  },
  {
    title: 'Incremental Loading with MPP ETL',
    description: 'Build efficient pipelines that only process new or changed data on each run.',
    href: '/docs/guides/incremental-loading',
    tag: 'ETL',
    tagColor: '#10B981',
  },
]

const hotTopics = [
  {
    product: 'MPP BI',
    accent: '#0AAEDB',
    sections: [
      {
        heading: 'Get Started',
        links: ['Quick Setup', 'System Requirements', 'First Dashboard', 'User Roles & Permissions'],
      },
      {
        heading: 'Connections',
        links: ['PostgreSQL Setup', 'Snowflake Integration', 'Redshift Setup', 'BigQuery Setup'],
      },
      {
        heading: 'Dashboards',
        links: ['Dashboard Builder', 'Chart Types', 'Filters & Drilldowns', 'Scheduled Exports'],
      },
      {
        heading: 'Reference',
        links: ['PL/pgSQL Functions', 'API Overview', 'Changelog', 'Glossary'],
      },
    ],
  },
  {
    product: 'MPP ETL',
    accent: '#10B981',
    sections: [
      {
        heading: 'Get Started',
        links: ['Pipeline Basics', 'Source Connectors', 'Target Connectors', 'First Pipeline'],
      },
      {
        heading: 'Transformations',
        links: ['SQL Transforms', 'Incremental Loading', 'Merge Strategies', 'Data Quality Rules'],
      },
      {
        heading: 'Orchestration',
        links: ['Scheduling & Triggers', 'DAG Builder', 'Error Handling', 'Retry Policies'],
      },
      {
        heading: 'Operations',
        links: ['Monitoring & Alerts', 'Pipeline Versioning', 'Deployment Guide', 'Changelog'],
      },
    ],
  },
]

const updates = [
  {
    label: 'MPP BI Updates',
    description: 'Latest releases: new chart types, performance improvements, connector updates.',
    href: '/docs/changelog/bi',
    accent: '#0AAEDB',
  },
  {
    label: 'MPP ETL Updates',
    description: 'Pipeline engine improvements, new source connectors, scheduling enhancements.',
    href: '/docs/changelog/etl',
    accent: '#10B981',
  },
  {
    label: 'Platform Updates',
    description: 'Core engine updates, security patches, architecture changes.',
    href: '/docs/changelog/platform',
    accent: '#8B5CF6',
  },
]

// ─── Components ──────────────────────────────────────────────────────────────

function DocsNav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E2E8F0] shadow-[0_1px_12px_rgba(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/mppbi-logo.png"
              alt="MPP BI"
              width={140}
              height={44}
              className="object-contain h-9 w-auto"
              priority
              unoptimized
            />
            <span className="ml-2.5 text-xs font-semibold text-[#6B7280] tracking-widest uppercase border-l border-[#E2E8F0] pl-2.5">
              Docs
            </span>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
            <input
              type="text"
              placeholder="Search or ask MPP BI..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-[#F5F7FA] border border-[#E2E8F0] rounded-lg text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0AAEDB] focus:ring-2 focus:ring-[#0AAEDB]/10 transition-colors"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#9CA3AF] font-mono bg-white border border-[#E2E8F0] rounded px-1.5 py-0.5">
              ⌘K
            </kbd>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: 'Documentation', href: '/docs' },
              { label: 'Guides', href: '/docs/guides' },
              { label: 'Changelog', href: '/docs/changelog' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-[#374151] hover:text-[#0AAEDB] font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#booking"
              className="bg-[#0AAEDB] hover:bg-[#0074A6] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Book a Demo
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-[#374151] hover:text-[#0AAEDB] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white px-6 py-4 flex flex-col gap-4">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search docs..."
              className="w-full pl-8 pr-4 py-2 text-sm bg-[#F5F7FA] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#0AAEDB]"
            />
          </div>
          {['Documentation', 'Guides', 'Changelog'].map((label) => (
            <Link key={label} href={`/docs/${label.toLowerCase()}`} className="text-sm text-[#374151] py-2 border-b border-[#E2E8F0]">
              {label}
            </Link>
          ))}
          <Link href="#booking" className="bg-[#0AAEDB] text-white text-sm font-semibold px-4 py-3 rounded-lg text-center">
            Book a Demo
          </Link>
        </div>
      )}
    </header>
  )
}

function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card-hover flex flex-col gap-5 p-7 bg-white border border-[#E2E8F0] rounded-2xl"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: `${product.accent}14`, color: product.accent }}
      >
        {product.icon}
      </div>
      <div>
        <h2 className="font-display text-xl font-bold text-[#0D1B2A]">{product.name}</h2>
        <p className="text-xs font-semibold uppercase tracking-widest mt-0.5" style={{ color: product.accent }}>
          {product.tagline}
        </p>
      </div>
      <p className="text-sm text-[#374151] leading-relaxed flex-1">{product.description}</p>
      <Link
        href={product.href}
        className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
        style={{ color: product.accent }}
      >
        {product.cta}
        <ArrowRight size={14} />
      </Link>
    </motion.div>
  )
}

function GuideCard({ guide, index }: { guide: typeof guides[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link
        href={guide.href}
        className="card-hover flex flex-col gap-3 p-5 bg-white border border-[#E2E8F0] rounded-xl h-full group"
      >
        <span
          className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full w-fit"
          style={{ color: guide.tagColor, background: `${guide.tagColor}14` }}
        >
          {guide.tag}
        </span>
        <h3 className="text-sm font-semibold text-[#0D1B2A] group-hover:text-[#0AAEDB] transition-colors leading-snug">
          {guide.title}
        </h3>
        <p className="text-xs text-[#6B7280] leading-relaxed flex-1">{guide.description}</p>
        <span className="text-xs font-semibold text-[#0AAEDB] flex items-center gap-1">
          View Guide <ChevronRight size={12} />
        </span>
      </Link>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <DocsNav />

      <main className="pt-16">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="mesh-bg-white border-b border-[#E2E8F0] py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[#0AAEDB] text-xs font-semibold uppercase tracking-[0.15em] mb-4"
            >
              MPP BI Documentation
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="font-display text-4xl md:text-5xl font-extrabold text-[#0D1B2A] tracking-tight mb-4"
            >
              What would you like to{' '}
              <span className="gradient-text">build today?</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="text-[#374151] text-base md:text-lg max-w-2xl mx-auto mb-8"
            >
              Everything you need to connect, build, and ship analytics directly inside your database.
            </motion.p>

            {/* Hero search */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="relative max-w-lg mx-auto"
            >
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
              <input
                type="text"
                placeholder="Search or ask MPP BI..."
                className="w-full pl-12 pr-16 py-3.5 text-sm bg-white border border-[#E2E8F0] rounded-xl text-[#374151] placeholder-[#9CA3AF] shadow-sm focus:outline-none focus:border-[#0AAEDB] focus:ring-2 focus:ring-[#0AAEDB]/10 transition-colors"
              />
              <kbd className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-[#9CA3AF] font-mono bg-[#F5F7FA] border border-[#E2E8F0] rounded px-2 py-1">
                ⌘K
              </kbd>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#6B7280] mt-6"
            >
              <span className="flex items-center gap-1.5">
                <Globe size={11} className="text-[#0AAEDB]" />
                UN Supplier
              </span>
              <span className="text-[#D1D5DB]">·</span>
              <span className="flex items-center gap-1.5">
                <Zap size={11} className="text-[#0AAEDB]" />
                ACM Published Research
              </span>
              <span className="text-[#D1D5DB]">·</span>
              <span>Banking · Oil &amp; Gas · Insurance · Construction</span>
            </motion.div>
          </div>
        </section>

        {/* ── Product Cards ────────────────────────────────────────────── */}
        <section className="py-14 border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Quick Start Guides ───────────────────────────────────────── */}
        <section className="py-14 mesh-bg-gray border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#0D1B2A]">Quick Start Guides</h2>
                <p className="text-sm text-[#6B7280] mt-1">Step-by-step walkthroughs to get up and running fast.</p>
              </div>
              <Link
                href="/docs/guides"
                className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-[#0AAEDB] hover:text-[#0074A6] transition-colors"
              >
                View All Guides <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {guides.map((guide, i) => (
                <GuideCard key={guide.title} guide={guide} index={i} />
              ))}
            </div>
            <div className="mt-6 text-center md:hidden">
              <Link href="/docs/guides" className="text-sm font-semibold text-[#0AAEDB]">
                View All Guides →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Hot Topics ───────────────────────────────────────────────── */}
        <section className="py-14 border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold text-[#0D1B2A]">Hot Topics</h2>
              <p className="text-sm text-[#6B7280] mt-1">Find answers to the most common MPP BI and ETL questions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {hotTopics.map((col) => (
                <div key={col.product}>
                  <div className="flex items-center gap-2 mb-6">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: col.accent }}
                    />
                    <h3 className="font-display text-base font-bold text-[#0D1B2A]">{col.product}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {col.sections.map((section) => (
                      <div key={section.heading}>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-3">
                          {section.heading}
                        </p>
                        <ul className="space-y-2">
                          {section.links.map((link) => (
                            <li key={link}>
                              <Link
                                href={`/docs/${col.product.toLowerCase().replace(' ', '-')}/${link.toLowerCase().replace(/ /g, '-')}`}
                                className="text-sm text-[#374151] hover:text-[#0AAEDB] transition-colors"
                              >
                                {link}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stay Up To Date ──────────────────────────────────────────── */}
        <section className="py-14 mesh-bg-gray border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold text-[#0D1B2A]">Stay Up To Date</h2>
              <p className="text-sm text-[#6B7280] mt-1">Track the latest features, fixes, and releases across all MPP products.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {updates.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="card-hover flex flex-col gap-3 p-5 bg-white border border-[#E2E8F0] rounded-xl group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: item.accent }} />
                    <span className="text-sm font-semibold text-[#0D1B2A] group-hover:text-[#0AAEDB] transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{item.description}</p>
                  <span className="text-xs font-semibold flex items-center gap-1" style={{ color: item.accent }}>
                    View Updates <ChevronRight size={11} />
                  </span>
                </Link>
              ))}
            </div>

            {/* Events row */}
            <div className="bg-[#0D1B2A] rounded-2xl p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div>
                <h3 className="font-display text-lg font-bold text-white mb-1">Events &amp; Webinars</h3>
                <p className="text-sm text-white/50">
                  Catch demos, workshops, and deep-dives from the MPP BI team.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/docs/events"
                  className="bg-[#0AAEDB] hover:bg-[#0074A6] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors text-center"
                >
                  Upcoming Events
                </Link>
                <Link
                  href="/docs/events/past"
                  className="border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors text-center"
                >
                  Past Recaps
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className="bg-[#0D1B2A] border-t border-[#1a2a3a]">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {/* Brand */}
              <div className="col-span-2 flex flex-col gap-4">
                <Link href="/" className="flex items-center gap-2 w-fit">
                  <Image
                    src="/mppinsights-logo.png"
                    alt="MPP Insights"
                    width={140}
                    height={44}
                    className="object-contain h-9 w-auto brightness-0 invert"
                  />
                </Link>
                <p className="text-xs text-white/40 leading-relaxed max-w-xs">
                  Ultra-fast analytics built inside your database. No calc engine. No data extraction. Always live.
                </p>
                <div className="flex items-center gap-2 text-xs text-white/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  UN Supplier · ACM Published
                </div>
              </div>

              {/* Links */}
              {[
                {
                  heading: 'Products',
                  links: [
                    { label: 'MPP BI', href: '/docs/bi' },
                    { label: 'MPP ETL', href: '/docs/etl' },
                    { label: 'MPP Platform', href: '/docs/platform' },
                  ],
                },
                {
                  heading: 'Resources',
                  links: [
                    { label: 'Guides', href: '/docs/guides' },
                    { label: 'Changelog', href: '/docs/changelog' },
                    { label: 'API Reference', href: '/docs/api' },
                  ],
                },
                {
                  heading: 'Company',
                  links: [
                    { label: 'Contact Sales', href: '#booking' },
                    { label: 'Status Page', href: 'https://status.mppbi.com' },
                    { label: 'ACM Paper', href: 'https://dl.acm.org/doi/10.1145/3274856.3274869' },
                    { label: 'Contact Support', href: 'mailto:welcome@mpp-insights.com' },
                  ],
                },
              ].map((col) => (
                <div key={col.heading}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4">{col.heading}</p>
                  <ul className="space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="text-xs text-white/50 hover:text-white transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="border-t border-[#1a2a3a]">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
              <p className="text-[11px] text-white/25">
                © {new Date().getFullYear()} MPP Insights LLC. All rights reserved.
              </p>
              <div className="flex items-center gap-5 text-[11px] text-white/25">
                <Link href="#" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-white/50 transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </div>
  )
}
