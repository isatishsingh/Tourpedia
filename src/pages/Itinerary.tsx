import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import TourHighlights from "@/components/TourHighlights";
import PhotoGallery from "@/components/PhotoGallery";
import ItineraryTimeline from "@/components/ItineraryTimeLine";
import HeroSection from "@/components/ItineraryHero";
import Footer from "@/components/Footer";

const Itinerary = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <MainContent />
      <TourHighlights />
      <ItineraryTimeline />
      <PhotoGallery />
      <Footer/>
    </div>
  );
};

export default Itinerary;