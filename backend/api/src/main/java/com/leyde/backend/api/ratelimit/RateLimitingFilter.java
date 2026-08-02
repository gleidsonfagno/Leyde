package com.leyde.backend.api.ratelimit;

import com.github.bucket4j.ConsumptionProbe;
import com.github.bucket4j.Bucket;
import com.leyde.backend.api.config.RateLimitProperties;
import io.micrometer.core.instrument.MeterRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.util.Locale;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    private static final Logger LOG = LoggerFactory.getLogger(RateLimitingFilter.class);

    private final RateLimitService service;
    private final RateLimitProperties properties;
    private final MeterRegistry meterRegistry;

    public RateLimitingFilter(RateLimitService service, RateLimitProperties properties, MeterRegistry meterRegistry) {
        this.service = service;
        this.properties = properties;
        this.meterRegistry = meterRegistry;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String path = Optional.ofNullable(request.getRequestURI()).orElse("");
        String method = Optional.ofNullable(request.getMethod()).orElse("GET");

        boolean isPublic = isPublicEndpoint(method, path);
        boolean isAdmin = isAdminEndpoint(method, path);

        String ip = extractClientIp(request);

        // Apply IP-level limit
        long ipLimit = isAdmin ? properties.getAdminEndpoints().getIpRequestsPerMinute() : properties.getPublicEndpoints().getIpRequestsPerMinute();
        String ipKey = "IP:" + ip + ":" + (isAdmin ? "ADMIN" : "PUBLIC");
        Bucket ipBucket = service.resolveBucket(ipKey, ipLimit);
        ConsumptionProbe ipProbe = ipBucket.tryConsumeAndReturnRemaining(1);
        if (!ipProbe.isConsumed()) {
            long waitForRefillNanos = ipProbe.getNanosToWaitForRefill();
            sendTooManyRequests(response, waitForRefillNanos, "IP");
            meterRegistry.counter("ratelimit.rejected", "type", "ip", "scope", isAdmin ? "admin" : "public").increment();
            return;
        }

        // If authenticated, apply user-level limits
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && auth.getName() != null && !"anonymousUser".equals(auth.getName())) {
            String username = auth.getName();
            long userLimit = isAdmin ? properties.getAdminEndpoints().getUserRequestsPerMinute() : properties.getPublicEndpoints().getUserRequestsPerMinute();
            String userKey = "USER:" + username + ":" + (isAdmin ? "ADMIN" : "PUBLIC");
            Bucket userBucket = service.resolveBucket(userKey, userLimit);
            ConsumptionProbe userProbe = userBucket.tryConsumeAndReturnRemaining(1);
            if (!userProbe.isConsumed()) {
                long waitForRefillNanos = userProbe.getNanosToWaitForRefill();
                sendTooManyRequests(response, waitForRefillNanos, "USER");
                meterRegistry.counter("ratelimit.rejected", "type", "user", "scope", isAdmin ? "admin" : "public").increment();
                return;
            }
        }

        // Successful consumption
        meterRegistry.counter("ratelimit.allowed", "scope", isAdmin ? "admin" : "public").increment();
        filterChain.doFilter(request, response);
    }

    private boolean isPublicEndpoint(String method, String path) {
        if (!"GET".equalsIgnoreCase(method)) return false;
        String p = path.toLowerCase(Locale.ROOT);
        return p.matches("^/api/v1/(products|categories|brands)(/.*)?$");
    }

    private boolean isAdminEndpoint(String method, String path) {
        String m = method.toUpperCase(Locale.ROOT);
        if (!("POST".equals(m) || "PUT".equals(m) || "DELETE".equals(m))) return false;
        return path.toLowerCase(Locale.ROOT).startsWith("/api/v1/");
    }

    private String extractClientIp(HttpServletRequest request) {
        String xf = request.getHeader("X-Forwarded-For");
        if (xf != null && !xf.isBlank()) {
            return xf.split(",")[0].trim();
        }
        return Optional.ofNullable(request.getRemoteAddr()).orElse("unknown");
    }

    private void sendTooManyRequests(HttpServletResponse response, long waitForRefillNanos, String reason) throws IOException {
        long seconds = TimeUnit.NANOSECONDS.toSeconds(waitForRefillNanos) + 1;
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setHeader("Retry-After", String.valueOf(seconds));
        response.setContentType("application/json");
        String body = String.format("{\"error\":\"Too Many Requests\",\"reason\":\"%s\",\"retry_after_seconds\":%d}", reason, seconds);
        response.getWriter().write(body);
        LOG.debug("Request rejected by rate limiter ({}). Retry after {}s", reason, seconds);
    }
}
