const { Worker, isMainThread } = require("worker_threads");
const zmq = require("zeromq");

if (isMainThread)
{
    const lWorker = new Worker(__filename);
    lWorker.on("exit", () => console.log(`Worker exited`));
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
