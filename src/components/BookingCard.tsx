import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const BookingCard = () => {
  return (
    <Card className="bg-card shadow-floating border-0 w-full max-w-sm">
      <CardContent className="p-6 space-y-4">
        {/* Duration */}
        <div>
          <span className="text-sm text-muted-foreground">Duration</span>
          <p className="text-2xl font-bold text-foreground">4 Days</p>
        </div>

        {/* Price */}
        <div>
          <span className="text-sm text-muted-foreground">From</span>
          <div className="flex items-baseline space-x-1">
            <span className="text-3xl font-bold text-foreground">Rs.499</span>
            <span className="text-sm text-muted-foreground">INR</span>
          </div>
        </div>

        {/* Rating */}
        <div>
          <span className="text-sm text-muted-foreground">Tour Rating</span>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-foreground">4.8</span>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">(340 reviews)</p>
        </div>

        {/* Book Now Button */}
        <Button  className="book_btn" >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookingCard;