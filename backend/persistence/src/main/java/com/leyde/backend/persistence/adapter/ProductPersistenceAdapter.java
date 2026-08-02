package com.leyde.backend.persistence.adapter;

import com.leyde.backend.domain.model.Product;
import com.leyde.backend.domain.repository.ProductRepository;
import com.leyde.backend.persistence.entity.ProductEntity;
import com.leyde.backend.persistence.repository.SpringDataProductRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Adapter implementing domain repository using Spring Data JPA.
 * Keep mapping minimal here; no business rules applied.
 */
@Component
public class ProductPersistenceAdapter implements ProductRepository {

    private final SpringDataProductRepository repo;

    public ProductPersistenceAdapter(SpringDataProductRepository repo) {
        this.repo = repo;
    }

    @Override
    public Optional<Product> findById(UUID id) {
        return repo.findById(id).map(this::toDomain);
    }

    @Override
    public List<Product> findAll() {
        return repo.findAll().stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public Product save(Product product) {
        ProductEntity e = toEntity(product);
        ProductEntity saved = repo.save(e);
        return toDomain(saved);
    }

    @Override
    public void deleteById(UUID id) {
        repo.deleteById(id);
    }

    private Product toDomain(ProductEntity e) {
        Product p = new Product();
        p.setId(e.getId());
        p.setName(e.getName());
        p.setPrice(e.getPrice());
        p.setCreatedAt(e.getCreatedAt());
        return p;
    }

    private ProductEntity toEntity(Product p) {
        ProductEntity e = new ProductEntity();
        e.setId(p.getId());
        e.setName(p.getName());
        e.setPrice(p.getPrice());
        e.setCreatedAt(p.getCreatedAt());
        return e;
    }
}
