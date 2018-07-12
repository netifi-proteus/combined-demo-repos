// GENERATED CODE -- DO NOT EDIT!

'use strict';
var proteus_js_frames = require('proteus-js-frames');
var rsocket_flowable = require('rsocket-flowable');
var proteus_count_vowels_pb = require('../proteus/count_vowels_pb.js');

var VowelCounterClient = function () {
  function VowelCounterClient(rs) {
    this._rs = rs;
  }
  // Returns a Hello World Message
  VowelCounterClient.prototype.countVowels = function countVowels(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.fanout.countvowels.VowelCounter', 'CountVowels', metadata);
    return this._rs.requestResponse({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      if (payload.data == null) {
        throw new Error('data is null');
      }
      return proteus_count_vowels_pb.CountResponse.deserializeBinary(payload.data);
    });
  };
  return VowelCounterClient;
}();

exports.VowelCounterClient = VowelCounterClient;

var VowelCounterServer = function () {
  function VowelCounterServer(service) {
    this._service = service;
  }
  VowelCounterServer.prototype.fireAndForget = function fireAndForget(payload) {
    return rsocket_flowable.Single.error(new Error('fireAndForget() is not implemented'));
  };
  VowelCounterServer.prototype.requestResponse = function requestResponse(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Single.error(new Error('metadata is empty'));
      }
      var method = proteus_js_frames.getMethod(payload.metadata);
      switch (method) {
        case 'CountVowels':
          return this._service.countVowels(proteus_count_vowels_pb.CountRequest.deserializeBinary(payload.data), payload.metadata);
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
  VowelCounterServer.prototype.requestChannel = function requestChannel(payload) {
    return rsocket_flowable.Flowable.error(new Error('requestChannel() is not implemented'));
  };
  VowelCounterServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return VowelCounterServer;
}();

exports.VowelCounterServer = VowelCounterServer;

