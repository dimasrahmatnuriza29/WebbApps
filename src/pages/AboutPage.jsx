import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Award, Shield, Users, FileText, Download, CheckCircle2,
  Star, Building2, ArrowRight, Clock, Target, Heart
} from 'lucide-react'

function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: direction === 'up' ? 24 : 0, x: direction === 'left' ? 24 : direction === 'right' ? -24 : 0 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const team = [
  {
    name: 'Ir. Hendra Wijaya, MBA',
    role: 'President Director',
    exp: '25 tahun di industri logistik',
    avatar: 'HW',
    color: 'from-blue-500 to-blue-700',
    bio: 'Berpengalaman dalam manajemen operasional logistik skala nasional dan internasional.',
  },
  {
    name: 'Drs. Bambang Santoso',
    role: 'Commissioner',
    exp: '30 tahun di bisnis dan keuangan',
    avatar: 'BS',
    color: 'from-purple-500 to-purple-700',
    bio: 'Ahli tata kelola perusahaan dan pengembangan bisnis strategis.',
  },
  {
    name: 'Agus Prasetyo, S.T.',
    role: 'Head of Operations',
    exp: '18 tahun di operasional logistik',
    avatar: 'AP',
    color: 'from-orange-500 to-orange-700',
    bio: 'Memimpin armada 162 unit dan 18 gudang dengan standar operasional tertinggi.',
  },
  {
    name: 'Dewi Rahayu, M.M.',
    role: 'Head of Commercial',
    exp: '15 tahun di sales & marketing B2B',
    avatar: 'DR',
    color: 'from-emerald-500 to-emerald-700',
    bio: 'Membangun portofolio 480+ klien korporat dari berbagai sektor industri.',
  },
  {
    name: 'Andi Firmansyah, S.H.',
    role: 'Legal & Compliance',
    exp: '12 tahun di hukum korporasi',
    avatar: 'AF',
    color: 'from-teal-500 to-teal-700',
    bio: 'Memastikan seluruh operasional sesuai regulasi dan standar hukum yang berlaku.',
  },
  {
    name: 'Rina Anggraini, S.T.',
    role: 'Head of Technology',
    exp: '10 tahun di IT & logistics tech',
    avatar: 'RA',
    color: 'from-amber-500 to-amber-700',
    bio: 'Mengembangkan platform digital dan sistem WMS terintegrasi untuk klien.',
  },
]

const certifications = [
  { name: 'NIB (Nomor Induk Berusaha)', number: '1234567890123', type: 'Pemerintah RI', downloadable: false },
  { name: 'NPWP Perusahaan', number: '12.345.678.9-012.000', type: 'Perpajakan', downloadable: false },
  { name: 'ISO 9001:2015', number: 'ID-QMS-2021-00456', type: 'Quality Management', downloadable: true },
  { name: 'K3 (Keselamatan & Kesehatan Kerja)', number: 'K3-2022-JKT-0891', type: 'Ketenagakerjaan', downloadable: true },
  { name: 'SIUP (Surat Izin Usaha Perdagangan)', number: 'SIUP-2013-JKT-1234', type: 'Perdagangan', downloadable: false },
  { name: 'Sertifikat Perusahaan Angkutan Barang', number: 'SPAB-2020-DKI-567', type: 'Kemenhub RI', downloadable: true },
]

const values = [
  { icon: Heart, title: 'Integrity', desc: 'Transparansi dan kejujuran dalam setiap layanan dan transaksi.', color: 'text-red-400' },
  { icon: Star, title: 'Excellence', desc: 'Standar tertinggi dalam kualitas layanan dan kepuasan klien.', color: 'text-amber-400' },
  { icon: Target, title: 'Innovation', desc: 'Terus berinovasi dalam teknologi dan solusi logistik modern.', color: 'text-blue-400' },
  { icon: Users, title: 'Partnership', desc: 'Membangun kemitraan jangka panjang berbasis kepercayaan dan nilai bersama.', color: 'text-emerald-400' },
]

