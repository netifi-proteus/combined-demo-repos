// GENERATED CODE -- DO NOT EDIT!

'use strict';
var proteus_js_frames = require('proteus-js-frames');
var rsocket_flowable = require('rsocket-flowable');
var proteus_random_string_pb = require('../proteus/random_string_pb.js');

var RandomStringGeneratorClient = function () {
  function RandomStringGeneratorClient(rs) {
    this._rs = rs;
  }
  // Returns a Hello World Message
  RandomStringGeneratorClient.prototype.generateString = function generateString(message, metadata) {
    var dataBuf = Buffer.from(message.serializeBinary());
    var metadataBuf = proteus_js_frames.encodeProteusMetadata('io.netifi.proteus.fanout.randomstring.RandomStringGenerator', 'GenerateString', metadata);
    return this._rs.requestStream({
      data: dataBuf,
      metadata: metadataBuf
    }).map(function (payload) {
      if (payload.data == null) {
        throw new Error('data is null');
      }
      return proteus_random_string_pb.RandomStringResponse.deserializeBinary(payload.data);
    });
  };
  return RandomStringGeneratorClient;
}();

exports.RandomStringGeneratorClient = RandomStringGeneratorClient;

var RandomStringGeneratorServer = function () {
  function RandomStringGeneratorServer(service) {
    this._service = service;
  }
  RandomStringGeneratorServer.prototype.fireAndForget = function fireAndForget(payload) {
    return rsocket_flowable.Single.error(new Error('fireAndForget() is not implemented'));
  };
  RandomStringGeneratorServer.prototype.requestResponse = function requestResponse(payload) {
    return rsocket_flowable.Single.error(new Error('requestResponse() is not implemented'));
  };
  RandomStringGeneratorServer.prototype.requestStream = function requestStream(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
      }
      var method = proteus_js_frames.getMethod(payload.metadata);
      switch (method) {
        case 'GenerateString':
          return this._service.generateString(proteus_random_string_pb.RandomStringRequest.deserializeBinary(payload.data), payload.metadata);
        default:
          return rsocket_flowable.Flowable.error(new Error('unknown method'));
      }
    } catch (error) {
      return rsocket_flowable.Flowable.error(error);
    }
  };
  RandomStringGeneratorServer.prototype.requestChannel = function requestChannel(payload) {
    return rsocket_flowable.Flowable.error(new Error('requestChannel() is not implemented'));
  };
  RandomStringGeneratorServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return RandomStringGeneratorServer;
}();

exports.RandomStringGeneratorServer = RandomStringGeneratorServer;

