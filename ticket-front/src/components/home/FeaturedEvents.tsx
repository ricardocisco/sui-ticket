import { ArrowRight, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import EventCard, { type Event } from "./EventCard";

const featuredEvents: Event[] = [
  {
    id: 1,
    title: "Festival de Música Eletrônica - Neon Nights",
    date: "28 Dez 2024",
    time: "22:00",
    location: "Espaço das Américas",
    city: "São Paulo",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    category: "Música",
    organizer: "Neon Events"
  },
  {
    id: 2,
    title: "Workshop de Fotografia Profissional",
    date: "15 Jan 2025",
    time: "09:00",
    location: "Studio F22",
    city: "Rio de Janeiro",
    price: 280,
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80",
    category: "Curso",
    organizer: "F22 Academy"
  },
  {
    id: 3,
    title: "Tech Conference 2025 - Future of AI",
    date: "20 Jan 2025",
    time: "08:00",
    location: "Centro de Convenções",
    city: "São Paulo",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    category: "Congresso",
    organizer: "TechBR"
  },
  {
    id: 4,
    title: "Stand-up Comedy Night",
    date: "05 Jan 2025",
    time: "20:00",
    location: "Teatro Municipal",
    city: "Curitiba",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80",
    category: "Comédia",
    organizer: "Risadas BR"
  },
  {
    id: 5,
    title: "Maratona de São Paulo 2025",
    date: "02 Mar 2025",
    time: "06:00",
    location: "Ibirapuera",
    city: "São Paulo",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&q=80",
    category: "Esporte",
    organizer: "SP Sports"
  },
  {
    id: 6,
    title: "Feira Gastronômica Internacional",
    date: "10 Jan 2025",
    time: "11:00",
    location: "Parque Villa-Lobos",
    city: "São Paulo",
    price: 0,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    category: "Gastronomia",
    organizer: "FoodFest",
    isFree: true
  }
];

const FeaturedEvents = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                Em Destaque
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Eventos <span className="text-gradient">Populares</span>
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Os eventos mais procurados do momento. Garanta seu ingresso antes
              que esgote!
            </p>
          </div>
          <Link to="/events">
            <Button variant="outline" className="mt-6 md:mt-0">
              Ver todos os eventos
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event, index) => (
            <div key={event.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
