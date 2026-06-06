import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => {
        setEmail('')
        setIsSubmitted(false)
      }, 3000)
    }
  }

  const quickLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Case Studies', href: '#case-study' },
    { label: 'About Us', href: '#about' }
  ]

  const legalLinks = [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Cookie Policy', href: '#cookies' }
  ]

  const socialLinks = [
    { icon: <FaInstagram />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaTwitter />, href: 'https://twitter.com', label: 'Twitter' }
  ]

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Branding & Newsletter */}
          <div className="footer-section brand-section">
            <div className="footer-logo">
              <img src="/JABA-logo.png" alt="JABA" className="footer-logo-image" />
            </div>
            <p className="footer-tagline">
              The ultimate NIL management platform for athletic programs.
            </p>

            {/* Email Signup */}
            <div className="newsletter-section">
              <h4 className="newsletter-title">Stay Updated</h4>
              <form onSubmit={handleEmailSubmit} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <motion.button
                  type="submit"
                  className="newsletter-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitted ? '✓' : '→'}
                </motion.button>
              </form>
              {isSubmitted && (
                <motion.p
                  className="newsletter-success"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thanks for subscribing!
                </motion.p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section links-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="footer-section links-section">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="footer-section social-section">
            <h4 className="footer-heading">Follow Us</h4>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} JABA. All rights reserved.
          </p>
          <p className="footer-credit">
            Built for athletes. Powered by innovation.
          </p>
        </div>
      </div>

      {/* Background Effects */}
      <div className="footer-bg-gradient"></div>
    </footer>
  )
}

export default Footer
