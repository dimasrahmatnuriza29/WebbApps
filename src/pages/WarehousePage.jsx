import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, MapPin, Package, Shield, Wifi, CheckCircle2, XCircle, Warehouse, Layers, Thermometer } from 'lucide-react'
import { warehouseData, warehouseStats } from '../data/warehouseData'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay }} className={className}>
      {children}
    </motion.div>
  )
}

// ── Warehouse Modal ──────────────────────────────────────────────────────────
function WarehouseModal({ wh, onClose }) {
  const [imgIdx, setImgIdx] = useState(0)
  if (!wh) return null

  const occupancyRate = Math.round(((wh.areaNum - wh.availableSpaceNum) / wh.areaNum) * 100)

  return (
    <AnimatePresence>
      <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div
          className="modal-content w-full max-w-2xl"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gallery */}
          <div className="relative h-48 sm:h-56 bg-navy-900 overflow-hidden">
            <img src={wh.gallery[imgIdx]} alt={wh.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
            <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 bg-navy-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-white">
              <X className="w-4 h-4" />
            </button>
            {wh.gallery.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {wh.gallery.map((_, i) => (
                  <button key={i} onClick={() => setImgIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? 'bg-brand-orange w-5' : 'bg-white/50'}`} />
                ))}
              </div>
            )}
            <div className="absolute bottom-3 left-4">
              <div className="text-white font-bold text-lg">{wh.name}</div>
              <div className="flex items-center gap-1 text-gray-300 text-sm mt-0.5">
                <MapPin className="w-3 h-3 text-brand-orange" />
                {wh.location}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 224px)' }}>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: 'Luas Gudang', value: wh.area },
                { label: 'Kapasitas Palet', value: `${wh.palletCapacity.toLocaleString()} palet` },
                { label: 'Loading Dock', value: `${wh.loadingDock} pintu` },
              ].map(s => (
                <div key={s.label} className="bg-navy-900/80 rounded-xl p-3 text-center">
                  <div className="text-white font-bold text-sm">{s.value}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Occupancy */}
            <div className="mb-5">
              <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                <span>Occupancy Rate</span>
                <span className="text-white font-bold">{occupancyRate}%</span>
              </div>
              <div className="h-2 bg-navy-900/80 rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-brand-orange to-brand-orange-light rounded-full" initial={{ width: 0 }} animate={{ width: `${occupancyRate}%` }} transition={{ duration: 1 }} />
              </div>
              <div className="text-emerald-400 text-xs mt-1.5">{wh.availableSpace} ruang tersedia</div>
            </div>

            {/* Features */}
            <div className="mb-5">
              <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Fasilitas</div>
              <div className="flex flex-wrap gap-2">
                {wh.features.map(f => (
                  <span key={f} className="inline-flex items-center gap-1 bg-navy-900/60 border border-navy-700/40 text-gray-300 text-xs px-3 py-1.5 rounded-lg">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'CCTV', value: wh.cctv, icon: Shield },
                { label: 'Keamanan', value: wh.security, icon: Shield },
                { label: 'WMS', value: wh.wms ? 'Available' : 'Not Available', icon: Wifi, isAvailable: wh.wms },
                { label: 'Cold Storage', value: wh.coldStorage ? 'Available' : 'Not Available', icon: Thermometer, isAvailable: wh.coldStorage },
              ].map(item => {
                const Icon = item.icon
                const isBoolean = typeof item.value === 'boolean'
                const available = isBoolean ? item.value : item.isAvailable
                return (
                  <div key={item.label} className="bg-navy-900/60 border border-navy-700/40 rounded-xl p-3 flex items-center gap-2">
                    {available !== undefined ? (
                      available ? <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> : <XCircle className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    ) : <Icon className="w-4 h-4 text-brand-orange flex-shrink-0" />}
                    <div>
                      <div className="text-gray-500 text-xs">{item.label}</div>
                      <div className={`text-xs font-medium ${available ? 'text-emerald-400' : 'text-gray-500'}`}>
                        {isBoolean ? (item.value ? 'Active' : 'N/A') : item.value}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Certifications */}
            {wh.certifications.length > 0 && (
              <div className="mt-4">
                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Sertifikasi</div>
                <div className="flex flex-wrap gap-2">
                  {wh.certifications.map(c => (
                    <span key={c} className="bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs px-3 py-1 rounded-full">{c}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Warehouse Card ──────────────────────────────────────────────────────────
function WarehouseCard({ wh, onClick }) {
  const occupancy = Math.round(((wh.areaNum - wh.availableSpaceNum) / wh.areaNum) * 100)
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }} onClick={onClick}
      className="bg-navy-800/70 border border-navy-700/40 rounded-2xl overflow-hidden cursor-pointer hover:border-brand-orange/35 hover:shadow-card-hover transition-all duration-300 group">
      <div className="relative h-44 overflow-hidden bg-navy-900">
        <img src={wh.image} alt={wh.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
        <div className="absolute top-3 right-3">
          <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full">{wh.status}</span>
        </div>
        <div className="absolute top-3 left-3 flex gap-1.5">
          {wh.wms && <span className="bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs px-2 py-0.5 rounded-full">WMS</span>}
          {wh.coldStorage && <span className="bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs px-2 py-0.5 rounded-full">Cold</span>}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-white font-bold text-base mb-1">{wh.name}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-4">
          <MapPin className="w-3 h-3 text-brand-orange" />
          {wh.location}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'Area', value: wh.area },
            { label: 'Palet', value: wh.palletCapacity.toLocaleString() },
            { label: 'Loading', value: `${wh.loadingDock} dock` },
          ].map(s => (
            <div key={s.label} className="bg-navy-900/60 rounded-lg p-2 text-center">
              <div className="text-white text-xs font-bold">{s.value}</div>
              <div className="text-gray-600 text-[10px]">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Occupancy</span>
            <span className="text-white">{occupancy}%</span>
          </div>
          <div className="h-1.5 bg-navy-900/80 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-brand-orange to-brand-orange-light rounded-full" style={{ width: `${occupancy}%` }} />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-emerald-400 font-medium">{wh.availableSpace} tersedia</span>
          <span className="text-brand-orange font-semibold group-hover:underline">Detail →</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function WarehousePage() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/97 via-navy-900/92 to-navy-900/70" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-5">
              <Warehouse className="w-4 h-4" />
              Warehouse Network
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              18 Logistics Hubs <span className="text-brand-orange">Strategis</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Jaringan gudang modern tersebar di kota-kota utama Indonesia. WMS terintegrasi, cold storage, dan keamanan 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Hubs', value: warehouseStats.totalHubs, color: 'text-white', icon: Warehouse },
              { label: 'Total Area', value: warehouseStats.totalArea, color: 'text-blue-400', icon: Layers },
              { label: 'Total Kapasitas', value: `${warehouseStats.totalPallets.toLocaleString()} palet`, color: 'text-purple-400', icon: Package },
              { label: 'Ruang Tersedia', value: warehouseStats.availableSpace, color: 'text-emerald-400', icon: CheckCircle2 },
            ].map((s, i) => {
              const Icon = s.icon
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-navy-800/60 border border-navy-700/40 rounded-2xl p-5 text-center">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div className={`text-2xl md:text-3xl font-black ${s.color} mb-1`}>{s.value}</div>
                    <div className="text-gray-500 text-sm">{s.label}</div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Warehouse Cards */}
      <section className="py-12 md:py-16 bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Gudang Operasional Kami</h2>
            <p className="text-gray-400 mt-2">Klik kartu untuk melihat detail fasilitas dan ketersediaan ruang gudang.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {warehouseData.map((wh, i) => (
              <FadeIn key={wh.id} delay={i * 0.07}>
                <WarehouseCard wh={wh} onClick={() => setSelected(wh)} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Standar Fasilitas Gudang ALN</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Shield, title: 'Keamanan 24/7', desc: 'CCTV dan petugas keamanan bersenjata sepanjang waktu.' },
              { icon: Wifi, title: 'WMS Terintegrasi', desc: 'Warehouse Management System real-time untuk manajemen inventori.' },
              { icon: Thermometer, title: 'Cold Storage', desc: 'Fasilitas cold storage untuk produk farmasi dan FMCG sensitif suhu.' },
              { icon: Layers, title: 'Racking System', desc: 'Sistem rak modern untuk memaksimalkan kapasitas dan akses produk.' },
            ].map((f, i) => {
              const Icon = f.icon
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="bg-navy-800/60 border border-navy-700/40 rounded-2xl p-5 hover:border-brand-orange/25 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-brand-orange" />
                    </div>
                    <h3 className="text-white font-bold mb-1">{f.title}</h3>
                    <p className="text-gray-400 text-sm">{f.desc}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {selected && <WarehouseModal wh={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
