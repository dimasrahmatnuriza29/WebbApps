import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})
import {
  Truck, Package, FileText, Download, TrendingUp, Clock, CheckCircle2,
  AlertCircle, LogIn, Eye, EyeOff, Shield, BarChart3, Bell, ChevronRight,
  LogOut, MapPin, Navigation, Phone, User, Gauge, Coffee, Wifi, WifiOff,
  Milestone, ChevronDown, RefreshCw, X
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

// ── Mock Data ──────────────────────────────────────────────────────────────────
const mockShipments = [
  { id: 'SHP-2024-0892', origin: 'Jakarta', dest: 'Surabaya', status: 'active', date: '2024-06-12', type: 'Wingbox', eta: '2024-06-13', weight: '8 ton' },
  { id: 'SHP-2024-0891', origin: 'Jakarta', dest: 'Semarang', status: 'active', date: '2024-06-12', type: 'CDD', eta: '2024-06-13', weight: '3 ton' },
  { id: 'SHP-2024-0888', origin: 'Surabaya', dest: 'Bali', status: 'delivered', date: '2024-06-10', type: 'Fuso', eta: '2024-06-11', weight: '5 ton' },
  { id: 'SHP-2024-0885', origin: 'Jakarta', dest: 'Bandung', status: 'delivered', date: '2024-06-09', type: 'CDE', eta: '2024-06-09', weight: '1.5 ton' },
  { id: 'SHP-2024-0880', origin: 'Medan', dest: 'Pekanbaru', status: 'delivered', date: '2024-06-07', type: 'CDD', eta: '2024-06-08', weight: '4 ton' },
  { id: 'SHP-2024-0875', origin: 'Jakarta', dest: 'Surabaya', status: 'delivered', date: '2024-06-05', type: 'Wingbox', eta: '2024-06-06', weight: '12 ton' },
]

const mockInvoices = [
  { id: 'INV-2024-0156', period: 'Mei 2024', amount: 'Rp 245.000.000', status: 'paid', dueDate: '2024-06-15' },
  { id: 'INV-2024-0143', period: 'April 2024', amount: 'Rp 198.500.000', status: 'paid', dueDate: '2024-05-15' },
  { id: 'INV-2024-0131', period: 'Maret 2024', amount: 'Rp 312.000.000', status: 'paid', dueDate: '2024-04-15' },
  { id: 'INV-2024-0168', period: 'Juni 2024', amount: 'Rp 280.000.000', status: 'pending', dueDate: '2024-07-15' },
]

// ── Live Tracking Data ────────────────────────────────────────────────────────
const trackingData = {
  'SHP-2024-0892': {
    driver: { name: 'Budi Santoso', phone: '+62 812-3456-7890', initials: 'BS' },
    vehicle: { plate: 'B 9234 XYZ', type: 'Wingbox 8 Ton' },
    origin: 'Jakarta', destination: 'Surabaya',
    statusType: 'driving',
    currentCity: 'Nganjuk', currentProvince: 'Jawa Timur',
    speed: '82 km/h', lastUpdate: '2 mnt lalu',
    progress: 78,
    distance: { covered: '561', remaining: '158', total: '719' },
    eta: 'Hari ini, 21:30 WIB',
    currentPos: [-7.6047, 111.9010],
    destPos: [-7.2575, 112.7521],
    routeDone: [
      [-6.2088, 106.8456], [-6.2615, 107.1500], [-6.4044, 107.4613],
      [-6.5500, 107.7000], [-6.6000, 107.9500], [-6.6700, 108.2000],
      [-6.7320, 108.5523], [-6.8500, 109.0000], [-6.8694, 109.1257],
      [-6.8886, 109.6753], [-6.9667, 110.4167], [-7.2000, 110.6000],
      [-7.5562, 110.8317], [-7.5400, 111.1500], [-7.4097, 111.4495],
      [-7.5800, 111.7000], [-7.6047, 111.9010],
    ],
    routeRemain: [[-7.6047, 111.9010], [-7.5990, 112.0965], [-7.4500, 112.3500], [-7.2575, 112.7521]],
    checkpoints: [
      { name: 'Jakarta (Muat)', time: '06:30', status: 'done', note: 'Berangkat' },
      { name: 'Cikampek, Jabar', time: '08:15', status: 'done', note: 'Melintas' },
      { name: 'Cirebon, Jabar', time: '10:42', status: 'done', note: 'Rest 30 mnt' },
      { name: 'Semarang, Jateng', time: '14:20', status: 'done', note: 'Melintas' },
      { name: 'Ngawi, Jatim', time: '17:05', status: 'done', note: 'Melintas' },
      { name: 'Nganjuk, Jatim', time: 'Sekarang', status: 'current', note: 'Posisi saat ini' },
      { name: 'Surabaya (Bongkar)', time: 'Est. 21:30', status: 'pending', note: 'Tujuan akhir' },
    ],
  },
  'SHP-2024-0891': {
    driver: { name: 'Hendra Wijaya', phone: '+62 813-5678-9012', initials: 'HW' },
    vehicle: { plate: 'B 7712 ABC', type: 'CDD 3 Ton' },
    origin: 'Jakarta', destination: 'Semarang',
    statusType: 'resting',
    currentCity: 'Cirebon', currentProvince: 'Jawa Barat',
    speed: '0 km/h', lastUpdate: '3 mnt lalu',
    progress: 45,
    distance: { covered: '246', remaining: '301', total: '547' },
    eta: 'Hari ini, 18:00 WIB',
    currentPos: [-6.7320, 108.5523],
    destPos: [-6.9667, 110.4167],
    routeDone: [
      [-6.2088, 106.8456], [-6.1800, 106.9500], [-6.2349, 107.0500],
      [-6.3220, 107.3381], [-6.4044, 107.4613], [-6.3200, 107.6500],
      [-6.2700, 107.9500], [-6.2900, 108.2500], [-6.4500, 108.4500],
      [-6.7320, 108.5523],
    ],
    routeRemain: [[-6.7320, 108.5523], [-6.8732, 109.0440], [-6.8694, 109.1257], [-6.8886, 109.6753], [-6.9228, 110.2024], [-6.9667, 110.4167]],
    checkpoints: [
      { name: 'Jakarta (Muat)', time: '07:00', status: 'done', note: 'Berangkat' },
      { name: 'Cikampek, Jabar', time: '09:10', status: 'done', note: 'Melintas' },
      { name: 'Cirebon, Jabar', time: '12:30', status: 'current', note: 'Istirahat driver' },
      { name: 'Pekalongan, Jateng', time: 'Est. 15:15', status: 'pending', note: '' },
      { name: 'Semarang (Bongkar)', time: 'Est. 18:00', status: 'pending', note: 'Tujuan akhir' },
    ],
  },
  'SHP-2024-0890': {
    driver: { name: 'Andi Pratama', phone: '+62 821-9876-5432', initials: 'AP' },
    vehicle: { plate: 'L 4521 DEF', type: 'Tronton 20 Ton' },
    origin: 'Jakarta', destination: 'Surabaya',
    statusType: 'unloading',
    currentCity: 'Surabaya', currentProvince: 'Jawa Timur',
    speed: '0 km/h', lastUpdate: '15 mnt lalu',
    progress: 100,
    distance: { covered: '719', remaining: '0', total: '719' },
    eta: 'Selesai 19:00 WIB',
    currentPos: [-7.2650, 112.7420],
    destPos: [-7.2650, 112.7420],
    routeDone: [
      [-6.2088, 106.8456], [-6.2615, 107.1500], [-6.4044, 107.4613],
      [-6.5500, 107.7000], [-6.6700, 108.2000], [-6.7320, 108.5523],
      [-6.8694, 109.1257], [-6.8886, 109.6753], [-6.9667, 110.4167],
      [-7.2000, 110.6000], [-7.5562, 110.8317], [-7.4097, 111.4495],
      [-7.5800, 111.7000], [-7.5990, 112.0965], [-7.4500, 112.3500], [-7.2650, 112.7420],
    ],
    routeRemain: [],
    checkpoints: [
      { name: 'Jakarta (Muat)', time: '05:00', status: 'done', note: 'Berangkat' },
      { name: 'Cirebon, Jabar', time: '09:30', status: 'done', note: 'Melintas' },
      { name: 'Semarang, Jateng', time: '13:00', status: 'done', note: 'Melintas' },
      { name: 'Nganjuk, Jatim', time: '16:45', status: 'done', note: 'Melintas' },
      { name: 'Surabaya (Bongkar)', time: 'Sekarang', status: 'current', note: 'Proses Bongkar Muatan' },
    ],
  },
  'SHP-2024-0889': {
    driver: { name: 'Rudi Hartono', phone: '+62 815-2345-6789', initials: 'RH' },
    vehicle: { plate: 'B 6677 GHI', type: 'CDD Box 5 Ton' },
    origin: 'Jakarta', destination: 'Semarang',
    statusType: 'standby',
    currentCity: 'Jakarta', currentProvince: 'DKI Jakarta',
    speed: '0 km/h', lastUpdate: '5 mnt lalu',
    progress: 0,
    distance: { covered: '0', remaining: '547', total: '547' },
    eta: 'Besok, 08:00 WIB',
    currentPos: [-6.2200, 106.8756],
    destPos: [-6.9667, 110.4167],
    routeDone: [[-6.2200, 106.8756]],
    routeRemain: [[-6.2200, 106.8756], [-6.2088, 106.8456], [-6.2349, 107.0500], [-6.3220, 107.3381], [-6.4044, 107.4613], [-6.3200, 107.6500], [-6.2700, 107.9500], [-6.2900, 108.2500], [-6.4500, 108.4500], [-6.7320, 108.5523], [-6.8732, 109.0440], [-6.8694, 109.1257], [-6.8886, 109.6753], [-6.9228, 110.2024], [-6.9667, 110.4167]],
    checkpoints: [
      { name: 'Jakarta (Pool)', time: 'Sekarang', status: 'current', note: 'Stand By / Menunggu Muat' },
      { name: 'Cikampek, Jabar', time: 'Est. Besok 07:00', status: 'pending', note: '' },
      { name: 'Cirebon, Jabar', time: 'Est. Besok 10:00', status: 'pending', note: '' },
      { name: 'Pekalongan, Jateng', time: 'Est. Besok 13:00', status: 'pending', note: '' },
      { name: 'Semarang (Bongkar)', time: 'Est. Besok 16:00', status: 'pending', note: 'Tujuan akhir' },
    ],
  },
  'SHP-2024-0888': {
    driver: { name: 'Deni Kurniawan', phone: '+62 816-3456-7890', initials: 'DK' },
    vehicle: { plate: 'B 8899 JKL', type: 'Fuso 7 Ton' },
    origin: 'Jakarta', destination: 'Bandung',
    statusType: 'loading',
    currentCity: 'Jakarta', currentProvince: 'DKI Jakarta',
    speed: '0 km/h', lastUpdate: '8 mnt lalu',
    progress: 0,
    distance: { covered: '0', remaining: '150', total: '150' },
    eta: 'Hari ini, 20:00 WIB',
    currentPos: [-6.1800, 106.8100],
    destPos: [-6.9147, 107.6098],
    routeDone: [[-6.1800, 106.8100]],
    routeRemain: [[-6.1800, 106.8100], [-6.2088, 106.8456], [-6.3700, 107.0000], [-6.5500, 107.2000], [-6.7500, 107.3500], [-6.9147, 107.6098]],
    checkpoints: [
      { name: 'Jakarta (Gudang)', time: 'Sekarang', status: 'current', note: 'Proses Muat Barang' },
      { name: 'Tol Ciawi', time: 'Est. 14:30', status: 'pending', note: '' },
      { name: 'Puncak Pass', time: 'Est. 15:30', status: 'pending', note: '' },
      { name: 'Bandung (Bongkar)', time: 'Est. 20:00', status: 'pending', note: 'Tujuan akhir' },
    ],
  },
}

const statusConfig = {
  standby:   { color: '#EF4444', textCls: 'text-red-400',    bgCls: 'bg-red-500/20',    borderCls: 'border-red-500/30',    label: 'Stand By',         emoji: '⏸', phase: 'origin'  },
  loading:   { color: '#EF4444', textCls: 'text-red-400',    bgCls: 'bg-red-500/20',    borderCls: 'border-red-500/30',    label: 'Muat Barang',      emoji: '📦', phase: 'origin'  },
  driving:   { color: '#F59E0B', textCls: 'text-amber-400',  bgCls: 'bg-amber-500/20',  borderCls: 'border-amber-500/30',  label: 'Dalam Perjalanan', emoji: '🚛', phase: 'transit' },
  resting:   { color: '#F59E0B', textCls: 'text-amber-400',  bgCls: 'bg-amber-500/20',  borderCls: 'border-amber-500/30',  label: 'Istirahat',        emoji: '☕', phase: 'transit' },
  arrived:   { color: '#22C55E', textCls: 'text-green-400',  bgCls: 'bg-green-500/20',  borderCls: 'border-green-500/30',  label: 'Tiba di Tujuan',   emoji: '📍', phase: 'dest'    },
  unloading: { color: '#22C55E', textCls: 'text-green-400',  bgCls: 'bg-green-500/20',  borderCls: 'border-green-500/30',  label: 'Bongkar Muatan',   emoji: '🏭', phase: 'dest'    },
  delivered: { color: '#22C55E', textCls: 'text-green-400',  bgCls: 'bg-green-500/20',  borderCls: 'border-green-500/30',  label: 'Selesai',          emoji: '✅', phase: 'dest'    },
}

// ── Unit Detail Modal ──────────────────────────────────────────────────────────
function UnitModal({ unitId, onClose }) {
  if (!unitId) return null
  const t = trackingData[unitId]
  const cfg = statusConfig[t.statusType]
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-navy-900 border border-navy-700/60 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto z-10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-navy-700/40 sticky top-0 bg-navy-900 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-base border-2 border-brand-orange/40 bg-brand-orange/15 text-brand-orange flex-shrink-0">
              {t.driver.initials}
            </div>
            <div>
              <div className="text-white font-bold">{t.driver.name}</div>
              <div className="text-gray-400 text-xs">{t.vehicle.plate} · {t.vehicle.type}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${cfg.bgCls} ${cfg.textCls} ${cfg.borderCls}`}>
              {cfg.emoji} {cfg.label}
            </span>
            <button onClick={onClose} className="w-8 h-8 rounded-lg border border-navy-700/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        {/* Body */}
        <div className="grid md:grid-cols-2 gap-4 p-5">
          {/* Dedicated Map */}
          <div className="rounded-xl overflow-hidden border border-navy-700/30" style={{ height: 300 }}>
            <MapContainer key={unitId} center={t.currentPos} zoom={9} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
              <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" attribution="© CARTO" />
              {t.routeDone.length > 1 && <Polyline positions={t.routeDone} color={cfg.color} weight={4} opacity={0.9} />}
              {t.routeRemain.length > 1 && <Polyline positions={t.routeRemain} color={cfg.color} weight={2.5} opacity={0.4} dashArray="8,6" />}
              <Marker position={t.currentPos} icon={L.divIcon({
                html: `<div style="background:${cfg.color};border:3px solid white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 0 14px ${cfg.color}99">${cfg.emoji}</div>`,
                className: '', iconSize: [40, 40], iconAnchor: [20, 20],
              })}>
                <Popup><b>{t.currentCity}, {t.currentProvince}</b><br />{cfg.label}</Popup>
              </Marker>
              {t.routeRemain.length > 1 && (
                <CircleMarker center={t.destPos} radius={8} color={cfg.color} fillColor={cfg.color} fillOpacity={0.35}>
                  <Popup>Tujuan: {t.destination}</Popup>
                </CircleMarker>
              )}
            </MapContainer>
          </div>
          {/* Details */}
          <div className="space-y-3">
            <div className="bg-navy-800/60 border border-navy-700/30 rounded-xl p-3">
              <div className="text-gray-500 text-[10px] font-medium uppercase mb-2">Rute Pengiriman</div>
              <div className="flex items-center gap-2">
                <div className="text-center"><div className="text-white text-xs font-bold">{t.origin}</div><div className="text-gray-500 text-[10px]">Asal</div></div>
                <div className="flex-1 flex items-center gap-1">
                  <div className="flex-1 h-0.5 bg-navy-600" />
                  <div className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
                  <div className="flex-1 h-0.5 bg-navy-600" />
                </div>
                <div className="text-center"><div className="text-white text-xs font-bold">{t.destination}</div><div className="text-gray-500 text-[10px]">Tujuan</div></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-navy-800/60 border border-navy-700/30 rounded-xl p-3">
                <div className="text-gray-500 text-[10px] mb-1">Lokasi Kini</div>
                <div className={`font-bold text-sm ${cfg.textCls}`}>{t.currentCity}</div>
                <div className="text-gray-500 text-[10px]">{t.currentProvince}</div>
              </div>
              <div className="bg-navy-800/60 border border-navy-700/30 rounded-xl p-3">
                <div className="text-gray-500 text-[10px] mb-1">Kecepatan</div>
                <div className="text-white font-bold text-sm">{t.speed}</div>
                <div className="text-gray-500 text-[10px]">{t.lastUpdate}</div>
              </div>
            </div>
            <div className="bg-navy-800/60 border border-navy-700/30 rounded-xl p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-[10px]">Progress Pengiriman</span>
                <span className={`font-black text-base ${cfg.textCls}`}>{t.progress}%</span>
              </div>
              <div className="h-2 bg-navy-700 rounded-full overflow-hidden mb-2">
                <div className="h-full rounded-full" style={{ width: `${t.progress}%`, background: cfg.color }} />
              </div>
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>{t.distance.covered} km ditempuh</span>
                <span>{t.distance.remaining} km tersisa</span>
              </div>
            </div>
            <div className="bg-navy-800/60 border border-navy-700/30 rounded-xl p-3 flex items-center justify-between">
              <div className="text-gray-500 text-[10px]">ETA / Status</div>
              <div className="text-white text-xs font-semibold">{t.eta}</div>
            </div>
            <a href={`tel:${t.driver.phone}`} className="flex items-center justify-between bg-navy-800/60 border border-navy-700/30 rounded-xl p-3 hover:border-brand-orange/30 transition-colors">
              <span className="text-gray-500 text-[10px]">Hubungi Driver</span>
              <span className="text-brand-orange text-xs font-medium flex items-center gap-1"><Phone className="w-3 h-3" />{t.driver.phone}</span>
            </a>
          </div>
        </div>
        {/* Checkpoint Timeline */}
        <div className="px-5 pb-5">
          <div className="bg-navy-800/60 border border-navy-700/30 rounded-xl p-4">
            <div className="text-gray-400 text-xs font-semibold mb-3 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5" />Riwayat Perjalanan & Checkpoint
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              {t.checkpoints.map((cp, ci) => (
                <div key={ci} className="flex gap-2 items-start mb-2">
                  <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 mt-0.5 ${
                    cp.status === 'done'    ? 'bg-green-400 border-green-400' :
                    cp.status === 'current' ? 'animate-pulse' : 'bg-navy-700 border-navy-600'
                  }`} style={cp.status === 'current' ? { background: cfg.color, borderColor: cfg.color } : {}} />
                  <div>
                    <div className={`text-xs font-medium ${
                      cp.status === 'current' ? cfg.textCls : cp.status === 'done' ? 'text-gray-300' : 'text-gray-600'
                    }`}>{cp.name}</div>
                    <div className="text-[10px] text-gray-600">{cp.time}{cp.note ? ` · ${cp.note}` : ''}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const monthlyData = [
  { month: 'Jan', shipments: 45, onTime: 44 },
  { month: 'Feb', shipments: 52, onTime: 52 },
  { month: 'Mar', shipments: 68, onTime: 67 },
  { month: 'Apr', shipments: 61, onTime: 60 },
  { month: 'May', shipments: 74, onTime: 74 },
  { month: 'Jun', shipments: 58, onTime: 57 },
]

// ── Login Form ────────────────────────────────────────────────────────────────
function LoginForm({ onLogin }) {
  const [creds, setCreds] = useState({ id: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (!creds.id || !creds.password) return
    setLoading(true)
    setError('')
    setTimeout(() => {
      if (creds.id === 'demo' && creds.password === 'demo123') {
        onLogin()
      } else {
        setError('Client ID atau Password salah. (Gunakan: demo / demo123)')
        setLoading(false)
      }
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4 pt-16">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-orange/8 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-orange to-brand-orange-dark flex items-center justify-center mx-auto mb-4 shadow-orange-glow">
            <Truck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white">Client Portal</h1>
          <p className="text-gray-400 text-sm mt-1">PT Armada Logistik Nusantara</p>
        </div>

        <div className="bg-navy-800/80 border border-navy-700/50 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-5 h-5 text-brand-orange" />
            <span className="text-white font-semibold">Secure Login</span>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/25 rounded-xl p-3 mb-4">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs font-medium mb-1 block">Client ID</label>
              <input
                className="input-field text-sm"
                placeholder="Masukkan Client ID Anda"
                value={creds.id}
                onChange={e => setCreds(p => ({ ...p, id: e.target.value }))}
                autoComplete="username"
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs font-medium mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="input-field text-sm pr-10"
                  placeholder="Password"
                  value={creds.password}
                  onChange={e => setCreds(p => ({ ...p, password: e.target.value }))}
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
              {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Masuk...</> : <><LogIn className="w-4 h-4" /> Masuk ke Portal</>}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-navy-700/40">
            <p className="text-gray-500 text-xs text-center">Demo: ID <span className="text-white font-mono">demo</span> / Pass <span className="text-white font-mono">demo123</span></p>
            <p className="text-gray-600 text-xs text-center mt-2">Belum memiliki akun? <a href="mailto:it@aln-logistics.co.id" className="text-brand-orange hover:underline">Hubungi tim IT kami</a></p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedUnit, setSelectedUnit] = useState(null)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'shipments', label: 'Shipments', icon: Truck },
    { id: 'invoices', label: 'Invoice', icon: FileText },
  ]

  const activeShipments = mockShipments.filter(s => s.status === 'active')
  const deliveredShipments = mockShipments.filter(s => s.status === 'delivered')

  return (
    <div className="min-h-screen bg-navy-950 pt-16 md:pt-20">
      {/* Portal Header */}
      <div className="bg-navy-900/90 border-b border-navy-700/40 sticky top-16 md:top-20 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand-orange/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-brand-orange" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">PT Demo Client Indonesia</div>
                <div className="text-gray-500 text-xs">Client ID: demo • Last login: just now</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-8 h-8 rounded-lg border border-navy-700/50 flex items-center justify-center text-gray-400 hover:text-white hover:border-navy-600 relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-orange rounded-full text-[8px] text-white flex items-center justify-center font-bold">2</span>
              </button>
              <button onClick={onLogout} className="flex items-center gap-1.5 text-gray-400 hover:text-brand-orange text-xs font-medium transition-colors">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-3">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    activeTab === tab.id ? 'bg-brand-orange/15 text-brand-orange border border-brand-orange/25' : 'text-gray-400 hover:text-white'
                  }`}>
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Active Shipments', value: activeShipments.length, icon: Truck, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                  { label: 'Delivered (Jun)', value: deliveredShipments.length, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                  { label: 'On-Time Rate', value: '99.2%', icon: TrendingUp, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
                  { label: 'Pending Invoice', value: '1', icon: FileText, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                ].map((kpi, i) => {
                  const Icon = kpi.icon
                  return (
                    <div key={i} className="bg-navy-800/60 border border-navy-700/40 rounded-2xl p-4 hover:border-brand-orange/20 transition-all duration-300">
                      <div className={`w-9 h-9 rounded-xl ${kpi.bg} flex items-center justify-center mb-3`}>
                        <Icon className={`w-4.5 h-4.5 ${kpi.color}`} />
                      </div>
                      <div className={`text-2xl font-black ${kpi.color}`}>{kpi.value}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{kpi.label}</div>
                    </div>
                  )
                })}
              </div>

              {/* Charts Row */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="bg-navy-800/60 border border-navy-700/40 rounded-2xl p-5">
                  <h3 className="text-white font-bold mb-4 text-sm">Monthly Shipments</h3>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={monthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1A3060" />
                      <XAxis dataKey="month" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                      <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#0F2044', border: '1px solid #1A3060', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                      <Bar dataKey="shipments" fill="#F97316" radius={[4, 4, 0, 0]} name="Total" />
                      <Bar dataKey="onTime" fill="#10B981" radius={[4, 4, 0, 0]} name="On-Time" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Fleet Status Summary */}
                {(() => {
                  const counts = Object.values(trackingData).reduce((acc, t) => {
                    const p = statusConfig[t.statusType]?.phase || 'transit'
                    acc[p] = (acc[p] || 0) + 1
                    return acc
                  }, { origin: 0, transit: 0, dest: 0 })
                  return (
                    <div className="bg-navy-800/60 border border-navy-700/40 rounded-2xl p-5">
                      <h3 className="text-white font-bold mb-4 text-sm">Status Armada Operasional</h3>
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0" />
                            <span className="text-red-400 text-sm font-medium">Di Lokasi Keberangkatan</span>
                          </div>
                          <span className="text-red-400 font-black text-xl">{counts.origin}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-amber-500 flex-shrink-0 animate-pulse" />
                            <span className="text-amber-400 text-sm font-medium">Sedang Dalam Perjalanan</span>
                          </div>
                          <span className="text-amber-400 font-black text-xl">{counts.transit}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
                            <span className="text-green-400 text-sm font-medium">Tiba / Bongkar Muatan</span>
                          </div>
                          <span className="text-green-400 font-black text-xl">{counts.dest}</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-navy-700/30 flex items-center justify-between">
                        <span className="text-gray-500 text-xs">Total Unit Aktif</span>
                        <span className="text-white font-bold">{Object.keys(trackingData).length} Unit</span>
                      </div>
                    </div>
                  )
                })()}
              </div>

              {/* Full-width Fleet Map + Driver List */}
              <div className="bg-navy-800/60 border border-navy-700/40 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-white font-bold text-sm">Live Fleet Map</h3>
                    <p className="text-gray-500 text-xs mt-0.5">Klik marker atau nama driver untuk lihat detail unit</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    GPS Live
                  </div>
                </div>
                {/* Legend */}
                <div className="flex flex-wrap gap-4 mb-3">
                  {[
                    { color: 'bg-red-500', label: 'Di keberangkatan (Merah)' },
                    { color: 'bg-amber-500', label: 'Dalam perjalanan (Kuning)' },
                    { color: 'bg-green-500', label: 'Tiba / Bongkar (Hijau)' },
                  ].map(l => (
                    <div key={l.label} className="flex items-center gap-1.5 text-xs text-gray-400">
                      <span className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                      {l.label}
                    </div>
                  ))}
                </div>
                {/* Map */}
                <div className="rounded-xl overflow-hidden border border-navy-700/30" style={{ height: 340, isolation: 'isolate', position: 'relative', zIndex: 0 }}>
                  <MapContainer center={[-7.0, 110.0]} zoom={7} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
                    <TileLayer
                      url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
                    />
                    {Object.entries(trackingData).map(([id, t]) => {
                      const cfg = statusConfig[t.statusType]
                      const markerIcon = L.divIcon({
                        html: `<div style="background:${cfg.color};border:2px solid white;border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-size:15px;box-shadow:0 2px 8px ${cfg.color}88;cursor:pointer">${cfg.emoji}</div>`,
                        className: '', iconSize: [34, 34], iconAnchor: [17, 17],
                      })
                      return (
                        <React.Fragment key={id}>
                          {t.routeDone.length > 1 && <Polyline positions={t.routeDone} color={cfg.color} weight={3} opacity={0.8} />}
                          {t.routeRemain.length > 1 && <Polyline positions={t.routeRemain} color={cfg.color} weight={2} opacity={0.3} dashArray="6,6" />}
                          <Marker position={t.currentPos} icon={markerIcon} eventHandlers={{ click: () => setSelectedUnit(id) }}>
                            <Popup>
                              <div style={{ minWidth: 150 }}>
                                <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{t.driver.name}</div>
                                <div style={{ fontSize: '11px', color: '#888' }}>{id}</div>
                                <div>📍 {t.currentCity}, {t.currentProvince}</div>
                                <div style={{ marginTop: 4, color: cfg.color, fontWeight: 'bold' }}>{cfg.emoji} {cfg.label}</div>
                              </div>
                            </Popup>
                          </Marker>
                          {t.routeRemain.length > 1 && (
                            <CircleMarker center={t.destPos} radius={5} color={cfg.color} fillColor={cfg.color} fillOpacity={0.3} />
                          )}
                        </React.Fragment>
                      )
                    })}
                  </MapContainer>
                </div>
                {/* Driver List */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
                  {Object.entries(trackingData).map(([id, t]) => {
                    const cfg = statusConfig[t.statusType]
                    return (
                      <button
                        key={id}
                        onClick={() => setSelectedUnit(id)}
                        className="text-left p-3 bg-navy-900/60 border border-navy-700/30 rounded-xl hover:border-brand-orange/30 hover:bg-navy-800/60 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
                          <span className="text-white text-xs font-mono font-bold">{id.slice(-4)}</span>
                          <span className={`text-[10px] font-semibold ml-auto ${cfg.textCls}`}>{cfg.label}</span>
                        </div>
                        <div className="text-gray-300 text-xs font-medium group-hover:text-white transition-colors">{t.driver.name}</div>
                        <div className="text-gray-600 text-[10px]">{t.vehicle.type}</div>
                        <div className="text-gray-500 text-[10px] mt-1">📍 {t.currentCity} → {t.destination}</div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* SHIPMENTS TAB */}
          {activeTab === 'shipments' && (
            <motion.div key="shipments" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-bold text-white mb-5">Shipment History</h2>
              <div className="bg-navy-800/60 border border-navy-700/40 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-navy-700/50 bg-navy-900/50">
                        {['Shipment ID', 'Route', 'Type', 'Weight', 'Date', 'ETA', 'Status', 'POD'].map(h => (
                          <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockShipments.map(s => (
                        <tr key={s.id} className="border-b border-navy-700/30 hover:bg-navy-800/40 transition-colors">
                          <td className="px-4 py-3 text-white font-mono text-xs">{s.id}</td>
                          <td className="px-4 py-3 text-gray-300 text-xs whitespace-nowrap">{s.origin} → {s.dest}</td>
                          <td className="px-4 py-3 text-gray-400 text-xs">{s.type}</td>
                          <td className="px-4 py-3 text-gray-400 text-xs">{s.weight}</td>
                          <td className="px-4 py-3 text-gray-400 text-xs">{s.date}</td>
                          <td className="px-4 py-3 text-gray-400 text-xs">{s.eta}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                              s.status === 'active'
                                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            }`}>
                              {s.status === 'active' ? <Clock className="w-2.5 h-2.5" /> : <CheckCircle2 className="w-2.5 h-2.5" />}
                              {s.status === 'active' ? 'In Transit' : 'Delivered'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {s.status === 'delivered' && (
                              <button className="flex items-center gap-1 text-brand-orange hover:underline text-xs font-medium">
                                <Download className="w-3.5 h-3.5" /> POD
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* INVOICES TAB */}
          {activeTab === 'invoices' && (
            <motion.div key="invoices" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-bold text-white mb-5">Invoice & Payment</h2>
              <div className="space-y-3">
                {mockInvoices.map(inv => (
                  <div key={inv.id} className="bg-navy-800/60 border border-navy-700/40 rounded-2xl p-5 flex items-center justify-between hover:border-brand-orange/20 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${inv.status === 'paid' ? 'bg-emerald-500/15' : 'bg-amber-500/15'}`}>
                        <FileText className={`w-5 h-5 ${inv.status === 'paid' ? 'text-emerald-400' : 'text-amber-400'}`} />
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">{inv.id}</div>
                        <div className="text-gray-400 text-xs">{inv.period} • Due: {inv.dueDate}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-white font-bold">{inv.amount}</div>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${inv.status === 'paid' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'}`}>
                          {inv.status === 'paid' ? 'PAID' : 'PENDING'}
                        </span>
                      </div>
                      <button className="flex items-center gap-1.5 text-brand-orange hover:text-brand-orange-light text-sm font-medium transition-colors">
                        <Download className="w-4 h-4" />
                        PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-navy-800/40 border border-navy-700/30 rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-400 text-sm">Download Laporan Bulanan</div>
                    <div className="text-white font-semibold">Monthly Shipment Report – Juni 2024</div>
                  </div>
                  <button className="flex items-center gap-2 btn-secondary text-sm">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <UnitModal unitId={selectedUnit} onClose={() => setSelectedUnit(null)} />
    </div>
  )
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function ClientPortalPage() {
  return <Dashboard onLogout={() => {}} />
}
