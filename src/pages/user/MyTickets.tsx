import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Ticket, Download, CheckCircle } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

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

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50">
      <Navbar />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Tickets
            </h1>
            <p className="text-gray-600">View and manage your event tickets</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("active")}
              className={`pb-3 px-4 font-semibold transition-all ${
                activeTab === "active"
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Active Tickets ({activeTickets.length})
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`pb-3 px-4 font-semibold transition-all ${
                activeTab === "past"
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Past Events ({pastTickets.length})
            </button>
          </div>

          {/* Tickets List */}
          {tickets.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No {activeTab === "active" ? "Active" : "Past"} Tickets
              </h3>
              <p className="text-gray-600 mb-6">
                {activeTab === "active"
                  ? "You don't have any upcoming events. Start exploring!"
                  : "No past events found."}
              </p>
              <button
                onClick={() => navigate("/events")}
                className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
              >
                Browse Events
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div
                  key={ticket.bookingId}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Event Image */}
                    {ticket.imageUrl && (
                      <div className="md:w-48 h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        <img
                          src={ticket.imageUrl}
                          alt={ticket.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Ticket Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {ticket.title}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-600 mb-1">
                            <Calendar size={16} className="text-red-600" />
                            <span className="text-sm">{ticket.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin size={16} className="text-red-600" />
                            <span className="text-sm">{ticket.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          <CheckCircle size={16} />
                          Confirmed
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                        <div>
                          <p className="text-xs text-gray-500">Booking ID</p>
                          <p className="font-semibold text-sm">
                            {ticket.bookingId}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Tickets</p>
                          <p className="font-semibold text-sm">
                            {ticket.quantity}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Total Paid</p>
                          <p className="font-semibold text-sm">
                            ₹{ticket.totalAmount?.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Payment</p>
                          <p className="font-semibold text-sm">
                            {ticket.paymentMethod === "wallet" ||
                            ticket.paymentMethod === "upi"
                              ? ticket.walletType === "esewa"
                                ? "eSewa"
                                : ticket.walletType === "khalti"
                                ? "Khalti"
                                : "Digital Wallet"
                              : ticket.paymentMethod === "card"
                              ? "Card"
                              : ticket.paymentMethod === "netbanking"
                              ? `Net Banking${
                                  ticket.bankName ? ` (${ticket.bankName})` : ""
                                }`
                              : ticket.paymentMethod}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() =>
                            alert("Download functionality coming soon!")
                          }
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                        >
                          <Download size={16} />
                          Download Ticket
                        </button>
                        <button
                          onClick={() => navigate(`/events/${ticket.id}`)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm"
                        >
                          View Event
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
