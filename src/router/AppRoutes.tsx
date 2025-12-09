import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Events from "../pages/Events";
import SingleEvent from "../pages/SingleEvent";
import Checkout from "../pages/Checkout";
import PaymentSuccess from "../pages/PaymentSuccess";
import Login from "../pages/user/login";
import Register from "../pages/user/Register";
import MyTickets from "../pages/user/MyTickets";
import FAQ from "../pages/support/FAQ";
import Contact from "../pages/support/Contact";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<SingleEvent />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/my-tickets" element={<MyTickets />} />

        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />

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
