import { useState } from "react";

export default function Analytics() {
  const [dateRange, setDateRange] = useState("30days");

  // Sample data
  const revenueData = [
    { month: "Jan", revenue: 245000, bookings: 89 },
    { month: "Feb", revenue: 312000, bookings: 112 },
    { month: "Mar", revenue: 278000, bookings: 95 },
    { month: "Apr", revenue: 389000, bookings: 134 },
    { month: "May", revenue: 425000, bookings: 156 },
    { month: "Jun", revenue: 398000, bookings: 142 },
  ];

  const eventCategories = [
    { name: "Concert", count: 45, percentage: 35 },
    { name: "Conference", count: 32, percentage: 25 },
    { name: "Workshop", count: 28, percentage: 22 },
    { name: "Sports", count: 15, percentage: 12 },
    { name: "Cultural", count: 8, percentage: 6 },
  ];

  const topEvents = [
    { name: "Tech Summit 2024", tickets: 342, revenue: 855000 },
    { name: "Music Fest 2024", tickets: 1856, revenue: 2784000 },
    { name: "Art Workshop", tickets: 12, revenue: 9600 },
    { name: "Sports Championship", tickets: 234, revenue: 468000 },
    { name: "Cultural Festival", tickets: 156, revenue: 234000 },
  ];

  const paymentMethods = [
    { name: "eSewa", amount: 1245000, percentage: 42 },
    { name: "Khalti", amount: 987000, percentage: 33 },
    { name: "Bank Transfer", amount: 745000, percentage: 25 },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
            <p className="text-gray-600 mt-1">Track your performance and insights</p>
          </div>
          <div>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">This Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-green-600 text-sm font-semibold bg-green-100 px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">NPR 4.2M</p>
          <p className="text-xs text-gray-500 mt-2">Compared to last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <span className="text-green-600 text-sm font-semibold bg-green-100 px-2 py-1 rounded-full">+18.2%</span>
          </div>
          <p className="text-sm text-gray-600">Total Bookings</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">1,234</p>
          <p className="text-xs text-gray-500 mt-2">Across all events</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className="text-green-600 text-sm font-semibold bg-green-100 px-2 py-1 rounded-full">+8.1%</span>
          </div>
          <p className="text-sm text-gray-600">Active Users</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">892</p>
          <p className="text-xs text-gray-500 mt-2">Registered users</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-green-600 text-sm font-semibold bg-green-100 px-2 py-1 rounded-full">+24.3%</span>
          </div>
          <p className="text-sm text-gray-600">Avg. Ticket Price</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">NPR 3,400</p>
          <p className="text-xs text-gray-500 mt-2">Per booking</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Revenue Trends</h3>
              <p className="text-sm text-gray-600">Monthly revenue overview</p>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="text-gray-600">Revenue</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {revenueData.map((data, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{data.month}</span>
                  <span className="text-sm font-semibold text-gray-900">NPR {(data.revenue / 1000).toFixed(0)}K</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-red-600 to-orange-500 h-2.5 rounded-full transition-all"
                    style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Categories */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Event Categories</h3>
            <p className="text-sm text-gray-600">Distribution by category</p>
          </div>
          <div className="space-y-4">
            {eventCategories.map((category, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      index === 0 ? 'bg-blue-100' :
                      index === 1 ? 'bg-green-100' :
                      index === 2 ? 'bg-purple-100' :
                      index === 3 ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      <span className={`text-sm font-bold ${
                        index === 0 ? 'text-blue-600' :
                        index === 1 ? 'text-green-600' :
                        index === 2 ? 'text-purple-600' :
                        index === 3 ? 'text-yellow-600' : 'text-red-600'
                      }`}>{category.count}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{category.name}</p>
                      <p className="text-xs text-gray-500">{category.count} events</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{category.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      index === 0 ? 'bg-blue-600' :
                      index === 1 ? 'bg-green-600' :
                      index === 2 ? 'bg-purple-600' :
                      index === 3 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Events */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Top Performing Events</h3>
            <p className="text-sm text-gray-600">Highest revenue generators</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Rank</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Event</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tickets</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {topEvents.map((event, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0 ? 'bg-yellow-100 text-yellow-700' :
                        index === 1 ? 'bg-gray-200 text-gray-700' :
                        index === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">{event.name}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-gray-700">{event.tickets}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-gray-900">NPR {(event.revenue / 1000).toFixed(0)}K</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Payment Methods</h3>
            <p className="text-sm text-gray-600">Revenue by payment type</p>
          </div>
          <div className="space-y-4">
            {paymentMethods.map((method, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      index === 0 ? 'bg-green-100' :
                      index === 1 ? 'bg-purple-100' : 'bg-blue-100'
                    }`}>
                      <svg className={`w-5 h-5 ${
                        index === 0 ? 'text-green-600' :
                        index === 1 ? 'text-purple-600' : 'text-blue-600'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{method.name}</p>
                      <p className="text-xs text-gray-500">{method.percentage}% of total</p>
                    </div>
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900 mt-2">NPR {(method.amount / 1000).toFixed(0)}K</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className={`h-2 rounded-full ${
                      index === 0 ? 'bg-green-600' :
                      index === 1 ? 'bg-purple-600' : 'bg-blue-600'
                    }`}
                    style={{ width: `${method.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Conversion Rate</h4>
            <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-3xl font-bold mb-2">68.5%</p>
          <p className="text-sm opacity-90">Of visitors complete booking</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Avg. Booking Time</h4>
            <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-3xl font-bold mb-2">3.2 min</p>
          <p className="text-sm opacity-90">Time to complete purchase</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Customer Satisfaction</h4>
            <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-3xl font-bold mb-2">4.8/5</p>
          <p className="text-sm opacity-90">Based on user reviews</p>
        </div>
      </div>
    </div>
  );
}
