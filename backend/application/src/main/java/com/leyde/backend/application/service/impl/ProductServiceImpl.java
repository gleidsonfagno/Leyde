package com.leyde.backend.application.service.impl;

import com.leyde.backend.application.service.ProductService;
import com.leyde.backend.domain.model.Product;
import com.leyde.backend.domain.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;

    public ProductServiceImpl(ProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<Product> findById(UUID id) {
        return repository.findById(id);
    }

    @Override
    public List<Product> findAll() {
        return repository.findAll();
    }

    @Override
    public Product create(Product product) {
        return repository.save(product);
    }

    @Override
    public void delete(UUID id) {
        repository.deleteById(id);
    }
}
