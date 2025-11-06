import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Plane, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";
import Hudson from "@/assets/Hudson.png";
import Abigail from "@/assets/Abigail.png";
import Maddison from "@/assets/Maddison.jpeg";

const ContactUs = () => {
  const Location = useLocation();
  const isContactUsPage = location.pathname === "/contactus"; // check Path

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [credentialError, setCredentialError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!formData.name || !formData.email || !formData.message) {
      alert("Enter the details properly");
      setCredentialError(true);
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/contact/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ add this
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = response.json();
      if (!data) {
        alert("there is some error");
      } else {
        setTimeout(() => {
          toast({
            title: "Message Sent Successfully! ✈️",
            description:
              "Thanks for reaching out! We'll get back to you within 24 hours to help plan your next adventure.",
          });
          setFormData({ name: "", email: "", message: "" });
          setIsLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.log("Error =>", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const faqData = [
    {
      question: "How far in advance should I book my tour and travel plans?",
      answer:
        "It is recommended to book your tour and travel plans at least 3-6 months in advance, especially if you are traveling during peak season.",
      isOpen: true,
    },
    {
      question: "What documents do I need to travel internationally?",
      answer:
        "For international travel, you typically need a valid passport, visa (if required), travel insurance, and any necessary health certificates or vaccinations.",
      isOpen: false,
    },
    {
      question:
        "How much money should I budget for my tour and travel expenses?",
      answer:
        "Travel budgets vary greatly depending on destination, accommodation level, and activities. We recommend budgeting 20-30% more than your initial estimates for unexpected expenses.",
      isOpen: false,
    },
    {
      question:
        "What are some tips for packing efficiently for my tour and travel trip?",
      answer:
        "Pack versatile clothing that can be layered, bring only essentials, use packing cubes, and always check airline baggage restrictions before traveling.",
      isOpen: false,
    },
  ];

  const teamMembers = [
    {
      name: "Maddison Down",
      role: "Support 24 Hours",
      image: Maddison,
    },
    {
      name: "Hudson Godfrey",
      role: "Support 24 Hours",
      image: Hudson,
    },
    {
      name: "Abigail Bussell",
      role: "Support 24 Hours",
      image: Abigail,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {isContactUsPage && (
        <div>
          {/* Header */}
          <Header />
          {/* Hero Section */}
          <div className="relative h-96 bg-gradient-to-r from-slate-800 to-slate-600 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-50"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
              }}
            />
            <div className="relative z-10 text-center text-white">
              <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
              <div className="flex items-center justify-center space-x-2 text-lg">
                <span className="text-pink-400">Home</span>
                <ChevronRight className="w-5 h-5" />
                <span>Contact Us</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Contact Section */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20 ml-20 ">
          {/* Left Side - Contact Info */}
          <div>
            <p className="text-pink-500 font-semibold mb-4 tracking-wider">
              GET IN TOUCH
            </p>
            <h2 className="text-4xl font-bold text-slate-800 text-5xl mb-6 leading-tight">
              Let's Plan Your Next Adventure Together
            </h2>
            <p className="text-slate-400 text-xl mb-8 leading-relaxed">
              Have questions about our services or want to start planning your
              next adventure? Our team is here to help.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-800 mb-2">
                    Address
                  </h3>
                  <p className="text-slate-600 text-lg">Pune, India</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-xl mb-2">
                    Phone
                  </h3>
                  <p className="text-slate-600">+91 999882323</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-xl mb-2">
                    Mail
                  </h3>
                  <p className="text-slate-600 text-base">tourPedia@mail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <Card className="bg-blue-200 border-0 shadow-lg mr-20 ">
              <CardContent className="p-20">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-slate-700 font-bold mb-2 text-lg">
                      Full Name
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ex: Jhon Smith"
                      required
                      className="bg-white border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold text-lg mb-2">
                      Email Address
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Ex: jhonsmith@gmail.com"
                      required
                      className="bg-white border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold text-lg mb-2">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Type your message here..."
                      rows={6}
                      required
                      className="bg-white border-gray-200 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 text-lg hover:bg-blue-600 text-white py-5 px-5 rounded-lg font-medium"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending Message...</span>
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="grid lg:grid-cols-3 gap-12 m-20">
          {/* Left Side - FAQ Header & Team (1/3) */}
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 mb-8">
              If you can't find the answer you're looking for, our customer
              service team is always here to help.
            </p>

            {/* Team Members */}
            <div className="space-y-6 mb-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex-shrink-0 flex items-center justify-center shadow-md">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-lg">
                      {member.name}
                    </h4>
                    <p className="text-pink-500 font-medium">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg">
              Contact Us
            </Button>
          </div>

          {/* Right Side - FAQ Accordion (2/3) */}
          <div className="lg:col-span-2">
            <Accordion
              type="single"
              collapsible
              className="space-y-4"
              defaultValue={faqData[0].isOpen ? "item-0" : ""}
            >
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className={`${
                    faq.isOpen ? "bg-slate-800 text-white" : "bg-gray-100"
                  } rounded-lg border-0 px-6 py-4 transition-all duration-200`}
                >
                  <AccordionTrigger
                    className={`${
                      faq.isOpen ? "text-pink-400" : "text-slate-700"
                    } hover:no-underline font-medium text-left`}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent
                    className={`${
                      faq.isOpen ? "text-gray-300" : "text-slate-600"
                    } pb-4 pt-2`}
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
      {/* Footer*/}
      {isContactUsPage && <Footer />}
    </div>
  );
};

export default ContactUs;
