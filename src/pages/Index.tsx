
import { AuthForm } from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";
import { CreditCard, Flame, Award, Sparkles } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-12 md:py-20">
          <div className="flex-1 max-w-xl animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <div className="rounded-full p-2 primary-gradient">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold">FinPal</h2>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-900 bg-clip-text text-transparent">
              Take Control of Your Financial Future
            </h1>
            
            <p className="text-lg text-gray-700 mb-8">
              Track expenses, manage budgets, and gain insights into your spending habits with our powerful AI-powered expense tracker.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="primary-gradient">
                Get Started Free
              </Button>
              
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
            
            <div className="flex items-center gap-6 mt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-primary-200">
                    <img 
                      src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} 
                      alt={`User ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                Trusted by 10,000+ users worldwide
              </span>
            </div>
          </div>
          
          <div className="flex-1 max-w-md w-full animate-slide-in">
            <AuthForm />
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your finances in one place
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-100 mb-4">
                <Flame className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expense Tracking</h3>
              <p className="text-gray-600">
                Easily log and categorize your expenses with intuitive tools designed to make financial management simple.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-green-100 mb-4">
                <Award className="h-6 w-6 text-accent-green" />
              </div>
              <h3 className="text-xl font-bold mb-2">Budget Management</h3>
              <p className="text-gray-600">
                Create custom budgets for different categories and track your spending against them in real-time.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-purple-100 mb-4">
                <Sparkles className="h-6 w-6 text-accent-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Insights</h3>
              <p className="text-gray-600">
                Get personalized insights and recommendations to improve your financial habits and save money.
              </p>
            </div>
          </div>
        </div>
        
        {/* Testimonial Section */}
        <div className="py-16 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
            
            <div className="bg-white p-8 rounded-xl shadow-md border">
              <p className="text-xl italic mb-6">
                "FinPal has completely transformed how I manage my finances. The insights and budget tools have helped me save more money than ever before."
              </p>
              
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=4361EE&color=fff" 
                    alt="Sarah Johnson"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Marketing Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="py-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <CreditCard className="h-5 w-5 text-primary-500" />
              <span className="font-bold">FinPal</span>
            </div>
            
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} FinPal. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
