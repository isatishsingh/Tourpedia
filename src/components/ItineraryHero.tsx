import heroBackground from "@/assets/hero-background.png";

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 hero-background"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Itinerary</h1>
        
        {/* Breadcrumb */}
        <div className="flex items-center justify-center space-x-2 text-sm">
          <span className="text-coral">Home</span>
          <span>&gt;</span>
          <span>Itinerary</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;