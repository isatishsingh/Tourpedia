import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginScreen from "./pages/LoginScreen";
import SignupScreen from "./pages/SignUpScreen";
import TravelForm from "./components/TravelForm";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Testimonial from "./pages/Testimonial";
import UserProfile from "./pages/UserProfile";
import Itinerary from "./pages/Itinerary";
import { useEffect } from "react";
import { setUser } from "./store/authSlice";
import { useDispatch } from "react-redux";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      dispatch(setUser(JSON.parse(storedUser))); // Restore user in Redux state
    }
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                // <ProtectedRoute>
                  <Index />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/travel-form"
              element={
                <ProtectedRoute>
                  <TravelForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                  <LoginScreen />
              }
            />
            <Route
              path="/signup"
              element={
                  <SignupScreen />
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <AboutUs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contactus"
              element={
                <ProtectedRoute>
                  <ContactUs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/testimonial"
              element={
                <ProtectedRoute>
                  <Testimonial />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/itinerary"
              element={
                <ProtectedRoute>
                  <Itinerary />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
