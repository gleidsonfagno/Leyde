package com.leyde.backend.api.ratelimit;

import com.github.bucket4j.Bandwidth;
import com.github.bucket4j.Bucket;
import com.github.bucket4j.Bucket4j;
import com.github.bucket4j.Refill;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimitService {

    private final Map<String, Bucket> cache = new ConcurrentHashMap<>();

    public Bucket resolveBucket(String key, long requestsPerMinute) {
        return cache.computeIfAbsent(key, k -> newBucket(requestsPerMinute));
    }

    private Bucket newBucket(long requestsPerMinute) {
        if (requestsPerMinute <= 0) requestsPerMinute = 1;
        Refill refill = Refill.intervally(requestsPerMinute, Duration.ofMinutes(1));
        Bandwidth limit = Bandwidth.classic(requestsPerMinute, refill);
        return Bucket4j.builder().addLimit(limit).build();
    }
}
