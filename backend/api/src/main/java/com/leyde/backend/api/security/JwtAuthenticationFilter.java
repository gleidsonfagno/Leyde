package com.leyde.backend.api.security;

import com.leyde.backend.persistence.entity.UserEntity;
import com.leyde.backend.persistence.repository.UserSpringDataRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;
    private final UserSpringDataRepository userRepo;

    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider, UserSpringDataRepository userRepo) {
        this.tokenProvider = tokenProvider;
        this.userRepo = userRepo;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            if (tokenProvider.validateToken(token)) {
                tokenProvider.getUsername(token).ifPresent(username -> {
                    userRepo.findByUsername(username).ifPresent(userEntity -> {
                        List<SimpleGrantedAuthority> authorities = userEntity.getRoles().stream()
                                .map(SimpleGrantedAuthority::new)
                                .collect(Collectors.toList());

                        UserDetails userDetails = new User(userEntity.getUsername(), userEntity.getPassword(), authorities);
                        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
                        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    });
                });
            }
        }
        filterChain.doFilter(request, response);
    }
}
