import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2 sm:col-span-1 space-y-4">
            <h3 className="text-lg font-semibold text-white">UrgentHai</h3>
            <p className="text-sm text-gray-400">
              Professional display testing tools for everyone. Free, accurate, and easy to use.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tests/dead-pixel" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  Dead Pixel Test
                </Link>
              </li>
              <li>
                <Link href="/tests/color-accuracy" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  Color Accuracy Test
                </Link>
              </li>
              <li>
                <Link href="/tests/backlight-bleed" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  Backlight Bleed Test
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <p className="text-sm text-gray-400 text-center sm:text-left">
              © {new Date().getFullYear()} UrgentHai. All rights reserved.
            </p>
            <div className="flex space-x-4 sm:space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 