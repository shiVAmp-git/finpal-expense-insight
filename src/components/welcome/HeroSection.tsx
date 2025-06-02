
import { ArrowRight, LogIn, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-4 md:left-10 w-16 h-16 md:w-32 md:h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-32 right-4 md:right-20 w-12 h-12 md:w-24 md:h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-4 md:left-20 w-20 h-20 md:w-40 md:h-40 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse delay-2000"></div>
      <div className="absolute bottom-20 right-4 md:right-10 w-14 h-14 md:w-28 md:h-28 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse delay-3000"></div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3 mb-6 md:mb-8 shadow-lg ring-1 ring-gray-200/50">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span className="text-xs md:text-sm font-medium text-gray-700">Trusted by 10,000+ users worldwide</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 leading-tight">
          <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Master Your
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent animate-pulse">
            Financial Future
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
          Transform your relationship with money through intelligent expense tracking, 
          smart budgeting, and actionable insights with ExpenseTracker Pro.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-8 md:mb-12 px-4">
          <Link to="/signup" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 text-base md:text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
              Start Your Journey
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90 text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <LogIn className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Watch Demo
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto px-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg ring-1 ring-gray-200/50 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">$2.5M+</div>
            <div className="text-sm md:text-base text-gray-600">Money Saved by Users</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg ring-1 ring-gray-200/50 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <Star className="h-6 w-6 md:h-8 md:w-8 text-yellow-500 fill-yellow-500" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">4.9/5</div>
            <div className="text-sm md:text-base text-gray-600">User Rating</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg ring-1 ring-gray-200/50 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">10K+</div>
            <div className="text-sm md:text-base text-gray-600">Active Users</div>
          </div>
        </div>
      </div>
    </section>
  );
}
