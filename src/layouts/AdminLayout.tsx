import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check admin authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("currentUser");

    if (!token || !userStr) {
      alert("Please login as admin to access this page!");
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (user.role !== "admin") {
        alert("Access Denied! Admin privileges required.");
        navigate("/");
      }
    } catch {
      alert("Invalid session. Please login again.");
      navigate("/login");
    }
  }, [navigate]);

  const [admin] = useState({
    name: "Admin User",
    email: "admin@parichaya.com",
    avatar: "/parichaya.jpeg",
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      title: "New Event Created",
      message: "Tech Summit 2024 has been published",
      time: "5 min ago",
      read: false,
      type: "success",
    },
    {
      id: 2,
      title: "New Booking",
      message: "John Doe booked 2 tickets for Music Fest",
      time: "1 hour ago",
      read: false,
      type: "info",
    },
    {
      id: 3,
      title: "Event Cancelled",
      message: "Art Workshop has been cancelled",
      time: "3 hours ago",
      read: true,
      type: "warning",
    },
  ]);

  const isActive = (path: string) => location.pathname === path;

  // Close mobile sidebar on route change
  useEffect(() => {
    return () => setSidebarOpen(false);
  }, [location.pathname]);

  // Close sidebar and notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".sidebar") && !target.closest(".sidebar-toggle")) {
        setSidebarOpen(false);
      }
      if (
        !target.closest(".notifications-dropdown") &&
        !target.closest(".notifications-btn")
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const menuItems = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: (
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      path: "/admin/events",
      label: "Manage Events",
      icon: (
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      path: "/admin/bookings",
      label: "Bookings",
      icon: (
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
            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
          />
        </svg>
      ),
    },
    {
      path: "/admin/users",
      label: "User Management",
      icon: (
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
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      path: "/admin/analytics",
      label: "Analytics",
      icon: (
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      path: "/admin/settings",
      label: "Settings",
      icon: (
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
      ),
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return (
          <div className="shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        );
      case "warning":
        return (
          <div className="shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
    }
  };

  // Get page title from current path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("dashboard")) return "Dashboard";
    if (path.includes("events")) return "Manage Events";
    if (path.includes("bookings")) return "Bookings";
    if (path.includes("users")) return "User Management";
    if (path.includes("analytics")) return "Analytics";
    if (path.includes("settings")) return "Settings";
    return "Admin Panel";
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50">
      {/* Admin Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md lg:pl-72">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo & Admin Badge */}
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/admin/dashboard")}
            >
              <img
                src="/parichaya.jpeg"
                alt="Parichaya Logo"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h1 className="text-xl font-bold text-red-600">
                  Parichaya Events
                </h1>
                <p className="text-xs text-gray-500 font-medium">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Admin Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span>View Site</span>
            </button>

            <div className="flex items-center gap-3 px-4 py-2 bg-red-50 rounded-lg border border-red-200">
              <img
                src={admin.avatar}
                alt={admin.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-900">
                  {admin.name}
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="lg:pl-72 pt-24 pb-16 px-6">
        <div className="w-full">
          {/* Admin Header Bar */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden sidebar-toggle p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {getPageTitle()}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Welcome back, {admin.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="notifications-btn relative p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <svg
                      className="w-6 h-6 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="notifications-dropdown absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">
                            Notifications
                          </h3>
                          {unreadCount > 0 && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-semibold">
                              {unreadCount} new
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-gray-500">
                            <svg
                              className="w-12 h-12 mx-auto mb-3 text-gray-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                              />
                            </svg>
                            <p className="text-sm">No notifications</p>
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <div
                              key={notif.id}
                              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition ${
                                !notif.read ? "bg-blue-50/50" : ""
                              }`}
                            >
                              <div className="flex gap-3">
                                {getNotificationIcon(notif.type)}
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-semibold text-gray-900 mb-1">
                                    {notif.title}
                                  </h4>
                                  <p className="text-xs text-gray-600 mb-2">
                                    {notif.message}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {notif.time}
                                  </p>
                                </div>
                                {!notif.read && (
                                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="p-3 border-t border-gray-200">
                        <button className="w-full text-center text-sm text-red-600 hover:text-red-700 font-medium">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <button
                  onClick={() => navigate("/admin/events")}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>New Event</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}

          <div
            className={`sidebar bg-white shadow-lg border-r border-gray-100 p-6 fixed top-0 left-0 h-screen w-64 overflow-y-auto transition-transform duration-300 ${
              sidebarOpen
                ? "translate-x-0 z-50"
                : "-translate-x-full lg:translate-x-0"
            }`}
          >
            {/* Logo Section */}
            <div
              className="flex items-center gap-3 cursor-pointer mb-6 pb-6 border-b border-gray-200"
              onClick={() => navigate("/admin/dashboard")}
            >
              <img
                src="/parichaya.jpeg"
                alt="Parichaya Logo"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h1 className="text-lg font-bold text-red-600">Parichaya</h1>
                <p className="text-xs text-gray-500 font-medium">Admin Panel</p>
              </div>
            </div>

            {/* Admin Profile Card */}
            <div className="text-center mb-6 pb-6 border-b border-gray-200">
              <div className="relative inline-block mb-4">
                <img
                  src={admin.avatar}
                  alt={admin.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-red-100"
                />
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-red-600 rounded-full border-2 border-white flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900">{admin.name}</h3>
              <p className="text-sm text-gray-500">{admin.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                Administrator
              </span>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive(item.path)
                      ? "bg-red-50 text-red-600 font-semibold border border-red-200"
                      : "text-gray-700 hover:bg-gray-50 border border-transparent hover:border-gray-200"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Logout Button */}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("currentUser");
                alert("You have been logged out successfully!");
                navigate("/login");
              }}
              className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>

          {/* Main Content Area */}
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
