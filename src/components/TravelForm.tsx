import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-key-code/firebase-auth-2-O";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchItinerary } from "@/store/itinerarySlice";

const TravelForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0];

  // ✅ Authentication check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (!user) navigate("/login");
    });
    return () => unsubscribe();
  }, [navigate]);

  // ✅ Validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fromLocation.trim()) newErrors.fromLocation = "Please enter your departure location.";
    if (!toLocation.trim()) newErrors.toLocation = "Please enter your destination.";
    if (!travelDate) newErrors.travelDate = "Please select your travel date.";
    if (!returnDate) newErrors.returnDate = "Please select your return date.";
    if (travelDate && returnDate && returnDate < travelDate)
      newErrors.returnDate = "Return date cannot be before the travel date.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!user) {
      alert("Please log in to submit your travel details.");
      navigate("/login");
      return;
    }

    try {
      dispatch(fetchItinerary({ fromLocation, toLocation, travelDate, returnDate }));
      navigate("/itinerary");
    } catch (error) {
      console.error("Error generating itinerary:", error);
      alert("Failed to generate itinerary. Please try again.");
    }
  };

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // ✅ Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-background py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Loading...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Travel Itinerary Generator
          </h1>
          <p className="text-gray-600">
            Plan your perfect trip with our itinerary generator
          </p>
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
              onChange={(e) => {
                setFromLocation(e.target.value);
                if (errors.fromLocation) setErrors((prev) => ({ ...prev, fromLocation: "" }));
              }}
              className={`h-12 bg-white border ${
                errors.fromLocation ? "border-red-500" : "border-border"
              } text-foreground placeholder:text-muted-foreground`}
            />
            {errors.fromLocation && (
              <p className="text-red-500 text-sm mt-1">{errors.fromLocation}</p>
            )}
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
              onChange={(e) => {
                setToLocation(e.target.value);
                if (errors.toLocation) setErrors((prev) => ({ ...prev, toLocation: "" }));
              }}
              className={`h-12 bg-white border ${
                errors.toLocation ? "border-red-500" : "border-border"
              } text-foreground placeholder:text-muted-foreground`}
            />
            {errors.toLocation && (
              <p className="text-red-500 text-sm mt-1">{errors.toLocation}</p>
            )}
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
                value={travelDate}
                onChange={(e) => {
                  const selected = e.target.value;
                  setTravelDate(selected);
                  if (returnDate && selected > returnDate) setReturnDate("");
                  if (errors.travelDate)
                    setErrors((prev) => ({ ...prev, travelDate: "" }));
                }}
                className={`h-12 bg-white border ${
                  errors.travelDate ? "border-red-500" : "border-border"
                } text-foreground pr-10`}
                min={today}
              />
              <Calendar className="absolute right-3 top-3 h-6 w-6 text-muted-foreground pointer-events-none" />
            </div>
            {errors.travelDate && (
              <p className="text-red-500 text-sm mt-1">{errors.travelDate}</p>
            )}
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
                value={returnDate}
                onChange={(e) => {
                  setReturnDate(e.target.value);
                  if (errors.returnDate)
                    setErrors((prev) => ({ ...prev, returnDate: "" }));
                }}
                className={`h-12 bg-white border ${
                  errors.returnDate ? "border-red-500" : "border-border"
                } text-foreground pr-10`}
                min={travelDate || today} // ✅ allows same day or after
                disabled={!travelDate}
              />
              <Calendar className="absolute right-3 top-3 h-6 w-6 text-muted-foreground pointer-events-none" />
            </div>
            {errors.returnDate && (
              <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>
            )}
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
