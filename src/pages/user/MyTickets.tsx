import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Ticket, Download, CheckCircle, Clock, QrCode, Share2, Mail } from "lucide-react";
import Navbar from "../../components/common/Navbar";

interface Booking {
  bookingId: string;
  title: string;
  date: string;
  location: string;
  imageUrl?: string;
  quantity: number;
  totalAmount: number;
  paymentMethod: string;
  walletType?: string;
  bankName?: string;
  id: string;
}

export default function MyTickets() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");

  // Initialize bookings from localStorage
  const [bookings] = useState<Booking[]>(() => {
    const token = localStorage.getItem("token");
    const currentUser = localStorage.getItem("currentUser");

    if (!token || !currentUser) {
      return [];
    }

    const user = JSON.parse(currentUser);
    return JSON.parse(localStorage.getItem(`bookings_${user.id}`) || "[]");
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const currentUser = localStorage.getItem("currentUser");

    if (!token || !currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  // Separate active and past tickets based on date
  const now = new Date();
  const activeTickets = bookings.filter((booking) => {
    const eventDate = new Date(booking.date);
    return eventDate >= now;
  });

  const pastTickets = bookings.filter((booking) => {
    const eventDate = new Date(booking.date);
    return eventDate < now;
  });

  const tickets = activeTab === "active" ? activeTickets : pastTickets;

  const handleDownloadTicket = (ticket: Booking) => {
    // Simulate ticket download
    alert(`Downloading ticket for ${ticket.title}\nBooking ID: ${ticket.bookingId}`);
  };

  const handleShareTicket = (ticket: Booking) => {
    if (navigator.share) {
      navigator.share({
        title: ticket.title,
        text: `Check out my ticket for ${ticket.title}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      alert("Sharing not supported on this device");
    }
  };

  const handleEmailTicket = (ticket: Booking) => {
    window.location.href = `mailto:?subject=My Ticket for ${ticket.title}&body=Booking ID: ${ticket.bookingId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      <Navbar />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Ticket className="w-4 h-4" />
              Your Bookings
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              My Tickets
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Manage your event tickets and bookings in one place
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Ticket className="w-6 h-6" />
                </div>
                <span className="text-3xl font-bold">{activeTickets.length}</span>
              </div>
              <p className="text-red-100 text-sm">Active Tickets</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <span className="text-3xl font-bold">{pastTickets.length}</span>
              </div>
              <p className="text-blue-100 text-sm">Past Events</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-3xl font-bold">{bookings.length}</span>
              </div>
              <p className="text-green-100 text-sm">Total Bookings</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-2 mb-6 inline-flex gap-2">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "active"
                  ? "bg-red-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Active ({activeTickets.length})
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "past"
                  ? "bg-red-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Past ({pastTickets.length})
            </button>
          </div>

          {/* Tickets List */}
          {tickets.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-16 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Ticket className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No {activeTab === "active" ? "Active" : "Past"} Tickets
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {activeTab === "active"
                  ? "You don't have any upcoming events. Discover amazing events happening near you!"
                  : "No past events found in your booking history."}
              </p>
              <button
                onClick={() => navigate("/events")}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition font-semibold shadow-lg hover:shadow-xl inline-flex items-center gap-2 group"
              >
                Browse Events
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {tickets.map((ticket) => (
                <div
                  key={ticket.bookingId}
                  className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Left Section: Event Details + QR Code */}
                    <div className="flex flex-col">
                      {/* Event Details */}
                      <div className="flex-1 p-8">
                        {/* Status Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-green-100 px-4 py-2 rounded-xl inline-flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-bold text-green-700">Confirmed</span>
                          </div>
                          {activeTab === "active" && (
                            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-xl inline-flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm font-semibold">Upcoming</span>
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                          {ticket.title}
                        </h3>

                        {/* Event Info */}
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-3 text-gray-600">
                            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                              <Calendar className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-medium">Event Date</p>
                              <p className="font-semibold text-gray-900">{ticket.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-gray-600">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                              <MapPin className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-medium">Location</p>
                              <p className="font-semibold text-gray-900">{ticket.location}</p>
                            </div>
                          </div>
                        </div>

                        {/* Booking Details Grid */}
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5">
                          <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                            <div className="w-1 h-4 bg-red-600 rounded-full"></div>
                            Booking Details
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-500 font-medium mb-1">Booking ID</p>
                              <p className="font-bold text-gray-900 text-sm break-all">
                                #{ticket.bookingId}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-medium mb-1">Tickets</p>
                              <p className="font-bold text-gray-900 text-sm flex items-center gap-1">
                                <Ticket className="w-4 h-4 text-red-600" />
                                {ticket.quantity}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-medium mb-1">Total Paid</p>
                              <p className="font-bold text-green-600 text-sm">
                                ₹{ticket.totalAmount?.toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-medium mb-1">Payment</p>
                              <p className="font-bold text-gray-900 text-sm break-words">
                                {ticket.paymentMethod === "wallet" ||
                                ticket.paymentMethod === "upi"
                                  ? ticket.walletType === "esewa"
                                    ? "eSewa"
                                    : ticket.walletType === "khalti"
                                    ? "Khalti"
                                    : "Wallet"
                                  : ticket.paymentMethod === "card"
                                  ? "Card"
                                  : ticket.paymentMethod === "netbanking"
                                  ? "NetBanking"
                                  : ticket.paymentMethod}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3 mt-6">
                          <button
                            onClick={() => handleDownloadTicket(ticket)}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg font-semibold group"
                          >
                            <Download className="w-4 h-4 group-hover:animate-bounce" />
                            <span className="text-sm">Download</span>
                          </button>
                          <button
                            onClick={() => navigate(`/events/${ticket.id}`)}
                            className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold"
                          >
                            <span className="text-sm">View Event</span>
                          </button>
                          <button
                            onClick={() => handleShareTicket(ticket)}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-all font-semibold"
                          >
                            <Share2 className="w-4 h-4" />
                            <span className="text-sm">Share</span>
                          </button>
                          <button
                            onClick={() => handleEmailTicket(ticket)}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-all font-semibold"
                          >
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">Email</span>
                          </button>
                        </div>
                      </div>

                      {/* QR Code Section at Bottom Left */}
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 border-t border-gray-200">
                        <div className="flex items-center gap-4">
                          <div className="bg-white p-3 rounded-xl shadow-md">
                            <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                              <QrCode className="w-10 h-10 text-gray-600" />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 mb-1">
                              Scan at Venue
                            </p>
                            <p className="text-xs text-gray-500">
                              Show this QR code for entry verification
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section: Event Image */}
                    {ticket.imageUrl && (
                      <div className="relative h-64 lg:h-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        <img
                          src={ticket.imageUrl}
                          alt={ticket.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
