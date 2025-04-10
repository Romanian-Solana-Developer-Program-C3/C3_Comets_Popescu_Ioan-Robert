use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{transfer_checked, TokenAccount, TransferChecked},
    token_interface::{Mint, TokenInterface},
};
use crate::Offer;
pub fn handler(ctx: &Context<TakeOffer>) -> Result<()> {
    valut_to_taker(ctx)?;
    send_to_maker(ctx)?;
    Ok(())
}
pub fn send_to_maker(ctx: &Context<TakeOffer>) -> Result<()> {
    let transfer_accounts = TransferChecked {
        from: ctx.accounts.taker_token_account_b.to_account_info(),
        to: ctx.accounts.maker_token_account.to_account_info(),
        mint: ctx.accounts.token_mint_b.to_account_info(),
        authority: ctx.accounts.taker.to_account_info(),
    };
    let cpi_context = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        transfer_accounts,
    );
    transfer_checked(
        cpi_context,
        ctx.accounts.taker_token_account_b.amount,
        ctx.accounts.token_mint_b.decimals,
    )?;
    Ok(())
}

pub fn valut_to_taker(ctx: &Context<TakeOffer>) -> Result<()> {
    let transfer_accounts = TransferChecked {
        from: ctx.accounts.vault.to_account_info(),
        to: ctx.accounts.taker_token_account_a.to_account_info(),
        mint: ctx.accounts.token_mint_a.to_account_info(),
        authority: ctx.accounts.offer.to_account_info(),
    };
    let cpi_context = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        transfer_accounts,
    );
    transfer_checked(
        cpi_context,
        ctx.accounts.vault.amount,
        ctx.accounts.token_mint_a.decimals,
    )?;
    Ok(())
}

#[derive(Accounts)]
pub struct TakeOffer<'info> {
    #[account(mut)]
    pub taker: Signer<'info>,
    #[account(mut)]
    pub maker: Signer<'info>,

    pub token_mint_a: InterfaceAccount<'info, Mint>,
    pub token_mint_b: InterfaceAccount<'info, Mint>,

    #[account(
        init_if_needed,
        payer = taker,
        associated_token::mint = token_mint_a,
        associated_token::authority = taker,
        associated_token::token_program = token_program,
    )]
    pub taker_token_account_a: Account<'info, TokenAccount>,
    #[account(
        mut,        
        associated_token::mint = token_mint_b,
        associated_token::authority = taker,
        associated_token::token_program = token_program,
    )]
    pub taker_token_account_b: Account<'info, TokenAccount>,
    #[account(
        init_if_needed,
        payer = maker,
        associated_token::mint = token_mint_b,
        associated_token::authority = maker,
        associated_token::token_program = token_program,
    )]
    pub maker_token_account: Account<'info, TokenAccount>,

    pub vault: Account<'info, TokenAccount>,
    pub offer: Account<'info, Offer>,

    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}
