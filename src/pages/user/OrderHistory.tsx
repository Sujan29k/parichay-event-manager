import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Ticket, DollarSign } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function OrderHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const currentUser = localStorage.getItem("currentUser");
    
    if (!token || !currentUser) {
      navigate("/login");
      return;
    }

    setIsLoggedIn(true);
    
    // Load user's bookings from localStorage
    const user = JSON.parse(currentUser);
    const userBookings = JSON.parse(localStorage.getItem(`bookings_${user.id}`) || "[]");
    
    // Sort by booking date, most recent first
    const sortedBookings = userBookings.sort((a: any, b: any) => 
      new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()
    );
    
    setOrders(sortedBookings);
  }, [navigate]);

  // Calculate stats
  const totalTickets = orders.reduce((sum, order) => sum + (order.quantity || 0), 0);
  const totalSpent = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  if (!isLoggedIn) {
    return null;
  }

  const getPaymentMethodDisplay = (order: any) => {
    if (order.paymentMethod === "wallet" || order.paymentMethod === "upi") {
      return order.walletType === "esewa" ? "eSewa" : order.walletType === "khalti" ? "Khalti" : "Digital Wallet";
    } else if (order.paymentMethod === "card") {
      return "Card";
    } else if (order.paymentMethod === "netbanking") {
      return `Net Banking${order.bankName ? ` (${order.bankName})` : ""}`;
    }
    return order.paymentMethod || "N/A";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
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
                  <ShoppingBag className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Tickets</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {totalTickets}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Ticket className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                  <p className="text-3xl font-bold text-gray-900">₹{totalSpent.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Orders List */}
          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Orders Yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't made any bookings yet. Start exploring events!
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
              {orders.map((order) => (
                <div
                  key={order.bookingId}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-gray-900">
                          {order.title}
                        </h3>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          Completed
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Order ID</p>
                          <p className="font-semibold text-gray-900">{order.bookingId}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Date</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(order.bookingDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Tickets</p>
                          <p className="font-semibold text-gray-900">
                            {order.quantity} {order.quantity > 1 ? "tickets" : "ticket"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Payment Method</p>
                          <p className="font-semibold text-gray-900">
                            {getPaymentMethodDisplay(order)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <p className="text-2xl font-bold text-gray-900">₹{order.totalAmount?.toFixed(2)}</p>
                      <button 
                        onClick={() => navigate(`/events/${order.id}`)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition text-sm"
                      >
                        View Event
                      </button>
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
