package com.leyde.backend.application.security;

import com.leyde.backend.domain.model.User;

import java.util.Optional;

/**
 * Token service interface for issuing and validating JWT and refresh tokens.
 */
public interface TokenService {
    String generateAccessToken(User user);
    String generateRefreshToken(User user);
    boolean validateAccessToken(String token);
    Optional<String> extractUsername(String token);
}
