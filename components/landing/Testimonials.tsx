"use client"

import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Dr. Emily Johnson",
    role: "Computer Science Professor",
    image: "/placeholder.svg?height=100&width=100",
    quote: "GradeAI has transformed the way I evaluate student projects.",
  },
  {
    name: "Mark Thompson",
    role: "High School CS Teacher",
    image: "/placeholder.svg?height=100&width=100",
    quote: "The time I save using GradeAI allows me to focus more on teaching.",
  },
  {
    name: "Sarah Lee",
    role: "Coding Bootcamp Instructor",
    image: "/placeholder.svg?height=100&width=100",
    quote: "GradeAI helps me identify areas where students need more support.",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-extrabold text-gray-900 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What Educators Are Saying
        </motion.h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full mr-4"
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

