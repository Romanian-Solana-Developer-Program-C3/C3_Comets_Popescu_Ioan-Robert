import {createGenericFile, createSignerFromKeypair, signerIdentity} from "@metaplex-foundation/umi";
import {readFile} from "fs/promises";
import {createUmi} from "@metaplex-foundation/umi-bundle-defaults";
import {clusterApiUrl} from "@solana/web3.js";
import {irysUploader} from "@metaplex-foundation/umi-uploader-irys";
import {getKeypairFromEnvironment} from "@solana-developers/helpers";
import "dotenv/config"
import * as fs from "node:fs";
import * as path from "node:path";

const umi = createUmi(clusterApiUrl("devnet"))
const kp = getKeypairFromEnvironment("SECRET_KEY")

const keypair = umi.eddsa.createKeypairFromSecretKey(kp.secretKey)
const signer = createSignerFromKeypair(umi, keypair)

umi.use(irysUploader({
    address: "https://devnet.irys.xyz",
}))
umi.use(signerIdentity(signer))

export async function uploadImage()
{
    try{
        console.log("Creating image...");
        const imageFile =  await fs.readFileSync(
            path.join(__dirname, '/image.png')
        )
        const img = createGenericFile(imageFile,"image.png", {
            tags: [{ name: 'Content-Type', value: 'image/png' }],
        })
        
        console.log("Attempting upload...")
        const imgLink = await umi.uploader.upload([img])
        console.log("Done: " + imgLink[0]);
    }catch (e) {
        console.log("Found error: " + e);
    }

}
uploadImage();