// GENERATED CODE -- DO NOT EDIT!

'use strict';
var proteus_js_frames = require('proteus-js-frames');
var proteus_tracing = require('proteus-js-tracing');
var rsocket_flowable = require('rsocket-flowable');
var chat_pb = require('./chat_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

var ChatClient = function () {
  function ChatClient(rs, tracer) {
    this._rs = rs;
    this._tracer = tracer;
    this.chatTrace = proteus_tracing.traceSingle(tracer, "Chat.chat", {"proteus.service": "io.netifi.proteus.demo.chat.Chat"}, {"proteus.type": "client"});
    this.joinTrace = proteus_tracing.traceSingle(tracer, "Chat.join", {"proteus.service": "io.netifi.proteus.demo.chat.Chat"}, {"proteus.type": "client"});
  }
  ChatClient.prototype.chat = function chat(message, metadata) {
    const map = {};
    this.chatTrace(map)(new rsocket_flowable.Single(function (subscriber) {
      subscriber.onSubscribe();
      subscriber.onComplete();
    })).subscribe({ onSubscribe: function onSubscribe() {}, onComplete: function onComplete() {} });
    var dataBuf = Buffer.from(message.serializeBinary());
    var tracingMetadata = proteus_tracing.mapToBuffer(map);
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.demo.chat.Chat', 'Chat', tracingMetadata, metadata || Buffer.alloc(0));
    this._rs.fireAndForget({
      data: dataBuf,
      metadata: metadataBuf
    });
  };
  ChatClient.prototype.join = function join(message, metadata) {
    const map = {};
    this.joinTrace(map)(new rsocket_flowable.Single(function (subscriber) {
      subscriber.onSubscribe();
      subscriber.onComplete();
    })).subscribe({ onSubscribe: function onSubscribe() {}, onComplete: function onComplete() {} });
    var dataBuf = Buffer.from(message.serializeBinary());
    var tracingMetadata = proteus_tracing.mapToBuffer(map);
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.demo.chat.Chat', 'Join', tracingMetadata, metadata || Buffer.alloc(0));
    this._rs.fireAndForget({
      data: dataBuf,
      metadata: metadataBuf
    });
  };
  return ChatClient;
}();

exports.ChatClient = ChatClient;

var ChatServer = function () {
  function ChatServer(service, tracer) {
    this._service = service;
    this._tracer = tracer;
    this.chatTrace = proteus_tracing.traceSingleAsChild(tracer, "Chat.chat", {"proteus.service": "io.netifi.proteus.demo.chat.Chat"}, {"proteus.type": "server"});
    this.joinTrace = proteus_tracing.traceSingleAsChild(tracer, "Chat.join", {"proteus.service": "io.netifi.proteus.demo.chat.Chat"}, {"proteus.type": "server"});
  }
  ChatServer.prototype.fireAndForget = function fireAndForget(payload) {
    if (payload.metadata == null) {
      throw new Error('metadata is empty');
    }
    var method = proteus_js_frames.getMethod(payload.metadata);
    var spanContext = proteus_tracing.deserializeTraceData(this._tracer, payload.metadata);
    switch (method) {
      case 'Chat':
        this.chatTrace(spanContext)(new rsocket_flowable.Single(function (subscriber) {
          subscriber.onSubscribe();
          subscriber.onComplete();
          })).subscribe({ onSubscribe: function onSubscribe() {}, onComplete: function onComplete() {} });
        this._service.chat(chat_pb.ChatEvent.deserializeBinary(payload.data), payload.metadata)
        break;
      case 'Join':
        this.joinTrace(spanContext)(new rsocket_flowable.Single(function (subscriber) {
          subscriber.onSubscribe();
          subscriber.onComplete();
          })).subscribe({ onSubscribe: function onSubscribe() {}, onComplete: function onComplete() {} });
        this._service.join(chat_pb.JoinEvent.deserializeBinary(payload.data), payload.metadata)
        break;
      default:
        throw new Error('unknown method');
    }
  };
  ChatServer.prototype.requestResponse = function requestResponse(payload) {
    return rsocket_flowable.Single.error(new Error('requestResponse() is not implemented'));
  };
  ChatServer.prototype.requestStream = function requestStream(payload) {
    return rsocket_flowable.Flowable.error(new Error('requestStream() is not implemented'));
  };
  ChatServer.prototype.requestChannel = function requestChannel(payload) {
    return rsocket_flowable.Flowable.error(new Error('requestChannel() is not implemented'));
  };
  ChatServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return ChatServer;
}();

exports.ChatServer = ChatServer;

