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
    setTimeout(() =>
    {
        console.log("Trying to exit...");
        process.exitCode = 0;
    }, 1000);
}
