package com.leyde.backend.api.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "ratelimit")
public class RateLimitProperties {

    private Limits publicEndpoints = new Limits();
    private Limits adminEndpoints = new Limits();

    public static class Limits {
        private long ipRequestsPerMinute = 1000;
        private long userRequestsPerMinute = 1000;

        public long getIpRequestsPerMinute() { return ipRequestsPerMinute; }
        public void setIpRequestsPerMinute(long ipRequestsPerMinute) { this.ipRequestsPerMinute = ipRequestsPerMinute; }
        public long getUserRequestsPerMinute() { return userRequestsPerMinute; }
        public void setUserRequestsPerMinute(long userRequestsPerMinute) { this.userRequestsPerMinute = userRequestsPerMinute; }
    }

    public Limits getPublicEndpoints() { return publicEndpoints; }
    public void setPublicEndpoints(Limits publicEndpoints) { this.publicEndpoints = publicEndpoints; }
    public Limits getAdminEndpoints() { return adminEndpoints; }
    public void setAdminEndpoints(Limits adminEndpoints) { this.adminEndpoints = adminEndpoints; }
}
