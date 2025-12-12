import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, Users, Tag, ArrowLeft, Minus, Plus } from "lucide-react";
import Navbar from "../components/common/Navbar";

// Event data - in a real app, this would come from an API
const eventsData = [
  {
    id: 1,
    title: "Music Concert 2026",
    date: "Jan 15, 2026",
    time: "7:00 PM - 11:00 PM",
    location: "Kathmandu Concert Hall, Kathmandu",
    category: "Music",
    price: "NPR 1,500",
    capacity: "500 seats",
    imageUrl:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
    description:
      "Join us for an unforgettable evening of live music featuring some of Nepal's most talented artists. Experience a blend of traditional and contemporary music in a stunning venue. This concert promises to be a celebration of musical diversity and cultural heritage.",
    highlights: [
      "Live performances by top Nepali artists",
      "Premium sound and lighting system",
      "Food and beverage available",
      "VIP seating options",
    ],
    organizer: "Parichaya Events",
  },
  {
    id: 2,
    title: "Tech Expo Nepal",
    date: "Feb 20, 2026",
    time: "10:00 AM - 6:00 PM",
    location: "Pokhara Convention Center, Pokhara",
    category: "Technology",
    price: "NPR 800",
    capacity: "1000+ attendees",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    description:
      "Explore the latest in technology and innovation at Tech Expo Nepal. Connect with industry leaders, discover cutting-edge products, and attend insightful workshops. Perfect for tech enthusiasts, entrepreneurs, and anyone interested in the future of technology.",
    highlights: [
      "Latest tech product showcases",
      "Networking opportunities",
      "Expert panel discussions",
      "Startup pitch competitions",
    ],
    organizer: "Tech Nepal Association",
  },
  {
    id: 3,
    title: "Startup Meetup",
    date: "Mar 10, 2026",
    time: "2:00 PM - 7:00 PM",
    location: "Innovation Hub, Lalitpur",
    category: "Business",
    price: "Free",
    capacity: "200 attendees",
    imageUrl:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    description:
      "Connect with fellow entrepreneurs, investors, and startup enthusiasts. Share ideas, find co-founders, and learn from successful founders. This meetup features inspiring talks, networking sessions, and opportunities to pitch your startup ideas.",
    highlights: [
      "Founder success stories",
      "Investor networking",
      "Free mentorship sessions",
      "Pitch your startup idea",
    ],
    organizer: "Startup Nepal Community",
  },
  {
    id: 4,
    title: "Food Festival",
    date: "Apr 18, 2026",
    time: "11:00 AM - 9:00 PM",
    location: "Tundikhel Ground, Kathmandu",
    category: "Food",
    price: "NPR 500",
    capacity: "2000+ attendees",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    description:
      "Indulge in a culinary journey featuring diverse cuisines from across Nepal and beyond. Experience traditional dishes, modern fusion cuisine, live cooking demonstrations, and food competitions. A paradise for food lovers!",
    highlights: [
      "50+ food stalls",
      "Live cooking demonstrations",
      "Food competitions",
      "Cultural performances",
    ],
    organizer: "Nepal Food Association",
  },
  {
    id: 5,
    title: "Art Exhibition",
    date: "May 22, 2026",
    time: "9:00 AM - 5:00 PM",
    location: "Patan Museum, Patan",
    category: "Arts",
    price: "NPR 300",
    capacity: "300 attendees",
    imageUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
    description:
      "Discover contemporary and traditional art from talented Nepali artists. This exhibition showcases paintings, sculptures, installations, and digital art. Engage with artists, attend guided tours, and appreciate the rich artistic heritage of Nepal.",
    highlights: [
      "Works from 30+ artists",
      "Interactive installations",
      "Artist meet-and-greet",
      "Guided art tours",
    ],
    organizer: "Nepal Arts Council",
  },
  {
    id: 6,
    title: "Marathon 2026",
    date: "Jun 20, 2026",
    time: "5:00 AM - 12:00 PM",
    location: "Phewa Lake Circuit, Pokhara",
    category: "Sports",
    price: "NPR 1,000",
    capacity: "500 runners",
    imageUrl:
      "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800",
    description:
      "Challenge yourself in the scenic Marathon 2025 around beautiful Phewa Lake. Choose from full marathon, half marathon, or 5K fun run categories. Enjoy breathtaking mountain views while promoting health and fitness.",
    highlights: [
      "Multiple race categories",
      "Scenic lakeside route",
      "Professional timing system",
      "Medals and certificates",
    ],
    organizer: "Pokhara Sports Club",
  },
];

export default function SingleEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticketQuantity, setTicketQuantity] = useState(1);

  const event = eventsData.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Event Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The event you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/events")}
            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
          >
            Browse Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20">
        {/* Hero Image Section */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-6xl mx-auto">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-white mb-4 hover:text-red-300 transition"
              >
                <span className="inline-flex">
                  <ArrowLeft size={20} strokeWidth={2} />
                </span>
                Back
              </button>
              <span className="inline-block px-4 py-1 bg-red-600 text-white text-sm font-semibold rounded-full mb-3">
                {event.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {event.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Details */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Event Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="text-red-600 flex-shrink-0 mt-1">
                      <Calendar size={20} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="text-gray-900 font-semibold">
                        {event.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-red-600 flex-shrink-0 mt-1">
                      <Clock size={20} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="text-gray-900 font-semibold">
                        {event.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-red-600 flex-shrink-0 mt-1">
                      <MapPin size={20} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-900 font-semibold">
                        {event.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-red-600 flex-shrink-0 mt-1">
                      <Users size={20} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Capacity</p>
                      <p className="text-gray-900 font-semibold">
                        {event.capacity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About This Event
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {event.description}
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Event Highlights
                </h3>
                <ul className="space-y-2">
                  {event.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✓</span>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Organizer Section */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Organized By
                </h2>
                <p className="text-gray-700">{event.organizer}</p>
              </div>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Starting from</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {event.price}
                    </p>
                  </div>
                  <div className="text-red-600">
                    <Tag size={32} strokeWidth={2} />
                  </div>
                </div>

                {/* Ticket Quantity Selector */}
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Number of Tickets
                  </label>
                  <div className="flex items-center justify-between border-2 border-gray-200 rounded-xl p-3">
                    <button
                      onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="text-2xl font-bold text-gray-900">
                      {ticketQuantity}
                    </span>
                    <button
                      onClick={() => setTicketQuantity(Math.min(10, ticketQuantity + 1))}
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Maximum 10 tickets per booking</p>
                </div>

                <button
                  onClick={() => {
                    // Check if user is logged in
                    const token = localStorage.getItem("token");
                    if (!token) {
                      // Redirect to login with return path
                      navigate("/login", { state: { from: `/events/${id}` } });
                      return;
                    }
                    
                    // Extract numeric price from string (e.g., "NPR 1,500" -> 1500)
                    const priceValue = parseInt(event.price.replace(/[^0-9]/g, ""));
                    
                    // Navigate to checkout with event data
                    navigate("/checkout", {
                      state: {
                        id: event.id,
                        title: event.title,
                        date: event.date,
                        location: event.location,
                        price: priceValue,
                        quantity: ticketQuantity,
                        imageUrl: event.imageUrl
                      }
                    });
                  }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 mb-4"
                >
                  Book Now
                </button>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-semibold text-gray-900">
                      {event.category}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Organizer:</span>
                    <span className="font-semibold text-gray-900">
                      {event.organizer}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <p className="text-xs text-gray-500 text-center">
                    🔒 Secure booking powered by Parichaya Events
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
