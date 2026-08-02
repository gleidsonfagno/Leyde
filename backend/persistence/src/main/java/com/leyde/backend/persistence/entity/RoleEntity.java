package com.leyde.backend.persistence.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "roles", uniqueConstraints = {
        @UniqueConstraint(name = "uc_role_name", columnNames = {"name"})
})
public class RoleEntity {
    @Id
    private UUID id;

    @Column(nullable = false)
    private String name;

    // getters and setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
