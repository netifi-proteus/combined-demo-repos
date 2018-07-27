package io.netifi.proteus.fanout.randomstring;

/**
 */
@javax.annotation.Generated(
    value = "by Proteus proto compiler (version 0.8.5)",
    comments = "Source: io/netifi/proteus/fanout/countvowels/service.proto")
public interface RandomStringGenerator {
  String SERVICE = "io.netifi.proteus.fanout.randomstring.RandomStringGenerator";
  String METHOD_GENERATE_STRING = "GenerateString";

  /**
   * <pre>
   * Returns a Hello World Message
   * </pre>
   */
  reactor.core.publisher.Flux<io.netifi.proteus.fanout.randomstring.RandomStringResponse> generateString(io.netifi.proteus.fanout.randomstring.RandomStringRequest message, io.netty.buffer.ByteBuf metadata);
}
