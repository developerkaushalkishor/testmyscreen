'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize, Minimize, X, Play, Pause, Settings, Info, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const speedPresets = [
  { name: 'Very Slow', value: 1000, desc: 'Best for detecting subtle ghosting' },
  { name: 'Slow', value: 800, desc: 'Good for initial testing' },
  { name: 'Normal', value: 600, desc: 'Typical motion speed' },
  { name: 'Fast', value: 400, desc: 'Gaming-like motion' },
  { name: 'Very Fast', value: 200, desc: 'Extreme motion test' },
];

const patterns = [
  {
    name: 'Lines',
    render: () => (
      <div className="flex space-x-2 sm:space-x-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-4 sm:w-8 h-24 sm:h-32">
            <div className="w-full h-full bg-white" />
            <div className="w-full h-full bg-black" />
          </div>
        ))}
      </div>
    ),
    desc: 'Check edge sharpness and trailing',
  },
  {
    name: 'Blocks',
    render: () => (
      <div className="flex space-x-4 sm:space-x-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-8 sm:w-16 h-24 sm:h-32 bg-white rounded-lg" />
        ))}
      </div>
    ),
    desc: 'Evaluate motion blur and consistency',
  },
  {
    name: 'Text',
    render: () => (
      <div className="flex space-x-4 sm:space-x-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-xl font-bold">
            Motion Test
          </div>
        ))}
      </div>
    ),
    desc: 'Test readability during motion',
  },
  {
    name: 'Pixels',
    render: () => (
      <div className="flex space-x-1 sm:space-x-2">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-2 sm:w-4 h-24 sm:h-32 bg-white" />
        ))}
      </div>
    ),
    desc: 'Examine fine detail clarity',
  },
];

