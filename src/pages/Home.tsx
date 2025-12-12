import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import EventCard from "../components/common/EventCard";
import { useEvents } from "../context/EventContext";

interface CurrentUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  isFirstLogin?: boolean;
}

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const { getActiveEvents } = useEvents();
  const featuredEvents = getActiveEvents().slice(0, 3); // Get first 3 active events

  // Check login status on component mount and route changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("currentUser");

      if (token && user) {
        setIsLoggedIn(true);
        setCurrentUser(JSON.parse(user));
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    };

    checkLoginStatus();

    // Listen for storage changes (when user logs out in another tab or component)
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [location]);

  return (
    <div className="bg-linear-to-b from-white to-gray-50 text-gray-800 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 bg-linear-to-br from-red-50 via-white to-red-50">
        <div className="max-w-6xl mx-auto text-center">
          {isLoggedIn && currentUser ? (
            <>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                {currentUser.isFirstLogin ? "Welcome," : "Welcome back,"}
                <span className="block text-red-600 mt-2">
                  {currentUser.fullName}! 👋
                </span>
              </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Ready to discover your next amazing experience? Explore trending
                events, book tickets, and create unforgettable memories!
              </p>
              <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <button
                  onClick={() => navigate("/events")}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-red-600 text-white text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:bg-red-700 transform hover:scale-105 transition"
                >
                  Browse All Events
                </button>
                <button
                  onClick={() => navigate("/my-tickets")}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-red-600 border-2 border-red-600 text-base sm:text-lg font-semibold rounded-xl shadow hover:bg-red-50 transform hover:scale-105 transition"
                >
                  My Tickets
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Discover & Book
                <span className="block text-red-600 mt-2">Amazing Events</span>
              </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Parichaya Events is your all-in-one platform to discover events,
                book tickets instantly, and manage your event experience with
                ease.
              </p>
              <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <button
                  onClick={() => navigate("/events")}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-red-600 text-white text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:bg-red-700 transform hover:scale-105 transition"
                >
                  Explore Events
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-red-600 border-2 border-red-600 text-base sm:text-lg font-semibold rounded-xl shadow hover:bg-red-50 transform hover:scale-105 transition"
                >
                  Create Account
                </button>
              </div>
            </>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-200 rounded-full opacity-50 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-red-300 rounded-full opacity-40 blur-2xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900">
            Why Choose Parichaya?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6 rounded-xl hover:shadow-lg transition">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Quick Booking</h4>
              <p className="text-sm sm:text-base text-gray-600">
                Book your tickets in seconds with our streamlined checkout
                process.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl hover:shadow-lg transition">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Secure Payments</h4>
              <p className="text-sm sm:text-base text-gray-600">
                Safe and secure payment options for worry-free transactions.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl hover:shadow-lg transition">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Quick Booking</h4>
              <p className="text-sm sm:text-base text-gray-600">
                Access your tickets anytime, anywhere from your mobile device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Upcoming Events
            </h3>
            <button
              onClick={() => navigate("/events")}
              className="text-red-600 font-semibold hover:text-red-700 flex items-center gap-2 text-sm sm:text-base"
            >
              View All
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {featuredEvents.map((event) => (
              <EventCard
                key={event.id}
                id={String(event.id)}
                title={event.title}
                date={event.date}
                location={event.location}
                imageUrl={event.image}
                onViewDetails={() => navigate(`/events/${event.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-red-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-red-600 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-red-500/30">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Join Our Community
          </div>
          
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight px-4">
            Discover Events That <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              Match Your Passion
            </span>
          </h3>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
            Join thousands of event enthusiasts and never miss out on exciting experiences happening around you
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <button
              onClick={() => navigate("/register")}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-base sm:text-lg font-semibold rounded-xl shadow-2xl hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Get Started Free
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button
              onClick={() => navigate("/events")}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white text-base sm:text-lg font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Browse Events
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-10 sm:mt-16 pt-8 sm:pt-12 border-t border-white/10">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">10K+</div>
              <div className="text-xs sm:text-sm text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">500+</div>
              <div className="text-xs sm:text-sm text-gray-400">Events Hosted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">50K+</div>
              <div className="text-xs sm:text-sm text-gray-400">Tickets Sold</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
