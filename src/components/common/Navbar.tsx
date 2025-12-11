import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, LogOut, Ticket } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("currentUser");
    
    if (token && user) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(user));
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  }, [location]); // Re-check on route change

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setShowUserMenu(false);
    navigate("/");
    alert("You have been logged out successfully!");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/parichaya.jpeg"
            alt="Parichaya Logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <h1 className="text-2xl font-bold text-red-600">Parichaya Events</h1>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-lg font-medium">
          <button
            onClick={() => navigate("/")}
            className={`hover:text-red-600 transition ${
              isActive("/") ? "text-red-600 font-semibold" : "text-gray-700"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigate("/events")}
            className={`hover:text-red-600 transition ${
              isActive("/events")
                ? "text-red-600 font-semibold"
                : "text-gray-700"
            }`}
          >
            Events
          </button>
          <button
            onClick={() => navigate("/contact")}
            className={`hover:text-red-600 transition ${
              isActive("/contact")
                ? "text-red-600 font-semibold"
                : "text-gray-700"
            }`}
          >
            Contact
          </button>
          <button
            onClick={() => navigate("/faq")}
            className={`hover:text-red-600 transition ${
              isActive("/faq") ? "text-red-600 font-semibold" : "text-gray-700"
            }`}
          >
            FAQ
          </button>
          <button
            onClick={() => navigate("/download")}
            className={`hover:text-red-600 transition ${
              isActive("/download") ? "text-red-600 font-semibold" : "text-gray-700"
            }`}
          >
            Download
          </button>
        </nav>

        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/my-tickets")}
                className="flex items-center gap-2 px-5 py-2 text-gray-700 hover:text-red-600 transition"
              >
                <Ticket size={20} />
                My Tickets
              </button>
              
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition"
                >
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {currentUser?.fullName?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="font-medium text-gray-700">
                    {currentUser?.fullName?.split(" ")[0] || "User"}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {currentUser?.fullName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {currentUser?.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigate("/my-tickets");
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                    >
                      <Ticket size={16} />
                      My Tickets
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-red-600"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col px-6 py-4 space-y-4">
            <button
              onClick={() => {
                navigate("/");
                setMobileMenuOpen(false);
              }}
              className={`text-left hover:text-red-600 transition ${
                isActive("/") ? "text-red-600 font-semibold" : "text-gray-700"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate("/events");
                setMobileMenuOpen(false);
              }}
              className={`text-left hover:text-red-600 transition ${
                isActive("/events")
                  ? "text-red-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              Events
            </button>
            <button
              onClick={() => {
                navigate("/contact");
                setMobileMenuOpen(false);
              }}
              className={`text-left hover:text-red-600 transition ${
                isActive("/contact")
                  ? "text-red-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => {
                navigate("/faq");
                setMobileMenuOpen(false);
              }}
              className={`text-left hover:text-red-600 transition ${
                isActive("/faq")
                  ? "text-red-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => {
                navigate("/download");
                setMobileMenuOpen(false);
              }}
              className={`text-left hover:text-red-600 transition ${
                isActive("/download")
                  ? "text-red-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              Download
            </button>
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-5 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-5 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <div className="px-5 py-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm font-semibold text-gray-900">
                    {currentUser?.fullName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {currentUser?.email}
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigate("/my-tickets");
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-5 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  My Tickets
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-5 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
