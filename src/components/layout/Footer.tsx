'use client'

import Link from 'next/link'
import { BookOpen, Heart, Shield, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-edujoy-primary-500 to-fun-pink rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">EduJoy Kids</h3>
                <p className="text-sm text-gray-400">Where Learning Feels Like Play</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              A safe, AI-powered educational platform designed specifically for children. 
              We make learning fun, engaging, and effective while ensuring complete child safety.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Shield className="w-4 h-4" />
              <span>COPPA Compliant • Child Safety First</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/auth/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
              <li><Link href="/auth/signup" className="text-gray-400 hover:text-white transition-colors">Sign Up</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/child-safety" className="text-gray-400 hover:text-white transition-colors">Child Safety</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2024 EduJoy Kids. All rights reserved.
              </p>
              <div className="flex items-center space-x-1 text-red-400">
                <Heart className="w-4 h-4 fill-current" />
                <span className="text-sm">Made with love for kids</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="mailto:support@edujoykids.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <div className="text-sm text-gray-400">
                Secure & Safe Learning Environment
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer