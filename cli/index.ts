import web3 = require('@solana/web3.js');
import BN = require('bn.js');

//Using the Quicknode's URL to connect as default connection to solana's public nodes were disconnecting
//web-sockets which made to restart the logs (solana logs <PROGRAM_ID>) everytime when there's a change
//in the typescript application.


const WSS_ENDPOINT = <QUICKNODE_WSS_ENDPOINT>;
const HTTP_ENDPOINT = <QUICKNODE_HTTP_ENDPOINT>;

const programId = new web3.PublicKey("9pKjPqbBvve7xWju8JkR9CWtEBnLWnyqBV8DcF3FPqLL");
const connection =new web3.Connection(HTTP_ENDPOINT, {wsEndpoint:WSS_ENDPOINT});
const key: Uint8Array = Uint8Array.from([140,198,89,235,238,62,165,187,107,96,87,237,138,36,224,207,77,216,204,194,3,215,18,32,249,236,214,175,95,142,127,181,87,245,118,217,135,130,102,151,191,0,217,74,219,82,108,41,153,162,32,171,238,90,242,184,116,197,136,222,92,25,137,124]);

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