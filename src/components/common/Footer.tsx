import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn, MdArrowForward } from "react-icons/md";
import { HiMail } from "react-icons/hi";

export default function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-black text-gray-100 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      {/* Newsletter Section */}
      <div className="relative border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-700/50 shadow-2xl">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-red-500/30">
                <HiMail className="text-base sm:text-lg" />
                Newsletter
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                Never Miss an Event
              </h3>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                Get the latest updates on trending events, exclusive offers, and early bird discounts delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 pt-2 sm:pt-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-sm">Weekly updates</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-sm">No spam</span>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-4 md:mt-0">
              <form
                onSubmit={handleSubscribe}
                className="w-full space-y-3 sm:space-y-4"
              >
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-slate-900/80 border-2 border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all text-base sm:text-lg"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 text-base sm:text-lg"
                >
                  Subscribe Now
                  <MdArrowForward className="text-lg sm:text-xl" />
                </button>
                <p className="text-xs text-gray-500 text-center px-2">
                  By subscribing, you agree to receive promotional emails. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-6">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:shadow-red-500/50 transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-2xl">P</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                Parichaya
              </h2>
              <p className="text-xs text-gray-500">Events Platform</p>
            </div>
          </div>
          <p className="text-gray-400 leading-relaxed text-sm max-w-xs">
            Your trusted platform for discovering and booking amazing events in
            Nepal. Experience the best entertainment, culture, and networking
            opportunities.
          </p>
          <div>
            <p className="text-sm font-semibold text-gray-300 mb-3">
              Follow Us
            </p>
            <div className="flex gap-3">
              <SocialIcon href="#" label="Facebook">
                <FaFacebookF />
              </SocialIcon>
              <SocialIcon href="#" label="Instagram">
                <FaInstagram />
              </SocialIcon>
              <SocialIcon href="#" label="Twitter">
                <FaTwitter />
              </SocialIcon>
              <SocialIcon href="#" label="LinkedIn">
                <FaLinkedinIn />
              </SocialIcon>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></span>
            Quick Links
          </h3>
          <ul className="space-y-3">
            <FooterLink onClick={() => navigate("/events")}>Events</FooterLink>
            <FooterLink onClick={() => navigate("/my-tickets")}>
              My Tickets
            </FooterLink>
            <FooterLink onClick={() => navigate("/contact")}>
              Contact
            </FooterLink>
            <FooterLink onClick={() => navigate("/faq")}>FAQ</FooterLink>
            <FooterLink onClick={() => navigate("/register")}>
              Register
            </FooterLink>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></span>
            Support
          </h3>
          <ul className="space-y-3">
            <FooterLink>Help Center</FooterLink>
            <FooterLink>Privacy Policy</FooterLink>
            <FooterLink>Terms & Conditions</FooterLink>
            <FooterLink>Refund Policy</FooterLink>
            <FooterLink>About Us</FooterLink>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></span>
            Get in Touch
          </h3>
          <div className="space-y-4">
            <ContactItem
              icon={<MdEmail />}
              text="support@parichaya.com"
              href="mailto:support@parichaya.com"
            />
            <ContactItem
              icon={<MdPhone />}
              text="+977 1-234567"
              href="tel:+97712345678"
            />
            <ContactItem icon={<MdLocationOn />} text="Kathmandu, Nepal" />
          </div>
          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-xs text-gray-500 mb-2">Download Our App</p>
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/download")}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600 rounded-lg transition-all text-xs cursor-pointer"
              >
                <span className="text-xl">📱</span>
                <div className="text-left">
                  <p className="text-[10px] text-gray-500">Get it on</p>
                  <p className="font-semibold">App Store</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider with Decorative Element */}
      <div className="relative border-t border-slate-700/50">
        <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-32 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
      </div>

      {/* Bottom Section */}
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <p>© 2025 Parichaya Events. All Rights Reserved.</p>
            <span className="hidden md:block text-gray-600">|</span>
            <p className="text-xs text-gray-500">Made with ❤️ in Nepal</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-6 text-sm text-gray-400">
              <a
                href="#"
                className="hover:text-red-400 transition-colors duration-200 flex items-center gap-1"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-red-400 transition-colors duration-200 flex items-center gap-1"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-red-400 transition-colors duration-200 flex items-center gap-1"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-6 border-t border-slate-700/30 flex flex-wrap justify-center items-center gap-8 opacity-50">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="text-lg">🔒</span>
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="text-lg">✓</span>
            <span>Verified Events</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="text-lg">⚡</span>
            <span>Instant Tickets</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="text-lg">💯</span>
            <span>100% Authentic</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  children,
  href,
  label,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-11 h-11 bg-gradient-to-br from-slate-800 to-slate-900 hover:from-red-500 hover:to-red-600 border border-slate-700 hover:border-red-500 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
    >
      {children}
    </a>
  );
}

function FooterLink({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className="text-gray-400 hover:text-red-400 transition-colors duration-200 text-sm flex items-center gap-2 group"
      >
        <span className="w-0 h-0.5 bg-red-500 group-hover:w-3 transition-all duration-200"></span>
        {children}
      </button>
    </li>
  );
}

function ContactItem({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href?: string;
}) {
  const Wrapper = href ? "a" : "div";
  const props = href ? { href } : {};

  return (
    <Wrapper
      {...props}
      className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-all duration-200 cursor-pointer group"
    >
      <span className="text-red-500 text-xl group-hover:scale-110 group-hover:text-red-400 transition-all bg-slate-800/50 p-2.5 rounded-lg group-hover:bg-slate-700/50">
        {icon}
      </span>
      <span className="text-sm font-medium">{text}</span>
    </Wrapper>
  );
}
