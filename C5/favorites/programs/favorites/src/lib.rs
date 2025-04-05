#![allow(unexpected_cfgs)]  
use anchor_lang::prelude::*;

declare_id!("31eTrr43nYd8CugaZHpkZJNDCTLc85g3Uc7YLspuXg1h");
#[program]
pub mod favorites {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
    pub fn set_favourites(ctx: Context<SetFavourites>, color: String, number: u64, hobbies: Vec<String>) -> Result<()> {
        msg!("Setting favourites!");

        let user_pubkey = ctx.accounts.user.key();

        msg!("Program ID: {}", ctx.program_id);
        msg!("Setting: {}'s favourite number to {} and color to {}",user_pubkey, number, color);
        msg!("Hobbies: {:?}", hobbies);

        ctx.accounts.favourites.set_inner(Favourites {
            color,
            number,
            hobbies,
        });
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct SetFavourites<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        init,
        payer = user,
        seeds = [b"favourites", user.key().as_ref()],
        space = 8 + Favourites::INIT_SPACE, 
        bump
    )]
    pub favourites: Account<'info, Favourites>,
    pub system_program: Program<'info, System>, 
}

#[account]
#[derive(InitSpace)]
pub struct Favourites{
    #[max_len(50)]
    pub color: String,
    pub number: u64,
    #[max_len(5,50)]
    pub hobbies: Vec<String>,
}
