// GENERATED CODE -- DO NOT EDIT!

'use strict';
var rsocket_rpc_frames = require('rsocket-rpc-frames');
var rsocket_rpc_core = require('rsocket-rpc-core');
var rsocket_rpc_tracing = require('rsocket-rpc-tracing');
var rsocket_rpc_metrics = require('rsocket-rpc-metrics').Metrics;
var rsocket_flowable = require('rsocket-flowable');
var proteus_random_string_pb = require('../proteus/random_string_pb.js');

var RandomStringGeneratorClient = function () {
  function RandomStringGeneratorClient(rs, tracer, meterRegistry) {
    this._rs = rs;
    this._tracer = tracer;
    this.generateStringTrace = rsocket_rpc_tracing.trace(tracer, "RandomStringGenerator", {"rsocket.rpc.service": "io.netifi.proteus.fanout.randomstring.RandomStringGenerator"}, {"method": "generateString"}, {"rsocket.rpc.role": "client"});
    this.generateStringMetrics = rsocket_rpc_metrics.timed(meterRegistry, "RandomStringGenerator", {"service": "io.netifi.proteus.fanout.randomstring.RandomStringGenerator"}, {"method": "generateString"}, {"role": "client"});
  }
  // Returns a Hello World Message
  RandomStringGeneratorClient.prototype.generateString = function generateString(message, metadata) {
    const map = {};
    return this.generateStringMetrics(
      this.generateStringTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.fanout.randomstring.RandomStringGenerator', 'GenerateString', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestStream({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return proteus_random_string_pb.RandomStringResponse.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  return RandomStringGeneratorClient;
}();

exports.RandomStringGeneratorClient = RandomStringGeneratorClient;

var RandomStringGeneratorServer = function () {
  function RandomStringGeneratorServer(service, tracer, meterRegistry) {
    this._service = service;
    this._tracer = tracer;
    this.generateStringTrace = rsocket_rpc_tracing.traceAsChild(tracer, "RandomStringGenerator", {"rsocket.rpc.service": "io.netifi.proteus.fanout.randomstring.RandomStringGenerator"}, {"method": "generateString"}, {"rsocket.rpc.role": "server"});
    this.generateStringMetrics = rsocket_rpc_metrics.timed(meterRegistry, "RandomStringGenerator", {"service": "io.netifi.proteus.fanout.randomstring.RandomStringGenerator"}, {"method": "generateString"}, {"role": "server"});
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
  RandomStringGeneratorServer.prototype.fireAndForget = function fireAndForget(payload) {
    throw new Error('fireAndForget() is not implemented');
  };
  RandomStringGeneratorServer.prototype.requestResponse = function requestResponse(payload) {
    return rsocket_flowable.Single.error(new Error('requestResponse() is not implemented'));
  };
  RandomStringGeneratorServer.prototype.requestStream = function requestStream(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'GenerateString':
          return this.generateStringMetrics(
            this.generateStringTrace(spanContext)(new rsocket_flowable.Flowable(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .generateString(proteus_random_string_pb.RandomStringRequest.deserializeBinary(binary), payload.metadata)
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
          return rsocket_flowable.Flowable.error(new Error('unknown method'));
      }
    } catch (error) {
      return rsocket_flowable.Flowable.error(error);
    }
  };
  RandomStringGeneratorServer.prototype.requestChannel = function requestChannel(payloads) {
    return new rsocket_flowable.Flowable(s => payloads.subscribe(s)).lift(s =>
      new rsocket_rpc_core.SwitchTransformOperator(s, (payload, flowable) => this._channelSwitch(payload, flowable)),
    );
  };
  RandomStringGeneratorServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return RandomStringGeneratorServer;
}();

exports.RandomStringGeneratorServer = RandomStringGeneratorServer;

