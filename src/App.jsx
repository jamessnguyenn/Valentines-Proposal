import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

function App() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [noClicks, setNoClicks] = useState(0)
  const [noScale, setNoScale] = useState(1)
  const [photoIndex, setPhotoIndex] = useState(0)

  const photos = [
    '/couplephoto.jpeg',
    '/couplephoto-1.JPG',
    '/couplephoto-2.JPG',
    '/couplephoto-3.JPG'
  ]

  useEffect(() => {
    if (!envelopeOpen) return
    
    const interval = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % photos.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [envelopeOpen, photos.length])

  const noMessages = [
    "I think you made a mistake! 😊",
    "Try again haha 😄",
    "Wrong button! 💕",
    "Come on, you know the answer! 🥰",
    "Don't be shy! 💞",
    "Yes is right there! 👇",
    "Pretty please? 🥺",
    "You're breaking my heart! 💔"
  ]

  const handleEnvelopeClick = () => {
    setEnvelopeOpen(true)
  }

  const handleYes = () => {
    setAnswered(true)
  }

  const handleNoClick = (e) => {
    e.preventDefault()
    const newClicks = noClicks + 1
    setNoClicks(newClicks)
    setNoScale(Math.max(0, 1 - newClicks * 0.12))
  }

  return (
    <div className="app-container">
      {/* Background with decorative elements */}
      <div className="background-decoration">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Flying Hearts Background Animation */}
      <div className="flying-hearts-bg">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="flying-heart-bg"
            initial={{ y: '100vh', x: Math.random() * 100 - 50, opacity: 0 }}
            animate={{
              y: '-100vh',
              x: Math.random() * 200 - 100,
              opacity: [0, 0.4, 0.4, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* Character Decorations */}
      <motion.div className="character-left">
        <img src="/cinnamoroll.png" alt="Cinnamoroll" />
      </motion.div>
      <motion.div className="character-right">
        <img src="/miffy.png" alt="Miffy" />
      </motion.div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!envelopeOpen ? (
          <motion.div
            key="envelope"
            className="main-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <motion.div
              className="envelope-container"
              onClick={handleEnvelopeClick}
              whileHover={{ y: -12 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="envelope-container">
                <div className="envelope">
                  {/* Back fold half */}
                  <div className="envelope-back"></div>
                  {/* Front fold half */}
                  <div className="envelope-front">
                    <p className="letter-text">To: Tiffany Pham</p>
                  </div>
                  {/* Fold line in center */}
                  <div className="fold-line"></div>
                  {/* Wax seal on top */}
                  <img 
                    className="wax-seal" 
                    src="/wax-seal.png" 
                    alt="Wax Seal"
                  />
                </div>
              </div>
            </motion.div>

            <motion.p
              className="cta-text"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Click to open 💌
            </motion.p>
          </motion.div>
        ) : !answered ? (
          <motion.div
            key="proposal"
            className="main-section"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="proposal-card">
              <div className="card-decoration top-left"></div>
              <div className="card-decoration bottom-right"></div>

              <motion.h1
                className="proposal-heading"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                Tiffany, will you be my valentine?
              </motion.h1>

              {/* Couple Photo in Heart Shape */}
              <motion.div
                className="heart-photo-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="heart-shape">
                  <img
                    src={photos[photoIndex]}
                    alt="Our moment"
                    className="couple-photo"
                  />
                </div>
              </motion.div>

              <AnimatePresence>
                {noClicks > 0 && (
                  <motion.div
                    className="message-box"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <p className="no-message">
                      {noMessages[Math.min(noClicks - 1, noMessages.length - 1)]}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="buttons-container">
                <motion.button
                  className="yes-btn"
                  onClick={handleYes}
                  whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(255, 20, 147, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="btn-emoji">💕</span>
                  <span className="btn-text">Yes</span>
                  <span className="btn-emoji">💕</span>
                </motion.button>

                {noScale > 0 && (
                  <motion.button
                    className="no-btn"
                    onClick={handleNoClick}
                    style={{
                      transform: `scale(${noScale})`,
                      opacity: noScale
                    }}
                    whileHover={{
                      backgroundColor: noScale > 0.3 ? '#c0c0c0' : '#e8e8e8'
                    }}
                  >
                    No
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            className="main-section"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          >
            {/* Heart Confetti from multiple positions */}
            <div className="confetti-container">
              {[...Array(40)].map((_, i) => {
                const startX = i % 2 === 0 ? Math.random() * 300 - 150 : Math.random() * 300 + 150
                const startY = Math.random() * 200 - 100
                return (
                  <motion.div
                    key={i}
                    className={`confetti-heart heart-${i % 5}`}
                    initial={{
                      x: startX,
                      y: startY,
                      scale: 1,
                      opacity: 1,
                      rotate: 0
                    }}
                    animate={{
                      x: (Math.random() - 0.5) * 500,
                      y: Math.random() * 500 + 150,
                      scale: Math.random() * 0.3,
                      opacity: 0,
                      rotate: Math.random() * 720 - 360
                    }}
                    transition={{
                      duration: 2.5 + Math.random() * 1.5,
                      delay: i * 0.03,
                      ease: 'easeOut'
                    }}
                  >
                    ♥
                  </motion.div>
                )
              })}
            </div>

            <div className="success-card">
              <motion.h1
                className="success-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                I knew you'd say yes!
              </motion.h1>

              <motion.div
                className="success-celebration"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <motion.p
                  className="success-date"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  See you on the 14th 💕
                </motion.p>
              </motion.div>

              <motion.div
                className="celebration-emoji-container"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <span className="celebration-emoji">💕</span>
                <span className="celebration-emoji">👩‍❤️‍💋‍👨 </span>
                <span className="celebration-emoji">💕</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
