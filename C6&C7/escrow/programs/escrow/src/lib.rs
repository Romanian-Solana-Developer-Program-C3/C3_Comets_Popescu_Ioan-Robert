pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("2jE1LBdRyCJ37Bsf3mzFCH6Sp7YZbzq9onEFopsEcCNg");

#[program]
pub mod escrow {
    use super::*;

    pub fn make_offer(
        ctx: Context<MakeOffer>,
        id: u64,
        token_a_amount: u64,
        wanted_amount_b: u64,
    ) -> Result<()> {
        make_offer::handler(ctx, id, token_a_amount, wanted_amount_b)
    }

    pub fn take_offer(ctx: Context<TakeOffer>) -> Result<()> {
        take_offer::handler(&ctx)
    }
}
