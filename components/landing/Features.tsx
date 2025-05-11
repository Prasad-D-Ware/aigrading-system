"use client"

import { Code, BarChart, Zap, Users, Brain, Shield, Clock, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    name: "AI-Powered Analysis",
    description: "Advanced AI algorithms analyze code quality, structure, and efficiency in real-time.",
    icon: Brain,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Performance Metrics",
    description: "Comprehensive insights into student performance with detailed analytics and trends.",
    icon: BarChart,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Instant Feedback",
    description: "Provide immediate, constructive feedback to students with detailed explanations.",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "Collaborative Grading",
    description: "Seamlessly share and collaborate on grading tasks with other educators.",
    icon: Users,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Code Quality Checks",
    description: "Automated checks for code quality, best practices, and potential improvements.",
    icon: Code,
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Security First",
    description: "Enterprise-grade security to protect student data and submissions.",
    icon: Shield,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    name: "Time-Saving",
    description: "Reduce grading time by up to 90% with automated analysis and feedback.",
    icon: Clock,
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "Detailed Comments",
    description: "Generate comprehensive comments and suggestions for code improvements.",
    icon: MessageSquare,
    color: "bg-orange-100 text-orange-600",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Powerful Features for Efficient Grading
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to streamline your grading process and provide better feedback to your students.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.color} mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

