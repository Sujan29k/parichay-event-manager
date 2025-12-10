import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-800 to-black text-gray-100">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Parichaya
            </h2>
          </div>
          <p className="text-gray-400 leading-relaxed text-sm">
            Your trusted platform for discovering and booking amazing events in
            Nepal.
          </p>
          <div className="flex gap-3 pt-4">
            <SocialIcon href="#">
              <FaFacebookF />
            </SocialIcon>
            <SocialIcon href="#">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="#">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="#">
              <FaLinkedinIn />
            </SocialIcon>
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
            <ContactItem icon={<MdEmail />} text="support@parichaya.com" />
            <ContactItem icon={<MdPhone />} text="+977 1-234567" />
            <ContactItem icon={<MdLocationOn />} text="Kathmandu, Nepal" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-700"></div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-sm">
          © 2025 Parichaya Events. All Rights Reserved.
        </p>
        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-red-500 transition">
            Privacy
          </a>
          <a href="#" className="hover:text-red-500 transition">
            Terms
          </a>
          <a href="#" className="hover:text-red-500 transition">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-110"
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

function ContactItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors duration-200 cursor-pointer group">
      <span className="text-red-500 text-lg group-hover:scale-110 transition-transform">
        {icon}
      </span>
      <span className="text-sm">{text}</span>
    </div>
  );
}
