import web3 = require('@solana/web3.js');
import BN = require('bn.js');

//Using the Quicknode's URL to connect as default connection to solana's public nodes were disconnecting
//web-sockets which made to restart the logs (solana logs <PROGRAM_ID>) everytime when there's a change
//in the typescript application.


const WSS_ENDPOINT = <QUICKNODE_WSS_ENDPOINT>;
const HTTP_ENDPOINT = <QUICKNODE_HTTP_ENDPOINT>;

const programId = new web3.PublicKey(<PROGRAM_ID>);
const connection =new web3.Connection(HTTP_ENDPOINT, {wsEndpoint:WSS_ENDPOINT});
const key: Uint8Array = Uint8Array.from(<PRIVATE_KEY>);

async function main(){
    //to get balance of an account using the private key
    const signer: web3.Keypair = web3.Keypair.fromSecretKey(key);
    await connection.getBalance(signer.publicKey).then((balance) => {
        console.log("Balance in your account: ", balance/web3.LAMPORTS_PER_SOL ,"SOL");
    })
    // const data: Buffer = Buffer.from(
    //     Uint8Array.of(0, ...new BN(4).toArray("le", 21)));
    const data: Buffer = Buffer.of(1);

    //creating a transaction 
    const transaction = new web3.Transaction().add(
        new web3.TransactionInstruction({
            keys: [],
            programId, 
            data,
        })
    );

    await web3.sendAndConfirmTransaction(connection, transaction, [signer])
        .then((sig) => {
            console.log("Signature of the transaction: ", sig);
        })
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
