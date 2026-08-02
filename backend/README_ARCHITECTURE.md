Leyde Backend Architecture (scalable REST API)

This document describes the project architecture skeleton created to host a scalable REST API for Leyde (online perfume store).

Key features included in the architecture:
- Java 21, Spring Boot (multi-module Maven project)
- Layered architecture (api, application, domain, persistence, common)
- DTO pattern, Repository pattern, Service layer
- Global exception handler and validation
- Flyway migrations (classpath:db/migration)
- PostgreSQL support and environment-based configuration
- Dockerfile and docker-compose for local development (Postgres + app)
- OpenAPI/Swagger UI via springdoc
- Micrometer Prometheus metrics and Actuator
- Structured logging configuration (Logstash JSON encoder)
- Health checks and metrics endpoints
- Ready for future microservices (module boundaries, minimal dependencies)

Module responsibilities:
- common: shared utilities and constants
- domain: domain models, ports (repository interfaces)
- application: use cases / service interfaces and skeletal implementations
- persistence: JPA entities, Spring Data repositories, adapters implementing domain ports
- api: Spring Boot application, controllers, DTOs, API configs, global exception handling

Notes:
- No business rules are implemented; the skeleton contains minimal DTOs, entities and mapping helpers to illustrate architecture.
- To build and run locally: mvn -T 1C -pl api -am spring-boot:run
- Or use Docker Compose: docker-compose up --build (requires Docker installed)