export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20">
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/97 via-navy-900/92 to-navy-900/70" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-5">
              <Building2 className="w-4 h-4" />
              About Us
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
              PT Armada Logistik{' '}
              <span className="text-brand-orange">Nusantara</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl">
              Perusahaan logistik B2B terpercaya dengan pengalaman 11+ tahun. Melayani 480+ klien korporat di seluruh Indonesia dengan armada modern dan jaringan distribusi komprehensif.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── COMPANY PROFILE ──────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-5">
                Company Story
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                Dari Jakarta, Melayani Seluruh Indonesia
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed text-sm md:text-base">
                <p>
                  PT Armada Logistik Nusantara (ALN) didirikan pada tahun 2013 dengan visi sederhana namun ambisius: menjadi mitra distribusi yang paling terpercaya bagi perusahaan-perusahaan Indonesia.
                </p>
                <p>
                  Berawal dari 12 unit armada dan satu gudang di Cengkareng, Jakarta, ALN berkembang pesat melalui kombinasi investasi infrastruktur yang konsisten dan budaya pelayanan yang berorientasi pada kepuasan klien.
                </p>
                <p>
                  Hari ini, ALN mengoperasikan lebih dari 162 unit armada modern, 18 gudang logistik strategis, dan melayani 480+ klien aktif dari sektor FMCG, retail, manufaktur, farmasi, dan e-commerce.
                </p>
                <p>
                  Dengan on-time delivery rate 99.2% dan lebih dari 2,35 juta pengiriman sukses, ALN telah membuktikan diri sebagai pilihan utama logistik B2B di Indonesia.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { value: '2013', label: 'Tahun Berdiri' },
                  { value: '162', label: 'Unit Armada' },
                  { value: '480+', label: 'Klien Aktif' },
                ].map((s) => (
                  <div key={s.label} className="bg-navy-800/60 border border-navy-700/40 rounded-xl p-4 text-center">
                    <div className="text-2xl font-black text-brand-orange">{s.value}</div>
                    <div className="text-gray-400 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80"
                  alt="ALN Warehouse Operations"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-navy-900/90 backdrop-blur-sm border border-navy-700/50 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-orange/20 flex items-center justify-center">
                      <Award className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">ISO 9001:2015 Certified</div>
                      <div className="text-gray-400 text-xs">Quality Management System</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CORPORATE VALUES ──────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-4">
              Corporate Values
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Nilai-Nilai yang Mendasari Kami</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-navy-800/60 border border-navy-700/40 rounded-2xl p-6 text-center hover:border-brand-orange/25 transition-all duration-300 h-full">
                    <div className="w-14 h-14 rounded-2xl bg-navy-900/80 flex items-center justify-center mx-auto mb-4">
                      <Icon className={`w-7 h-7 ${v.color}`} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{v.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── MANAGEMENT TEAM ──────────────────────────────────────── */}
      <section id="team" className="py-16 md:py-24 bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <Users className="w-4 h-4" />
              Management Team
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Tim Pemimpin Kami</h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              Dipimpin oleh para profesional berpengalaman dengan rekam jejak yang terbukti di industri logistik Indonesia.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-navy-800/60 border border-navy-700/40 rounded-2xl p-6 hover:border-brand-orange/25 hover:bg-navy-800/80 transition-all duration-300 group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-lg`}>
                      {member.avatar}
                    </div>
                    <div>
                      <h3 className="text-white font-bold leading-tight">{member.name}</h3>
                      <div className="text-brand-orange text-sm font-semibold mt-0.5">{member.role}</div>
                      <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                        <Clock className="w-3 h-3" />
                        {member.exp}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEGAL & CERTIFICATIONS ──────────────────────────────── */}
      <section id="certifications" className="py-16 md:py-24 bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <Shield className="w-4 h-4" />
              Legal & Certifications
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Legalitas & Sertifikasi</h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              Beroperasi dengan penuh kepatuhan hukum dan standar industri internasional.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="bg-navy-800/60 border border-navy-700/40 rounded-2xl p-5 hover:border-brand-orange/25 transition-all duration-300 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm leading-tight">{cert.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 truncate">{cert.number}</span>
                    </div>
                    <div className="inline-flex items-center gap-1 mt-2">
                      <span className="bg-navy-700/80 text-gray-400 text-xs px-2 py-0.5 rounded">{cert.type}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 text-xs">Valid</span>
                    </div>
                  </div>
                  {cert.downloadable && (
                    <button className="flex-shrink-0 w-8 h-8 rounded-lg border border-navy-700/60 flex items-center justify-center text-gray-400 hover:text-brand-orange hover:border-brand-orange/40 transition-all duration-200" title="Download PDF">
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Butuh dokumen legalitas untuk keperluan procurement?{' '}
              <Link to="/contact" className="text-brand-orange hover:underline">Hubungi kami</Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-brand-orange to-brand-orange-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Tertarik Bermitra dengan ALN Logistics?
            </h2>
            <p className="text-orange-100 mb-6 max-w-xl mx-auto">
              Jadwalkan meeting dengan tim commercial kami dan diskusikan kebutuhan distribusi Anda.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-brand-orange font-bold px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                Schedule Meeting
                <ArrowRight className="w-4 h-4" />
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
