const http = require('http');

const {BufferEncoders} = require('rsocket-core');
const RSocketTcpClient = require('rsocket-tcp-client').default;

const {
    VowelCounterServer
} =  require('./proteus/count_vowels_proteus_pb');

const {
    CountResponse
} =  require('./proteus/count_vowels_pb');

const {Single} = require('rsocket-flowable');

const {Proteus} = require('proteus-js-client');

//If we get called to classify something as a vowel, this is our logic:
const localIsVowelService = {
    isVowel: function(target){

        return (target &&
                (target === "a" ||
                    target === "e" ||
                    target === "i" ||
                    target === "o" ||
                    target === "u" ||
                    target === "A" ||
                    target === "E" ||
                    target === "I" ||
                    target === "O" ||
                    target === "U"));
    }
};

const localVowelCounterService = function() {
    return {
        countVowels : (message, metadata) => {
            console.log("Received:" + JSON.stringify(message.toObject()));
            const target = message.getTarget();
            let latches = target.length;
            console.log("Counting vowels in " + target);
            let count = 0;
            let _done = false;
            return new Single(subscriber => {
                target.split('').forEach(c => {
                    if (localIsVowelService.isVowel(c)) {
                        count++;
                    }
                });
                let resp = new CountResponse();
                resp.setCount(count);
                subscriber.onSubscribe();
                console.log("Found " + count + " vowels in " + target);
                subscriber.onComplete({
                    data: Buffer.from(resp.serializeBinary()),
                    metadata: Buffer.alloc(0)
                });
            });

        }
    };
};


let brokerHost = process.argv[2];
let brokerPort = process.argv[3];


if(!brokerHost){
    brokerHost = "localhost";
}

if(!brokerPort){
    brokerPort = 8001
}
// This Proteus object acts as our gateway to both send messages to services and to register services that we support
const vowelCountConnection = new RSocketTcpClient(
    {host: brokerHost, port: brokerPort},
    BufferEncoders);

const vowelCounterProteus = Proteus.create({
    setup: {
        group: 'fanout.vowelcounter',
        accessKey: 9007199254740991,
        accessToken: 'kTBDVtfRBO4tHOnZzSyY5ym2kfY=',
    },
    transport: {
        connection: vowelCountConnection
    },
});
vowelCounterProteus.addService('io.netifi.proteus.fanout.countvowels.VowelCounter',
    new VowelCounterServer(localVowelCounterService()));
vowelCounterProteus._connect();

http.createServer(function (req, res) {
    res.write('Shhhh, I\'m counting vowels'); //write a response to the client
    res.end(); //end the response
}).listen(9090);