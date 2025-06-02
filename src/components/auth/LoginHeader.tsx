
import { CreditCard, Sparkles } from "lucide-react";

export default function LoginHeader() {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="rounded-full p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-2xl">
            <CreditCard className="h-10 w-10 text-white" />
          </div>
          <div className="absolute -top-1 -right-1">
            <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
          </div>
        </div>
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
        Welcome Back
      </h1>
      <p className="text-gray-600 text-lg">
        Sign in to continue your financial journey
      </p>
    </div>
  );
}
