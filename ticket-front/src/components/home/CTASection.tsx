import { Button } from "../ui/button";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Zap,
    title: "Criação Rápida",
    description: "Crie seu evento em minutos"
  },
  {
    icon: Shield,
    title: "Pagamento Seguro",
    description: "Transações 100% protegidas"
  },
  {
    icon: Sparkles,
    title: "Gestão Completa",
    description: "Tudo em um só lugar"
  }
];

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Card */}
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient Border */}
            <div className="absolute inset-0 gradient-primary opacity-20" />
            <div className="absolute inset-[1px] rounded-3xl bg-card" />

            <div className="relative p-8 md:p-12 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium text-primary mb-6">
                <Sparkles className="w-4 h-4" />
                Para Organizadores
              </span>

              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
                Crie eventos <span className="text-gradient">incríveis</span>
              </h2>

              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Publique seu evento, venda ingressos e gerencie tudo em uma
                plataforma moderna e intuitiva.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex flex-col items-center"
                  >
                    <div className="w-12 h-12 rounded-xl gradient-primary/20 border border-primary/30 flex items-center justify-center mb-3">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/create-event">
                  <Button size="lg">
                    Começar Agora
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg">Ver Planos e Preços</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { value: "10K+", label: "Eventos Criados" },
              { value: "500K+", label: "Ingressos Vendidos" },
              { value: "98%", label: "Satisfação" },
              { value: "24/7", label: "Suporte" }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-gradient">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
