package io.netifi.proteus.fanout.client;

import com.netifi.proteus.springboot.EnableProteus;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
@EnableProteus(group = "fanout.client")
public class Main {
    public static void main(String... args) {
        SpringApplication.run(Main.class, args);
    }
}
