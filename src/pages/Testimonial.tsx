import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { useLocation } from "react-router-dom";

const testimonials = [
    {
        name: "Sophia Johnson",
        role: "Freelance Travel Writer",
        title: "Unforgettable Experience",
        text: "The tour was an unforgettable experience. I got to see breathtaking landscapes and learn so much about the local culture. I highly recommend this tour to anyone who wants to travel and explore new destinations.",
        rating: 5,
        img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Robert Leo",
        role: "Business Owner",
        title: "Highly Recommended",
        text: "I had an amazing time on this tour, the guides were very knowledgeable and friendly. The accommodations and activities were top-notch. I highly recommend this tour to anyone looking to make unforgettable memories.",
        rating: 5,
        img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Emily Kim",
        role: "High School Teacher",
        title: "Fun and Educational",
        text: "The tour was both fun and educational. I learned so much about the history and culture of the places we visited while having a great time. I would definitely go on this tour again!",
        rating: 5,
        img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
        name: "James Chen",
        role: "Software Engineer",
        title: "Exceeded Expectations",
        text: "The tour exceeded my expectations in every way. The guides were friendly, the activities were exciting and diverse, and the accommodations were comfortable and clean.",
        rating: 5,
        img: "https://randomuser.me/api/portraits/men/76.jpg",
    },
    {
        name: "Samantha Davis",
        role: "Marketing Manager",
        title: "Spectacular Views",
        text: "The tour took us to some of the most beautiful places I have ever seen. The views were truly spectacular and the activities were exciting and fun. I would recommend this tour to anyone who loves nature and adventure.",
        rating: 5,
        img: "https://randomuser.me/api/portraits/women/78.jpg",
    },
    {
        name: "Michael Wong",
        role: "Graphic Designer",
        title: "Unforgettable Memories",
        text: "This tour gave me some of the best memories of my life. The experiences were authentic and unique, the guides were knowledgeable, and the accommodations were comfortable and clean.",
        rating: 5,
        img: "https://randomuser.me/api/portraits/men/51.jpg",
    },
];

const Testimonial = () => {
    const Location = useLocation();
    const isTestimonialPage = location.pathname === "/testimonial"; // check Path

    return (
        <div>
            {isTestimonialPage && <Header />}
            <section className="bg-pink-500 py-16 px-6">
                {/* navbar */}
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
                        <div>
                            <p className="uppercase text-xl text-white font-semibold  tracking-wide mb-2">
                                <span className="bg-yellow-500">Testimonial</span>
                            </p>
                            <h2 className="text-4xl font-bold text-white mb-4">
                                Hear from Our Happy <br /> Travelers
                            </h2>
                            <p className="text-white/90 max-w-lg">
                                Don’t just take our word for it – hear from our satisfied travelers!
                                Read their testimonials and discover why they choose us for their
                                travel needs.
                            </p>
                        </div>
                        <div className="bg-blue-900 text-white rounded-2xl p-8 text-center">
                            <h3 className="text-lg font-semibold mb-2">Customer Satisfaction</h3>
                            <div className="flex justify-center gap-2 mb-3">
                                <span className="text-teal-400 text-2xl text-yellow-500">★</span>
                                <span className="text-teal-400 text-2xl text-yellow-500">★</span>
                                <span className="text-teal-400 text-2xl text-yellow-500">★</span>
                                <span className="text-teal-400 text-2xl text-yellow-500">★</span>
                                <span className="text-teal-400 text-2xl">★</span>
                            </div>
                            <p className="text-sm">See over 16,851 reviews on</p>
                            <a
                                href="#"
                                className="underline text-sm font-medium hover:text-teal-300"
                            >
                                ReviewSite
                            </a>
                        </div>
                    </div>

                    {/* Testimonial Cards */}
                    <div className="grid md:grid-cols-3 gap-8 ">
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl shadow-md p-6 transition
                            transform duration-300 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl cursor-pointer"
                            >
                                <div className="flex items-center mb-4">
                                    <img
                                        src={t.img}
                                        alt={t.name}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900">{t.name}</h4>
                                        <p className="text-sm text-gray-500">{t.role}</p>
                                    </div>
                                </div>
                                <h5 className="text-lg font-semibold text-gray-900 mb-2">
                                    {t.title}
                                </h5>
                                <p className="text-gray-600 mb-4">{t.text}</p>
                                <div className="flex items-center">
                                    <span className="font-bold text-lg mr-2">{t.rating}.0</span>
                                    <div className="flex text-yellow-400">
                                        {Array.from({ length: t.rating }).map((_, idx) => (
                                            <span key={idx}>★</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {isTestimonialPage && <Footer />}
        </div>
    );
};

export default Testimonial;
