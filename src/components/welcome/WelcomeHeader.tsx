
import { CreditCard, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function WelcomeHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
            <div className="p-1.5 md:p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ExpenseTracker Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Reviews
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Pricing
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <Link to="/login">
              <Button variant="ghost" className="font-medium text-sm lg:text-base">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-medium text-sm lg:text-base">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 py-4">
            <nav className="flex flex-col gap-4">
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2">
                Features
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2">
                Reviews
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2">
                Pricing
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                <Link to="/login">
                  <Button variant="ghost" className="w-full font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-medium">
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
