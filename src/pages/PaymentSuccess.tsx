import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Download, Calendar, MapPin, Ticket, Mail, Phone, User, Hash } from "lucide-react";

interface BookingData {
  id: string;
  title: string;
  date: string;
  location: string;
  price: number;
  quantity: number;
  totalAmount: number;
  bookingFee: number;
  bookingId: string;
  bookingDate: string;
  paymentMethod: string;
  userInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state as BookingData | null;

  useEffect(() => {
    // If no booking data, redirect to events page
    if (!bookingData) {
      navigate("/events");
    }
  }, [bookingData, navigate]);

  if (!bookingData) {
    return null;
  }

  const handleDownloadTicket = () => {
    // In a real app, this would generate a PDF ticket
    alert("Ticket download functionality will be implemented soon!");
  };

  const handleViewMyTickets = () => {
    navigate("/my-tickets");
  };

  const handleBrowseEvents = () => {
    navigate("/events");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-block animate-bounce">
            <CheckCircle className="text-green-600 mx-auto" size={80} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Payment Successful!</h1>
          <p className="text-xl text-gray-600 mt-2">Your booking has been confirmed</p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border-2 border-green-100">
          {/* Booking ID */}
          <div className="text-center mb-6 pb-6 border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Booking ID</p>
            <p className="text-2xl font-bold text-gray-900">{bookingData.bookingId}</p>
            <p className="text-sm text-gray-500 mt-2">
              Booked on {new Date(bookingData.bookingDate).toLocaleString()}
            </p>
          </div>

          {/* Event Details */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
              <Ticket className="text-red-600" size={24} />
              Event Details
            </h2>
            <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
              <div>
                <p className="text-lg font-semibold text-gray-900">{bookingData.title}</p>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="text-red-600 flex-shrink-0" size={18} />
                <span>{bookingData.date}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="text-red-600 flex-shrink-0" size={18} />
                <span>{bookingData.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Hash className="text-red-600 flex-shrink-0" size={18} />
                <span>Number of Tickets: {bookingData.quantity}</span>
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
              <User className="text-red-600" size={24} />
              Attendee Information
            </h2>
            <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center gap-3 text-gray-700">
                <User className="text-red-600 flex-shrink-0" size={18} />
                <span>{bookingData.userInfo.name}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="text-red-600 flex-shrink-0" size={18} />
                <span>{bookingData.userInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="text-red-600 flex-shrink-0" size={18} />
                <span>{bookingData.userInfo.phone}</span>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Payment Summary</h2>
            <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
              <div className="flex justify-between text-gray-700">
                <span>Ticket Price (x{bookingData.quantity})</span>
                <span>₹{(bookingData.totalAmount - bookingData.bookingFee).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Booking Fee</span>
                <span>₹{bookingData.bookingFee.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total Paid</span>
                <span className="text-green-600">₹{bookingData.totalAmount.toFixed(2)}</span>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Payment Method: {
                  (bookingData.paymentMethod === "wallet" || bookingData.paymentMethod === "upi")
                    ? (bookingData.walletType === "esewa" ? "eSewa" : bookingData.walletType === "khalti" ? "Khalti" : "Digital Wallet")
                    : bookingData.paymentMethod === "card"
                    ? "Card"
                    : bookingData.paymentMethod === "netbanking"
                    ? `Net Banking${bookingData.bankName ? ` (${bookingData.bankName})` : ""}`
                    : bookingData.paymentMethod
                }
              </div>
            </div>
          </div>

          {/* Confirmation Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>📧 Confirmation email sent!</strong> 
              <br />
              We've sent your tickets and booking confirmation to {bookingData.userInfo.email}. 
              Please check your inbox and spam folder.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleDownloadTicket}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-red-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Download size={20} />
              Download Tickets
            </button>
            <button
              onClick={handleViewMyTickets}
              className="flex items-center justify-center gap-2 bg-gray-800 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-900 transition-all"
            >
              <Ticket size={20} />
              View My Tickets
            </button>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="text-center">
          <button
            onClick={handleBrowseEvents}
            className="text-red-600 hover:text-red-700 font-semibold underline"
          >
            Browse More Events
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Need help? Contact our support at support@parichay.com or call +91-XXX-XXX-XXXX</p>
        </div>
      </div>
    </div>
  );
}
