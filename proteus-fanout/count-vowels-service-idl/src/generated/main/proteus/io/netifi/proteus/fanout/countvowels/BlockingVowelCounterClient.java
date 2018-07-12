package io.netifi.proteus.fanout.countvowels;

@javax.annotation.Generated(
    value = "by Proteus proto compiler (version 0.7.18)",
    comments = "Source: io/netifi/proteus/fanout/countvowels/service.proto")
@io.netifi.proteus.annotations.internal.ProteusGenerated(
    type = io.netifi.proteus.annotations.internal.ProteusResourceType.CLIENT,
    idlClass = BlockingVowelCounter.class)
public final class BlockingVowelCounterClient implements BlockingVowelCounter {
  private final io.netifi.proteus.fanout.countvowels.VowelCounterClient delegate;

  public BlockingVowelCounterClient(io.rsocket.RSocket rSocket) {
    this.delegate = new io.netifi.proteus.fanout.countvowels.VowelCounterClient(rSocket);
  }

  public BlockingVowelCounterClient(io.rsocket.RSocket rSocket, io.micrometer.core.instrument.MeterRegistry registry) {
    this.delegate = new io.netifi.proteus.fanout.countvowels.VowelCounterClient(rSocket, registry);
  }

  @io.netifi.proteus.annotations.internal.ProteusGeneratedMethod(returnTypeClass = io.netifi.proteus.fanout.countvowels.CountResponse.class)
  public io.netifi.proteus.fanout.countvowels.CountResponse countVowels(io.netifi.proteus.fanout.countvowels.CountRequest message) {
    return countVowels(message, io.netty.buffer.Unpooled.EMPTY_BUFFER);
  }

  @java.lang.Override
  @io.netifi.proteus.annotations.internal.ProteusGeneratedMethod(returnTypeClass = io.netifi.proteus.fanout.countvowels.CountResponse.class)
  public io.netifi.proteus.fanout.countvowels.CountResponse countVowels(io.netifi.proteus.fanout.countvowels.CountRequest message, io.netty.buffer.ByteBuf metadata) {
    return delegate.countVowels(message, metadata).block();
  }

}

