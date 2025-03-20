import {createMint} from "@solana/spl-token";
import {clusterApiUrl, Connection} from "@solana/web3.js"
import {getExplorerLink, getKeypairFromEnvironment} from "@solana-developers/helpers";
import "dotenv/config"

async function createTokenMint() {
    console.log("Creating token...");
    const connection = new Connection(clusterApiUrl("devnet"))
    const keypair = getKeypairFromEnvironment("SECRET_KEY")
    const res = await createMint(connection,keypair,keypair.publicKey,null,9)
    const link = getExplorerLink("address",res.toString(),"devnet")
    console.log("Done: " + link);
}
createTokenMint();