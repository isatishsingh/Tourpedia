import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase-key-code/firebase-auth-2-O";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { Plane, MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import ContactUs from "./ContactUs";
import Testimonial from "./Testimonial";
import AboutUs from "./AboutUs";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Index = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const handleProtectedAction = (action: () => void) => {
    //temporary stop
    if (!user) {
      alert("Please log in to continue.");
      navigate("/login");
      return;
    }
    action();
  };

  const handleGetStarted = () => {
    if (user) {
      navigate("/travel-form");
    } else {
      navigate("/login");
    }
  };

  const handleLearnMore = () => {
    handleProtectedAction(() => {
      // Scroll to features section or navigate to about page
      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <main className="flex-1 bg-travel-gradient">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center text-black mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Plan Your Perfect
              <span className="block text-travel-green">Travel Adventure</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 mb-8 max-w-3xl mx-auto">
              Create personalized itineraries with our Itinerary travel
              generator. Discover amazing destinations and plan unforgettable
              experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="bg-travel-green hover:bg-travel-green/90 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-button transition-smooth"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={handleLearnMore}
                variant="outline"
                size="lg"
                className="border-white text-grey hover:bg-white hover:text-travel-blue px-8 py-4 text-lg font-semibold rounded-2xl transition-smooth"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Features Section */}
          <div id="features" className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/10 backdrop-blur-sm border-0 text-white p-8 text-center">
              <Plane className="w-12 h-12 text-travel-green mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-500 mb-3">
                Smart Planning
              </h3>
              <p className="text-gray-500">
                Itinerary recommendations based on your preferences and budget.
              </p>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-0 text-white p-8 text-center">
              <MapPin className="w-12 h-12 text-travel-green mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-500 mb-3 ">
                Discover Places
              </h3>
              <p className="text-gray-500">
                Explore hidden gems and popular attractions in your destination.
              </p>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-0 text-white p-8 text-center">
              <Calendar className="w-12 h-12 text-travel-green mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-500 mb-3">
                Perfect Timing
              </h3>
              <p className="text-gray-500">
                Optimize your schedule for the best weather and local events.
              </p>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-soft rounded-3xl p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Join thousands of travelers who have discovered their perfect
                destinations with our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="bg-travel-blue hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-2xl"
                >
                  Start Planning Now
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  variant="outline"
                  size="lg"
                  className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white px-8 py-4 text-lg font-semibold rounded-2xl"
                >
                  Create Account
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <AboutUs />
      <Testimonial />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Index;
