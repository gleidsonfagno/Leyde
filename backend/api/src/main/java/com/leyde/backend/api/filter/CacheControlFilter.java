package com.leyde.backend.api.filter;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Locale;

/**
 * Adds Cache-Control headers for GET public endpoints and sets ETag support via ShallowEtagHeaderFilter.
 */
@Component
public class CacheControlFilter extends OncePerRequestFilter {

    private final long publicMaxAgeSeconds = 60; // default 60s, make configurable if needed

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        filterChain.doFilter(request, response);

        String method = request.getMethod();
        String path = request.getRequestURI().toLowerCase(Locale.ROOT);
        if ("GET".equalsIgnoreCase(method) && (path.matches("^/api/v1/(products|categories|brands)(/.*)?$") )) {
            response.setHeader("Cache-Control", "public, max-age=" + publicMaxAgeSeconds);
        }
    }
}
