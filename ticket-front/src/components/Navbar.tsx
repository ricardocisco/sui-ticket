import { ConnectButton } from "@mysten/dapp-kit";

export default function Navbar() {
  return (
    <nav className="w-full bg-(--background-10) text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1>Logo</h1>
        <ConnectButton />
      </div>
    </nav>
  );
}
