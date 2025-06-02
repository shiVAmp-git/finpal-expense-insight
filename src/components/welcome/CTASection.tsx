
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-4 md:left-10 w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-20 md:top-32 right-4 md:right-20 w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-16 md:bottom-20 left-6 md:left-32 w-18 h-18 md:w-24 md:h-24 bg-white/10 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 md:bottom-32 right-4 md:right-10 w-14 h-14 md:w-18 md:h-18 bg-white/10 rounded-full animate-pulse delay-3000"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3">
            <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-yellow-300 animate-pulse" />
            <span className="text-white font-medium text-sm md:text-base">Start Your Free Trial Today</span>
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight px-2">
          Ready to Transform Your
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
            Financial Future?
          </span>
        </h2>

        <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
          Join thousands of users who have already taken control of their finances. 
          Start your journey to financial freedom today - no credit card required.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
          <Link to="/signup" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto h-12 md:h-16 px-6 md:px-10 bg-white text-blue-600 hover:bg-gray-50 text-lg md:text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
              Get Started Free
              <ArrowRight className="ml-2 md:ml-3 h-5 w-5 md:h-6 md:w-6" />
            </Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 md:h-16 px-6 md:px-10 border-2 border-white/30 text-white hover:bg-white/10 text-lg md:text-xl font-bold backdrop-blur-sm transition-all duration-300">
              Sign In
            </Button>
          </Link>
        </div>

        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 text-blue-200 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span>Free 30-day trial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
