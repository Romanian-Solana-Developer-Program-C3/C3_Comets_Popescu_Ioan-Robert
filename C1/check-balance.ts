import "dotenv/config"

import {Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl} from "@solana/web3.js";

import {Keypair} from "@solana/web3.js";
import {getKeypairFromEnvironment} from "@solana-developers/helpers";

const keypair = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"));

// @ts-ignore
const balance = await connection.getBalance(keypair.publicKey);

// Convert Lamports > Solana
const balanceConvert = balance/1000000000

console.log(`${keypair.publicKey.toString()} has ${balanceConvert} SOL`);


// Airdropped with : https://faucet.solana.com/