import { useState } from "react";
import {
  Camera,
  Edit3,
  MessageSquare,
  Twitter,
  Heart,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TestimonialForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    occupation: "",
    title: "",
    review: "",
    rating: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (value: number) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // ✅ must exist (logged-in user)

    if (!token) {
      alert("⚠ Please log in to submit a testimonial.");
      navigate("/login");
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/testimonial/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Required due to auth middleware
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Response:", result);

      if (result?.success) {
        alert("✅ Testimonial submitted successfully!");
        setFormData({
          name: "",
          occupation: "",
          title: "",
          review: "",
          rating: 0,
        });
      } else {
        alert("⚠ Failed to submit testimonial. Try again.");
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      alert("❌ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[15%] animate-float-slow">
          <div className="bg-white rounded-full p-4 shadow-lg">
            <Camera className="w-6 h-6 text-purple-600" />
          </div>
        </div>

        <div className="absolute top-[25%] right-[18%] animate-float-medium">
          <div className="bg-white rounded-full p-4 shadow-lg">
            <Edit3 className="w-6 h-6 text-purple-600" />
          </div>
        </div>

        <div className="absolute top-[45%] left-[12%] animate-float-slow">
          <div className="bg-white rounded-full p-4 shadow-lg">
            <Edit3 className="w-6 h-6 text-purple-600" />
          </div>
        </div>

        <div className="absolute top-[60%] right-[15%] animate-float-medium">
          <div className="bg-white rounded-full p-4 shadow-lg">
            <MessageSquare className="w-6 h-6 text-purple-600" />
          </div>
        </div>

        <div className="absolute bottom-[25%] right-[20%] animate-float-slow">
          <div className="bg-white rounded-full p-4 shadow-lg">
            <Twitter className="w-6 h-6 text-purple-600" />
          </div>
        </div>

        <div className="absolute top-[20%] left-[20%] animate-float-medium">
          <div className="bg-white rounded-full p-3 shadow-lg">
            <Camera className="w-5 h-5 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Share Your Own Experience
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Heart className="w-4 h-4 text-purple-600 fill-purple-600" />
            <span>Powered by tourPedia</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="flex items-start gap-4">
                {/* <div className="relative">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                      <Camera className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div> */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Almost done 🙌
                  </h3>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Smith"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Occupation / Role
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    placeholder="ex. Marketing at LinkedIn"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                  />
                  {/* <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button> */}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title of Testimonial
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Unforgettable Memories"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Write your experience with us
                </label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  placeholder="write what you feel"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Your Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= formData.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 hover:text-yellow-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {formData.rating > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {formData.rating} out of 5 stars
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-purple-600 text-white font-semibold py-3 rounded-lg transition shadow-lg shadow-purple-600/30
  ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-700"}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                    Submitting...
                  </div>
                ) : (
                  "Submit"
                )}
              </button>

              <p className="text-xs text-center text-gray-500 leading-relaxed">
                By submitting, you give us permission to use this testimonial
                across social channels and other marketing efforts
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestimonialForm;
