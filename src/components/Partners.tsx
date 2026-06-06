import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Partners.css'

interface Partner {
  id: number
  name: string
  logo?: string // Path to logo image when available
}

const partners: Partner[] = [
  { id: 1, name: 'Mizzou', logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/142.png' },
  { id: 2, name: 'Baylor', logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/239.png' },
  { id: 3, name: 'Purdue', logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2509.png' },
  { id: 4, name: 'Arizona State', logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/9.png' },
  { id: 5, name: 'Georgia', logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/61.png' },
  { id: 6, name: 'Robert Morris', logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2523.png' },
  { id: 7, name: 'BIG3', logo: 'https://big3.com/wp-content/uploads/2023/04/big3-logo-white.png' },
  { id: 8, name: 'Athletes Unlimited', logo: 'https://auprosports.com/wp-content/uploads/2023/01/AU-Logo-White.png' }
]

const Partners = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })

  // Duplicate partners array for seamless loop
  const duplicatedPartners = [...partners, ...partners, ...partners]

  return (
    <section ref={sectionRef} className="partners-section">
      <div className="partners-container">
        {/* Section Header */}
        <motion.div
          className="partners-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="partners-title">Trusted Across College Athletics and Pro Sports</h2>
          <p className="partners-subtitle">Elite programs using JABA</p>
        </motion.div>

        {/* Auto-Scrolling Partners Carousel */}
        <div className="partners-scroll-wrapper">
          <div className="partners-scroll-track">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="partner-card"
              >
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="partner-logo"
                  />
                ) : (
                  <div className="partner-placeholder">
                    <span className="partner-name">{partner.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="partners-bg-gradient"></div>
    </section>
  )
}

export default Partners
