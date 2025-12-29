module ticket::ticket;

use std::string::{Self, String};
use sui::balance::{Self, Balance};
use sui::clock::{Self, Clock};
use sui::coin::{Self, Coin};
use sui::event;
use sui::sui::SUI;
use sui::url::{Self, Url};

// Erros
const EInsufficientFunds: u64 = 0;
const ENoSupply: u64 = 1;
const ENotOwner: u64 = 2;
const EAlreadyUse: u64 = 3;

// Estruturas
public struct AdminCap has key {
    id: UID,
}

public struct Evento has key {
    id: UID,
    name: String,
    description: String,
    price: u64,
    total_supply: u64,
    tickets_sold: u64,
    balance: Balance<SUI>,
    image: Url,
}

public struct EventoCreated has copy, drop {
    evento_id: ID,
    owner: address,
    name: String,
    description: String,
    price: u64,
    total_supply: u64,
    tickets_sold: u64,
    image: Url,
}

public struct Ticket has key, store {
    id: UID,
    evento_id: ID,
    name: String,
    description: String,
    image: Url,
}

public struct TicketMinted has copy, drop {
    ticket_id: ID,
    evento_id: ID,
    name: String,
    description: String,
    image: Url,
}

public struct TicketSBT has key {
    id: UID,
    evento_id: ID,
    name: String,
    description: String,
    image: Url,
    participated_at: u64,
}

public struct SbtMinted has copy, drop {
    sbt_id: ID,
    evento_id: ID,
    owner: address,
    name: String,
    description: String,
    image: Url,
    participated_at: u64,
}
public struct ListedTicket has key, store {
    id: UID,
    seller: address,
    price: u64,
    ticket: Ticket,
}

public struct TicketListed has copy, drop {
    listing_id: ID,
    ticket_id: ID,
    seller: address,
    price: u64,
}

public struct TicketEventMinted has copy, drop {
    ticket_id: ID,
    buyer: address,
    event_id: ID,
}

// Init do AdminCap

fun init(ctx: &mut TxContext) {
    transfer::transfer(AdminCap { id: object::new(ctx) }, ctx.sender());
}
// Funções

public fun create_event(
    _cap: &AdminCap,
    name: String,
    description: String,
    price: u64,
    supply: u64,
    url: String,
    ctx: &mut TxContext,
) {
    let image_bytes = url::new_unsafe_from_bytes(*string::bytes(&url));

    let evento = Evento {
        id: object::new(ctx),
        name,
        description,
        price,
        total_supply: supply,
        tickets_sold: 0,
        balance: balance::zero(),
        image: image_bytes,
    };

    event::emit(EventoCreated {
        evento_id: object::id(&evento),
        owner: ctx.sender(),
        name: evento.name,
        description: evento.description,
        price: evento.price,
        total_supply: evento.total_supply,
        tickets_sold: evento.tickets_sold,
        image: evento.image,
    });

    transfer::share_object(evento);
}

public fun buy_ticket(evento: &mut Evento, payment: Coin<SUI>, ctx: &mut TxContext) {
    assert!(evento.tickets_sold < evento.total_supply, ENoSupply);
    assert!(coin::value(&payment) == evento.price, EInsufficientFunds);

    let coin_balance = coin::into_balance(payment);
    balance::join(&mut evento.balance, coin_balance);

    evento.tickets_sold = evento.tickets_sold + 1;

    let ticket = Ticket {
        id: object::new(ctx),
        evento_id: object::id(evento),
        name: evento.name,
        description: evento.description,
        image: evento.image,
    };

    event::emit(TicketEventMinted {
        ticket_id: object::id(&ticket),
        buyer: ctx.sender(),
        event_id: object::id(evento),
    });

    transfer::public_transfer(ticket, ctx.sender());
}

public fun listing_ticket(ticket: Ticket, price: u64, ctx: &mut TxContext) {
    let listing = ListedTicket {
        id: object::new(ctx),
        seller: ctx.sender(),
        price: price,
        ticket: ticket,
    };

    event::emit(TicketListed {
        listing_id: object::id(&listing),
        ticket_id: object::id(&listing.ticket),
        seller: listing.seller,
        price: price,
    });
    transfer::share_object(listing);
}

public fun buy_listing(listing: ListedTicket, payment: Coin<SUI>, ctx: &mut TxContext) {
    assert!(coin::value(&payment) == listing.price, EInsufficientFunds);

    let ListedTicket { id, seller, price: _, ticket } = listing;

    transfer::public_transfer(payment, seller);

    transfer::public_transfer(ticket, ctx.sender());

    object::delete(id);
}

public fun check_in(ticket: Ticket, clock: &Clock, ctx: &mut TxContext) {
    let Ticket { id, evento_id, name, description, image } = ticket;

    object::delete(id);

    let sbt = TicketSBT {
        id: object::new(ctx),
        name: name,
        evento_id: evento_id,
        description: description,
        image: image,
        participated_at: clock::timestamp_ms(clock),
    };

    event::emit(SbtMinted {
        sbt_id: object::id(&sbt),
        evento_id: evento_id,
        owner: ctx.sender(),
        name: sbt.name,
        description: sbt.description,
        image: sbt.image,
        participated_at: clock::timestamp_ms(clock),
    });

    transfer::transfer(sbt, ctx.sender());
}
