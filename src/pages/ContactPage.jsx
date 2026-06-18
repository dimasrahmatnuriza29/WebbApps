import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, Loader, Building2, Users, Headphones } from 'lucide-react'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay }} className={className}>
      {children}
    </motion.div>
  )
}

const contactChannels = [
  {
    icon: Phone,
    title: '24/7 Hotline',
    value: '+62 21 800-1234',
    sub: 'Operational & emergency support',
    href: 'tel:+62218001234',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Business',
    value: '+62 811 800-1234',
    sub: 'Respons dalam 15 menit',
    href: 'https://wa.me/628118001234',
    color: 'text-[#25D366]',
    bg: 'bg-[#25D366]/10',
    border: 'border-[#25D366]/20',
  },
  {
    icon: Mail,
    title: 'Email Korporat',
    value: 'info@aln-logistics.co.id',
    sub: 'Untuk inquiry & quotation',
    href: 'mailto:info@aln-logistics.co.id',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: Mail,
    title: 'Sales & Commercial',
    value: 'sales@aln-logistics.co.id',
    sub: 'Partnership & business',
    href: 'mailto:sales@aln-logistics.co.id',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
]

const offices = [
  {
    city: 'Jakarta (Head Office)',
    address: 'Jl. Raya Cengkareng No. 88, Cengkareng, Jakarta Barat 11730',
    phone: '+62 21 800-1234',
    hours: 'Senin–Jumat 08.00–17.00 WIB',
    type: 'HQ',
    mapLink: 'https://maps.google.com',
  },
  {
    city: 'Surabaya',
    address: 'Kawasan SIER, Jl. Rungkut Industri No. 12, Surabaya 60293',
    phone: '+62 31 801-2345',
    hours: 'Senin–Jumat 08.00–17.00 WIB',
    type: 'Regional Office',
    mapLink: 'https://maps.google.com',
  },
  {
    city: 'Medan',
    address: 'Jl. Gatot Subroto KM 7.5, Deli Serdang, Sumatera Utara',
    phone: '+62 61 802-3456',
    hours: 'Senin–Jumat 08.00–17.00 WIB',
    type: 'Branch Office',
    mapLink: 'https://maps.google.com',
  },
]

const inquiryTypes = [
  'Request Quotation (Penawaran Harga)',
  'Schedule Meeting (Jadwal Pertemuan)',
  'Dedicated Fleet Inquiry',
  'Warehouse & Storage Inquiry',
  'Partnership & Kerjasama',
  'Tracking & Operational Support',
  'Lainnya',
]

export default function ContactPage() {
  const [form, setForm] = useState({
    company: '', name: '', position: '', email: '', phone: '', type: '', origin: '', destination: '', fleet: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.company || !form.name || !form.email || !form.message) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1800)
  }

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-navy-950" />
        <div className="absolute inset-0 bg-dots opacity-35" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-brand-orange/8 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-sm font-semibold px-4 py-2 rounded-full mb-5">
              <Headphones className="w-4 h-4" />
              Contact Us
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Mulai <span className="text-brand-orange">Diskusi</span> Dengan Kami
            </h1>
            <p className="text-gray-300 text-lg">
              Tim konsultan logistik kami siap membantu Anda menemukan solusi distribusi yang paling efisien dan cost-effective untuk bisnis Anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="py-8 bg-navy-900 border-y border-navy-800/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {contactChannels.map((ch, i) => {
              const Icon = ch.icon
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <a href={ch.href} target={ch.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className={`flex flex-col items-start gap-2 bg-navy-800/60 border ${ch.border} rounded-2xl p-4 hover:bg-navy-800 transition-all duration-300 group`}>
                    <div className={`w-9 h-9 rounded-xl ${ch.bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${ch.color}`} />
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">{ch.title}</div>
                      <div className={`font-bold text-sm ${ch.color} group-hover:underline`}>{ch.value}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{ch.sub}</div>
                    </div>
                  </a>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content: Form + Map */}
      <section className="py-12 md:py-16 bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <FadeIn>
                <h2 className="text-2xl font-bold text-white mb-6">Kirim Pesan atau Permintaan Penawaran</h2>

                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="bg-navy-800/60 border border-emerald-500/25 rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-2">Pesan Berhasil Terkirim!</h3>
                    <p className="text-gray-400 mb-2">Terima kasih, <span className="text-white font-semibold">{form.name}</span>. Tim kami akan menghubungi Anda di <span className="text-brand-orange">{form.email}</span> dalam 2x24 jam kerja.</p>
                    <p className="text-gray-500 text-sm mb-6">Untuk respons lebih cepat, hubungi WhatsApp kami di <span className="text-emerald-400">+62 811 800-1234</span></p>
                    <button onClick={() => { setSubmitted(false); setForm({ company: '', name: '', position: '', email: '', phone: '', type: '', origin: '', destination: '', fleet: '', message: '' }) }}
                      className="btn-secondary text-sm">Kirim Pesan Lain</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-navy-800/60 border border-navy-700/40 rounded-2xl p-6 space-y-4">
                    {/* Company Info */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-gray-400 text-xs font-medium mb-1 block">Nama Perusahaan *</label>
                        <input className="input-field text-sm" placeholder="PT Perusahaan Anda" value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} required />
                      </div>
                      <div>
                        <label className="text-gray-400 text-xs font-medium mb-1 block">Nama Lengkap *</label>
                        <input className="input-field text-sm" placeholder="Nama Anda" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-gray-400 text-xs font-medium mb-1 block">Jabatan</label>
                        <input className="input-field text-sm" placeholder="Logistics Manager" value={form.position} onChange={e => setForm(p => ({ ...p, position: e.target.value }))} />
                      </div>
                      <div>
                        <label className="text-gray-400 text-xs font-medium mb-1 block">Email *</label>
                        <input type="email" className="input-field text-sm" placeholder="email@perusahaan.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-gray-400 text-xs font-medium mb-1 block">No. HP / WhatsApp</label>
                        <input className="input-field text-sm" placeholder="+62..." value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                      </div>
                      <div>
                        <label className="text-gray-400 text-xs font-medium mb-1 block">Jenis Permintaan</label>
                        <select className="select-field text-sm" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                          <option value="">Pilih jenis...</option>
                          {inquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="border-t border-navy-700/40 pt-4">
                      <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-3">Informasi Logistik (Opsional)</p>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-gray-400 text-xs font-medium mb-1 block">Origin Utama</label>
                          <input className="input-field text-sm" placeholder="Kota asal" value={form.origin} onChange={e => setForm(p => ({ ...p, origin: e.target.value }))} />
                        </div>
                        <div>
                          <label className="text-gray-400 text-xs font-medium mb-1 block">Destination</label>
                          <input className="input-field text-sm" placeholder="Kota tujuan" value={form.destination} onChange={e => setForm(p => ({ ...p, destination: e.target.value }))} />
                        </div>
                        <div>
                          <label className="text-gray-400 text-xs font-medium mb-1 block">Tipe Armada</label>
                          <select className="select-field text-sm" value={form.fleet} onChange={e => setForm(p => ({ ...p, fleet: e.target.value }))}>
                            <option value="">Pilih...</option>
                            {['CDE', 'CDD', 'Fuso', 'Wingbox', 'Trailer', 'Container', 'Belum tahu'].map(f => <option key={f}>{f}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-400 text-xs font-medium mb-1 block">Pesan / Kebutuhan Khusus *</label>
                      <textarea className="input-field text-sm resize-none" rows={4}
                        placeholder="Ceritakan kebutuhan logistik Anda: volume, rute, frekuensi, jadwal, dan hal lain yang relevan..."
                        value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required />
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? <><Loader className="w-4 h-4 animate-spin" /> Mengirim...</> : <><Send className="w-4 h-4" /> Kirim Permintaan</>}
                    </button>
                    <p className="text-gray-600 text-xs text-center">Data Anda aman dan tidak akan dibagikan kepada pihak ketiga.</p>
                  </form>
                )}
              </FadeIn>
            </div>

            {/* Side Info */}
            <div className="lg:col-span-2 space-y-5">
              <FadeIn delay={0.1}>
                <div className="bg-navy-800/60 border border-navy-700/40 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-brand-orange" />
                    <h3 className="text-white font-bold">Jam Operasional</h3>
                  </div>
                  <div className="space-y-2">
                    {[
                      { day: 'Senin – Jumat', hours: '08.00 – 17.00 WIB', note: 'Kantor & Commercial' },
                      { day: 'Sabtu', hours: '08.00 – 14.00 WIB', note: 'Operational support' },
                      { day: 'Minggu & Hari Raya', hours: 'Emergency only', note: 'Via WhatsApp/Hotline' },
                      { day: 'Operasional 24/7', hours: 'Setiap hari', note: 'Fleet & dispatch center' },
                    ].map(o => (
                      <div key={o.day} className="flex justify-between items-start py-2 border-b border-navy-700/30 last:border-0">
                        <div>
                          <div className="text-white text-sm font-medium">{o.day}</div>
                          <div className="text-gray-500 text-xs">{o.note}</div>
                        </div>
                        <span className="text-brand-orange text-sm font-semibold text-right">{o.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Quick Response CTA */}
              <FadeIn delay={0.15}>
                <a href="https://wa.me/628118001234?text=Halo%20ALN%20Logistics%2C%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20logistik%20perusahaan%20kami."
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-[#25D366]/10 border border-[#25D366]/25 rounded-2xl p-5 hover:border-[#25D366]/50 hover:bg-[#25D366]/15 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <div>
                    <div className="text-white font-bold">Chat WhatsApp Langsung</div>
                    <div className="text-gray-400 text-sm">Respons dalam 15 menit kerja</div>
                    <div className="text-[#25D366] text-xs mt-1 font-medium group-hover:underline">+62 811 800-1234 →</div>
                  </div>
                </a>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-12 bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-8">
            <h2 className="text-2xl font-bold text-white">Lokasi Kantor Kami</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {offices.map((office, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-navy-800/60 border border-navy-700/40 rounded-2xl p-5 hover:border-brand-orange/25 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-brand-orange" />
                    <div>
                      <h3 className="text-white font-bold text-sm">{office.city}</h3>
                      <span className="text-gray-500 text-xs">{office.type}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2 text-gray-400">
                      <MapPin className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                      <span className="text-xs">{office.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Phone className="w-4 h-4 text-brand-orange flex-shrink-0" />
                      <a href={`tel:${office.phone.replace(/\s|-/g, '')}`} className="text-xs hover:text-brand-orange transition-colors">{office.phone}</a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4 text-brand-orange flex-shrink-0" />
                      <span className="text-xs">{office.hours}</span>
                    </div>
                  </div>
                  <a href={office.mapLink} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-brand-orange text-xs font-semibold mt-4 hover:underline">
                    <MapPin className="w-3.5 h-3.5" />
                    Lihat di Google Maps
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Embedded Map Placeholder */}
          <FadeIn delay={0.2}>
            <div className="w-full h-64 md:h-80 bg-navy-800/60 border border-navy-700/40 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-brand-orange mx-auto mb-3 animate-bounce-slow" />
                  <p className="text-white font-semibold">PT Armada Logistik Nusantara</p>
                  <p className="text-gray-400 text-sm">Jl. Raya Cengkareng No. 88, Jakarta Barat</p>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 btn-primary mt-4 text-sm">
                    <MapPin className="w-4 h-4" />
                    Buka Google Maps
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
