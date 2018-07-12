package io.netifi.proteus.demo;

import io.netifi.proteus.demo.chat.Chat;
import io.netifi.proteus.demo.chat.ChatEvent;
import io.netifi.proteus.demo.chat.JoinEvent;
import io.netifi.proteus.fanout.randomstring.RandomStringGenerator;
import io.netifi.proteus.fanout.randomstring.RandomStringRequest;
import io.netifi.proteus.fanout.randomstring.RandomStringResponse;
import io.netty.buffer.ByteBuf;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.WorkQueueProcessor;

import java.util.concurrent.ThreadLocalRandom;

public class MessageDrivenRandomStringGenerator implements RandomStringGenerator, Chat {
  private static final Logger logger =
      LogManager.getLogger(MessageDrivenRandomStringGenerator.class);

  private final WorkQueueProcessor<Character> _buffer;

  public MessageDrivenRandomStringGenerator() {
    this._buffer = WorkQueueProcessor.create();
  }

  public Flux<RandomStringResponse> generateString(RandomStringRequest message, ByteBuf metadata) {
    int min = message.getMin();
    int max = message.getMax();

    System.out.println("Received request for string");

    return Flux.<Integer>generate(
            sink -> {
              int size = ThreadLocalRandom.current().nextInt(min, max);
              sink.next(size);
            })
        .flatMap(
            i -> {
              return _buffer
                         .limitRate(i)
                  .take(i)
                  .reduce(
                      "",
                      (s, c) -> {
                        return s + c;
                      });
            })
        .map(s -> RandomStringResponse.newBuilder().setGenerated(s).build())
        .doOnError(Throwable::printStackTrace)
        .doOnNext(s -> logger.info(s.toString()));
  }
  
  public Mono<Void> join(JoinEvent evt, ByteBuf metadata) {
    return Mono.empty();
  }

  public Mono<Void> chat(ChatEvent evt, ByteBuf metadata) {
    String msg = evt.getMessage();
    System.out.println("Received message:" + msg);
    
    
    msg.chars().forEach(i -> _buffer.onNext((char) i));

    return Mono.empty();
  }
}
