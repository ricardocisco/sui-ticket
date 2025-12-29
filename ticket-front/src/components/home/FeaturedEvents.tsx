import { ArrowRight, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import EventCard from "./EventCard";
import { useTicketData } from "../../hooks/useTicketContract";

const FeaturedEvents = () => {
  const { eventInfo } = useTicketData();

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
          {eventInfo.map((event, index) => (
            <div
              key={event.evento_id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
