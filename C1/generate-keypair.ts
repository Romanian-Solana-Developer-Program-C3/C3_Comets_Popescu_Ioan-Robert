import {Keypair} from "@solana/web3.js";

const keypair = Keypair.generate();

console.log("Keypair generated successfully");
console.log("Public key: " + keypair.publicKey.toString());
console.log("Secret key: " + keypair.secretKey);