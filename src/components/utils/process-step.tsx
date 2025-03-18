"use client"

import { motion } from "framer-motion"

interface ProcessStepProps {
  number: string
  title: string
  description: string
}

export default function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="mb-4">
        <span className="text-5xl font-bold text-primary/20">{number}</span>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </motion.div>
  )
}

