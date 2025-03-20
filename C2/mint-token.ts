import {getOrCreateAssociatedTokenAccount, mintTo} from "@solana/spl-token";
import {clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";
import {getExplorerLink, getKeypairFromEnvironment} from "@solana-developers/helpers";
import "dotenv/config"
const MINT = new PublicKey("AvhqzwfKKAnw3CCNanQFYT2zzRqM4gSzgyL1iGpVwJZj")

async function mintToken(mint:PublicKey, amount:number) {
    console.log("Minting...");
    const connection = new Connection(clusterApiUrl("devnet"))
    const keypair = getKeypairFromEnvironment("SECRET_KEY");
    console.log("Creating token account...");
    const dest = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        keypair.publicKey
    )
    const accountLink = getExplorerLink("address",dest.address.toString(),"devnet");
    console.log("Done token account: " + accountLink);
    console.log("Minting...");
    const mintTx = await mintTo(
        connection,
        keypair,
        mint,
        dest.address,
        keypair.publicKey,
        amount
    )
    const mintLink = getExplorerLink("tx",mintTx,"devnet")
    console.log("Done minting: " + mintLink);
}
mintToken(MINT,5 * 10 ** 9) // mint 5 token