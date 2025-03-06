'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Monitor, ZapIcon, Eye, Sun, Clock, ChevronRight, Globe, Activity, Users, LayoutGrid } from 'lucide-react';
import { useEffect, useState } from 'react';

const tests = [
  {
    title: 'Dead Pixel Test',
    description: 'Check for dead or stuck pixels on your screen',
    icon: <Monitor className="w-6 h-6 text-current" />,
    href: '/tests/dead-pixel',
    color: 'from-blue-500/20 to-transparent',
    glowColor: 'rgba(59, 130, 246, 0.3)',
  },
  {
    title: 'Color Accuracy Test',
    description: 'Evaluate your display\'s color reproduction',
    icon: <ZapIcon className="w-6 h-6 text-current" />,
    href: '/tests/color-accuracy',
    color: 'from-purple-500/20 to-transparent',
    glowColor: 'rgba(147, 51, 234, 0.3)',
  },
  {
    title: 'Backlight Bleed Test',
    description: 'Detect backlight bleeding issues',
    icon: <Sun className="w-6 h-6 text-current" />,
    href: '/tests/backlight-bleed',
    color: 'from-yellow-500/20 to-transparent',
    glowColor: 'rgba(234, 179, 8, 0.3)',
  },
  {
    title: 'Viewing Angle Test',
    description: 'Test color and brightness consistency at different angles',
    icon: <Eye className="w-6 h-6 text-current" />,
    href: '/tests/viewing-angle',
    color: 'from-green-500/20 to-transparent',
    glowColor: 'rgba(34, 197, 94, 0.3)',
  },
  {
    title: 'Response Time Test',
    description: 'Check your display\'s motion handling and ghosting',
    icon: <Clock className="w-6 h-6 text-current" />,
    href: '/tests/response-time',
    color: 'from-red-500/20 to-transparent',
    glowColor: 'rgba(239, 68, 68, 0.3)',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tests.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden bg-gray-900">
      {/* Enhanced background effects */}
      <motion.div
        className="absolute inset-0 opacity-30 transition-opacity duration-1000"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${tests[activeIndex].glowColor} 0%, transparent 70%)`,
        }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.3))]" />

      <div className="relative container mx-auto px-6 py-24 z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-24 space-y-10"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
            <span className="text-white">Welcome to </span>
            <span className="relative inline-block">
              <span className="text-blue-400">UrgentHai</span>
              <svg
                className="absolute -bottom-2 sm:-bottom-4 left-0 w-full"
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="20"
                viewBox="0 0 200 20"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0 Q100,20 200,0"
                  stroke="url(#blue-gradient)"
                  strokeWidth="4"
                  fill="none"
                  className="opacity-70"
                />
                <defs>
                  <linearGradient id="blue-gradient" x1="0" y1="0" x2="100%" y2="0">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-8 px-4 sm:px-6">
            <p className="text-xl sm:text-2xl lg:text-3xl leading-relaxed text-gray-200 font-light">
              We&apos;re dedicated to helping you unlock the full potential of your display with our free, easy-to-use Screen Test Suite.
            </p>
            <p className="text-lg sm:text-xl leading-relaxed text-gray-400">
              Whether you&apos;re a gamer, designer, or casual user, our tools are designed to ensure your screen performs at its best.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-6"
            >
              <Link
                href="#tests"
                onClick={(e) => {
                  e.preventDefault();
                  const testsSection = document.getElementById('tests');
                  if (testsSection) {
                    const yOffset = -100;
                    const y = testsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-blue-600 text-white rounded-xl font-medium 
                  transition-all duration-500 ease-in-out hover:scale-105 hover:bg-blue-500
                  hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 active:bg-blue-700"
              >
                Start Testing
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-gray-800 text-gray-300 rounded-xl font-medium 
                  transition-all duration-500 ease-in-out hover:scale-105 hover:bg-gray-700
                  hover:text-white active:scale-95 active:bg-gray-900"
              >
                Learn More
              </Link>
            </motion.div>
        </div>
        </motion.div>

        {/* Why Test Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="text-center mb-16 sm:mb-24 relative px-4 sm:px-6"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white">
            Why Test Your Screen?
          </h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed text-gray-300">
            Your display is your window to the digital world. A flawless screen enhances your experience, boosts productivity,
            and ensures quality for professional tasks. Our tools help you spot defects, calibrate colors, and optimize
            performance—all in a few clicks.
          </p>
        </motion.div>

        {/* Test Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-24 px-4 sm:px-6"
          id="tests"
        >
          {tests.map((test, index) => (
            <motion.div
              key={test.title}
              variants={item}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group relative"
              onHoverStart={() => setActiveIndex(index)}
              id={test.href.split('/').pop()}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 
                group-hover:opacity-50 transition-all duration-500 group-hover:blur-md" />
              <Link href={test.href}>
                <div className="relative rounded-2xl p-6 sm:p-8 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50
                  group-hover:border-blue-500/50 overflow-hidden transition-all duration-300
                  shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] group-hover:shadow-[0_8px_30px_-4px_rgba(37,99,235,0.2)]">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${test.color} opacity-0 
                      group-hover:opacity-100 transition-all duration-500 group-hover:scale-110`}
                  />
                  <div className="relative space-y-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <motion.div
                        className="p-3 sm:p-4 rounded-xl bg-gray-700/50 border border-gray-600/50 text-white
                          backdrop-blur-sm shadow-inner group-hover:bg-blue-600/20 group-hover:border-blue-500/50
                          transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {test.icon}
                      </motion.div>
                      <h2 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-blue-200 transition-colors duration-300">
                        {test.title}
                      </h2>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      {test.description}
                    </p>
                    <div className="flex items-center font-medium text-blue-400 group-hover:text-blue-300 transition-colors duration-300 group/link">
                      <span className="group-hover:text-blue-200">Start Test</span>
                      <ChevronRight className="w-4 h-4 ml-2 transition-all duration-300 
                        group-hover/link:translate-x-2 group-hover:text-blue-200" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Comprehensive Guide Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-32 space-y-16 max-w-4xl mx-auto"
        >
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-bold text-white">
              Comprehensive Guide to Screen Test Suite Tools
            </h2>
            <p className="text-xl text-gray-300">
              Welcome to the Screen Test Suite—a collection of precision tools crafted to evaluate and optimize your display&apos;s performance.
            </p>
          </div>

          {tests.map((test, index) => (
            <motion.div
              key={test.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="p-8 rounded-2xl border border-gray-800 bg-gray-800/30 backdrop-blur-sm
                hover:border-gray-700 transition-all duration-300 shadow-lg"
              id={`guide-${test.href.split('/').pop()}`}
            >
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-xl bg-gray-700/50 border border-gray-600/50 text-white">
                    {test.icon}
                  </div>
                  <div className="space-y-3 flex-1">
                    <h3 className="text-2xl font-semibold text-white">
                      {test.title}
                    </h3>
                    <p className="text-lg text-gray-300">
                      {getTestDescription(test.title)}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white">
                      How to Use It
                    </h4>
                    <ul className="space-y-3 list-disc list-inside text-gray-300">
                      {getTestInstructions(test.title).map((instruction, i) => (
                        <li key={i} className="text-base">{instruction}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white">
                      Why You Should Use It
                    </h4>
                    <ul className="space-y-3 list-disc list-inside text-gray-300">
                      {getTestBenefits(test.title).map((benefit, i) => (
                        <li key={i} className="text-base">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link
                    href={test.href}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white
                      hover:bg-blue-500 transition-all duration-300 font-medium"
                  >
                    Try {test.title} <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Why Choose Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="p-10 rounded-2xl border border-gray-800 bg-gray-800/30 backdrop-blur-sm"
          >
            <div className="text-center space-y-6 mb-12">
              <h3 className="text-3xl font-bold text-white">
                Why Choose Screen Test Suite?
              </h3>
              <p className="text-lg max-w-2xl mx-auto text-gray-300">
                Experience professional-grade display testing with our comprehensive, easy-to-use toolkit designed for both enthusiasts and professionals.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {getWhyChooseReasons().map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 + index * 0.1 }}
                  className="group p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-gray-600
                    hover:bg-gray-700/30 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="p-3 rounded-xl bg-gray-700/50 border border-gray-600/50 text-white w-fit
                    group-hover:scale-110 transition-transform duration-300">
                    {reason.icon}
                  </div>
                  <h4 className="font-semibold text-xl text-white mt-4 mb-2">
                    {reason.title}
                  </h4>
                  <p className="text-base text-gray-300">
                    {reason.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="mt-24 text-center"
        >
          <p className="text-base text-gray-400">
            For optimal results, run these tests in a dimly lit room with minimal reflections.
          </p>
        </motion.div>
    </div>
    </main>
  );
}

// Helper functions for content
function getTestDescription(title: string): string {
  switch (title) {
    case 'Dead Pixel Test':
      return 'Identifies dead or stuck pixels on your screen—those tiny dots that fail to display colors correctly or remain black. A dead pixel is completely unresponsive, while a stuck pixel displays a single color permanently.';
    case 'Color Accuracy Test':
      return 'Evaluates how well your display reproduces colors compared to industry standards. It checks for vibrancy, balance, and fidelity across reds, greens, blues, and gradients.';
    case 'Backlight Bleed Test':
      return 'Detects uneven light distribution on LCD screens, where light leaks around edges or corners, creating a hazy glow. This is common in LED-backlit displays and can detract from dark scenes.';
    case 'Viewing Angle Test':
      return 'Checks how consistent colors and brightness remain when you view your screen from different angles. Poor viewing angles cause colors to shift or fade, a common issue with budget TN panels.';
    case 'Response Time Test':
      return 'Measures how quickly your display transitions between colors, affecting motion clarity. Slow response times lead to ghosting or blur during fast-moving content like games or animations.';
    default:
      return '';
  }
}

function getTestInstructions(title: string): string[] {
  switch (title) {
    case 'Dead Pixel Test':
      return [
        'Launch the test and enter full-screen mode',
        'Cycle through colors (white, black, red, green, blue)',
        'Look for dots that don\'t match the current color',
        'Use the grid feature to locate defects precisely',
        'Record findings for warranty claims'
      ];
    case 'Color Accuracy Test':
      return [
        'Start the test in a controlled lighting environment',
        'View test patterns and color gradients',
        'Check for banding or color inconsistencies',
        'Compare against reference images',
        'Adjust monitor settings if needed'
      ];
    case 'Backlight Bleed Test':
      return [
        'Perform test in a dark room',
        'Use full-screen black background',
        'Check edges and corners for light leakage',
        'Test with different brightness levels',
        'Document any significant bleeding'
      ];
    case 'Viewing Angle Test':
      return [
        'Start with the default centered position',
        'View test patterns from multiple angles',
        'Check color consistency at different positions',
        'Note any color shifting or fading',
        'Test both horizontal and vertical angles'
      ];
    case 'Response Time Test':
      return [
        'Enable full-screen mode',
        'Watch moving patterns closely',
        'Look for motion blur or ghosting',
        'Test at different speeds',
        'Compare results with monitor specifications'
      ];
    default:
      return [];
  }
}

function getTestBenefits(title: string): string[] {
  switch (title) {
    case 'Dead Pixel Test':
      return [
        'Verify new display quality',
        'Catch defects within warranty period',
        'Document issues for returns/repairs',
        'Ensure optimal viewing experience',
        'Maintain professional display standards'
      ];
    case 'Color Accuracy Test':
      return [
        'Perfect color reproduction for creative work',
        'Optimize display settings',
        'Ensure consistent viewing experience',
        'Reduce eye strain',
        'Validate display calibration'
      ];
    case 'Backlight Bleed Test':
      return [
        'Assess display quality',
        'Identify warranty-level issues',
        'Optimize viewing conditions',
        'Improve dark scene visibility',
        'Enhance movie/gaming experience'
      ];
    case 'Viewing Angle Test':
      return [
        'Optimize display positioning',
        'Ensure consistent group viewing',
        'Validate panel technology',
        'Improve workspace ergonomics',
        'Perfect for presentations'
      ];
    case 'Response Time Test':
      return [
        'Enhance gaming performance',
        'Verify manufacturer claims',
        'Optimize motion clarity',
        'Reduce visual artifacts',
        'Perfect for fast-paced content'
      ];
    default:
      return [];
  }
}

function getWhyChooseReasons() {
  return [
    {
      title: 'Professional-Grade Tools',
      description: 'Industry-standard test patterns and methodologies used by display manufacturers and calibration experts.',
      icon: <ZapIcon className="w-5 h-5 text-current" />
    },
    {
      title: 'Universal Access',
      description: 'Free, instant access from any browser—no downloads, registrations, or special hardware required.',
      icon: <Globe className="w-5 h-5 text-current" />
    },
    {
      title: 'Real-Time Analysis',
      description: 'Interactive tests with immediate visual feedback help identify and diagnose display issues quickly.',
      icon: <Activity className="w-5 h-5 text-current" />
    },
    {
      title: 'Modern Technology',
      description: 'Optimized for latest display technologies including 4K, HDR, OLED, and high refresh rate monitors.',
      icon: <Monitor className="w-5 h-5 text-current" />
    },
    {
      title: 'User-Centric Design',
      description: 'Intuitive interface with step-by-step guidance makes professional testing accessible to everyone.',
      icon: <Users className="w-5 h-5 text-current" />
    },
    {
      title: 'Comprehensive Suite',
      description: 'Complete set of essential display tests in one place, from pixel defects to color accuracy.',
      icon: <LayoutGrid className="w-5 h-5 text-current" />
    }
  ];
} 