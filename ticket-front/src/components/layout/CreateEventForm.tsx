import {
  AlertCircle,
  CircleDollarSign,
  Link2,
  Ticket,
  Tickets,
  Type
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useTicketData } from "../../hooks/useTicketContract";
import { useState } from "react";

const SUI_DECIMALS = 1_000_000_000;

export function CreateMarketForm({ adminCap }: { adminCap: string }) {
  const { createEvent } = useTicketData();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState();
  const [supply, setSupply] = useState<number>(0);
  const [url, setUrl] = useState<string>("");

  const handleCreate = () => {
    console.log("--- DEBUG DIAGNÓSTICO ---");

    if (!name || !description || !price || !supply || !url) {
      console.log("Falta preencher os campos");
      return;
    }

    let priceInMist: bigint;
    try {
      const priceFloat = parseFloat(price);
      if (isNaN(priceFloat) || priceFloat < 0)
        throw new Error("Preço inválido");

      priceInMist = BigInt(Math.floor(priceFloat * SUI_DECIMALS));

      console.log(`Input: ${price} SUI | Enviando: ${priceInMist} MIST`);
    } catch (e) {
      console.error("Erro ao converter preço:", e);
      return;
    }

    createEvent(adminCap, name, description, Number(priceInMist), supply, url);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Ticket className="w-6 h-6 text-primary" />
          Criar Novo Evento
        </CardTitle>
        <CardDescription>
          Crie o evento com as informações abaixo:
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <Type className="w-4 h-4 text-muted-foreground" />
            Nome do Evento
          </Label>
          <Input
            id="name"
            placeholder="ex: ETH Latam"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-lg py-4"
          />
        </div>
        {/* Input Descrição */}
        <div className="space-y-2">
          <Label htmlFor="description" className="flex items-center gap-2">
            <Type className="w-4 h-4 text-muted-foreground" />
            Descrição do Evento
          </Label>
          <Input
            id="description"
            placeholder="ex: Eth Latam Floripa"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-lg py-4"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price" className="flex items-center gap-2">
            <CircleDollarSign className="w-4 h-4 text-muted-foreground" />
            Preço do Evento
          </Label>
          <Input
            id="price"
            placeholder="0.00"
            value={price ?? ""}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            step="any"
            min="0"
            className="text-lg py-4"
          />

          {price && (
            <p className="text-xs text-muted-foreground ml-1">
              Você vai cobrar:{" "}
              <span className="text-foreground font-medium">{price} SUI</span>{" "}
              por ticket.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="supply" className="flex items-center gap-2">
            <Tickets className="w-4 h-4 text-muted-foreground" />
            Supply de Ticket
          </Label>
          <Input
            id="supply"
            placeholder="Supply do Evento, ex: 1000 tickets"
            value={supply}
            type="number"
            onChange={(e) => setSupply(Number(e.target.value))}
            className="text-lg py-4"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="url" className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-muted-foreground" />
            Url Image
          </Label>
          <Input
            id="url"
            placeholder="Imagem do evento, ex: https:://"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="text-lg py-4"
          />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        {/* Aviso de Admin */}
        {!adminCap && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Acesso Restrito</AlertTitle>
            <AlertDescription>
              Sua carteira conectada não possui o AdminCap. Você não poderá
              confirmar a transação.
            </AlertDescription>
          </Alert>
        )}

        <Button
          className="w-full text-lg py-4 font-semibold shadow-lg hover:shadow-primary/20 transition-all"
          onClick={handleCreate}
          disabled={!adminCap || !description}
        >
          {adminCap ? "Criar Evento" : "Aguardando Permissão de Admin"}
        </Button>
      </CardFooter>
    </Card>
  );
}
