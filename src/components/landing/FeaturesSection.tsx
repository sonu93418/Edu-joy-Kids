'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Brain, Shield, Gamepad2, BookOpen, BarChart3, 
  Users, Clock, Award, Sparkles, Music, 
  MessageCircle, Download
} from 'lucide-react'

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  color, 
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: string; 
  delay: number 
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  return (
    <motion.div
      ref={ref}
      className="card-fun group hover:border-2 hover:border-edujoy-primary-200"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, type: 'spring' }}
    >
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <div className="text-white">{icon}</div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      
      {/* Hover effect */}
      <div className="h-0.5 w-0 bg-gradient-to-r from-edujoy-primary-400 to-fun-pink mt-4 group-hover:w-full transition-all duration-500" />
    </motion.div>
  )
}

const FeaturesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const features = [
    {
      icon: <Brain className="w-7 h-7" />,
      title: 'AI Study Buddy',
      description: 'Personal AI tutor that adapts to your child\'s learning style, identifies weak areas, and provides personalized guidance.',
      color: 'bg-gradient-to-br from-purple-500 to-edujoy-primary-500',
      delay: 0
    },
    {
      icon: <Gamepad2 className="w-7 h-7" />,
      title: 'Gamified Learning',
      description: 'Earn XP, collect coins, unlock badges, complete daily missions, and level up through an exciting adventure world.',
      color: 'bg-gradient-to-br from-orange-400 to-pink-500',
      delay: 0.1
    },
    {
      icon: <BookOpen className="w-7 h-7" />,
      title: 'Curriculum-Aligned',
      description: 'Structured lessons covering English, Math, Science, EVS, GK, and Hindi for all grades from Play Group to Class 5.',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      delay: 0.2
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'Child Safety First',
      description: '100% safe environment with no external links, content moderation, parental controls, and COPPA compliance.',
      color: 'bg-gradient-to-br from-green-500 to-emerald-500',
      delay: 0.3
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: 'Progress Analytics',
      description: 'Detailed real-time reports for parents showing subject performance, time spent, weak topics, and improvement trends.',
      color: 'bg-gradient-to-br from-yellow-500 to-orange-500',
      delay: 0.4
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: 'Multi-Role Platform',
      description: 'Dedicated dashboards for students, parents, teachers, and school administrators with role-specific features.',
      color: 'bg-gradient-to-br from-pink-500 to-rose-500',
      delay: 0.5
    },
    {
      icon: <Music className="w-7 h-7" />,
      title: 'Audio Learning',
      description: 'Audio-assisted lessons, voice pronunciation practice, and sound feedback to support different learning styles.',
      color: 'bg-gradient-to-br from-indigo-500 to-purple-500',
      delay: 0.6
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: 'Achievement System',
      description: 'Hundreds of badges, achievements, and rewards to celebrate progress and keep children motivated to learn more.',
      color: 'bg-gradient-to-br from-amber-500 to-yellow-500',
      delay: 0.7
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: 'Screen Time Control',
      description: 'Built-in parental controls to set daily screen time limits, restrict access by days/hours, and monitor usage.',
      color: 'bg-gradient-to-br from-teal-500 to-cyan-500',
      delay: 0.8
    },
    {
      icon: <MessageCircle className="w-7 h-7" />,
      title: 'AI Chat Tutor',
      description: 'Student-safe AI chatbot that answers questions, provides hints, explains concepts, and encourages learning.',
      color: 'bg-gradient-to-br from-violet-500 to-purple-500',
      delay: 0.9
    },
    {
      icon: <Download className="w-7 h-7" />,
      title: 'Offline Learning',
      description: 'Download lessons and activities for offline use. Keep learning even without internet connection.',
      color: 'bg-gradient-to-br from-slate-500 to-gray-600',
      delay: 1.0
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: 'Smart Worksheets',
      description: 'AI-generated personalized worksheets and quizzes based on performance gaps and learning objectives.',
      color: 'bg-gradient-to-br from-fuchsia-500 to-pink-500',
      delay: 1.1
    }
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={ref} className="text-center mb-16">
          <motion.span
            className="inline-block bg-edujoy-primary-100 text-edujoy-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Everything Your Child Needs
          </motion.span>
          
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Why Kids
            <span className="gradient-text"> Love </span>
            EduJoy Kids
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            A complete educational ecosystem that combines structured curriculum with 
            the excitement of games, making learning an adventure kids look forward to.
          </motion.p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              delay={feature.delay}
            />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-edujoy-primary-500 via-fun-pink to-fun-orange text-white rounded-3xl p-8 sm:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Start the Learning Adventure? 🚀
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto">
              Join over 50,000 students who have transformed their learning experience with EduJoy Kids
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-white text-edujoy-primary-600 font-bold px-8 py-3 rounded-2xl hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
                onClick={() => window.location.href = '/auth/signup'}
              >
                Start Free Trial
              </button>
              <button
                className="border-2 border-white text-white font-bold px-8 py-3 rounded-2xl hover:bg-white hover:text-edujoy-primary-600 transition-all transform hover:scale-105"
                onClick={() => window.location.href = '/demo'}
              >
                Watch Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection