import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Favorites } from "../target/types/favorites";
import {assert} from "chai";
const web3 = anchor.web3;

describe("favorites", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const user = (provider.wallet as anchor.Wallet).payer;
  const program = anchor.workspace.Favorites as Program<Favorites>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });

  it("Save a user's favourites", async () => {
    const favouriteColor = "aqua";
    const favouriteNumber = new anchor.BN(10);
    const favouriteHobbies = ["gaming","lego","programming"];

    await program.methods
          .setFavourites(favouriteColor,favouriteNumber,favouriteHobbies)
          .signers([user])
          .rpc();

    const favoritesPdaAndBump = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("favourites"), user.publicKey.toBuffer()],
      program.programId
    );
    const favouritesPda = favoritesPdaAndBump[0];
    const dataFromPda = await program.account.favourites.fetch(favouritesPda);
    assert.equal(dataFromPda.color, favouriteColor);
    assert.equal(dataFromPda.number.toNumber(), favouriteNumber.toNumber());
    assert.deepEqual(dataFromPda.hobbies, favouriteHobbies);
  })

  it("Don't let other change your favorites", async () => {
    const randomGuy = anchor.web3.Keypair.generate();
    try{
      await program.methods
            .setFavourites("asd",new anchor.BN(500),["bad guy"])
            .signers([randomGuy])
            .rpc();
    } catch(error){
      const errorMessage = (error as Error).message;
      assert.isTrue(errorMessage.includes("unknown signer"))
    }
  });
});
