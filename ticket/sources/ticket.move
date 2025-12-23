module ticket::ticket;

use std::string::{Self, String};
use sui::event;
use sui::url::{Self, Url};

//estruturas
public struct Ticket has key, store {
    id: UID,
    name: String,
    description: String,
    image_url: Url,
    is_used: bool,
}

//eventos
public struct TicketMinted has copy, drop {
    ticket_id: ID,
    buyer: address,
    name: String,
}

public fun create_ticket(
    name: vector<u8>,
    description: vector<u8>,
    image_url: vector<u8>,
    is_used: bool,
    ctx: &mut TxContext,
) {
    let sender = ctx.sender();

    let ticket = Ticket {
        id: object::new(ctx),
        name: string::utf8(name),
        description: string::utf8(description),
        image_url: url::new_unsafe_from_bytes(image_url),
        is_used: false,
    };

    event::emit(TicketMinted {
        ticket_id: object::id(&ticket),
        buyer: sender,
        name: ticket.name,
    });

    transfer::public_transfer(ticket, sender);
}

public fun transfer_ticket(ticket: Ticket, recipient: address, _: &mut TxContext) {
    transfer::public_transfer(ticket, recipient);
}

public fun invalide_ticket(ticket: &mut Ticket, _ctx: &mut TxContext) {
    ticket.is_used = true;
}

// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions
