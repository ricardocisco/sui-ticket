import { ConnectButton } from "@mysten/dapp-kit";
import { ModeToggle } from "../theme/mode-toggle";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border backdrop-blur bg-secondary">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <Link to={"/"}>Logo</Link>
        <ul className="flex gap-2 cursor-pointer">
          <Link to={"/events"}>Eventos</Link>
          <Link to={"/criar-evento"}>Criar Evento</Link>
        </ul>
        <div className="flex items-center gap-2">
          <ConnectButton />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
