package com.leyde.backend.domain.model;

import java.util.Set;
import java.util.UUID;

/**
 * Domain user model. Keep only properties for security concerns.
 */
public class User {
    private UUID id;
    private String username;
    private String password; // hashed
    private Set<Role> roles;
    private boolean enabled = true;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Set<Role> getRoles() { return roles; }
    public void setRoles(Set<Role> roles) { this.roles = roles; }
    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }
}
