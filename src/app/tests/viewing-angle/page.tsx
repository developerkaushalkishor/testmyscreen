'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Maximize, Minimize, X, Play, Pause, Info, RotateCcw, Settings } from 'lucide-react';
import Link from 'next/link';

const colors = [
  { name: 'Red', value: '#FF0000', desc: 'Check for color shifting in reds' },
  { name: 'Green', value: '#00FF00', desc: 'Check for color shifting in greens' },
  { name: 'Blue', value: '#0000FF', desc: 'Check for color shifting in blues' },
  { name: 'White', value: '#FFFFFF', desc: 'Check for brightness consistency' },
  { name: 'Black', value: '#000000', desc: 'Check for contrast consistency' },
  { name: 'Gray', value: '#808080', desc: 'Check for gamma consistency' },
];

const rotationSpeeds = [
  { name: 'Slow', value: 12, desc: 'Best for detailed inspection' },
  { name: 'Normal', value: 8, desc: 'Standard viewing test' },
  { name: 'Fast', value: 4, desc: 'Quick assessment' },
];

export default function ViewingAngleTest() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(8);
  const controls = useAnimation();

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
      setShowInstructions(false);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
      setShowInstructions(true);
    }
  }, []);

  const resetRotation = useCallback(() => {
    controls.set({ rotateY: 0 });
    if (isRotating) {
      controls.start({
        rotateY: [0, 360],
        transition: {
          duration: rotationSpeed,
          ease: "linear",
          repeat: Infinity,
        },
      });
    }
  }, [controls, isRotating, rotationSpeed]);

  useEffect(() => {
    if (isRotating) {
      controls.start({
        rotateY: [0, 360],
        transition: {
          duration: rotationSpeed,
          ease: "linear",
          repeat: Infinity,
        },
      });
    } else {
      controls.stop();
    }
  }, [isRotating, rotationSpeed, controls]);

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* Initial info card - Moved to bottom */}
      <AnimatePresence>
        {!isFullscreen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center w-full max-w-xl px-4"
          >
            <div 
              className="card p-4 space-y-2"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <h1 className="text-xl font-bold">Viewing Angle Test</h1>
              <p className="text-gray-300 text-sm">
                View the rotating cube from different angles to check for color shifting and contrast changes.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top controls */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`absolute top-4 left-4 right-4 flex flex-col sm:flex-row justify-between items-center card p-4 z-50 gap-4 sm:gap-0 ${
            isFullscreen ? 'opacity-0 hover:opacity-100 transition-opacity duration-300' : ''
          }`}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
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
              title="Show Instructions"
            >
              <Info className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`button-secondary flex items-center gap-2 text-sm sm:text-base ${
                isRotating ? 'bg-[var(--primary)]' : 'hover:bg-white/10'
              }`}
            >
              {isRotating ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span className="hidden sm:inline">Rotate</span>
                </>
              )}
            </button>

            <button
              onClick={resetRotation}
              className="button-secondary p-2 hover:bg-white/10"
              title="Reset Rotation"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() => setShowSettings(true)}
              className="button-secondary p-2 hover:bg-white/10"
              title="Test Settings"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="button-secondary hover:bg-white/10"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Main test area */}
      <div className="absolute inset-0 flex items-center justify-center perspective-1000">
        <motion.div
          animate={controls}
          className="w-48 h-48 sm:w-64 sm:h-64 relative preserve-3d"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {colors.map((color, index) => {
            const transforms = [
              'translateZ(6rem) sm:translateZ(8rem)',
              'translateZ(-6rem) sm:translateZ(-8rem) rotateY(180deg)',
              'translateX(6rem) sm:translateX(8rem) rotateY(90deg)',
              'translateX(-6rem) sm:translateX(-8rem) rotateY(-90deg)',
              'translateY(-6rem) sm:translateY(-8rem) rotateX(90deg)',
              'translateY(6rem) sm:translateY(8rem) rotateX(-90deg)',
            ];
            return (
              <div
                key={color.name}
                className="absolute w-full h-full flex items-center justify-center"
                style={{
                  backgroundColor: color.value,
                  transform: transforms[index],
                  transition: 'transform 0.3s ease',
                }}
              >
                <div className="text-center">
                  <div 
                    className="text-base sm:text-lg font-semibold"
                    style={{ color: color.value === '#000000' ? '#FFFFFF' : '#000000' }}
                  >
                    {color.name}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
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
              className="card p-4 sm:p-6 max-w-md w-full space-y-4"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex items-start justify-between">
                <h2 className="text-lg sm:text-xl font-semibold">Test Settings</h2>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="button-secondary p-2 hover:bg-white/10"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-[var(--text-primary)] block mb-2">
                    Rotation Speed
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {rotationSpeeds.map((speed) => (
                      <button
                        key={speed.value}
                        onClick={() => {
                          setRotationSpeed(speed.value);
                          setShowSettings(false);
                        }}
                        className={`button-secondary text-center p-3 flex flex-col items-center gap-1 ${
                          rotationSpeed === speed.value ? 'bg-[var(--primary)]' : ''
                        }`}
                      >
                        <div className="font-medium text-sm">{speed.name}</div>
                        <div className="caption text-xs opacity-70">{speed.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="button-primary"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions overlay - Adjusted size */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm z-50"
          >
            <div 
              className="card p-6 max-w-md w-full space-y-4"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-semibold">Viewing Angle Test</h2>
                <button 
                  onClick={() => setShowInstructions(false)}
                  className="button-secondary p-2 hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-gray-300">
                  This test helps you evaluate your display&apos;s color and contrast consistency
                  at different viewing angles.
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-[var(--text-primary)]">How to test:</p>
                  <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                    <li>View the screen from different angles</li>
                    <li>Check if colors remain consistent</li>
                    <li>Look for color shifting or washing out</li>
                    <li>Compare brightness at different angles</li>
                    <li>Use pause to examine specific angles</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-[var(--text-primary)]">Test patterns:</p>
                  <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                    {colors.map((color) => (
                      <li key={color.name}>{color.desc}</li>
                    ))}
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