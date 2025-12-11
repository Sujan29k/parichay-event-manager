export default function OrderHistory() {
  const orders = [
    {
      id: "ORD-2025-001",
      date: "Jan 05, 2025",
      eventName: "Music Concert 2025",
      tickets: 2,
      total: "NPR 3,000",
      status: "completed",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-2025-002",
      date: "Jan 08, 2025",
      eventName: "Tech Expo Nepal",
      tickets: 1,
      total: "NPR 1,500",
      status: "completed",
      paymentMethod: "eSewa",
    },
    {
      id: "ORD-2024-087",
      date: "Dec 10, 2024",
      eventName: "Food Festival 2024",
      tickets: 3,
      total: "NPR 2,400",
      status: "completed",
      paymentMethod: "Khalti",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Order History
        </h1>
        <p className="text-gray-600">
          View all your past transactions and purchases
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Tickets</p>
              <p className="text-3xl font-bold text-gray-900">
                {orders.reduce((sum, order) => sum + order.tickets, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
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
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Spent</p>
              <p className="text-3xl font-bold text-gray-900">NPR 6,900</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    {order.eventName}
                  </h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    {order.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Order ID</p>
                    <p className="font-semibold text-gray-900">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="font-semibold text-gray-900">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Tickets</p>
                    <p className="font-semibold text-gray-900">
                      {order.tickets} {order.tickets > 1 ? "tickets" : "ticket"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Payment Method</p>
                    <p className="font-semibold text-gray-900">
                      {order.paymentMethod}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <p className="text-2xl font-bold text-gray-900">{order.total}</p>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition text-sm">
                  View Receipt
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
