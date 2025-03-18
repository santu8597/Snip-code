// import React from "react";
"use client"
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
// import AnimatedIcon from "@/components/utils/animated-icon";
export default function Signup()  {
  return (
    <div className="relative bg-gradient-to-b from-[#1e1e4a] to-[#24243f] text-white py-24 md:py-32 lg:py-48 overflow-hidden">
      {/* Glowing Background Effect */}
      <motion.div
        className="absolute inset-0 bg-green-600 rounded-full filter blur-[120px] opacity-80"
        style={{
          top: "70%",
          left: "80%",
          width: "400px",
          height: "400px",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      <motion.div
        className="absolute inset-0 bg-pink-500 rounded-full filter blur-[200px] opacity-50"
        style={{
          top: "-40%",
          right: "-40%",
          width: "500px",
          height: "500px",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      <div className="container relative z-10">
        {/* Header Section */}
        <header className="flex items-center justify-between mb-16">
          <div className="text-2xl font-bold">
            {/* Replace with your logo */}
            Your Logo
          </div>
          {/* <AnimatedIcon icon={ArrowRight} size={24} /> */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-gray-300">
              Product
            </a>
            <a href="#" className="hover:text-gray-300">
              Features
            </a>
            <a href="#" className="hover:text-gray-300">
              Marketplace
            </a>
            <a href="#" className="hover:text-gray-300">
              Company
            </a>
          </nav>
          <Button variant="outline" size="sm" className="hidden md:flex">
            Log in <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </header>

        {/* Hero Content */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Data to enrich your online business
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-12">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button size="lg">Get started</Button>
            <Button variant="link" size="lg" className="gap-1.5">
              Learn more <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

