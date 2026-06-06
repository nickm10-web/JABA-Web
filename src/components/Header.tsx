import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Features', href: '#features', isHash: true },
    { label: 'How It Works', href: '#how-it-works', isHash: true },
    { label: 'Impact', href: '#impact', isHash: true },
    { label: 'Blog', href: '/blog', isHash: false },
    { label: 'Contact', href: '#contact', isHash: true }
  ]

  const handleNavClick = (href: string, isHash: boolean) => {
    setIsMenuOpen(false)

    if (isHash) {
      // If we're not on home page, navigate there first
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else {
        // Smooth scroll to section on current page
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-container">
        {/* Logo */}
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="logo-link"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
          >
            <img src="/JABA-logo.png" alt="JABA" className="logo-image" />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          {navItems.map((item, index) => (
            item.isHash ? (
              <motion.a
                key={index}
                href={item.href}
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href, item.isHash)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
            ) : (
              <Link key={index} to={item.href} className="nav-link">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.span>
              </Link>
            )
          ))}
        </nav>

        {/* CTA Button - Desktop */}
        <motion.button
          className="cta-button-header desktop-only"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Request Demo
        </motion.button>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="nav-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="mobile-nav-links">
              {navItems.map((item, index) => (
                item.isHash ? (
                  <motion.a
                    key={index}
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href, item.isHash)
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.a>
                ) : (
                  <Link key={index} to={item.href} className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                )
              ))}
              <motion.button
                className="cta-button-mobile"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
              >
                Request Demo
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
