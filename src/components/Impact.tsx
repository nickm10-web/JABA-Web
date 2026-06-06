import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import './Impact.css'

interface Metric {
  value: number
  suffix: string
  label: string
  decimals?: number
}

const metrics: Metric[] = [
  { value: 20849, suffix: '+', label: 'Athletes Tracked' },
  { value: 808.6, suffix: 'M+', label: 'Total Social Reach', decimals: 1 },
  { value: 252171, suffix: '', label: 'Content Pieces Analyzed' },
  { value: 15.8, suffix: 'M+', label: 'Comments Tracked', decimals: 1 },
  { value: 546, suffix: '', label: 'Brand Deals Tracked' },
  { value: 2.42, suffix: 'M+', label: 'Active Pipeline Value', decimals: 2 },
  { value: 580, suffix: 'K+', label: 'In Closed Deals' },
  { value: 157, suffix: '+', label: 'Schools Covered' },
  { value: 48, suffix: '+', label: 'Sports Represented' },
  { value: 19, suffix: '', label: 'Major Brand Partners' },
  { value: 41, suffix: '', label: 'Athletes with Active Relationships' },
  { value: 23, suffix: '', label: 'Brand Contacts Managed' }
]

const Impact = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="impact" ref={sectionRef} className="impact-section">
      <div className="impact-container">
        {/* Header */}
        <motion.div
          className="impact-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="impact-title">
            By The <span className="impact-highlight">Numbers</span>
          </h2>
          <p className="impact-subtitle">
            Real data. Real impact. Real results across leading athletic programs.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="impact-grid">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="impact-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.05
              }}
            >
              <div className="impact-value">
                {metric.value >= 1000 ? (
                  <>
                    {isInView && (
                      <CountUp
                        end={metric.value}
                        duration={2.5}
                        separator=","
                        decimals={metric.decimals || 0}
                        decimal="."
                      />
                    )}
                  </>
                ) : (
                  <>
                    {isInView && (
                      <CountUp
                        end={metric.value}
                        duration={2}
                        decimals={metric.decimals || 0}
                        decimal="."
                      />
                    )}
                  </>
                )}
                {metric.suffix}
              </div>
              <div className="impact-label">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Brand Partners Section */}
        <motion.div
          className="brands-showcase"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <h3 className="brands-title">Major Brand Partners</h3>
          <div className="brands-list">
            <span className="brand-item">Nike</span>
            <span className="brand-item">McDonald's</span>
            <span className="brand-item">Red Bull</span>
            <span className="brand-item">Adidas</span>
            <span className="brand-item">Gatorade</span>
            <span className="brand-item">Samsung</span>
            <span className="brand-item">Puma</span>
            <span className="brand-item">+12 more</span>
          </div>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="impact-bg-effects">
        <div className="impact-gradient-1"></div>
        <div className="impact-gradient-2"></div>
      </div>
    </section>
  )
}

export default Impact
