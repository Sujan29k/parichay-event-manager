import React from "react";
import { MapPin, Calendar, ArrowRight, Clock, Users } from "lucide-react";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  price?: number;
  category?: string;
  attendees?: number;
  onViewDetails: () => void;
}

export default function EventCard({
  title,
  date,
  location,
  imageUrl,
  price,
  category,
  attendees,
  onViewDetails,
}: EventCardProps) {
  // Format date for display
  const formatDate = (dateStr: string) => {
    try {
      const eventDate = new Date(dateStr);
      const day = eventDate.getDate();
      const month = eventDate.toLocaleString('default', { month: 'short' });
      const year = eventDate.getFullYear();
      return { day, month, year, full: dateStr };
    } catch {
      return { day: '--', month: '---', year: '', full: dateStr };
    }
  };

  const dateInfo = formatDate(date);

  return (
    <div
      onClick={onViewDetails}
      className="group w-full max-w-sm mx-auto rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-md hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
    >
      {/* Image Section with Overlay */}
      <div className="relative h-52 w-full overflow-hidden">
        {/* Background Gradient Fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-red-50 to-orange-50" />
        
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold rounded-full shadow-lg">
              {category}
            </span>
          </div>
        )}
        
        {/* Date Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-white rounded-xl shadow-lg p-2 text-center min-w-[56px]">
            <span className="block text-xs font-bold text-red-600 uppercase tracking-wide">
              {dateInfo.month}
            </span>
            <span className="block text-xl font-bold text-gray-900 leading-tight">
              {dateInfo.day}
            </span>
          </div>
        </div>

        {/* Price Tag */}
        {price !== undefined && (
          <div className="absolute bottom-4 left-4">
            <span className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold rounded-lg shadow-lg">
              {price === 0 ? 'FREE' : `₹${price}`}
            </span>
          </div>
        )}

        {/* Attendees */}
        {attendees !== undefined && attendees > 0 && (
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-sm text-white text-xs font-medium rounded-full">
              <Users size={12} />
              <span>{attendees}+ going</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-red-600 transition-colors duration-300 leading-snug">
          {title}
        </h2>

        {/* Event Details */}
        <div className="space-y-2.5 mb-5">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar size={14} className="text-red-600" />
            </div>
            <span className="text-sm font-medium truncate">{date}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin size={14} className="text-blue-600" />
            </div>
            <span className="text-sm font-medium truncate">{location}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5" />

        {/* Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
          className="w-full py-3.5 bg-gray-900 hover:bg-red-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 group/btn shadow-sm hover:shadow-lg"
        >
          <span>View Details</span>
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}
