import {
    clusterApiUrl,
    Connection,
    PublicKey,
    sendAndConfirmTransaction,
    SystemProgram,
    Transaction
} from "@solana/web3.js";
import {getExplorerLink, getKeypairFromEnvironment} from "@solana-developers/helpers";
import "dotenv/config"
const keypair = getKeypairFromEnvironment("SECRET_KEY");
const keypair2 = getKeypairFromEnvironment("SECRET_KEY_2");
const amount = 1;

async function sendLamports(sender: PublicKey, receiver: PublicKey, lamports: number) {
    console.log(`Sending ${lamports/10 ** 9} lamports from ${sender.toString()} to ${receiver.toString()}`)
    const connection = new Connection(clusterApiUrl('devnet'));
    try
    {
        console.log("Attempting transaction...");
        const transactionData = SystemProgram.transfer({
                fromPubkey: sender,
                toPubkey: receiver,
                lamports: lamports
            }
        );
        const transaction = new Transaction().add(
            transactionData
        );
        console.log("Signing transaction...")
        const sig = await sendAndConfirmTransaction(
            connection,
            transaction,
            [keypair]
        )
        const siglink = getExplorerLink("transaction", sig, "devnet");
        console.log(`Transaction done! ${siglink}`);
        return true;
    }catch(e)
    {
        console.log("Error during transaction!" + e);
        return false;
    }
}
sendLamports(keypair.publicKey, keypair2.publicKey, amount * 10 ** 9);