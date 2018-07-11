package io.netifi.proteus.fanout.isvowel;

/**
 */
@javax.annotation.Generated(
    value = "by Proteus proto compiler (version 0.7.18)",
    comments = "Source: io/netifi/proteus/fanout/isvowel/service.proto")
public interface VowelChecker {
  String SERVICE = "io.netifi.proteus.fanout.isvowel.VowelChecker";
  String METHOD_IS_VOWEL = "IsVowel";

  /**
   * <pre>
   * Returns a Hello World Message
   * </pre>
   */
  reactor.core.publisher.Mono<io.netifi.proteus.fanout.isvowel.IsVowelResponse> isVowel(io.netifi.proteus.fanout.isvowel.IsVowelRequest message, io.netty.buffer.ByteBuf metadata);
}
