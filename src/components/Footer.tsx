import { Heart, Github, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-key-code/firebase-auth-2-O";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

const Footer = () => {
  const [user, setUser] = useState<any>(null); 
  const navigate = useNavigate();

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Handle protected actions - redirect to login if not authenticated
  const handleProtectedAction = (action: () => void) => {
    if (!user) {
      alert("Please log in to continue.");
      navigate('/login');
      return;
    }
    action();
  };

  const handleGithubClick = () => {
    handleProtectedAction(() => {
      window.open('https://github.com', '_blank');
    });
  };

  const handleContactClick = () => {
    handleProtectedAction(() => {
      navigate("/contactus");
      // alert("Contact us at: support@travelitinerary.com\nPhone: +1 (555) 123-4567");
    });
  };

  return (
    <footer className="bg-travel-footer text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Travel Itinerary Generator</h3>
            <p className="text-gray-300 text-sm">
              Create personalized travel experiences with our Itinerary-Generator platform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <button 
                onClick={() => navigate('/')}
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Home
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                about us
              </button>
              <button 
                onClick={() => navigate('/testimonial')}
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                testimonial
              </button>
              <button 
                onClick={handleContactClick}
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Contact Us
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex justify-center md:justify-end gap-4">
              <button 
                onClick={handleGithubClick}
                className="text-gray-300 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </button>
              <button 
                onClick={handleContactClick}
                className="text-gray-300 hover:text-white transition-colors"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </button>
              <button 
                onClick={handleContactClick}
                className="text-gray-300 hover:text-white transition-colors"
                title="Phone"
              >
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <div className="space-y-2">
            <p className="text-gray-300">© 2025 Travel Itinerary Generator. All rights reserved.</p>
            {/* <p className="flex items-center justify-center gap-2 text-gray-300 text-sm">
              Made With <Heart className="w-4 h-4 text-red-500 fill-current" /> By{" "}
              <span className="text-cyan-400 font-medium">Sanjeev</span>
            </p> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;