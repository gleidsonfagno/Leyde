package com.leyde.backend.application.service;

import com.leyde.backend.domain.model.Product;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductService extends ApplicationService {
    Optional<Product> findById(UUID id);
    List<Product> findAll();
    Product create(Product product);
    void delete(UUID id);
}
