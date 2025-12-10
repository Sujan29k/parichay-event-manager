import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";

export default function Events() {
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      title: "Music Concert 2025",
      date: "Jan 12, 2025",
      location: "Kathmandu",
      category: "Music",
      color: "from-red-400 to-pink-500",
    },
    {
      id: 2,
      title: "Tech Expo Nepal",
      date: "Feb 03, 2025",
      location: "Pokhara",
      category: "Technology",
      color: "from-blue-400 to-cyan-500",
    },
    {
      id: 3,
      title: "Startup Meetup",
      date: "Mar 18, 2025",
      location: "Lalitpur",
      category: "Business",
      color: "from-purple-400 to-indigo-500",
    },
    {
      id: 4,
      title: "Food Festival",
      date: "Apr 22, 2025",
      location: "Kathmandu",
      category: "Food",
      color: "from-green-400 to-emerald-500",
    },
    {
      id: 5,
      title: "Art Exhibition",
      date: "May 10, 2025",
      location: "Patan",
      category: "Arts",
      color: "from-orange-400 to-amber-500",
    },
    {
      id: 6,
      title: "Marathon 2025",
      date: "Jun 15, 2025",
      location: "Pokhara",
      category: "Sports",
      color: "from-teal-400 to-cyan-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Events
            </h1>
            <p className="text-xl text-gray-600">
              Find and book tickets for amazing events near you
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search events..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                <option>All Categories</option>
                <option>Music</option>
                <option>Technology</option>
                <option>Business</option>
                <option>Food</option>
                <option>Arts</option>
                <option>Sports</option>
              </select>
              <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition">
                Search
              </button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer"
                onClick={() => navigate(`/events/${event.id}`)}
              >
                <div
                  className={`h-48 bg-gradient-to-br ${event.color} flex items-center justify-center`}
                >
                  <div className="text-white text-center">
                    <div className="text-sm font-semibold mb-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full inline-block">
                      {event.category}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {event.date}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {event.location}
                  </p>
                  <button className="w-full px-4 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
