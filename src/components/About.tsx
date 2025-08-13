"use client"

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Terminal, User, Code, Brain, Shield, Database, Cpu, Network } from 'lucide-react'

type AboutProps = {
  onReturn?: () => void
}

export default function About({onReturn}: AboutProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentSection, setCurrentSection] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  const bioText = "Neural interface specialist with extensive experience in cybersecurity and systems architecture. Authorized for Level-7 clearance operations across multiple corporate networks."

  // Typing effect for bio
  useEffect(() => {
    if (currentSection === 0) {
      let i = 0
      const timer = setInterval(() => {
        if (i < bioText.length) {
          setDisplayedText(bioText.slice(0, i + 1))
          i++
        } else {
          clearInterval(timer)
          setTimeout(() => setCurrentSection(1), 800)
        }
      }, 30)
      return () => clearInterval(timer)
    }
  }, [currentSection])

  // Cursor blink
  useEffect(() => {
    const cursorTimer = setInterval(() => setShowCursor(v => !v), 500)
    return () => clearInterval(cursorTimer)
  }, [])

  const skills = [
    { name: 'Neural Networks', level: 95, category: 'AI/ML' },
    { name: 'Cybersecurity', level: 88, category: 'Security' },
    { name: 'React/Next.js', level: 92, category: 'Frontend' },
    { name: 'Node.js/Python', level: 89, category: 'Backend' },
    { name: 'Database Systems', level: 85, category: 'Data' },
    { name: 'Cloud Architecture', level: 87, category: 'Infrastructure' }
  ]

  const experience = [
    {
      title: 'Senior Systems Architect',
      company: 'Arasaka Corporation',
      period: '2023 - Present',
      clearance: 'Level-7',
      duties: ['Neural interface development', 'Security protocol implementation', 'System optimization']
    },
    {
      title: 'Lead Developer',
      company: 'Netrunner Solutions',
      period: '2021 - 2023',
      clearance: 'Level-5',
      duties: ['Full-stack development', 'Team leadership', 'Client consultation']
    }
  ]

  return (
    <div className="min-h-screen bg-black text-red-500 font-mono p-6 min-w-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header Terminal */}
        <motion.div
          initial={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.6 }}
          className="border border-red-400/30 bg-black/80 backdrop-blur-sm mb-6"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-red-400/30 bg-red-900/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 animate-pulse"></div>
              <Terminal className="w-4 h-4" />
              <span className="text-sm">arasaka-personnel-file://user/profile.dat</span>
            </div>
            <div className="text-xs text-red-400">
                CLASSIFIED - LEVEL 7
                {onReturn && (
                <button
                  onClick={onReturn}
                  data-return-action
                  className="text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20 px-3 py-1 rounded border border-red-400/50 transition-colors font-mono ml-4"
                >
                  [RETURN]
                </button>
              )}
            </div>
          </div>

          {/* Bio Section */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-red-400" />
              <h1 className="text-2xl font-bold text-red-400">PERSONNEL PROFILE - FILIP PIELECKI</h1>
            </div>
            
            <div className="space-y-2">
              <div className="text-red-500">
                <span className="text-red-400">system@arasaka</span>:~$ cat personal_bio.txt
              </div>
              <div className="text-gray-300 min-h-[60px] pl-4 border-l-2 border-red-500/30">
                {displayedText}
                {currentSection === 0 && <span className={showCursor ? 'opacity-100' : 'opacity-0'}>█</span>}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills Matrix */}
        {currentSection >= 1 && (
          <motion.div
            initial={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border border-red-400/30 bg-black/80 backdrop-blur-sm mb-6"
          >
            <div className="flex items-center px-4 py-2 border-b border-red-400/30 bg-red-900/10">
              <Brain className="w-4 h-4 mr-2" />
              <span className="text-sm">NEURAL SKILL MATRIX</span>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: '100%' }}
                    transition={{ duration: 0.8, delay: 0.1 * index }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-red-400 text-sm">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{skill.category}</span>
                        <span className="text-red-300 text-xs">{skill.level}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-800 rounded-none h-2 border border-red-500/20">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.2, delay: 0.2 * index }}
                        className="h-full bg-gradient-to-r from-red-600 to-red-400"
                        style={{
                          boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)'
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Experience Log */}
        {currentSection >= 1 && (
          <motion.div
            initial={{ opacity: 0, translateX: 20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border border-red-400/30 bg-black/80 backdrop-blur-sm mb-6"
          >
            <div className="flex items-center px-4 py-2 border-b border-red-400/30 bg-red-900/10">
              <Database className="w-4 h-4 mr-2" />
              <span className="text-sm">EMPLOYMENT HISTORY</span>
            </div>

            <div className="p-6 space-y-6">
              {experience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  className="border-l-4 border-red-500/30 pl-6 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-red-400 font-semibold">{job.title}</h3>
                      <p className="text-red-300">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-400 text-sm">{job.period}</div>
                      <div className="text-red-500 text-xs border border-red-500/50 px-2 py-1 mt-1">
                        {job.clearance}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    {job.duties.map((duty, dutyIndex) => (
                      <div key={dutyIndex} className="flex items-center gap-2 text-gray-300 text-sm">
                        <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                        {duty}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* System Specs */}
        {currentSection >= 1 && (
          <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="border border-red-400/30 bg-black/80 backdrop-blur-sm"
          >
            <div className="flex items-center px-4 py-2 border-b border-red-400/30 bg-red-900/10">
              <Cpu className="w-4 h-4 mr-2" />
              <span className="text-sm">SYSTEM SPECIFICATIONS</span>
            </div>

            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { icon: Shield, label: 'Security Rating', value: 'AAA+' },
                { icon: Network, label: 'Network Access', value: 'Global' },
                { icon: Code, label: 'Code Quality', value: '99.7%' },
                { icon: Brain, label: 'AI Integration', value: 'Active' }
              ].map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="border border-red-500/20 p-4 bg-red-900/5 hover:bg-red-900/10 transition-colors"
                >
                  <spec.icon className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <div className="text-xs text-gray-400 mb-1">{spec.label}</div>
                  <div className="text-red-300 font-semibold">{spec.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>)}
      </div>
    </div>
  )
}
