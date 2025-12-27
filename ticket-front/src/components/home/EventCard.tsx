import { Calendar, MapPin, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  city: string;
  price: number;
  image: string;
  category: string;
  organizer: string;
  isFree?: boolean;
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link
      to={`/event/${event.id}`}
      className="group block rounded-2xl overflow-hidden bg-secondary border border-border/50 shadow-card hover:shadow-elevated hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground">
            {event.category}
          </span>
        </div>

        {/* Favorite Button */}
        <Button
          variant={"ghost"}
          className="absolute top-4 right-4 w-9 h-9 rounded-full glass border border-border/50 flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-all"
        >
          <Heart className="w-4 h-4 text-red-600" />
        </Button>

        {/* Price Tag */}
        <div className="absolute bottom-4 right-4">
          {event.isFree ? (
            <span className="px-3 py-1 rounded-full text-sm font-bold bg-green-500/20 text-green-400 border border-green-500/30">
              Grátis
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-sm font-bold border border-border/50 text-foreground">
              A partir de R$ {event.price}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>
              {event.date} • {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="line-clamp-1">
              {event.location}, {event.city}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            por {event.organizer}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Ver Detalhes
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
