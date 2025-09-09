'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Terminal, Code, GitBranch, Star, Eye, Filter, X, Link } from 'lucide-react'

type ProjectProps = {
  onReturn?: () => void
}

const allProjects = [
  {
    name: 'Project Alpha',
    description: 'A cutting-edge web application built with Next.js and TypeScript for a seamless user experience.',
    status: 'Active',
    url: 'https://github.com/user/project-alpha',
    tags: ['TypeScript', 'Next.js', 'React']
  },
  {
    name: 'Project Beta',
    description: 'A data analysis tool using Python and Pandas to process large datasets efficiently.',
    status: 'Completed',
    url: 'https://github.com/user/project-beta',
    tags: ['Python', 'Pandas']
  },
  {
    name: 'Project Gamma',
    description: 'A mobile app developed with React Native for cross-platform compatibility on iOS and Android.',
    status: 'Active',
    url: 'https://github.com/user/project-gamma',
    tags: ['React Native', 'JavaScript']
  },
  {
    name: 'Project Delta',
    description: 'A backend service built with Node.js and Express, providing a RESTful API for data management.',
    status: 'Active',
    url: 'https://github.com/user/project-delta',
    tags: ['Node.js', 'Express', 'JavaScript']
  }
]

export default function Projects({ onReturn }: ProjectProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const headerText = 'PROJECT PORTFOLIO'

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < headerText.length) {
        setDisplayedText(headerText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
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
              <span className="text-sm">arasaka-projects-db://projects/all.dat</span>
            </div>
            <div className="text-xs text-red-400">
                CLASSIFIED - LEVEL 5
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
                        {displayedText}
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
                <span className="text-red-400">system@arasaka</span>:~$ ls -l projects/
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="border border-red-400/30 bg-black/80 flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-2 border-b border-red-400/30 bg-red-900/10">
                <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    <span className="text-sm font-semibold">{project.name}</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className={`text-xs px-2 py-1 border ${project.status === 'Active' ? 'border-green-500/50 text-green-400' : 'border-gray-500/50 text-gray-400'}`}>
                        {project.status}
                    </div>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors">
                      <Link className="w-3 h-3" />
                      <span>View</span>
                    </a>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col">
                <div>
                    <h4 className="text-red-400 font-bold mb-2">Description</h4>
                    <p className="text-gray-300 text-sm h-20">{project.description}</p>
                </div>

                <div>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-xs bg-red-900/30 border border-red-400/30 px-2 py-1 text-red-300">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}