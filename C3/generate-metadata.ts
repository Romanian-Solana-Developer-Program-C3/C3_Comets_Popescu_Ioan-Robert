import {createUmi} from "@metaplex-foundation/umi-bundle-defaults";
import {clusterApiUrl} from "@solana/web3.js";
import {irysUploader} from "@metaplex-foundation/umi-uploader-irys";
import {createSignerFromKeypair, signerIdentity} from "@metaplex-foundation/umi";
import {getKeypairFromEnvironment} from "@solana-developers/helpers";

import "dotenv/config"

const umi = createUmi(clusterApiUrl("devnet"))

const kp = getKeypairFromEnvironment("SECRET_KEY")
const keypair = umi.eddsa.createKeypairFromSecretKey(kp.secretKey)
const signer = createSignerFromKeypair(umi, keypair)


umi.use(irysUploader())
umi.use(signerIdentity(signer))

const IMG_URI = "https://gateway.irys.xyz/B74gnt2jKkNTR6UhaccTyKcTgq5abA86Bo1WLANgBY7D"
export async function createMetadata() {
    try {
        console.log("Creating metadata...")
        const metadata = {
            name: "Romanian Alert",
            symbol: "RO_Alert",
            description: "Romanian emergency system that alerts people over Cell Broadcast",
            image: IMG_URI,
            attributes: [
                {trait_type: "Release date", value: "5.10.2017"},
                {trait_type: "Communication Type", value: "Cell Broadcast"},
                {trait_type: "Emergency Types", value: "Extreme Weather, Flooding, Tero-Attack, etc."},
            ],
            properties: {
                files: [
                    { 
                        uri: IMG_URI, 
                        type: "image/png"
                    }
                ],
                category: "image"
            },
        };
        console.log("Attempting upload...")
        const metadataLink = await umi.uploader.uploadJson(metadata).catch((err) => {
            throw new Error(err)
        })

        console.log("Done: " + metadataLink)
    } catch (e) {
        console.log("Error during uploading: " + e)
    }
}
createMetadata();