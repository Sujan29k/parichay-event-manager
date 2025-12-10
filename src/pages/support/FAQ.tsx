import React, { useState } from "react";
import Navbar from "../../components/common/Navbar";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I book tickets?",
      answer:
        "Simply browse events, select your event, choose your tickets, and proceed to checkout. You'll receive your digital tickets via email immediately after payment.",
    },
    {
      question: "Can I cancel my ticket?",
      answer:
        "Cancellation policies vary by event. Check the event details page for specific cancellation terms. Most events allow cancellations up to 24-48 hours before the event.",
    },
    {
      question: "How do I access my tickets?",
      answer:
        "After purchase, your tickets are available in the 'My Tickets' section of your account. You can also access them from the confirmation email sent to you.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit/debit cards, digital wallets, and mobile banking. All payments are processed securely through our payment partners.",
    },
    {
      question: "Do I need to print my tickets?",
      answer:
        "No! All our tickets are digital. Simply show the QR code from your phone at the event entrance for quick check-in.",
    },
    {
      question: "Can I transfer my ticket to someone else?",
      answer:
        "Yes, tickets can be transferred through your account. Go to 'My Tickets', select the ticket, and choose the transfer option.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about using Parichaya Events
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-900 text-lg">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-red-600 transform transition-transform ${
                      openIndex === index ? "rotate-180" : ""
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
                {openIndex === index && (
                  <div className="px-6 pb-5 text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 bg-red-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Please reach out to our
              support team.
            </p>
            <button
              onClick={() => (window.location.href = "/contact")}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
