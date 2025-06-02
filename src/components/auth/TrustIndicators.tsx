
import { Shield, Lock, Sparkles } from "lucide-react";

export default function TrustIndicators() {
  return (
    <div className="mt-8 text-center">
      <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Shield className="h-4 w-4 text-green-500" />
          <span>Secure</span>
        </div>
        <div className="flex items-center gap-1">
          <Lock className="h-4 w-4 text-blue-500" />
          <span>Encrypted</span>
        </div>
        <div className="flex items-center gap-1">
          <Sparkles className="h-4 w-4 text-purple-500" />
          <span>Trusted</span>
        </div>
      </div>
    </div>
  );
}
