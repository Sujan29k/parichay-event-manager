import { useNavigate } from "react-router-dom";
import { FaFileContract, FaGavel, FaUserCheck, FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";

export default function TermsConditions() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center">
              <FaFileContract className="text-3xl text-red-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Terms & Conditions</h1>
              <p className="text-gray-400 mt-2">Last updated: December 13, 2025</p>
            </div>
          </div>
          <p className="text-gray-300 text-lg">
            Please read these terms and conditions carefully before using our service.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-slate max-w-none">
          {/* Acceptance of Terms */}
          <Section
            icon={<FaUserCheck className="text-2xl text-red-500" />}
            title="Acceptance of Terms"
          >
            <p className="text-gray-600 leading-relaxed mb-4">
              By accessing and using Parichaya Events platform, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>You must be at least 18 years old to use this service</li>
              <li>You agree to provide accurate and complete information</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
              <li>You agree to notify us immediately of any unauthorized use of your account</li>
            </ul>
          </Section>

          {/* Use of Service */}
          <Section
            icon={<FaGavel className="text-2xl text-red-500" />}
            title="Use of Service"
          >
            <p className="text-gray-600 leading-relaxed mb-4">
              You agree to use our platform for lawful purposes only:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>You will not use the service for any illegal or unauthorized purpose</li>
              <li>You will not interfere with or disrupt the service</li>
              <li>You will not attempt to gain unauthorized access to any portion of the service</li>
              <li>You will not transmit any viruses, malware, or harmful code</li>
              <li>You will not impersonate any person or entity</li>
            </ul>
          </Section>

          {/* Ticket Purchases */}
          <Section
            icon={<FaFileContract className="text-2xl text-red-500" />}
            title="Ticket Purchases"
          >
            <p className="text-gray-600 leading-relaxed mb-4">
              When purchasing tickets through our platform:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>All sales are subject to availability</li>
              <li>Prices are subject to change without notice</li>
              <li>Payment must be received before tickets are issued</li>
              <li>Tickets are non-transferable unless otherwise stated</li>
              <li>You are responsible for checking event details before purchase</li>
              <li>Event organizers reserve the right to refuse entry</li>
            </ul>
          </Section>

          {/* Cancellation and Refunds */}
          <Section
            icon={<FaExclamationTriangle className="text-2xl text-red-500" />}
            title="Cancellation and Refunds"
          >
            <p className="text-gray-600 leading-relaxed mb-4">
              Refund policies vary by event:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Refunds are subject to the event organizer's policy</li>
              <li>If an event is cancelled, refunds will be processed automatically</li>
              <li>Refund processing may take 5-10 business days</li>
              <li>Service fees may be non-refundable</li>
              <li>No refunds for no-shows or late arrivals</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Please refer to our <button onClick={() => navigate("/refund-policy")} className="text-red-500 hover:underline">Refund Policy</button> for more details.
            </p>
          </Section>

          {/* Intellectual Property */}
          <Section
            icon={<FaFileContract className="text-2xl text-red-500" />}
            title="Intellectual Property"
          >
            <p className="text-gray-600 leading-relaxed mb-4">
              All content on this platform is protected by intellectual property rights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>All trademarks, logos, and service marks are property of Parichaya Events</li>
              <li>You may not use our intellectual property without written permission</li>
              <li>Event content belongs to respective organizers</li>
              <li>Unauthorized reproduction is strictly prohibited</li>
            </ul>
          </Section>

          {/* Limitation of Liability */}
          <Section
            icon={<FaExclamationTriangle className="text-2xl text-red-500" />}
            title="Limitation of Liability"
          >
            <p className="text-gray-600 leading-relaxed mb-4">
              Parichaya Events shall not be liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Any direct, indirect, or consequential damages</li>
              <li>Loss of profits or revenue</li>
              <li>Data loss or corruption</li>
              <li>Event cancellations or changes by organizers</li>
              <li>Actions or omissions of third parties</li>
            </ul>
          </Section>

          {/* Modifications to Terms */}
          <Section
            icon={<FaGavel className="text-2xl text-red-500" />}
            title="Modifications to Terms"
          >
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the service constitutes acceptance of the modified terms.
            </p>
          </Section>

          {/* Governing Law */}
          <Section
            icon={<FaGavel className="text-2xl text-red-500" />}
            title="Governing Law"
          >
            <p className="text-gray-600 leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of Nepal. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Kathmandu, Nepal.
            </p>
          </Section>

          {/* Contact Us */}
          <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Contact Us</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have questions about these Terms & Conditions, please contact us:
            </p>
            <div className="space-y-2 text-gray-600">
              <p><strong>Email:</strong> legal@parichaya.com</p>
              <p><strong>Phone:</strong> +977 1-234567</p>
              <p><strong>Address:</strong> Kathmandu, Nepal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      </div>
      <div className="ml-15">{children}</div>
    </div>
  );
}
