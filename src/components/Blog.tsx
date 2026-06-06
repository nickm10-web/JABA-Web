import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Blog.css'

interface BlogPost {
  id: string
  title: string
  date: string
  category: string
  excerpt: string
  image: string
  slug: string
  link: string
  featured: boolean
  order: number
  partner: string
  body: string
}

const blogPosts: BlogPost[] = [
  {
    id: "jaba-rmu",
    title: "RMU Athletics Integrates JABA's AI Platform to Power Next-Generation NIL for Student-Athletes",
    date: "DEC 16, 2025",
    category: "Press Release",
    excerpt: "Robert Morris University (RMU) Athletics announces partnership with JABA to streamline and optimize NIL partnerships for student-athletes.",
    image: "rmu-partnership.jpg",
    slug: "jaba-rmu",
    link: "/blog/jaba-rmu",
    featured: true,
    order: 1,
    partner: "RMU",
    body: "[Full content from RMU press release - to be added]"
  },
  {
    id: "jaba-purdue",
    title: "Purdue Athletics partners with JABA AI to enhance student-athlete branding and NIL opportunities",
    date: "DEC 10, 2025",
    category: "Press Release",
    excerpt: "Purdue Athletics partners with JABA AI to enhance student-athlete branding and NIL opportunities",
    image: "purdue-partnership.jpg",
    slug: "jaba-purdue",
    link: "/blog/jaba-purdue",
    featured: false,
    order: 2,
    partner: "Purdue University",
    body: "[Full content from Purdue press release - to be added]"
  },
  {
    id: "jaba-athletes-unlimited",
    title: "Athletes Unlimited Partners with JABA to Elevate Athlete Branding Across Pro Women's Sports",
    date: "DEC 1, 2025",
    category: "Press Release",
    excerpt: "Athletes Unlimited Partners with JABA to Elevate Athlete Branding Across Pro Women's Sports",
    image: "athletes-unlimited-partnership.jpg",
    slug: "jaba-athletes-unlimited",
    link: "/blog/jaba-athletes-unlimited",
    featured: false,
    order: 3,
    partner: "Athletes Unlimited",
    body: "[Full content from Athletes Unlimited press release - to be added]"
  },
  {
    id: "jaba-baylor",
    title: "Baylor University Partners with JABA to Power Athlete NIL in the Revenue Sharing Era",
    date: "AUG 12, 2025",
    category: "Press Release",
    excerpt: "Baylor University Partners with JABA to Power Athlete NIL in the Revenue Sharing Era",
    image: "baylor-partnership.jpg",
    slug: "jaba-baylor",
    link: "/blog/jaba-baylor",
    featured: false,
    order: 4,
    partner: "Baylor University",
    body: "[Full content from Baylor press release - to be added]"
  }
]

const Blog = () => {
  const heroRef = useRef(null)
  const postsRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true, margin: '-50px' })
  const isPostsInView = useInView(postsRef, { once: true, margin: '-100px' })

  const featuredPost = blogPosts.find(post => post.featured)
  const gridPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="blog-hero"
        initial={{ opacity: 0 }}
        animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="blog-hero-container">
          <motion.div
            className="blog-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="blog-hero-title">JABA News</h1>
            <p className="blog-hero-subtitle">Announcements from JABA and our partners</p>
          </motion.div>

          {/* JABA Character */}
          <motion.div
            className="blog-character"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="character-wave">👋</div>
          </motion.div>
        </div>

        {/* Background Effects */}
        <div className="blog-hero-bg-effects">
          <div className="blog-gradient-1"></div>
          <div className="blog-gradient-2"></div>
        </div>
      </motion.section>

      {/* Blog Posts Section */}
      <section ref={postsRef} className="blog-posts-section">
        <div className="blog-posts-container">
          {/* Featured Post */}
          {featuredPost && (
            <motion.article
              className="blog-card blog-card-featured"
              initial={{ opacity: 0, y: 30 }}
              animate={isPostsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02, boxShadow: '0 20px 50px rgba(255, 255, 0, 0.2)' }}
            >
              <div className="blog-card-image-container">
                <motion.div
                  className="blog-card-image"
                  style={{ backgroundImage: `url(${featuredPost.image})` }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="blog-card-date">{featuredPost.date}</span>
                  <span className="blog-card-category">{featuredPost.category}</span>
                </motion.div>
              </div>

              <div className="blog-card-content">
                <h2 className="blog-card-title">{featuredPost.title}</h2>
                <p className="blog-card-excerpt">{featuredPost.excerpt}</p>
                <motion.button
                  className="blog-card-cta"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  READ MORE →
                </motion.button>
              </div>
            </motion.article>
          )}

          {/* Grid Posts */}
          <div className="blog-grid">
            {gridPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="blog-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isPostsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 50px rgba(255, 255, 0, 0.2)' }}
              >
                <div className="blog-card-image-container">
                  <motion.div
                    className="blog-card-image"
                    style={{ backgroundImage: `url(${post.image})` }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="blog-card-date">{post.date}</span>
                    <span className="blog-card-category">{post.category}</span>
                  </motion.div>
                </div>

                <div className="blog-card-content">
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <motion.button
                    className="blog-card-cta"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    READ MORE →
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog
