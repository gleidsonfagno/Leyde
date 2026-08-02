package com.leyde.backend.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Spring Boot application for the Leyde backend API module.
 * The skeleton intentionally contains no controllers or business logic.
 */
@SpringBootApplication(scanBasePackages = "com.leyde.backend")
public class LeydeBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(LeydeBackendApplication.class, args);
    }
}
