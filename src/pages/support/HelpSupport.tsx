import { useState } from "react";
import Navbar from "../../components/common/Navbar";
import { Mail, Phone, MapPin, MessageCircle, HelpCircle, Send } from "lucide-react";

export default function HelpSupport() {
  const [activeSection, setActiveSection] = useState<"faq" | "contact">("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const faqs = [
    {
      category: "Booking & Tickets",
      questions: [
        {
          question: "How do I book tickets?",
          answer: "Simply browse events, select your preferred event, choose the number of tickets you need, and proceed to checkout. You'll receive your digital tickets via email immediately after successful payment confirmation.",
        },
        {
          question: "How do I access my tickets?",
          answer: "After purchase, your tickets are instantly available in the 'My Tickets' section of your account. You can also access them from the confirmation email sent to your registered email address.",
        },
        {
          question: "Do I need to print my tickets?",
          answer: "No! All our tickets are digital and eco-friendly. Simply show the QR code from your phone or email at the event entrance for quick and contactless check-in.",
        },
      ],
    },
    {
      category: "Payments & Refunds",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit/debit cards (Visa, Mastercard, American Express), digital wallets (eSewa, Khalti), and net banking. All payments are processed securely through our certified payment partners.",
        },
        {
          question: "Can I cancel my ticket and get a refund?",
          answer: "Cancellation and refund policies vary by event and organizer. Check the specific event's terms and conditions on the event details page. Most events allow cancellations up to 24-48 hours before the event starts.",
        },
        {
          question: "How long does it take to receive a refund?",
          answer: "Approved refunds are typically processed within 5-7 business days. The amount will be credited back to your original payment method.",
        },
      ],
    },
    {
      category: "Account & Security",
      questions: [
        {
          question: "Can I transfer my ticket to someone else?",
          answer: "Yes, tickets can be transferred through your account dashboard. Navigate to 'My Tickets', select the ticket you want to transfer, and use the transfer option to send it to another person's email.",
        },
        {
          question: "Is my payment information secure?",
          answer: "Absolutely! We use industry-standard encryption and security measures. We never store your complete payment card details. All transactions are processed through PCI-DSS compliant payment gateways.",
        },
        {
          question: "How do I reset my password?",
          answer: "Click on 'Forgot Password' on the login page, enter your registered email address, and you'll receive a password reset link. Follow the instructions in the email to create a new password.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            We're here to help
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Help & <span className="text-red-600">Support</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Find answers to your questions or reach out to our support team
          </p>

          {/* Section Toggle */}
          <div className="inline-flex bg-white rounded-2xl shadow-md border border-gray-100 p-2 gap-2">
            <button
              onClick={() => setActiveSection("faq")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeSection === "faq"
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              FAQs
            </button>
            <button
              onClick={() => setActiveSection("contact")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeSection === "contact"
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Send className="w-5 h-5" />
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {activeSection === "faq" ? (
            /* FAQ Section */
            <div>
              <div className="max-w-4xl mx-auto">
                <div className="space-y-8">
                  {faqs.map((category, catIndex) => (
                    <div key={catIndex}>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-red-600 rounded-full"></div>
                        {category.category}
                      </h2>
                      <div className="space-y-3">
                        {category.questions.map((faq, qIndex) => {
                          const globalIndex = catIndex * 10 + qIndex;
                          return (
                            <div
                              key={qIndex}
                              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                            >
                              <button
                                onClick={() =>
                                  setOpenIndex(openIndex === globalIndex ? null : globalIndex)
                                }
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition"
                              >
                                <span className="font-semibold text-gray-900 text-lg pr-4">
                                  {faq.question}
                                </span>
                                <svg
                                  className={`w-6 h-6 text-red-600 transform transition-transform flex-shrink-0 ${
                                    openIndex === globalIndex ? "rotate-180" : ""
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </button>
                              {openIndex === globalIndex && (
                                <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                  {faq.answer}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA to Contact */}
                <div className="mt-12 bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 md:p-12 text-center border border-red-100">
                  <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    Still have questions?
                  </h2>
                  <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                    Can't find the answer you're looking for? Our support team is ready to assist you.
                  </p>
                  <button
                    onClick={() => setActiveSection("contact")}
                    className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2 group"
                  >
                    Contact Support
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Contact Section */
            <div>
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                {/* Contact Info Cards */}
                <div className="space-y-6">
                  {/* Email Card */}
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-red-200">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                    <p className="text-gray-600 mb-4">Send us an email anytime!</p>
                    <a href="mailto:support@parichayaevents.com" className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                      support@parichayaevents.com
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>

                  {/* Phone Card */}
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-red-200">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                    <p className="text-gray-600 mb-4">Mon-Fri from 9am to 6pm</p>
                    <a href="tel:+9771234567" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                      +977 1-234567
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>

                  {/* Address Card */}
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-red-200">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
                    <p className="text-gray-600 mb-4">Come say hello</p>
                    <p className="text-green-600 font-semibold">
                      Thamel, Kathmandu<br />
                      <span className="text-sm text-gray-500 font-normal">Kathmandu 44600, Nepal</span>
                    </p>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">Send us a Message</h2>
                      <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
                    </div>

                    {submitStatus === "success" && (
                      <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-start gap-3">
                        <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <h4 className="text-green-800 font-semibold">Message sent successfully!</h4>
                          <p className="text-green-700 text-sm">We'll get back to you soon.</p>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none bg-white"
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="event">Event Information</option>
                          <option value="booking">Booking Support</option>
                          <option value="technical">Technical Issue</option>
                          <option value="partnership">Partnership Opportunity</option>
                          <option value="feedback">Feedback</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none resize-none"
                          placeholder="Tell us more about your inquiry..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-8 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
