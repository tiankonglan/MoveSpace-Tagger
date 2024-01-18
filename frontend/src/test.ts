import { AptosAccount, AptosAccountObject } from "aptos";

const aptosAccountObject: AptosAccountObject = {
  address: "0x4139eaf9a8f1ee32431e6d33876a8a4243be4b0d7fbf76f0cb0315ec92452369",
  privateKeyHex:
    // eslint-disable-next-line max-len
    "0x7287f23bac5d20a081aef1e2e66769c146944e485b19724a61c5788a0b3b3c22",
  publicKeyHex: "0x09b3d965cd69f49ad7fa68dd7e6669e8fe0c0b69de3238c393961e8c2e1511ac",
};

(async () => {
  const alice = AptosAccount.fromAptosAccountObject(aptosAccountObject);

  //   const alice = new AptosAccount();

  // Print out account addresses.
  console.log("=== Addresses ===");
  console.log(`Alice: ${alice.address()}`);

  const msg = "62485469.1.4139eaf9a8f1ee32431e6d33876a8a4243be4b0d7fbf76f0cb0315ec92452369.2.nonce_geek";
  //   const msg = "Hello Aptos!";
  // const msg = "3425.1.nonce_geek";
  // const msg = "0.1.0000000000000000000000000000000000000000000000000000000000000123.1.nonce_geek";

  const textEncoder = new TextEncoder();
  const styBytes = textEncoder.encode(msg);

  console.log("Alice pubkey -------- ", alice.pubKey());

  const signature = alice.signBuffer(styBytes);
  console.log("signature -------- ", signature);

})();
