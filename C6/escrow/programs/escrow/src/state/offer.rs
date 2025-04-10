use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Offer {
    pub offer_id: u64,
    pub offerer: Pubkey,
    pub token_mint_a: Pubkey,
    pub token_mint_b: Pubkey,
    pub wanted_amount_b: u64,
    pub bump: u8,
}
