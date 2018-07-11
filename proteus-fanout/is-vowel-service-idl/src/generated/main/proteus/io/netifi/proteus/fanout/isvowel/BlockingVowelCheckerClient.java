package io.netifi.proteus.fanout.isvowel;

@javax.annotation.Generated(
    value = "by Proteus proto compiler (version 0.7.18)",
    comments = "Source: io/netifi/proteus/fanout/isvowel/service.proto")
@io.netifi.proteus.annotations.internal.ProteusGenerated(
    type = io.netifi.proteus.annotations.internal.ProteusResourceType.CLIENT,
    idlClass = BlockingVowelChecker.class)
public final class BlockingVowelCheckerClient implements BlockingVowelChecker {
  private final io.netifi.proteus.fanout.isvowel.VowelCheckerClient delegate;

  public BlockingVowelCheckerClient(io.rsocket.RSocket rSocket) {
    this.delegate = new io.netifi.proteus.fanout.isvowel.VowelCheckerClient(rSocket);
  }

  public BlockingVowelCheckerClient(io.rsocket.RSocket rSocket, io.micrometer.core.instrument.MeterRegistry registry) {
    this.delegate = new io.netifi.proteus.fanout.isvowel.VowelCheckerClient(rSocket, registry);
  }

  @io.netifi.proteus.annotations.internal.ProteusGeneratedMethod(returnTypeClass = io.netifi.proteus.fanout.isvowel.IsVowelResponse.class)
  public io.netifi.proteus.fanout.isvowel.IsVowelResponse isVowel(io.netifi.proteus.fanout.isvowel.IsVowelRequest message) {
    return isVowel(message, io.netty.buffer.Unpooled.EMPTY_BUFFER);
  }

  @java.lang.Override
  @io.netifi.proteus.annotations.internal.ProteusGeneratedMethod(returnTypeClass = io.netifi.proteus.fanout.isvowel.IsVowelResponse.class)
  public io.netifi.proteus.fanout.isvowel.IsVowelResponse isVowel(io.netifi.proteus.fanout.isvowel.IsVowelRequest message, io.netty.buffer.ByteBuf metadata) {
    return delegate.isVowel(message, metadata).block();
  }

}

