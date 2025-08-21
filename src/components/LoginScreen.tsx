"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(useGSAP, ScrambleTextPlugin);

export interface LoginScreenProps {
  passwordText: string;
  showCursor: boolean;
  onProceed?: () => void;
  isLoaded?: boolean;
}

export default function LoginScreen({ passwordText, showCursor, onProceed }: LoginScreenProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const promptRef = useRef<HTMLSpanElement | null>(null);

  const readyRef = useRef(false);

  // Build the startup scramble that runs immediately on mount.
  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      // Collect all spans marked for scrambling (including the prompt)
      const spans = gsap.utils.toArray<HTMLSpanElement>(panel.querySelectorAll("[data-scramble]"));

      if (spans.length === 0) {
        // Nothing to animate; enable proceed immediately.
        readyRef.current = true;
        return;
      }

      // Cache original text and ensure each span has a target
      spans.forEach((el) => (el.dataset.original ??= el.textContent || ""));

      // Total runtime target ≈ 5s: compute stagger to fit
      const total = 5; // seconds (between 4–6 as requested)
      const per = 1.2; // duration per element
      const n = spans.length;
      const stagger = n > 1 ? Math.max(0.05, (total - per) / (n - 1)) : 0;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        onComplete: () => {
          // Scramble finished — allow user to proceed
          readyRef.current = true;
          // Add a subtle pulse to the prompt to signal readiness (optional)
          if (promptRef.current) promptRef.current.parentElement?.classList.add("animate-pulse");
        },
      });

      // Fade the block in quickly so there’s no flash
      tl.from(containerRef.current, { opacity: 0, y: 8, duration: 0.35, immediateRender: false })
        .from(panelRef.current, { opacity: 0, y: 8, duration: 0.35, immediateRender: false }, "<0.05");

      // Scramble each span to its own original text with a controlled stagger
      spans.forEach((span, i) => {
        const target = span.dataset.original!;
        tl.set(span, { textContent: "..." }, i === 0 ? ">-0.05" : `>+${stagger - 0.05}`)
          .to(
            span,
            {
              duration: per,
              scrambleText: {
                text: target,
                chars: "█▓▒░<>/|\\_-=+01",
                revealDelay: 0.1,
                speed: 0.8,
              },
            },
            ">",
          );
      });
    },
    { scope: panelRef },
  );

  // Gate the "press any key/click/tap" until scramble completes.
  useEffect(() => {
    const proceed = () => {
      if (!readyRef.current) return; // ignore input until scramble finished
      if (onProceed) onProceed();
    };

    const onKey = (e: KeyboardEvent) => {
      if (!readyRef.current) return;
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
  }, [onProceed]);

  return (
    <div
      ref={containerRef}
      className="text-center select-none"
      aria-live="polite"
      role="region"
      aria-label="Arasaka login boot panel"
      tabIndex={0}
    >
      <div
        ref={panelRef}
        className="relative mx-auto bg-black/80 border-2 border-red-600/50 p-8 max-w-3xl min-w-2xl w-full backdrop-blur-sm"
      >
        <div className="font-mono text-sm text-left mb-6 space-y-1">
          <div className="text-red-500">
            {/* Mark with data-scramble so it participates in startup animation */}
            <span data-scramble>&gt; ARASAKA SECURITY PROTOCOL ACTIVE</span>
          </div>

          <div className="text-gray-400">
            <span data-scramble>&gt; Neural interface detected...</span>
          </div>
          <div className="text-gray-400">
            <span data-scramble>&gt; Awaiting authorization...</span>
          </div>
        </div>

        <div className="border-t border-red-600/30 pt-4 mt-2">
          <div className="text-white mb-2">
            <span data-scramble>ENTER_PASSWORD:</span>
          </div>
          <div className="bg-black/60 p-3 border border-red-600/30 min-h-[40px] text-red-400 font-bold">
            {/* Don't scramble the live password field */}
            {passwordText}
            <span className={`ml-1 transition-opacity ${showCursor ? "opacity-100" : "opacity-0"}`}>▓</span>
          </div>
        </div>

        <div className="text-center mt-6">
          <div className="text-xs text-gray-500 mb-4">
            {/* This will also scramble on load, then act as the ready prompt */}
            <span ref={promptRef} data-scramble>[ PRESS ANY KEY TO INITIALIZE ]</span>
          </div>

          <div className="flex justify-center space-x-6 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 animate-pulse" />
              <span className="text-red-400" data-scramble>SECURE</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 animate-pulse" />
              <span className="text-yellow-400" data-scramble>ENCRYPTED</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 animate-pulse" />
              <span className="text-green-400" data-scramble>ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
