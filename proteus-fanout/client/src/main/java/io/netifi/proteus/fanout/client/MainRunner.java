package io.netifi.proteus.fanout.client;

import io.netifi.proteus.annotations.ProteusClient;
import io.netifi.proteus.fanout.countvowels.CountRequest;
import io.netifi.proteus.fanout.countvowels.CountResponse;
import io.netifi.proteus.fanout.countvowels.VowelCounterClient;
import io.netifi.proteus.fanout.randomstring.RandomStringGeneratorClient;
import io.netifi.proteus.fanout.randomstring.RandomStringRequest;
import io.netifi.proteus.fanout.randomstring.RandomStringResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
public class MainRunner implements CommandLineRunner {
  private static final Logger logger = LogManager.getLogger(Main_old.class);

  private int min = Integer.getInteger("MIN", 5);
  private int max = Integer.getInteger("MAX", 25);
  private int numberOfValues = Integer.getInteger("NUM_VOWELS", 10_000);

  @ProteusClient(group = "fanout.randomStringGenerator")
  private RandomStringGeneratorClient randomStringGeneratorClient;

  @ProteusClient(group = "fanout.vowelcounter")
  private VowelCounterClient vowelCounterClient;

  private void countVowelsFromStrings(int min, int max, int numberOfValues) {
    Integer total =
        getRandomStringsFlux(min, max)
            .flatMap(this::countVowels)
            .doOnError(Throwable::printStackTrace)
            .scan(0, (c1, c2) -> c1 + c2)
            // .filter(count -> count % 1000 == 0)
            .doOnNext(count -> logger.info("vowels currently found -> " + count))
            .takeUntil(count -> count >= numberOfValues)
            .blockLast();

    logger.info("vowels found -> " + total);
  }

  private Flux<String> getRandomStringsFlux(int min, int max) {
    RandomStringRequest request = RandomStringRequest.newBuilder().setMin(min).setMax(max).build();
    return randomStringGeneratorClient
        .generateString(request)
        .doOnNext(r -> System.out.println("going to count -> " + r.getGenerated()))
        .map(RandomStringResponse::getGenerated);
  }

  private Mono<Integer> countVowels(String target) {
    CountRequest request = CountRequest.newBuilder().setTarget(target).build();
    return vowelCounterClient.countVowels(request).map(CountResponse::getCount);
  }

  @Override
  public void run(String... args) throws Exception {
    countVowelsFromStrings(min, max, numberOfValues);
  }
}
