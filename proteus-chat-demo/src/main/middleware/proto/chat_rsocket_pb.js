// GENERATED CODE -- DO NOT EDIT!

'use strict';
var rsocket_rpc_frames = require('rsocket-rpc-frames');
var rsocket_rpc_core = require('rsocket-rpc-core');
var rsocket_rpc_tracing = require('rsocket-rpc-tracing');
var rsocket_rpc_metrics = require('rsocket-rpc-metrics').Metrics;
var rsocket_flowable = require('rsocket-flowable');
var chat_pb = require('./chat_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

var ChatClient = function () {
  function ChatClient(rs, tracer, meterRegistry) {
    this._rs = rs;
    this._tracer = tracer;
    this.chatTrace = rsocket_rpc_tracing.traceSingle(tracer, "Chat", {"rsocket.rpc.service": "io.netifi.proteus.demo.chat.Chat"}, {"method": "chat"}, {"rsocket.rpc.role": "client"});
    this.chatMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "Chat", {"service": "io.netifi.proteus.demo.chat.Chat"}, {"method": "chat"}, {"role": "client"});
    this.joinTrace = rsocket_rpc_tracing.traceSingle(tracer, "Chat", {"rsocket.rpc.service": "io.netifi.proteus.demo.chat.Chat"}, {"method": "join"}, {"rsocket.rpc.role": "client"});
    this.joinMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "Chat", {"service": "io.netifi.proteus.demo.chat.Chat"}, {"method": "join"}, {"role": "client"});
  }
  ChatClient.prototype.chat = function chat(message, metadata) {
    const map = {};
    return this.chatMetrics(
      this.chatTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.demo.chat.Chat', 'Chat', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return google_protobuf_empty_pb.Empty.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  ChatClient.prototype.join = function join(message, metadata) {
    const map = {};
    return this.joinMetrics(
      this.joinTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.demo.chat.Chat', 'Join', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return google_protobuf_empty_pb.Empty.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  return ChatClient;
}();

exports.ChatClient = ChatClient;

var ChatServer = function () {
  function ChatServer(service, tracer, meterRegistry) {
    this._service = service;
    this._tracer = tracer;
    this.chatTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "Chat", {"rsocket.rpc.service": "io.netifi.proteus.demo.chat.Chat"}, {"method": "chat"}, {"rsocket.rpc.role": "server"});
    this.chatMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "Chat", {"service": "io.netifi.proteus.demo.chat.Chat"}, {"method": "chat"}, {"role": "server"});
    this.joinTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "Chat", {"rsocket.rpc.service": "io.netifi.proteus.demo.chat.Chat"}, {"method": "join"}, {"rsocket.rpc.role": "server"});
    this.joinMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "Chat", {"service": "io.netifi.proteus.demo.chat.Chat"}, {"method": "join"}, {"role": "server"});
    this._channelSwitch = (payload, restOfMessages) => {
      if (payload.metadata == null) {
        return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      let deserializedMessages;
      switch(method){
        default:
          return rsocket_flowable.Flowable.error(new Error('unknown method'));
      }
    };
  }
  ChatServer.prototype.fireAndForget = function fireAndForget(payload) {
    throw new Error('fireAndForget() is not implemented');
  };
  ChatServer.prototype.requestResponse = function requestResponse(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Single.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'Chat':
          return this.chatMetrics(
            this.chatTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .chat(chat_pb.ChatEvent.deserializeBinary(binary), payload.metadata)
                .map(function (message) {
                  return {
                    data: Buffer.from(message.serializeBinary()),
                    metadata: Buffer.alloc(0)
                  }
                }).subscribe(subscriber);
              }
            )
          )
        );
        case 'Join':
          return this.joinMetrics(
            this.joinTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .join(chat_pb.JoinEvent.deserializeBinary(binary), payload.metadata)
                .map(function (message) {
                  return {
                    data: Buffer.from(message.serializeBinary()),
                    metadata: Buffer.alloc(0)
                  }
                }).subscribe(subscriber);
              }
            )
          )
        );
        default:
          return rsocket_flowable.Single.error(new Error('unknown method'));
      }
    } catch (error) {
      return rsocket_flowable.Single.error(error);
    }
  };
  ChatServer.prototype.requestStream = function requestStream(payload) {
    return rsocket_flowable.Flowable.error(new Error('requestStream() is not implemented'));
  };
  ChatServer.prototype.requestChannel = function requestChannel(payloads) {
    return new rsocket_flowable.Flowable(s => payloads.subscribe(s)).lift(s =>
      new rsocket_rpc_core.SwitchTransformOperator(s, (payload, flowable) => this._channelSwitch(payload, flowable)),
    );
  };
  ChatServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return ChatServer;
}();

exports.ChatServer = ChatServer;

