package io.netifi.proteus.fanout.randomstring;

@javax.annotation.Generated(
    value = "by Proteus proto compiler (version 0.8.5)",
    comments = "Source: io/netifi/proteus/fanout/countvowels/service.proto")
@io.netifi.proteus.annotations.internal.ProteusGenerated(
    type = io.netifi.proteus.annotations.internal.ProteusResourceType.CLIENT,
    idlClass = BlockingRandomStringGenerator.class)
public final class BlockingRandomStringGeneratorClient implements BlockingRandomStringGenerator {
  private final io.netifi.proteus.fanout.randomstring.RandomStringGeneratorClient delegate;

  public BlockingRandomStringGeneratorClient(io.rsocket.RSocket rSocket) {
    this.delegate = new io.netifi.proteus.fanout.randomstring.RandomStringGeneratorClient(rSocket);
  }

  public BlockingRandomStringGeneratorClient(io.rsocket.RSocket rSocket, io.micrometer.core.instrument.MeterRegistry registry) {
    this.delegate = new io.netifi.proteus.fanout.randomstring.RandomStringGeneratorClient(rSocket, registry);
  }

  @io.netifi.proteus.annotations.internal.ProteusGeneratedMethod(returnTypeClass = io.netifi.proteus.fanout.randomstring.RandomStringResponse.class)
  public  io.netifi.proteus.BlockingIterable<io.netifi.proteus.fanout.randomstring.RandomStringResponse> generateString(io.netifi.proteus.fanout.randomstring.RandomStringRequest message) {
    return generateString(message, io.netty.buffer.Unpooled.EMPTY_BUFFER);
  }

  @java.lang.Override
  @io.netifi.proteus.annotations.internal.ProteusGeneratedMethod(returnTypeClass = io.netifi.proteus.fanout.randomstring.RandomStringResponse.class)
  public  io.netifi.proteus.BlockingIterable<io.netifi.proteus.fanout.randomstring.RandomStringResponse> generateString(io.netifi.proteus.fanout.randomstring.RandomStringRequest message, io.netty.buffer.ByteBuf metadata) {
    reactor.core.publisher.Flux stream = delegate.generateString(message, metadata);
    return new  io.netifi.proteus.BlockingIterable<>(stream, reactor.util.concurrent.Queues.SMALL_BUFFER_SIZE, reactor.util.concurrent.Queues.small());
  }

}

