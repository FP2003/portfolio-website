"use client"
import { useState, useEffect } from 'react';

export default function FrontPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const fullPassword = "ARASAKA_NEURAL_LINK_AUTHORIZED";

  useEffect(() => {
    setIsLoaded(true);
    
    // Update time every second
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false,
        timeZone: 'UTC'
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  // Handle any key press to start password sequence
  useEffect(() => {
    const handleKeyPress = (event: { preventDefault: () => void; }) => {
      if (!isUnlocked && isLoaded) {
        event.preventDefault();
        startPasswordSequence();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleKeyPress);
    };
  }, [isUnlocked, isLoaded]);

  const startPasswordSequence = () => {
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex < fullPassword.length) {
        setPasswordText(fullPassword.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setIsUnlocked(true);
        }, 1000);
      }
    }, 80);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(255,0,64,0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,0,64,0.1) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 border-b border-red-900/30">
        <div className="flex items-center space-x-4">
          <div className="w-6 h-6">
            <img src="/ArasakaLogoResources/Thumbnails-112.png" alt='arasaka'/>
          </div>
          <span className="text-xl font-mono tracking-wider">ARASAKA CORP</span>
        </div>
        
        <div className="text-sm font-mono text-gray-400">
          UTC {currentTime}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-6">
        
        {!isUnlocked ? (
          /* Password/Login Screen */
          <div className={`text-center transition-all duration-1000 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            
            {/* Login Terminal */}
            <div className="bg-black/80 border-2 border-red-600/50 p-8 min-w-2xl max-w-3xl w-full backdrop-blur-sm">
              <div className="text-left font-mono text-sm mb-6">
                <div className="text-red-500 mb-2">&gt; ARASAKA SECURITY PROTOCOL ACTIVE</div>
                <div className="text-gray-400 mb-2">&gt; Neural interface detected...</div>
                <div className="text-gray-400 mb-4">&gt; Awaiting authorization...</div>
                
                <div className="border-t border-red-600/30 pt-4">
                  <div className="text-white mb-2">ENTER_PASSWORD: </div>
                  <div className="bg-black/60 p-3 border border-red-600/30 min-h-[40px] text-red-400">
                    {passwordText}
                    <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                      ▓
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-4 animate-pulse">
                  [ PRESS ANY KEY TO INITIALIZE ]
                </div>
                
                {/* Status indicators */}
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
          </div>
        ) : (
          /* Main Portfolio Content */
          <div className={`text-center transition-all duration-1000 ${
            isUnlocked ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            
            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 relative">
              <span className="bg-gradient-to-r from-white via-red-200 to-red-600 bg-clip-text text-transparent">
                FILIP PIELECKI
              </span>
              <br />
              <span className="text-red-500"></span>
              
              {/* Glitch effect overlay */}
              <div className="absolute inset-0 animate-pulse opacity-20">
                <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                  FILIP PIELECKI
                </span>
              </div>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-mono tracking-wide">
              PORTFOLIO_SYSTEM.EXE
            </p>

            {/* Status indicator */}
            <div className="flex items-center justify-center space-x-3 mb-12">
              <div className="w-3 h-3 bg-red-500 animate-pulse"></div>
              <span className="text-sm font-mono text-gray-400 uppercase tracking-widest">
                System Online
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-8 py-3 bg-transparent border-2 border-red-600 text-red-500 font-mono uppercase tracking-wider hover:bg-red-600 hover:text-black transition-all duration-300 relative overflow-hidden">
                <span className="relative z-10">Initialize Connection</span>
                <div className="absolute inset-0 bg-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>
              
              <button className="group px-8 py-3 bg-transparent border border-gray-600 text-gray-300 font-mono uppercase tracking-wider hover:border-white hover:text-white transition-all duration-300">
                Access Archives
              </button>
            </div>
          </div>
        )}

        {/* Floating elements - only show when unlocked */}
        {isUnlocked && (
          <>
            <div className="absolute top-1/4 left-10 text-xs font-mono text-red-500/50 animate-pulse">
              &gt; neural_link_established
            </div>
            <div className="absolute bottom-1/4 right-10 text-xs font-mono text-red-500/50 animate-pulse delay-1000">
              &gt; scanning_credentials...
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center p-6 border-t border-red-900/30">
        <p className="text-xs font-mono text-gray-500 tracking-widest">
          ARASAKA CORPORATION © 2077 | PORTFOLIO INSPIRED BY CYBERPUNK
        </p>
      </footer>

      {/* Ambient glow effects */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
}