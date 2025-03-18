"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, ImageIcon, Zap, Database, Sparkles, Brain } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import FeatureCard from "@/components/utils/feature-card"

import ProcessStep from "@/components/utils/process-step"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">GeminiRAG</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#demo" className="text-sm font-medium hover:text-primary">
              Demo
            </Link>
          </nav>
          <div>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-20 md:py-32">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Intelligent <span className="text-primary">Document Processing</span> with Gemini
              </h1>
              <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                Extract insights from images and PDFs with our advanced RAG system powered by Google Gemini.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/chat" className="px-4 flex gap-2 items-center bg-black rounded-sm text-white py-3">
                  Try it now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Button size="lg" variant="outline">
                  View Demo
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] w-full">
             
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-gray-50 dark:bg-gray-900 py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Features</h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-[700px] mx-auto">
                Our RAG application combines cutting-edge AI with intuitive design to deliver exceptional results.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <FeatureCard
                icon={<ImageIcon className="h-10 w-10 text-primary" />}
                title="Image OCR Processing"
                description="Extract text from images with high accuracy using advanced OCR technology powered by Gemini AI."
              />
              <FeatureCard
                icon={<FileText className="h-10 w-10 text-primary" />}
                title="PDF Processing"
                description="Analyze and extract information from PDF documents with context-aware understanding."
              />
              <FeatureCard
                icon={<Zap className="h-10 w-10 text-primary" />}
                title="Intelligent RAG"
                description="Enhance AI responses with retrieved context for more accurate and relevant information."
              />
              <FeatureCard
                icon={<Database className="h-10 w-10 text-primary" />}
                title="Knowledge Base"
                description="Build and maintain a comprehensive knowledge base from your documents."
              />
              <FeatureCard
                icon={<Sparkles className="h-10 w-10 text-primary" />}
                title="Beautiful UI"
                description="Enjoy a modern, intuitive interface designed for the best user experience."
              />
              <FeatureCard
                icon={<Brain className="h-10 w-10 text-primary" />}
                title="Gemini Integration"
                description="Leverage Google's Gemini AI for state-of-the-art natural language processing."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-[700px] mx-auto">
                Our streamlined process makes document analysis simple and efficient.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <ProcessStep
                number="01"
                title="Upload Documents"
                description="Upload your images or PDF documents to our secure platform."
              />
              <ProcessStep
                number="02"
                title="AI Processing"
                description="Our Gemini-powered system analyzes and extracts relevant information."
              />
              <ProcessStep
                number="03"
                title="Get Insights"
                description="Receive detailed insights and answers based on your documents."
              />
            </div>
          </div>
        </section>

        
        

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="rounded-2xl bg-primary p-8 md:p-12 shadow-lg">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">
                    Ready to transform your document processing?
                  </h2>
                  <p className="text-primary-foreground/80 md:text-lg">
                    Get started with our RAG application today and unlock the power of AI-driven document analysis.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
                  <Button size="lg" variant="secondary" className="group">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent text-white border-white hover:bg-white/10"
                  >
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-gray-950 dark:border-gray-800">
        <div className="container py-8 md:py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-5 w-5 text-primary" />
                <span className="text-lg font-bold">GeminiRAG</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Intelligent document processing powered by Google Gemini AI.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500 dark:text-gray-400 dark:border-gray-800">
            &copy; {new Date().getFullYear()} GeminiRAG. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

