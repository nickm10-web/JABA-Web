import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiX, HiCheck } from 'react-icons/hi'
import './ProofPoints.css'

interface MetricCard {
  title: string
  metrics: {
    primary: string
    secondary: string[]
  }
}

const metricsCards: MetricCard[] = [
  {
    title: 'SCALE',
    metrics: {
      primary: '252,171+ Athletes',
      secondary: ['157 Schools', '48 Sports']
    }
  },
  {
    title: 'REACH',
    metrics: {
      primary: '808.6M+ Social Likes',
      secondary: ['252,171 Content Pieces', '15.8M+ Comments']
    }
  },
  {
    title: 'DEALS',
    metrics: {
      primary: '546 Brand Deals',
      secondary: ['$2.42M Pipeline', '$580K Closed']
    }
  },
  {
    title: 'BRANDS',
    metrics: {
      primary: '19 Major Brands',
      secondary: ['Nike, McDonald\'s, Red Bull, Adidas', '41 Athletes Active']
    }
  }
]

const ProofPoints = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="proof-points-section">
      <div className="proof-container">
        {/* Header */}
        <motion.div
          className="proof-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="proof-title">
            JABA <span className="proof-highlight">By The Numbers</span>
          </h2>
          <p className="proof-subtitle">
            Here's how JABA is transforming college sports NIL programs
          </p>
        </motion.div>

        {/* Before/After Comparison */}
        <motion.div
          className="before-after-container"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Before */}
          <div className="comparison-side before-side">
            <div className="comparison-icon-header">
              <HiX className="comparison-icon" />
              <h3 className="comparison-title">Without JABA</h3>
            </div>
            <ul className="comparison-list">
              <li>Fragmented tools & processes</li>
              <li>Manual spreadsheets, scattered data</li>
              <li>Lost emails & missed deadlines</li>
              <li>No real-time performance tracking</li>
              <li>Missed brand partnership opportunities</li>
            </ul>
          </div>

          {/* Arrow/Transform */}
          <div className="comparison-arrow">
            <div className="arrow-circle">
              <span className="arrow-text">TRANSFORM</span>
              <span className="arrow-symbol">→</span>
            </div>
          </div>

          {/* After */}
          <div className="comparison-side after-side">
            <div className="comparison-icon-header">
              <HiCheck className="comparison-icon" />
              <h3 className="comparison-title">With JABA</h3>
            </div>
            <ul className="comparison-list">
              <li>Unified end-to-end platform</li>
              <li>Automated tracking & reporting</li>
              <li>Automated alerts & complete visibility</li>
              <li>Real-time engagement tracking & insights</li>
              <li>546+ brand deals facilitated</li>
            </ul>
          </div>
        </motion.div>

        {/* Metrics Cards Grid */}
        <motion.div
          className="metrics-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {metricsCards.map((card, index) => (
            <motion.div
              key={index}
              className="metric-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.5,
                delay: 0.6 + index * 0.1
              }}
            >
              <div className="metric-border"></div>
              <div className="metric-content">
                <h4 className="metric-title">{card.title}</h4>
                <div className="metric-primary">
                  {card.metrics.primary}
                </div>
                <div className="metric-secondary">
                  {card.metrics.secondary.map((item, idx) => (
                    <div key={idx} className="metric-secondary-item">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="proof-bg-effects">
        <div className="proof-gradient-1"></div>
        <div className="proof-gradient-2"></div>
      </div>
    </section>
  )
}

export default ProofPoints
