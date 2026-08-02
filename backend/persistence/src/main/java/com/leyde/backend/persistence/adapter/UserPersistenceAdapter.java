package com.leyde.backend.persistence.adapter;

import com.leyde.backend.domain.model.Role;
import com.leyde.backend.domain.model.User;
import com.leyde.backend.domain.repository.UserRepository;
import com.leyde.backend.persistence.entity.UserEntity;
import com.leyde.backend.persistence.repository.UserSpringDataRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class UserPersistenceAdapter implements UserRepository {

    private final UserSpringDataRepository repo;

    public UserPersistenceAdapter(UserSpringDataRepository repo) {
        this.repo = repo;
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return repo.findByUsername(username).map(this::toDomain);
    }

    @Override
    public User save(User user) {
        UserEntity e = toEntity(user);
        UserEntity saved = repo.save(e);
        return toDomain(saved);
    }

    @Override
    public Optional<User> findById(UUID id) {
        return repo.findById(id).map(this::toDomain);
    }

    private User toDomain(UserEntity e) {
        User u = new User();
        u.setId(e.getId());
        u.setUsername(e.getUsername());
        u.setPassword(e.getPassword());
        Set<Role> roles = e.getRoles().stream().map(r -> Role.valueOf(r)).collect(Collectors.toSet());
        u.setRoles(roles);
        u.setEnabled(e.isEnabled());
        return u;
    }

    private UserEntity toEntity(User u) {
        UserEntity e = new UserEntity();
        e.setId(u.getId());
        e.setUsername(u.getUsername());
        e.setPassword(u.getPassword());
        if (u.getRoles() != null) {
            e.setRoles(u.getRoles().stream().map(Enum::name).collect(Collectors.toSet()));
        }
        e.setEnabled(u.isEnabled());
        return e;
    }
}
