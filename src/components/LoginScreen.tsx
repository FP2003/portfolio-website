"use client"

import { motion } from 'motion/react'

export interface LoginScreenProps {
  isLoaded: boolean
  passwordText: string
  showCursor: boolean
}

export default function LoginScreen({
  isLoaded,
  passwordText,
  showCursor,
}: LoginScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 8 }}
      animate={
        isLoaded
          ? { opacity: 1, translateY: 0 }
          : { opacity: 0, translateY: 8 }
      }
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <div className="bg-black/80 border-2 border-red-600/50 p-8 max-w-3xl min-w-2xl w-full backdrop-blur-sm">
        <div className="font-mono text-sm text-left mb-6">
          <div className="text-red-500">&gt; ARASAKA SECURITY PROTOCOL ACTIVE</div>
          <div className="text-gray-400">&gt; Neural interface detected...</div>
          <div className="text-gray-400">&gt; Awaiting authorization...</div>
          <div className="border-t border-red-600/30 pt-4 mt-2">
            <div className="text-white mb-2">ENTER_PASSWORD:</div>
            <div className="bg-black/60 p-3 border border-red-600/30 min-h-[40px] text-red-400 font-bold">
              {passwordText}
              <span
                className={`ml-1 transition-opacity ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                }`}
              >
                ▓
              </span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-xs text-gray-500 mb-4 animate-pulse">
            [ PRESS ANY KEY TO INITIALIZE ]
          </div>
          <div className="flex justify-center space-x-6 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 animate-pulse"></div>
              <span className="text-red-400">SECURE</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 animate-pulse"></div>
              <span className="text-yellow-400">ENCRYPTED</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 animate-pulse"></div>
              <span className="text-green-400">ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
