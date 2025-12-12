import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Events from "../pages/Events";
import SingleEvent from "../pages/SingleEvent";
import Checkout from "../pages/Checkout";
import PaymentSuccess from "../pages/PaymentSuccess";
import DownloadApp from "../pages/DownloadApp";
import Login from "../pages/user/login";
import Register from "../pages/user/Register";
import MyTickets from "../pages/user/MyTickets";
import OrderHistory from "../pages/user/OrderHistory";
import Profile from "../pages/user/Profile";
import HelpSupport from "../pages/support/HelpSupport";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import ManageEvents from "../pages/admin/ManageEvents";
import Bookings from "../pages/admin/Bookings";
import UserManagement from "../pages/admin/UserManagement";
import Settings from "../pages/admin/Settings";
import Analytics from "../pages/admin/Analytics";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<SingleEvent />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />

        <Route path="/download" element={<DownloadApp />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Dashboard Routes */}
        <Route element={<UserLayout />}>
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/events" element={<ManageEvents />} />
          <Route path="/admin/bookings" element={<Bookings />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/settings" element={<Settings />} />
        </Route>

        {/* Help & Support */}
        <Route path="/help" element={<HelpSupport />} />
        <Route path="/support" element={<HelpSupport />} />
        <Route path="/faq" element={<HelpSupport />} />
        <Route path="/contact" element={<HelpSupport />} />

        <Route
          path="*"
          element={
            <div className="p-10 text-center text-2xl">404 Page Not Found</div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
