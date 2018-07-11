const {
	ChatClient
} = require('./proto/chat_proteus_pb');

const {
	ChatEvent,
	JoinEvent,
	User
} = require('./proto/chat_pb');

function createClient(proteusGateway) {

		//Gets a handle to a ReactiveSocket, targeting the group set up in this ProteusGateway config, and broadcasts to it
		const rs = proteusGateway.broadcast(proteusGateway.myGroup());
		const client = new ChatClient(rs);
		return {
			sendMessage: function sendMessage(userMessage) {
				console.log("Attempting to send:" + JSON.stringify(userMessage));

				const user = new User();
				user.setAlias(userMessage.payload.user.alias);
				user.setAvatar(userMessage.payload.user.avatar);

				const msg = new ChatEvent();
				msg.setUser(user);
				msg.setMessage(userMessage.payload.message);

				client.chat(msg, Buffer.alloc(0));
			},

			join: function join(joinEvent){
				console.log("Attempting to send:" + JSON.stringify(joinEvent));

				const user = new User();
				user.setAlias(joinEvent.payload.user.alias);
				user.setAvatar(joinEvent.payload.user.avatar);

				const evt = new JoinEvent();
				evt.setUser(user);

				client.join(evt, Buffer.alloc(0));
			}
		};
}

export default createClient;
