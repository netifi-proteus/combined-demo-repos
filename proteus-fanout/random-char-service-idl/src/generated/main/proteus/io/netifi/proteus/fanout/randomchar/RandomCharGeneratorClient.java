package io.netifi.proteus.fanout.randomchar;

@javax.annotation.Generated(
    value = "by Proteus proto compiler (version 0.8.5)",
    comments = "Source: io/netifi/proteus/fanout/randomchar/service.proto")
@io.netifi.proteus.annotations.internal.ProteusGenerated(
    type = io.netifi.proteus.annotations.internal.ProteusResourceType.CLIENT,
    idlClass = RandomCharGenerator.class)
public final class RandomCharGeneratorClient implements RandomCharGenerator {
  private final io.rsocket.RSocket rSocket;
  private final java.util.function.Function<? super org.reactivestreams.Publisher<io.netifi.proteus.fanout.randomchar.RandomCharResponse>, ? extends org.reactivestreams.Publisher<io.netifi.proteus.fanout.randomchar.RandomCharResponse>> generateChar;
  private final java.util.function.Function<java.util.Map<String, String>, java.util.function.Function<? super org.reactivestreams.Publisher<io.netifi.proteus.fanout.randomchar.RandomCharResponse>, ? extends org.reactivestreams.Publisher<io.netifi.proteus.fanout.randomchar.RandomCharResponse>>> generateCharTrace;

  public RandomCharGeneratorClient(io.rsocket.RSocket rSocket) {
    this.rSocket = rSocket;
    this.generateChar = java.util.function.Function.identity();
    this.generateCharTrace = io.netifi.proteus.tracing.ProteusTracing.trace();
  }

  public RandomCharGeneratorClient(io.rsocket.RSocket rSocket, io.micrometer.core.instrument.MeterRegistry registry) {
    this.rSocket = rSocket;
    this.generateChar = io.netifi.proteus.metrics.ProteusMetrics.timed(registry, "proteus.client", "service", RandomCharGenerator.SERVICE, "method", RandomCharGenerator.METHOD_GENERATE_CHAR);
    this.generateCharTrace = io.netifi.proteus.tracing.ProteusTracing.trace();
  }


  public RandomCharGeneratorClient(io.rsocket.RSocket rSocket, io.opentracing.Tracer tracer) {
    this.rSocket = rSocket;
    this.generateChar = java.util.function.Function.identity();
    this.generateCharTrace = io.netifi.proteus.tracing.ProteusTracing.trace(tracer, RandomCharGenerator.METHOD_GENERATE_CHAR, io.netifi.proteus.tracing.Tag.of("proteus.service", RandomCharGenerator.SERVICE), io.netifi.proteus.tracing.Tag.of("proteus.type", "client"), io.netifi.proteus.tracing.Tag.of("proteus.version", "0.8.5"));
  }


  public RandomCharGeneratorClient(io.rsocket.RSocket rSocket, io.micrometer.core.instrument.MeterRegistry registry, io.opentracing.Tracer tracer) {
    this.rSocket = rSocket;
    this.generateChar = io.netifi.proteus.metrics.ProteusMetrics.timed(registry, "proteus.client", "service", RandomCharGenerator.SERVICE, "method", RandomCharGenerator.METHOD_GENERATE_CHAR);
    this.generateCharTrace = io.netifi.proteus.tracing.ProteusTracing.trace(tracer, RandomCharGenerator.METHOD_GENERATE_CHAR, io.netifi.proteus.tracing.Tag.of("proteus.service", RandomCharGenerator.SERVICE), io.netifi.proteus.tracing.Tag.of("proteus.type", "client"), io.netifi.proteus.tracing.Tag.of("proteus.version", "0.8.5"));
  }

  @io.netifi.proteus.annotations.internal.ProteusGeneratedMethod(returnTypeClass = io.netifi.proteus.fanout.randomchar.RandomCharResponse.class)
  public reactor.core.publisher.Flux<io.netifi.proteus.fanout.randomchar.RandomCharResponse> generateChar(io.netifi.proteus.fanout.randomchar.RandomCharRequest message) {
    return generateChar(message, io.netty.buffer.Unpooled.EMPTY_BUFFER);
  }

  @java.lang.Override
  @io.netifi.proteus.annotations.internal.ProteusGeneratedMethod(returnTypeClass = io.netifi.proteus.fanout.randomchar.RandomCharResponse.class)
  public reactor.core.publisher.Flux<io.netifi.proteus.fanout.randomchar.RandomCharResponse> generateChar(io.netifi.proteus.fanout.randomchar.RandomCharRequest message, io.netty.buffer.ByteBuf metadata) {
  java.util.Map<String, String> map = new java.util.HashMap<>();
    return reactor.core.publisher.Flux.defer(new java.util.function.Supplier<reactor.core.publisher.Flux<io.rsocket.Payload>>() {
      @java.lang.Override
      public reactor.core.publisher.Flux<io.rsocket.Payload> get() {
        final io.netty.buffer.ByteBuf tracingMetadata = io.netifi.proteus.tracing.ProteusTracing.mapToByteBuf(io.netty.buffer.ByteBufAllocator.DEFAULT, map);
        final io.netty.buffer.ByteBuf metadataBuf = io.netifi.proteus.frames.ProteusMetadata.encode(io.netty.buffer.ByteBufAllocator.DEFAULT, RandomCharGenerator.SERVICE, RandomCharGenerator.METHOD_GENERATE_CHAR, tracingMetadata, metadata);
        io.netty.buffer.ByteBuf data = serialize(message);
        tracingMetadata.release();
        return rSocket.requestStream(io.rsocket.util.ByteBufPayload.create(data, metadataBuf));
      }
    }).map(deserializer(io.netifi.proteus.fanout.randomchar.RandomCharResponse.parser())).transform(generateChar).transform(generateCharTrace.apply(map));
  }

  private static io.netty.buffer.ByteBuf serialize(final com.google.protobuf.MessageLite message) {
    int length = message.getSerializedSize();
    io.netty.buffer.ByteBuf byteBuf = io.netty.buffer.ByteBufAllocator.DEFAULT.buffer(length);
    try {
      message.writeTo(com.google.protobuf.CodedOutputStream.newInstance(byteBuf.internalNioBuffer(0, length)));
      byteBuf.writerIndex(length);
      return byteBuf;
    } catch (Throwable t) {
      byteBuf.release();
      throw new RuntimeException(t);
    }
  }

  private static <T> java.util.function.Function<io.rsocket.Payload, T> deserializer(final com.google.protobuf.Parser<T> parser) {
    return new java.util.function.Function<io.rsocket.Payload, T>() {
      @java.lang.Override
      public T apply(io.rsocket.Payload payload) {
        try {
          com.google.protobuf.CodedInputStream is = com.google.protobuf.CodedInputStream.newInstance(payload.getData());
          return parser.parseFrom(is);
        } catch (Throwable t) {
          throw new RuntimeException(t);
        } finally {
          payload.release();
        }
      }
    };
  }
}
