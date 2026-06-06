import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiUsers, HiChartBar, HiLightningBolt } from 'react-icons/hi'
import { FaHandshake, FaDollarSign } from 'react-icons/fa'
import './Features.css'

interface Feature {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  visual: string
}

const features: Feature[] = [
  {
    id: 1,
    title: 'Manage Your Roster',
    description: 'Search, filter, view athlete marketability scores, monitor performance metrics in one place',
    icon: <HiUsers />,
    visual: 'roster'
  },
  {
    id: 2,
    title: 'Execute Campaigns & Deals',
    description: 'Create, manage, and track all NIL campaigns end-to-end for any athlete',
    icon: <HiLightningBolt />,
    visual: 'campaigns'
  },
  {
    id: 3,
    title: 'Analytics & Performance',
    description: 'Centralized dashboard showing ROI across all athletes and deals with real-time performance insights',
    icon: <HiChartBar />,
    visual: 'analytics'
  },
  {
    id: 4,
    title: 'Build Relationships',
    description: 'Track all brand and partner relationships, manage verified contacts, view complete deal history',
    icon: <FaHandshake />,
    visual: 'relationships'
  },
  {
    id: 5,
    title: 'Above The Cap',
    description: 'Comprehensive financial planning and deal management tools',
    icon: <FaDollarSign />,
    visual: 'financial'
  }
]

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={cardRef}
      className="feature-card"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: 'easeOut'
      }}
    >
      <div className="feature-border"></div>
      <div className="feature-content">
        <div className="feature-icon">{feature.icon}</div>
        <h3 className="feature-title">{feature.title}</h3>
        <p className="feature-description">{feature.description}</p>
        <div className="feature-visual">
          <div className={`visual-placeholder ${feature.visual}`}>
            <span className="visual-label">Product Preview</span>
          </div>
        </div>
        <motion.a
          href="#"
          className="feature-link"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          VIEW DETAILS →
        </motion.a>
      </div>
    </motion.div>
  )
}

const Features = () => {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-50px' })

  return (
    <section className="features-section">
      <div className="features-container">
        <motion.div
          ref={headerRef}
          className="features-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="features-title">Your Complete Athlete Management Platform</h2>
          <p className="features-subtitle">
            Everything you need to manage NIL deals, track performance, and maximize ROI. All in one place.
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
