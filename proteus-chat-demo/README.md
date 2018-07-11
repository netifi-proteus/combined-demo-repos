# proteus-chat-demo

This demo project attempts to show that reactive applications can be implemented entirely in JS, in the browser.

- It begins with a fork of this reactive chat project:
https://github.com/monkey-codes/java-reactive-chat

- Then it rips out the Java part, leaving the "ui" piece
- The critical change is in the "middleware" part of the app
    - In the source project, there is a single "websocket.js" file that sets up the connection
    - For posterity, I've left the "websocket.js" file named such and commented the relevant connection changes
- The application now simply connects to a Netifi broker endpoint and the clients broadcast their chats to each other

## Preparing the Demo

- Ensure you have Yarn, Node, and NPM installed:
    - https://nodejs.org/en/download/
    - https://www.npmjs.com/get-npm
    - https://yarnpkg.com/lang/en/docs/install/

## Running the Demo

- Fork/clone the repo and `cd` to the root directory from a terminal window
- Install the JavaScript dependencies with

    yarn

- The generated code in `src/main/resources/web/public/` should be
  checked in, and can be updated with:

    yarn run build

- To view the app in action, start a web server to host the JS:

    yarn start

- Hit http://localhost:3000 in a webbrowser

- The application is now running your browser and you can either create more browser tabs or get your friends to run these steps also
    - This means you can shut down your local server as the JS is fully loaded into your browser tabs and will continue to work
- Proceed to chat  
