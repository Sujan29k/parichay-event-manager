import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyTickets() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");

  const activeTickets = [
    {
      id: 1,
      eventName: "Music Concert 2025",
      date: "Jan 12, 2025",
      time: "6:00 PM",
      location: "Kathmandu Arena",
      ticketType: "VIP",
      quantity: 2,
      qrCode: "QR123456",
      status: "confirmed",
    },
    {
      id: 2,
      eventName: "Tech Expo Nepal",
      date: "Feb 03, 2025",
      time: "10:00 AM",
      location: "Pokhara Convention Center",
      ticketType: "Regular",
      quantity: 1,
      qrCode: "QR789012",
      status: "confirmed",
    },
  ];

  const pastTickets = [
    {
      id: 3,
      eventName: "Food Festival 2024",
      date: "Dec 15, 2024",
      time: "12:00 PM",
      location: "Kathmandu",
      ticketType: "Regular",
      quantity: 3,
      status: "attended",
    },
  ];

  const tickets = activeTab === "active" ? activeTickets : pastTickets;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tickets</h1>
        <p className="text-gray-600">
          View and manage your event tickets
        </p>
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
            <svg
              className="w-10 h-10 text-gray-400"
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
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No tickets found
          </h3>
          <p className="text-gray-600 mb-6">
            You don't have any {activeTab} tickets yet.
          </p>
          <button
            onClick={() => navigate("/events")}
            className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition"
          >
            Browse Events
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Event Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {ticket.eventName}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
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
                          {ticket.date}
                        </div>
                        <div className="flex items-center gap-2">
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
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {ticket.time}
                        </div>
                        <div className="flex items-center gap-2">
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
                          </svg>
                          {ticket.location}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        ticket.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {ticket.status === "confirmed" ? "Confirmed" : "Attended"}
                    </span>
                  </div>

                  <div className="flex gap-6 text-sm">
                    <div>
                      <p className="text-gray-500">Ticket Type</p>
                      <p className="font-semibold text-gray-900">
                        {ticket.ticketType}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Quantity</p>
                      <p className="font-semibold text-gray-900">
                        {ticket.quantity} {ticket.quantity > 1 ? "tickets" : "ticket"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* QR Code Section */}
                {activeTab === "active" && ticket.qrCode && (
                  <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-4 min-w-[140px]">
                    <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center mb-2 border-2 border-gray-200">
                      <svg
                        className="w-20 h-20 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                        />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600 font-mono">
                      {ticket.qrCode}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              {activeTab === "active" && (
                <div className="mt-4 pt-4 border-t border-gray-200 flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition">
                    View QR Code
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition">
                    Download
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
