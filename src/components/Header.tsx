import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { Plane, Home, Users, MessageCircle, Github, User } from "lucide-react";
import { auth } from "../firebase-key-code/firebase-auth-2-O";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.jpg";

const Header = () => {
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
    // temporary stop
    if (!user) {
      alert("Please log in to continue.");
      navigate('/login');
      return;
    }
    action();
  };

  const handleHomeClick = () => {
    handleProtectedAction(() => {
      navigate('/');
    });
  };

  const handleAboutClick = () => {
    handleProtectedAction(() => {
      // Navigate to about page or scroll to features
      navigate('/about');
    });
  };

  const handleContactClick = () => {
    handleProtectedAction(() => {
      navigate('/contactus');
    });
  };

  const handleUserClick = () => {
    handleProtectedAction(() => {
      navigate('/profile');
    });
  };

  return (
    <header className="bg-travel-header text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10 h-10 text-white" />
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Travel Itinerary Generator</h1>
            <Badge variant="secondary" className="bg-travel-blue text-white border-0 text-xs px-2 py-1">
              Beta
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <button
            onClick={handleHomeClick}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          <Link to="/" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
          </Link>
          <button
            onClick={handleAboutClick}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <Users className="w-4 h-4" />
            About Us
          </button>
          <button
            onClick={handleContactClick}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Contact Us
          </button>

          <div className="flex items-center gap-3 ml-4">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="bg-travel-blue border-travel-blue text-white hover:bg-blue-600 hover:border-blue-600">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" size="sm" className="bg-travel-green border-travel-green text-white hover:bg-green-600 hover:border-green-600">
                    + Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <a href="#" className="text-white hover:text-gray-300">
                  <User
                    onClick={handleUserClick}
                    className="w-5 h-5" />
                </a>
              </>)}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;