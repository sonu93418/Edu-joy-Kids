'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, BookOpen, Users, GraduationCap, Shield } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-purple-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-edujoy-primary-500 to-fun-pink rounded-2xl flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <BookOpen className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold gradient-text">EduJoy Kids</h1>
              <p className="text-xs text-gray-500">Where Learning Feels Like Play</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="#features" className="text-gray-700 hover:text-edujoy-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-gray-700 hover:text-edujoy-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                How It Works
              </Link>
              <Link href="#pricing" className="text-gray-700 hover:text-edujoy-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Pricing
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login">
              <motion.button 
                className="btn-secondary text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </Link>
            <Link href="/auth/signup">
              <motion.button 
                className="btn-fun text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Learning
              </motion.button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-edujoy-primary-600"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-purple-100">
                <Link href="#features" className="text-gray-700 hover:text-edujoy-primary-600 block px-3 py-2 rounded-md text-base font-medium">
                  Features
                </Link>
                <Link href="#how-it-works" className="text-gray-700 hover:text-edujoy-primary-600 block px-3 py-2 rounded-md text-base font-medium">
                  How It Works
                </Link>
                <Link href="#pricing" className="text-gray-700 hover:text-edujoy-primary-600 block px-3 py-2 rounded-md text-base font-medium">
                  Pricing
                </Link>
                <div className="pt-4 pb-3 border-t border-purple-100">
                  <div className="flex items-center px-3 space-y-2 flex-col">
                    <Link href="/auth/login" className="w-full">
                      <button className="btn-secondary w-full text-sm">
                        Login
                      </button>
                    </Link>
                    <Link href="/auth/signup" className="w-full">
                      <button className="btn-fun w-full text-sm">
                        Start Learning
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navigation