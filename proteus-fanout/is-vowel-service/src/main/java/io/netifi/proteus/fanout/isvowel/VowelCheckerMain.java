package io.netifi.proteus.fanout.isvowel;

import io.micrometer.core.instrument.MeterRegistry;
import io.netifi.proteus.Proteus;
import io.netifi.proteus.micrometer.ProteusMeterRegistrySupplier;
import io.netifi.proteus.tracing.ProteusTracerSupplier;
import io.opentracing.Tracer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.Optional;
import java.util.UUID;

/** Starts Is Vowel Service */
public class VowelCheckerMain {
  private static final Logger logger = LogManager.getLogger(VowelCheckerMain.class);

  public static void main(String... args) throws Exception {
    long accessKey = Long.getLong("ACCESS_KEY", 9007199254740991L);
    String accessToken = System.getProperty("ACCESS_TOKEN", "kTBDVtfRBO4tHOnZzSyY5ym2kfY=");
    String host = System.getProperty("BROKER_HOST", "localhost");
    int port = Integer.getInteger("BROKER_PORT", 8001);
    int low = Integer.getInteger("LOW", 250);
    int high = Integer.getInteger("HIGH", 1500);
    String destination = System.getProperty("DESTINATION", UUID.randomUUID().toString());

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
            .group("fanout.isVowel") // Group name of service
            .destination(destination)
            .accessKey(accessKey)
            .accessToken(accessToken)
            .host(host) // Proteus Router Host
            .port(port) // Proteus Router Port
            .build();

    boolean delayed = Boolean.getBoolean("delayed");

    logger.info("starting vowel checker with a delay -> " + delayed);

    MeterRegistry registry =
        new ProteusMeterRegistrySupplier(
                proteus, Optional.empty(), Optional.empty(), Optional.empty())
            .get();

    Tracer tracer = new ProteusTracerSupplier(proteus, Optional.empty()).get();

    // Add Service to Respond to Requests
    proteus.addService(
        new VowelCheckerServer(
            new DefaultVowelChecker(delayed, low, high),
            Optional.of(registry),
            Optional.of(tracer)));

    proteus.onClose().block();
  }
}
