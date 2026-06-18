import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote, Users, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { clientCategories, testimonials } from '../data/clientsData'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay }} className={className}>
      {children}
    </motion.div>
  )
}

export default function ClientsPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const allClients = clientCategories.flatMap(c => c.clients.map(cl => ({ ...cl, category: c.name, catId: c.id })))
  const displayClients = activeCategory === 'all' ? allClients : allClients.filter(c => c.catId === activeCategory)

  const totalClients = clientCategories.reduce((sum, c) => sum + c.count, 0)

  const bgColors = [
    'from-blue-500 to-blue-700', 'from-purple-500 to-purple-700', 'from-emerald-500 to-emerald-700',
    'from-amber-500 to-amber-700', 'from-teal-500 to-teal-700', 'from-rose-500 to-rose-700',
    'from-indigo-500 to-indigo-700', 'from-cyan-500 to-cyan-700', 'from-orange-500 to-orange-700',
  ]

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-navy-950" />
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-brand-orange/8 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-5">
              <Users className="w-4 h-4" />
              Client Portfolio
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              {totalClients}+ Perusahaan <span className="text-brand-orange">Mempercayai</span> Kami
            </h1>
            <p className="text-gray-300 text-lg">
              Dari FMCG hingga pharmaceutical — perusahaan terkemuka Indonesia memilih ALN Logistics sebagai mitra distribusi jangka panjang.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-navy-900 border-y border-navy-800/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {clientCategories.map((cat, i) => (
              <FadeIn key={cat.id} delay={i * 0.07} className="text-center">
                <div className="text-2xl mb-1">{cat.icon}</div>
                <div className="text-white font-black text-xl">{cat.count}+</div>
                <div className="text-gray-400 text-xs">{cat.name}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Client Grid */}
      <section className="py-12 md:py-16 bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Klien Aktif Kami</h2>
            <p className="text-gray-400 mt-1">Filter berdasarkan sektor industri.</p>
          </FadeIn>

          {/* Category Filter */}
          <FadeIn delay={0.1} className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeCategory === 'all' ? 'bg-brand-orange text-white' : 'bg-navy-800/60 border border-navy-700/40 text-gray-400 hover:text-white'}`}
            >
              Semua ({totalClients}+)
            </button>
            {clientCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeCategory === cat.id ? 'bg-brand-orange text-white' : 'bg-navy-800/60 border border-navy-700/40 text-gray-400 hover:text-white'}`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </FadeIn>

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {displayClients.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="bg-navy-800/60 border border-navy-700/40 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border-brand-orange/30 hover:bg-navy-800 transition-all duration-300 cursor-default min-h-[110px]"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bgColors[i % bgColors.length]} flex items-center justify-center text-white font-black text-sm shadow-lg`}>
                  {client.initials}
                </div>
                <span className="text-gray-400 text-xs text-center leading-tight">{client.name}</span>
                <span className="text-gray-600 text-[10px] bg-navy-900/60 px-2 py-0.5 rounded-full">{client.category}</span>
              </div>
            ))}
          </motion.div>

          <FadeIn className="mt-8 bg-navy-800/40 border border-navy-700/30 rounded-2xl p-5 text-center">
            <p className="text-gray-400 text-sm">
              Menampilkan klien representatif. ALN Logistics melayani <span className="text-white font-bold">{totalClients}+ perusahaan aktif</span> dari berbagai sektor industri di Indonesia.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <Star className="w-4 h-4" />
              Testimonial
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Apa Kata Klien Kami?</h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-navy-800/60 border border-navy-700/40 rounded-2xl p-6 hover:border-brand-orange/25 transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                  </div>
                  <Quote className="w-8 h-8 text-brand-orange/30 mb-3" />
                  <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-5">"{t.content}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-navy-700/40">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-dark flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{t.name}</div>
                      <div className="text-gray-400 text-xs">{t.position}</div>
                      <div className="text-gray-500 text-xs">{t.company}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Coverage */}
      <section className="py-12 bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Industri yang Kami Layani</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clientCategories.map((cat, i) => (
              <FadeIn key={cat.id} delay={i * 0.07}>
                <div className="bg-navy-800/60 border border-navy-700/40 rounded-2xl p-5 hover:border-brand-orange/25 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{cat.icon}</span>
                    <div>
                      <h3 className="text-white font-bold">{cat.name}</h3>
                      <div className="text-brand-orange text-sm font-semibold">{cat.count}+ klien aktif</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.clients.slice(0, 3).map(cl => (
                      <span key={cl.name} className="bg-navy-900/60 text-gray-400 text-xs px-2.5 py-1 rounded-full border border-navy-700/30">{cl.name}</span>
                    ))}
                    {cat.clients.length > 3 && <span className="text-gray-500 text-xs py-1">+{cat.count - 3} lainnya</span>}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-brand-orange to-brand-orange-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Bergabunglah dengan 480+ Klien Kami</h2>
            <p className="text-orange-100 mb-6">Jadilah bagian dari ekosistem logistik terpercaya yang melayani Indonesia.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-brand-orange font-bold px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                Mulai Kemitraan <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/solutions" className="inline-flex items-center gap-2 border-2 border-white/50 hover:border-white text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300">
                Lihat Solusi Kami
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
