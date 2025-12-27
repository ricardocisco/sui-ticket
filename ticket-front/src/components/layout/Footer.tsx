import { Link } from "react-router-dom";
import { Ticket, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Ticket className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Even<span className="text-gradient">tick</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              A melhor plataforma para descobrir, criar e gerenciar eventos
              incríveis.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Explorar
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/events"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Todos os Eventos
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Categorias
                </Link>
              </li>
              <li>
                <Link
                  to="/events?filter=free"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Eventos Gratuitos
                </Link>
              </li>
              <li>
                <Link
                  to="/events?filter=online"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Eventos Online
                </Link>
              </li>
            </ul>
          </div>

          {/* Organizadores */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Para Organizadores
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/create-event"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Criar Evento
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Preços
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Recursos
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Central de Ajuda
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Cookies
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">
            {`${new Date().getFullYear()} Eventick. Todos os direitos reservados.`}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
