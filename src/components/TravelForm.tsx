import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

const TravelForm = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ fromLocation, toLocation, travelDate, returnDate });
  };

  return (
    <main className="min-h-screen bg-background py-16">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Travel Itinerary Generator
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* From Field */}
          <div className="space-y-2">
            <Label htmlFor="from" className="text-base font-medium text-foreground">
              From:
            </Label>
            <Input
              id="from"
              type="text"
              placeholder="Enter your boarding point"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              className="h-12 bg-white border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* To Field */}
          <div className="space-y-2">
            <Label htmlFor="to" className="text-base font-medium text-foreground">
              To:
            </Label>
            <Input
              id="to"
              type="text"
              placeholder="Enter your destination"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              className="h-12 bg-white border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Travel Date */}
          <div className="space-y-2">
            <Label htmlFor="travelDate" className="text-base font-medium text-foreground">
              Travel Date:
            </Label>
            <div className="relative">
              <Input
                id="travelDate"
                type="date"
                placeholder="dd-mm-yyyy"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="h-12 bg-white border-border text-foreground pr-10"
              />
              <Calendar className="absolute right-3 top-3 h-6 w-6 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Return Date */}
          <div className="space-y-2">
            <Label htmlFor="returnDate" className="text-base font-medium text-foreground">
              Return Date:
            </Label>
            <div className="relative">
              <Input
                id="returnDate"
                type="date"
                placeholder="dd-mm-yyyy"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="h-12 bg-white border-border text-foreground pr-10"
              />
              <Calendar className="absolute right-3 top-3 h-6 w-6 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              type="submit" 
              className="bg-travel-blue hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-md"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default TravelForm;