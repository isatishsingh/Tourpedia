import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-key-code/firebase-auth-2-O";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchItinerary } from "@/store/itinerarySlice";

const TravelForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [user, setUser] = useState<any>(null); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      // trmporary blocked
      // If user is not authenticated, redirect to login
      if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  //  form response
  const submitForm = async (e: React.FormEvent) => {
    const body = { fromLocation, toLocation, travelDate, returnDate };
    const res = await fetch('http://localhost:3000/api/itinerary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    console.log('itinerary', json);
    // setItinerary(json.itinerary)  -> display in UI
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // temporary blocked
    // Double check if user is authenticated before submitting
    if (!user) {
      alert("Please log in to submit your travel details.");
      navigate('/login');
      return;
    }

    try {
      console.log(fromLocation," ",toLocation," ",travelDate," ",returnDate," <= 75");
      dispatch(
        fetchItinerary({
          fromLocation,
          toLocation,
          travelDate,
          returnDate,
        })
      );
      navigate('/itinerary');
    } catch (error) {
      console.error("Error generating itinerary:", error);
      alert("Failed to generate itinerary. Please try again.");
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <main className="min-h-screen bg-background py-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Loading...
            </h1>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background ">
      {/*header*/}
      <Header />
      <div className="max-w-2xl mx-auto px-6">
        {/* User Info and Logout */}
        {/* {user && (
          <div className="mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-travel-blue" />
                <div>
                  <p className="font-medium text-gray-800">
                    Welcome, {user.displayName || user.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-gray-600 hover:text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        )} */}

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Travel Itinerary Generator
          </h1>
          <p className="text-gray-600">
            Plan your perfect trip with our Itinerary generator
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