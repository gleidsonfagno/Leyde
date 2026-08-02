Security infrastructure (architecture only)

Provided components:
- SecurityConfig: SecurityFilterChain, CORS, CSRF disabled for stateless, secure headers, BCrypt password encoder, stateless session management.
- JwtTokenProvider: creates and validates JWT tokens using a secret from configuration.
- JwtAuthenticationFilter: extracts Bearer token, validates and sets SecurityContext authentication using User repository.
- JwtAuthenticationEntryPoint: returns 401 JSON for unauthorized requests.
- AppUserDetailsService: UserDetailsService implementation backed by persistence UserSpringDataRepository.

Data model prepared:
- Domain: User and Role
- Persistence: UserEntity, RefreshTokenEntity, Spring Data repositories, and adapters mapping domain<->entity
- Application: TokenService interface for token operations (generate/validate)

Notes:
- Refresh token storage exists (RefreshTokenEntity + repository) but token lifecycle endpoints are not implemented.
- Password hashing: BCryptPasswordEncoder bean is provided in SecurityConfig; use it when creating users.
- CORS allowed origins is configured via security.cors.allowed-origins property (comma-separated)
- CSRF is disabled because the API is stateless (JWT). If you plan to use cookies, re-enable CSRF and configure cookie repository.
- All endpoints are secured by default; whitelist for swagger, actuator and public GET products is configured.

Next steps to enable authentication endpoints:
1. Implement registration and login endpoints that create users (hash passwords) and issue tokens via TokenService.
2. Implement refresh token endpoints using RefreshTokenRepository and TokenService.
3. Add tests and secure actuator in production.
