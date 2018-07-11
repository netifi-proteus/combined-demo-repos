const http = require('http');

const {BufferEncoders} = require('rsocket-core');
const RSocketTcpClient = require('rsocket-tcp-client').default;

const {
    RandomStringResponse
} = require('./proteus/random_string_pb');

const {
    RandomStringGeneratorServer
} = require('./proteus/random_string_proteus_pb');


const {Proteus} = require('proteus-js-client');

const {Flowable} = require('rsocket-flowable');

const chars =
    "abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const generateChar = () => chars[Math.floor(Math.random() * chars.length)];

const localStringGenerator = {
    generateString: (message, metadata) => {
        try{
            const min = message.getMin();
            const max = message.getMax();
            const count = Math.floor(Math.random() * max) + min;
            let values = [];
            for(var i = 0; i < count; i++){
                const size = Math.floor(Math.random() * 100);
                let nextWord = "";
                for(var j = 0; j < size; j++){
                    nextWord += generateChar();
                }
                values.push(nextWord);
            }

            return new Flowable(subscriber => {
                let cancelled = false;
                let i = 0;
                subscriber.onSubscribe({
                    cancel: () => {
                        cancelled = true;
                    },
                    request: n => {
                        try{
                            console.log("Consumer is requesting " + n + " and I am canceled? " + cancelled);
                            while (!cancelled && n > 0 && i < values.length) {
                                const str = values[i++];
                                const resp = new RandomStringResponse();
                                resp.setGenerated(str);
                                console.log("Emitting:" + JSON.stringify(resp.toObject()));
                                const data = resp.serializeBinary();
                                console.log("Binary is serialized");
                                subscriber.onNext({
                                    data: Buffer.from(data),
                                    metadata: Buffer.alloc(0)
                                });
                                n--;
                            }
                            if (!cancelled && i == values.length) {
                                console.log("Done!");
                                subscriber.onComplete();
                            }
                        } catch (err) {
                            console.log("Error while onNexting:" + err);
                            subscriber.onError(err);
                        }
                    },
                });
            });
        } catch (error){
            console.log("An error occurred:" + error);
            return Flowable.error(error);
        }

    }
}


let brokerHost = process.argv[2];
let brokerPort = process.argv[3];


if(!brokerHost){
    brokerHost = "localhost";
}

if(!brokerPort){
    brokerPort = 8001
}
// This Proteus object acts as our gateway to both send messages to services and to register services that we support
const tcpConnection = new RSocketTcpClient(
    {host: brokerHost, port: brokerPort},
    BufferEncoders);

const randomStringProteus = Proteus.create({
    setup: {
        group: 'fanout.randomStringGenerator',
        accessKey: 9007199254740991,
        accessToken: 'kTBDVtfRBO4tHOnZzSyY5ym2kfY=',
    },
    transport: {
        connection: tcpConnection
    },
});
randomStringProteus.addService('io.netifi.proteus.fanout.randomstring.RandomStringGenerator',
    new RandomStringGeneratorServer(localStringGenerator));
randomStringProteus._connect();

//Just to keep a command-line invocation open - TODO: figure out how to support this functionality directly
http.createServer(function (req, res) {
    res.write('Shhhh, I\'m generating strings'); //write a response to the client
    res.end(); //end the response
}).listen(9091);