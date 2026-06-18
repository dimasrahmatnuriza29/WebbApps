import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Truck, Warehouse, Package, Route, GitBranch, MapPin, Network, BarChart3,
  ArrowRight, CheckCircle2
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { solutionsData } from '../data/solutionsData'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay }} className={className}>
      {children}
    </motion.div>
  )
}

const iconMap = { Truck, Warehouse, Package, Route, GitBranch, MapPin, Network, BarChart3 }


// ── Main Page ──────────────────────────────────────────────────────────────────
export default function SolutionsPage() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-navy-950" />
        <div className="absolute inset-0 bg-grid opacity-25" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-brand-orange/8 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-5">
              <Network className="w-4 h-4" />
              Solutions
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Solusi Logistik <span className="text-brand-orange">Terintegrasi</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Dari transportasi hingga supply chain management — kami menyediakan end-to-end logistics solution untuk bisnis Anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16 bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Layanan Kami</h2>
            <p className="text-gray-400 mt-2">Pilih solusi yang paling sesuai dengan kebutuhan distribusi bisnis Anda.</p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {solutionsData.map((sol, i) => {
              const Icon = iconMap[sol.icon] || Truck
              return (
                <FadeIn key={sol.id} delay={i * 0.06}>
                  <div className="bg-navy-800/60 border border-navy-700/40 rounded-2xl overflow-hidden hover:border-brand-orange/30 hover:shadow-card-hover transition-all duration-300 group h-full flex flex-col">
                    <div className="relative h-36 overflow-hidden">
                      <img src={sol.image} alt={sol.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${sol.color} opacity-75`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-10 h-10 text-white/90" />
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-white font-bold text-base mb-0.5">{sol.title}</h3>
                      <p className="text-gray-500 text-xs mb-3">{sol.subtitle}</p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{sol.description}</p>
                      <div className="space-y-1.5">
                        {sol.features.slice(0, 3).map(f => (
                          <div key={f} className="flex items-center gap-2 text-xs text-gray-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                            {f}
                          </div>
                        ))}
                        {sol.features.length > 3 && <div className="text-gray-500 text-xs">+{sol.features.length - 3} fitur lainnya</div>}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
