const {
	Flowable,
	Single
} = require('rsocket-flowable');

const {
	ChatServer
} = require('./proto/chat_proteus_pb');

export default function(next) {

	const handler = {
			chat: function(chatEvent, metadata){
				// needs to produce below for the rest of the handling chain
				//{"type":"CHAT_MESSAGE","payload":{"user":{"alias":"asdfasdfasdf","avatar":"https://robohash.org/asdfasdfasdf.png"},"message":"hello"}}
				let message = {type: "CHAT_MESSAGE", payload:{}};
				const user = chatEvent.getUser();
				message.payload.user = {alias: user.getAlias(), avatar: user.getAvatar()};
				message.payload.message = chatEvent.getMessage();

				next({data: JSON.stringify(message)});
			},
			join: function(joinEvent, metadata){
				// needs to produce below for the rest of the handling chain
				// {"type":"USER_JOINED","payload":{"user":{"alias":"gagaga","avatar":"https://robohash.org/gagaga.png"}}}
				let message = {type: "USER_JOINED", payload:{}};
				const user = joinEvent.getUser();
				message.payload.user = {alias: user.getAlias(), avatar: user.getAvatar()};

				next({data: JSON.stringify(message)});
			}
	};

	return new ChatServer(handler);
};
