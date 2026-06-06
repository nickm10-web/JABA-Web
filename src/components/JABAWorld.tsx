import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './JABAWorld.css'

const JABAWorld = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Parallax transforms for different layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const mountainsY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const columnsY = useTransform(scrollYProgress, [0, 1], ['0%', '70%'])
  const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '90%'])

  // Section opacity transforms
  const challengeOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 1, 0])
  const solutionOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0])
  const resultOpacity = useTransform(scrollYProgress, [0.65, 0.8, 1], [0, 1, 1])

  // Scale transforms for dramatic effect
  const challengeScale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1])
  const solutionScale = useTransform(scrollYProgress, [0.3, 0.5], [0.8, 1])
  const resultScale = useTransform(scrollYProgress, [0.65, 0.8], [0.8, 1])

  // Tech overlay animations
  const techGridOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.2, 0.6, 0.8, 1])

  return (
    <div ref={containerRef} className="jaba-world-container">
      {/* Background Layers - Moving at different speeds */}
      <motion.div
        className="world-layer background-sky"
        style={{ y: backgroundY }}
      >
        <div className="sky-gradient"></div>
        <div className="celestial-elements"></div>
      </motion.div>

      <motion.div
        className="world-layer mountains"
        style={{ y: mountainsY }}
      >
        <div className="mountain-range"></div>
        <div className="greenery-base"></div>
      </motion.div>

      <motion.div
        className="world-layer columns-layer-world"
        style={{ y: columnsY }}
      >
        <div className="column left-column"></div>
        <div className="column center-column"></div>
        <div className="column right-column"></div>
        <div className="temple-structure"></div>
      </motion.div>

      <motion.div
        className="world-layer tech-grid-overlay"
        style={{ opacity: techGridOpacity }}
      >
        <div className="grid-lines"></div>
        <div className="holographic-elements">
          <div className="holo-circle holo-1"></div>
          <div className="holo-circle holo-2"></div>
          <div className="holo-circle holo-3"></div>
        </div>
        <div className="data-streams">
          <div className="stream stream-1"></div>
          <div className="stream stream-2"></div>
          <div className="stream stream-3"></div>
        </div>
      </motion.div>

      <motion.div
        className="world-layer foreground"
        style={{ y: foregroundY }}
      >
        <div className="athlete-silhouettes"></div>
      </motion.div>

      {/* Story Sections - Text Overlays */}
      <div className="story-sections">
        {/* Section 1: The Challenge */}
        <motion.div
          className="story-section challenge-section"
          style={{
            opacity: challengeOpacity,
            scale: challengeScale
          }}
        >
          <div className="story-content">
            <motion.h2 className="story-title chaos-effect">
              The Challenge
            </motion.h2>
            <motion.p className="story-description">
              Athletes navigating complex NIL deals without structure. <br />
              Scattered data. Missed opportunities. Lost revenue.
            </motion.p>
            <div className="chaos-indicators">
              <div className="indicator">❌ No centralized system</div>
              <div className="indicator">❌ Manual tracking</div>
              <div className="indicator">❌ Limited visibility</div>
            </div>
          </div>
        </motion.div>

        {/* Section 2: The Solution */}
        <motion.div
          className="story-section solution-section"
          style={{
            opacity: solutionOpacity,
            scale: solutionScale
          }}
        >
          <div className="story-content">
            <motion.h2 className="story-title solution-glow">
              The Solution
            </motion.h2>
            <motion.p className="story-description">
              JABA brings order to chaos. <br />
              One platform. Complete control. Maximum impact.
            </motion.p>
            <div className="solution-interface">
              <div className="interface-card">
                <div className="card-icon">📊</div>
                <div className="card-label">Unified Dashboard</div>
              </div>
              <div className="interface-card">
                <div className="card-icon">🎯</div>
                <div className="card-label">Smart Campaigns</div>
              </div>
              <div className="interface-card">
                <div className="card-icon">💰</div>
                <div className="card-label">Deal Tracking</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 3: The Result */}
        <motion.div
          className="story-section result-section"
          style={{
            opacity: resultOpacity,
            scale: resultScale
          }}
        >
          <div className="story-content">
            <motion.h2 className="story-title success-glow">
              The Result
            </motion.h2>
            <motion.p className="story-description">
              Athletes thriving. Brands winning. Revenue growing. <br />
              Welcome to JABA World.
            </motion.p>
            <div className="success-metrics">
              <div className="metric">
                <div className="metric-value">10x</div>
                <div className="metric-label">Faster Deal Execution</div>
              </div>
              <div className="metric">
                <div className="metric-value">100%</div>
                <div className="metric-label">Visibility & Control</div>
              </div>
              <div className="metric">
                <div className="metric-value">∞</div>
                <div className="metric-label">Growth Potential</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="scroll-progress"
        style={{
          scaleY: scrollYProgress
        }}
      />
    </div>
  )
}

export default JABAWorld
