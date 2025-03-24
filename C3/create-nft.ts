import {createNft, mplTokenMetadata} from "@metaplex-foundation/mpl-token-metadata";
import {createUmi} from "@metaplex-foundation/umi-bundle-defaults";
import {clusterApiUrl} from "@solana/web3.js";
import {createSignerFromKeypair, generateSigner, percentAmount, signerIdentity} from "@metaplex-foundation/umi";
import {getExplorerLink, getKeypairFromEnvironment} from "@solana-developers/helpers";
import "dotenv/config"
import { base58 } from "@metaplex-foundation/umi/serializers";

const umi = createUmi(clusterApiUrl("devnet"))

const kp = getKeypairFromEnvironment("SECRET_KEY")
const keypair = umi.eddsa.createKeypairFromSecretKey(kp.secretKey)
const signer = createSignerFromKeypair(umi, keypair)

umi.use(mplTokenMetadata())
umi.use(signerIdentity(signer))

const METADATA_URI = "https://gateway.irys.xyz/7S8S81vwV26xfVX7ZAtvuY5ej2XY32WYKtzpYg7LUfPd"

async function generateNFT()
{
    try{
        console.log("Generating signer...")
        const nftSigner = generateSigner(umi)
        console.log("Creating transaction block...")
        const nftTx = createNft(umi,{
            name: "Romanian Alert",
            mint: nftSigner,
            sellerFeeBasisPoints: percentAmount(100),
            uri: METADATA_URI,
            authority: signer,
            isCollection: false,
        })
        console.log("Sending transaction...")
        let transaction = await nftTx.sendAndConfirm(umi)
        console.log("Getting signature...")
        const signature = base58.deserialize(transaction.signature)[0]
        console.log("Getting link...")
        const link = getExplorerLink("transaction",signature,"devnet")
        console.log("Done! Signature link: " + link)
    }catch (e) {
        console.log("Error occured: " + e)
    }

}
generateNFT();