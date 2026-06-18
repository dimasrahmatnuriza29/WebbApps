import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView as useInViewObs } from 'react-intersection-observer'
import {
  ArrowRight, Play, CheckCircle2, Globe, Truck, Warehouse, BarChart3,
  Shield, Zap, Award, Clock, Users, Package, TrendingUp, ChevronRight,
  Star, Quote, MapPin, Phone, MessageCircle
} from 'lucide-react'
import { clientCategories } from '../data/clientsData'

// ── Fade-in wrapper ──────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  }
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Stats Data ────────────────────────────────────────────────────────────────
const stats = [
  { value: 11, suffix: '+', label: 'Years Experience', sub: 'Berdiri sejak 2013', icon: Award },
  { value: 2350000, suffix: '+', label: 'Shipments Delivered', sub: 'Pengiriman sukses', icon: Package },
  { value: 480, suffix: '+', label: 'Corporate Clients', sub: 'Klien aktif', icon: Users },
  { value: 162, suffix: '', label: 'Fleet Units', sub: 'Armada aktif', icon: Truck },
  { value: 18, suffix: '', label: 'Logistics Hubs', sub: 'Gudang & depo', icon: Warehouse },
  { value: 99.2, suffix: '%', label: 'On-Time Delivery', sub: 'Rate pengiriman tepat waktu', icon: TrendingUp, decimal: 1 },
]

// ── Timeline Data ─────────────────────────────────────────────────────────────
const timeline = [
  { year: '2013', title: 'Company Founded', desc: 'PT Armada Logistik Nusantara berdiri dengan 12 unit armada di Jakarta.' },
  { year: '2015', title: 'Fleet Expansion', desc: 'Ekspansi armada mencapai 45 unit. Pembukaan kantor Surabaya dan Bandung.' },
  { year: '2017', title: 'Warehouse Network', desc: 'Pembangunan 5 gudang logistik di kota-kota strategis Jawa.' },
  { year: '2019', title: 'Nationwide Distribution', desc: 'Jangkauan distribusi meluas ke Sumatra, Kalimantan, dan Sulawesi.' },
  { year: '2021', title: 'ISO 9001:2015 Certified', desc: 'Mendapatkan sertifikasi ISO 9001:2015 dan K3. Armada tembus 120 unit.' },
  { year: '2023', title: 'Enterprise Logistics', desc: 'Layanan enterprise logistics dengan WMS dan GPS tracking real-time.' },
  { year: '2026', title: 'Digital Platform', desc: 'Peluncuran platform digital logistik terintegrasi untuk klien korporat.' },
]

// ── Why Choose Us ─────────────────────────────────────────────────────────────
const whyUs = [
  { icon: Globe, title: 'Nationwide Coverage', desc: '28 provinsi terjangkau dengan armada dan gudang di titik-titik strategis Indonesia.', color: 'text-blue-400' },
  { icon: Truck, title: 'Dedicated Fleet', desc: '162 unit armada modern dengan GPS tracking real-time dan driver berpengalaman.', color: 'text-orange-400' },
  { icon: Warehouse, title: 'Warehouse Network', desc: '18 gudang logistik modern dengan WMS, cold storage, dan keamanan 24/7.', color: 'text-purple-400' },
  { icon: BarChart3, title: 'Real-Time Visibility', desc: 'Dashboard monitoring pengiriman real-time. Lacak status armada dan stok kapan saja.', color: 'text-emerald-400' },
  { icon: Shield, title: 'Operational Excellence', desc: 'ISO 9001:2015 certified dengan SOP ketat. On-time delivery rate 99.2%.', color: 'text-amber-400' },
  { icon: Zap, title: 'Cost Efficiency', desc: 'Optimasi rute dan konsolidasi pengiriman untuk menekan biaya logistik klien.', color: 'text-teal-400' },
]

