'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize, Minimize, X, Play, Pause, Info, Grid2X2, Settings } from 'lucide-react';
import Link from 'next/link';

const colors = [
  { name: 'Red', value: '#FF0000', desc: 'Check for stuck green/blue subpixels', textColor: 'white', icon: <div className="w-3 h-3 rounded-full bg-red-500" /> },
  { name: 'Green', value: '#00FF00', desc: 'Check for stuck red/blue subpixels', textColor: 'rgba(0, 0, 0, 0.9)', icon: <div className="w-3 h-3 rounded-full bg-green-500" /> },
  { name: 'Blue', value: '#0000FF', desc: 'Check for stuck red/green subpixels', textColor: 'white', icon: <div className="w-3 h-3 rounded-full bg-blue-500" /> },
  { name: 'White', value: '#FFFFFF', desc: 'All subpixels on - Check for dead pixels', textColor: 'rgba(0, 0, 0, 0.9)', icon: <div className="w-3 h-3 rounded-full bg-white" /> },
  { name: 'Black', value: '#000000', desc: 'All subpixels off - Check for stuck pixels', textColor: 'white', icon: <div className="w-3 h-3 rounded-full bg-gray-900" /> },
  { name: 'Gray', value: '#808080', desc: 'Mid intensity - Check for partial defects', textColor: 'white', icon: <div className="w-3 h-3 rounded-full bg-gray-500" /> },
];

const cycleSpeeds = [
  { value: 1000, label: '1 second' },
  { value: 2000, label: '2 seconds' },
  { value: 3000, label: '3 seconds' },
  { value: 5000, label: '5 seconds' },
];

