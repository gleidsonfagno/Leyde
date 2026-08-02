package com.leyde.backend.persistence.repository;

import com.leyde.backend.persistence.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SpringDataProductRepository extends JpaRepository<ProductEntity, UUID> {

    @EntityGraph(attributePaths = {"brand", "category"})
    Page<ProductEntity> findAll(Pageable pageable);

    @EntityGraph(attributePaths = {"brand", "category"})
    Optional<ProductEntity> findById(UUID id);

    List<ProductEntity> findByCreatedAtBeforeOrderByCreatedAtDesc(OffsetDateTime before, Pageable pageable);
}
