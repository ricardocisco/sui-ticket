import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import EventCard, { type Event } from "../components/home/EventCard";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Calendar,
  ChevronDown,
  MapPin,
  Search,
  SlidersHorizontal,
  X
} from "lucide-react";
import { Input } from "../components/ui/input";

const allEvents: Event[] = [
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
  },
  {
    id: 7,
    title: "Exposição de Arte Contemporânea",
    date: "12 Jan 2025",
    time: "10:00",
    location: "MASP",
    city: "São Paulo",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&q=80",
    category: "Arte",
    organizer: "MASP"
  },
  {
    id: 8,
    title: "Yoga no Parque - Edição Verão",
    date: "08 Jan 2025",
    time: "07:00",
    location: "Parque do Ibirapuera",
    city: "São Paulo",
    price: 0,
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    category: "Bem-estar",
    organizer: "Zen Life",
    isFree: true
  },
  {
    id: 9,
    title: "Rock in Rio - Dia 1",
    date: "15 Set 2025",
    time: "14:00",
    location: "Cidade do Rock",
    city: "Rio de Janeiro",
    price: 695,
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    category: "Música",
    organizer: "Rock World"
  }
];

const categories = [
  "Todos",
  "Música",
  "Curso",
  "Congresso",
  "Comédia",
  "Esporte",
  "Gastronomia",
  "Arte",
  "Bem-estar"
];

export default function Events() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "Todos" || event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Explorar <span className="text-gradient">Eventos</span>
            </h1>
            <p className="text-muted-foreground">
              Encontre eventos incríveis perto de você
            </p>
          </div>

          {/* Search and Filters */}
          <div className="glass rounded-2xl border border-border/50 p-4 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar eventos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 border-0 bg-secondary/50"
                />
              </div>

              {/* Location */}
              <div className="relative lg:w-64">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Localização"
                  className="pl-12 h-12 border-0 bg-secondary/50"
                />
              </div>

              {/* Date */}
              <div className="relative lg:w-48">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Quando"
                  className="pl-12 h-12 border-0 bg-secondary/50"
                />
              </div>

              {/* Filter Toggle */}
              <Button
                className="h-12"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </div>

            {/* Category Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-border/50 animate-slide-up">
                <p className="text-sm font-medium text-foreground mb-3">
                  Categorias
                </p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? "gradient-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedCategory !== "Todos") && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-muted-foreground">
                Filtros ativos:
              </span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-sm">
                  "{searchQuery}"
                  <Button size={"icon-sm"} onClick={() => setSearchQuery("")}>
                    <X className="w-3 h-3" />
                  </Button>
                </span>
              )}
              {selectedCategory !== "Todos" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-sm">
                  {selectedCategory}
                  <Button
                    size={"icon-sm"}
                    onClick={() => setSelectedCategory("Todos")}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </span>
              )}
            </div>
          )}

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            {filteredEvents.length} eventos encontrados
          </p>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <p className="text-2xl font-display font-semibold text-foreground mb-2">
                Nenhum evento encontrado
              </p>
              <p className="text-muted-foreground mb-6">
                Tente ajustar seus filtros ou buscar por outros termos
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Todos");
                }}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
