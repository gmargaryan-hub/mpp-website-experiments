import Link from 'next/link'
import Image from 'next/image'
import { Mail, ExternalLink } from 'lucide-react'

const productLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Comparison', href: '#comparison' },
]

const companyLinks = [
  { label: 'About MPP Insights', href: 'https://mpp-insights.com', external: true },
  { label: 'Research', href: '#research' },
  { label: 'Book a Demo', href: '#booking' },
  { label: 'ACM Paper', href: 'https://dl.acm.org/doi/10.1145/3274856.3274869', external: true },
]

const resourceLinks = [
  { label: 'Technical Overview v11.0', href: '#booking' },
  { label: 'Architecture Docs', href: '#booking' },
  { label: 'Integration Guide', href: '#booking' },
  { label: 'PL/pgSQL Reference', href: '#booking' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#1a2a3a] bg-[#0D1B2A]">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column — spans 2 cols on lg */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/" className="flex items-center group w-fit">
              <Image
                src="/mppinsights-logo.png"
                alt="MPP Insights"
                width={160}
                height={52}
                className="object-contain h-12 w-auto brightness-0 invert"
              />
            </Link>

            <p className="text-sm text-[#6B7280] leading-relaxed max-w-xs">
              Ultra-fast analytics built inside your database. 2-tier architecture. No data extraction. 2x–12x faster than traditional BI.
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                <Mail size={13} className="text-[#0AAEDB]" />
                <a
                  href="mailto:welcome@mpp-insights.com"
                  className="hover:text-[#0AAEDB] transition-colors"
                >
                  welcome@mpp-insights.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#4B5563]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                UN Supplier • ACM Published
              </div>
            </div>

            <p className="text-xs text-[#4B5563] leading-relaxed">
              MPP BI is part of the{' '}
              <a
                href="https://mpp-insights.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B7280] hover:text-[#0AAEDB] transition-colors underline underline-offset-2"
              >
                MPP Insights
              </a>{' '}
              portfolio of data products.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-5">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/40 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      <ExternalLink size={10} />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-5">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#4B5563]">
            © {new Date().getFullYear()} MPP Insights LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-[#4B5563]">
            <Link href="#" className="hover:text-[#6B7280] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#6B7280] transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-[#6B7280] transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
