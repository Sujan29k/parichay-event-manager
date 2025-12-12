import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: number;
  capacity: number;
  soldTickets: number;
  status: "active" | "draft" | "cancelled" | "completed";
  image: string;
  description: string;
}

interface EventContextType {
  events: Event[];
  addEvent: (event: Omit<Event, "id" | "soldTickets">) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  getEventById: (id: string) => Event | undefined;
  getActiveEvents: () => Event[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Tech Summit 2026",
      date: "2026-01-15",
      time: "09:00 AM",
      location: "Kathmandu Convention Center",
      category: "Conference",
      price: 2500,
      capacity: 500,
      soldTickets: 342,
      status: "active",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      description: "Annual technology summit featuring industry leaders and latest tech innovations",
    },
    {
      id: "2",
      title: "Music Fest 2026",
      date: "2026-02-20",
      time: "06:00 PM",
      location: "Dasarath Stadium",
      category: "Concert",
      price: 1500,
      capacity: 2000,
      soldTickets: 1856,
      status: "active",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
      description: "Live music festival featuring top artists from Nepal and India",
    },
    {
      id: "3",
      title: "Art Workshop",
      date: "2026-01-25",
      time: "02:00 PM",
      location: "Nepal Art Council",
      category: "Workshop",
      price: 800,
      capacity: 50,
      soldTickets: 12,
      status: "active",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
      description: "Learn painting techniques from professional artists in this hands-on workshop",
    },
    {
      id: "4",
      title: "Startup Meetup Kathmandu",
      date: "2026-03-10",
      time: "05:00 PM",
      location: "Lalitpur Business Hub",
      category: "Conference",
      price: 500,
      capacity: 200,
      soldTickets: 87,
      status: "active",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
      description: "Network with entrepreneurs, investors, and startup enthusiasts",
    },
    {
      id: "5",
      title: "Food Festival 2026",
      date: "2026-04-18",
      time: "11:00 AM",
      location: "Tundikhel Ground",
      category: "Festival",
      price: 300,
      capacity: 1500,
      soldTickets: 623,
      status: "active",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
      description: "Taste delicious cuisines from different cultures and regions",
    },
    {
      id: "6",
      title: "Marathon 2026",
      date: "2026-06-20",
      time: "06:00 AM",
      location: "Pokhara Lakeside",
      category: "Sports",
      price: 1000,
      capacity: 800,
      soldTickets: 456,
      status: "active",
      image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800",
      description: "Annual charity marathon with scenic routes around Pokhara valley",
    },
  ]);

  const addEvent = (eventData: Omit<Event, "id" | "soldTickets">) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      soldTickets: 0,
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  const updateEvent = (id: string, eventData: Partial<Event>) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, ...eventData } : event
      )
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const getEventById = (id: string) => {
    return events.find((event) => event.id === id);
  };

  const getActiveEvents = () => {
    return events.filter((event) => event.status === "active");
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        getEventById,
        getActiveEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
}
