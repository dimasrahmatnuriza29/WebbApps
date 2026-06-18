import { Link } from 'react-router-dom'
import { Truck, MapPin, Phone, Mail, Clock, ArrowRight, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

const footerLinks = {
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Management Team', path: '/about#team' },
    { label: 'Legal & Certifications', path: '/about#certifications' },
    { label: 'Company Timeline', path: '/about#timeline' },
    { label: 'Career', path: '/contact' },
  ],
  services: [
    { label: 'Transportation', path: '/solutions' },
    { label: 'Dedicated Fleet', path: '/solutions' },
    { label: 'Distribution Management', path: '/solutions' },
    { label: 'Cross Docking', path: '/solutions' },
    { label: 'Last Mile Delivery', path: '/solutions' },
  ],
  tools: [
    { label: 'Fleet & Assets', path: '/fleet' },
    { label: 'Coverage Area', path: '/coverage' },
    { label: 'Cost Simulator', path: '/solutions#simulator' },
    { label: 'Client Portal', path: '/portal' },
    { label: 'Insights', path: '/insights' },
  ],
}

const officeLocations = [
  { city: 'Jakarta (HQ)', address: 'Jl. Raya Cengkareng No. 88, Jakarta Barat 11730' },
  { city: 'Surabaya', address: 'SIER Kawasan Industri, Surabaya, Jawa Timur' },
  { city: 'Medan', address: 'Deli Serdang, Sumatera Utara 20351' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy-950 border-t border-navy-800/60">
      {/* CTA Strip */}
      <div className="bg-gradient-to-r from-brand-orange via-brand-orange-dark to-orange-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Siap Optimalkan Logistik Bisnis Anda?
              </h3>
              <p className="text-orange-100 text-sm mt-1">
                Konsultasikan kebutuhan distribusi Anda bersama tim ahli kami hari ini.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                to="/contact"
                className="flex items-center gap-2 bg-white text-brand-orange font-bold px-5 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Request Quotation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/628001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-white/50 hover:border-white text-white font-semibold px-5 py-3 rounded-xl transition-all duration-300 hover:bg-white/10"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-gradient-to-br from-brand-orange to-brand-orange-dark rounded-xl flex items-center justify-center shadow-orange-glow">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-black text-white">ALN Logistics</div>
                <div className="text-[10px] font-medium text-gray-400 tracking-widest uppercase">
                  Armada Logistik Nusantara
                </div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              PT Armada Logistik Nusantara adalah perusahaan logistik B2B terpercaya dengan pengalaman 11+ tahun melayani lebih dari 480 klien korporat di seluruh Indonesia.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href="tel:+62218001234" className="flex items-center gap-3 text-gray-400 hover:text-brand-orange transition-colors text-sm group">
                <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center group-hover:bg-brand-orange/10 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                +62 21 800-1234 (24/7 Hotline)
              </a>
              <a href="mailto:info@aln-logistics.co.id" className="flex items-center gap-3 text-gray-400 hover:text-brand-orange transition-colors text-sm group">
                <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center group-hover:bg-brand-orange/10 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                info@aln-logistics.co.id
              </a>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                Operasional 24/7 — 365 Hari
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-2">
              {[
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-navy-800 border border-navy-700/50 flex items-center justify-center text-gray-400 hover:text-brand-orange hover:border-brand-orange/40 hover:bg-navy-750 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Perusahaan</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-brand-orange text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 overflow-hidden transition-all duration-200">›</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Layanan</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-brand-orange text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 overflow-hidden transition-all duration-200">›</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Tools & Info</h4>
            <ul className="space-y-2.5">
              {footerLinks.tools.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-brand-orange text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 overflow-hidden transition-all duration-200">›</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Office Locations */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Kantor</h4>
              <div className="space-y-3">
                {officeLocations.map((loc) => (
                  <div key={loc.city} className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-white text-xs font-medium">{loc.city}</div>
                      <div className="text-gray-500 text-xs leading-relaxed">{loc.address}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-xs text-center sm:text-left">
              © {currentYear} PT Armada Logistik Nusantara. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-xs">NIB: 1234567890123</span>
              <span className="text-navy-700">|</span>
              <span className="text-gray-500 text-xs">ISO 9001:2015 Certified</span>
              <span className="text-navy-700">|</span>
              <Link to="/contact" className="text-gray-500 hover:text-brand-orange text-xs transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
