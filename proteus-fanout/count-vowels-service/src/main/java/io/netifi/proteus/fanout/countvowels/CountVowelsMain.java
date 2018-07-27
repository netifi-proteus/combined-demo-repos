package io.netifi.proteus.fanout.countvowels;

import io.micrometer.core.instrument.MeterRegistry;
import io.netifi.proteus.Proteus;
import io.netifi.proteus.fanout.isvowel.VowelCheckerClient;
import io.netifi.proteus.micrometer.ProteusMeterRegistrySupplier;
import io.netifi.proteus.tracing.ProteusTracerSupplier;
import io.opentracing.Tracer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.Optional;
import java.util.UUID;

/** Starts Vowel Counter */
public class CountVowelsMain {
  private static final Logger logger = LogManager.getLogger(CountVowelsMain.class);

  public static void main(String... args) throws Exception {
    long accessKey = Long.getLong("ACCESS_KEY", 9007199254740991L);
    String accessToken = System.getProperty("ACCESS_TOKEN", "kTBDVtfRBO4tHOnZzSyY5ym2kfY=");
    String host = System.getProperty("BROKER_HOST", "localhost");
    int port = Integer.getInteger("BROKER_PORT", 8001);
    String destination = UUID.randomUUID().toString();

    System.out.println("system properties [");
    System.getProperties()
        .forEach(
            (k, v) -> {
              System.out.print(k + ": " + v + ", ");
            });

    System.out.println("\n]");

    // Build Netifi Connection
    Proteus proteus =
        Proteus.builder()
            .group("fanout.vowelcounter") // Group name of service
            .destination(destination)
            .accessKey(accessKey)
            .accessToken(accessToken)
            .host(host) // Proteus Router Host
            .port(port) // Proteus Router Port
            .build();

    logger.info("starting vowel counter");

    MeterRegistry registry =
        new ProteusMeterRegistrySupplier(
                proteus, Optional.empty(), Optional.empty(), Optional.empty())
            .get();

    Tracer tracer = new ProteusTracerSupplier(proteus, Optional.empty()).get();

    System.out.println("looking for isVowel service");
    VowelCheckerClient client = new VowelCheckerClient(proteus.group("fanout.isVowel"), registry);

    proteus.addService(
        new VowelCounterServer(
            new DefaultVowelCounter(client), Optional.of(registry), Optional.of(tracer)));

    logger.info("vowel counter started");

    proteus.onClose().block();
  }
}
