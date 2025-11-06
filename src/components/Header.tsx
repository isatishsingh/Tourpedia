import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { Plane, Home, Users, MessageCircle, Github, User } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.jpg";
import { useSelector } from "react-redux";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <header className="bg-travel-header text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10 h-10 text-white" />
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">
              Travel Itinerary Generator
            </h1>
            <Badge
              variant="secondary"
              className="bg-travel-blue text-white border-0 text-xs px-2 py-1"
            >
              Beta
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          ></Link>
          <button
            onClick={() => navigate("/about")}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <Users className="w-4 h-4" />
            About Us
          </button>

          <button
            onClick={() => navigate("/contactus")}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Contact Us
          </button>

          <div className="flex items-center gap-3 ml-4">
            {!token ? (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-travel-blue border-travel-blue text-white hover:bg-blue-600 hover:border-blue-600"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-travel-green border-travel-green text-white hover:bg-green-600 hover:border-green-600"
                  >
                    + Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <a className="text-white hover:text-gray-300">
                  <User onClick={() => navigate('/profile')} className="w-5 h-5" />
                </a>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
