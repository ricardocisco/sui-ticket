import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useState } from "react";

interface EventoType {
  id: string;
  name: string;
  description: string;
  price: string;
  supply: string;
  image: string;
  owner?: string;
}

interface TicketType {
  id: string;
  evento_id: string;
  name: string;
  description: string;
  image: string;
}

interface ListedTicketType {
  id: string;
  seller: string;
  price: number;
  ticket: TicketType;
}

export const useTicketData = () => {
  const client = useSuiClient();
  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction();

  const [eventInfo, setEventInfo] = useState<EventoType | null>(null);

  const fetchEvent = async (eventId: string) => {
    try {
      const eventResponse = await client.getObject({
        id: eventId,
        options: { showContent: true, showOwner: true }
      });

      if (eventResponse.data?.content?.dataType === "moveObject") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fields = eventResponse.data.content.fields as any;

        setEventInfo({
          id: eventResponse.data.objectId,
          name: fields.name,
          description: fields.description,
          price: fields.price,
          supply: fields.total_supply,
          image: fields.image,
          owner:
            eventResponse.data.owner &&
            typeof eventResponse.data.owner === "object" &&
            "AddressOwner" in eventResponse.data.owner
              ? eventResponse.data.owner.AddressOwner
              : undefined
        });
      }
    } catch (error) {
      console.error("erro ao buscar evento", error);
    }
  };

  const createEvent = async (
    adminCap: string,
    name: string,
    description: string,
    price: number,
    supply: number,
    url: string
  ) => {
    const tx = new Transaction();

    tx.moveCall({
      target: `${import.meta.env.VITE_CONTRACT_ID}::ticket::create_event`,
      arguments: [
        tx.object(adminCap),
        tx.pure.string(name),
        tx.pure.string(description),
        tx.pure.u64(BigInt(price)),
        tx.pure.u64(BigInt(supply)),
        tx.pure.string(url)
      ]
    });

    try {
      const response = await signAndExecuteTransaction({ transaction: tx });
      console.log("Evento criado com sucesso:", response);

      return response;
    } catch (error) {
      console.error("Falha na transação:", error);
      throw error;
    }
  };

  const buyTicket = async (evento: EventoType, payment: string) => {
    const tx = new Transaction();

    const paymentTicket = tx.splitCoins(tx.gas, [tx.pure.u64(BigInt(payment))]);

    tx.moveCall({
      target: `${import.meta.env.VITE_CONTRACT_ID}::ticket::buy_ticket`,
      arguments: [tx.object(evento.id), paymentTicket]
    });

    return await signAndExecuteTransaction({ transaction: tx });
  };

  const listingTicket = async (ticket: TicketType, price: number) => {
    const tx = new Transaction();

    tx.moveCall({
      target: `${import.meta.env.VITE_CONTRACT_ID}::ticket::listing_ticket`,
      arguments: [tx.object(ticket.id), tx.pure.u64(BigInt(price))]
    });
  };

  const buyListing = async (
    listing: ListedTicketType,
    paymentAmount: string
  ) => {
    const tx = new Transaction();

    const payment = tx.splitCoins(tx.gas, [tx.pure.u64(BigInt(paymentAmount))]);

    tx.moveCall({
      target: `${import.meta.env.VITE_CONTRACT_ID}::ticket::buy_listing`,
      arguments: [tx.object(listing.id), payment]
    });
  };

  const checkIn = async (ticket: TicketType) => {
    const tx = new Transaction();

    tx.moveCall({
      target: `${import.meta.env.VITE_CONTRACT_ID}::ticket::check_in`,
      arguments: [tx.object(ticket.id)]
    });
  };

  return {
    eventInfo,
    fetchEvent,
    createEvent,
    buyTicket,
    listingTicket,
    buyListing,
    checkIn
  };
};
