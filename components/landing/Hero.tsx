"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function Hero() {
  const router = useRouter();
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Grade Smarter, Not Harder
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl mb-8 text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Revolutionize your grading process with AI-powered code analysis.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button  className="px-6 py-2 bg-purple-600 text-white hover:bg-purple-600/90 rounded-xl" onClick={()=>router.push("/signup")}>
              Start Grading for Free
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

