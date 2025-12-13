import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Calendar, MapPin, SlidersHorizontal, Grid3X3, List, ChevronDown, X, Sparkles } from "lucide-react";
import Navbar from "../components/common/Navbar";
import EventCard from "../components/common/EventCard";
import { useEvents } from "../context/EventContext";

type SortOption = "date-asc" | "date-desc" | "price-asc" | "price-desc" | "name";
type ViewMode = "grid" | "list";

export default function Events() {
  const navigate = useNavigate();
  const { getActiveEvents } = useEvents();
  const events = getActiveEvents();

  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("date-asc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<"all" | "free" | "paid">("all");

  // Get unique categories from events
  const categories = useMemo(() => {
    const cats = new Set(events.map((e) => e.category).filter(Boolean));
    return ["all", ...Array.from(cats)];
  }, [events]);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(query) ||
          e.location.toLowerCase().includes(query) ||
          e.category?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((e) => e.category === selectedCategory);
    }

    // Price filter
    if (priceRange === "free") {
      result = result.filter((e) => !e.price || e.price === 0);
    } else if (priceRange === "paid") {
      result = result.filter((e) => e.price && e.price > 0);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "price-asc":
          return (a.price || 0) - (b.price || 0);
        case "price-desc":
          return (b.price || 0) - (a.price || 0);
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  }, [events, searchQuery, selectedCategory, sortBy, priceRange]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange("all");
    setSortBy("date-asc");
  };

  const hasActiveFilters = searchQuery || selectedCategory !== "all" || priceRange !== "all";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-red-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-20 w-48 h-48 bg-orange-200 rounded-full opacity-20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Discover Amazing Events
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Find Your Next
              <span className="block bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                Experience
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse through our curated collection of events and book your tickets instantly
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events, venues, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Category Select */}
              <div className="relative min-w-[180px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none px-4 py-3.5 pr-10 bg-gray-50 border-2 border-gray-100 rounded-xl text-gray-900 font-medium focus:outline-none focus:border-red-500 focus:bg-white transition-all cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort Select */}
              <div className="relative min-w-[160px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full appearance-none px-4 py-3.5 pr-10 bg-gray-50 border-2 border-gray-100 rounded-xl text-gray-900 font-medium focus:outline-none focus:border-red-500 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="date-asc">Date: Soonest</option>
                  <option value="date-desc">Date: Latest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name: A-Z</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold transition-all ${
                  showFilters
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
              </button>

              {/* View Mode Toggle */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-white text-red-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-white text-red-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Price:</span>
                    <div className="flex gap-2">
                      {[
                        { value: "all", label: "All" },
                        { value: "free", label: "Free" },
                        { value: "paid", label: "Paid" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setPriceRange(option.value as typeof priceRange)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            priceRange === option.value
                              ? "bg-red-600 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="ml-auto flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      <X className="w-4 h-4" />
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Results Count & Active Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <p className="text-gray-600">
                Showing <span className="font-bold text-gray-900">{filteredEvents.length}</span>{" "}
                {filteredEvents.length === 1 ? "event" : "events"}
              </p>
              
              {/* Active Filter Tags */}
              {hasActiveFilters && (
                <div className="flex items-center gap-2">
                  {selectedCategory !== "all" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory("all")}>
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  )}
                  {priceRange !== "all" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {priceRange === "free" ? "Free Events" : "Paid Events"}
                      <button onClick={() => setPriceRange("all")}>
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Events Grid/List */}
          {filteredEvents.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                  : "flex flex-col gap-4"
              }
            >
              {filteredEvents.map((event) =>
                viewMode === "grid" ? (
                  <EventCard
                    key={event.id}
                    id={String(event.id)}
                    title={event.title}
                    date={event.date}
                    location={event.location}
                    imageUrl={event.image}
                    price={event.price}
                    category={event.category}
                    onViewDetails={() => navigate(`/events/${event.id}`)}
                  />
                ) : (
                  /* List View Card */
                  <div
                    key={event.id}
                    onClick={() => navigate(`/events/${event.id}`)}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="relative w-full sm:w-64 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent sm:bg-gradient-to-r" />
                        {event.price !== undefined && (
                          <div className="absolute bottom-3 left-3 sm:bottom-auto sm:top-3">
                            <span className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold rounded-lg shadow-lg">
                              {event.price === 0 ? "FREE" : `₹${event.price}`}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                        <div>
                          {event.category && (
                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full mb-3">
                              {event.category}
                            </span>
                          )}
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors mb-3">
                            {event.title}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-red-500" />
                              <span className="text-sm">{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-blue-500" />
                              <span className="text-sm">{event.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <button className="text-red-600 font-semibold hover:text-red-700 transition-colors">
                            View Details →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Events Found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We couldn't find any events matching your criteria. Try adjusting your filters or search query.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

