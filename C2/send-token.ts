import {clusterApiUrl, Connection, PublicKey, sendAndConfirmTransaction, Transaction} from "@solana/web3.js";
import {getExplorerLink, getKeypairFromEnvironment} from "@solana-developers/helpers";
import "dotenv/config"
import {createTransferInstruction, getOrCreateAssociatedTokenAccount} from "@solana/spl-token";
const keypair = getKeypairFromEnvironment("SECRET_KEY");
const keypair2 = getKeypairFromEnvironment("SECRET_KEY_2");

const sender = new PublicKey(keypair.publicKey);
const receiver = new PublicKey(keypair2.publicKey);
const MINT = new PublicKey("AvhqzwfKKAnw3CCNanQFYT2zzRqM4gSzgyL1iGpVwJZj");
const amount = 1;

async function sendToken(src: PublicKey, dest: PublicKey, mint:PublicKey, amount:number) {
    console.log(`Started sending ${amount / 10 ** 9} tokens...`);
    const connection = new Connection(clusterApiUrl("devnet"));
    src = keypair.publicKey;
    console.log("Finding sender token address...");
    const senderTokenAddress = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        src
    );
    const senderAddressLink = getExplorerLink("address",senderTokenAddress.address.toString(),"devnet");
    console.log("Sender Token Address: " + senderAddressLink);
    console.log("Finding reciever token address...");
    const destTokenAddress = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        dest
    );
    const destAddressLink = getExplorerLink("address",destTokenAddress.address.toString(),"devnet");
    console.log("Receiver Token Address: " + destAddressLink);
    console.log("Attempting transaction...");
    try
    {
        console.log("Creating transaction data...");
        const transactionData = createTransferInstruction(
            senderTokenAddress.address,
            destTokenAddress.address,
            src,
            amount
        );
        console.log("Creating transaction block...");
        const transactionBlock = new Transaction().add(
            transactionData
        );
        console.log("Signing the transaction...")
        const sig = await sendAndConfirmTransaction(
            connection,
            transactionBlock,
            [keypair]
        )
        const sigLink = getExplorerLink("transaction",sig,"devnet")
        console.log("Transaction sent: " + sigLink)
        return true;
    }catch (e) {
        console.log("Error while sending transaction: " + e)
        return false;
    }
}
sendToken(sender,receiver,MINT,amount * 10 ** 9);