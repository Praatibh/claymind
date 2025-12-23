import { motion } from "motion/react";
import { User, Sparkles, Shield } from "lucide-react";
import { Button3D } from "../../../app/components/3d-button";
import { Card3D } from "../../../app/components/3d-card";
import { FloatingMascot } from "../../../app/components/floating-mascot";
import { useState } from "react";

interface AuthProps {
  onLogin: (userType: "kid" | "parent") => void;
}

export function Auth({ onLogin }: AuthProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [userType, setUserType] = useState<"kid" | "parent">("kid");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 flex items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-30 -z-10" />

      <div className="max-w-md w-full">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FloatingMascot size="lg" message={userType === "kid" ? "Let's create something amazing!" : "Monitor your child's progress"} />
        </motion.div>

        <Card3D variant="default" hover={false}>
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isSignup ? "Join ClayMind" : "Welcome Back"}
              </h2>
              <p className="text-gray-600">
                {isSignup ? "Start your AI learning adventure" : "Continue your learning journey"}
              </p>
            </div>

            {/* User Type Toggle */}
            <div className="flex gap-3">
              <motion.button
                className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                  userType === "kid"
                    ? "border-purple-500 bg-purple-50 shadow-[0_4px_15px_rgba(124,58,237,0.2)]"
                    : "border-gray-200 bg-white"
                }`}
                onClick={() => setUserType("kid")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center gap-2">
                  <Sparkles className={`w-6 h-6 ${userType === "kid" ? "text-purple-500" : "text-gray-400"}`} />
                  <span className={`font-bold ${userType === "kid" ? "text-purple-600" : "text-gray-500"}`}>
                    I'm a Kid
                  </span>
                </div>
              </motion.button>

              <motion.button
                className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                  userType === "parent"
                    ? "border-purple-500 bg-purple-50 shadow-[0_4px_15px_rgba(124,58,237,0.2)]"
                    : "border-gray-200 bg-white"
                }`}
                onClick={() => setUserType("parent")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center gap-2">
                  <User className={`w-6 h-6 ${userType === "parent" ? "text-purple-500" : "text-gray-400"}`} />
                  <span className={`font-bold ${userType === "parent" ? "text-purple-600" : "text-gray-500"}`}>
                    I'm a Parent
                  </span>
                </div>
              </motion.button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  {userType === "kid" ? "Username" : "Email"}
                </label>
                <input
                  type={userType === "kid" ? "text" : "email"}
                  placeholder={userType === "kid" ? "Enter your username" : "Enter your email"}
                  className="w-full px-6 py-4 rounded-2xl bg-purple-50 border-2 border-purple-100 focus:border-purple-500 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-6 py-4 rounded-2xl bg-purple-50 border-2 border-purple-100 focus:border-purple-500 focus:outline-none transition-all"
                />
              </div>

              {isSignup && userType === "kid" && (
                <div>
                  <label className="block text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    placeholder="How old are you?"
                    min="8"
                    max="16"
                    className="w-full px-6 py-4 rounded-2xl bg-purple-50 border-2 border-purple-100 focus:border-purple-500 focus:outline-none transition-all"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button3D
              variant="primary"
              size="lg"
              onClick={() => onLogin(userType)}
              className="w-full"
            >
              {isSignup ? "Create Account" : "Sign In"}
            </Button3D>

            {/* Toggle between login/signup */}
            <div className="text-center">
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-purple-600 hover:text-purple-700 transition-colors"
              >
                {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
              </button>
            </div>

            {/* Safety Notice for Kids */}
            {userType === "kid" && (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    <strong>Stay Safe:</strong> Always get permission from a parent or guardian before signing up!
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card3D>
      </div>
    </div>
  );
}