import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, Ticket } from "lucide-react";

interface CurrentUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  isFirstLogin?: boolean;
  role?: string;
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Derive auth state directly from localStorage on each render
  // This is intentional as localStorage can change externally (login/logout)
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("currentUser");
  const isLoggedIn = !!(token && userStr);
  const currentUser =
    token && userStr ? (JSON.parse(userStr) as CurrentUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setShowUserMenu(false);
    navigate("/");
    alert("You have been logged out successfully!");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="w-full flex items-center justify-between px-8 py-5">
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
            onClick={() => navigate("/help")}
            className={`hover:text-red-600 transition ${
              isActive("/help") || isActive("/support") || isActive("/contact") || isActive("/faq")
                ? "text-red-600 font-semibold"
                : "text-gray-700"
            }`}
          >
            Help & Support
          </button>
          <button
            onClick={() => navigate("/download")}
            className={`hover:text-red-600 transition ${
              isActive("/download")
                ? "text-red-600 font-semibold"
                : "text-gray-700"
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
              {/* Admin Panel Button - Only for Admin Users */}
              {currentUser?.role === "admin" && (
                <button
                  onClick={() => navigate("/admin/dashboard")}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition shadow-md"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Admin Panel
                </button>
              )}

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
                navigate("/help");
                setMobileMenuOpen(false);
              }}
              className={`text-left hover:text-red-600 transition ${
                isActive("/help") || isActive("/support") || isActive("/contact") || isActive("/faq")
                  ? "text-red-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              Help & Support
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
                  <p className="text-xs text-gray-500">{currentUser?.email}</p>
                </div>

                {/* Admin Panel Button - Mobile */}
                {currentUser?.role === "admin" && (
                  <button
                    onClick={() => {
                      navigate("/admin/dashboard");
                      setMobileMenuOpen(false);
                    }}
                    className="text-left px-5 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition shadow-md flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Admin Panel
                  </button>
                )}

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
