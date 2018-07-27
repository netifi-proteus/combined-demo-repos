package io.netifi.proteus.fanout.randomchar;

@javax.annotation.Generated(
    value = "by Proteus proto compiler (version 0.8.5)",
    comments = "Source: io/netifi/proteus/fanout/randomchar/service.proto")
@io.netifi.proteus.annotations.internal.ProteusGenerated(
    type = io.netifi.proteus.annotations.internal.ProteusResourceType.SERVICE,
    idlClass = RandomCharGenerator.class)
@javax.inject.Named(
    value ="RandomCharGeneratorServer")
public final class RandomCharGeneratorServer extends io.netifi.proteus.AbstractProteusService {
  private final RandomCharGenerator service;
  private final io.opentracing.Tracer tracer;
  private final java.util.function.Function<? super org.reactivestreams.Publisher<io.rsocket.Payload>, ? extends org.reactivestreams.Publisher<io.rsocket.Payload>> generateChar;
  private final java.util.function.Function<io.opentracing.SpanContext, java.util.function.Function<? super org.reactivestreams.Publisher<io.rsocket.Payload>, ? extends org.reactivestreams.Publisher<io.rsocket.Payload>>> generateCharTrace;
  @javax.inject.Inject
  public RandomCharGeneratorServer(RandomCharGenerator service, java.util.Optional<io.micrometer.core.instrument.MeterRegistry> registry, java.util.Optional<io.opentracing.Tracer> tracer) {
    this.service = service;
    if (!registry.isPresent()) {
      this.generateChar = java.util.function.Function.identity();
    } else {
      this.generateChar = io.netifi.proteus.metrics.ProteusMetrics.timed(registry.get(), "proteus.server", "service", RandomCharGenerator.SERVICE, "method", RandomCharGenerator.METHOD_GENERATE_CHAR);
    }

    if (!tracer.isPresent()) {
      this.tracer = null;
      this.generateCharTrace = io.netifi.proteus.tracing.ProteusTracing.traceAsChild();
    } else {
      this.tracer = tracer.get();
      this.generateCharTrace = io.netifi.proteus.tracing.ProteusTracing.traceAsChild(this.tracer, RandomCharGenerator.METHOD_GENERATE_CHAR, io.netifi.proteus.tracing.Tag.of("proteus.service", RandomCharGenerator.SERVICE), io.netifi.proteus.tracing.Tag.of("proteus.type", "server"), io.netifi.proteus.tracing.Tag.of("proteus.version", "0.8.5"));
    }

  }

  @java.lang.Override
  public String getService() {
    return RandomCharGenerator.SERVICE;
  }

  @java.lang.Override
  public Class<?> getServiceClass() {
    return service.getClass();
  }

  @java.lang.Override
  public reactor.core.publisher.Mono<Void> fireAndForget(io.rsocket.Payload payload) {
    return reactor.core.publisher.Mono.error(new UnsupportedOperationException("Fire and forget not implemented."));
  }

  @java.lang.Override
  public reactor.core.publisher.Mono<io.rsocket.Payload> requestResponse(io.rsocket.Payload payload) {
    return reactor.core.publisher.Mono.error(new UnsupportedOperationException("Request-Response not implemented."));
  }

  @java.lang.Override
  public reactor.core.publisher.Flux<io.rsocket.Payload> requestStream(io.rsocket.Payload payload) {
    try {
      io.netty.buffer.ByteBuf metadata = payload.sliceMetadata();
      io.opentracing.SpanContext spanContext = io.netifi.proteus.tracing.ProteusTracing.deserializeTracingMetadata(tracer, metadata);
      switch(io.netifi.proteus.frames.ProteusMetadata.getMethod(metadata)) {
        case RandomCharGenerator.METHOD_GENERATE_CHAR: {
          com.google.protobuf.CodedInputStream is = com.google.protobuf.CodedInputStream.newInstance(payload.getData());
          return service.generateChar(io.netifi.proteus.fanout.randomchar.RandomCharRequest.parseFrom(is), metadata).map(serializer).transform(generateChar).transform(generateCharTrace.apply(spanContext));
        }
        default: {
          return reactor.core.publisher.Flux.error(new UnsupportedOperationException());
        }
      }
    } catch (Throwable t) {
      return reactor.core.publisher.Flux.error(t);
    } finally {
      payload.release();
    }
  }

  @java.lang.Override
  public reactor.core.publisher.Flux<io.rsocket.Payload> requestChannel(io.rsocket.Payload payload, reactor.core.publisher.Flux<io.rsocket.Payload> publisher) {
    return reactor.core.publisher.Flux.error(new UnsupportedOperationException("Request-Channel not implemented."));
  }

  @java.lang.Override
  public reactor.core.publisher.Flux<io.rsocket.Payload> requestChannel(org.reactivestreams.Publisher<io.rsocket.Payload> payloads) {
    return reactor.core.publisher.Flux.error(new UnsupportedOperationException("Request-Channel not implemented."));
  }

  private static final java.util.function.Function<com.google.protobuf.MessageLite, io.rsocket.Payload> serializer =
    new java.util.function.Function<com.google.protobuf.MessageLite, io.rsocket.Payload>() {
      @java.lang.Override
      public io.rsocket.Payload apply(com.google.protobuf.MessageLite message) {
        int length = message.getSerializedSize();
        io.netty.buffer.ByteBuf byteBuf = io.netty.buffer.ByteBufAllocator.DEFAULT.buffer(length);
        try {
          message.writeTo(com.google.protobuf.CodedOutputStream.newInstance(byteBuf.internalNioBuffer(0, length)));
          byteBuf.writerIndex(length);
          return io.rsocket.util.ByteBufPayload.create(byteBuf);
        } catch (Throwable t) {
          byteBuf.release();
          throw new RuntimeException(t);
        }
      }
    };

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
