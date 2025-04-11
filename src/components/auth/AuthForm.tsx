
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password || (!isLogin && !name)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // For demo purposes, we're just showing a success toast
    toast({
      title: isLogin ? "Welcome back!" : "Account created",
      description: isLogin 
        ? "You've been successfully logged in."
        : "Your account has been created successfully.",
    });

    // In a real app, you would handle authentication here
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-10 rounded-2xl card-gradient border animate-fade-in">
      <div className="flex justify-center mb-6">
        <div className="rounded-full p-3 primary-gradient">
          <CreditCard className="h-8 w-8 text-white" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-2">
        {isLogin ? "Welcome back" : "Create an account"}
      </h2>
      
      <p className="text-muted-foreground text-center mb-6">
        {isLogin 
          ? "Enter your credentials to access your account" 
          : "Enter your information to create an account"}
      </p>
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                id="name"
                placeholder="John Doe" 
                className="pl-9"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              id="email"
              type="email" 
              placeholder="name@example.com" 
              className="pl-9"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              id="password"
              type="password" 
              placeholder="••••••••" 
              className="pl-9"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        
        {isLogin && (
          <div className="text-sm text-right">
            <a 
              href="#" 
              className="text-primary hover:text-primary-700 transition-colors"
            >
              Forgot password?
            </a>
          </div>
        )}
        
        <Button type="submit" className="w-full primary-gradient">
          {isLogin ? "Sign In" : "Create Account"}
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        {isLogin ? (
          <p>
            Don't have an account?{" "}
            <button
              type="button"
              className="text-primary hover:text-primary-700 font-medium transition-colors"
              onClick={() => setIsLogin(false)}
            >
              Sign up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button
              type="button"
              className="text-primary hover:text-primary-700 font-medium transition-colors"
              onClick={() => setIsLogin(true)}
            >
              Sign in
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export function User(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
