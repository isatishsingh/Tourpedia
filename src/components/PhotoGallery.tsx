const PhotoGallery = () => {
    // Mock traveler photos data
    const photos = [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=500&fit=crop",
        username: "@carlanmiguel",
        aspectRatio: "aspect-[4/5]"
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1558005137-d9619a5c2509?w=400&h=400&fit=crop",
        username: "@princessaguayo",
        aspectRatio: "aspect-square"
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=500&fit=crop",
        username: "@badaochocolate",
        aspectRatio: "aspect-[4/5]"
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop",
        username: "@aliefarjad",
        aspectRatio: "aspect-[4/5]"
      },
      {
        id: 5,
        image: "https://images.unsplash.com/photo-1571071718633-6265aaf4e324?w=400&h=400&fit=crop",
        username: "@azimovic",
        aspectRatio: "aspect-square"
      },
      {
        id: 6,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop",
        username: "@burranan",
        aspectRatio: "aspect-square"
      },
      {
        id: 7,
        image: "https://images.unsplash.com/photo-1577949924003-76fb95d48e7c?w=400&h=400&fit=crop",
        username: "@rip.felix.p",
        aspectRatio: "aspect-square"
      },
      {
        id: 8,
        image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=400&fit=crop",
        username: "@asrirezeki",
        aspectRatio: "aspect-square"
      }
    ];
  
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12">Photos From Our Travellers</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className={`relative overflow-hidden rounded-lg shadow-card hover:shadow-floating transition-shadow duration-300 ${photo.aspectRatio}`}
              >
                <img
                  src={photo.image}
                  alt={`Photo by ${photo.username}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Username Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <span className="text-white text-sm font-medium">{photo.username}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default PhotoGallery;