import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Chrome, ArrowLeft } from "lucide-react";
import travelVanImage from "@/assets/travel-van.png";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signup attempt:", { name, email, password });
  };

  return (
    <div className="relative h-screen bg-gray-300 flex items-center justify-center px-4 overflow-hidden">
      {/* Back to Home */}
      <Link
        to="/"
        className="absolute font-semibold top-6 left-6 flex items-center gap-2 text-gray-500 py-2 hover:shadow-lg px-2 hover:bg-green-500 hover:text-white rounded-xl transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="w-full max-w-sm">
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-soft rounded-3xl p-8 py-4">
          {/* Illustration */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-24 bg-travel-gradient-light rounded-2xl flex items-center justify-center overflow-hidden">
              <img
                src={travelVanImage}
                alt="Travel van with palm trees"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-500 text-sm">Start your journey with us</p>
          </div>

          {/* Signup Form */}
          <div className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-2xl border-gray-200 focus:border-travel-blue transition-smooth"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-2xl border-gray-200 focus:border-travel-blue transition-smooth"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-2xl border-gray-200 focus:border-travel-blue transition-smooth"
                placeholder="Enter your password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 rounded-2xl border-gray-200 focus:border-travel-blue transition-smooth"
                placeholder="Confirm your password"
              />
            </div>

            {/* Sign Up Button */}
            <Button
              onClick={handleSignup}
              className="w-full h-12 bg-travel-green hover:bg-travel-green/90 text-white font-semibold rounded-2xl shadow-button transition-smooth"
            >
              SIGN UP
            </Button>

            {/* Social Signup */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or sign up with</span>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-12 h-12 rounded-full border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-smooth"
                >
                  <Facebook className="w-5 h-5 text-blue-600" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-12 h-12 rounded-full border-gray-200 hover:bg-blue-50 hover:border-blue-400 transition-smooth"
                >
                  <Twitter className="w-5 h-5 text-blue-400" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-12 h-12 rounded-full border-gray-200 hover:bg-red-50 hover:border-red-300 transition-smooth"
                >
                  <Chrome className="w-5 h-5 text-red-500" />
                </Button>
              </div>
            </div>

            {/* Already have account */}
            <div className="text-center pt-4">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-travel-blue font-semibold hover:underline transition-smooth"
                >
                  SIGN IN
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignupScreen;