// ── Animated Counter ──────────────────────────────────────────────────────────
function StatCard({ stat }) {
  const { ref, inView } = useInViewObs({ triggerOnce: true, threshold: 0.3 })
  const Icon = stat.icon
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-navy-800/70 border border-navy-700/40 rounded-2xl p-5 md:p-6 text-center group hover:border-brand-orange/30 hover:bg-navy-800 transition-all duration-300"
    >
      <div className="flex justify-center mb-3">
        <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-brand-orange" />
        </div>
      </div>
      <div className="text-3xl md:text-4xl font-black text-white mb-1 tabular-nums">
        {inView ? (
          <CountUp
            end={stat.value}
            duration={2.5}
            separator=","
            decimals={stat.decimal || 0}
            suffix={stat.suffix}
          />
        ) : (
          <span>0{stat.suffix}</span>
        )}
      </div>
      <div className="text-sm font-semibold text-gray-200 mb-0.5">{stat.label}</div>
      <div className="text-xs text-gray-500">{stat.sub}</div>
    </motion.div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=80',
    label: 'Armada Truk CDD & CDE',
  },
  {
    url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1920&q=80',
    label: 'Semi Trailer & Tronton',
  },
  {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    label: 'Distribusi Nationwide',
  },
  {
    url: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=1920&q=80',
    label: 'Armada Wingbox & Fuso',
  },
  {
    url: 'https://images.unsplash.com/photo-1485575301924-6891ef935dcd?w=1920&q=80',
    label: 'Truk Kontainer & Trailer',
  },
]

