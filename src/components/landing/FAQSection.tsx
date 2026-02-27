'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const FAQItem = ({ question, answer, delay }: { question: string; answer: string; delay: number }) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  return (
    <motion.div
      ref={ref}
      className="border border-purple-100 rounded-2xl overflow-hidden hover:border-edujoy-primary-200 transition-colors duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-purple-50 transition-colors duration-300"
      >
        <span className="font-semibold text-gray-800 pr-4">{question}</span>
        <div className={`w-8 h-8 min-w-8 rounded-xl flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-edujoy-primary-500' : 'bg-edujoy-primary-100'}`}>
          {isOpen ? (
            <Minus className="w-4 h-4 text-white" />
          ) : (
            <Plus className="w-4 h-4 text-edujoy-primary-600" />
          )}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 text-gray-600 leading-relaxed bg-purple-50/30">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const FAQSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  const faqs = [
    {
      question: 'What grades and age groups does EduJoy Kids cover?',
      answer: 'EduJoy Kids supports children from Play Group (ages 3-4) through Class 5 (ages 11-12). Our content is specifically designed and curriculum-aligned for each grade level, ensuring age-appropriate learning experiences for all children.'
    },
    {
      question: 'Is EduJoy Kids safe for my child?',
      answer: 'Absolutely! Child safety is our top priority. The platform is completely ad-free, has no external links, and all content is moderated. We are COPPA compliant, meaning we collect minimal data and require parental consent for all child accounts. Parents have full control through our parental dashboard including screen time limits and content restrictions.'
    },
    {
      question: 'How does the AI personalization work?',
      answer: 'Our AI analyzes your child\'s learning patterns, quiz scores, time spent on topics, and areas of difficulty to create a personalized learning path. It automatically adjusts lesson difficulty, suggests review sessions for weak areas, and generates custom worksheets. Parents receive weekly AI-powered insights about their child\'s strengths and areas for improvement.'
    },
    {
      question: 'Can multiple children use the same parent account?',
      answer: 'Yes! A single parent account can have multiple child profiles, each with their own grade level, learning progress, gamification stats, and personalized experience. You can easily switch between profiles from the parent dashboard.'
    },
    {
      question: 'What subjects are available on the platform?',
      answer: 'EduJoy Kids covers 6 core subjects: English, Mathematics, Science, Environmental Studies (EVS), General Knowledge (GK), and Hindi. Each subject has hundreds of curriculum-aligned lessons, quizzes, and interactive activities appropriate for each grade level.'
    },
    {
      question: 'How does the gamification system work?',
      answer: 'Children earn XP (Experience Points) and coins for completing lessons and quizzes. They can level up, unlock new avatar customizations, themes, and virtual worlds. Daily streak rewards encourage consistent learning. Badges are awarded for various achievements, and there are seasonal events with special rewards. This system is designed to motivate learning without promoting competition.'
    },
    {
      question: 'Can I use EduJoy Kids offline?',
      answer: 'Yes! EduJoy Kids supports Progressive Web App (PWA) functionality. You can download lessons and activities for offline use. The app will sync progress when you\'re back online. This is perfect for learning during travel or in areas with limited internet connectivity.'
    },
    {
      question: 'How much does EduJoy Kids cost?',
      answer: 'We offer a Free plan with limited access to get started. Premium plans start at affordable monthly and yearly rates. We also offer a 7-day free trial for all premium plans with no credit card required. School packages are available with special pricing for educational institutions.'
    },
    {
      question: 'Is there a teacher/school version available?',
      answer: 'Yes! EduJoy Kids has dedicated Teacher and School dashboards. Teachers can create custom lessons, assign homework, track student progress, and view detailed analytics. Schools get custom branding, bulk student management, classroom organization tools, and school-wide performance reports.'
    },
    {
      question: 'What devices is EduJoy Kids compatible with?',
      answer: 'EduJoy Kids works on all modern devices including computers (Windows, Mac), tablets (iPad, Android), and smartphones (iOS, Android) through any web browser. No app download is required, though you can install it as a PWA for a better mobile experience.'
    }
  ]
  
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={ref} className="text-center mb-16">
          <motion.span
            className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            Frequently Asked Questions
          </motion.span>
          
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Got
            <span className="gradient-text"> Questions?</span>
            <br />We Have Answers!
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Everything you need to know about EduJoy Kids. 
            Can't find an answer? Contact our friendly support team.
          </motion.p>
        </div>
        
        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              delay={index * 0.05}
            />
          ))}
        </div>
        
        {/* Contact CTA */}
        <motion.div
          className="mt-12 text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-fun text-sm">
              💬 Chat with Us
            </button>
            <button className="btn-secondary text-sm">
              📧 Send Email
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQSection