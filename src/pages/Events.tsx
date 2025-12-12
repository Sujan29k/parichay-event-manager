import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import EventCard from "../components/common/EventCard";
import { useEvents } from "../context/EventContext";

export default function Events() {
  const navigate = useNavigate();
  const { getActiveEvents } = useEvents();
  const events = getActiveEvents();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Events
            </h1>
            <p className="text-xl text-gray-600">
              Find and book tickets for amazing events near you
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search events..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                <option>All Categories</option>
                <option>Music</option>
                <option>Technology</option>
                <option>Business</option>
                <option>Food</option>
                <option>Arts</option>
                <option>Sports</option>
              </select>
              <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition">
                Search
              </button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {events.map((event) => (
              <EventCard
                key={event.id}
                id={String(event.id)}
                title={event.title}
                date={event.date}
                location={event.location}
                imageUrl={event.image}
                onViewDetails={() => navigate(`/events/${event.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
