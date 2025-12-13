import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, Ticket, Shield, Zap, Star, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
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
  const featuredEvents = getActiveEvents().slice(0, 3);

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
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, [location]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* ============================================
          HERO SECTION - Premium & Engaging
          ============================================ */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full opacity-30 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200 rounded-full opacity-30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-red-100 to-orange-100 rounded-full opacity-20 blur-3xl" />
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-32 right-20 w-16 h-16 bg-red-500 rounded-2xl rotate-12 opacity-10 hidden lg:block" />
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-orange-500 rounded-xl -rotate-12 opacity-10 hidden lg:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-red-200 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Your Gateway to Amazing Experiences</span>
            </div>

            {isLoggedIn && currentUser ? (
              <>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                  <span className="text-gray-900">
                    {currentUser.isFirstLogin ? "Welcome," : "Welcome back,"}
                  </span>
                  <span className="block mt-2 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
                    {currentUser.fullName}! 👋
                  </span>
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Ready for your next adventure? Discover trending events, secure your tickets, and create unforgettable memories.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate("/events")}
                    className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-lg font-semibold rounded-2xl shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Browse All Events
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => navigate("/my-tickets")}
                    className="px-8 py-4 bg-white text-red-600 border-2 border-red-200 text-lg font-semibold rounded-2xl shadow-lg hover:border-red-400 hover:bg-red-50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Ticket className="w-5 h-5" />
                    My Tickets
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                  <span className="text-gray-900">Discover & Book</span>
                  <span className="block mt-2 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
                    Amazing Events
                  </span>
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Your all-in-one platform to discover events, book tickets instantly, and manage your event experience with ease.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate("/events")}
                    className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-lg font-semibold rounded-2xl shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Explore Events
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="px-8 py-4 bg-white text-red-600 border-2 border-red-200 text-lg font-semibold rounded-2xl shadow-lg hover:border-red-400 hover:bg-red-50 hover:-translate-y-1 transition-all duration-300"
                  >
                    Create Free Account
                  </button>
                </div>
              </>
            )}

            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full border-2 border-white" />
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white" />
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-white" />
                </div>
                <span className="font-medium">10K+ Active Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">4.9 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">Secure Payments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          VALUE PROPOSITION SECTION
          ============================================ */}
      <section className="py-20 sm:py-28 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-red-600 font-semibold text-sm uppercase tracking-wider mb-4">
              <TrendingUp className="w-4 h-4" />
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need for
              <span className="block text-red-600">Perfect Event Experiences</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From discovery to entry, we've got you covered with powerful features designed for event lovers.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-500">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-500/30">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast Booking</h3>
              <p className="text-gray-600 leading-relaxed">
                Book your tickets in seconds with our streamlined checkout. No complicated forms, just quick and easy reservations.
              </p>
            </div>

            <div className="group p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-500">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Trusted</h3>
              <p className="text-gray-600 leading-relaxed">
                Your payments are protected with bank-grade security. Multiple payment options for your convenience.
              </p>
            </div>

            <div className="group p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-500">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/30">
                <Ticket className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Digital Tickets</h3>
              <p className="text-gray-600 leading-relaxed">
                Access your tickets anytime, anywhere. Just show your QR code at the venue - no printing needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURED EVENTS SECTION
          ============================================ */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-200 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
            <div>
              <span className="inline-flex items-center gap-2 text-red-600 font-semibold text-sm uppercase tracking-wider mb-3">
                <Calendar className="w-4 h-4" />
                Don't Miss Out
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                Featured Events
              </h2>
              <p className="mt-3 text-gray-600 text-lg">
                Discover what's happening near you
              </p>
            </div>
            <button
              onClick={() => navigate("/events")}
              className="group flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
            >
              View All Events
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Events Grid */}
          {featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  id={String(event.id)}
                  title={event.title}
                  date={event.date}
                  location={event.location}
                  imageUrl={event.image}
                  price={event.price}
                  category={event.category}
                  onViewDetails={() => navigate(`/events/${event.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Events Yet</h3>
              <p className="text-gray-600">Check back soon for exciting events!</p>
            </div>
          )}
        </div>
      </section>

      {/* ============================================
          CTA SECTION - Premium Dark Theme
          ============================================ */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600 rounded-full opacity-10 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-red-500/30">
            <Star className="w-4 h-4 fill-red-400" />
            Join 10,000+ Happy Users
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Experience
            <span className="block bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Something Amazing?
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of event enthusiasts and never miss out on exciting experiences happening around you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/register")}
              className="group px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-lg font-semibold rounded-2xl shadow-2xl shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate("/events")}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-2xl border border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              Browse Events
            </button>
          </div>

          {/* Stats Row */}
          <div className="mt-20 pt-12 border-t border-white/10 grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">10K+</div>
              <div className="text-sm text-gray-500 font-medium">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-sm text-gray-500 font-medium">Events Hosted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">50K+</div>
              <div className="text-sm text-gray-500 font-medium">Tickets Sold</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

