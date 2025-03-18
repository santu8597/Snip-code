export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Animated circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      {/* Animated shapes */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 border-8 border-purple-200 rounded-lg rotate-12 animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 border-8 border-yellow-200 rounded-full animate-float animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 w-40 h-40 border-8 border-pink-200 rotate-45 animate-float animation-delay-4000" />
    </div>
  )
}

