package com.leyde.backend.api.service;

import com.leyde.backend.api.dto.ProductDTO;
import com.leyde.backend.persistence.entity.ProductEntity;
import com.leyde.backend.persistence.repository.SpringDataProductRepository;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductQueryService {

    private final SpringDataProductRepository repo;
    private final MeterRegistry meterRegistry;

    public ProductQueryService(SpringDataProductRepository repo, MeterRegistry meterRegistry) {
        this.repo = repo;
        this.meterRegistry = meterRegistry;
    }

    @Cacheable(value = "products", key = "#pageable.pageNumber + '-' + #pageable.pageSize + '-' + #pageable.sort.toString()")
    public Page<ProductDTO> list(Pageable pageable) {
        Page<ProductEntity> page = repo.findAll(pageable);
        List<ProductDTO> dtos = page.stream().map(this::toDto).collect(Collectors.toList());
        meterRegistry.counter("products.requests.list").increment();
        return new PageImpl<>(dtos, pageable, page.getTotalElements());
    }

    @Cacheable(value = "products", key = "#cursor.toString() + '-' + #limit")
    public List<ProductDTO> listBeforeCursor(OffsetDateTime cursor, int limit) {
        List<ProductEntity> list = repo.findByCreatedAtBeforeOrderByCreatedAtDesc(cursor, Pageable.ofSize(limit));
        List<ProductDTO> dtos = list.stream().map(this::toDto).collect(Collectors.toList());
        meterRegistry.counter("products.requests.cursor").increment();
        return dtos;
    }

    private ProductDTO toDto(ProductEntity e) {
        ProductDTO d = new ProductDTO();
        d.setId(e.getId());
        d.setName(e.getName());
        d.setPrice(e.getPrice());
        d.setCreatedAt(e.getCreatedAt());
        if (e.getBrand() != null) d.setBrandName(e.getBrand().getName());
        if (e.getCategory() != null) d.setCategoryName(e.getCategory().getName());
        return d;
    }
}
