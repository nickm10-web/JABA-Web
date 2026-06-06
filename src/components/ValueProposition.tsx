import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { HiClock, HiCheckCircle, HiLightningBolt, HiTrendingUp } from 'react-icons/hi'
import './ValueProposition.css'

interface ValueProp {
  id: number
  icon: React.ReactNode
  headline: string
  description: string
  metric: {
    value: number
    suffix: string
    prefix?: string
    label: string
  }
  beforeAfter?: {
    before: string
    after: string
  }
}

const valueProps: ValueProp[] = [
  {
    id: 1,
    icon: <HiClock />,
    headline: 'Save 7-10 Hours Per Week',
    description: 'Eliminates repetitive manual tasks and automates reporting & analysis. Like adding 1-2 extra NIL staff without expanding payroll.',
    metric: {
      value: 10,
      suffix: ' hrs',
      label: 'Saved Weekly Per Staff Member'
    },
    beforeAfter: {
      before: 'Manual spreadsheets, scattered data',
      after: 'Automated tracking & reporting'
    }
  },
  {
    id: 2,
    icon: <HiCheckCircle />,
    headline: 'Never Miss a Deliverable',
    description: 'JABA tracks every task, deadline, and detail so nothing slips through the cracks. Automated reminders and timeline management keep everyone on track.',
    metric: {
      value: 252171,
      suffix: '+',
      label: 'Athletes Tracked Across Programs'
    },
    beforeAfter: {
      before: 'Lost emails, missed deadlines',
      after: 'Automated alerts & complete visibility'
    }
  },
  {
    id: 3,
    icon: <HiLightningBolt />,
    headline: 'AI-Powered Insights',
    description: 'Get intelligent recommendations on athlete performance, campaign optimization, and growth opportunities. Data-driven decisions at your fingertips.',
    metric: {
      value: 20,
      suffix: '+',
      label: 'New Insights Generated'
    },
    beforeAfter: {
      before: 'Gut feelings, guesswork',
      after: 'Data-driven recommendations'
    }
  },
  {
    id: 4,
    icon: <HiTrendingUp />,
    headline: 'Full Campaign Lifecycle Management',
    description: 'From brand outreach to deal execution to performance tracking, everything is in one place. Manage the entire NIL ecosystem seamlessly.',
    metric: {
      value: 808.6,
      suffix: 'M+',
      label: 'Total Social Reach Tracked'
    },
    beforeAfter: {
      before: 'Fragmented tools & processes',
      after: 'Unified end-to-end platform'
    }
  }
]

const ValuePropCard = ({ prop, index }: { prop: ValueProp; index: number }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={cardRef}
      className="value-prop-card"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.7,
        delay: index * 0.2,
        ease: 'easeOut'
      }}
    >
      <div className="value-prop-content">
        {/* Icon */}
        <motion.div
          className="value-icon"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{
            duration: 0.6,
            delay: index * 0.2 + 0.2,
            ease: 'easeOut'
          }}
        >
          {prop.icon}
        </motion.div>

        {/* Headline */}
        <h3 className="value-headline">{prop.headline}</h3>

        {/* Description */}
        <p className="value-description">{prop.description}</p>

        {/* Before/After */}
        {prop.beforeAfter && (
          <div className="before-after">
            <div className="before">
              <span className="label">Before:</span>
              <span className="text">{prop.beforeAfter.before}</span>
            </div>
            <div className="arrow">→</div>
            <div className="after">
              <span className="label">After:</span>
              <span className="text">{prop.beforeAfter.after}</span>
            </div>
          </div>
        )}

        {/* Animated Metric */}
        <div className="metric-container">
          <div className="metric-value">
            {prop.metric.prefix}
            {isInView && (
              <CountUp
                end={prop.metric.value}
                duration={2.5}
                delay={index * 0.2 + 0.3}
                decimals={prop.metric.value % 1 !== 0 ? 1 : 0}
                decimal="."
              />
            )}
            {prop.metric.suffix}
          </div>
          <div className="metric-label">{prop.metric.label}</div>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="card-glow"></div>
    </motion.div>
  )
}

const ValueProposition = () => {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-50px' })

  return (
    <section className="value-proposition-section">
      <div className="value-container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="value-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="value-main-title">What JABA Does For You</h2>
          <p className="value-subtitle">
            Real impact. Real results. Real time saved.
          </p>
        </motion.div>

        {/* Value Props Grid */}
        <div className="value-props-grid">
          {valueProps.map((prop, index) => (
            <ValuePropCard key={prop.id} prop={prop} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="value-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="cta-text">Ready to transform your NIL program?</p>
          <motion.button
            className="cta-button-large"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="value-bg-effects">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="bg-grid"></div>
      </div>
    </section>
  )
}

export default ValueProposition
