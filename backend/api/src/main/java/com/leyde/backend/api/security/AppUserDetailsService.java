package com.leyde.backend.api.security;

import com.leyde.backend.persistence.entity.UserEntity;
import com.leyde.backend.persistence.repository.UserSpringDataRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class AppUserDetailsService implements UserDetailsService {

    private final UserSpringDataRepository userRepo;

    public AppUserDetailsService(UserSpringDataRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity e = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        return org.springframework.security.core.userdetails.User.withUsername(e.getUsername())
                .password(e.getPassword())
                .authorities(e.getRoles().stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()))
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(!e.isEnabled())
                .build();
    }
}
