export default function AdminDashboard() {
  const stats = [
    {
      label: "Total Events",
      value: "24",
      change: "+12%",
      changeType: "increase",
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      label: "Total Bookings",
      value: "1,234",
      change: "+18%",
      changeType: "increase",
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      label: "Total Users",
      value: "892",
      change: "+8%",
      changeType: "increase",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      label: "Revenue",
      value: "NPR 4.2M",
      change: "+24%",
      changeType: "increase",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgColor: "bg-red-100",
      textColor: "text-red-600",
      borderColor: "border-red-200",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      user: "John Doe",
      event: "Music Concert 2025",
      date: "Jan 10, 2025",
      amount: "NPR 2,500",
      status: "confirmed",
    },
    {
      id: 2,
      user: "Jane Smith",
      event: "Tech Expo Nepal",
      date: "Jan 10, 2025",
      amount: "NPR 1,500",
      status: "confirmed",
    },
    {
      id: 3,
      user: "Bob Wilson",
      event: "Startup Meetup",
      date: "Jan 09, 2025",
      amount: "NPR 800",
      status: "pending",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      name: "Music Concert 2025",
      date: "Jan 12, 2025",
      tickets: "250/300",
      status: "active",
    },
    {
      id: 2,
      name: "Tech Expo Nepal",
      date: "Feb 03, 2025",
      tickets: "180/500",
      status: "active",
    },
    {
      id: 3,
      name: "Startup Meetup",
      date: "Mar 18, 2025",
      tickets: "50/100",
      status: "active",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl shadow-lg border ${stat.borderColor} p-6 hover:shadow-xl transition-shadow duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-14 h-14 ${stat.bgColor} rounded-2xl flex items-center justify-center ${stat.textColor}`}
              >
                {stat.icon}
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                <span className="text-green-600 text-sm font-bold">
                  {stat.change}
                </span>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-2 font-medium">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Recent Bookings
              </h2>
            </div>
            <button className="text-red-600 text-sm font-semibold hover:text-red-700 transition-colors">
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 bg-linear-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{booking.user}</p>
                  <p className="text-sm text-gray-600 mt-1">{booking.event}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <svg
                      className="w-4 h-4 text-gray-400"
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
                    <p className="text-xs text-gray-500">{booking.date}</p>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-lg text-gray-900">
                    {booking.amount}
                  </p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
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
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Upcoming Events
              </h2>
            </div>
            <button className="text-red-600 text-sm font-semibold hover:text-red-700 transition-colors">
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 bg-linear-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{event.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <svg
                      className="w-4 h-4 text-gray-400"
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
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg
                      className="w-4 h-4 text-gray-400"
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
                    <p className="text-sm font-bold text-gray-900">
                      {event.tickets}
                    </p>
                  </div>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold border border-green-200">
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
