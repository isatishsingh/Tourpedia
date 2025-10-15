import { Card } from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Marquee from 'react-fast-marquee';
import skyscannerLogo from "@/assets/skyscanner.png";
import bookingLogo from "@/assets/booking.png";
import viatorLogo from "@/assets/viator.png";
import getyourguideLogo from "@/assets/getyourguide.png";
import Footer from "@/components/Footer";

const AboutUs = () => {
  const Location = useLocation();
  const isAboutUsPage = Location.pathname === "/about";
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {isAboutUsPage && <Header />}
      {/* Hero Section */}
      <section className="bg-travel-gradient text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          What Makes Our <span className="text-purple-500">Itinerary Planner</span> Different
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-black">
          Planning a trip can feel overwhelming. <span className="font-bold text-black bg-lime-300">Too many tabs, hours of research, no clear starting point.</span>
          That’s where <span className="font-bold text-black bg-lime-300">Itinerary generator</span> comes in. Our module understands your travel needs, using live data and smart itineraries to match your style, budget, and timing.
          From flights to hotels to activities, we handle the whole process so you can focus on the journey, not the research.
        </p>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Instant Itineraries */}
        <Card className="p-8 rounded-3xl shadow-md border-0 bg-gray-50 hover:shadow-lg transition-smooth">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            <span className="bg-lime-300 px-2 py-1 rounded-md">Instant itineraries</span>
          </h2>
          <p className="text-gray-600 mb-4">
            Enter your travel dates and destinations, and get a full plan while saving you hours, complete with flights, hotels, and activities.
          </p>
          <p className="text-gray-700 italic">
            <strong>Example:</strong> Planning a week in{" "}
            <Link to="/" className="text-blue-500 underline hover:text-blue-700">Rome?</Link> Trip Planner suggests a 7-day itinerary that balances classics like the Colosseum and Vatican with hidden gems like Trastevere and local trattorias.
            You’ll see timing, routes, and budget estimates all in one view.
          </p>
          <div className="mt-6 flex justify-center">
            <img
              src="https://img.icons8.com/ios/200/map--v1.png"
              alt="Itinerary illustration"
              className="w-40 h-40 object-contain"
            />
          </div>
        </Card>

        {/* Trips for Everyone */}
        <Card className="p-8 rounded-3xl shadow-md border-0 bg-gray-50 hover:shadow-lg transition-smooth">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            <span className="bg-lime-300 px-2 py-1 rounded-md">Trips for everyone</span>
          </h2>
          <p className="text-gray-600 mb-4">
            Every traveler is different, and your trip should reflect that. We adapt to your style, whether you’re planning a{" "}
            <Link to="/" className="text-blue-500 underline hover:text-blue-700">family vacation</Link> with downtime built in, a{" "}
            <Link to="/" className="text-blue-500 underline hover:text-blue-700">couples getaway</Link> filled with romantic moments, or a{" "}
            <Link to="/" className="text-blue-500 underline hover:text-blue-700">Pacific Coast Highway road trip</Link>.
          </p>
          <p className="text-gray-700 italic">
            Our trip designs journeys that match your pace and preferences.
          </p>
          <div className="mt-6 flex justify-center">
            <img
              src="https://img.icons8.com/ios/200/beach.png"
              alt="Trips illustration"
              className="w-40 h-40 object-contain"
            />
          </div>
        </Card>
      </section>

      {/* Trusted By Section */}
      <section className="bg-white py-16 text-center">
        <h3 className="text-sm text-gray-700 font-medium mb-2">8M+ trips planned</h3>
        <p className="text-gray-600 mb-8">⭐ 4.9 average rating</p>

        {/* Logo Marquee Section */}
        <div className="px-20"> {/* left & right distance */}
          <Marquee
            pauseOnHover={true}
            speed={50}
            gradient={false}
            className="flex items-center"
          >
            {[skyscannerLogo, bookingLogo, viatorLogo, getyourguideLogo, bookingLogo].map(
              (logo, i) => (
                <img
                  key={i}
                  src={logo}
                  alt={`logo-${i}`}
                  className="h-12 mx-12"
                />
              )
            )}
            {/* Duplicate once more for smooth loop */}
            {[skyscannerLogo, bookingLogo, viatorLogo, getyourguideLogo, bookingLogo].map(
              (logo, i) => (
                <img
                  key={`dup-${i}`}
                  src={logo}
                  alt={`logo-dup-${i}`}
                  className="h-12 mx-12"
                />
              )
            )}
          </Marquee>
        </div>
      </section>
      {isAboutUsPage && <Footer />}
    </div>
  );
};

export default AboutUs;
