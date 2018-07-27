package io.netifi.proteus.fanout.countvowels;

/**
 */
@javax.annotation.Generated(
    value = "by Proteus proto compiler (version 0.8.5)",
    comments = "Source: io/netifi/proteus/fanout/countvowels/service.proto")
public interface VowelCounter {
  String SERVICE = "io.netifi.proteus.fanout.countvowels.VowelCounter";
  String METHOD_COUNT_VOWELS = "CountVowels";

  /**
   * <pre>
   * Returns a Hello World Message
   * </pre>
   */
  reactor.core.publisher.Mono<io.netifi.proteus.fanout.countvowels.CountResponse> countVowels(io.netifi.proteus.fanout.countvowels.CountRequest message, io.netty.buffer.ByteBuf metadata);
}
