import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Truck, LogIn } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Fleet & Assets', path: '/fleet' },
  { label: 'Coverage Area', path: '/coverage' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Clients', path: '/clients' },
  { label: 'Insights', path: '/insights' },
  { label: 'Contact Us', path: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-navy-900/95 backdrop-blur-xl border-b border-navy-700/50 shadow-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="w-9 h-9 md:w-11 md:h-11 bg-gradient-to-br from-brand-orange to-brand-orange-dark rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-orange-glow transition-all duration-300 group-hover:scale-105">
                <Truck className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={2} />
              </div>
              <div className="leading-none">
                <div className="text-lg md:text-xl font-black text-white tracking-tight">ALN</div>
                <div className="text-[9px] md:text-[10px] font-medium text-gray-400 tracking-widest uppercase">Logistics</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                    isActive(item.path)
                      ? 'text-brand-orange bg-brand-orange/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                to="/portal"
                className="hidden md:inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 hover:shadow-orange-glow hover:scale-105"
              >
                <LogIn className="w-4 h-4" />
                <span>Client Portal</span>
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="xl:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-navy-700/60 text-gray-300 hover:text-white hover:border-brand-orange/50 hover:bg-navy-800 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-navy-950/80 backdrop-blur-sm xl:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-72 bg-navy-900 border-l border-navy-700/50 shadow-2xl xl:hidden flex flex-col"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-5 border-b border-navy-700/50">
                <Link to="/" className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-gradient-to-br from-brand-orange to-brand-orange-dark rounded-xl flex items-center justify-center">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-base font-black text-white">ALN</div>
                    <div className="text-[9px] font-medium text-gray-400 tracking-widest uppercase">Logistics</div>
                  </div>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-navy-700/60 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex-1 overflow-y-auto py-4 px-4">
                <div className="space-y-1">
                  {navItems.map((item, idx) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isActive(item.path)
                            ? 'text-brand-orange bg-brand-orange/10 border border-brand-orange/20'
                            : 'text-gray-300 hover:text-white hover:bg-navy-800'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Mobile CTA */}
              <div className="p-4 border-t border-navy-700/50 space-y-3">
                <Link
                  to="/portal"
                  className="flex items-center justify-center gap-2 w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300"
                >
                  <LogIn className="w-4 h-4" />
                  Client Portal
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full border border-navy-700/60 hover:border-brand-orange/50 text-gray-300 hover:text-white font-medium py-3 px-4 rounded-xl transition-all duration-300"
                >
                  Hubungi Kami
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
