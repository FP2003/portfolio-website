'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Terminal, Code, Filter, X, Link, RefreshCcw } from 'lucide-react'

type ProjectProps = {
  onReturn?: () => void
}

const allProjects = [
  {
    name: 'Credit Scoring Tool',
    description: 'Final project. Modern full-stack next.js project including authentication using Firebase, password and email reset, complete settings panel and secure data storage. Utilised newsAPI to fetch and display news articles with filtering system. Credit Scoring model in Python, inspired by the FICO model, alongside my own touch and incorporating machine learning for prediction.',
    status: 'Dissertation',
    tags: ['TypeScript', 'Next.js', 'React', 'Python', 'Pandas', 'Numpy', 'Scikit-learn']
  },
  {
    name: 'Encryption File System',
    description: 'Development of end-to-end encrypted communication between client and server. Used RSA encryption and decryption to secure the communication. Also used AES encryption and decryption to secure the data. And finally used SHA-256 to hash the data.',
    status: 'Completed',
    url: 'https://github.com/FP2003/Encryption-Decryption-System',
    imageSrc: '/images/arasaka.png',
    tags: ['Java', 'Hashing']
  },
  {
    name: 'AirBnB Price Predictor',
    description: 'Cleaned a dataset with over 65,000 rows and 31 columns, optimising data for model performance, clarity and retainment. Visualised data into appropriate graphs to compile and identify patterns in a 9 page report with reasonings as to why. Tested data with various machine learning models to find optimal accuracy which reached 94% with neural networks. Other machine learning models included: linear regression and xgboost. ',
    status: 'Completed',
    url: 'https://github.com/FP2003/AirBnB-Price-Prediction-System',
    imageSrc: '/images/arasaka.png',
    tags: ['Python', 'Pandas', 'Numpy', 'Scikit-learn', 'TensorFlow']
  },
  {
    name: 'Polling Web App',
    description: 'Full-stack petition application with a secure authentication system, sign-up forms using AJAX and Zod, Google Captcha verification, and a QR code scanner for a unique UD. A intuitive admin and user panel with dynamic information updates, petition creation, signature tracking, and automated petition response handling. Firebase for secure data storage and implemented graph visualisations to track petition and statistics.',
    status: 'Completed',
    url: 'https://github.com/FP2003/Polling-Web-System',
    imageSrc: '/images/arasaka.png',
    tags: ['TypeScript', 'Next.js', 'React']
  }
]

export default function Projects({ onReturn }: ProjectProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [showFilter, setShowFilter] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [typingDone, setTypingDone] = useState(false)
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)

  const headerText = 'PROJECTS'
  const descriptionText = 'A collection of projects I have worked on, including web applications and data analysis tools. Even... some cyber security.'

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < descriptionText.length) {
        setDisplayedText(descriptionText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
        setTimeout(() => setTypingDone(true), 800)
      }
    }, 30)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const cursorTimer = setInterval(() => setShowCursor(v => !v), 500)
    return () => clearInterval(cursorTimer)
  }, [])

  const allTags = [...new Set(allProjects.flatMap(p => p.tags))]

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const filteredProjects = selectedTags.length > 0 
    ? allProjects.filter(p => selectedTags.every(tag => p.tags.includes(tag)))
    : allProjects

  return (
    <div className="min-h-screen bg-black/80 backdrop-blur-sm text-red-500 font-mono p-6 min-w-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.6 }}
          className="border border-red-400/30 bg-black/80 mb-6"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-red-400/30 bg-red-900/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 animate-pulse"></div>
              <Terminal className="w-4 h-4" />
              <span className="text-sm">/projects/all.dat</span>
            </div>
            <div className="text-xs text-red-400">
                2025
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

          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <Code className="w-6 h-6 text-red-400" />
                    <h1 className="text-2xl font-bold text-red-400">
                        {headerText}
                    </h1>
                </div>
                <div className="relative z-10">
                    <button 
                        onClick={() => setShowFilter(!showFilter)}
                        className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20 px-3 py-1 rounded border border-red-400/50 transition-colors font-mono"
                    >
                        <Filter className="w-4 h-4" />
                        <span>Filter by Tag</span>
                    </button>
                    {showFilter && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute right-0 mt-2 w-48 bg-black border border-red-400/30 p-4"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-sm font-bold">Filter Tags</h3>
                                <button onClick={() => setShowFilter(false)}><X className="w-4 h-4" /></button>
                            </div>
                            <div className="space-y-2">
                                {allTags.map(tag => (
                                    <label key={tag} className="flex items-center gap-2 text-sm cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedTags.includes(tag)}
                                            onChange={() => handleTagToggle(tag)}
                                            className="form-checkbox bg-black border-red-400/50 text-red-500 focus:ring-red-500/50"
                                        />
                                        <span>{tag}</span>
                                    </label>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
            
            <div className="text-red-500">
                <span className="text-red-400"></span>~$ ls -l projects/
            </div>
            <div className="text-gray-300 min-h-[60px] pl-4 border-l-2 border-red-500/30 mt-2">
              {displayedText}
              {!typingDone && (
                <span className={showCursor ? 'opacity-100' : 'opacity-0'}>█</span>
              )}
            </div>
          </div>
        </motion.div>

        {typingDone && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="relative min-h-[400px]"
              style={{ perspective: '1000px' }}
            >
              <div
                className="relative w-full h-full border border-red-400/30 bg-black/80"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s',
                  transform: flippedIndex === index ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 flex flex-col"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="flex items-center justify-between px-4 py-2 border-b border-red-400/30 bg-red-900/10">
                    <div className="flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        <span className="text-sm font-semibold">{project.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className={`text-xs px-2 py-1 border ${project.status === 'Active' ? 'border-green-500/50 text-green-400' : project.status === 'Completed' ? 'border-blue-500/50 text-blue-400' : project.status === 'Dissertation' ? 'border-purple-500/50 text-purple-400' : 'border-gray-500/50 text-gray-400'}`}>
                            {project.status}
                        </div>
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors">
                            <Link className="w-3 h-3" />
                            <span>View</span>
                          </a>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setFlippedIndex(flippedIndex === index ? null : index)
                          }}
                          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors border border-red-400/50 px-2 py-1 rounded"
                        >
                          <RefreshCcw className="w-3 h-3" />
                        </button>
                    </div>
                  </div>

                  <div className="px-6 pt-4 pb-6 space-y-2 flex-1 flex flex-col">
                    <div>
                        <h4 className="text-red-400/30 mb-2">Project Info</h4>
                        <p className="text-gray-300 text-sm leading-relaxed break-words">{project.description}</p>
                    </div>

                    <div className="mt-auto">
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-xs bg-red-900/30 border border-red-400/30 px-3 py-1 text-red-300">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-red-400/30 bg-red-900/10">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        <span className="text-sm font-semibold">{project.name} — Image</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setFlippedIndex(flippedIndex === index ? null : index)
                        }}
                        className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors border border-red-400/50 px-2 py-1 rounded"
                      >
                        <RefreshCcw className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex-1 bg-black/60 flex items-center justify-center p-4">
                      {project.imageSrc ? (
                        <img src={project.imageSrc} alt={`${project.name} preview`} className="max-h-full max-w-full object-contain border border-red-400/20" />
                      ) : (
                        <div className="text-gray-400 text-sm">No preview available</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </div>
  )
}