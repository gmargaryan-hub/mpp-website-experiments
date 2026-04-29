'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ExternalLink } from 'lucide-react'

const plpgsqlCode = `-- MPP BI: Dashboard data retrieval stored procedure
-- Business logic lives here — inside your database

CREATE OR REPLACE FUNCTION mpp_dashboard.get_sales_kpis(
    p_tenant_id     INTEGER,
    p_date_from     DATE,
    p_date_to       DATE,
    p_region_code   VARCHAR(10) DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_result        JSON;
    v_total_revenue NUMERIC(18,2);
    v_yoy_growth    NUMERIC(6,2);
BEGIN
    -- Row-level security enforced at DB layer
    PERFORM mpp_auth.check_tenant_access(p_tenant_id);

    SELECT
        COALESCE(SUM(s.net_revenue), 0),
        mpp_util.calc_yoy_growth(p_tenant_id, p_date_from, p_date_to)
    INTO v_total_revenue, v_yoy_growth
    FROM   mpp_sales.transactions s
    WHERE  s.tenant_id = p_tenant_id
      AND  s.txn_date BETWEEN p_date_from AND p_date_to;

    v_result := JSON_BUILD_OBJECT(
        'total_revenue', v_total_revenue,
        'yoy_growth',    v_yoy_growth,
        'generated_at',  NOW(),
        'data_tier',     mpp_util.get_active_tier(p_date_from)
    );

    RETURN v_result;
END;
$$;`

const platformPoints = [
  'All analytics logic as versioned, testable stored procedures',
  'Multi-tenant isolation enforced at the database level',
  'Hot/Warm/Cold data tiers managed transparently',
  'AI/ML models execute as database functions — no Python server',
  'Open SOA: callable from any HTTP client, ERP, or CRM',
  'Embedded mode for white-label deployments',
  'MPP ETL engine handles all ingestion — included in every license',
  'Source code available — no proprietary black boxes',
]

export default function PlatformSection() {
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
    <section className="py-24 relative bg-white" id="platform">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.1em] uppercase mb-4">Platform</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-6">
            MPP BI Is a Platform,{' '}
            <span className="gradient-text">Not Just a Product</span>
          </h2>
          <p className="text-[#374151] text-lg max-w-2xl mx-auto">
            Every feature, every visualization, every ML model lives as a composable, testable, versionable database procedure — no black boxes, no separate servers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Points */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-[#0D1B2A] mb-2">Business Logic Inside Your Database</h3>
              <p className="text-[#374151] leading-relaxed">
                MPP BI extends PostgreSQL into a full analytics runtime. Every dashboard, report, visualization, and ML model is a stored procedure — versioned in your source control, tested like code, deployed like infrastructure.
              </p>
            </div>
            <ul className="space-y-3">
              {platformPoints.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                  className="flex items-start gap-3 text-sm text-[#374151]"
                >
                  <CheckCircle2 size={15} className="text-[#0AAEDB] flex-shrink-0 mt-0.5" />
                  {point}
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-[#F5F7FA] border border-[#E2E8F0] rounded-xl p-6"
            >
              <p className="text-sm text-[#374151] mb-3">
                MPP BI is part of the{' '}
                <span className="text-[#0AAEDB] font-semibold">MPP Insights</span>{' '}
                portfolio of data products.
              </p>
              <a
                href="https://mpp-insights.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#0AAEDB] hover:text-[#0074A6] transition-colors font-medium"
              >
                Explore the MPP Insights portfolio
                <ExternalLink size={13} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Code block */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-[#0D1B2A] rounded-2xl border border-[#1a2a3a] overflow-hidden shadow-lg"
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-[#111e2e] border-b border-white/8">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
              </div>
              <span className="ml-2 text-xs text-white/40 font-mono">mpp_dashboard.get_sales_kpis.sql</span>
            </div>
            <div className="overflow-x-auto p-6">
              <pre className="text-xs leading-relaxed font-mono text-white/60 whitespace-pre">
                {plpgsqlCode.split('\n').map((line, i) => {
                  const isComment = line.trim().startsWith('--')
                  return (
                    <span key={i} className="block">
                      {isComment ? (
                        <span className="text-white/30 italic">{line}</span>
                      ) : line.includes('CREATE OR REPLACE FUNCTION') || line.includes('RETURNS') || line.includes('LANGUAGE') ? (
                        <span className="text-[#0AAEDB]">{line}</span>
                      ) : line.includes('p_') || line.includes('v_') ? (
                        <span className="text-white/90">{line}</span>
                      ) : line.includes('mpp_') ? (
                        <span className="text-[#10B981]">{line}</span>
                      ) : (
                        <span>{line}</span>
                      )}
                    </span>
                  )
                })}
              </pre>
            </div>
            <div className="px-6 py-3 border-t border-white/5 bg-[#0a1520]">
              <p className="text-[10px] text-white/30 font-mono">PL/pgSQL · PostgreSQL-compatible · Runs inside your database tier</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
