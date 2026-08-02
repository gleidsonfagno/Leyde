package com.leyde.backend.api.controller;

import com.leyde.backend.api.dto.ProductDTO;
import com.leyde.backend.api.service.ProductQueryService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductQueryService queryService;

    public ProductController(ProductQueryService queryService) {
        this.queryService = queryService;
    }

    @GetMapping
    @Operation(summary = "List products with pagination or cursor")
    public ResponseEntity<?> list(@RequestParam(value = "page", required = false) Integer page,
                                  @RequestParam(value = "size", required = false) Integer size,
                                  @RequestParam(value = "cursor", required = false) String cursor) {
        if (cursor != null) {
            try {
                OffsetDateTime dt = OffsetDateTime.parse(cursor);
                int limit = (size != null) ? size : 20;
                List<ProductDTO> list = queryService.listBeforeCursor(dt, limit);
                return ResponseEntity.ok(list);
            } catch (DateTimeParseException ex) {
                return ResponseEntity.badRequest().body("Invalid cursor format. Use ISO-8601 OffsetDateTime.");
            }
        }

        int p = (page != null) ? page : 0;
        int s = (size != null) ? size : 20;
        Pageable pageable = PageRequest.of(p, s);
        Page<ProductDTO> result = queryService.list(pageable);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get product by id")
    public ResponseEntity<ProductDTO> get(@PathVariable UUID id) {
        // Not implemented yet (skeleton)
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @Operation(summary = "Create product")
    public ResponseEntity<ProductDTO> create(@RequestBody ProductDTO dto) {
        return ResponseEntity.status(201).body(dto);
    }
}
