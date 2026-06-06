import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import CountUp from 'react-countup'
import { HiChartBar, HiUsers, HiNewspaper, HiLightningBolt } from 'react-icons/hi'
import './AuburnCaseStudy.css'

interface DashboardTab {
  id: string
  label: string
  description: string
  icon: React.ReactNode
}

const dashboardTabs: DashboardTab[] = [
  {
    id: 'home',
    label: 'Home',
    description: 'Real-time overview of all athletes, campaigns, and performance metrics',
    icon: <HiChartBar />
  },
  {
    id: 'athletes',
    label: 'Athletes',
    description: 'Complete roster management with marketability scores and performance tracking',
    icon: <HiUsers />
  },
  {
    id: 'workflow',
    label: 'Workflow',
    description: 'Campaign management from brand outreach to deal execution',
    icon: <HiLightningBolt />
  },
  {
    id: 'analytics',
    label: 'Analytics',
    description: 'ROI dashboard with real-time insights and growth opportunities',
    icon: <HiChartBar />
  },
  {
    id: 'news',
    label: 'NIL News',
    description: 'Automated monitoring of NIL developments and athlete mentions',
    icon: <HiNewspaper />
  }
]

const AuburnCaseStudy = () => {
  const [activeTab, setActiveTab] = useState('home')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const stats = [
    { value: 664, label: 'Athletes Tracked', suffix: '' },
    { value: 4.2, label: 'Total Social Likes', suffix: 'M', decimals: 1 },
    { value: 127, label: 'Active Campaigns', suffix: '' },
    { value: 20, label: 'Daily News Items', suffix: '+' }
  ]

  return (
    <section ref={sectionRef} className="auburn-case-study">
      <div className="auburn-container">
        {/* Header */}
        <motion.div
          className="auburn-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
        >
          <div className="auburn-badge">
            <span className="badge-text">CASE STUDY</span>
          </div>
          <h2 className="auburn-title">
            Meet <span className="auburn-highlight">Auburn Tigers</span>
          </h2>
          <p className="auburn-subtitle">
            See how Auburn transformed their NIL program with JABA
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div className="stat-value">
                {isInView && (
                  <CountUp
                    end={stat.value}
                    duration={2}
                    decimals={stat.decimals || 0}
                    decimal="."
                  />
                )}
                {stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dashboard Preview Section */}
        <motion.div
          className="dashboard-preview-section"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <h3 className="preview-title">Explore The Dashboard</h3>

          {/* Dashboard Tabs */}
          <div className="dashboard-tabs">
            {dashboardTabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="tab-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="content-header">
                <h4 className="content-title">
                  {dashboardTabs.find(t => t.id === activeTab)?.label}
                </h4>
                <p className="content-description">
                  {dashboardTabs.find(t => t.id === activeTab)?.description}
                </p>
              </div>

              {/* Dashboard Preview Mockup */}
              <div className="dashboard-mockup">
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="mockup-title">JABA Dashboard - {dashboardTabs.find(t => t.id === activeTab)?.label}</div>
                </div>
                <div className="mockup-content">
                  <div className={`preview-visual ${activeTab}`}>
                    <div className="visual-overlay">
                      <span className="overlay-text">Dashboard Preview</span>
                      <span className="overlay-subtext">Full platform available after demo</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          className="testimonial-section"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <div className="testimonial-card">
            <div className="quote-mark">"</div>
            <p className="testimonial-text">
              JABA has completely transformed how we manage our NIL program. We've gone from scattered spreadsheets to a unified platform that gives us complete visibility into all 664 of our athletes. The time savings alone have been incredible, but the real value is in the insights and automation that help us maximize opportunities for every athlete.
            </p>
            <div className="testimonial-author">
              <div className="author-info">
                <div className="author-name">Auburn NIL Director</div>
                <div className="author-title">Auburn University Athletics</div>
              </div>
              <div className="auburn-logo-placeholder">🐅</div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="auburn-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <h3 className="cta-title">See Your School's Potential</h3>
          <p className="cta-subtitle">Join Auburn and other leading programs transforming their NIL management</p>
          <div className="cta-buttons">
            <motion.button
              className="cta-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Demo
            </motion.button>
            <motion.button
              className="cta-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Case Study
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="auburn-bg-effects">
        <div className="auburn-gradient-1"></div>
        <div className="auburn-gradient-2"></div>
      </div>
    </section>
  )
}

export default AuburnCaseStudy