export default function ResponseTimeTest() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(600);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [pattern, setPattern] = useState(0);
  const [position, setPosition] = useState(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
        setShowInstructions(false);
        setIsRunning(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
        setShowInstructions(true);
        setIsRunning(false);
      }
    } catch (err) {
      console.error('Fullscreen toggle failed:', err);
    }
  }, []);

  const animate = useCallback((time: number) => {
    if (!isRunning) return;

    const delta = time - lastTimeRef.current;
    if (delta >= speed / 2) {
      setPosition((prev) => {
        const newPos = prev + (100 * delta) / speed;
        return newPos > 100 ? 0 : newPos;
      });
      lastTimeRef.current = time;
    }
    animationRef.current = requestAnimationFrame(animate);
  }, [isRunning, speed]);

  useEffect(() => {
    if (isRunning) {
      lastTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, animate]);

  const handlePatternChange = useCallback(() => {
    setPattern((prev) => (prev + 1) % patterns.length);
    setPosition(0);
  }, []);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        if (document.fullscreenElement) toggleFullscreen();
        break;
      case ' ':
        setIsRunning((prev) => !prev);
        break;
      case 'ArrowRight':
        handlePatternChange();
        break;
      case 's':
        setShowSettings(true);
        break;
      case 'i':
        setShowInstructions(true);
        break;
    }
  }, [toggleFullscreen, handlePatternChange]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Initial info card */}
      <AnimatePresence>
        {!isFullscreen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center w-full max-w-xl px-4"
          >
            <div 
              className="card p-4 space-y-2 shadow-lg"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <h1 className="text-xl font-bold text-white">Response Time Test</h1>
              <p className="text-gray-300 text-sm">
                Assess your display&apos;s response time with customizable motion patterns.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top controls */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-300 ${
          isFullscreen ? 'opacity-0 hover:opacity-100' : 'opacity-100'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 pt-4 flex flex-col sm:flex-row justify-between items-center card p-4 gap-4 sm:gap-0"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="button-secondary flex items-center gap-2 hover:bg-white/10 text-sm sm:text-base">
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Exit Test</span>
            </Link>
            <button
              onClick={() => setShowInstructions(true)}
              className="button-secondary p-2 hover:bg-white/10"
              title="Instructions (I)"
            >
              <Info className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`button-secondary flex items-center gap-2 text-sm sm:text-base ${
                isRunning ? 'bg-[var(--primary)]' : 'hover:bg-white/10'
              }`}
              title="Play/Pause (Space)"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="hidden sm:inline">{isRunning ? 'Pause' : 'Play'}</span>
            </button>

            <button
              onClick={handlePatternChange}
              className="button-secondary flex items-center gap-2 hover:bg-white/10 text-sm sm:text-base"
              title="Next Pattern (→)"
            >
              <span>{patterns[pattern].name}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowSettings(true)}
              className="button-secondary p-2 hover:bg-white/10"
              title="Settings (S)"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="button-secondary hover:bg-white/10"
              title={isFullscreen ? 'Exit Fullscreen (ESC)' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Main test area */}
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <div className="relative w-full h-full overflow-hidden">
          <motion.div
            style={{
              x: `${-position}%`,
              width: '200%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              willChange: 'transform',
            }}
          >
            <div className="flex items-center justify-center w-1/2 scale-75 sm:scale-100">
              {patterns[pattern].render()}
            </div>
            <div className="flex items-center justify-center w-1/2 scale-75 sm:scale-100">
              {patterns[pattern].render()}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Settings overlay */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm z-50"
          >
            <div 
              className="card p-6 max-w-md w-full space-y-6 shadow-lg"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-semibold text-white">Test Settings</h2>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="button-secondary p-2 hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-white block mb-2">
                    Motion Speed
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {speedPresets.map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => {
                          setSpeed(preset.value);
                          setShowSettings(false);
                        }}
                        className={`button-secondary text-left p-4 flex flex-col gap-1 ${
                          speed === preset.value ? 'bg-[var(--primary)]' : 'hover:bg-white/10'
                        }`}
                      >
                        <div className="font-medium text-white">{preset.name}</div>
                        <div className="text-xs text-gray-400">{preset.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white block mb-2">
                    Test Pattern
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {patterns.map((p, index) => (
                      <button
                        key={p.name}
                        onClick={() => {
                          setPattern(index);
                          setPosition(0);
                          setShowSettings(false);
                        }}
                        className={`button-secondary text-left p-4 flex flex-col gap-1 ${
                          pattern === index ? 'bg-[var(--primary)]' : 'hover:bg-white/10'
                        }`}
                      >
                        <div className="font-medium text-white">{p.name}</div>
                        <div className="text-xs text-gray-400">{p.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions overlay */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm z-50"
          >
            <div 
              className="card p-6 max-w-md w-full space-y-6 shadow-lg"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-semibold text-white">Response Time Test</h2>
                <button 
                  onClick={() => setShowInstructions(false)}
                  className="button-secondary p-2 hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-200">
                  Assess your display&apos;s response time and motion handling with moving patterns.
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-white">What to Look For:</p>
                  <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                    <li>Sharp, clear edges on moving objects</li>
                    <li>Minimal ghosting or trailing effects</li>
                    <li>Readable text during motion</li>
                    <li>Consistent brightness and contrast</li>
                    <li>Smooth movement without stuttering</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-white">Controls:</p>
                  <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                    <li><span className="font-mono bg-gray-800 px-1 rounded">Space</span> - Play/Pause</li>
                    <li><span className="font-mono bg-gray-800 px-1 rounded">→</span> - Next Pattern</li>
                    <li><span className="font-mono bg-gray-800 px-1 rounded">S</span> - Settings</li>
                    <li><span className="font-mono bg-gray-800 px-1 rounded">I</span> - Instructions</li>
                    <li><span className="font-mono bg-gray-800 px-1 rounded">ESC</span> - Exit Fullscreen</li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-2">
                <button
                  onClick={() => setShowInstructions(false)}
                  className="button-secondary hover:bg-white/10"
                >
                  Close
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="button-primary"
                >
                  Start Test
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}