export default function HomePage() {
  const [activeTimeline, setActiveTimeline] = useState(6)
  const [activeCat, setActiveCat] = useState('fmcg')
  const [heroIndex, setHeroIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="overflow-hidden">
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Slideshow Background */}
        <AnimatePresence mode="sync">
          <motion.div
            key={heroIndex}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${heroImages[heroIndex].url}')` }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/97 via-navy-900/90 to-navy-900/70" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {heroImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                i === heroIndex ? 'w-8 h-2 bg-brand-orange' : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              }`}
              title={img.label}
            />
          ))}
        </div>
        {/* Current fleet label */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="text-white/50 text-xs font-medium tracking-wider uppercase"
            >
              {heroImages[heroIndex].label}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating orbs */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-brand-orange/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              Trusted B2B Logistics Partner Since 2013
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 text-shadow"
            >
              Integrated{' '}
              <span className="bg-gradient-to-r from-brand-orange to-brand-orange-light bg-clip-text text-transparent">
                Logistics Solution
              </span>{' '}
              For Your Business Growth
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed"
            >
              Trusted logistics partner with nationwide distribution network, modern fleet,
              warehousing facilities, and operational excellence across Indonesia.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-7 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-glow hover:scale-105 text-base"
              >
                Request Quotation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border-2 border-white/25 hover:border-brand-orange text-white hover:text-brand-orange font-semibold px-7 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm text-base"
              >
                <MessageCircle className="w-5 h-5" />
                Schedule Meeting
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-5"
            >
              {['ISO 9001:2015', 'K3 Certified', 'GPS Tracking', '24/7 Support'].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-gray-400 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  {badge}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent animate-bounce-slow" />
          </div>
        </motion.div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────── */}
      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <BarChart3 className="w-4 h-4" />
              Company Statistics
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Angka yang Berbicara untuk Diri Sendiri
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              Lebih dari satu dekade kepercayaan klien korporat dari berbagai industri di Indonesia.
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <Clock className="w-4 h-4" />
              Company Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Perjalanan 11+ Tahun Kami</h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              Dari startup logistik lokal menuju pemimpin distribusi nasional B2B Indonesia.
            </p>
          </FadeIn>

          {/* Timeline Track */}
          <div className="relative">
            {/* Desktop timeline */}
            <div className="hidden lg:block">
              <div className="flex items-start gap-0 relative">
                {/* Track line */}
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-navy-700" />
                <div
                  className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-brand-orange to-brand-orange-light transition-all duration-700"
                  style={{ width: `${((activeTimeline + 1) / timeline.length) * 100}%` }}
                />

                {timeline.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTimeline(idx)}
                    className="flex-1 flex flex-col items-center group text-center cursor-pointer"
                  >
                    <div className={`relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 mb-4 ${
                      idx <= activeTimeline
                        ? 'bg-brand-orange border-brand-orange text-white shadow-orange-glow scale-110'
                        : 'bg-navy-800 border-navy-600 text-gray-400 group-hover:border-navy-500'
                    }`}>
                      {idx + 1}
                    </div>
                    <div className={`text-lg font-black transition-colors ${idx <= activeTimeline ? 'text-brand-orange' : 'text-gray-500'}`}>
                      {item.year}
                    </div>
                    <div className={`text-sm font-medium mt-1 transition-colors px-2 ${idx === activeTimeline ? 'text-white' : 'text-gray-500'}`}>
                      {item.title}
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Item Detail */}
              <motion.div
                key={activeTimeline}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 bg-navy-800/80 border border-navy-700/50 rounded-2xl p-6 max-w-xl mx-auto text-center"
              >
                <div className="text-brand-orange text-4xl font-black mb-1">{timeline[activeTimeline].year}</div>
                <div className="text-white font-bold text-lg mb-2">{timeline[activeTimeline].title}</div>
                <p className="text-gray-400 text-sm">{timeline[activeTimeline].desc}</p>
              </motion.div>
            </div>

            {/* Mobile timeline */}
            <div className="lg:hidden space-y-4">
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange font-bold text-sm flex-shrink-0">
                      {idx + 1}
                    </div>
                    {idx < timeline.length - 1 && <div className="w-px flex-1 bg-navy-700 mt-2" />}
                  </div>
                  <div className="pb-6">
                    <div className="text-brand-orange font-black text-xl">{item.year}</div>
                    <div className="text-white font-semibold">{item.title}</div>
                    <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-5">
                <Star className="w-4 h-4" />
                Vision & Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Komitmen Kami untuk{' '}
                <span className="bg-gradient-to-r from-brand-orange to-brand-orange-light bg-clip-text text-transparent">
                  Indonesia
                </span>
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Kami percaya logistik adalah tulang punggung ekonomi Indonesia. Setiap pengiriman yang tepat waktu adalah kontribusi kami untuk pertumbuhan bisnis klien dan kemajuan bangsa.
              </p>

              <div className="space-y-4">
                <div className="bg-navy-800/60 border border-navy-700/40 rounded-xl p-5 hover:border-brand-orange/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                      <Star className="w-4 h-4 text-brand-orange" />
                    </div>
                    <h3 className="text-white font-bold">Visi</h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Menjadi perusahaan logistik B2B terdepan dan terpercaya di Indonesia yang mendukung pertumbuhan ekonomi nasional melalui layanan distribusi terintegrasi berkelas dunia.
                  </p>
                </div>

                <div className="bg-navy-800/60 border border-navy-700/40 rounded-xl p-5 hover:border-brand-orange/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    </div>
                    <h3 className="text-white font-bold">Misi</h3>
                  </div>
                  <ul className="text-gray-300 text-sm space-y-2">
                    {[
                      'Memberikan solusi logistik yang efisien, andal, dan kompetitif',
                      'Membangun infrastruktur distribusi yang menjangkau seluruh Indonesia',
                      'Mengembangkan SDM logistik yang profesional dan berdedikasi',
                      'Menerapkan teknologi digital untuk transparansi dan efisiensi',
                    ].map((m, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Integritas', desc: 'Transparansi dan kejujuran dalam setiap layanan', color: 'border-blue-500/30 hover:border-blue-500/50', icon: Shield },
                  { label: 'Inovasi', desc: 'Terus berinovasi dalam teknologi dan proses logistik', color: 'border-purple-500/30 hover:border-purple-500/50', icon: Zap },
                  { label: 'Keunggulan', desc: 'Standar tertinggi dalam kualitas layanan operasional', color: 'border-amber-500/30 hover:border-amber-500/50', icon: Award },
                  { label: 'Kemitraan', desc: 'Hubungan jangka panjang berbasis kepercayaan', color: 'border-emerald-500/30 hover:border-emerald-500/50', icon: Users },
                ].map(({ label, desc, color, icon: Icon }) => (
                  <div key={label} className={`bg-navy-800/60 border ${color} rounded-2xl p-5 transition-all duration-300`}>
                    <Icon className="w-7 h-7 text-brand-orange mb-3" />
                    <h4 className="text-white font-bold mb-1">{label}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-gradient-to-br from-brand-orange/10 to-brand-orange-dark/5 border border-brand-orange/20 rounded-2xl p-5">
                <div className="text-4xl font-black text-brand-orange">99.2%</div>
                <div className="text-white font-semibold">On-Time Delivery Rate</div>
                <p className="text-gray-400 text-xs mt-1">Rata-rata pencapaian pengiriman tepat waktu seluruh rute</p>
                <div className="mt-3 bg-navy-800/80 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand-orange to-brand-orange-light rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '99.2%' }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <Shield className="w-4 h-4" />
              Keunggulan Kami
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Mengapa Pilih <span className="text-brand-orange">ALN Logistics</span>?
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              Kami bukan sekadar penyedia truk. Kami adalah mitra strategis yang memahami kebutuhan distribusi bisnis Anda.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((item, i) => {
              const Icon = item.icon
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="bg-navy-800/60 border border-navy-700/40 rounded-2xl p-6 hover:border-brand-orange/25 hover:bg-navy-800/80 transition-all duration-300 group h-full">
                    <div className="w-12 h-12 rounded-xl bg-navy-900/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CLIENT PORTFOLIO ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <Users className="w-4 h-4" />
              Client Portfolio
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              480+ Klien Korporat Mempercayai Kami
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              Dari FMCG hingga pharmaceutical, klien terkemuka Indonesia memilih ALN Logistics sebagai mitra distribusi mereka.
            </p>
          </FadeIn>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {clientCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCat === cat.id
                    ? 'bg-brand-orange text-white shadow-orange-glow'
                    : 'bg-navy-800/60 border border-navy-700/40 text-gray-400 hover:text-white hover:border-navy-600'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeCat === cat.id ? 'bg-white/20 text-white' : 'bg-navy-700 text-gray-400'}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Client Logos */}
          <motion.div
            key={activeCat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {clientCategories.find(c => c.id === activeCat)?.clients.map((client, i) => (
              <div
                key={i}
                className="bg-navy-800/60 border border-navy-700/40 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-brand-orange/30 hover:bg-navy-800 transition-all duration-300 cursor-default min-h-[90px]"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-700 to-navy-800 flex items-center justify-center text-brand-orange font-black text-sm border border-navy-600/50">
                  {client.initials}
                </div>
                <span className="text-gray-400 text-xs text-center leading-tight">{client.name}</span>
              </div>
            ))}
          </motion.div>

          <div className="text-center mt-8">
            <Link
              to="/clients"
              className="inline-flex items-center gap-2 text-brand-orange hover:text-brand-orange-light font-semibold transition-colors"
            >
              Lihat Semua Klien
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── DIFFERENTIATORS PREVIEW ──────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <Zap className="w-4 h-4" />
              Pembeda Utama
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Fitur yang Tidak Dimiliki Kompetitor
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              Tools eksklusif yang membantu Anda membuat keputusan logistik berbasis data.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                icon: '',
                title: 'Capacity Availability Dashboard',
                desc: 'Lihat kapasitas armada dan gudang yang tersedia secara real-time.',
                cta: 'Cek Kapasitas',
                link: '/fleet',
                badge: 'Real-Time',
              },
              {
                icon: '🔑',
                title: 'Client Portal',
                desc: 'Dashboard eksklusif untuk monitor pengiriman, invoice, dan laporan bulanan.',
                cta: 'Login Portal',
                link: '/portal',
                badge: 'Khusus Klien',
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <Link
                  to={item.link}
                  className="block bg-navy-800/60 border border-navy-700/40 rounded-2xl p-6 hover:border-brand-orange/35 hover:bg-navy-800/90 transition-all duration-300 group h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{item.icon}</div>
                    <span className="text-xs font-bold bg-brand-orange/10 text-brand-orange border border-brand-orange/20 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{item.desc}</p>
                  <div className="flex items-center gap-1 text-brand-orange text-sm font-semibold group-hover:gap-2 transition-all duration-200">
                    {item.cta}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/98 via-navy-900/95 to-navy-950/98" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <MessageCircle className="w-4 h-4" />
                Mulai Hari Ini
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-5">
                Siap Mengoptimalkan{' '}
                <span className="text-brand-orange">Logistik Bisnis</span> Anda?
              </h2>
              <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
                Tim konsultan logistik kami siap membantu merancang solusi distribusi yang tepat untuk skala dan kebutuhan bisnis Anda.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-glow hover:scale-105 text-base"
                >
                  Request Quotation
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="https://wa.me/628001234567?text=Halo%20ALN%20Logistics%2C%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20logistik%20perusahaan%20kami."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 text-base"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Sekarang
                </a>
                <Link
                  to="/solutions"
                  className="inline-flex items-center gap-2 border-2 border-white/20 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-base"
                >
                  Lihat Semua Solusi
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Contact quick info */}
              <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm">
                <a href="tel:+62218001234" className="flex items-center gap-2 text-gray-400 hover:text-brand-orange transition-colors">
                  <Phone className="w-4 h-4" />
                  +62 21 800-1234
                </a>
                <a href="mailto:info@aln-logistics.co.id" className="flex items-center gap-2 text-gray-400 hover:text-brand-orange transition-colors">
                  <MapPin className="w-4 h-4" />
                  info@aln-logistics.co.id
                </a>
                <span className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  24/7 Support
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
