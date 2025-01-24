"use client"

import { Code, BarChart, Zap, Users } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    name: "Automated Code Analysis",
    description: "AI analyzes code quality, structure, and efficiency.",
    icon: Code,
  },
  {
    name: "Performance Metrics",
    description: "Get detailed insights into student performance.",
    icon: BarChart,
  },
  {
    name: "Instant Feedback",
    description: "Provide immediate, constructive feedback to students.",
    icon: Zap,
  },
  {
    name: "Collaborative Grading",
    description: "Easily share and collaborate on grading tasks.",
    icon: Users,
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-extrabold text-gray-900 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Powerful Features for Efficient Grading
        </motion.h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-purple-600/10 text-primary rounded-md mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.name}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

