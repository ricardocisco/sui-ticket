import { Calendar, DollarSign, Heart, MapPin, Ticket } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import type { EventoType } from "../../hooks/useTicketContract";

interface EventCardProps {
  event: EventoType;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link
      to={`/event/${event.evento_id}`}
      className="group block rounded-2xl overflow-hidden bg-secondary border border-border/50 shadow-card hover:shadow-elevated hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground">
            {/* {event.category} */}
          </span>
        </div>

        {/* Favorite Button */}
        <Button
          variant={"ghost"}
          className="absolute top-4 right-4 w-9 h-9 rounded-full glass border border-border/50 flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-all"
        >
          <Heart className="w-4 h-4 text-red-600" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {event.name}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{event.description}</span>
          </div>
          <div className="flex items-center gap-2 text-md">
            <Ticket className="w-4 h-4 text-primary" />
            <span className="line-clamp-1">
              {event.total_supply} Disponíveis
            </span>
          </div>
          <div className="flex items-center gap-2 text-md">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="line-clamp-1">
              {(event.price / 1e9).toFixed(2)} SUI
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {/* por {event.owner} */}
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
