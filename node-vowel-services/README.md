Require Node, NPM, and Yarn.

Run `yarn` then `yarn protoc` to build the auto-generated protobuf defintions.

`node src/index.js` in a terminal will start the service running, attempting to connect to localhost:8001 for a broker.

TODO: Fix it not to rely on http.createServer(...).listen(...) to keep the node context running