import BookingCard from "./BookingCard";

const MainContent = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Content */}
          <div className="flex-1">
            <p className="text-coral text-sm font-medium mb-2 uppercase tracking-wide">
              Experience the best of Bali in 4 days
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              A Journey of Culture, Adventure, and Tranquility
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Embark on a 4-day journey to Bali, where you'll experience the best of what this 
              island has to offer. From cultural landmarks to thrilling adventures, and serene 
              beaches, this itinerary is designed to cater to every traveler's preference.
            </p>
          </div>

          {/* Right Booking Card */}
          <div className="lg:w-80 w-full flex justify-center">
            <BookingCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainContent;