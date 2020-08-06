const cluster = require("cluster");
const zmq = require("zeromq");

if (cluster.isMaster)
{
    cluster.fork();
    cluster.on(
        "exit",
        (worker, code) =>
        {
            console.log(`Worker ${worker.process.id} exited with code ${code}`)
        },
    );
}
else
{
    const lAddress = "tcp://127.0.0.1:3102";
    const lDealer = new zmq.Dealer;

    console.log("Connecting dealer to:", lAddress)
    lDealer.connect(lAddress);

    async function main()
    {
        for await (const [nonce, msg] of lDealer)
        {
            console.log(nonce.toString());
            console.log(msg.toString());
        }
    }
    main();

    setTimeout(() =>
    {
        console.log("Trying to exit...");
        process.exit(0);
    }, 1000);
}
