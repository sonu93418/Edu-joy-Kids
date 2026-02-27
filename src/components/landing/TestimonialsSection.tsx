'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  avatar: string
  rating: number
  quote: string
  highlights: string
}

const TestimonialCard = ({ testimonial, delay }: { testimonial: Testimonial; delay: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-3xl p-6 shadow-fun hover:shadow-fun-lg transition-shadow duration-300 border border-purple-50"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, type: 'spring' }}
    >
      {/* Quote icon */}
      <div className="w-10 h-10 bg-edujoy-primary-100 rounded-xl flex items-center justify-center mb-4">
        <Quote className="w-5 h-5 text-edujoy-primary-500" />
      </div>
      
      {/* Quote */}
      <p className="text-gray-700 leading-relaxed mb-4 italic">"{testimonial.quote}"</p>
      
      {/* Highlights */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl px-3 py-2 mb-4">
        <p className="text-sm font-medium text-edujoy-primary-700">📊 {testimonial.highlights}</p>
      </div>
      
      {/* Rating */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 mr-0.5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      
      {/* Author */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-edujoy-primary-400 to-fun-pink rounded-full flex items-center justify-center text-xl">
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-bold text-gray-800">{testimonial.name}</div>
          <div className="text-sm text-gray-500">{testimonial.role}</div>
        </div>
      </div>
    </motion.div>
  )
}

const TestimonialsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  const testimonials: Testimonial[] = [
    {
      name: 'Priya Sharma',
      role: 'Mother of 2 | Mumbai',
      avatar: '👩',
      rating: 5,
      quote: 'My 8-year-old used to dread math homework. After 3 months on EduJoy Kids, he actually asks to do math practice! The gamification is genius.',
      highlights: 'Math score improved from 55% to 89% in 3 months'
    },
    {
      name: 'Rahul Gupta',
      role: 'Father | Delhi NCR',
      avatar: '👨',
      rating: 5,
      quote: 'The parent dashboard gives me complete visibility into what my daughter is learning. The AI insights have helped us focus on her weak areas.',
      highlights: 'Reduced screen time by 30% while increasing learning quality'
    },
    {
      name: 'Ms. Meena Patel',
      role: 'Primary School Teacher | Ahmedabad',
      avatar: '👩‍🏫',
      rating: 5,
      quote: 'EduJoy Kids\' teacher tools are amazing! I can track every student\'s progress, auto-generate quizzes, and the students are more engaged than ever.',
      highlights: 'Class average up by 20 points this semester'
    },
    {
      name: 'Anjali Reddy',
      role: 'Mother | Bangalore',
      avatar: '👩',
      rating: 5,
      quote: 'I love that there are zero ads and it\'s completely safe for kids. The AI tutor answers my child\'s questions in an age-appropriate way.',
      highlights: 'Child now completes daily learning goals 95% of the time'
    },
    {
      name: 'Mr. Suresh Kumar',
      role: 'School Principal | Chennai',
      avatar: '👨‍💼',
      rating: 5,
      quote: 'We implemented EduJoy Kids school-wide. The improvement in student engagement and grades has been remarkable. The school analytics are excellent.',
      highlights: '45% improvement in school-wide performance metrics'
    },
    {
      name: 'Kavita Singh',
      role: 'Parent | Pune',
      avatar: '🧑',
      rating: 5,
      quote: 'My son loves the avatar customization and virtual worlds. He earns his screen time by completing lessons. Best educational investment we\'ve made!',
      highlights: 'Daily learning streak of 45 days and counting!'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-white via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={ref} className="text-center mb-16">
          <motion.span
            className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            Loved by Families & Educators
          </motion.span>
          
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            What
            <span className="gradient-text"> Parents & Teachers</span>
            <br /> Say About Us
          </motion.h2>
          
          <motion.div
            className="flex items-center justify-center space-x-2 mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
            <span className="text-lg font-bold text-gray-800 ml-2">4.9/5</span>
            <span className="text-gray-500">(2,300+ reviews)</span>
          </motion.div>
        </div>
        
        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        {/* Trust banner */}
        <motion.div
          className="bg-white rounded-3xl shadow-fun p-6 sm:p-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Trusted By Thousands of Families</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: '50,000+', label: 'Active Students' },
              { value: '1,200+', label: 'Schools' },
              { value: '5,000+', label: 'Teachers' },
              { value: '95%', label: 'Renewal Rate' }
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection