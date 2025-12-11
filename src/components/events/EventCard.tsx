import React from "react";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  onViewDetails: () => void;
}

export default function EventCard({
  title,
  date,
  location,
  imageUrl,
  onViewDetails,
}: EventCardProps) {
  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-white border border-gray-200 hover:border-red-300 transform hover:-translate-y-1">
      {/* Image Section */}
      <div className="h-48 w-full overflow-hidden bg-gradient-to-br from-red-100 to-red-50">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 line-clamp-2 hover:text-red-600 transition-colors">
          {title}
        </h2>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Calendar size={16} className="text-red-500 flex-shrink-0" />
            <span>{date}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin size={16} className="text-red-500 flex-shrink-0" />
            <span>{location}</span>
          </div>
        </div>

        <button
          onClick={onViewDetails}
          className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          View Details
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
