import { Card, CardContent } from "@/components/ui/card";
import templeBali from "@/assets/temple-bali.png";
import nusaPenida from "@/assets/nusa-penida.png";
import tanahLot from "@/assets/tanah-lot.png";

const TourHighlights = () => {
  const highlights = [
    {
      id: 1,
      image: templeBali,
      title: "Visiting Ubud and exploring the Tegallalang Rice Terraces",
      description: "On your second day, you'll head to Ubud to explore the stunning Tegallalang Rice Terraces. Experience the local culture and traditional craft shops while taking in the breathtaking views of the iconic terraced landscape."
    },
    {
      id: 2,
      image: nusaPenida,
      title: "Exploring Nusa Penida Island; a hidden gem of Bali",
      description: "On your third day, you'll take a boat journey to Nusa Penida island where you'll experience the best of what this island has to offer. From cultural landmarks to thrilling adventures, and serene beaches, this itinerary is designed to cater to every traveler's preference."
    },
    {
      id: 3,
      image: tanahLot,
      title: "Visiting the Tanah Lot temple and departure from Bali",
      description: "On your final day, you'll visit the iconic Tanah Lot temple with its stunning ocean views. Before your departure, you'll have time to explore local markets and shop for authentic Balinese souvenirs to take home as unforgettable memories."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-12">Tour Highlights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight) => (
            <Card key={highlight.id} className="overflow-hidden shadow-card border-0 hover:shadow-floating transition-shadow duration-300">
              <div className="aspect-video">
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3 leading-tight">
                  {highlight.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourHighlights;