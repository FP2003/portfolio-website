"use client"

import { useState } from 'react'
import { ChevronRight, Folder, FolderOpen, Terminal, User, Briefcase, Mail } from 'lucide-react'

export interface NavBarProps {
    onNavigate?: (page: string) => void
    onLogout?: () => void
}

export default function NavBar({ onNavigate, onLogout }: NavBarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [activeItem, setActiveItem] = useState<string | null>(null)

  const directories = [
    { name: 'about', label: 'About', icon: User, path: '/about' },
    { name: 'projects', label: 'Projects', icon: Briefcase, path: '/projects' },
    { name: 'contact', label: 'Contact', icon: Mail, path: '/contact' }
  ]

  const handleDirectoryClick = (directory: typeof directories[0]) => {
    setActiveItem(directory.name)
    onNavigate?.(directory.name)
  }

  return (
    <div className="h-screen flex flex-col bg-black text-red-500 font-mono p-6">
      {/* Terminal Header */}
      <div className="flex flex-col flex-1 border border-red-400/30 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-2 border-b border-red-400/30 bg-red-900/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 animate-pulse"></div>
            <Terminal className="w-4 h-4" />
            <span className="text-sm">root@arasaka-system:/home/user$</span>
          </div>
          
          {/* Logout Button - Top Right */}
          {onLogout && (
            <button
              onClick={onLogout}
              data-logout-action
              className="text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20 px-3 py-1 rounded border border-red-400/50 transition-colors font-mono"
            >
              [LOGOUT]
            </button>
          )}
        </div>
        
        {/* Main Content Area - Takes remaining space */}
        <div className="flex-1 flex flex-col">
          {/* Terminal Content - Scrollable */}
          <div className="flex-1 p-6 space-y-2 overflow-auto">
            {/* Welcome Message */}
            <div className="space-y-2">
              <div className="text-red-500">
                <span className="text-red-400">user@arasaka-system</span>:~$ ls -la
              </div>
              <div className="text-gray-400 text-sm">
                total 4<br/>
                drwxr-xr-x 6 user user 4096 Aug 04 2025 .<br/>
                drwxr-xr-x 3 root root 4096 Aug 04 2025 ..<br/>
              </div>
            </div>

            {/* Directory Listing */}
            <div className="space-y-2">
              {directories.map((directory) => {
                const IconComponent = directory.icon
                const isHovered = hoveredItem === directory.name
                const isActive = activeItem === directory.name
                
                return (
                  <button
                    key={directory.name}
                    onClick={() => handleDirectoryClick(directory)}
                    onMouseEnter={() => setHoveredItem(directory.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`
                      w-full text-left transition-all duration-200 group
                      ${isActive ? 'text-red-400' : 'text-red-500'}
                      ${isHovered ? 'bg-red-500/20 pl-2' : ''}
                      hover:text-red-300 py-1 rounded
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">drwxr-xr-x</span>
                        <span className="text-gray-500">2</span>
                        <span className="text-gray-500">user</span>
                        <span className="text-gray-500">user</span>
                        <span className="text-gray-500">4096</span>
                        <span className="text-gray-500">Aug 04</span>
                        <span className="text-gray-500">12:00</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {isHovered || isActive ? (
                          <FolderOpen className="w-4 h-4 text-red-400" />
                        ) : (
                          <Folder className="w-4 h-4 text-red-600" />
                        )}
                        <span className="font-semibold">{directory.name}/</span>
                        <IconComponent className="w-3 h-3 opacity-60" />
                      </div>

                      {isHovered && (
                        <ChevronRight className="w-4 h-4 ml-auto animate-pulse" />
                      )}
                    </div>

                    {/* Hover Description */}
                    {isHovered && (
                      <div className="ml-8 mt-1 text-xs text-gray-400 italic">
                        Access {directory.label.toLowerCase()} directory
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

          </div>

          {/* Command Prompt - Above System Info */}
          <div className="border-t border-red-400/20 p-4 bg-black/30">
            <div className="flex items-center gap-2">
              <span className="text-red-500">user@arasaka-system</span>
              <span className="text-red-500">:</span>
              <span className="text-red-400">~</span>
              <span className="text-red-500">$</span>
              <span className="animate-pulse">_</span>
            </div>
          </div>

          {/* System Info Footer - Sticks to bottom */}
          <div className="border-t border-green-400/10 p-4 text-xs text-gray-600 space-y-1 bg-black/50">
            <div>System: Arasaka OS v2.1.7</div>
            <div>Access Level: AUTHENTICATED</div>
            <div>Session: {new Date().toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}