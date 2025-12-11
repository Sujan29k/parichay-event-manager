const events = [
  {
    id: "1",
    title: "Music Fiesta 2025",
    image: "/sample1.jpg",
    date: "Feb 14, 2025",
    location: "Kathmandu, Nepal",
    description:
      "Join us for an amazing night full of music, energy, and excitement. Featuring top artists!",
  },
  {
    id: "2",
    title: "Tech Expo",
    image: "/sample2.jpg",
    date: "Jan 20, 2025",
    location: "Pokhara",
    description:
      "Explore the latest technology trends, startups, and innovative gadgets!",
  },
];

export default function EventDetails({ params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === params.id);

  if (!event) {
    return (
      <div className="min-h-40 flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Event Not Found</h2>
          <p className="text-gray-600">The requested event does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <img
        src={event.image}
        alt={event.title}
        className="rounded-lg shadow-lg mb-6 w-full object-cover h-80"
      />

      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

      <p className="text-lg text-gray-700 mb-2">📅 {event.date}</p>
      <p className="text-lg text-gray-700 mb-4">📍 {event.location}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">About the Event</h2>
      <p className="text-gray-600 leading-relaxed">{event.description}</p>

      <button className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
        Buy Ticket
      </button>
    </div>
  );
}