export default function DeadPixelTest() {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoCycling, setIsAutoCycling] = useState(false);
  const [cycleSpeed, setCycleSpeed] = useState(2000);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
        setShowInstructions(false);
        setIsAutoCycling(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
        setShowInstructions(true);
        setIsAutoCycling(false);
      }
    } catch (err) {
      console.error('Fullscreen toggle failed:', err);
    }
  }, []);

  const nextColor = useCallback(() => {
    setCurrentColorIndex((prev) => (prev + 1) % colors.length);
  }, []);

  const previousColor = useCallback(() => {
    setCurrentColorIndex((prev) => (prev - 1 + colors.length) % colors.length);
  }, []);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight':
        nextColor();
        break;
      case 'ArrowLeft':
        previousColor();
        break;
      case 'Escape':
        if (document.fullscreenElement) {
          document.exitFullscreen();
          setIsFullscreen(false);
          setShowInstructions(true);
        }
        break;
      case 'g':
        setShowGrid((prev) => !prev);
        break;
      case 'h':
        setShowControls((prev) => !prev);
        break;
      case 's':
        setShowSettings(true);
        break;
      case 'p':
        setIsAutoCycling((prev) => !prev);
        break;
    }
  }, [nextColor, previousColor]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoCycling) {
      interval = setInterval(nextColor, cycleSpeed);
    }
    return () => clearInterval(interval);
  }, [isAutoCycling, cycleSpeed, nextColor]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleMouseMove = () => {
      setIsControlsVisible(true);
      clearTimeout(timeout);
      
      if (isFullscreen) {
        timeout = setTimeout(() => {
          setIsControlsVisible(false);
        }, 3000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, [isFullscreen]);

  return (
    <div
      className="min-h-screen relative transition-colors duration-300"
      style={{ backgroundColor: colors[currentColorIndex].value }}
    >
      {/* Grid overlay */}
      {showGrid && (
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="w-full h-full grid grid-cols-10 grid-rows-10">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="border border-white/20" />
            ))}
          </div>
        </div>
      )}

      {/* Top controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isControlsVisible ? 1 : 0, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-4 right-4 flex justify-between items-center card p-4 z-50"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(12px)',
              pointerEvents: isControlsVisible ? 'auto' : 'none',
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="flex items-center gap-4">
              <Link href="/" className="button-secondary flex items-center gap-2 hover:bg-white/10">
                <X className="w-5 h-5" />
                <span>Exit Test</span>
              </Link>
              <button
                onClick={() => setShowInstructions(true)}
                className="button-secondary p-2 hover:bg-white/10"
                title="Instructions (I)"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                {colors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => setCurrentColorIndex(idx)}
                    className={`p-2 rounded-lg transition-all duration-200 relative group
                      ${currentColorIndex === idx ? 'bg-white/20' : 'hover:bg-white/10'}`}
                    title={color.name}
                  >
                    {color.icon}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg
                      bg-black/90 text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100
                      transition-opacity duration-200 pointer-events-none">
                      {color.name}
                    </div>
                  </button>
                ))}
              </div>

              <div className="h-6 w-px bg-white/20" />

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsAutoCycling(!isAutoCycling)}
                  className={`button-secondary flex items-center gap-2 ${
                    isAutoCycling ? 'bg-[var(--primary)]' : 'hover:bg-white/10'
                  }`}
                  title={isAutoCycling ? 'Stop Cycling (P)' : 'Start Auto Cycle (P)'}
                >
                  {isAutoCycling ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isAutoCycling ? 'Stop' : 'Auto'}</span>
                </button>

                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`button-secondary p-2 hover:bg-white/10 ${showGrid ? 'bg-[var(--primary)]' : ''}`}
                  title="Toggle Grid (G)"
                >
                  <Grid2X2 className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setShowSettings(true)}
                  className="button-secondary p-2 hover:bg-white/10"
                  title="Settings (S)"
                >
                  <Settings className="w-5 h-5" />
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="button-secondary hover:bg-white/10"
                  title={isFullscreen ? 'Exit Fullscreen (ESC)' : 'Enter Fullscreen'}
                >
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center color info */}
      <AnimatePresence>
        {showControls && !isFullscreen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isControlsVisible ? 0.95 : 0, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
          >
            <div 
              className="card p-6 text-center space-y-3 shadow-lg max-w-md w-full"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(12px)',
                color: colors[currentColorIndex].textColor,
                border: `1px solid ${colors[currentColorIndex].textColor}20`,
              }}
            >
              <div className="flex items-center justify-center gap-3">
                {colors[currentColorIndex].icon}
                <h3 className="text-2xl font-semibold">{colors[currentColorIndex].name}</h3>
              </div>
              <p className="text-base opacity-90">{colors[currentColorIndex].desc}</p>
              <div className="flex justify-center items-center gap-2 text-sm opacity-70">
                <span>{currentColorIndex + 1} of {colors.length}</span>
                <div className="flex gap-1">
                  {colors.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentColorIndex ? 'bg-current scale-125' : 'bg-current/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="card p-6 max-w-md w-full space-y-6"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(10px)',
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

              <div className="space-y-6 text-white">
                <div>
                  <label className="text-sm font-medium block mb-2">
                    Auto-Cycle Speed
                  </label>
                  <select
                    value={cycleSpeed}
                    onChange={(e) => setCycleSpeed(Number(e.target.value))}
                    className="w-full p-2 bg-black/50 text-white rounded border border-white/20 focus:outline-none focus:border-white/50"
                  >
                    {cycleSpeeds.map((speed) => (
                      <option key={speed.value} value={speed.value}>
                        {speed.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Show Grid</span>
                    <button
                      onClick={() => setShowGrid(!showGrid)}
                      className={`button-secondary px-4 py-2 ${showGrid ? 'bg-[var(--primary)]' : 'hover:bg-white/10'}`}
                    >
                      {showGrid ? 'On' : 'Off'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Show Controls</span>
                    <button
                      onClick={() => setShowControls(!showControls)}
                      className={`button-secondary px-4 py-2 ${showControls ? 'bg-[var(--primary)]' : 'hover:bg-white/10'}`}
                    >
                      {showControls ? 'On' : 'Off'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowSettings(false)}
                  className="button-primary"
                >
                  Apply
                </button>
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
              className="card p-8 max-w-lg w-full space-y-6"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-semibold text-white">Dead Pixel Test</h2>
                <button 
                  onClick={() => setShowInstructions(false)}
                  className="button-secondary p-2 hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4 text-white">
                <p className="text-sm">
                  Identify dead or stuck pixels by cycling through solid colors and watching for anomalies.
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium">What to Look For:</p>
                  <ul className="text-sm space-y-2 list-disc list-inside text-gray-200">
                    <li>Dead pixels: Black dots on all colors</li>
                    <li>Stuck pixels: Constant color (red/green/blue)</li>
                    <li>Use grid to locate defects precisely</li>
                    <li>Auto-cycle to scan all colors</li>
                    <li>Test in fullscreen for best results</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Keyboard Shortcuts:</p>
                  <ul className="text-sm space-y-1 text-gray-200">
                    <li><span className="font-mono bg-gray-800 px-1 rounded">←/→</span> - Previous/Next color</li>
                    <li><span className="font-mono bg-gray-800 px-1 rounded">G</span> - Toggle grid</li>
                    <li><span className="font-mono bg-gray-800 px-1 rounded">H</span> - Hide/show controls</li>
                    <li><span className="font-mono bg-gray-800 px-1 rounded">S</span> - Show settings</li>
                    <li><span className="font-mono bg-gray-800 px-1 rounded">P</span> - Toggle auto-cycle</li>
                    <li><span className="font-mono bg-gray-800 px-1 rounded">ESC</span> - Exit fullscreen</li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-end gap-4">
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