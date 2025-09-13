import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane, Home, Users, MessageCircle, Github } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-travel-header text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-travel-blue rounded-lg flex items-center justify-center">
            <Plane className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Travel Itinerary Generator</h1>
            <Badge variant="secondary" className="bg-travel-blue text-white border-0 text-xs px-2 py-1">
              Beta
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
            <Home className="w-4 h-4" />
            Home
          </a>
          <a href="#" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
            <Users className="w-4 h-4" />
            About Us
          </a>
          <a href="#" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
            <MessageCircle className="w-4 h-4" />
            Contact Us
          </a>
          
          <div className="flex items-center gap-3 ml-4">
            <Button variant="outline" size="sm" className="bg-travel-blue border-travel-blue text-white hover:bg-blue-600 hover:border-blue-600">
              Login
            </Button>
            <Button variant="outline" size="sm" className="bg-travel-green border-travel-green text-white hover:bg-green-600 hover:border-green-600">
              + Sign Up
            </Button>
            <a href="#" className="text-white hover:text-gray-300">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;