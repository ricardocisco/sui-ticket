module ticket::ticket;

use std::string::{Self, String};
use sui::balance::{Self, Balance};
use sui::clock::Clock;
use sui::coin::{Self, Coin};
use sui::event;
use sui::sui::SUI;
use sui::url::{Self, Url};

// Erros
const EInsuficientFunds: u64 = 0;
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

public struct Ticket has key, store {
    id: UID,
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

public struct TicketMinted has copy, drop {
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
    url: Url,
    ctx: &mut TxContext,
) {
    let evento = Evento {
        id: object::new(ctx),
        name,
        description,
        price,
        total_supply: supply,
        tickets_sold: 0,
        balance: balance::zero(),
        image: url,
    };
    transfer::share_object(evento);
}

public fun buy_ticket(evento: &mut Evento, payment: Coin<SUI>, ctx: &mut TxContext) {
    assert!(evento.tickets_sold <= evento.total_supply, ENoSupply);
    assert!(coin::value(&payment) == evento.price, EInsuficientFunds);

    let coin_balance = coin::into_balance(payment);
    balance::join(&mut evento.balance, coin_balance);

    evento.tickets_sold = evento.tickets_sold + 1;
    let sender = ctx.sender();

    let ticket = Ticket {
        id: object::new(ctx),
        evento_id: object::id(evento),
        name: evento.name,
        description: evento.description,
        image: evento.image,
    };

    event::emit(TicketMinted {
        ticket_id: object::id(&ticket),
        buyer: sender,
        event_id: object::id(evento),
    });

    transfer::public_transfer(ticket, sender);
}

public fun check_in(ticket: Ticket, clock: &Clock, ctx: &mut TxContext) {
    let sender = ctx.sender();

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

    transfer::transfer(sbt, sender);
}

// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions
