import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CreditCard, Smartphone, Building2, Calendar, MapPin, Ticket } from "lucide-react";

interface EventData {
  id: string;
  title: string;
  date: string;
  location: string;
  price: number;
  quantity: number;
}

type PaymentMethod = "card" | "wallet" | "netbanking";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Event data sent from SingleEvent page (via navigate)
  const eventData = location.state as EventData | null;

  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("card");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    esewaId: "",
    khaltiId: "",
    bankName: "",
    walletType: "esewa"
  });

  if (!eventData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-10 text-center text-xl">
        <div>
          <p className="text-gray-600">No event selected. Please go back.</p>
          <button 
            onClick={() => navigate("/events")}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Browse Events
          </button>
        </div>
      </div>
    );
  }

  const { title, date, location: place, price, quantity } = eventData;

  const totalAmount = price * quantity;
  const bookingFee = totalAmount * 0.02; // 2% booking fee
  const finalAmount = totalAmount + bookingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmPayment = () => {
    // Validate basic info
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in all personal information");
      return;
    }

    // Validate payment method specific fields
    if (selectedPayment === "card" && (!formData.cardNumber || !formData.cardExpiry || !formData.cardCVV)) {
      alert("Please fill in all card details");
      return;
    }

    if (selectedPayment === "wallet") {
      if (formData.walletType === "esewa" && !formData.esewaId) {
        alert("Please enter eSewa ID");
        return;
      }
      if (formData.walletType === "khalti" && !formData.khaltiId) {
        alert("Please enter Khalti ID");
        return;
      }
    }

    if (selectedPayment === "netbanking" && !formData.bankName) {
      alert("Please select a bank");
      return;
    }

    // Simulate payment processing
    const bookingData = {
      ...eventData,
      totalAmount: finalAmount,
      bookingFee,
      userInfo: {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone
      },
      paymentMethod: selectedPayment,
      walletType: selectedPayment === "wallet" ? formData.walletType : null,
      bankName: selectedPayment === "netbanking" ? formData.bankName : null,
      bookingId: `PRCY${Date.now()}`,
      bookingDate: new Date().toISOString()
    };

    // Save booking to localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const userBookings = JSON.parse(localStorage.getItem(`bookings_${currentUser.id}`) || "[]");
    userBookings.push(bookingData);
    localStorage.setItem(`bookings_${currentUser.id}`, JSON.stringify(userBookings));

    // Redirect to success page
    navigate("/payment-success", { state: bookingData });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Event Details</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Ticket className="text-red-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">{title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="text-red-600 flex-shrink-0" size={20} />
                  <span>{date}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="text-red-600 flex-shrink-0" size={20} />
                  <span>{place}</span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-gray-700"><strong>Number of Tickets:</strong> {quantity}</p>
                </div>
              </div>
            </div>

            {/* User Information */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name *"
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address *"
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number *"
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full md:col-span-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Payment Method</h2>
              
              {/* Payment Options */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                <button
                  onClick={() => setSelectedPayment("card")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedPayment === "card"
                      ? "border-red-600 bg-red-50"
                      : "border-gray-200 hover:border-red-300"
                  }`}
                >
                  <CreditCard className={`mx-auto mb-2 ${selectedPayment === "card" ? "text-red-600" : "text-gray-600"}`} />
                  <p className="text-sm font-semibold">Card</p>
                </button>

                <button
                  onClick={() => setSelectedPayment("wallet")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedPayment === "wallet"
                      ? "border-red-600 bg-red-50"
                      : "border-gray-200 hover:border-red-300"
                  }`}
                >
                  <Smartphone className={`mx-auto mb-2 ${selectedPayment === "wallet" ? "text-red-600" : "text-gray-600"}`} />
                  <p className="text-sm font-semibold">Digital Wallet</p>
                </button>

                <button
                  onClick={() => setSelectedPayment("netbanking")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedPayment === "netbanking"
                      ? "border-red-600 bg-red-50"
                      : "border-gray-200 hover:border-red-300"
                  }`}
                >
                  <Building2 className={`mx-auto mb-2 ${selectedPayment === "netbanking" ? "text-red-600" : "text-gray-600"}`} />
                  <p className="text-sm font-semibold">Net Banking</p>
                </button>
              </div>

              {/* Payment Forms */}
              {selectedPayment === "card" && (
                <div className="space-y-4 animate-fadeIn">
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="Card Number"
                    maxLength={16}
                    className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                      type="text"
                      name="cardCVV"
                      value={formData.cardCVV}
                      onChange={handleInputChange}
                      placeholder="CVV"
                      maxLength={3}
                      className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              )}

              {selectedPayment === "wallet" && (
                <div className="animate-fadeIn space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Wallet
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, walletType: "esewa" })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.walletType === "esewa"
                            ? "border-green-600 bg-green-50"
                            : "border-gray-300 hover:border-green-400"
                        }`}
                      >
                        <div className={`text-2xl font-bold ${formData.walletType === "esewa" ? "text-green-600" : "text-gray-600"}`}>
                          eSewa
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, walletType: "khalti" })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.walletType === "khalti"
                            ? "border-purple-600 bg-purple-50"
                            : "border-gray-300 hover:border-purple-400"
                        }`}
                      >
                        <div className={`text-2xl font-bold ${formData.walletType === "khalti" ? "text-purple-600" : "text-gray-600"}`}>
                          Khalti
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  {formData.walletType === "esewa" && (
                    <input
                      type="text"
                      name="esewaId"
                      value={formData.esewaId}
                      onChange={handleInputChange}
                      placeholder="Enter eSewa ID (Mobile number or eSewa ID)"
                      className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  )}
                  
                  {formData.walletType === "khalti" && (
                    <input
                      type="text"
                      name="khaltiId"
                      value={formData.khaltiId}
                      onChange={handleInputChange}
                      placeholder="Enter Khalti mobile number"
                      className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  )}
                  
                  <p className="text-sm text-gray-500">
                    {formData.walletType === "esewa" 
                      ? "Nepal's most popular digital wallet" 
                      : "Simple, secure payments with Khalti"}
                  </p>
                </div>
              )}

              {selectedPayment === "netbanking" && (
                <div className="animate-fadeIn">
                  <select
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select Your Bank</option>
                    <option value="nabil">Nabil Bank</option>
                    <option value="nic-asia">NIC Asia Bank</option>
                    <option value="global-ime">Global IME Bank</option>
                    <option value="himalayan">Himalayan Bank</option>
                    <option value="everest">Everest Bank</option>
                    <option value="siddhartha">Siddhartha Bank</option>
                    <option value="nic-bank">Nepal Investment Bank</option>
                    <option value="standard-chartered">Standard Chartered Bank</option>
                    <option value="rastriya-banijya">Rastriya Banijya Bank</option>
                    <option value="agricultural">Agricultural Development Bank</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Ticket Price (x{quantity})</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Booking Fee (2%)</span>
                  <span>₹{bookingFee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-red-600">₹{finalAmount.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleConfirmPayment}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-xl text-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Pay ₹{finalAmount.toFixed(2)}
              </button>

              <div className="mt-4 text-center text-xs text-gray-500">
                <p>🔒 Secure payment gateway</p>
                <p className="mt-1">Your data is safe and encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
