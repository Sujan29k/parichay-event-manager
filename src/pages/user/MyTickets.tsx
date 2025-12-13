import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Ticket, Download, CheckCircle, Clock, QrCode, Share2, Mail, AlertCircle, XCircle, Sparkles, ArrowRight } from "lucide-react";
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

type TicketStatus = "active" | "used" | "expired";

export default function MyTickets() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");

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
    const token = localStorage.getItem("token");
    const currentUser = localStorage.getItem("currentUser");

    if (!token || !currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  const now = new Date();
  
  const getTicketStatus = (booking: Booking): TicketStatus => {
    const eventDate = new Date(booking.date);
    if (eventDate < now) return "expired";
    return "active";
  };

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

  const StatusBadge = ({ status }: { status: TicketStatus }) => {
    const config = {
      active: {
        icon: CheckCircle,
        text: "Active",
        className: "bg-emerald-100 text-emerald-700 border-emerald-200",
      },
      used: {
        icon: AlertCircle,
        text: "Used",
        className: "bg-blue-100 text-blue-700 border-blue-200",
      },
      expired: {
        icon: XCircle,
        text: "Expired",
        className: "bg-gray-100 text-gray-600 border-gray-200",
      },
    };

    const { icon: Icon, text, className } = config[status];

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${className}`}>
        <Icon className="w-3.5 h-3.5" />
        {text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Header Section */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-red-200 rounded-full opacity-20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Ticket className="w-4 h-4" />
              Your Bookings
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              My Tickets
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Manage all your event tickets and bookings in one place
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{activeTickets.length}</p>
                <p className="text-sm text-gray-500">Active Tickets</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{pastTickets.length}</p>
                <p className="text-sm text-gray-500">Past Events</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                <p className="text-sm text-gray-500">Total Bookings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5 inline-flex gap-1">
              <button
                onClick={() => setActiveTab("active")}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  activeTab === "active"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Upcoming ({activeTickets.length})
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  activeTab === "past"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Past ({pastTickets.length})
              </button>
            </div>
          </div>

          {/* Tickets List */}
          {tickets.length === 0 ? (
            /* Empty State */
            <div className="max-w-md mx-auto text-center py-16 px-6">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Ticket className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No {activeTab === "active" ? "Upcoming" : "Past"} Tickets
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {activeTab === "active"
                  ? "You don't have any upcoming events. Explore amazing events happening near you!"
                  : "No past events found in your booking history."}
              </p>
              <button
                onClick={() => navigate("/events")}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl font-semibold shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40 hover:-translate-y-1 transition-all"
              >
                Browse Events
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {tickets.map((ticket) => {
                const status = getTicketStatus(ticket);
                const isExpired = status === "expired";

                return (
                  <div
                    key={ticket.bookingId}
                    className={`group bg-white rounded-3xl border shadow-sm overflow-hidden transition-all duration-300 ${
                      isExpired
                        ? "border-gray-200 opacity-75"
                        : "border-gray-100 hover:shadow-xl hover:border-red-100"
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* Left: Event Image */}
                      {ticket.imageUrl && (
                        <div className="relative w-full lg:w-80 h-56 lg:h-auto flex-shrink-0 overflow-hidden">
                          <img
                            src={ticket.imageUrl}
                            alt={ticket.title}
                            className={`w-full h-full object-cover transition-transform duration-500 ${
                              !isExpired && "group-hover:scale-105"
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r" />
                          
                          {/* Status Badge on Image */}
                          <div className="absolute top-4 left-4">
                            <StatusBadge status={status} />
                          </div>
                        </div>
                      )}

                      {/* Middle: Event Details */}
                      <div className="flex-1 p-6 lg:p-8">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                          <div>
                            {!ticket.imageUrl && (
                              <div className="mb-2">
                                <StatusBadge status={status} />
                              </div>
                            )}
                            <h3 className={`text-xl lg:text-2xl font-bold mb-1 transition-colors ${
                              isExpired ? "text-gray-600" : "text-gray-900 group-hover:text-red-600"
                            }`}>
                              {ticket.title}
                            </h3>
                          </div>
                          {!isExpired && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                              <Clock className="w-3.5 h-3.5" />
                              Upcoming
                            </span>
                          )}
                        </div>

                        {/* Event Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Calendar className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-medium">Date & Time</p>
                              <p className="font-semibold text-gray-900">{ticket.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                              <MapPin className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-medium">Venue</p>
                              <p className="font-semibold text-gray-900">{ticket.location}</p>
                            </div>
                          </div>
                        </div>

                        {/* Booking Details */}
                        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500 font-medium mb-1">Booking ID</p>
                              <p className="font-bold text-gray-900 font-mono text-xs">
                                #{ticket.bookingId.slice(0, 8).toUpperCase()}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500 font-medium mb-1">Tickets</p>
                              <p className="font-bold text-gray-900 flex items-center gap-1">
                                <Ticket className="w-4 h-4 text-red-500" />
                                {ticket.quantity}x
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500 font-medium mb-1">Amount Paid</p>
                              <p className="font-bold text-emerald-600">
                                ₹{ticket.totalAmount?.toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500 font-medium mb-1">Payment</p>
                              <p className="font-bold text-gray-900 capitalize">
                                {ticket.paymentMethod === "wallet" || ticket.paymentMethod === "upi"
                                  ? ticket.walletType || "Wallet"
                                  : ticket.paymentMethod}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => handleDownloadTicket(ticket)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                          <button
                            onClick={() => navigate(`/events/${ticket.id}`)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:border-gray-300 hover:bg-gray-50 transition-all"
                          >
                            View Event
                          </button>
                          <button
                            onClick={() => handleShareTicket(ticket)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 rounded-xl font-semibold text-sm hover:bg-blue-100 transition-all"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => window.location.href = `mailto:?subject=My Ticket for ${ticket.title}&body=Booking ID: ${ticket.bookingId}`}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl font-semibold text-sm hover:bg-emerald-100 transition-all"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Right: QR Code Section */}
                      <div className="lg:w-48 p-6 lg:p-8 bg-white flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-gray-100">
                        <div className="bg-white p-3 rounded-2xl shadow-md mb-3">
                          <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
                            <QrCode className="w-12 h-12 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-sm font-bold text-gray-900 text-center mb-1">
                          Scan at Entry
                        </p>
                        <p className="text-xs text-gray-500 text-center">
                          Show this QR code
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
