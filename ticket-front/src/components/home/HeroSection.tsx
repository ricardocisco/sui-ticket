import { useState } from "react";

import { Search, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="flex flex-1 items-center justify-center overflow-hidden py-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[100px]"
          style={{ animationDelay: "-3s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground">
              +10.000 eventos ativos
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up">
            Descubra experiências{" "}
            <span className="text-gradient">inesquecíveis</span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Encontre shows, festas, cursos, congressos e muito mais. Sua próxima
            grande experiência está a um clique de distância.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="p-2 rounded-2xl border border-border/50 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar eventos, artistas ou locais..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 border-0 bg-secondary/50 focus-visible:ring-0"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Cidade ou região"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-12 h-12 border-0 bg-secondary/50 focus-visible:ring-0"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-8">
                Buscar
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {/* Quick Filters */}
          <div
            className="flex flex-wrap justify-center gap-3 mt-8 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <button className="px-4 py-2 rounded-full glass border border-border/50 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
              <Calendar className="w-4 h-4 inline-block mr-2" />
              Hoje
            </button>
            <button className="px-4 py-2 rounded-full glass border border-border/50 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
              Este fim de semana
            </button>
            <button className="px-4 py-2 rounded-full glass border border-border/50 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
              Gratuitos
            </button>
            <button className="px-4 py-2 rounded-full glass border border-border/50 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
              Online
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
