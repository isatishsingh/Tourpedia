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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/travel-form" element={<TravelForm />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/itinerary" element={<Itinerary />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
