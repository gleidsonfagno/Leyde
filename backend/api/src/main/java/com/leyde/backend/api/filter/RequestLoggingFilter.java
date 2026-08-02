package com.leyde.backend.api.filter;

import io.micrometer.core.instrument.MeterRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class RequestLoggingFilter extends OncePerRequestFilter {

    private static final Logger LOG = LoggerFactory.getLogger(RequestLoggingFilter.class);
    private final MeterRegistry meterRegistry;

    public RequestLoggingFilter(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        long start = System.nanoTime();
        String correlationId = MDC.get(CorrelationIdFilter.MDC_KEY);
        try {
            filterChain.doFilter(request, response);
        } finally {
            long durationMs = (System.nanoTime() - start) / 1_000_000;
            int status = response.getStatus();
            String method = request.getMethod();
            String uri = request.getRequestURI();
            String client = request.getRemoteAddr();
            LOG.info("{} {} {} -> {} ({} ms) cid={}", method, uri, client, status, durationMs, correlationId);
            meterRegistry.timer("http.server.requests.duration", "method", method, "uri", uri, "status", String.valueOf(status)).record(durationMs, java.util.concurrent.TimeUnit.MILLISECONDS);
            if (status >= HttpStatus.INTERNAL_SERVER_ERROR.value()) {
                meterRegistry.counter("http.server.requests.errors", "status", String.valueOf(status)).increment();
            }
        }
    }
}
