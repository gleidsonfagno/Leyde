package com.leyde.backend.api.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final AppUserDetailsService userDetailsService;
    private final JwtAuthenticationEntryPoint authEntryPoint;
    private final JwtAuthenticationFilter jwtFilter;
    private final com.leyde.backend.api.ratelimit.RateLimitingFilter rateLimitingFilter;

    @Value("${security.cors.allowed-origins:http://localhost:3000}")
    private String allowedOrigins;

    public SecurityConfig(AppUserDetailsService userDetailsService,
                          JwtAuthenticationEntryPoint authEntryPoint,
                          JwtAuthenticationFilter jwtFilter,
                          com.leyde.backend.api.ratelimit.RateLimitingFilter rateLimitingFilter) {
        this.userDetailsService = userDetailsService;
        this.authEntryPoint = authEntryPoint;
        this.jwtFilter = jwtFilter;
        this.rateLimitingFilter = rateLimitingFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(org.springframework.security.config.annotation.web.builders.HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf().disable() // Stateless API: CSRF protection is disabled. If cookies are used, enable and configure accordingly.
                .exceptionHandling().authenticationEntryPoint(authEntryPoint).and()
                .headers()
                    .contentSecurityPolicy("default-src 'self'").and()
                    .frameOptions().sameOrigin().and()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeHttpRequests()
                    .requestMatchers(
                            "/v3/api-docs/**",
                            "/swagger-ui/**",
                            "/swagger-ui.html",
                            "/actuator/health",
                            "/actuator/info"
                    ).permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/v1/products/**").permitAll()
                    .anyRequest().authenticated()
                .and()
                .authenticationProvider(daoAuthenticationProvider());

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        // Rate limiting filter should run after JWT filter (so authenticated users are available)
        http.addFilterAfter(rateLimitingFilter, JwtAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        List<String> origins = Arrays.asList(allowedOrigins.split(","));
        configuration.setAllowedOrigins(origins);
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization","Cache-Control","Content-Type","X-Correlation-ID"));
        configuration.setAllowCredentials(false);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public FilterRegistrationBean<com.leyde.backend.api.filter.CorrelationIdFilter> correlationIdFilterRegistration(com.leyde.backend.api.filter.CorrelationIdFilter filter) {
        FilterRegistrationBean<com.leyde.backend.api.filter.CorrelationIdFilter> registration = new FilterRegistrationBean<>(filter);
        registration.setOrder(0);
        registration.addUrlPatterns("/*");
        return registration;
    }

    @Bean
    public FilterRegistrationBean<com.leyde.backend.api.filter.RequestLoggingFilter> requestLoggingFilterRegistration(com.leyde.backend.api.filter.RequestLoggingFilter filter) {
        FilterRegistrationBean<com.leyde.backend.api.filter.RequestLoggingFilter> registration = new FilterRegistrationBean<>(filter);
        registration.setOrder(1);
        registration.addUrlPatterns("/*");
        return registration;
    }

    @Bean
    public FilterRegistrationBean<com.leyde.backend.api.filter.CacheControlFilter> cacheControlFilterRegistration(com.leyde.backend.api.filter.CacheControlFilter filter) {
        FilterRegistrationBean<com.leyde.backend.api.filter.CacheControlFilter> registration = new FilterRegistrationBean<>(filter);
        registration.setOrder(2);
        registration.addUrlPatterns("/api/v1/*");
        return registration;
    }
}
