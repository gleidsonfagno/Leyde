Leyde Backend

Maven multi-module skeleton for the Leyde backend (Java 21 + Spring Boot).

Modules:
- common: shared utilities and constants
- domain: domain model (entities, value objects, ports/interfaces)
- application: application services, use-case orchestration (interfaces only)
- persistence: JPA implementations, repositories, migrations (adapter)
- api: Spring Boot application (REST controllers, configuration)

This project intentionally does not include business logic; only the architectural skeleton, package layout and build configuration are provided.

To build: run `mvn -T 1C -pl api -am package` from backend folder (requires internet access to download dependencies).
