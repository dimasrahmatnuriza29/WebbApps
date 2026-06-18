import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { MapPin, Truck, Warehouse, Clock, ChevronRight, Globe, X } from 'lucide-react'
import { coverageRegions, coverageStats } from '../data/coverageData'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay }} className={className}>
      {children}
    </motion.div>
  )
}

const levelBadge = {
  full: { label: 'Full Coverage', class: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  partial: { label: 'Partial Coverage', class: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  limited: { label: 'Limited Coverage', class: 'bg-red-500/20 text-red-400 border-red-500/30' },
}

// ── Indonesia SVG Map ────────────────────────────────────────────────────────
function IndonesiaMap({ activeRegion, onRegionClick }) {
  const islands = [
    {
      id: 'sumatra',
      label: 'Sumatra',
      path: 'M 48,32 L 68,18 L 115,22 L 148,38 L 162,62 L 155,95 L 138,118 L 112,138 L 88,152 L 62,148 L 42,128 L 32,98 L 36,66 Z',
      labelPos: { x: 98, y: 88 },
    },
    {
      id: 'java',
      label: 'Jawa & Bali',
      path: 'M 168,175 L 230,162 L 295,158 L 345,165 L 370,180 L 365,200 L 310,208 L 240,212 L 175,205 Z',
      labelPos: { x: 268, y: 188 },
    },
    {
      id: 'kalimantan',
      label: 'Kalimantan',
      path: 'M 172,42 L 228,28 L 300,32 L 342,52 L 362,82 L 355,138 L 328,162 L 285,170 L 238,165 L 195,145 L 172,108 Z',
      labelPos: { x: 268, y: 100 },
    },
    {
      id: 'sulawesi',
      label: 'Sulawesi',
      path: 'M 378,55 L 415,45 L 428,75 L 415,100 L 435,120 L 448,158 L 430,172 L 415,148 L 398,118 L 375,110 L 365,85 Z',
      labelPos: { x: 406, y: 108 },
    },
    {
      id: 'ntt-ntb',
      label: 'NTT & NTB',
      path: 'M 372,212 L 430,205 L 468,210 L 488,225 L 478,240 L 432,245 L 378,238 Z',
      labelPos: { x: 430, y: 227 },
    },
    {
      id: 'papua',
      label: 'Papua',
      path: 'M 498,42 L 620,35 L 675,48 L 700,75 L 698,138 L 672,172 L 628,188 L 572,182 L 528,158 L 498,115 Z',
      labelPos: { x: 598, y: 112 },
    },
  ]

  // Small islands
  const smallIslands = [
    { id: 'java', cx: 378, cy: 183, r: 8, label: 'Bali' },
    { id: 'sulawesi', cx: 458, cy: 92, r: 6 },
    { id: 'sulawesi', cx: 462, cy: 108, r: 5 },
    { id: 'ntt-ntb', cx: 490, cy: 218, r: 5 },
    { id: 'ntt-ntb', cx: 505, cy: 222, r: 4 },
  ]

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 720 280"
        className="w-full"
        style={{ filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.4))' }}
      >
        {/* Ocean background */}
        <rect width="720" height="280" fill="url(#oceanGrad)" rx="16" />
        <defs>
          <radialGradient id="oceanGrad" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#0F2044" />
            <stop offset="100%" stopColor="#0A1628" />
          </radialGradient>
          {coverageRegions.map(r => (
            <radialGradient key={r.id} id={`grad-${r.id}`} cx="50%" cy="50%">
              <stop offset="0%" stopColor={r.color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={r.color} stopOpacity="0.6" />
            </radialGradient>
          ))}
        </defs>

        {/* Grid lines */}
        {[60, 120, 180, 240].map(y => <line key={y} x1="0" y1={y} x2="720" y2={y} stroke="#1A3060" strokeWidth="0.5" strokeDasharray="4,8" />)}
        {[120, 240, 360, 480, 600].map(x => <line key={x} x1={x} y1="0" x2={x} y2="280" stroke="#1A3060" strokeWidth="0.5" strokeDasharray="4,8" />)}

        {/* Island shapes */}
        {islands.map(island => {
          const region = coverageRegions.find(r => r.id === island.id)
          const isActive = activeRegion === island.id
          const baseColor = region ? region.color : '#334155'
          return (
            <g key={island.id} onClick={() => onRegionClick(island.id)} style={{ cursor: 'pointer' }}>
              <path
                d={island.path}
                fill={isActive ? `url(#grad-${island.id})` : baseColor}
                fillOpacity={isActive ? 1 : 0.55}
                stroke={isActive ? '#FFFFFF' : baseColor}
                strokeWidth={isActive ? 2 : 0.5}
                strokeOpacity={0.6}
                className="transition-all duration-300"
                style={{ filter: isActive ? `drop-shadow(0 0 12px ${baseColor}88)` : 'none' }}
              />
              {/* Label */}
              <text
                x={island.labelPos.x}
                y={island.labelPos.y}
                textAnchor="middle"
                fill={isActive ? '#FFFFFF' : '#E2E8F0'}
                fontSize={isActive ? '8' : '7'}
                fontWeight={isActive ? 'bold' : 'normal'}
                className="pointer-events-none select-none"
              >
                {island.label}
              </text>
            </g>
          )
        })}

        {/* Small islands */}
        {smallIslands.map((si, i) => {
          const region = coverageRegions.find(r => r.id === si.id)
          return (
            <circle key={i} cx={si.cx} cy={si.cy} r={si.r}
              fill={region ? region.color : '#334155'}
              fillOpacity={0.6}
              onClick={() => onRegionClick(si.id)}
              style={{ cursor: 'pointer' }}
            />
          )
        })}

        {/* City dots for active region */}
        {activeRegion && coverageRegions.find(r => r.id === activeRegion)?.cities.slice(0, 4).map((_, i) => {
          const positions = [
            { x: 90, y: 80 }, { x: 110, y: 130 }, { x: 260, y: 185 }, { x: 300, y: 170 },
          ]
          const pos = positions[i]
          return pos ? (
            <g key={i}>
              <circle cx={pos.x} cy={pos.y} r="4" fill="#F97316" className="animate-pulse" />
              <circle cx={pos.x} cy={pos.y} r="8" fill="#F97316" fillOpacity="0.2" />
            </g>
          ) : null
        })}

        {/* Legend */}
        <g transform="translate(10, 248)">
          {[
            { color: '#10B981', label: 'Full Coverage' },
            { color: '#F59E0B', label: 'Partial' },
            { color: '#EF4444', label: 'Limited' },
          ].map((l, i) => (
            <g key={i} transform={`translate(${i * 115}, 0)`}>
              <rect x="0" y="0" width="10" height="10" fill={l.color} rx="2" fillOpacity="0.7" />
              <text x="14" y="9" fill="#9CA3AF" fontSize="8">{l.label}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}

// ── Region Detail Panel ───────────────────────────────────────────────────────
function RegionPanel({ region, onClose }) {
  if (!region) return null
  const badge = levelBadge[region.level]
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 30 }}
        transition={{ duration: 0.3 }}
        className="bg-navy-800/90 border border-navy-700/50 rounded-2xl p-5 relative"
      >
        <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg border border-navy-700/50 text-gray-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: region.color }} />
          <h3 className="text-white font-bold text-lg">{region.name}</h3>
        </div>

        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border mb-4 ${badge.class}`}>
          {badge.label}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: 'Fleet', value: region.fleet, icon: Truck, color: 'text-blue-400' },
            { label: 'Warehouse', value: region.warehouse, icon: Warehouse, color: 'text-purple-400' },
            { label: 'Lead Time', value: region.leadTime, icon: Clock, color: 'text-amber-400' },
          ].map(s => {
            const Icon = s.icon
            return (
              <div key={s.label} className="bg-navy-900/80 rounded-xl p-3 text-center">
                <Icon className={`w-4 h-4 ${s.color} mx-auto mb-1`} />
                <div className="text-white font-bold text-sm">{s.value}</div>
                <div className="text-gray-500 text-xs">{s.label}</div>
              </div>
            )
          })}
        </div>

        {/* Cities */}
        <div className="mb-4">
          <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Kota Utama</div>
          <div className="flex flex-wrap gap-1.5">
            {region.cities.map(city => (
              <span key={city} className="inline-flex items-center gap-1 bg-navy-900/60 border border-navy-700/40 text-gray-300 text-xs px-2.5 py-1 rounded-full">
                <MapPin className="w-2.5 h-2.5 text-brand-orange" />
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Province breakdown */}
        <div>
          <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Detail Provinsi</div>
          <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
            {region.provinces.map(prov => (
              <div key={prov.name} className="bg-navy-900/60 border border-navy-700/30 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-sm font-medium">{prov.name}</span>
                  <span className="text-gray-500 text-xs">{prov.leadTime}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Truck className="w-3 h-3 text-brand-orange" />{prov.fleet} unit</span>
                  <span className="flex items-center gap-1"><Warehouse className="w-3 h-3 text-brand-orange" />{prov.warehouse} hub</span>
                </div>
                <div className="text-gray-500 text-xs mt-1">{prov.service}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function CoveragePage() {
  const [activeRegion, setActiveRegion] = useState(null)

  const handleRegionClick = (id) => {
    setActiveRegion(prev => prev === id ? null : id)
  }

  const selectedRegion = coverageRegions.find(r => r.id === activeRegion)

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-navy-950" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-brand-orange/8 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-5">
              <Globe className="w-4 h-4" />
              Coverage Area
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Jangkauan <span className="text-brand-orange">Nasional</span> Indonesia
            </h1>
            <p className="text-gray-300 text-lg">
              Distribusi ke 28 provinsi, 180+ kota di seluruh Indonesia. Klik wilayah pada peta untuk melihat detail coverage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-8 bg-navy-900 border-y border-navy-800/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Provinsi Terjangkau', value: `${coverageStats.coveredProvinces}/${coverageStats.totalProvinces}`, color: 'text-brand-orange' },
              { label: 'Kota & Kabupaten', value: `${coverageStats.totalCities}+`, color: 'text-blue-400' },
              { label: 'On-Time Delivery', value: `${coverageStats.onTimeRate}%`, color: 'text-emerald-400' },
              { label: 'Pulau Utama', value: '6 Pulau', color: 'text-purple-400' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="text-center">
                  <div className={`text-2xl md:text-3xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-gray-400 text-sm mt-0.5">{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-12 md:py-16 bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Peta Coverage Interaktif</h2>
            <p className="text-gray-400 mt-1 text-sm">Klik pulau atau wilayah untuk melihat detail fleet, gudang, dan lead time pengiriman.</p>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Map */}
            <div className="lg:col-span-2">
              <FadeIn delay={0.1}>
                <div className="bg-navy-900/60 border border-navy-700/40 rounded-2xl p-4">
                  <IndonesiaMap activeRegion={activeRegion} onRegionClick={handleRegionClick} />
                </div>
              </FadeIn>

              {/* Region buttons */}
              <FadeIn delay={0.2} className="mt-4 flex flex-wrap gap-2">
                {coverageRegions.map(region => (
                  <button
                    key={region.id}
                    onClick={() => handleRegionClick(region.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                      activeRegion === region.id
                        ? 'border-brand-orange bg-brand-orange/10 text-brand-orange'
                        : 'border-navy-700/50 bg-navy-800/50 text-gray-400 hover:text-white hover:border-navy-600'
                    }`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: region.color }} />
                    {region.name}
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeRegion === region.id ? 'bg-brand-orange/20 text-brand-orange' : 'bg-navy-700 text-gray-500'}`}>
                      {region.fleet}
                    </span>
                  </button>
                ))}
              </FadeIn>
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-1">
              {selectedRegion ? (
                <RegionPanel region={selectedRegion} onClose={() => setActiveRegion(null)} />
              ) : (
                <div className="bg-navy-800/40 border border-navy-700/30 rounded-2xl p-6 text-center h-full flex flex-col items-center justify-center">
                  <Globe className="w-12 h-12 text-navy-600 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Klik wilayah pada peta atau tombol di bawah untuk melihat detail coverage area.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Region Cards Grid */}
      <section className="py-12 md:py-16 bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Coverage per Wilayah</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coverageRegions.map((region, i) => {
              const badge = levelBadge[region.level]
              return (
                <FadeIn key={region.id} delay={i * 0.07}>
                  <div
                    onClick={() => handleRegionClick(region.id)}
                    className={`bg-navy-800/60 border rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                      activeRegion === region.id ? 'border-brand-orange/40 bg-navy-800/80' : 'border-navy-700/40 hover:border-navy-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }} />
                        <h3 className="text-white font-bold">{region.name}</h3>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${badge.class}`}>{badge.label}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {[
                        { label: 'Fleet', value: region.fleet, icon: Truck },
                        { label: 'Hub', value: region.warehouse, icon: Warehouse },
                        { label: 'Waktu', value: region.leadTime.split('–')[0], icon: Clock },
                      ].map(s => {
                        const Icon = s.icon
                        return (
                          <div key={s.label} className="bg-navy-900/50 rounded-lg p-2 text-center">
                            <Icon className="w-3.5 h-3.5 text-brand-orange mx-auto mb-0.5" />
                            <div className="text-white text-xs font-bold">{s.value}</div>
                            <div className="text-gray-600 text-[10px]">{s.label}</div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {region.cities.slice(0, 4).map(city => (
                        <span key={city} className="text-gray-500 text-xs bg-navy-900/40 px-2 py-0.5 rounded">{city}</span>
                      ))}
                      {region.cities.length > 4 && <span className="text-gray-600 text-xs">+{region.cities.length - 4} lagi</span>}
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
