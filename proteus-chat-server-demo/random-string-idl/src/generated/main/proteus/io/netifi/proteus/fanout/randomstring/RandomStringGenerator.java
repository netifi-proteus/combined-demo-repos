package io.netifi.proteus.fanout.randomstring;

/**
 */
@javax.annotation.Generated(
    value = "by Proteus proto compiler (version 0.7.19)",
    comments = "Source: random-strings.proto")
public interface RandomStringGenerator {
  String SERVICE = "io.netifi.proteus.fanout.randomstring.RandomStringGenerator";
  String METHOD_GENERATE_STRING = "GenerateString";

  /**
   */
  reactor.core.publisher.Flux<io.netifi.proteus.fanout.randomstring.RandomStringResponse> generateString(io.netifi.proteus.fanout.randomstring.RandomStringRequest message, io.netty.buffer.ByteBuf metadata);
}
