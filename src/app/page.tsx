"use client"

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

import NavBar from '../components/NavBar'
import LoginScreen from '../components/LoginScreen'
import Footer from '../components/Footer'
import About from '@/components/About'
import Project from '@/components/Project'
import Contact from '@/components/Contact'

export default function FrontPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [passwordText, setPasswordText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [currentPage, setCurrentPage] = useState<string | null>(null)

  const fullPassword = "ARASAKA_NEURAL_LINK_AUTHORIZED"

  // Initial load + check for existing session + blinking cursor
  useEffect(() => {
    setIsLoaded(true)
    
    // Check if user was previously unlocked
    const wasUnlocked = localStorage.getItem('arasaka_unlocked') === 'true'
    if (wasUnlocked) {
      setIsUnlocked(true)
      setPasswordText(fullPassword)
    }
    
    const cursorInterval = setInterval(() => setShowCursor(v => !v), 500)
    return () => clearInterval(cursorInterval)
  }, [])

  // No automatic triggers - user must click the button in LoginScreen

  // Password sequence is now handled by LoginScreen component

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
  }

  const handleLogout = () => {
    setIsUnlocked(false)
    setPasswordText('')
    setCurrentPage(null)
    localStorage.removeItem('arasaka_unlocked')
  }

  const handleProceed = () => {
    setIsUnlocked(true)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return (
          <About onReturn={() => setCurrentPage(null)}/>
        )
      case 'projects':
        return (
          <Project onReturn={() => setCurrentPage(null)} />
        )
      case 'links':
        return (
          <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-red-500"
          >
            <h1 className="text-4xl font-mono mb-4">Links Directory</h1>
            <p>Links page content will go here...</p>
          </motion.div>
        )
      case 'contact':
        return (
          <Contact onReturn={() => setCurrentPage(null)} />
        )
      default:
        return (
          <motion.div
            initial={{ opacity: 0, translateY: 8 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <NavBar onNavigate={handleNavigation} onLogout={handleLogout}/>
          </motion.div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,0,64,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,0,64,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 relative z-10 w-full">
        {!isUnlocked ? (
          <LoginScreen
            passwordText={passwordText}
            showCursor={showCursor}
            onProceed={handleProceed}
          />
        ) : (
          renderCurrentPage()
        )}
      </main>

      {/* Footer - only show when not on NavBar */}
      {(isUnlocked && currentPage) && <Footer />}

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-600/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  )
}