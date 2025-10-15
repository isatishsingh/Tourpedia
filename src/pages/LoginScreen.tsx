import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Facebook, Twitter, Chrome, ArrowLeft } from "lucide-react";
import travelVanImage from "@/assets/travel-van.png";
import { auth, googleProvider, facebookProvider } from "../firebase-key-code/firebase-auth-2-O";
import { signInWithPopup } from "firebase/auth";
import Header from "@/components/Header";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setUser } from "@/store/authSlice";

const LoginScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Normal login (you can connect this to backend later)
  const handleLogin = () => {
    console.log("Login attempt:", { email, password });
    // For now, just navigate to travel form (you can add actual authentication later)
    if (email && password) {
      alert("Login successful! Redirecting to travel form...");
      navigate('/travel-form');
    } else {
      alert("Please enter both email and password.");
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      console.log("Starting Google login...");
      const result = await signInWithPopup(auth, googleProvider);
      alert(`Welcome ${result.user.displayName}! Redirecting to travel form...`);
      const user = result.user;

      dispatch(setUser({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }));

      // Navigate to travel form after successful authentication
      // navigate('/travel-form');
      console.log("Google login success:", user);
      alert(`Welcome ${user.displayName}! Redirecting to travel form...`);
      navigate('/');
    } catch (error: any) {
      console.error("Google login error:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);

      // Show user-friendly error messages
      if (error.code === 'auth/popup-closed-by-user') {
        alert("Login was cancelled. Please try again.");
      } else if (error.code === 'auth/popup-blocked') {
        alert("Popup was blocked by your browser. Please allow popups for this site.");
      } else if (error.code === 'auth/unauthorized-domain') {
        alert("This domain is not authorized. Please contact support.");
      } else {
        alert(`Login failed: ${error.message}`);
      }
    }
  };

  // Facebook login
  const handleFacebookLogin = async () => {
    try {
      console.log("Starting Facebook login...");
      const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;

    // Save user in Redux
    dispatch(setUser({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    }));

    console.log("Facebook login success:", user);
    alert(`Welcome ${user.displayName}! Redirecting to travel form...`);
    navigate('/');
    } catch (error: any) {
      console.error("Facebook login error:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);

      // Show user-friendly error messages
      if (error.code === 'auth/popup-closed-by-user') {
        alert("Login was cancelled. Please try again.");
      } else if (error.code === 'auth/popup-blocked') {
        alert("Popup was blocked by your browser. Please allow popups for this site.");
      } else if (error.code === 'auth/unauthorized-domain') {
        alert("This domain is not authorized. Please contact support.");
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        alert("An account already exists with this email using a different sign-in method.");
      } else {
        alert(`Login failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="relative h-screen bg-gray-300 flex items-center justify-center py-4 overflow-hidden">
      {/* Back to Home Button */}
      <Link
        to="/"
        className="absolute font-semibold top-6 left-6 flex items-center gap-2 text-gray-500 py-2 hover:shadow-lg px-2 hover:bg-blue-500 hover:text-white rounded-xl transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="w-full max-w-sm">
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-soft rounded-3xl p-8">
          {/* Travel Illustration */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-24 bg-travel-gradient-light rounded-2xl flex items-center justify-center overflow-hidden">
              <img
                src={travelVanImage}
                alt="Travel van with palm trees"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Want Travel?</h1>
            <p className="text-gray-500 text-sm">Let's help you explore the world</p>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
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

            <div className="text-right">
              <button className="text-travel-blue text-sm font-medium hover:underline transition-smooth">
                Forgot your password?
              </button>
            </div>

            {/* Sign In Button */}
            <Button
              onClick={handleLogin}
              className="w-full h-12 bg-travel-blue hover:bg-travel-blue/90 text-white font-semibold rounded-2xl shadow-button transition-smooth"
            >
              SIGN IN
            </Button>

            {/* Social Login */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or connect with</span>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-12 h-12 rounded-full border-gray-200 hover:bg-red-50 hover:border-red-300 transition-smooth"
                  onClick={handleGoogleLogin}
                >
                  <Chrome className="w-5 h-5 text-red-500" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-12 h-12 rounded-full border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-smooth"
                  onClick={handleFacebookLogin}
                >
                  <Facebook className="w-5 h-5 text-blue-600" />
                </Button>

                {/* Twitter not supported directly in Firebase */}
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="w-12 h-12 rounded-full border-gray-200 opacity-50"
                >
                  <Twitter className="w-5 h-5 text-blue-400" />
                </Button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-travel-blue font-semibold hover:underline transition-smooth">
                  SIGN UP
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginScreen;
