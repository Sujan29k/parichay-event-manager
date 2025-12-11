import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import EventCard from "../components/common/EventCard";

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("currentUser");
    
    if (token && user) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const featuredEvents = [
    {
      id: 1,
      title: "Music Concert 2026",
      date: "Jan 15, 2026",
      location: "Kathmandu",
      imageUrl:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500",
    },
    {
      id: 2,
      title: "Tech Expo Nepal",
      date: "Feb 20, 2026",
      location: "Pokhara",
      imageUrl:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500",
    },
    {
      id: 3,
      title: "Startup Meetup",
      date: "Mar 10, 2026",
      location: "Lalitpur",
      imageUrl:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 text-gray-800 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-red-50 via-white to-red-50">
        <div className="max-w-6xl mx-auto text-center">
          {isLoggedIn && currentUser ? (
            <>
              <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                Welcome back,
                <span className="block text-red-600 mt-2">{currentUser.fullName}! 👋</span>
              </h2>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                Ready to discover your next amazing experience? Explore trending events, book tickets, and create unforgettable memories!
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/events")}
                  className="px-8 py-4 bg-red-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-red-700 transform hover:scale-105 transition"
                >
                  Browse All Events
                </button>
                <button
                  onClick={() => navigate("/my-tickets")}
                  className="px-8 py-4 bg-white text-red-600 border-2 border-red-600 text-lg font-semibold rounded-xl shadow hover:bg-red-50 transform hover:scale-105 transition"
                >
                  My Tickets
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                Discover & Book
                <span className="block text-red-600 mt-2">Amazing Events</span>
              </h2>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                Parichaya Events is your all-in-one platform to discover events,
                book tickets instantly, and manage your event experience with ease.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/events")}
                  className="px-8 py-4 bg-red-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-red-700 transform hover:scale-105 transition"
                >
                  Explore Events
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-8 py-4 bg-white text-red-600 border-2 border-red-600 text-lg font-semibold rounded-xl shadow hover:bg-red-50 transform hover:scale-105 transition"
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
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose Parichaya?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
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
              <h4 className="text-xl font-semibold mb-2">Quick Booking</h4>
              <p className="text-gray-600">
                Book your tickets in seconds with our streamlined checkout
                process.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
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
              <h4 className="text-xl font-semibold mb-2">Secure Payments</h4>
              <p className="text-gray-600">
                Safe and secure payment options for worry-free transactions.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
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
              <h4 className="text-xl font-semibold mb-2">Digital Tickets</h4>
              <p className="text-gray-600">
                Access your tickets anytime, anywhere from your mobile device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="px-6 py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900">
              Upcoming Events
            </h3>
            <button
              onClick={() => navigate("/events")}
              className="text-red-600 font-semibold hover:text-red-700 flex items-center gap-2"
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
                imageUrl={event.imageUrl}
                onViewDetails={() => navigate(`/events/${event.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h3 className="text-4xl font-bold mb-4">
            Ready to Experience Amazing Events?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of event-goers and start booking your tickets today!
          </p>
          <button
            onClick={() => navigate("/register")}
            className="px-10 py-4 bg-white text-red-600 text-lg font-bold rounded-xl shadow-xl hover:bg-gray-100 transform hover:scale-105 transition"
          >
            Get Started For Free
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
