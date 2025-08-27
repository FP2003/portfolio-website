"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ARASAKA_ASCII } from '@/constants/ascii-art';

gsap.registerPlugin(useGSAP, ScrambleTextPlugin);

export interface LoginScreenProps {
  passwordText: string;
  showCursor: boolean;
  onProceed?: () => void;
  isLoaded?: boolean;
}

const generateBinaryStream = () => {
  return Array.from({ length: 300 }, () => Math.random() > 0.5 ? '1' : '0').join('');
};

export default function LoginScreen({ passwordText = "NEURAL_LINK_ESTABLISHED", showCursor = true, onProceed }: LoginScreenProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const promptRef = useRef<HTMLSpanElement | null>(null);
  const readyRef = useRef(false);
  
  const [binaryStreams, setBinaryStreams] = useState<string[]>([]);

  useEffect(() => {
    setBinaryStreams(Array.from({ length: 12 }, generateBinaryStream));
    
    const interval = setInterval(() => {
      setBinaryStreams(streams => streams.map(() => generateBinaryStream()));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      const spans = gsap.utils.toArray<HTMLSpanElement>(panel.querySelectorAll("[data-scramble]"));

      if (spans.length === 0) {
        readyRef.current = true;
        return;
      }

      spans.forEach((el) => (el.dataset.original ??= el.textContent || ""));

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        onComplete: () => {
          readyRef.current = true;
          if (promptRef.current) promptRef.current.parentElement?.classList.add("animate-pulse");
        },
      });

      tl.from(containerRef.current, { opacity: 0, y: 8, duration: 0.35, immediateRender: false })
        .from(panelRef.current, { opacity: 0, y: 8, duration: 0.35, immediateRender: false }, "<0.05");

      const randomDelays = spans.map(() => Math.random() * 4);
      const maxDelay = Math.max(...randomDelays);
      
      spans.forEach((span, i) => {
        const target = span.dataset.original!;
        const delay = randomDelays[i];
        
        tl.set(span, { textContent: "▒" }, delay)
          .to(
            span,
            {
              duration: 1.2 + Math.random() * 0.8,
              scrambleText: {
                text: target,
                chars: "█▓▒░<>/|\\_-=+01",
                revealDelay: 0.05 + Math.random() * 0.15,
                speed: 0.6 + Math.random() * 0.4,
              },
            },
            `>${delay}`,
          );
      });
      tl.set({}, {}, `>${maxDelay + 2}`);
    },
    { scope: panelRef },
  );

  const [hasProceeded, setHasProceeded] = useState(false);

  useEffect(() => {
    const proceed = () => {
      if (!readyRef.current || hasProceeded) return;
      setHasProceeded(true);
      if (onProceed) onProceed();
    };

    const onKey = (e: KeyboardEvent) => {
      if (["Shift", "Meta", "Alt", "Control"].includes(e.key)) return;
      proceed();
    };
    const onClick = () => proceed();
    const onTouch = () => proceed();

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    window.addEventListener("touchstart", onTouch, { passive: true });

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("touchstart", onTouch);
    };
  }, [onProceed, hasProceeded]);



  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* ASCII Art Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <pre className="font-mono whitespace-pre animate-wave text-[1rem] transform scale-x-125 scale-y-88 md:scale-x-[0.45] md:scale-y-[0.3] !important" style={{ animation: 'wave 4s ease-in-out infinite, colorShift 3s ease-in-out infinite' }}>
          {ARASAKA_ASCII}
        </pre>
      </div>

      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {binaryStreams.slice(0, 6).map((stream, i) => (
          <div
            key={i}
            className="absolute text-xs font-michroma whitespace-nowrap text-[#FF0000] animate-pulse"
            style={{
              top: `${(i * 15) % 100}%`,
              left: '0%',
              width: '100%',
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            {stream.substring(0, 100)}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-sm font-michroma text-[#FF0000]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            {Array.from({ length: 4 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
          </div>
        ))}
      </div>

      {/* Main content - centered rectangular card */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          ref={containerRef}
          className="text-center select-none relative z-10 w-full max-w-2xl"
          aria-live="polite"
          role="region"
          aria-label="Arasaka login boot panel"
          tabIndex={0}
        >
          <div
            ref={panelRef}
            className="relative border border-red-400/30 bg-black/80 backdrop-blur-sm p-8"
          >
            {/* Horizontal glitch effect overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="w-full h-full bg-gradient-to-r from-[#FF0000]/20 via-transparent to-[#00FFFF]/20 animate-pulse"></div>
            </div>

            {/* Centered title */}
            <div className="text-center mb-8 relative z-10">
              <h1 className="text-2xl font-michroma text-[#FF0000]/50 mb-3">
                <span data-scramble>ARASAKA NEURAL INTERFACE</span>
              </h1>
              <div className="text-[#FF0000]/50 font-michroma text-sm">
                <span data-scramble>[ SECURITY PROTOCOL ACTIVE ]</span>
              </div>
            </div>

            <div className="border-t-1 border-[#FF0000]/50 pt-6 mt-6 relative z-10">
              <div className="text-[#FF0000]/50 mb-4 text-xl text-center font-michroma">
                <span data-scramble>ENTER_PASSWORD</span>
              </div>
              {!hasProceeded && (
                <div className="bg-black/90 p-4 border-1 border-[#FF0000]/50 min-h-[50px] text-[#FF0000]/50 font-bold text-xl font-mono relative overflow-hidden text-center">
                  <div className="absolute inset-0 bg-red-900/10 from-transparent via-[#FF0000]/10 to-transparent"></div>
                  <div className="relative z-10">
                    {passwordText}
                    <span className={`ml-2 transition-opacity ${showCursor ? "opacity-100" : "opacity-0"}`}>▓</span>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center mt-6 relative z-10">
              <div className="text-base text-[#FF0000]/50 mb-4 font-mono">
                <span ref={promptRef} data-scramble>[ PRESS ANY KEY TO INITIALIZE ]</span>
              </div>

              <div className="flex justify-center space-x-6 text-sm font-mono">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#FF0000]/70 animate-pulse"></div>
                  <span className="text-[#FF0000]/50" data-scramble>SECURE</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#FF0000]/70 animate-pulse"></div>
                  <span className="text-[#FF0000]/50" data-scramble>ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}