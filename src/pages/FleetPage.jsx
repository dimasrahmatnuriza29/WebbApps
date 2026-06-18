import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, MapPin, Gauge, Package, Truck, Activity, CheckCircle2, ChevronLeft, ChevronRight, BarChart3, Zap } from 'lucide-react'
import { RadialBarChart, RadialBar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { fleetData, fleetStats } from '../data/fleetData'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay }} className={className}>
      {children}
    </motion.div>
  )
}

// ── Fleet Modal ────────────────────────────────────────────────────────────────
function FleetModal({ fleet, onClose }) {
  const [imgIdx, setImgIdx] = useState(0)
  if (!fleet) return null

  const utilization = Math.round((fleet.activeUnits / fleet.totalUnits) * 100)

  return (
    <AnimatePresence>
      <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div
          className="modal-content w-full max-w-3xl"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Gallery */}
          <div className="relative h-48 sm:h-64 bg-navy-900 overflow-hidden">
            <img src={fleet.gallery[imgIdx]} alt={fleet.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />

            {/* Close */}
            <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 bg-navy-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>

            {/* Gallery Nav */}
            {fleet.gallery.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {fleet.gallery.map((_, i) => (
                  <button key={i} onClick={() => setImgIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? 'bg-brand-orange w-5' : 'bg-white/50'}`} />
                ))}
              </div>
            )}

            {/* Fleet name overlay */}
            <div className="absolute bottom-3 left-4">
              <div className="text-white font-black text-xl">{fleet.fullName}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${fleet.availableUnits > 0 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                  {fleet.availableUnits > 0 ? `${fleet.availableUnits} Unit Available` : 'Full Utilization'}
                </span>
                {fleet.gps && <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold px-2 py-0.5 rounded-full">GPS Tracking</span>}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 md:p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 256px)' }}>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">{fleet.description}</p>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-3 mb-5">
              {[
                { label: 'Total Unit', value: fleet.totalUnits, color: 'text-white' },
                { label: 'Active', value: fleet.activeUnits, color: 'text-blue-400' },
                { label: 'Available', value: fleet.availableUnits, color: 'text-emerald-400' },
                { label: 'Maintenance', value: fleet.maintenanceUnits, color: 'text-amber-400' },
              ].map((s) => (
                <div key={s.label} className="bg-navy-900/80 rounded-xl p-3 text-center">
                  <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Utilization Bar */}
            <div className="mb-5">
              <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                <span>Fleet Utilization</span>
                <span className="text-white font-bold">{utilization}%</span>
              </div>
              <div className="h-2 bg-navy-900/80 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-orange to-brand-orange-light rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${utilization}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              {fleet.specs.map((spec) => (
                <div key={spec.label} className="bg-navy-900/60 border border-navy-700/40 rounded-xl p-3">
                  <div className="text-gray-500 text-xs mb-0.5">{spec.label}</div>
                  <div className="text-white font-semibold text-sm">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* Coverage */}
            <div>
              <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Jangkauan Operasional</div>
              <div className="flex flex-wrap gap-2">
                {fleet.coverage.map((area) => (
                  <span key={area} className="inline-flex items-center gap-1 bg-navy-900/60 border border-navy-700/40 text-gray-300 text-xs px-3 py-1.5 rounded-full">
                    <MapPin className="w-3 h-3 text-brand-orange" />
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Fleet Card ──────────────────────────────────────────────────────────────
function FleetCard({ fleet, onClick }) {
  const utilization = Math.round((fleet.activeUnits / fleet.totalUnits) * 100)
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={onClick}
      className="bg-navy-800/70 border border-navy-700/40 rounded-2xl overflow-hidden cursor-pointer hover:border-brand-orange/35 hover:shadow-card-hover transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-navy-900">
        <img src={fleet.image} alt={fleet.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${fleet.availableUnits > 0 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
            {fleet.availableUnits > 0 ? 'Tersedia' : 'Full'}
          </span>
        </div>
        {fleet.gps && (
          <div className="absolute top-3 left-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs px-2 py-0.5 rounded-full font-semibold">GPS</div>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-white font-black text-xl">{fleet.name}</h3>
            <p className="text-gray-500 text-xs">{fleet.fullName}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-white">{fleet.totalUnits}</div>
            <div className="text-gray-500 text-xs">unit</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Package className="w-3.5 h-3.5 text-brand-orange" />
            <span>{fleet.capacity}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <Gauge className="w-3.5 h-3.5 text-brand-orange" />
            <span>{fleet.volume}</span>
          </div>
        </div>

        {/* Utilization */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Utilization</span>
            <span className="text-white">{utilization}%</span>
          </div>
          <div className="h-1.5 bg-navy-900/80 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-brand-orange to-brand-orange-light rounded-full" style={{ width: `${utilization}%` }} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 text-xs font-medium">{fleet.availableUnits} available</span>
            <span className="text-gray-600 text-xs">|</span>
            <span className="text-blue-400 text-xs">{fleet.activeUnits} active</span>
          </div>
          <span className="text-brand-orange text-xs font-semibold group-hover:underline">Detail →</span>
        </div>
      </div>
    </motion.div>
  )
}

// ── Fleet Dashboard Chart ────────────────────────────────────────────────────
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']

function FleetDashboard() {
  const pieData = [
    { name: 'Active', value: fleetStats.active },
    { name: 'Available', value: fleetStats.available - fleetStats.active },
    { name: 'Maintenance', value: fleetStats.maintenance },
  ]

  const barData = fleetData.map(f => ({
    name: f.name,
    Active: f.activeUnits,
    Available: f.availableUnits,
    Maint: f.maintenanceUnits,
  }))

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {/* Summary Cards */}
      <div className="bg-navy-800/60 border border-navy-700/40 rounded-2xl p-5">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-orange" />
          Fleet Status Overview
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: 'Total Fleet', value: fleetStats.total, color: 'text-white', bg: 'bg-navy-700/50' },
            { label: 'Active', value: fleetStats.active, color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { label: 'Available', value: fleetStats.available, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { label: 'Maintenance', value: fleetStats.maintenance, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl p-3 text-center`}>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-gray-500 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="flex justify-between text-xs text-gray-400 mb-1.5">
            <span>Overall Utilization</span>
            <span className="text-white font-bold">{fleetStats.utilization}%</span>
          </div>
          <div className="h-2.5 bg-navy-900/80 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-brand-orange to-brand-orange-light rounded-full" initial={{ width: 0 }} whileInView={{ width: `${fleetStats.utilization}%` }} transition={{ duration: 1.5, ease: 'easeOut' }} viewport={{ once: true }} />
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-navy-800/60 border border-navy-700/40 rounded-2xl p-5">
        <h3 className="text-white font-bold mb-2 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-brand-orange" />
          Fleet Distribution
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
              {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#0F2044', border: '1px solid #1A3060', borderRadius: '8px', color: '#fff' }} />
            <Legend formatter={(val) => <span style={{ color: '#9CA3AF', fontSize: '12px' }}>{val}</span>} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - spans 2 cols */}
      <div className="md:col-span-2 bg-navy-800/60 border border-navy-700/40 rounded-2xl p-5">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <Truck className="w-5 h-5 text-brand-orange" />
          Unit per Tipe Armada
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A3060" />
            <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
            <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: '#0F2044', border: '1px solid #1A3060', borderRadius: '8px', color: '#fff' }} />
            <Bar dataKey="Active" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Available" fill="#10B981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Maint" fill="#F59E0B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function FleetPage() {
  const [selectedFleet, setSelectedFleet] = useState(null)

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1601758124096-519bd63afe03?w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/97 via-navy-900/92 to-navy-900/70" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-5">
              <Truck className="w-4 h-4" />
              Fleet & Assets
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Armada Modern <span className="text-brand-orange">162 Unit</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-xl">
              Dari CDE untuk last mile hingga trailer untuk heavy cargo — armada lengkap kami siap mendukung seluruh kebutuhan distribusi bisnis Anda.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {[
                { label: 'GPS Tracking', icon: '📡' },
                { label: 'Tahun 2019–2024', icon: '📅' },
                { label: 'Driver Terlatih', icon: '👨‍✈️' },
                { label: 'Asuransi Kargo', icon: '🛡️' },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-2 bg-navy-800/60 border border-navy-700/40 text-gray-300 text-sm px-3 py-1.5 rounded-lg">
                  <span>{b.icon}</span> {b.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="py-12 md:py-16 bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-8">
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-3">
              <Zap className="w-4 h-4" />
              Capacity Availability Dashboard
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Fleet Utilization Real-Time</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <FleetDashboard />
          </FadeIn>
        </div>
      </section>

      {/* Fleet Cards */}
      <section className="py-12 md:py-16 bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Tipe Armada Kami</h2>
            <p className="text-gray-400 mt-2">Klik kartu untuk melihat detail lengkap. Semua unit dilengkapi GPS tracking real-time.</p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {fleetData.map((fleet, i) => (
              <FadeIn key={fleet.id} delay={i * 0.07}>
                <FleetCard fleet={fleet} onClick={() => setSelectedFleet(fleet)} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Availability Quick Summary */}
      <section className="py-12 bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Ketersediaan Saat Ini</h2>
            <p className="text-gray-400 mt-2">Data ketersediaan armada real-time per jenis kendaraan.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {fleetData.map((fleet) => (
                <div key={fleet.id} className="bg-navy-800/60 border border-navy-700/40 rounded-2xl p-4 text-center hover:border-brand-orange/25 transition-all duration-300">
                  <div className="text-4xl font-black text-emerald-400 mb-1">{fleet.availableUnits}</div>
                  <div className="text-white font-bold text-sm">{fleet.name}</div>
                  <div className="text-gray-500 text-xs mt-1">dari {fleet.totalUnits} unit</div>
                  <div className="mt-2 h-1.5 bg-navy-900/80 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${(fleet.availableUnits / fleet.totalUnits) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Modal */}
      {selectedFleet && <FleetModal fleet={selectedFleet} onClose={() => setSelectedFleet(null)} />}
    </div>
  )
}
