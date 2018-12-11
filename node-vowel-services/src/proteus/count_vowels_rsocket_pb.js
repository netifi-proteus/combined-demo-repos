// GENERATED CODE -- DO NOT EDIT!

'use strict';
var rsocket_rpc_frames = require('rsocket-rpc-frames');
var rsocket_rpc_core = require('rsocket-rpc-core');
var rsocket_rpc_tracing = require('rsocket-rpc-tracing');
var rsocket_rpc_metrics = require('rsocket-rpc-metrics').Metrics;
var rsocket_flowable = require('rsocket-flowable');
var proteus_count_vowels_pb = require('../proteus/count_vowels_pb.js');

var VowelCounterClient = function () {
  function VowelCounterClient(rs, tracer, meterRegistry) {
    this._rs = rs;
    this._tracer = tracer;
    this.countVowelsTrace = rsocket_rpc_tracing.traceSingle(tracer, "VowelCounter", {"rsocket.rpc.service": "io.netifi.proteus.fanout.countvowels.VowelCounter"}, {"method": "countVowels"}, {"rsocket.rpc.role": "client"});
    this.countVowelsMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "VowelCounter", {"service": "io.netifi.proteus.fanout.countvowels.VowelCounter"}, {"method": "countVowels"}, {"role": "client"});
  }
  // Returns a Hello World Message
  VowelCounterClient.prototype.countVowels = function countVowels(message, metadata) {
    const map = {};
    return this.countVowelsMetrics(
      this.countVowelsTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.fanout.countvowels.VowelCounter', 'CountVowels', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_count_vowels_pb.CountResponse.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  return VowelCounterClient;
}();

exports.VowelCounterClient = VowelCounterClient;

var VowelCounterServer = function () {
  function VowelCounterServer(service, tracer, meterRegistry) {
    this._service = service;
    this._tracer = tracer;
    this.countVowelsTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "VowelCounter", {"rsocket.rpc.service": "io.netifi.proteus.fanout.countvowels.VowelCounter"}, {"method": "countVowels"}, {"rsocket.rpc.role": "server"});
    this.countVowelsMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "VowelCounter", {"service": "io.netifi.proteus.fanout.countvowels.VowelCounter"}, {"method": "countVowels"}, {"role": "server"});
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
  VowelCounterServer.prototype.fireAndForget = function fireAndForget(payload) {
    throw new Error('fireAndForget() is not implemented');
  };
  VowelCounterServer.prototype.requestResponse = function requestResponse(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Single.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'CountVowels':
          return this.countVowelsMetrics(
            this.countVowelsTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .countVowels(proteus_count_vowels_pb.CountRequest.deserializeBinary(binary), payload.metadata)
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
  VowelCounterServer.prototype.requestStream = function requestStream(payload) {
    return rsocket_flowable.Flowable.error(new Error('requestStream() is not implemented'));
  };
  VowelCounterServer.prototype.requestChannel = function requestChannel(payloads) {
    return new rsocket_flowable.Flowable(s => payloads.subscribe(s)).lift(s =>
      new rsocket_rpc_core.SwitchTransformOperator(s, (payload, flowable) => this._channelSwitch(payload, flowable)),
    );
  };
  VowelCounterServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return VowelCounterServer;
}();

exports.VowelCounterServer = VowelCounterServer;

