import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BookOpen, Clock, ArrowRight, Search, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { insightsData, categories } from '../data/insightsData'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay }} className={className}>
      {children}
    </motion.div>
  )
}

const categoryColors = {
  'Supply Chain': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Transportation': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Warehouse': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Last Mile': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Industry News': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  'Cost Optimization': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
}

function ArticleCard({ article, featured = false }) {
  const colorClass = categoryColors[article.category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'

  if (featured) {
    return (
      <motion.div whileHover={{ y: -4 }} className="bg-navy-800/70 border border-navy-700/40 rounded-2xl overflow-hidden hover:border-brand-orange/30 hover:shadow-card-hover transition-all duration-300 group cursor-pointer lg:col-span-2">
        <div className="lg:grid lg:grid-cols-2 gap-0">
          <div className="relative h-52 lg:h-auto overflow-hidden">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy-900/80 lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent lg:hidden" />
            <div className="absolute top-4 left-4">
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${colorClass}`}>{article.category}</span>
            </div>
            <div className="absolute top-4 right-4">
              <span className="bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-bold px-2.5 py-1 rounded-full">Featured</span>
            </div>
          </div>
          <div className="p-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{article.readTime}</span>
              <span>•</span>
              <span>{new Date(article.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <h3 className="text-white font-bold text-xl mb-3 group-hover:text-brand-orange transition-colors leading-snug">{article.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-xs">{article.author}</span>
              <span className="text-brand-orange text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Baca Selengkapnya <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div whileHover={{ y: -4 }} className="bg-navy-800/70 border border-navy-700/40 rounded-2xl overflow-hidden hover:border-brand-orange/30 hover:shadow-card-hover transition-all duration-300 group cursor-pointer flex flex-col">
      <div className="relative h-44 overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${colorClass}`}>{article.category}</span>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2.5 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          {article.readTime}
          <span>•</span>
          {new Date(article.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
        <h3 className="text-white font-bold mb-2 group-hover:text-brand-orange transition-colors leading-snug line-clamp-2">{article.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4 line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center justify-between pt-3 border-t border-navy-700/40">
          <span className="text-gray-500 text-xs truncate">{article.author}</span>
          <span className="text-brand-orange text-xs font-semibold flex items-center gap-1 flex-shrink-0">
            Baca <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [search, setSearch] = useState('')

  const filtered = insightsData.filter(a => {
    const matchCat = activeCategory === 'Semua' || a.category === activeCategory
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const featured = filtered.filter(a => a.featured)
  const regular = filtered.filter(a => !a.featured)

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-navy-950" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-5">
              <BookOpen className="w-4 h-4" />
              Insights & Knowledge Center
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Logistik <span className="text-brand-orange">Insights</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Artikel, analisis industri, dan panduan praktis dari para ahli logistik ALN untuk membantu Anda membuat keputusan bisnis yang lebih baik.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 md:top-20 z-20 bg-navy-900/95 backdrop-blur-xl border-b border-navy-700/40 py-3">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-navy-800/80 border border-navy-700/60 focus:border-brand-orange text-white placeholder-gray-500 pl-10 pr-4 py-2 rounded-xl text-sm outline-none transition-colors"
              />
            </div>
            {/* Category Pills */}
            <div className="flex gap-1.5 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    activeCategory === cat ? 'bg-brand-orange text-white' : 'bg-navy-800/60 border border-navy-700/40 text-gray-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-12 md:py-16 bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-navy-700 mx-auto mb-3" />
              <p className="text-gray-500">Tidak ada artikel yang sesuai dengan filter Anda.</p>
            </div>
          ) : (
            <>
              {/* Featured Articles */}
              {featured.length > 0 && (
                <FadeIn className="mb-10">
                  <div className="grid lg:grid-cols-3 gap-5">
                    {featured.map((article, i) => (
                      <ArticleCard key={article.id} article={article} featured />
                    ))}
                  </div>
                </FadeIn>
              )}

              {/* Regular Articles */}
              {regular.length > 0 && (
                <>
                  {featured.length > 0 && (
                    <FadeIn className="mb-5">
                      <h2 className="text-xl font-bold text-white">Artikel Terbaru</h2>
                    </FadeIn>
                  )}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {regular.map((article, i) => (
                      <FadeIn key={article.id} delay={i * 0.07}>
                        <ArticleCard article={article} />
                      </FadeIn>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-14 bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-xl mx-auto text-center bg-navy-800/60 border border-navy-700/40 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-brand-orange/15 flex items-center justify-center mx-auto mb-4">
                <Tag className="w-6 h-6 text-brand-orange" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Dapatkan Insights Terbaru</h2>
              <p className="text-gray-400 text-sm mb-5">Subscribe dan dapatkan analisis logistik terbaru langsung di email Anda setiap minggu.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email perusahaan Anda" className="input-field text-sm flex-1" />
                <button className="btn-primary whitespace-nowrap text-sm">Subscribe</button>
              </div>
              <p className="text-gray-600 text-xs mt-3">Tidak ada spam. Berhenti berlangganan kapan saja.</p>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
