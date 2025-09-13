"use client";

import { useEffect, useState } from "react";
import { motion } from 'motion/react';
import { Terminal, Shield, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export interface LoginScreenProps {
  passwordText: string;
  showCursor: boolean;
  onProceed?: () => void;
}

const generateBinaryStream = () => {
  return Array.from({ length: 200 }, () => Math.random() > 0.5 ? '1' : '0').join('');
};

export default function LoginScreen({ passwordText = "ARASAKA_NEURAL_LINK_AUTHORIZED", showCursor = true, onProceed }: LoginScreenProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [isInitializing, setIsInitializing] = useState(false);
  const [binaryStreams, setBinaryStreams] = useState<string[]>([]);

  // Load visitor count from localStorage
  useEffect(() => {
    const savedCount = localStorage.getItem('arasaka_visitor_count');
    if (savedCount) {
      setVisitorCount(parseInt(savedCount, 10));
    }
  }, []);

  // Generate binary streams
  useEffect(() => {
    setBinaryStreams(Array.from({ length: 8 }, generateBinaryStream));
    
    const interval = setInterval(() => {
      setBinaryStreams(streams => streams.map(() => generateBinaryStream()));
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  // Typing effect for password - starts automatically when component loads
  useEffect(() => {
    setDisplayedText('') // Reset displayed text
    setTypingDone(false) // Reset typing done state
    
    let i = 0
    const timer = setInterval(() => {
      if (i < passwordText.length) {
        setDisplayedText(passwordText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
        setTimeout(() => setTypingDone(true), 800)
      }
    }, 80)
    return () => clearInterval(timer)
  }, [passwordText])

  const handleInitialize = () => {
    if (isInitializing) return;
    
    setIsInitializing(true);
    
    // Increment visitor count
    const newCount = visitorCount + 1;
    setVisitorCount(newCount);
    localStorage.setItem('arasaka_visitor_count', newCount.toString());
    
    // Simulate initialization delay and unlock
    setTimeout(() => {
      // Save unlocked state to localStorage
      localStorage.setItem('arasaka_unlocked', 'true');
      if (onProceed) onProceed();
    }, 1500);
  };

  const systemInfo = [
    { label: 'Developer', value: 'Filip Pielecki' },
    { label: 'Portfolio', value: 'v2.1.7' },
    { label: 'Status', value: 'Online' },
    { label: 'Access', value: 'Public' }
  ];

  return (
    <div className="min-h-screen bg-black text-red-500 font-mono overflow-hidden relative">
      {/* Background Grid */}
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

      {/* Subtle Binary Effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {binaryStreams.slice(0, 3).map((stream, i) => (
          <div
            key={i}
            className="absolute text-xs font-mono whitespace-nowrap text-red-500"
            style={{
              top: `${(i * 30) % 100}%`,
              left: '0%',
              width: '100%',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            {stream.substring(0, 60)}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="max-w-4xl mx-auto w-full">
          {/* Header Terminal */}
          <motion.div
            initial={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.8 }}
            className="border border-red-400/30 bg-black/80 backdrop-blur-sm mb-6"
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-red-400/30 bg-red-900/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 animate-pulse"></div>
                <Terminal className="w-4 h-4" />
                <span className="text-sm">filip-portfolio://welcome/access.dat</span>
              </div>
              <div className="text-xs text-red-400">
                PORTFOLIO ACCESS
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-red-400" />
                <h1 className="text-3xl font-bold text-red-400">WELCOME TO MY PORTFOLIO V1</h1>
              </div>
              
              <div className="mb-2">
                <div className="text-red-500">
                  <span className="text-red-500/60 font-bold text-[20px]">PASSWORD</span>
                </div>
              </div>

              {/* Access Key Display */}
              <div className="space-y-2 mb-6">
                <div className="bg-black/90 p-4 border border-red-400/30 min-h-[50px] text-red-300 font-mono text-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-900/10 to-transparent animate-pulse"></div>
                  <div className="relative z-10 flex items-center gap-2">
                    {showPassword ? (
                      <span>{displayedText}</span>
                    ) : (
                      <span>{'█'.repeat(displayedText.length)}</span>
                    )}
                    {typingDone && (
                      <span className={showCursor ? 'opacity-100' : 'opacity-0'}>█</span>
                    )}
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="ml-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* System Status */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {systemInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="border border-red-500/20 p-3 bg-red-900/5 text-center"
                  >
                    <div className="text-xs text-gray-500 mb-1">{info.label}</div>
                    <div className="text-red-300 text-sm font-semibold">{info.value}</div>
                  </motion.div>
                ))}
              </div>

              {/* Initialize Button */}
              {typingDone && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center"
                >
                  <button
                    onClick={handleInitialize}
                    disabled={isInitializing}
                    className={`flex items-center gap-3 px-8 py-3 border transition-all duration-200 font-mono text-sm mx-auto ${
                      isInitializing
                        ? 'border-gray-500 text-gray-500 cursor-not-allowed'
                        : 'border-red-400 text-red-400 hover:bg-red-900/20 hover:text-red-300 hover:border-red-300'
                    }`}
                  >
                    {isInitializing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                        LOADING...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        ENTER PORTFOLIO
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.div>
              )}

              {/* Instructions */}
              {typingDone && !isInitializing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-center mt-4"
                >
                  <div className="text-xs text-gray-500">
                    Click to access my portfolio
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Footer with Visitor Counter */}
          <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border border-red-400/30 bg-black/80 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-red-400/30 bg-red-900/10">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span className="text-sm">PORTFOLIO STATS</span>
              </div>
              <div className="text-xs text-red-400">
                {new Date().toLocaleString()}
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Visitors</div>
                  <div className="text-red-400 font-bold text-lg">{visitorCount}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Status</div>
                  <div className="text-green-400 font-bold text-lg">ONLINE</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Last Updated</div>
                  <div className="text-blue-400 font-bold text-lg">2025</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}