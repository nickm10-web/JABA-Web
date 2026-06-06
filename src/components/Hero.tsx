import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './Hero.css'

const Hero = () => {
  const [showSolution, setShowSolution] = useState(false)
  const { scrollY } = useScroll()

  // Transform values for smooth scroll animations
  const problemOpacity = useTransform(scrollY, [0, 400, 700], [1, 1, 0])
  const solutionOpacity = useTransform(scrollY, [500, 800, 1800, 2200], [0, 1, 1, 1])
  const backgroundOpacity = useTransform(scrollY, [0, 600], [0, 0])
  const solutionY = useTransform(scrollY, [500, 1800, 2800], ['-50%', '-50%', '-400%'])

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      if (latest > 500 && !showSolution) {
        setShowSolution(true)
      } else if (latest <= 500 && showSolution) {
        setShowSolution(false)
      }
    })

    return () => unsubscribe()
  }, [scrollY, showSolution])

  return (
    <div className="hero-container">
      {/* Background Effects */}
      <motion.div
        className="hero-background"
        style={{ opacity: backgroundOpacity }}
      >
        <div className="hero-grid"></div>
        <div className="hero-gradient-1"></div>
        <div className="hero-gradient-2"></div>
      </motion.div>

      {/* Content Container */}
      <div className="hero-content">
        {/* Problem Statement - Initial State */}
        <motion.div
          className="hero-text-container problem-container"
          style={{ opacity: problemOpacity }}
        >
          <h1 className="hero-heading problem-heading">
            "I don't have a project management system for my athletes."
          </h1>
        </motion.div>

        {/* Solution State - Appears on Scroll */}
        {showSolution && (
          <motion.div
            className="hero-solution-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              opacity: solutionOpacity,
              x: '-50%',
              y: solutionY
            }}
            transition={{ duration: 0.6 }}
          >
            <div className="solution-content">
              {/* Solution Text */}
              <motion.div
                className="solution-text-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <h1 className="hero-heading solution-heading">
                  You do now.
                </h1>
              </motion.div>

              {/* JABA Waving Video */}
              <motion.div
                className="hero-video-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              >
                <video
                  className="hero-character-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  src="/jaba-wave.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.button
              className="hero-cta-button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See What JABA Can Do
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ opacity: problemOpacity }}
      >
        <div className="scroll-arrow">↓</div>
      </motion.div>
    </div>
  )
}

export default Hero
